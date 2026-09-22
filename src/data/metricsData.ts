export interface PlatformMetricItem {
  id: string;
  value: string;
  unit?: string;
  label: string;
  subtext: string;
  trend?: string;
  iconName: "clock" | "badgeCheck" | "gitBranch" | "shield";
}

export interface TestimonialData {
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  school: string;
  avatarUrl: string;
  verifiedRepo: string;
  timeToOffer: string;
}

export const PLATFORM_METRICS: PlatformMetricItem[] = [
  {
    id: "metric-speed",
    value: "14",
    unit: "Days",
    label: "Avg. Time to Interview",
    subtext: "From GitHub AST verification to direct technical interview with hiring teams.",
    trend: "-65% vs. traditional pipelines",
    iconName: "clock",
  },
  {
    id: "metric-accuracy",
    value: "94.2",
    unit: "%",
    label: "Technical Round Pass Rate",
    subtext: "Candidates matched via AST code benchmarks advance past first-round screens.",
    trend: "Industry benchmark: 22%",
    iconName: "badgeCheck",
  },
  {
    id: "metric-repos",
    value: "1,200",
    unit: "+",
    label: "Verified CSE Codebases",
    subtext: "Student repositories benchmarked across concurrency, query plans, and unit tests.",
    trend: "Real-time AST parsing",
    iconName: "gitBranch",
  },
  {
    id: "metric-filters",
    value: "0",
    unit: "ATS Filters",
    label: "Guaranteed Human Review",
    subtext: "Zero automated keyword rejections. Direct evaluation by engineering managers.",
    trend: "100% Code-first signal",
    iconName: "shield",
  },
];

export const FEATURED_TESTIMONIAL: TestimonialData = {
  quote:
    "SkillMatch bypassed the typical 400-application ATS black hole. ScaleOps evaluated my actual Go distributed key-value store and scheduled a technical deep dive within 72 hours—no recruiters, no keyword games.",
  authorName: "Maya Patel",
  authorRole: "Distributed Systems Intern",
  company: "ScaleOps Infrastructure",
  school: "Carnegie Mellon '25",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  verifiedRepo: "github.com/mayap/raft-kv-store",
  timeToOffer: "Placed in 11 days",
};
