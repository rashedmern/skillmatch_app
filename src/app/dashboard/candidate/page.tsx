"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CandidateSidebar } from "./components/CandidateSidebar";
import { DashboardOverviewTab } from "./components/DashboardOverviewTab";
import { AllJobsTab } from "./components/AllJobsTab";
import { MyApplicationsTab } from "./components/MyApplicationsTab";
import { ProfileSetupTab } from "./components/ProfileSetupTab";
import { CandidateInboxTab } from "./components/CandidateInboxTab";
import { CandidateEventsTab } from "./components/CandidateEventsTab";
import { CandidateEmployersTab } from "./components/CandidateEmployersTab";
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
  Bell,
  Mail,
  Calendar,
  Building2,
} from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import {
  getJobsAction,
  getCandidateApplicationsAction,
  applyJobAction,
} from "@/server/actions/jobActions";
import {
  getCandidateProfileAction,
  updateCandidateProfileAction,
} from "@/server/actions/authActions";

const initialProfile: CandidateProfile = {
  name: "Rashed",
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
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");
  const tabQuery = searchParams.get("tab") as CandidateTabType | null;
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<CandidateTabType>(() => {
    if (tabQuery && ["overview", "all-jobs", "applications", "profile", "inbox", "events", "employers", "code-studio"].includes(tabQuery)) {
      return tabQuery;
    }
    return "overview";
  });

  useEffect(() => {
    if (tabQuery && ["overview", "all-jobs", "applications", "profile", "inbox", "events", "employers", "code-studio"].includes(tabQuery)) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  // Persistent Client Profile with LocalStorage Fallback & Lazy Initializer
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_candidate_profile");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object" && (parsed.name || parsed.email)) {
            return { ...initialProfile, ...parsed };
          }
        }
      } catch (e) {
        console.warn("Failed to read candidate profile cache:", e);
      }
    }
    return initialProfile;
  });

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_candidate_jobs");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn("Failed to read jobs cache:", e);
      }
    }
    return initialJobs;
  });

  const [applications, setApplications] = useState<AppliedJob[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_candidate_applications");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn("Failed to read applications cache:", e);
      }
    }
    return initialAppliedJobs;
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security warning banner states
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Client hydration synchronization effect for profile, jobs & applications
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cachedProfile = localStorage.getItem("skillmatch_candidate_profile");
      if (cachedProfile) {
        const parsed = JSON.parse(cachedProfile);
        if (parsed && typeof parsed === "object" && (parsed.name || parsed.email)) {
          setProfile((prev) => ({ ...prev, ...parsed }));
        }
      }
      const cachedJobs = localStorage.getItem("skillmatch_candidate_jobs");
      if (cachedJobs) {
        const parsedJobs = JSON.parse(cachedJobs);
        if (Array.isArray(parsedJobs) && parsedJobs.length > 0) setJobs(parsedJobs);
      }
      const cachedApps = localStorage.getItem("skillmatch_candidate_applications");
      if (cachedApps) {
        const parsedApps = JSON.parse(cachedApps);
        if (Array.isArray(parsedApps) && parsedApps.length > 0) setApplications(parsedApps);
      }
    } catch (err) {
      console.warn("Hydration cache sync failed:", err);
    }
  }, []);

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

  // Live Supabase PostgreSQL Synchronization
  useEffect(() => {
    let isMounted = true;
    async function syncSupabaseData() {
      const queryEmail =
        session?.user?.email ||
        (typeof window !== "undefined" ? localStorage.getItem("skillmatch_candidate_email") : null) ||
        profile.email;

      if (!queryEmail) return;

      try {
        const [profileRes, jobsRes, appsRes] = await Promise.all([
          getCandidateProfileAction(queryEmail),
          getJobsAction({ candidateEmail: queryEmail }),
          getCandidateApplicationsAction(queryEmail),
        ]);

        if (isMounted && profileRes.success && profileRes.data) {
          setProfile((prev) => {
            const merged: CandidateProfile = {
              ...prev,
              ...profileRes.data,
              bio: profileRes.data.bio || prev.bio,
              skills: profileRes.data.skills?.length ? profileRes.data.skills : prev.skills,
            };
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem("skillmatch_candidate_profile", JSON.stringify(merged));
              } catch (e) {
                console.warn("Failed to update profile localStorage", e);
              }
            }
            return merged;
          });
        }

        if (isMounted && jobsRes.success && jobsRes.data && jobsRes.data.length > 0) {
          setJobs(jobsRes.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_candidate_jobs", JSON.stringify(jobsRes.data));
            } catch (e) {
              console.warn("Failed to cache jobs", e);
            }
          }
        }

        if (isMounted && appsRes.success && appsRes.data && appsRes.data.length > 0) {
          setApplications(appsRes.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_candidate_applications", JSON.stringify(appsRes.data));
            } catch (e) {
              console.warn("Failed to cache applications", e);
            }
          }
        }
      } catch (err) {
        console.warn("[CandidateDashboard] Database sync fallback to local cache:", err);
      }
    }
    syncSupabaseData();
    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, profile.email]);

  const handleUpdateCandidateProfile = async (updated: CandidateProfile) => {
    // 1. Immediately persist locally to ensure permanent survival across page refreshes
    setProfile(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("skillmatch_candidate_profile", JSON.stringify(updated));
        localStorage.setItem("skillmatch_candidate_email", updated.email);
        document.cookie = `skillmatch_candidate_email=${encodeURIComponent(updated.email)}; path=/; max-age=2592000; SameSite=Lax`;
      } catch (e) {
        console.warn("Failed to save profile locally", e);
      }
    }

    // 2. Persist to live Supabase PostgreSQL backend
    try {
      const res = await updateCandidateProfileAction({
        email: updated.email,
        name: updated.name,
        headline: updated.headline,
        university: updated.university,
        degree: updated.degree,
        graduationYear: updated.graduationYear,
        avatarUrl: updated.avatarUrl,
        githubUrl: updated.githubUrl,
        linkedinUrl: updated.linkedinUrl,
        portfolioUrl: updated.portfolioUrl,
        resumeFileName: updated.resumeFileName,
        resumeSha256: updated.resumeSha256,
        skills: updated.skills,
      });

      if (res.success && res.data) {
        const merged: CandidateProfile = {
          ...updated,
          ...res.data,
          bio: updated.bio || res.data.bio,
          skills: updated.skills.length > 0 ? updated.skills : (res.data.skills || []),
        };
        setProfile(merged);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("skillmatch_candidate_profile", JSON.stringify(merged));
          } catch (e) {
            console.warn("Failed to write merged profile to localStorage", e);
          }
        }
      }
    } catch (err) {
      console.error("[CandidateDashboard] Failed to persist profile to Supabase:", err);
    }
  };

  // Instant 1-Click Apply Handler with Supabase PostgreSQL persistence & audit logging
  const handleApplyJob = async (job: JobListing) => {
    // 1. Optimistically mark job as applied in job listings state
    const updatedJobs = jobs.map((j) => (j.id === job.id ? { ...j, isApplied: true } : j));
    setJobs(updatedJobs);

    // 2. Prepend new active application to applications pipeline
    const tempId = `app-${Date.now()}`;
    const newApp: AppliedJob = {
      id: tempId,
      company: job.company,
      role: job.title,
      location: `${job.location} (${job.workModel})`,
      salary: job.salary,
      appliedDate: "Today",
      matchScore: job.matchScore,
      status: "Under Review",
      nextStep: "Dossier dispatched to technical recruiting lead",
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);

    // Write to localStorage for immediate refresh survival
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("skillmatch_candidate_applications", JSON.stringify(updatedApps));
        localStorage.setItem("skillmatch_candidate_jobs", JSON.stringify(updatedJobs));
      } catch (e) {
        console.warn("Failed to cache applied jobs", e);
      }
    }

    triggerToast(`Application submitted to ${job.company} for '${job.title}'! Dossier dispatched.`);

    // 3. Persist to live Supabase PostgreSQL and record initial stage history audit record
    try {
      const res = await applyJobAction({
        candidateEmail: profile.email,
        jobId: job.id,
        matchScore: job.matchScore,
        notes: `1-Click Apply for '${job.title}' at ${job.company}`,
      });

      if (res.success && res.data?.application?.id) {
        // Update local application id with real PostgreSQL UUID
        setApplications((prev) => {
          const synced = prev.map((a) => (a.id === tempId ? { ...a, id: res.data.application.id } : a));
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_candidate_applications", JSON.stringify(synced));
            } catch (e) {
              console.warn("Failed to update applications cache", e);
            }
          }
          return synced;
        });
      }
    } catch (err) {
      console.error("[handleApplyJob] Postgres application sync error:", err);
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "all-jobs":
        return "Jobs";
      case "applications":
        return "My Applications";
      case "profile":
        return "Profile Setup";
      case "inbox":
        return "Inbox";
      case "events":
        return "Events";
      case "employers":
        return "Employers";
      case "code-studio":
        return "Code Studio";
      default:
        return "Home";
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFB] text-on-surface font-sans selection:bg-[#00D4BE]/20 selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#051C19] text-white text-xs font-semibold shadow-2xl flex items-center gap-3 border border-[#00D4BE]/40 animate-bounce"
        >
          <Sparkles className="w-4 h-4 text-[#00D4BE]" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Left Sidebar */}
      <CandidateSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        profile={profile}
        totalJobsCount={jobs.length}
        appliedCount={applications.length}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Full-Width Content View */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navbar matching Handshake clean aesthetic */}
        <header
          role="banner"
          className="h-16 w-full border-b border-zinc-200 bg-white sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none"
        >
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
                {getTabTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Sleek Dual Language Switcher */}
            <LanguageSwitcher variant="pill" />

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={() => triggerToast("You have 2 new inbound messages from hiring managers!")}
              className="relative p-2 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D4BE] shadow-[0_0_6px_#00D4BE]" />
            </button>

            {/* Profile Avatar Pill */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              title="Profile Setup"
              aria-label={`Profile - ${profile.name}`}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-zinc-100 transition-all cursor-pointer border border-transparent hover:border-zinc-200"
            >
              {profile.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#00D4BE]/60 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#00D4BE]/20 text-[#095964] border border-[#00D4BE]/40 flex items-center justify-center font-bold text-xs shrink-0">
                  {profile.name ? profile.name.slice(0, 2).toUpperCase() : "RA"}
                </div>
              )}
              <span className="hidden sm:inline text-xs font-bold text-zinc-800">
                {profile.name ? profile.name.split(" ")[0] : "Rashed"}
              </span>
            </button>
          </div>
        </header>

        {/* Dynamic Full-Width Body Container */}
        <main id="main-content" className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Security Warning Banner with 4s auto-dismiss & close button */}
          {warning === "unauthorized_recruiter_access" && !dismissedWarning && (
            <div
              role="alert"
              aria-live="polite"
              className={`p-4 rounded-xl bg-accent-gap/10 border border-accent-gap/30 text-accent-gap flex items-start justify-between gap-3 text-xs shadow-sm transition-all duration-300 ${
                isFadingOut ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" aria-hidden="true" />
                <div>
                  <p className="font-bold text-sm">
                    {language === "bn"
                      ? "প্রবেশাধিকার নিষিদ্ধ: রিক্রুটার পোর্টাল সীমাবদ্ধ"
                      : "Access Denied: Recruiter Portal Restricted"}
                  </p>
                  <p className="text-accent-gap/90 mt-0.5 leading-relaxed font-medium">
                    {language === "bn"
                      ? "আপনার অ্যাকাউন্টটি ক্যান্ডিডেট পরিচয়পত্রে লগইন রয়েছে। সিকিউরিটি নীতির কারণে রিক্রুটার পোর্টালে প্রবেশাধিকার সীমিত। আপনাকে ক্যান্ডিডেট ডজিয়ারে রিডাইরেক্ট করা হয়েছে।"
                      : "Your account is authenticated with candidate credentials. Access to company recruitment pipelines and employer job management is restricted by SkillMatch Role-Based Access Control. You have been safely redirected to your candidate dossier."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismissWarning}
                aria-label="Dismiss security warning"
                id="dismiss-warning-btn"
                className="text-accent-gap/70 hover:text-accent-gap hover:bg-accent-gap/15 p-1 rounded-lg transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gap"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <section
              role="tabpanel"
              id="candidate-tabpanel-overview"
              aria-labelledby="candidate-tab-overview"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <DashboardOverviewTab
                profile={profile}
                jobs={jobs}
                onApplyJob={handleApplyJob}
                onNavigateToAllJobs={() => setActiveTab("all-jobs")}
                onNavigateToProfile={() => setActiveTab("profile")}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 2: ALL JOBS */}
          {activeTab === "all-jobs" && (
            <section
              role="tabpanel"
              id="candidate-tabpanel-all-jobs"
              aria-labelledby="candidate-tab-all-jobs"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <AllJobsTab
                jobs={jobs}
                onApplyJob={handleApplyJob}
                onNavigateToApplications={() => setActiveTab("applications")}
              />
            </section>
          )}

          {/* TAB 3: MY APPLICATIONS */}
          {activeTab === "applications" && (
            <section
              role="tabpanel"
              id="candidate-tabpanel-applications"
              aria-labelledby="candidate-tab-applications"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <MyApplicationsTab
                applications={applications}
                onNavigateToAllJobs={() => setActiveTab("all-jobs")}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 4: PROFILE SETUP */}
          {activeTab === "profile" && (
            <section
              role="tabpanel"
              id="candidate-tabpanel-profile"
              aria-labelledby="candidate-tab-profile"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <ProfileSetupTab
                profile={profile}
                onUpdateProfile={handleUpdateCandidateProfile}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 5: INBOX (Exact Handshake Layout) */}
          {activeTab === "inbox" && (
            <CandidateInboxTab onTriggerToast={triggerToast} />
          )}

          {/* TAB 6: CODE STUDIO */}
          {activeTab === "code-studio" && (
            <section className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#051C19] via-[#0D3E35] to-[#095964] text-white border border-[#00D4BE]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00D4BE]">Interactive Engineering Sandbox</span>
                  <h2 className="text-xl sm:text-2xl font-black">SkillMatch Code Studio</h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
                    Take hands-on technical challenges. Your passing test suites and benchmarks prove your competence directly to engineering managers.
                  </p>
                </div>
                <button onClick={() => triggerToast("Starting new challenge session...")} className="px-6 py-2.5 rounded-full bg-[#00D4BE] text-[#051C19] font-extrabold text-xs shadow hover:bg-[#00bda8] transition-all cursor-pointer shrink-0">
                  Launch Challenge
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#00D4BE] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#00D4BE]/15 text-[#075951]">Go • Concurrency</span>
                    <span className="text-xs text-zinc-500 font-mono">45 mins</span>
                  </div>
                  <h3 className="font-bold text-base text-zinc-900">Concurrent Key-Value Replication</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">Implement distributed lock-free state synchronization with heartbeats and failover detection.</p>
                  <button onClick={() => triggerToast("Loading Concurrent Go workspace...")} className="w-full py-2 rounded-xl bg-zinc-100 hover:bg-[#00D4BE] hover:text-[#051C19] text-zinc-800 font-bold text-xs transition-colors cursor-pointer">
                    Start Challenge
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#00D4BE] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#00D4BE]/15 text-[#075951]">PostgreSQL • SQL</span>
                    <span className="text-xs text-zinc-500 font-mono">35 mins</span>
                  </div>
                  <h3 className="font-bold text-base text-zinc-900">Query Planner &amp; Index Optimization</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">Fix sequential table scans and optimize multi-column compound index execution under heavy writes.</p>
                  <button onClick={() => triggerToast("Loading Postgres workspace...")} className="w-full py-2 rounded-xl bg-zinc-100 hover:bg-[#00D4BE] hover:text-[#051C19] text-zinc-800 font-bold text-xs transition-colors cursor-pointer">
                    Start Challenge
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* TAB 7: EVENTS (Exact Handshake Layout) */}
          {activeTab === "events" && (
            <CandidateEventsTab onTriggerToast={triggerToast} />
          )}

          {/* TAB 8: EMPLOYERS (Exact Handshake Layout) */}
          {activeTab === "employers" && (
            <section
              role="tabpanel"
              id="candidate-tabpanel-employers"
              aria-labelledby="candidate-tab-employers"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <CandidateEmployersTab
                onTriggerToast={triggerToast}
                onNavigateToJobs={(company) => {
                  setActiveTab("all-jobs");
                  triggerToast(company ? `Showing job openings for ${company}` : "Browsing all open jobs");
                }}
              />
            </section>
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
