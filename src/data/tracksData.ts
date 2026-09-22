import { SkillMatchStatus, TrackSkill, CseTrackItem } from "@/types/landing";

export type { SkillMatchStatus, TrackSkill, CseTrackItem };

export const CSE_TRACKS: CseTrackItem[] = [
  {
    id: "track-distributed",
    title: "SWE & Distributed Systems",
    category: "Core Systems Engineering",
    description:
      "High-throughput concurrency, consensus protocols (Raft/Paxos), RPC primitives, and fault-tolerant architectures.",
    iconName: "cpu",
    colSpanDesktop: 2,
    benchmarkMetric: "96th percentile concurrency benchmark",
    activeRolesCount: 42,
    skills: [
      { name: "Go Routines", status: "matched", proficiency: "Advanced" },
      { name: "gRPC Primitives", status: "matched" },
      { name: "Raft Consensus", status: "matched", proficiency: "2 repos" },
      { name: "Rust Memory Safety", status: "neutral" },
      { name: "eBPF Tracing", status: "gap" },
    ],
  },
  {
    id: "track-frontend",
    title: "Frontend & Web Architecture",
    category: "Web & UI Systems",
    description:
      "Modern React 19 architecture, Server Components, client-side caching, Web Workers, and state synchronization.",
    iconName: "layout",
    colSpanDesktop: 2,
    benchmarkMetric: "Sub-100ms INP & 0.00 CLS targets",
    activeRolesCount: 38,
    skills: [
      { name: "React 19 RSC", status: "matched", proficiency: "Production" },
      { name: "TypeScript 5", status: "matched" },
      { name: "Web Workers", status: "matched" },
      { name: "Tailwind CSS v4", status: "neutral" },
      { name: "WASM Modules", status: "gap" },
    ],
  },
  {
    id: "track-backend-cloud",
    title: "Backend & Cloud Infrastructure",
    category: "Infrastructure & Platform",
    description:
      "Container orchestration, event streams, microservices decomposition, declarative infrastructure, and CI/CD pipelines.",
    iconName: "server",
    colSpanDesktop: 2,
    benchmarkMetric: "Zero-downtime rolling deployment patterns",
    activeRolesCount: 51,
    skills: [
      { name: "Kubernetes CRDs", status: "matched", proficiency: "Parsed" },
      { name: "Apache Kafka", status: "matched" },
      { name: "Docker Compose", status: "matched" },
      { name: "Terraform HCL", status: "neutral" },
      { name: "Service Mesh (Istio)", status: "gap" },
    ],
  },
  {
    id: "track-database",
    title: "Database & Big Data Engine",
    category: "Storage & Query Optimization",
    description:
      "Storage engine internals, query optimization with EXPLAIN plans, distributed sharding, and real-time analytical OLAP.",
    iconName: "database",
    colSpanDesktop: 3,
    benchmarkMetric: "92nd percentile query plan efficiency",
    activeRolesCount: 29,
    skills: [
      { name: "PostgreSQL Internals", status: "matched", proficiency: "Advanced" },
      { name: "Query Index Plans", status: "matched" },
      { name: "Redis Caching", status: "matched" },
      { name: "ClickHouse OLAP", status: "neutral" },
      { name: "Distributed Raft Log", status: "gap" },
    ],
  },
  {
    id: "track-ai-ml",
    title: "AI/ML Systems & Vector Search",
    category: "Intelligent Systems Engineering",
    description:
      "Embedding pipelines, semantic vector search, high-concurrency LLM inference gateways, and model quantization.",
    iconName: "brain",
    colSpanDesktop: 3,
    benchmarkMetric: "Vector cosine similarity pipeline benchmarks",
    activeRolesCount: 46,
    skills: [
      { name: "Vector Embeddings", status: "matched", proficiency: "Cosine API" },
      { name: "PyTorch Quantization", status: "matched" },
      { name: "FastAPI Async", status: "matched" },
      { name: "pgvector / Pinecone", status: "neutral" },
      { name: "Triton Inference Server", status: "gap" },
    ],
  },
];
