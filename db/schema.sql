create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  source text not null,
  section text,
  content text not null,
  embedding vector(768) not null,
  created_at timestamptz not null default now()
);

create index if not exists documents_embedding_idx
  on documents using hnsw (embedding vector_cosine_ops);

create table if not exists leads (
  id bigserial primary key,
  name text,
  email text,
  purpose text,
  requested_time timestamptz,
  calendar_event_id text,
  created_at timestamptz not null default now()
);
