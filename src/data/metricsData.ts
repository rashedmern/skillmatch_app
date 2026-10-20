import { PlatformMetricItem, TestimonialData } from "@/types/landing";

export type { PlatformMetricItem, TestimonialData };

export const PLATFORM_METRICS: PlatformMetricItem[] = [
  {
    id: "metric-speed",
    value: "14",
    unit: "Days",
    label: "Avg. Time to Technical Interview",
    subtext: "From verified project solutions to direct technical calls with hiring teams.",
    trend: "65% faster hiring cycle",
    iconName: "clock",
  },
  {
    id: "metric-accuracy",
    value: "94.2",
    unit: "%",
    label: "Technical Screen Pass Rate",
    subtext: "Students verified on practical tracks advance past round 1 screens.",
    trend: "Industry average: 22%",
    iconName: "badgeCheck",
  },
  {
    id: "metric-repos",
    value: "1,200",
    unit: "+",
    label: "Active Student Repositories",
    subtext: "Codebases tested across concurrency, query execution, and clean tests.",
    trend: "Live code verification",
    iconName: "gitBranch",
  },
  {
    id: "metric-filters",
    value: "0",
    unit: "ATS Keyword Bots",
    label: "Direct Human Engineering Review",
    subtext: "No robotic resume screening. Evaluated by engineering leads who actually build.",
    trend: "100% Code-first signal",
    iconName: "shield",
  },
];

export const FEATURED_TESTIMONIAL: TestimonialData = {
  quote:
    "SkillMatch bypassed the typical 400-application ATS black hole. ScaleOps reviewed my Go distributed key-value store challenge and scheduled a technical deep dive within 72 hours—no recruiter keyword screening required.",
  authorName: "Maya Patel",
  authorRole: "Backend Engineering Intern",
  company: "ScaleOps Infrastructure",
  school: "Carnegie Mellon '26",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  verifiedRepo: "github.com/mayap/raft-kv-store",
  timeToOffer: "Placed in 11 days",
};
