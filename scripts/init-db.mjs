import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Client } from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/init-db.mjs');
  process.exit(1);
}

const schema = readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');

// Strip sslmode from the URL — pg-connection-string now treats sslmode=require as
// verify-full, which overrides the explicit rejectUnauthorized:false below and
// rejects Aiven's cert. Force our own ssl config instead.
const connectionString = process.env.DATABASE_URL.replace(/[?&]sslmode=[^&]*/, '');

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
await client.query(schema);
await client.end();

console.log('Schema applied: documents, leads tables ready (pgvector enabled).');
