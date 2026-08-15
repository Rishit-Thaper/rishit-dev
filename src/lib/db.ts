import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const rawConnectionString = process.env.DATABASE_URL;
    if (!rawConnectionString) throw new Error('DATABASE_URL is not set');
    // Strip sslmode from the URL — pg-connection-string now treats sslmode=require as
    // verify-full, which overrides the explicit rejectUnauthorized:false below and
    // rejects Aiven's cert. Force our own ssl config instead.
    const connectionString = rawConnectionString.replace(/[?&]sslmode=[^&]*/, '');
    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 3 });
  }
  return pool;
}

function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(',')}]`;
}

export type DocumentChunk = {
  source: string;
  section: string | null;
  content: string;
  similarity: number;
};

export async function querySimilarChunks(embedding: number[], k = 6): Promise<DocumentChunk[]> {
  const literal = toVectorLiteral(embedding);
  const { rows } = await getPool().query(
    `select source, section, content, 1 - (embedding <=> $1::vector) as similarity
     from documents
     order by embedding <=> $1::vector
     limit $2`,
    [literal, k],
  );
  return rows;
}

export async function insertDocument(doc: {
  source: string;
  section: string | null;
  content: string;
  embedding: number[];
}): Promise<void> {
  await getPool().query(
    `insert into documents (source, section, content, embedding) values ($1, $2, $3, $4::vector)`,
    [doc.source, doc.section, doc.content, toVectorLiteral(doc.embedding)],
  );
}

export async function clearDocuments(source: string): Promise<void> {
  await getPool().query(`delete from documents where source = $1`, [source]);
}

export async function insertLead(lead: {
  name: string;
  email: string;
  purpose: string | null;
  requestedTime: string;
  calendarEventId: string | null;
}): Promise<void> {
  await getPool().query(
    `insert into leads (name, email, purpose, requested_time, calendar_event_id) values ($1, $2, $3, $4, $5)`,
    [lead.name, lead.email, lead.purpose, lead.requestedTime, lead.calendarEventId],
  );
}
