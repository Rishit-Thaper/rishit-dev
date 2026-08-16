// Chunks the knowledge markdown files, embeds each chunk with Gemini, and
// (re)populates the `documents` table. Rerun with `npm run ingest` any time
// profile.md or resume.md changes.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { embedText } from '../src/lib/gemini';
import { clearDocuments, insertDocument } from '../src/lib/db';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = path.join(__dirname, '..', 'src', 'content', 'knowledge');

const SOURCES = [
  { source: 'profile', file: 'profile.md' },
  { source: 'resume', file: 'resume.md' },
];

function chunkMarkdown(markdown: string): { section: string | null; content: string }[] {
  const lines = markdown.split('\n');
  const chunks: { section: string | null; content: string }[] = [];
  let currentSection: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join('\n').trim();
    if (text) chunks.push({ section: currentSection, content: text });
    buffer = [];
  };

  for (const line of lines) {
    const heading = line.match(/^#{1,3}\s+(.*)/);
    if (heading) {
      flush();
      currentSection = heading[1].trim();
    }
    buffer.push(line);
  }
  flush();
  return chunks;
}

async function main() {
  for (const { source, file } of SOURCES) {
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const markdown = readFileSync(filePath, 'utf8');
    const chunks = chunkMarkdown(markdown).filter((c) => c.content.length > 0);

    console.log(`${source}: ${chunks.length} chunks`);
    await clearDocuments(source);

    for (const chunk of chunks) {
      const embedding = await embedText(chunk.content, 'RETRIEVAL_DOCUMENT');
      await insertDocument({ source, section: chunk.section, content: chunk.content, embedding });
      console.log(`  embedded: ${chunk.section ?? '(untitled)'}`);
    }
  }
  console.log('Ingestion complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
