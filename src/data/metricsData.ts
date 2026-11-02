import { PlatformMetricItem, TestimonialData } from "@/types/landing";

export type { PlatformMetricItem, TestimonialData };

export const PLATFORM_METRICS: PlatformMetricItem[] = [
  {
    id: "metric-entities",
    value: "15",
    unit: "Tables",
    label: "Relational Schema Entities",
    subtext: "Fully normalized relational database architecture with referential integrity.",
    trend: "PostgreSQL & Supabase",
    iconName: "gitBranch",
  },
  {
    id: "metric-speed",
    value: "3x",
    unit: "Faster",
    label: "Skill-to-Job Matching",
    subtext: "Automated candidate-job matching calculated on skill score vectors.",
    trend: "Automated match engine",
    iconName: "clock",
  },
  {
    id: "metric-tracks",
    value: "5+",
    unit: "Tracks",
    label: "Core Engineering Tracks",
    subtext: "Specialized tracks across Systems, Backend, Databases, Web, and Cloud.",
    trend: "Structured domains",
    iconName: "badgeCheck",
  },
  {
    id: "metric-filters",
    value: "100",
    unit: "%",
    label: "Relational Data Integrity",
    subtext: "ACID-compliant transactions and foreign key constraints on live PostgreSQL.",
    trend: "Strict schema constraints",
    iconName: "shield",
  },
];

export const FEATURED_TESTIMONIAL: TestimonialData = {
  quote:
    "SkillMatch made it straightforward to showcase my actual database design and backend projects. Instead of generic keyword screening, recruiters can view my verified skills and schedule technical interviews directly.",
  authorName: "Rashed Molla",
  authorRole: "Computer Science & Engineering Student",
  company: "SkillMatch Platform",
  school: "University of Asia Pacific",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  verifiedRepo: "github.com/rashedmern/skillmatch_app",
  timeToOffer: "Verified Candidate",
};
