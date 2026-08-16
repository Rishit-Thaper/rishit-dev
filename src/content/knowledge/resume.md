# Resume — Rishit

## Contact

- Name: Rishit
- Email: thaperrishit@gmail.com
- Phone: 7056761469
- Location: Ambala, India
- Timezone for scheduling: Asia/Kolkata (IST)
- LinkedIn: https://www.linkedin.com/in/rishit-5463261a6/
- GitHub: https://github.com/Rishit-Thaper

## Professional Summary

Full-Stack Software Engineer with 2+ years of experience building production web applications across the frontend (React, Next.js) and backend (Node.js, NestJS, Express.js), including work on MongoDB, PostgreSQL, and Google Cloud Platform. Experienced in Agile/Scrum SDLC, system architecture, API design, and technology migrations. Currently expanding into AI engineering: building Retrieval-Augmented Generation (RAG) pipelines, vector search, and LLM-powered agents with the Google Gemini API and OpenAI embeddings.

## Work Experience

**Logicease Tecno Solutions Pvt. Ltd.** — Ambala, India
Software Engineer (Full-Stack) — March 2024 – Present

- Led the platform migration from a Firebase-centric model to a scalable Next.js, NestJS, and PostgreSQL architecture, improving average database query performance by approximately 35% through optimized schema design and indexing.
- Migrated core services off Firebase to a dedicated backend architecture, cutting estimated monthly infrastructure costs by 20-25% while improving API reliability and modularity for high-scale data loads.
- Built GIA (Globhe Intelligent Agent), a Retrieval-Augmented Generation (RAG) assistant using the OpenAI Embeddings API, capable of autonomously performing actions on behalf of users, reducing manual actions for clients and drone operators by 50-60%.
- Collaborated directly with the DroneDeploy engineering team to integrate Data Processing APIs, enabling automated drone mapping and analysis within the platform.
- Enhanced a streamlined order flow management system for Globhe using React.js, optimizing frontend and backend processes for Clients, Drone Operators, and Admins, cutting order processing time by 25% and reducing Client Delivery Team inquiries by 30%.
- Implemented a Site Evaluation feature for Globhe, enabling efficient mission planning by consolidating data, cutting planning time by 30% for the Client Delivery Team and the Drone Operators.
- Improved a data evaluation tool for Globhe's Admin and Client Delivery Team, allowing seamless approval, rejection, or change requests for drone operator file submissions, boosting review efficiency by 20%.

## Achievements

- **On-site Opportunity (September 2024 – October 2024):** Selected and accepted the offer for an international assignment in Stockholm, Sweden, to work closely with Binogi, a Logicease client, focusing on product optimization, issue resolution, and cross-team collaboration.

## Skills

- **Programming Languages:** JavaScript (ES6+), TypeScript, C++, SQL
- **Frontend Development:** React.js (React), Next.js, HTML5, CSS3, SCSS, Chakra UI
- **Backend Development:** Node.js, Express.js, NestJS (Nest.js), REST APIs
- **Cloud & DevOps:** Google Cloud Platform (GCP), Firebase, Docker, GitHub Actions
- **Databases:** MongoDB, PostgreSQL, SQL
- **AI / ML Tools:** Google Gemini API, OpenAI Embeddings API, Retrieval-Augmented Generation (RAG), Vector Search, pgvector
- **Tools:** Git, GitHub, Bash, Postman, Supabase, Google Antigravity, OpenAI Codex
- **Methodologies:** Agile, Scrum, SDLC, Code Reviews, Technical Documentation

## Education

**Kurukshetra University** — Kurukshetra, India (June 2024)
Bachelor of Technology, Computer Science
- 8.5/10 Aggregate CGPA
- Coursework: Data Structures, Algorithms, Web Technologies, Databases (DBMS), Object Oriented Programming (OOP), Neural Networks, Cloud Computing

## Projects

### GIA (Globhe Intelligent Agent)
A Retrieval-Augmented Generation (RAG) powered assistant built for Globhe (a Logicease client), using the OpenAI Embeddings API. Capable of autonomously performing actions on behalf of users, reducing manual actions for clients and drone operators by 50-60%.
Technologies used: RAG, OpenAI Embeddings API, Node.js, NestJS, PostgreSQL.

### ProfAIle
An AI-driven platform that parses resume data into structured JSON to instantly render portfolios across a curated, open-source theme library, welcoming community contributions to continuously expand the collection of minimal, modern, and professional themes.
Technologies used: Next.js, Supabase, TypeScript, Google Gemini API.

### CloudDrop
A self-hostable file sharing platform supporting resumable uploads up to 10GB via GCS Signed URLs, with automatic 7-day expiry enforced through GCS Object Lifecycle policies and instant QR code sharing for effortless link distribution.
Technologies used: Next.js, NestJS, TypeScript, Supabase, PostgreSQL, Google Cloud Storage, Google Cloud Run, Docker.

### Portfolio Chatbot (this site)
I rebuilt my own portfolio as a RAG-powered AI agent instead of a traditional sectioned site. I built the full pipeline myself: chunking my resume and profile into sections, embedding them with Google's Gemini embedding API, and storing the vectors in a free-tier Aiven PostgreSQL database using the pgvector extension. Each visitor question is embedded and matched against those chunks to ground Gemini's answers in my real background instead of letting it improvise. It also takes real actions through tool calling — checking my Google Calendar availability and booking actual meetings with a Meet link and email invite, sharing my resume/LinkedIn/GitHub, and streaming responses token-by-token. The whole thing runs on free tiers only: the Gemini API for chat and embeddings, Aiven Postgres for the vector store, Vercel for hosting, and a GitHub Actions cron to keep the database from idling out.
Technologies used: Next.js, TypeScript, Google Gemini API (chat + embeddings + function calling), Aiven PostgreSQL + pgvector, Google Calendar API (OAuth2), GitHub Actions.

## Note on quantified metrics

The 35% query-performance figure and 20-25% infrastructure-cost figure above are estimates, not independently verified numbers — if asked to justify them in detail, acknowledge them as an approximate/directional estimate rather than a precisely measured one. The GIA 50-60% manual-action-reduction figure is a real reported figure.
