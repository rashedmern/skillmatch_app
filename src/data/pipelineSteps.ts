import { PipelineStepItem } from "@/types/landing";

export type { PipelineStepItem };

export const PIPELINE_STEPS: PipelineStepItem[] = [
  {
    stepNumber: "01",
    title: "Connect Your GitHub & Projects",
    subtitle: "Show Real Repositories",
    description:
      "Link your GitHub in one click. SkillMatch analyzes your actual commits, project structure, test coverage, and code clarity—with zero access to private repos without permission.",
    iconName: "gitBranch",
    tags: ["OAuth Verified", "Live Repos", "Clean Architecture"],
  },
  {
    stepNumber: "02",
    title: "Hands-On Technical Challenges",
    subtitle: "Solve Production Problems",
    description:
      "Complete practical engineering challenges calibrated to real-world production stacks. Prove how you handle APIs, optimize database queries, and debug edge cases.",
    iconName: "network",
    tags: ["Real Code Tasks", "Automated Feedback", "No Resume Fluff"],
  },
  {
    stepNumber: "03",
    title: "Direct Interview Invites",
    subtitle: "Skip the Recruiter Screen",
    description:
      "Engineering managers review your verified solutions and invite you directly to technical rounds—no automated rejection emails or resume black holes.",
    iconName: "calendarCheck",
    tags: ["Hiring Manager Review", "Faster Offers", "Direct Invites"],
  },
];
