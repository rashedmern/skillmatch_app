import { NavItem, FooterColumn } from "@/types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Tracks & Roles", href: "#tracks" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Recruiters", href: "#recruiters" },
  { label: "Benchmarks", href: "#benchmarks" },
];

export const FOOTER_DIRECTORY: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Code Verification", href: "#how-it-works" },
      { label: "Skill Match Engine", href: "#how-it-works" },
      { label: "CSE Specialization Tracks", href: "#tracks" },
      { label: "Live Engineering Roles", href: "#tracks" },
      { label: "Platform Benchmarks", href: "#benchmarks" },
    ],
  },
  {
    title: "For Students",
    links: [
      { label: "Create Student Profile", href: "/register" },
      { label: "Browse Internship Tracks", href: "#tracks" },
      { label: "Solve Code Challenges", href: "#tracks", badge: "Live" },
      { label: "GitHub Integration", href: "#how-it-works" },
      { label: "Student Success Stories", href: "#benchmarks" },
    ],
  },
  {
    title: "For Engineering Teams",
    links: [
      { label: "Verified Candidate Search", href: "#recruiters" },
      { label: "Tech Stack Matching", href: "#recruiters" },
      { label: "Direct Interview Pipeline", href: "#recruiters" },
      { label: "Employer Sign In", href: "/login" },
      { label: "Hire Engineering Interns", href: "/register?role=recruiter" },
    ],
  },
  {
    title: "About & Resources",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "University CS Programs", href: "#tracks" },
      { label: "Data Security & Privacy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Contact Support", href: "mailto:support@skillmatch.dev" },
    ],
  },
];
