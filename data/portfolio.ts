export const profile = {
  name: "SHAH MIR",
  role: "Full Stack Software Engineer",
  tagline: "MERN · Next.js · React Native · AI Integrations",
  location: "OKara · Pakistan",
  email: "chand14ok@gmail.com",
  github: "https://github.com/ShahMir99",
  linkedin: "https://www.linkedin.com/in/shah-mir-a48a0424b/",
  summary:
    "Full-stack engineer with 6+ years building production web & mobile applications. I architect performant systems end-to-end — from React/Next.js frontends to Node services, MongoDB schemas, and AI-powered automation pipelines.",
  skills: {
    Frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
    Backend: ["Node.js", "Express", "tRPC", "GraphQL", "REST", "WebSockets"],
    Mobile: ["React Native", "Expo", "EAS Build"],
    Database: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
    "AI / Automation": ["OpenAI", "LangChain", "Vector DBs", "n8n", "Zapier"],
    DevOps: ["Docker", "AWS", "Vercel", "CI/CD", "GitHub Actions"],
  },
  experience: [
    {
      role: "Senior Full Stack Engineer",
      company: "Nimbus Labs",
      period: "2023 — Present",
      bullets: [
        "Lead a 4-engineer team shipping a Next.js + Node platform serving 200k MAU.",
        "Designed an AI-assisted workflow builder that reduced ops time 60%.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Orbit Studios",
      period: "2021 — 2023",
      bullets: [
        "Built React Native apps for fintech clients with offline-first sync.",
        "Owned MongoDB schema design and indexing strategy for 30M+ doc collection.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Pixelforge",
      period: "2019 — 2021",
      bullets: [
        "Migrated legacy jQuery dashboard to React + TypeScript.",
        "Introduced testing culture: Jest, Playwright, 80% coverage.",
      ],
    },
  ],
};

export const projects = [
  {
    id: "synthia",
    name: "Synthia AI",
    tagline: "AI workflow builder with vector memory",
    description:
      "Drag-and-drop AI workflow builder. Users connect LLM nodes, tools, and vector stores to ship custom agents in minutes.",
    stack: ["Next.js", "TypeScript", "OpenAI", "Pinecone", "tRPC", "Postgres"],
    github: "https://github.com/ShahMir99/synthia",
    demo: "https://synthia.dev",
    challenges:
      "Real-time graph execution with cancellation, token streaming over WebSockets, deterministic replay.",
    architecture:
      "Modular node runtime, edge-deployed orchestrator, Postgres for state, Pinecone for memory.",
  },
  {
    id: "ledger",
    name: "Ledger Mobile",
    tagline: "Offline-first personal finance app",
    description:
      "React Native app with CRDT sync, biometric auth, and bank aggregation. 50k downloads in 6 months.",
    stack: ["React Native", "Expo", "MongoDB", "Node.js", "Plaid"],
    github: "https://github.com/ShahMir99/ledger",
    demo: "https://ledger.app",
    challenges:
      "Conflict-free offline sync, secure on-device encryption, multi-currency reconciliation.",
    architecture:
      "Yjs CRDT layer, Realm storage, Node sync gateway, MongoDB time-series ledger.",
  },
  {
    id: "kanvas",
    name: "Kanvas",
    tagline: "Realtime collaborative whiteboard",
    description:
      "Multiplayer whiteboard with infinite canvas, vector tools, and live cursors. Built for distributed design teams.",
    stack: ["React", "TypeScript", "WebRTC", "Yjs", "Node.js"],
    github: "https://github.com/ShahMir99/kanvas",
    demo: "https://kanvas.io",
    challenges:
      "60fps canvas rendering with 100+ peers, presence awareness, snapshot persistence.",
    architecture:
      "WebRTC mesh with SFU fallback, Yjs awareness protocol, R2 snapshot storage.",
  },
  {
    id: "pulse",
    name: "Pulse Analytics",
    tagline: "Privacy-first product analytics",
    description:
      "Lightweight analytics SDK + dashboard. GDPR-compliant, no cookies, sub-1kb tracker.",
    stack: ["Next.js", "ClickHouse", "Node.js", "Recharts"],
    github: "https://github.com/ShahMir99/pulse",
    demo: "https://pulse.sh",
    challenges:
      "Ingesting 1B+ events/month, real-time funnel queries under 100ms.",
    architecture:
      "Edge ingest worker, ClickHouse columnar store, materialized views for hot queries.",
  },
  {
    id: "echo",
    name: "Echo Bot",
    tagline: "Customer support AI with RAG",
    description:
      "Slack + web chatbot that answers from your docs. Used by 30+ SaaS companies.",
    stack: ["Node.js", "LangChain", "OpenAI", "Qdrant", "Next.js"],
    github: "https://github.com/ShahMir99/echo",
    demo: "https://echobot.ai",
    challenges:
      "Hybrid search relevance, citation accuracy, multi-tenant isolation.",
    architecture:
      "Ingest pipeline → chunking → embeddings → Qdrant, retrieval-augmented chat API.",
  },
  {
    id: "trove",
    name: "Trove",
    tagline: "Curated bookmark manager",
    description:
      "Beautiful bookmark manager with AI tagging and full-text search.",
    stack: ["React", "Next.js", "Postgres", "OpenAI"],
    github: "https://github.com/ShahMir99/trove",
    demo: "https://trove.cc",
    challenges:
      "Fast full-text + semantic hybrid search, browser extension sync.",
    architecture:
      "Postgres pg_trgm + pgvector, Next.js API, browser extension via WebExtension API.",
  },
];

export const recycleBin = [
  { name: "ICO_token_launch.docx", note: "Late 2021. Nuff said." },
  { name: "blockchain_for_pets.md", note: "Pets do not need a ledger." },
  { name: "old_cv.pdf", note: "VCs declined. Politely." },
  { name: "ai_toaster_firmware.zip", note: "It burned the bread. Every time." },
  { name: "old_jquery_spaghetti.js", note: "May it rest in peace." },
];

// export const wallpapers = [
//   { id: "aurora", name: "Aurora", gradient: "linear-gradient(135deg, oklch(0.30 0.12 260), oklch(0.22 0.10 220), oklch(0.18 0.08 280))" },
//   { id: "sunset", name: "Sunset", gradient: "linear-gradient(135deg, oklch(0.35 0.15 30), oklch(0.25 0.12 350), oklch(0.20 0.10 280))" },
//   { id: "forest", name: "Forest", gradient: "linear-gradient(135deg, oklch(0.28 0.08 160), oklch(0.20 0.06 180), oklch(0.15 0.04 200))" },
//   { id: "midnight", name: "Midnight", gradient: "linear-gradient(135deg, oklch(0.15 0.04 260), oklch(0.10 0.03 240), oklch(0.08 0.02 220))" },
// ];

export const wallpapers = [
  {
    id: "aurora",
    name: "Aurora",
    image: "/assets/wallpapers/aurora.jpg",
  },
  {
    id: "sunset",
    name: "Sunset",
    image: "/assets/wallpapers/sunset.jpg",
  },
  {
    id: "forest",
    name: "Forest",
    image: "/assets/wallpapers/forest.jpg",
  },
  {
    id: "midnight",
    name: "Midnight",
    image: "/assets/wallpapers/midnight.jpg",
  },
];

export const accents = [
  { id: "blue", name: "Blue", value: "#3b82f6" },
  { id: "violet", name: "Violet", value: "#8b5cf6" },
  { id: "emerald", name: "Emerald", value: "#10b981" },
  { id: "rose", name: "Rose", value: "#f43f5e" },
  { id: "amber", name: "Amber", value: "#f59e0b" },
];
