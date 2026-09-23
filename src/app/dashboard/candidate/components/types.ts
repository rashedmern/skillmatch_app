export interface CandidateProfile {
  name: string;
  headline: string;
  university: string;
  degree: string;
  graduationYear: string;
  email: string;
  avatarUrl: string | null;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  bio: string;
  resumeFileName: string;
  resumeFileSize: string;
  resumeSha256: string;
  skills: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logoText: string;
  location: string;
  workModel: "Remote" | "Hybrid" | "On-site";
  domain: "Distributed Systems" | "Cloud & SRE" | "Database Engines" | "Kernel & Systems";
  salary: string;
  matchScore: number;
  tags: string[];
  description: string;
  postedDate: string;
  isApplied?: boolean;
}

export interface AppliedJob {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  appliedDate: string;
  matchScore: number;
  status: "Interview Scheduled" | "Under Review" | "Assessment Passed" | "Offer Extended";
  nextStep: string;
}

export type CandidateTabType = "overview" | "all-jobs" | "applications" | "profile";
