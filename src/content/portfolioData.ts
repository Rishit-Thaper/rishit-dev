export const about = {
  name: 'Rishit',
  title: 'Software Engineer',
  location: 'Ambala, India',
  summary:
    "I'm a software engineer with a practical full-stack background centered around JavaScript and TypeScript — React, Next.js, Node.js, NestJS, MongoDB, SQL, Firebase, and GCP. I've worked on production client applications, improved business workflows, and led architecture migrations. Lately I've been going deeper into AI engineering — RAG, embeddings, agents, and developer tooling — and this portfolio itself is one of those projects: a RAG-powered chatbot instead of a static page.",
  highlights: [
    'Builder-first — I learn by actually shipping things, not just reading about them.',
    'Product-minded — I notice inefficient workflows and think about whether software can remove them.',
    'Pragmatic — I evaluate architecture by whether it earns its complexity, not by how impressive it sounds.',
  ],
};

export const experience = [
  {
    company: 'Logicease Tecno Solutions Pvt. Ltd.',
    title: 'Software Engineer',
    location: 'Ambala, India',
    dates: 'March 2024 – Present',
    bullets: [
      'Leading the platform migration from a Firebase-centric model to a robust architecture using Next.js, NestJS, PostgreSQL, and GCP to handle high-scale data loads.',
      'Collaborated directly with the DroneDeploy engineering team to integrate Data Processing APIs, enabling automated drone mapping and analysis.',
      'Built a streamlined order flow management system for Globhe with React.js, cutting order processing time by 25% and reducing Client Delivery Team inquiries by 30%.',
      'Implemented a Site Evaluation feature for Globhe, cutting mission-planning time by 30% for the Client Delivery Team and Drone Operators.',
      "Improved Globhe's data evaluation tool for approving/rejecting drone operator submissions, boosting review efficiency by 20%.",
    ],
  },
];

export const achievements = [
  {
    title: 'On-site assignment — Stockholm, Sweden',
    dates: 'September 2024 – October 2024',
    description:
      'Selected for an international assignment working closely with Binogi, a Logicease client, focused on product optimization, issue resolution, and cross-team collaboration.',
  },
];

export const education = {
  school: 'Kurukshetra University',
  location: 'Kurukshetra, India',
  degree: 'Bachelor of Technology, Computer Science',
  dates: 'June 2024',
  cgpa: '8.5/10 Aggregate CGPA',
  coursework: [
    'Data Structures',
    'Algorithms',
    'Web Technologies',
    'Databases (DBMS)',
    'Object Oriented Programming (OOP)',
    'Neural Networks',
    'Cloud Computing',
  ],
};

export const skills = [
  { category: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'C++', 'SQL', 'Bash'] },
  { category: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'SCSS', 'Chakra UI'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs'] },
  { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase/Firestore', 'Supabase'] },
  { category: 'Cloud & Infra', items: ['Google Cloud Platform', 'Vercel', 'Netlify', 'Docker', 'Redis'] },
  {
    category: 'AI / Emerging',
    items: ['Gemini API', 'RAG', 'Vector Embeddings', 'AI Agents', 'Google ADK', 'pgvector'],
  },
];

export const projects = [
  {
    name: 'Portfolio Chatbot',
    description:
      "This site — a RAG-powered AI agent grounded on my real background, with tool calling for real actions like booking calls on my actual calendar.",
    tech: ['Next.js', 'TypeScript', 'Gemini API', 'Aiven Postgres + pgvector', 'Google Calendar API'],
    url: null,
  },
  {
    name: 'ProfAIle',
    description:
      'An AI-driven platform that parses resume data into structured JSON to instantly render portfolios across a curated, open-source theme library.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'Google Gemini API'],
    url: null,
  },
  {
    name: 'CloudDrop',
    description:
      'A self-hostable file sharing platform supporting resumable uploads up to 10GB via GCS Signed URLs, with automatic 7-day expiry and instant QR code sharing.',
    tech: ['Next.js', 'NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'GCS', 'Cloud Run', 'Docker'],
    url: null,
  },
];

export const contact = {
  email: 'thaperrishit@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rishit-5463261a6/',
  github: 'https://github.com/Rishit-Thaper',
  instagram: 'https://www.instagram.com/rishit_thaper/',
  twitter: 'https://x.com/rishit_9703',
  resumeUrl: 'https://drive.google.com/file/d/1L67x6dO78GO3Ckp5GAh1AKpV-h3e2m8x/view?usp=sharing',
};
