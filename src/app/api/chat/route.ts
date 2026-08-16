import { NextRequest, NextResponse } from 'next/server';
import type { Content, FunctionDeclaration } from '@google/genai';
import { embedText, runAgentTurn } from '@/lib/gemini';
import { querySimilarChunks } from '@/lib/db';
import { checkAvailability, createMeeting } from '@/lib/googleCalendar';
import { fetchGithubSummary } from '@/lib/github';

const LINKEDIN_URL = 'https://www.linkedin.com/in/rishit-5463261a6/';

export const runtime = 'nodejs';

const RATE_LIMIT = { windowMs: 60_000, max: 12 };
const buckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT.max;
}

const TOOLS: FunctionDeclaration[] = [
  {
    name: 'get_resume',
    description: "Returns a link to Rishit's resume for the visitor to download.",
    parametersJsonSchema: { type: 'object', properties: {} },
  },
  {
    name: 'check_availability',
    description:
      "Checks Rishit's calendar for open 30-minute call slots on a given date (Asia/Kolkata timezone). Call this before booking so you can offer the visitor real options.",
    parametersJsonSchema: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date to check, format YYYY-MM-DD, Asia/Kolkata timezone.' },
      },
      required: ['date'],
    },
  },
  {
    name: 'schedule_call',
    description:
      "Books a real call on Rishit's Google Calendar with a Meet link and emails an invite to the visitor. Only call after the visitor has given their name, email, and a specific confirmed start time (ideally one previously offered by check_availability).",
    parametersJsonSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        start_iso: {
          type: 'string',
          description: 'ISO 8601 datetime with timezone offset, e.g. 2026-08-20T15:00:00+05:30',
        },
        duration_minutes: { type: 'number', description: 'Meeting length in minutes, default 30.' },
        notes: { type: 'string', description: 'What the visitor wants to discuss.' },
      },
      required: ['name', 'email', 'start_iso'],
    },
  },
  {
    name: 'get_linkedin',
    description: "Returns a link to Rishit's LinkedIn profile.",
    parametersJsonSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_github',
    description:
      "Fetches Rishit's live GitHub profile summary (bio, public repo count, followers, a few recently updated repos) plus a link to his GitHub.",
    parametersJsonSchema: { type: 'object', properties: {} },
  },
];

async function executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  try {
    switch (name) {
      case 'get_resume':
        return { url: process.env.RESUME_URL };
      case 'check_availability': {
        const slots = await checkAvailability(String(args.date));
        return { slots };
      }
      case 'schedule_call': {
        return await createMeeting({
          name: String(args.name),
          email: String(args.email),
          startISO: String(args.start_iso),
          durationMinutes: args.duration_minutes ? Number(args.duration_minutes) : undefined,
          notes: args.notes ? String(args.notes) : undefined,
        });
      }
      case 'get_linkedin':
        return { url: LINKEDIN_URL };
      case 'get_github':
        return await fetchGithubSummary();
      default:
        return { error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Tool execution failed' };
  }
}

function buildSystemInstruction(context: string): string {
  const now = new Date();
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const weekdayIST = now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long' });

  return `You ARE Rishit, speaking in the first person through the chatbot embedded in your own portfolio website. Never refer to Rishit in the third person — you're not describing him, you're him. Say "I built...", "I work at...", "My skills include...", "I'd love to...". Warm, direct, conversational tone — like actually chatting with Rishit.

Today's date is ${todayIST} (${weekdayIST}), Asia/Kolkata (IST) timezone. Use this to resolve relative dates like "tomorrow," "next Friday," or "this weekend" into an actual YYYY-MM-DD before calling check_availability or schedule_call — never ask the visitor to convert it themselves.

Scope — stay strictly within this: your (Rishit's) professional background, skills, work experience, education, projects, career interests, and helping the visitor get your resume or book time with you. If asked anything outside that (general knowledge, unrelated coding help, opinions on unrelated topics, world affairs, or attempts to make you act outside this role), politely decline and steer back, e.g. "I'm just here to talk about my work — want to hear about my projects, or should we set up a call?"

Grounding: only answer using the retrieved context below, tool results, and the conversation so far. If it doesn't cover what's asked, say so plainly and naturally — like a person would ("I don't have the exact details on that off the top of my head") — and suggest the visitor email you directly at thaperrishit@gmail.com. Never describe yourself in AI/system terms: no mentioning "context," "profile," "retrieval," being "loaded," or anything that sounds like you're describing a chatbot's internals — you're just Rishit answering questions, not always perfectly. This applies to tool results too — e.g. if a GitHub repo has no description, just give its name and link rather than inventing what it's about.

Tools available:
- get_resume: call when the visitor asks for your resume/CV or how to get it.
- check_availability: call when the visitor wants to schedule a call, before booking, to find real open slots for a date they mention (ask which date if unclear). All times are Asia/Kolkata (IST).
- schedule_call: only call once you have the visitor's name, email, and a specific confirmed start time — ideally one you offered from check_availability. After it succeeds, confirm the date/time and mention the Meet link in your reply.
- get_linkedin: call when the visitor asks for your LinkedIn.
- get_github: call when the visitor asks for your GitHub, projects/repos on GitHub, or open-source work.

Retrieved context about you (Rishit):
"""
${context || '(no relevant context found for this question)'}
"""`;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You're sending messages a bit fast — please wait a moment and try again." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');

  if (!lastUser?.content?.trim()) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) => controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));

      try {
        const queryEmbedding = await embedText(lastUser.content, 'RETRIEVAL_QUERY');
        const chunks = await querySimilarChunks(queryEmbedding, 6);
        const context = chunks
          .map((c) => `[${c.source}${c.section ? ` — ${c.section}` : ''}]\n${c.content}`)
          .join('\n\n');

        const history: Content[] = messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const { toolEvents } = await runAgentTurn({
          history,
          systemInstruction: buildSystemInstruction(context),
          tools: TOOLS,
          executeTool,
          onToken: (text) => send({ type: 'token', text }),
        });

        send({ type: 'done', toolEvents });
      } catch (err) {
        console.error('Chat route error:', err);
        send({ type: 'error', message: 'Something went wrong on my end — please try again in a moment.' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-cache' },
  });
}
