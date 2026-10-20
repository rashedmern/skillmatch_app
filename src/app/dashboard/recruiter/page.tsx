"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { RecruiterSidebar } from "./components/RecruiterSidebar";
import { RecruiterOverviewTab } from "./components/RecruiterOverviewTab";
import { PostJobTab } from "./components/PostJobTab";
import { AtsPipelineTab } from "./components/AtsPipelineTab";
import { TalentSearchTab } from "./components/TalentSearchTab";
import { RecruiterSettingsTab } from "./components/RecruiterSettingsTab";
import {
  RecruiterProfile,
  JobPosting,
  ApplicantCandidate,
  RecruiterTabType,
} from "./components/types";
import {
  Menu,
  ShieldAlert,
  Sparkles,
  X,
  Building2,
  Calendar,
  CheckCircle2,
  Send,
} from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import {
  getJobsAction,
  getRecruiterApplicationsAction,
  createJobAction,
  toggleJobStatusAction,
  deleteJobAction,
  updateCandidateStageAction,
} from "@/server/actions/jobActions";
import {
  getRecruiterProfileAction,
  updateRecruiterProfileAction,
} from "@/server/actions/authActions";

const initialRecruiterProfile: RecruiterProfile = {
  companyName: "CloudScale Infrastructure Labs",
  companySlug: "cloudscale",
  recruiterName: "Sarah Jenkins",
  email: "s.jenkins@cloudscale.io",
  roleTitle: "Lead Systems & Infrastructure Recruiter",
  industry: "Distributed Cloud Infrastructure & Databases",
  location: "San Francisco, CA (HQ)",
  verifiedPartner: true,
  avatarUrl: null,
};

const initialJobPostings: JobPosting[] = [
  {
    id: "job-rec-1",
    title: "Staff Distributed Systems Engineer",
    team: "Core Storage & Consensus",
    location: "San Francisco, CA",
    workModel: "Hybrid",
    salary: "$195,000 - $225,000",
    minMatch: 90,
    applicantsCount: 6,
    status: "Active",
    skills: ["Go", "Distributed Systems", "Raft", "gRPC", "PostgreSQL"],
    description:
      "Lead design and implementation of fault-tolerant replicated state machines in Go. Architect high-throughput distributed storage engines with low latency.",
    postedDate: "Sep 18, 2026",
  },
  {
    id: "job-rec-2",
    title: "Senior Backend & Platform Engineer",
    team: "Cloud Infrastructure",
    location: "San Francisco, CA",
    workModel: "Hybrid",
    salary: "$185,000 - $215,000",
    minMatch: 88,
    applicantsCount: 4,
    status: "Active",
    skills: ["Go", "Kubernetes", "Docker", "AWS", "gRPC"],
    description:
      "Architect cloud-native infrastructure, manage Kubernetes cluster operations, and build high-throughput platform services.",
    postedDate: "Sep 14, 2026",
  },
  {
    id: "job-rec-3",
    title: "High-Throughput Network Systems Engineer",
    team: "Network Data Plane",
    location: "Remote (US)",
    workModel: "Remote",
    salary: "$190,000 - $220,000",
    minMatch: 92,
    applicantsCount: 3,
    status: "Active",
    skills: ["C++", "Networking", "TCP/IP", "Linux", "Distributed Systems"],
    description:
      "Design and maintain microsecond-scale network proxy layers handling millions of concurrent connections across edge nodes.",
    postedDate: "Sep 10, 2026",
  },
  {
    id: "job-rec-4",
    title: "Full-Stack Software Engineer",
    team: "Product & Dashboard Tools",
    location: "Remote (US)",
    workModel: "Remote",
    salary: "$175,000 - $205,000",
    minMatch: 85,
    applicantsCount: 5,
    status: "Active",
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Tailwind CSS"],
    description:
      "Develop mission-critical web applications with clean React components, robust API integrations, and intuitive workflows.",
    postedDate: "Aug 29, 2026",
  },
];

const initialApplicantsData: ApplicantCandidate[] = [
  {
    id: "cand-1",
    name: "Alex Chen",
    initials: "AC",
    avatarUrl: "/images/avatars/alex-chen.jpg",
    university: "UC Berkeley",
    degree: "B.S. EECS ('26)",
    email: "alex.chen@berkeley.edu",
    matchScore: 95,
    experience: "Class of 2026 • UC Berkeley",
    skills: ["Go", "Distributed Systems", "Raft", "gRPC"],
    highlightRepo: "distributed-kv-store",
    jobId: "job-rec-1",
    jobTitle: "Staff Distributed Systems Engineer",
    appliedDate: "Sep 20, 2026",
    stage: "Interview Scheduled",
  },
  {
    id: "cand-2",
    name: "Elena Rostova",
    initials: "ER",
    avatarUrl: "/images/avatars/elena-rostova.jpg",
    university: "Stanford University",
    degree: "M.S. Computer Science ('25)",
    email: "elena.r@stanford.edu",
    matchScore: 97,
    experience: "Class of 2025 • Stanford",
    skills: ["Rust", "Tokio", "Concurrency", "C++"],
    highlightRepo: "raft-consensus-engine",
    jobId: "job-rec-1",
    jobTitle: "Staff Distributed Systems Engineer",
    appliedDate: "Sep 21, 2026",
    stage: "Shortlisted",
  },
  {
    id: "cand-3",
    name: "Marcus Vance",
    initials: "MV",
    avatarUrl: "/images/avatars/marcus-vance.jpg",
    university: "Carnegie Mellon",
    degree: "B.S. ECE ('26)",
    email: "m.vance@andrew.cmu.edu",
    matchScore: 93,
    experience: "Class of 2026 • CMU",
    skills: ["C++", "Networking", "TCP/IP", "Linux"],
    highlightRepo: "zero-copy-network-stack",
    jobId: "job-rec-3",
    jobTitle: "High-Throughput Network Systems Engineer",
    appliedDate: "Sep 19, 2026",
    stage: "New Applicant",
  },
  {
    id: "cand-4",
    name: "Priya Sharma",
    initials: "PS",
    avatarUrl: "/images/avatars/priya-sharma.jpg",
    university: "MIT",
    degree: "M.Eng. EECS ('25)",
    email: "psharma@mit.edu",
    matchScore: 96,
    experience: "Class of 2025 • MIT",
    skills: ["Go", "Kubernetes", "AWS", "Linux"],
    highlightRepo: "cloud-telemetry-probe",
    jobId: "job-rec-2",
    jobTitle: "Senior Backend & Platform Engineer",
    appliedDate: "Sep 17, 2026",
    stage: "Offer Stage",
  },
  {
    id: "cand-5",
    name: "David Kim",
    initials: "DK",
    avatarUrl: "/images/avatars/david-kim.jpg",
    university: "UIUC",
    degree: "B.S. Computer Science ('26)",
    email: "dkim@illinois.edu",
    matchScore: 91,
    experience: "Class of 2026 • UIUC",
    skills: ["TypeScript", "Next.js", "PostgreSQL", "React"],
    highlightRepo: "distributed-cache-sync",
    jobId: "job-rec-4",
    jobTitle: "Full-Stack Software Engineer",
    appliedDate: "Sep 16, 2026",
    stage: "New Applicant",
  },
  {
    id: "cand-6",
    name: "Zoe Martinez",
    initials: "ZM",
    avatarUrl: "/images/avatars/zoe-martinez.jpg",
    university: "Caltech",
    degree: "B.S. Applied Computation ('25)",
    email: "zmartinez@caltech.edu",
    matchScore: 98,
    experience: "Class of 2025 • Caltech",
    skills: ["Python", "CUDA", "PyTorch", "C++"],
    highlightRepo: "quantized-llm-kernel",
    jobId: "job-rec-3",
    jobTitle: "High-Throughput Network Systems Engineer",
    appliedDate: "Sep 15, 2026",
    stage: "Shortlisted",
  },
];

function RecruiterDashboardContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");
  const { t, language } = useLanguage();

  // State Management with LocalStorage persistence & SSR-safe lazy initializers
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<RecruiterTabType>("overview");

  const [profile, setProfile] = useState<RecruiterProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_recruiter_profile");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object" && (parsed.recruiterName || parsed.email)) {
            return { ...initialRecruiterProfile, ...parsed };
          }
        }
      } catch (e) {
        console.warn("Failed to read recruiter profile cache:", e);
      }
    }
    return initialRecruiterProfile;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_recruiter_jobs");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn("Failed to read recruiter jobs cache:", e);
      }
    }
    return initialJobPostings;
  });

  const [applicants, setApplicants] = useState<ApplicantCandidate[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("skillmatch_recruiter_applicants");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn("Failed to read recruiter applicants cache:", e);
      }
    }
    return initialApplicantsData;
  });

  const [selectedJobFilter, setSelectedJobFilter] = useState<string>("ALL");

  // Layout responsiveness
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Modals & Notifications
  const [scheduleCandidate, setScheduleCandidate] = useState<ApplicantCandidate | null>(null);
  const [scheduleDate, setScheduleDate] = useState("2026-09-25");
  const [scheduleTime, setScheduleTime] = useState("14:00");
  const [scheduleFormat, setScheduleFormat] = useState("AST Code Deep-Dive & Systems Architecture");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security warning dismissal with 4s auto-dismiss
  const [dismissedWarning, setDismissedWarning] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Client hydration synchronization effect
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cachedProfile = localStorage.getItem("skillmatch_recruiter_profile");
      if (cachedProfile) {
        const parsed = JSON.parse(cachedProfile);
        if (parsed && typeof parsed === "object" && (parsed.recruiterName || parsed.email)) {
          setProfile((prev) => ({ ...prev, ...parsed }));
        }
      }
      const cachedJobs = localStorage.getItem("skillmatch_recruiter_jobs");
      if (cachedJobs) {
        const parsedJobs = JSON.parse(cachedJobs);
        if (Array.isArray(parsedJobs) && parsedJobs.length > 0) setJobs(parsedJobs);
      }
      const cachedApps = localStorage.getItem("skillmatch_recruiter_applicants");
      if (cachedApps) {
        const parsedApps = JSON.parse(cachedApps);
        if (Array.isArray(parsedApps) && parsedApps.length > 0) setApplicants(parsedApps);
      }
    } catch (err) {
      console.warn("Recruiter hydration cache sync failed:", err);
    }
  }, []);

  useEffect(() => {
    if (warning === "unauthorized_candidate_access") {
      const fadeTimer = setTimeout(() => setIsFadingOut(true), 3700);
      const dismissTimer = setTimeout(() => setDismissedWarning(true), 4000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(dismissTimer);
      };
    }
  }, [warning]);

  const handleDismissWarning = () => {
    setIsFadingOut(true);
    setTimeout(() => setDismissedWarning(true), 300);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Live Supabase PostgreSQL Synchronization with LocalStorage backup
  useEffect(() => {
    let isMounted = true;
    async function syncRecruiterData() {
      const queryEmail =
        session?.user?.email ||
        (typeof window !== "undefined" ? localStorage.getItem("skillmatch_recruiter_email") : null) ||
        profile.email;

      if (!queryEmail) return;

      try {
        const [profileRes, jobsRes, appsRes] = await Promise.all([
          getRecruiterProfileAction(queryEmail),
          getJobsAction(),
          getRecruiterApplicationsAction(queryEmail),
        ]);

        if (isMounted && profileRes.success && profileRes.data) {
          setProfile((prev) => {
            const merged: RecruiterProfile = { ...prev, ...profileRes.data };
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem("skillmatch_recruiter_profile", JSON.stringify(merged));
                localStorage.setItem("skillmatch_recruiter_email", queryEmail);
              } catch (e) {
                console.warn("Failed to cache recruiter profile:", e);
              }
            }
            return merged;
          });
        }

        if (isMounted && jobsRes.success && jobsRes.data && jobsRes.data.length > 0) {
          setJobs(jobsRes.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_recruiter_jobs", JSON.stringify(jobsRes.data));
            } catch (e) {
              console.warn("Failed to cache recruiter jobs:", e);
            }
          }
        }

        if (isMounted && appsRes.success && appsRes.data && appsRes.data.length > 0) {
          setApplicants(appsRes.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_recruiter_applicants", JSON.stringify(appsRes.data));
            } catch (e) {
              console.warn("Failed to cache recruiter applicants:", e);
            }
          }
        }
      } catch (err) {
        console.warn("[RecruiterDashboard] Supabase sync fallback to local cache:", err);
      }
    }
    syncRecruiterData();
    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, profile.email]);

  const handleUpdateRecruiterProfile = async (updated: RecruiterProfile) => {
    setProfile(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("skillmatch_recruiter_profile", JSON.stringify(updated));
        if (updated.email) localStorage.setItem("skillmatch_recruiter_email", updated.email);
      } catch (e) {
        console.warn("Failed to persist recruiter profile to localStorage:", e);
      }
    }
    try {
      await updateRecruiterProfileAction({
        email: updated.email,
        recruiterName: updated.recruiterName,
        roleTitle: updated.roleTitle,
        companyName: updated.companyName,
        industry: updated.industry,
        location: updated.location,
        avatarUrl: updated.avatarUrl,
      });
    } catch (err) {
      console.error("[RecruiterDashboard] Failed to persist recruiter profile to Supabase:", err);
    }
  };

  // Job Management Handlers with LocalStorage persistence
  const handleCreateJob = async (newJobData: Omit<JobPosting, "id" | "applicantsCount" | "postedDate">) => {
    const tempId = `job-rec-${Date.now()}`;
    const newJob: JobPosting = {
      ...newJobData,
      id: tempId,
      applicantsCount: 0,
      postedDate: "Just now",
    };
    setJobs((prev) => {
      const updated = [newJob, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_jobs", JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to cache recruiter jobs:", e);
        }
      }
      return updated;
    });
    triggerToast(`Published new opening: "${newJob.title}"!`);

    try {
      const res = await createJobAction({
        title: newJobData.title,
        team: newJobData.team,
        location: newJobData.location,
        workModel: newJobData.workModel,
        salary: newJobData.salary,
        minMatch: newJobData.minMatch,
        description: newJobData.description,
        skills: newJobData.skills,
        recruiterEmail: profile.email,
        companyName: profile.companyName,
      });

      if (res.success && res.data?.id) {
        setJobs((prev) => {
          const updated = prev.map((j) => (j.id === tempId ? { ...j, id: res.data.id } : j));
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("skillmatch_recruiter_jobs", JSON.stringify(updated));
            } catch (e) {
              console.warn("Failed to cache recruiter jobs:", e);
            }
          }
          return updated;
        });
      }
    } catch (err) {
      console.error("[handleCreateJob] Postgres job creation error:", err);
    }
  };

  const handleToggleJobStatus = async (id: string) => {
    setJobs((prev) => {
      const updated = prev.map((j) => {
        if (j.id === id) {
          const nextStatus: "Active" | "Paused" = j.status === "Active" ? "Paused" : "Active";
          triggerToast(`Job "${j.title}" is now ${nextStatus}.`);
          return { ...j, status: nextStatus };
        }
        return j;
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_jobs", JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to cache recruiter jobs:", e);
        }
      }
      return updated;
    });

    try {
      await toggleJobStatusAction(id);
    } catch (err) {
      console.error("[handleToggleJobStatus] Error:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    const job = jobs.find((j) => j.id === id);
    setJobs((prev) => {
      const updated = prev.filter((j) => j.id !== id);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_jobs", JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to cache recruiter jobs:", e);
        }
      }
      return updated;
    });
    if (job) {
      triggerToast(`Removed listing: "${job.title}".`);
    }

    try {
      await deleteJobAction(id);
    } catch (err) {
      console.error("[handleDeleteJob] Error:", err);
    }
  };

  // Pipeline Handlers with Supabase Audit History & LocalStorage persistence
  const handleShortlistCandidate = async (id: string) => {
    setApplicants((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, stage: "Shortlisted" as const } : c));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_applicants", JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to cache recruiter applicants:", e);
        }
      }
      return updated;
    });
    try {
      await updateCandidateStageAction(id, "Assessment Passed", "Shortlisted by technical recruiter");
    } catch (err) {
      console.error("[handleShortlistCandidate] Error:", err);
    }
  };

  const handleRejectCandidate = async (id: string) => {
    setApplicants((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, stage: "Rejected" as const } : c));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_applicants", JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to cache recruiter applicants:", e);
        }
      }
      return updated;
    });
    try {
      await updateCandidateStageAction(id, "Rejected", "Application rejected by hiring team");
    } catch (err) {
      console.error("[handleRejectCandidate] Error:", err);
    }
  };

  const handleConfirmSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleCandidate) return;

    const candId = scheduleCandidate.id;
    setApplicants((prev) => {
      const updated = prev.map((c) =>
        c.id === candId ? { ...c, stage: "Interview Scheduled" as const } : c
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("skillmatch_recruiter_applicants", JSON.stringify(updated));
        } catch (err) {
          console.warn("Failed to cache recruiter applicants:", e);
        }
      }
      return updated;
    });

    const toastMsg =
      language === "bn"
        ? `${scheduleCandidate.name}-এর সাথে সাক্ষাৎকার নিশ্চিত হয়েছে (${scheduleDate} তারিখ, ${scheduleTime} সময়)!`
        : `Interview confirmed with ${scheduleCandidate.name} on ${scheduleDate} at ${scheduleTime}!`;
    triggerToast(toastMsg);
    setScheduleCandidate(null);

    try {
      await updateCandidateStageAction(
        candId,
        "Interview Scheduled",
        `Interview confirmed for ${scheduleDate} at ${scheduleTime} (${scheduleFormat})`
      );
    } catch (err) {
      console.error("[handleConfirmSchedule] Error:", err);
    }
  };

  const handleNavigateToPipeline = (jobId?: string) => {
    if (jobId) {
      setSelectedJobFilter(jobId);
    } else {
      setSelectedJobFilter("ALL");
    }
    setActiveTab("pipeline");
  };

  // Close schedule modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && scheduleCandidate) {
        setScheduleCandidate(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scheduleCandidate]);

  // Computed metrics
  const activeJobsCount = jobs.filter((j) => j.status === "Active").length;
  const totalApplicantsCount = applicants.length;
  const shortlistedCount = applicants.filter((a) => a.stage === "Shortlisted").length;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row antialiased selection:bg-secondary-mint/20">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary-container text-white shadow-level-3 border border-secondary-mint/40 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-secondary-mint shrink-0" aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Recruiter Left Sidebar */}
      <RecruiterSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        profile={profile}
        activeJobsCount={activeJobsCount}
        totalApplicantsCount={totalApplicantsCount}
        shortlistedCount={shortlistedCount}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Dynamic View Area (Full-Width Responsive) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header
          role="banner"
          className="h-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation sidebar"
              aria-expanded={isMobileOpen}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-extrabold text-on-surface tracking-tight">
                  {profile.companyName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 text-secondary-mint" aria-hidden="true" />
                  <span>{language === "bn" ? "এন্টারপ্রাইজ রিক্রুটার পোর্টাল" : "Enterprise Recruiter Portal"}</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <StatusDot size="sm" />
                <span>{language === "bn" ? "যাচাইকৃত ট্যালেন্ট অ্যাকুইজিশন সেশন" : "Verified Talent Acquisition Session"}</span>
                <span aria-hidden="true">•</span>
                <span className="font-mono text-primary-container font-semibold">{profile.recruiterName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sleek Dual Language Switcher */}
            <LanguageSwitcher variant="pill" />

            {/* Verified Partner Badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs font-bold text-primary-container"
              aria-label="Account status: Verified Enterprise Partner"
            >
              <Building2 className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
              <span className="hidden sm:inline">{t.common.role}: {t.common.recruiter}</span>
              <span className="sm:hidden font-mono">HIRING</span>
            </div>

            {/* Quick Profile Avatar Shortcut */}
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              title={t.sidebar.settings}
              aria-label={`${t.sidebar.settings} - ${profile.recruiterName}`}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-primary-container text-white hover:border-secondary-mint flex items-center justify-center text-xs font-black transition-all overflow-hidden cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
            >
              {profile.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatarUrl} alt={profile.recruiterName} className="w-full h-full object-cover" />
              ) : (
                <span>
                  {profile.recruiterName
                    ? profile.recruiterName
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "RC"}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Full-Width Body Container */}
        <main id="main-content" className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Security Warning Banner with 4s auto-dismiss & close button */}
          {warning === "unauthorized_candidate_access" && !dismissedWarning && (
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
                      ? "প্রবেশাধিকার নিষিদ্ধ: ক্যান্ডিডেট ডজিয়ার সীমাবদ্ধ"
                      : "Access Denied: Candidate Dossier Restricted"}
                  </p>
                  <p className="text-accent-gap/90 mt-0.5 leading-relaxed font-medium">
                    {language === "bn"
                      ? "আপনার অ্যাকাউন্টটি রিক্রুটার পরিচয়পত্রে লগইন রয়েছে। সিকিউরিটি নীতির কারণে ক্যান্ডিডেট পোর্টালে প্রবেশাধিকার সীমিত। আপনাকে রিক্রুটার কনসোলে রিডাইরেক্ট করা হয়েছে।"
                      : "Your account is authenticated with recruiter credentials. Access to candidate job application portals and personal resumes is restricted by SkillMatch Role-Based Access Control. You have been safely redirected to your company recruitment console."}
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
              id="recruiter-tabpanel-overview"
              aria-labelledby="recruiter-tab-overview"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <RecruiterOverviewTab
                profile={profile}
                jobs={jobs}
                applicants={applicants}
                onNavigateToTab={(tab) => setActiveTab(tab)}
                onShortlistCandidate={handleShortlistCandidate}
                onScheduleCandidate={(id) => {
                  const candidate = applicants.find((a) => a.id === id);
                  if (candidate) setScheduleCandidate(candidate);
                }}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 2: POST JOB */}
          {activeTab === "post-job" && (
            <section
              role="tabpanel"
              id="recruiter-tabpanel-post-job"
              aria-labelledby="recruiter-tab-post-job"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <PostJobTab
                jobs={jobs}
                onCreateJob={handleCreateJob}
                onToggleJobStatus={handleToggleJobStatus}
                onDeleteJob={handleDeleteJob}
                onNavigateToPipeline={(jobId?: string) => handleNavigateToPipeline(jobId)}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 3: CANDIDATE PIPELINE / ATS */}
          {activeTab === "pipeline" && (
            <section
              role="tabpanel"
              id="recruiter-tabpanel-pipeline"
              aria-labelledby="recruiter-tab-pipeline"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <AtsPipelineTab
                applicants={applicants}
                jobs={jobs}
                selectedJobFilter={selectedJobFilter}
                onFilterByJob={(jobId) => setSelectedJobFilter(jobId)}
                onShortlistCandidate={handleShortlistCandidate}
                onRejectCandidate={handleRejectCandidate}
                onOpenScheduleModal={(cand) => setScheduleCandidate(cand)}
                onTriggerToast={triggerToast}
              />
            </section>
          )}

          {/* TAB 4: TALENT SEARCH */}
          {activeTab === "talent-search" && (
            <section
              role="tabpanel"
              id="recruiter-tabpanel-talent-search"
              aria-labelledby="recruiter-tab-talent-search"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <TalentSearchTab jobs={jobs} onTriggerToast={triggerToast} />
            </section>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <section
              role="tabpanel"
              id="recruiter-tabpanel-settings"
              aria-labelledby="recruiter-tab-settings"
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <RecruiterSettingsTab
                profile={profile}
                onUpdateProfile={handleUpdateRecruiterProfile}
                onTriggerToast={triggerToast}
              />
            </section>
          )}
        </main>
      </div>

      {/* SCHEDULE INTERVIEW MODAL */}
      {scheduleCandidate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
          onClick={() => setScheduleCandidate(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                  {scheduleCandidate.avatarUrl ? (
                    <img
                      src={scheduleCandidate.avatarUrl}
                      alt={scheduleCandidate.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-container to-[#0A2E28] text-white font-extrabold flex items-center justify-center text-sm">
                      {scheduleCandidate.initials}
                    </div>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold uppercase mb-1">
                    <Calendar className="w-3 h-3 text-secondary-mint" aria-hidden="true" />
                    <span>{t.recruiter.techEvalSession}</span>
                  </div>
                  <h3 id="schedule-modal-title" className="text-base font-black text-on-surface">
                    {t.recruiter.scheduleInterviewWith} {scheduleCandidate.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {scheduleCandidate.university} • {scheduleCandidate.degree} • {language === "bn" ? "স্কিল ম্যাচ:" : "Match:"}{" "}
                    <span className="font-mono font-bold text-primary-container">
                      {scheduleCandidate.matchScore.toFixed(0)}%
                    </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScheduleCandidate(null)}
                aria-label="Close interview scheduling modal"
                className="text-slate-500 hover:text-on-surface cursor-pointer p-1.5 rounded-lg hover:bg-surface-container-low transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="schedule-date-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.recruiter.dateLabel}
                  </label>
                  <input
                    id="schedule-date-input"
                    type="date"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="schedule-time-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.recruiter.timeLabel}
                  </label>
                  <input
                    id="schedule-time-input"
                    type="time"
                    required
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="schedule-format-select" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.formatLabel}
                </label>
                <select
                  id="schedule-format-select"
                  value={scheduleFormat}
                  onChange={(e) => setScheduleFormat(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  <option value="Technical Interview & System Design">
                    {language === "bn"
                      ? "টেকনিক্যাল ইন্টারভিউ ও সিস্টেম ডিজাইন (৬০ মিনিট)"
                      : "Technical Interview & System Design (60 min)"}
                  </option>
                  <option value="Live Coding & Problem Solving">
                    {language === "bn"
                      ? "লাইভ কোডিং ও প্রবলেম সলভিং (৪৫ মিনিট)"
                      : "Live Coding & Problem Solving (45 min)"}
                  </option>
                  <option value="Hiring Manager & Team Fit Round">
                    {language === "bn"
                      ? "হায়ারিং ম্যানেজার ও টিম ফিট রাউন্ড (৩০ মিনিট)"
                      : "Hiring Manager & Team Fit Round (30 min)"}
                  </option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium">
                {t.recruiter.calendarInviteNotice}{" "}
                <span className="font-mono text-on-surface font-semibold">{scheduleCandidate.email}</span>.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleCandidate(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:text-on-surface hover:bg-surface-container-low cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-secondary-mint" />
                  <span>{t.recruiter.sendCalendarInvite}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecruiterDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-outline">
          Loading enterprise recruiter portal...
        </div>
      }
    >
      <RecruiterDashboardContent />
    </Suspense>
  );
}
