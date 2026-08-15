# rishit-dev

A portfolio that's a RAG chatbot instead of sectioned pages. It answers as Rishit, grounded on
`src/content/knowledge/{profile,resume}.md`, and can hand over a resume link, share LinkedIn/GitHub,
check calendar availability, and book real Google Calendar calls with a Meet link.

Stack: Next.js (App Router) + Chakra UI, Gemini API (chat + embeddings), Aiven PostgreSQL + pgvector,
Google Calendar API (OAuth). Everything runs on free tiers — see `.env.example` for what's needed.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in real values (never put real secrets in `.env.example` —
   it's tracked by git).
3. Apply the DB schema: `npm run init-db`
4. Embed the knowledge base into Postgres: `npm run ingest` (rerun any time the knowledge markdown changes)
5. Mint a Calendar OAuth refresh token: `npm run oauth-setup` (one-time; opens a browser consent flow)
6. `npm run dev`

## Scripts

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` / `npm run format`
- `npm run init-db` — applies `db/schema.sql` (pgvector extension, `documents`, `leads` tables)
- `npm run ingest` — chunks and embeds `src/content/knowledge/*.md` into the `documents` table
- `npm run oauth-setup` — one-time Google OAuth consent flow to get `GOOGLE_REFRESH_TOKEN`

## Keeping the DB alive

Aiven's lower-tier PostgreSQL plans can idle out. `.github/workflows/db-health-check.yml` pings the
database every 12 hours via GitHub Actions (`scripts/db-health-check.mjs`) — add `DATABASE_URL` as a
repo secret (Settings → Secrets and variables → Actions) for it to run.

## Deploying

Deploy as normal on Vercel (Hobby tier is fine) and set the same env vars from `.env.local` in the
project's Vercel settings.
