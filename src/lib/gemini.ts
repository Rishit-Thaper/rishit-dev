import { GoogleGenAI, type Content, type FunctionDeclaration, type Part } from '@google/genai';

const EMBEDDING_MODEL = 'gemini-embedding-001';
export const EMBEDDING_DIMENSIONS = 768;
export const CHAT_MODEL = 'gemini-flash-latest';
const MAX_TOOL_ITERATIONS = 4;

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export async function embedText(
  text: string,
  taskType: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY' = 'RETRIEVAL_DOCUMENT',
): Promise<number[]> {
  const response = await getClient().models.embedContent({
    model: EMBEDDING_MODEL,
    contents: [text],
    config: { outputDimensionality: EMBEDDING_DIMENSIONS, taskType },
  });
  const values = response.embeddings?.[0]?.values;
  if (!values) throw new Error('Gemini returned no embedding values');
  return values;
}

export type ToolEvent = { name: string; args: Record<string, unknown>; result: unknown };

type PendingCall = { id?: string; name?: string; args?: Record<string, unknown> };

const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 800;

function isRetryableError(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  return status === 503 || status === 429;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs one user turn against the model, streaming text tokens as they're
 * generated (via onToken) and transparently executing any requested tool
 * calls (via executeTool), feeding results back until the model produces a
 * final text answer or MAX_TOOL_ITERATIONS is hit.
 */
export async function runAgentTurn(params: {
  history: Content[];
  systemInstruction: string;
  tools: FunctionDeclaration[];
  executeTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  onToken?: (text: string) => void;
}): Promise<{ text: string; toolEvents: ToolEvent[] }> {
  const ai = getClient();
  const contents: Content[] = [...params.history];
  const toolEvents: ToolEvent[] = [];

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    let textSoFar = '';
    const pendingCalls: PendingCall[] = [];
    // Raw Part objects (not just the flattened FunctionCall) so thoughtSignature —
    // required when round-tripping a function call back to the model — survives.
    const functionCallParts: Part[] = [];
    let tokensEmitted = false;

    for (let attempt = 0; ; attempt++) {
      try {
        const stream = await ai.models.generateContentStream({
          model: CHAT_MODEL,
          contents,
          config: {
            systemInstruction: params.systemInstruction,
            tools: [{ functionDeclarations: params.tools }],
          },
        });

        for await (const chunk of stream) {
          const calls = chunk.functionCalls;
          if (calls && calls.length > 0) {
            pendingCalls.push(...calls);
            for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
              if (part.functionCall) functionCallParts.push(part);
            }
            continue;
          }
          const text = chunk.text;
          if (text) {
            textSoFar += text;
            tokensEmitted = true;
            params.onToken?.(text);
          }
        }
        break;
      } catch (err) {
        // Only safe to retry if nothing's been streamed to the client yet for this
        // turn — otherwise a retry would re-generate and duplicate visible text.
        if (!tokensEmitted && isRetryableError(err) && attempt < MAX_RETRIES) {
          await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
          continue;
        }
        throw err;
      }
    }

    if (pendingCalls.length === 0) {
      return { text: textSoFar, toolEvents };
    }

    contents.push({
      role: 'model',
      parts: [...(textSoFar ? [{ text: textSoFar }] : []), ...functionCallParts],
    });

    const responseParts = [];
    for (const call of pendingCalls) {
      const name = call.name ?? '';
      const args = (call.args ?? {}) as Record<string, unknown>;
      const result = await params.executeTool(name, args);
      toolEvents.push({ name, args, result });
      responseParts.push({ functionResponse: { id: call.id, name, response: { result } } });
    }
    contents.push({ role: 'user', parts: responseParts });
  }

  return {
    text: "I wasn't able to finish that action — please try rephrasing, or email Rishit directly.",
    toolEvents,
  };
}
