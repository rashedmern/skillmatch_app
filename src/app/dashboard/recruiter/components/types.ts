export interface RecruiterProfile {
  companyName: string;
  companySlug: string;
  recruiterName: string;
  email: string;
  roleTitle: string;
  industry: string;
  location: string;
  verifiedPartner: boolean;
  avatarUrl: string | null;
}

export interface JobPosting {
  id: string;
  title: string;
  team: string;
  location: string;
  workModel: "Remote" | "Hybrid" | "On-site";
  salary: string;
  minMatch: number;
  applicantsCount: number;
  status: "Active" | "Paused" | "Draft";
  skills: string[];
  description: string;
  postedDate: string;
}

export interface ApplicantCandidate {
  id: string;
  name: string;
  initials: string;
  university: string;
  degree: string;
  email: string;
  matchScore: number;
  astNodes: number;
  highlightRepo: string;
  jobId: string;
  jobTitle: string;
  appliedDate: string;
  stage: "New Applicant" | "Shortlisted" | "Interview Scheduled" | "Offer Stage" | "Rejected";
}

export type RecruiterTabType = "overview" | "post-job" | "pipeline" | "talent-search" | "settings";
