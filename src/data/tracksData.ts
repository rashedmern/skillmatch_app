import { SkillMatchStatus, TrackSkill, CseTrackItem } from "@/types/landing";

export type { SkillMatchStatus, TrackSkill, CseTrackItem };

export const CSE_TRACKS: CseTrackItem[] = [
  {
    id: "track-distributed",
    title: "SWE & Distributed Systems",
    category: "Core Systems Engineering",
    description:
      "High-throughput concurrency, microservices architecture, gRPC communication, and fault-tolerant distributed design.",
    iconName: "cpu",
    colSpanDesktop: 2,
    benchmarkMetric: "Concurrency & race-condition safety",
    activeRolesCount: 42,
    skills: [
      { name: "Go Routines & Channels", status: "matched", proficiency: "Advanced" },
      { name: "gRPC & Protobuf", status: "matched" },
      { name: "Raft Consensus", status: "matched", proficiency: "2 repos" },
      { name: "Rust Memory Safety", status: "neutral" },
      { name: "Distributed Tracing", status: "gap" },
    ],
  },
  {
    id: "track-frontend",
    title: "Frontend & Web Architecture",
    category: "Web & UI Systems",
    description:
      "Production React 19 architecture, Server Components, client-side caching, responsive state sync, and web performance.",
    iconName: "layout",
    colSpanDesktop: 2,
    benchmarkMetric: "Core Web Vitals & client caching",
    activeRolesCount: 38,
    skills: [
      { name: "React 19 & RSC", status: "matched", proficiency: "Production" },
      { name: "TypeScript 5", status: "matched" },
      { name: "State Architecture", status: "matched" },
      { name: "Tailwind CSS", status: "neutral" },
      { name: "Web Workers", status: "gap" },
    ],
  },
  {
    id: "track-backend-cloud",
    title: "Backend & Cloud Infrastructure",
    category: "Cloud & DevOps",
    description:
      "Container orchestration, event streams, microservice decomposition, and automated CI/CD deployment pipelines.",
    iconName: "server",
    colSpanDesktop: 2,
    benchmarkMetric: "Zero-downtime rolling deployments",
    activeRolesCount: 51,
    skills: [
      { name: "Kubernetes & Docker", status: "matched", proficiency: "Verified" },
      { name: "Apache Kafka", status: "matched" },
      { name: "PostgreSQL & Redis", status: "matched" },
      { name: "Terraform Infrastructure", status: "neutral" },
      { name: "CI/CD Pipelines", status: "gap" },
    ],
  },
  {
    id: "track-database",
    title: "Database Systems & Storage",
    category: "Storage & Query Optimization",
    description:
      "Relational query optimization, indexing strategies with EXPLAIN plans, connection pooling, and low-latency storage.",
    iconName: "database",
    colSpanDesktop: 3,
    benchmarkMetric: "Query index optimization & connection pooling",
    activeRolesCount: 29,
    skills: [
      { name: "PostgreSQL Internals", status: "matched", proficiency: "Advanced" },
      { name: "Query Index Plans", status: "matched" },
      { name: "Redis Caching", status: "matched" },
      { name: "Database Sharding", status: "neutral" },
      { name: "Transaction Isolation", status: "gap" },
    ],
  },
  {
    id: "track-ai-ml",
    title: "Machine Learning & Data Systems",
    category: "Intelligent Systems Engineering",
    description:
      "Model inference pipelines, semantic vector search, high-throughput data processing, and deployment for real-time applications.",
    iconName: "brain",
    colSpanDesktop: 3,
    benchmarkMetric: "Low-latency inference & embeddings",
    activeRolesCount: 46,
    skills: [
      { name: "Vector Search (pgvector)", status: "matched", proficiency: "API Verified" },
      { name: "PyTorch & Transformers", status: "matched" },
      { name: "FastAPI Async Services", status: "matched" },
      { name: "Model Quantization", status: "neutral" },
      { name: "vLLM / Triton Serving", status: "gap" },
    ],
  },
];
