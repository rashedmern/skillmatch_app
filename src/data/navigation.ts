export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_DIRECTORY: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "AST Code Analysis", href: "#how-it-works" },
      { label: "Vector Matching Engine", href: "#how-it-works" },
      { label: "CSE Specialization Tracks", href: "#tracks" },
      { label: "Live Engineering Roles", href: "#tracks" },
      { label: "Platform Benchmarks", href: "#benchmarks" },
    ],
  },
  {
    title: "For Candidates",
    links: [
      { label: "GitHub Code Verification", href: "#signup" },
      { label: "1-Click Skill Gap Modules", href: "#prep", badge: "New" },
      { label: "Technical Interview Prep", href: "#prep" },
      { label: "Candidate Success Stories", href: "#benchmarks" },
      { label: "Early-Career Comp Matrix", href: "#comp" },
    ],
  },
  {
    title: "For Recruiters",
    links: [
      { label: "Verified Candidate Dossiers", href: "#for-recruiters" },
      { label: "Custom Tech Stack Mapping", href: "#for-recruiters" },
      { label: "Direct Hiring Manager Screen", href: "#for-recruiters" },
      { label: "Employer Sign In", href: "#login" },
      { label: "Schedule Engineering Demo", href: "#demo" },
    ],
  },
  {
    title: "Institutional & Legal",
    links: [
      { label: "ABET Curriculum Alignment", href: "#abet" },
      { label: "University Career Centers", href: "#partners" },
      { label: "Security & SOC-2 Standards", href: "#security" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
    ],
  },
];
