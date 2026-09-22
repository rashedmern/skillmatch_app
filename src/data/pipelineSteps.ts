import { PipelineStepItem } from "@/types/landing";

export type { PipelineStepItem };

export const PIPELINE_STEPS: PipelineStepItem[] = [
  {
    stepNumber: "01",
    title: "Connect Codebase & Portfolio",
    subtitle: "AST Static Code Analysis",
    description:
      "Connect your GitHub in one click. Our parsing engine analyzes your actual commits, cyclomatic complexity, concurrency patterns, and test suites—with zero private code retention.",
    iconName: "gitBranch",
    tags: ["Read-only OAuth", "Commit Authorship", "AST Tree Ingestion"],
  },
  {
    stepNumber: "02",
    title: "Algorithmic Vector Matching",
    subtitle: "Multi-Dimensional Cosine Embeddings",
    description:
      "We convert your verified code structures into multi-dimensional technical vectors, matching your concrete skills directly against engineering teams' active tech stacks.",
    iconName: "network",
    tags: ["Cosine Similarity", "No ATS Keywords", "Gap Identification"],
  },
  {
    stepNumber: "03",
    title: "Direct Engineering Access",
    subtitle: "Fast-Track Technical Interviews",
    description:
      "Bypass non-technical recruiters and resume screens. Engineering leads receive pre-verified candidate dossiers and schedule technical deep dives directly on your calendar.",
    iconName: "calendarCheck",
    tags: ["14 Days to Screen", "EM Review", "Verified Candidate Tier"],
  },
];
