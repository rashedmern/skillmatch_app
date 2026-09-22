import { AstMetricItem, CandidateSimulationData } from "@/types/landing";

export type { AstMetricItem, CandidateSimulationData };

export const HERO_SIMULATION_DATA: CandidateSimulationData = {
  candidate: {
    name: "Alex Chen",
    handle: "@alexchen_dev",
    institution: "UC Berkeley EECS",
    gradTerm: "Class of '25",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    repoCount: 14,
  },
  matchSummary: {
    score: 94,
    tier: "High Confidence Match",
    statusColor: "#0a887d",
  },
  targetRole: {
    title: "Backend Systems Engineer Intern",
    company: "ScaleOps Infrastructure",
    compensation: "$55 / hr",
    location: "Remote / SF",
    term: "Summer 2025",
    companyLogoText: "SO",
  },
  astMetrics: [
    {
      id: "metric-1",
      skillName: "Concurrent Go Routines & Channels",
      percentile: 98,
      verifiedContext: "Verified in 3 public distributed systems repos",
      category: "Concurrency",
    },
    {
      id: "metric-2",
      skillName: "PostgreSQL Index Optimization & Query Plans",
      percentile: 92,
      verifiedContext: "AST query planner analysis & EXPLAIN validation",
      category: "Databases",
    },
    {
      id: "metric-3",
      skillName: "Kubernetes Controller Runtime & CRDs",
      percentile: 89,
      verifiedContext: "Custom controller pattern parsed across 2 repos",
      category: "Cloud Native",
    },
  ],
  gapAlert: {
    missingSkill: "eBPF Kernel Tracing",
    suggestedPrepTime: "8 hrs targeted module",
    actionLabel: "View 1-Click Prep Module",
  },
};
