"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CandidateSidebar } from "./components/CandidateSidebar";
import { DashboardOverviewTab } from "./components/DashboardOverviewTab";
import { AllJobsTab } from "./components/AllJobsTab";
import { MyApplicationsTab } from "./components/MyApplicationsTab";
import { ProfileSetupTab } from "./components/ProfileSetupTab";
import {
  CandidateProfile,
  JobListing,
  AppliedJob,
  CandidateTabType,
} from "./components/types";
import {
  Menu,
  ShieldAlert,
  Sparkles,
  X,
  Code2,
} from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";

const initialProfile: CandidateProfile = {
  name: "Alex Chen",
  headline: "Distributed Systems & Infrastructure Engineer",
  university: "UC Berkeley",
  degree: "B.S. Electrical Engineering & Computer Sciences",
  graduationYear: "2026",
  email: "alex.chen@berkeley.edu",
  avatarUrl: null,
  githubUrl: "https://github.com/alexchen-dev",
  linkedinUrl: "https://linkedin.com/in/alexchen-dev",
  portfolioUrl: "https://alexchen.berkeley.edu",
  bio: "Undergraduate CS researcher focusing on Raft consensus state machines, lock-free concurrency, and distributed storage engines. Implemented high-throughput distributed key-value stores with zero-downtime failover in Go and C++.",
  resumeFileName: "Alex_Chen_UCBerkeley_EECS_2026.pdf",
  resumeFileSize: "2.4 MB",
  resumeSha256: "sha256-8f4b23c91e7d80aa2345bc79ef0142de56a89c4456b21c43d99e01",
  skills: [
    "Go",
    "Distributed Systems",
    "Raft Consensus",
    "Concurrency",
    "Linux Kernel",
    "PostgreSQL Internals",
    "TypeScript",
    "Docker",
    "Algorithms & Data Structures",
    "gRPC",
  ],
};

const initialAppliedJobs: AppliedJob[] = [
  {
    id: "app-1",
    company: "HyperScale AI",
    role: "Kernel & Memory Systems Engineer",
    location: "San Francisco, CA (Hybrid)",
    salary: "$200,000 - $230,000",
    appliedDate: "Sep 18, 2026",
    matchScore: 96,
    status: "Offer Extended",
    nextStep: "Review formal offer packet ($215k base + equity)",
  },
  {
    id: "app-2",
    company: "ScaleOps Inc.",
    role: "Staff Distributed Systems Engineer",
    location: "San Francisco, CA (Hybrid)",
    salary: "$185,000 - $210,000",
    appliedDate: "Sep 14, 2026",
    matchScore: 95,
    status: "Interview Scheduled",
    nextStep: "Technical Deep-Dive with Engineering VP (Tomorrow, 10:00 AM)",
  },
  {
    id: "app-3",
    company: "Veritas Cloud",
    role: "Core Platform Infrastructure Engineer",
    location: "New York, NY (Hybrid)",
    salary: "$175,000 - $195,000",
    appliedDate: "Sep 10, 2026",
    matchScore: 92,
    status: "Under Review",
    nextStep: "Dossier screened by Staff SRE lead",
  },
  {
    id: "app-4",
    company: "NeuralFlow",
    role: "Systems Performance & Kernel Engineer",
    location: "Remote (US)",
    salary: "$190,000 - $220,000",
    appliedDate: "Sep 06, 2026",
    matchScore: 89,
    status: "Assessment Passed",
    nextStep: "AST Sandbox benchmark scored in 98th percentile",
  },
];

const initialJobs: JobListing[] = [
  {
    id: "job-1",
    title: "Staff Distributed Systems Engineer",
    company: "ScaleOps Inc.",
    logoText: "SO",
    location: "San Francisco, CA",
    workModel: "Hybrid",
    domain: "Distributed Systems",
    salary: "$185,000 - $210,000",
    matchScore: 95,
    tags: ["Go", "Raft", "gRPC", "Distributed Systems"],
    description: "Architect high-throughput log replication protocols, Raft cluster failover semantics, and telemetry pipelines for mission-critical cloud backbones.",
    postedDate: "2 days ago",
    isApplied: true,
  },
  {
    id: "job-2",
    title: "Core Platform Infrastructure Engineer",
    company: "Veritas Cloud",
    logoText: "VC",
    location: "New York, NY",
    workModel: "Hybrid",
    domain: "Cloud & SRE",
    salary: "$175,000 - $195,000",
    matchScore: 92,
    tags: ["Kubernetes", "Linux", "Terraform", "Go"],
    description: "Design automated multi-region cluster topologies, zero-downtime control planes, and global service mesh networking.",
    postedDate: "3 days ago",
    isApplied: true,
  },
  {
    id: "job-3",
    title: "Systems Performance & Kernel Engineer",
    company: "NeuralFlow",
    logoText: "NF",
    location: "Remote (US)",
    workModel: "Remote",
    domain: "Kernel & Systems",
    salary: "$190,000 - $220,000",
    matchScore: 89,
    tags: ["C++", "eBPF", "Linux Kernel", "Concurrency"],
    description: "Profile cache thrashing, optimize kernel network packet processing using eBPF, and accelerate GPU memory transfers.",
    postedDate: "5 days ago",
    isApplied: true,
  },
  {
    id: "job-4",
    title: "Kernel & Memory Systems Engineer",
    company: "HyperScale AI",
    logoText: "HA",
    location: "San Francisco, CA",
    workModel: "Hybrid",
    domain: "Kernel & Systems",
    salary: "$200,000 - $230,000",
    matchScore: 96,
    tags: ["C", "Zero-Copy", "Memory Internals", "CUDA"],
    description: "Build ultra-low-latency DMA primitives and direct-to-NIC memory streaming for next-generation multi-modal inference clusters.",
    postedDate: "1 week ago",
    isApplied: true,
  },
  {
    id: "job-5",
    title: "Distributed Database Engine Developer",
    company: "CockroachLabs",
    logoText: "CR",
    location: "New York, NY",
    workModel: "Remote",
    domain: "Database Engines",
    salary: "$195,000 - $225,000",
    matchScore: 96,
    tags: ["Go", "Raft", "LSM-Tree", "SQL Engine", "MVCC"],
    description: "Develop transaction coordination engines, Raft range leasing mechanisms, and distributed lock managers handling petabyte-scale transactional workloads.",
    postedDate: "Just now",
    isApplied: false,
  },
  {
    id: "job-6",
    title: "Cloud Security & Zero-Trust Architect",
    company: "CloudShield",
    logoText: "CS",
    location: "Austin, TX",
    workModel: "Hybrid",
    domain: "Cloud & SRE",
    salary: "$180,000 - $205,000",
    matchScore: 88,
    tags: ["Rust", "Zero-Trust", "eBPF", "Network Protocol", "TLS"],
    description: "Build automated cryptographic identity attestation, wire-speed mTLS proxies, and workload isolation containers for cloud-native clusters.",
    postedDate: "1 day ago",
    isApplied: false,
  },
  {
    id: "job-7",
    title: "Low-Latency Cache & Memory Engineer",
    company: "ScaleData Labs",
    logoText: "SD",
    location: "San Francisco, CA",
    workModel: "On-site",
    domain: "Distributed Systems",
    salary: "$185,000 - $215,000",
    matchScore: 94,
    tags: ["C", "Cache Systems", "Memory Profiling", "Data Structures"],
    description: "Implement custom slab allocators, lock-free lockless skip-lists, and sub-millisecond memory caching layers serving billions of requests daily.",
    postedDate: "2 days ago",
    isApplied: false,
  },
  {
    id: "job-8",
    title: "Observability & SRE Pipeline Engineer",
    company: "MetricsCore",
    logoText: "MC",
    location: "Boston, MA",
    workModel: "Hybrid",
    domain: "Cloud & SRE",
    salary: "$175,000 - $200,000",
    matchScore: 90,
    tags: ["Go", "Distributed Tracing", "Kafka", "PostgreSQL"],
    description: "Design streaming telemetry ingestion pipelines processing tens of gigabytes per second with zero-loss OpenTelemetry backplanes.",
    postedDate: "4 days ago",
    isApplied: false,
  },
];

function CandidateDashboardContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");

  const [activeTab, setActiveTab] = useState<CandidateTabType>("overview");
  const [profile, setProfile] = useState<CandidateProfile>(initialProfile);
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
  const [applications, setApplications] = useState<AppliedJob[]>(initialAppliedJobs);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Auto-dismiss warning banner after 4 seconds
  useEffect(() => {
    if (!warning) return;

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3600);

    const dismissTimer = setTimeout(() => {
      setDismissedWarning(true);
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [warning]);

  const handleDismissWarning = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setDismissedWarning(true);
    }, 200);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Instant 1-Click Apply Handler
  const handleApplyJob = (job: JobListing) => {
    // 1. Mark job as applied in job listings state
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, isApplied: true } : j))
    );

    // 2. Prepend new active application to applications pipeline
    const newApp: AppliedJob = {
      id: `app-${Date.now()}`,
      company: job.company,
      role: job.title,
      location: `${job.location} (${job.workModel})`,
      salary: job.salary,
      appliedDate: "Today",
      matchScore: job.matchScore,
      status: "Under Review",
      nextStep: "Dossier dispatched to technical recruiting lead",
    };

    setApplications((prev) => [newApp, ...prev]);

    triggerToast(`Application submitted to ${job.company} for '${job.title}'! Dossier dispatched.`);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "all-jobs":
        return "Engineering Jobs Marketplace";
      case "applications":
        return "My Applications Pipeline";
      case "profile":
        return "Profile & Skill Management";
      default:
        return "Candidate Dossier Overview";
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFB] text-on-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-primary-container text-white text-xs font-semibold shadow-level-3 flex items-center gap-3 border border-secondary-mint/30 animate-bounce">
          <Sparkles className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Left Sidebar */}
      <CandidateSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        profile={profile}
        appliedCount={applications.length}
        totalJobsCount={jobs.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Full-Width Content View */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 w-full border-b border-stroke-card bg-white/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-on-surface tracking-tight">
                {getTabTitle()}
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-outline">
                <StatusDot size="sm" />
                <span>ABET Verified Student Session</span>
                <span>•</span>
                <span className="font-mono text-primary font-semibold">{profile.university}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* ABET Institutional Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs font-bold text-primary">
              <Code2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span className="hidden sm:inline">Role: Candidate</span>
              <span className="sm:hidden font-mono">.EDU</span>
            </div>

            {/* Quick Profile Avatar Shortcut */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              title="Edit Profile"
              className="w-9 h-9 rounded-xl border border-slate-200 bg-surface-container-low hover:border-secondary-mint flex items-center justify-center text-xs font-bold text-primary transition-all overflow-hidden cursor-pointer"
            >
              {profile.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span>AC</span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Full-Width Body Container */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Security Warning Banner with 4s auto-dismiss & close button */}
          {warning === "unauthorized_recruiter_access" && !dismissedWarning && (
            <div
              className={`p-4 rounded-xl bg-accent-gap/10 border border-accent-gap/30 text-accent-gap flex items-start justify-between gap-3 text-xs shadow-sm transition-all duration-300 ${
                isFadingOut ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="font-bold text-sm">Access Denied: Recruiter Portal Restricted</p>
                  <p className="text-accent-gap/90 mt-0.5 leading-relaxed">
                    Your account is authenticated with candidate credentials. Access to company recruitment
                    pipelines and employer job management is restricted by SkillMatch Role-Based Access Control.
                    You have been safely redirected to your candidate dossier.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismissWarning}
                aria-label="Dismiss security warning"
                id="dismiss-warning-btn"
                className="text-accent-gap/70 hover:text-accent-gap hover:bg-accent-gap/15 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <DashboardOverviewTab
              profile={profile}
              jobs={jobs}
              onApplyJob={handleApplyJob}
              onNavigateToAllJobs={() => setActiveTab("all-jobs")}
              onNavigateToProfile={() => setActiveTab("profile")}
              onTriggerToast={triggerToast}
            />
          )}

          {/* TAB 2: ALL JOBS */}
          {activeTab === "all-jobs" && (
            <AllJobsTab
              jobs={jobs}
              onApplyJob={handleApplyJob}
              onNavigateToApplications={() => setActiveTab("applications")}
            />
          )}

          {/* TAB 3: MY APPLICATIONS */}
          {activeTab === "applications" && (
            <MyApplicationsTab
              applications={applications}
              onNavigateToAllJobs={() => setActiveTab("all-jobs")}
              onTriggerToast={triggerToast}
            />
          )}

          {/* TAB 4: PROFILE SETUP */}
          {activeTab === "profile" && (
            <ProfileSetupTab
              profile={profile}
              onUpdateProfile={(updated) => setProfile(updated)}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-outline">Loading candidate workspace...</div>}>
      <CandidateDashboardContent />
    </Suspense>
  );
}
