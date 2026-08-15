# Resume — Rishit

## Contact

- Name: Rishit
- Email: thaperrishit@gmail.com
- Phone: 7056761469
- Location: Ambala, India
- Timezone for scheduling: Asia/Kolkata (IST)
- LinkedIn: https://www.linkedin.com/in/rishit-5463261a6/
- GitHub: https://github.com/Rishit-Thaper

## Education

**Kurukshetra University** — Kurukshetra, India (June 2024)
Bachelor of Technology, Computer Science
- 8.5/10 Aggregate CGPA
- Coursework: Data Structures, Algorithms, Web Technologies, Databases (DBMS), Object Oriented Programming (OOP), Neural Networks, Cloud Computing

## Work Experience

**Logicease Tecno Solutions Pvt. Ltd.** — Ambala, India
Software Engineer — March 2024 – Present

- Leading the platform migration from a Firebase-centric model to a robust architecture utilizing Next.js, NestJS, PostgreSQL, and GCP to enhance system modularity and handle high-scale data loads.
- Collaborated directly with the DroneDeploy engineering team via technical consultations to integrate Data Processing APIs, enabling automated drone mapping and analysis within the platform.
- Enhanced a streamlined order flow management system for Globhe using React.js, optimizing processes for Clients, Drone Operators, and Admins, cutting order processing time by 25% and reducing Client Delivery Team inquiries by 30% with real-time status updates.
- Implemented a Site Evaluation feature for Globhe, enabling efficient mission planning by consolidating data, cutting planning time by 30% for the Client Delivery Team and the Drone Operators.
- Improved a data evaluation tool for Globhe's Admin and Client Delivery Team, allowing seamless approval, rejection, or change requests for drone operator file submissions, boosting review efficiency by 20%.

## Achievements

- **On-site Opportunity (September 2024 – October 2024):** Selected and accepted the offer for an international assignment in Stockholm, Sweden, to work closely with Binogi, a Logicease client, focusing on product optimization, issue resolution, and cross-team collaboration.

## Skills

- **Programming Languages:** JavaScript (ES6+), TypeScript, C++
- **Frameworks & Libraries:** React.js, Next.js, Node.js, Express.js, Nest.js
- **Web Technologies:** HTML5, CSS3, SCSS, Chakra UI, REST APIs
- **Cloud:** Google Cloud Platform (GCP)
- **Databases:** MongoDB, SQL
- **Tools:** Git, Bash, Postman, Firebase, Supabase, Google Antigravity, OpenAI Codex

## Projects

### ProfAIle
An AI-driven platform that parses resume data into structured JSON to instantly render portfolios across a curated, open-source theme library, welcoming community contributions to continuously expand the collection of minimal, modern, and professional themes.
Technologies used: Next.js, Supabase, TypeScript, Google Gemini API.

### CloudDrop
A self-hostable file sharing platform supporting resumable uploads up to 10GB via GCS Signed URLs, with automatic 7-day expiry enforced through GCS Object Lifecycle policies and instant QR code sharing for effortless link distribution.
Technologies used: Next.js, NestJS, TypeScript, Supabase, PostgreSQL, Google Cloud Storage, Google Cloud Run, Docker.

### Portfolio Chatbot (this site)
I rebuilt my own portfolio as a RAG-powered AI agent instead of a traditional sectioned site. I built the full pipeline myself: chunking my resume and profile into sections, embedding them with Google's Gemini embedding API, and storing the vectors in a free-tier Aiven PostgreSQL database using the pgvector extension. Each visitor question is embedded and matched against those chunks to ground Gemini's answers in my real background instead of letting it improvise. It also takes real actions through tool calling — checking my Google Calendar availability and booking actual meetings with a Meet link and email invite, sharing my resume/LinkedIn/GitHub, and streaming responses token-by-token. The whole thing runs on free tiers only: the Gemini API for chat and embeddings, Aiven Postgres for the vector store, Vercel for hosting, and a GitHub Actions cron to keep the database from idling out.
Technologies used: Next.js, TypeScript, Google Gemini API (chat + embeddings + function calling), Aiven PostgreSQL + pgvector, Google Calendar API (OAuth2), GitHub Actions.
