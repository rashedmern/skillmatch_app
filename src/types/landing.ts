/**
 * SkillMatch Landing Page - Domain Type Contracts
 * Centralized schema definitions for all landing page organisms, molecules, and fixtures.
 */

/* ==========================================
   Navigation & Directory Schemas
   ========================================== */

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* ==========================================
   Hero AST Simulation Schemas
   ========================================== */

export interface AstMetricItem {
  id: string;
  skillName: string;
  percentile: number;
  verifiedContext: string;
  category: string;
}

export interface CandidateProfile {
  name: string;
  handle: string;
  institution: string;
  gradTerm: string;
  avatarUrl: string;
  repoCount: number;
}

export interface MatchSummary {
  score: number;
  tier: "High Confidence Match" | "Moderate Match" | "Developing";
  statusColor: string;
}

export interface TargetRole {
  title: string;
  company: string;
  compensation: string;
  location: string;
  term: string;
  companyLogoText: string;
}

export interface GapAlert {
  missingSkill: string;
  suggestedPrepTime: string;
  actionLabel: string;
}

export interface CandidateSimulationData {
  candidate: CandidateProfile;
  matchSummary: MatchSummary;
  targetRole: TargetRole;
  astMetrics: AstMetricItem[];
  gapAlert: GapAlert;
}

/* ==========================================
   Platform Metrics & Social Proof Schemas
   ========================================== */

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

/* ==========================================
   CSE Specialization Tracks Schemas
   ========================================== */

export type SkillMatchStatus = "matched" | "gap" | "neutral";

export interface TrackSkill {
  name: string;
  status: SkillMatchStatus;
  proficiency?: string;
}

export interface CseTrackItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: "cpu" | "layout" | "server" | "database" | "brain";
  skills: TrackSkill[];
  colSpanDesktop: 2 | 3;
  benchmarkMetric: string;
  activeRolesCount: number;
}

/* ==========================================
   Pipeline Steps (How It Works) Schemas
   ========================================== */

export interface PipelineStepItem {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "gitBranch" | "network" | "calendarCheck";
  tags: string[];
}
