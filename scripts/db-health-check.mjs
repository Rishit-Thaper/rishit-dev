import { Client } from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

// Strip sslmode from the URL — pg-connection-string now treats sslmode=require as
// verify-full, which overrides the explicit rejectUnauthorized:false below and
// rejects Aiven's cert. Force our own ssl config instead.
const connectionString = process.env.DATABASE_URL.replace(/[?&]sslmode=[^&]*/, '');

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query('select 1');
  console.log('DB health check OK:', new Date().toISOString());
} catch (err) {
  console.error('DB health check FAILED:', err);
  process.exit(1);
} finally {
  await client.end();
}
