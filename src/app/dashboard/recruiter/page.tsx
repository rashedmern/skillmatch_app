"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
    team: "Core Consensus & Storage Engine",
    location: "San Francisco, CA",
    workModel: "Hybrid",
    salary: "$195,000 - $225,000",
    minMatch: 90,
    applicantsCount: 6,
    status: "Active",
    skills: ["Go", "Raft", "Distributed Systems", "gRPC", "RocksDB"],
    description:
      "Lead design and implementation of fault-tolerant replicated state machines using Raft in Go. Profile p99 tail latency and build zero-copy network pipelines.",
    postedDate: "Sep 18, 2026",
  },
  {
    id: "job-rec-2",
    title: "Linux Kernel & eBPF Telemetry Specialist",
    team: "Low-Level Networking & Observability",
    location: "San Francisco, CA",
    workModel: "On-site",
    salary: "$185,000 - $215,000",
    minMatch: 88,
    applicantsCount: 4,
    status: "Active",
    skills: ["C", "Linux Kernel", "eBPF", "DPDK", "BCC"],
    description:
      "Write high-performance eBPF probes for kernel networking hooks. Trace socket packet drops, compute lock contention metrics, and build low-overhead monitoring daemons.",
    postedDate: "Sep 14, 2026",
  },
  {
    id: "job-rec-3",
    title: "High-Throughput Network Architect (C++/DPDK)",
    team: "High-Performance Data Plane",
    location: "Remote (US)",
    workModel: "Remote",
    salary: "$190,000 - $220,000",
    minMatch: 92,
    applicantsCount: 3,
    status: "Active",
    skills: ["C++20", "DPDK", "Zero-Copy", "Ring Buffers", "TCP/IP"],
    description:
      "Architect microsecond-scale network proxy layers handling millions of concurrent persistent streaming connections with kernel-bypass networking.",
    postedDate: "Sep 10, 2026",
  },
  {
    id: "job-rec-4",
    title: "Compilers & AST Optimization Engineer",
    team: "Static Analysis & Tooling",
    location: "Remote (US)",
    workModel: "Remote",
    salary: "$175,000 - $205,000",
    minMatch: 85,
    applicantsCount: 5,
    status: "Paused",
    skills: ["Rust", "LLVM", "Tree-sitter", "Static Analysis", "Compilers"],
    description:
      "Develop custom static analysis passes and Tree-sitter parsers for automated algorithmic AST code verification and safety checks.",
    postedDate: "Aug 29, 2026",
  },
];

const initialApplicantsData: ApplicantCandidate[] = [
  {
    id: "cand-1",
    name: "Alex Chen",
    initials: "AC",
    university: "UC Berkeley",
    degree: "B.S. EECS ('26)",
    email: "alex.chen@berkeley.edu",
    matchScore: 94.2,
    astNodes: 14280,
    highlightRepo: "distributed-kv-store (Raft in Go)",
    jobId: "job-rec-1",
    jobTitle: "Staff Distributed Systems Engineer",
    appliedDate: "Sep 20, 2026",
    stage: "Interview Scheduled",
  },
  {
    id: "cand-2",
    name: "Elena Rostova",
    initials: "ER",
    university: "Stanford University",
    degree: "M.S. Computer Science ('25)",
    email: "elena.r@stanford.edu",
    matchScore: 96.1,
    astNodes: 18400,
    highlightRepo: "raft-consensus-engine (Rust)",
    jobId: "job-rec-1",
    jobTitle: "Staff Distributed Systems Engineer",
    appliedDate: "Sep 21, 2026",
    stage: "Shortlisted",
  },
  {
    id: "cand-3",
    name: "Marcus Vance",
    initials: "MV",
    university: "Carnegie Mellon",
    degree: "B.S. ECE ('26)",
    email: "m.vance@andrew.cmu.edu",
    matchScore: 92.4,
    astNodes: 11200,
    highlightRepo: "zero-copy-network-stack (C++)",
    jobId: "job-rec-3",
    jobTitle: "High-Throughput Network Architect (C++/DPDK)",
    appliedDate: "Sep 19, 2026",
    stage: "New Applicant",
  },
  {
    id: "cand-4",
    name: "Priya Sharma",
    initials: "PS",
    university: "MIT",
    degree: "M.Eng. EECS ('25)",
    email: "psharma@mit.edu",
    matchScore: 95.8,
    astNodes: 16900,
    highlightRepo: "eBPF-kernel-probe (C/Linux)",
    jobId: "job-rec-2",
    jobTitle: "Linux Kernel & eBPF Telemetry Specialist",
    appliedDate: "Sep 17, 2026",
    stage: "Offer Stage",
  },
  {
    id: "cand-5",
    name: "David Kim",
    initials: "DK",
    university: "UIUC",
    degree: "B.S. Computer Science ('26)",
    email: "dkim@illinois.edu",
    matchScore: 89.5,
    astNodes: 9800,
    highlightRepo: "distributed-cache-sync (TypeScript/Go)",
    jobId: "job-rec-1",
    jobTitle: "Staff Distributed Systems Engineer",
    appliedDate: "Sep 16, 2026",
    stage: "New Applicant",
  },
  {
    id: "cand-6",
    name: "Zoe Martinez",
    initials: "ZM",
    university: "Caltech",
    degree: "B.S. Applied Computation ('25)",
    email: "zmartinez@caltech.edu",
    matchScore: 97.4,
    astNodes: 21400,
    highlightRepo: "quantized-llm-kernel (C++/CUDA)",
    jobId: "job-rec-3",
    jobTitle: "High-Throughput Network Architect (C++/DPDK)",
    appliedDate: "Sep 15, 2026",
    stage: "Shortlisted",
  },
];

function RecruiterDashboardContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");
  const { t, language } = useLanguage();

  // State Management
  const [activeTab, setActiveTab] = useState<RecruiterTabType>("overview");
  const [profile, setProfile] = useState<RecruiterProfile>(initialRecruiterProfile);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobPostings);
  const [applicants, setApplicants] = useState<ApplicantCandidate[]>(initialApplicantsData);
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

  // Job Management Handlers
  const handleCreateJob = (newJobData: Omit<JobPosting, "id" | "applicantsCount" | "postedDate">) => {
    const newJob: JobPosting = {
      ...newJobData,
      id: `job-rec-${Date.now()}`,
      applicantsCount: 0,
      postedDate: "Just now",
    };
    setJobs((prev) => [newJob, ...prev]);
    triggerToast(`Published new opening: "${newJob.title}"!`);
  };

  const handleToggleJobStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const nextStatus = j.status === "Active" ? "Paused" : "Active";
          triggerToast(`Job "${j.title}" is now ${nextStatus}.`);
          return { ...j, status: nextStatus };
        }
        return j;
      })
    );
  };

  const handleDeleteJob = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (job) {
      triggerToast(`Removed listing: "${job.title}".`);
    }
  };

  // Pipeline Handlers
  const handleShortlistCandidate = (id: string) => {
    setApplicants((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: "Shortlisted" as const } : c))
    );
  };

  const handleRejectCandidate = (id: string) => {
    setApplicants((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: "Rejected" as const } : c))
    );
  };

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleCandidate) return;

    setApplicants((prev) =>
      prev.map((c) =>
        c.id === scheduleCandidate.id ? { ...c, stage: "Interview Scheduled" as const } : c
      )
    );

    triggerToast(`Interview confirmed with ${scheduleCandidate.name} on ${scheduleDate} at ${scheduleTime}!`);
    setScheduleCandidate(null);
  };

  const handleNavigateToPipeline = (jobId?: string) => {
    if (jobId) {
      setSelectedJobFilter(jobId);
    } else {
      setSelectedJobFilter("ALL");
    }
    setActiveTab("pipeline");
  };

  // Computed metrics
  const activeJobsCount = jobs.filter((j) => j.status === "Active").length;
  const totalApplicantsCount = applicants.length;
  const shortlistedCount = applicants.filter((a) => a.stage === "Shortlisted").length;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row antialiased selection:bg-secondary-mint/20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary-container text-white shadow-level-3 border border-secondary-mint/40 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-secondary-mint shrink-0" />
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
        <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation sidebar"
              className="md:hidden p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-on-surface tracking-tight">
                  {profile.companyName}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 text-secondary-mint" />
                  <span>{language === "bn" ? "এন্টারপ্রাইজ রিক্রুটার পোর্টাল" : "Enterprise Recruiter Portal"}</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-outline">
                <StatusDot size="sm" />
                <span>{language === "bn" ? "যাচাইকৃত ট্যালেন্ট অ্যাকুইজিশন সেশন" : "Verified Talent Acquisition Session"}</span>
                <span>•</span>
                <span className="font-mono text-primary-container font-semibold">{profile.recruiterName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sleek Dual Language Switcher */}
            <LanguageSwitcher variant="pill" />

            {/* Verified Partner Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs font-bold text-primary-container">
              <Building2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span className="hidden sm:inline">{t.common.role}: {t.common.recruiter}</span>
              <span className="sm:hidden font-mono">HIRING</span>
            </div>

            {/* Quick Profile Avatar Shortcut */}
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              title={t.sidebar.settings}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-primary-container text-white hover:border-secondary-mint flex items-center justify-center text-xs font-black transition-all overflow-hidden cursor-pointer shadow-xs"
            >
              {profile.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatarUrl} alt={profile.recruiterName} className="w-full h-full object-cover" />
              ) : (
                <span>SJ</span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Full-Width Body Container */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Security Warning Banner with 4s auto-dismiss & close button */}
          {warning === "unauthorized_candidate_access" && !dismissedWarning && (
            <div
              className={`p-4 rounded-xl bg-accent-gap/10 border border-accent-gap/30 text-accent-gap flex items-start justify-between gap-3 text-xs shadow-sm transition-all duration-300 ${
                isFadingOut ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="font-bold text-sm">
                    {language === "bn"
                      ? "প্রবেশাধিকার নিষিদ্ধ: ক্যান্ডিডেট ডজিয়ার সীমাবদ্ধ"
                      : "Access Denied: Candidate Dossier Restricted"}
                  </p>
                  <p className="text-accent-gap/90 mt-0.5 leading-relaxed">
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
                className="text-accent-gap/70 hover:text-accent-gap hover:bg-accent-gap/15 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <RecruiterOverviewTab
              profile={profile}
              jobs={jobs}
              applicants={applicants}
              onNavigateToTab={(tab) => {
                if (tab === "pipeline") handleNavigateToPipeline();
                else setActiveTab(tab);
              }}
              onShortlistCandidate={handleShortlistCandidate}
              onScheduleCandidate={(id) => {
                const c = applicants.find((a) => a.id === id);
                if (c) setScheduleCandidate(c);
              }}
              onTriggerToast={triggerToast}
            />
          )}

          {/* TAB 2: POST JOB */}
          {activeTab === "post-job" && (
            <PostJobTab
              jobs={jobs}
              onCreateJob={handleCreateJob}
              onToggleJobStatus={handleToggleJobStatus}
              onDeleteJob={handleDeleteJob}
              onNavigateToPipeline={handleNavigateToPipeline}
              onTriggerToast={triggerToast}
            />
          )}

          {/* TAB 3: CANDIDATE PIPELINE / ATS */}
          {activeTab === "pipeline" && (
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
          )}

          {/* TAB 4: TALENT SEARCH */}
          {activeTab === "talent-search" && (
            <TalentSearchTab jobs={jobs} onTriggerToast={triggerToast} />
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <RecruiterSettingsTab
              profile={profile}
              onUpdateProfile={(updated) => setProfile(updated)}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* SCHEDULE INTERVIEW MODAL */}
      {scheduleCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold uppercase mb-1">
                  <Calendar className="w-3 h-3 text-secondary-mint" />
                  <span>Technical Evaluation Session</span>
                </div>
                <h3 className="text-base font-black text-on-surface">
                  Schedule Interview with {scheduleCandidate.name}
                </h3>
                <p className="text-xs text-outline mt-0.5">
                  {scheduleCandidate.university} • {scheduleCandidate.degree} • AST Match:{" "}
                  <span className="font-mono font-bold text-primary-container">
                    {scheduleCandidate.matchScore.toFixed(1)}%
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScheduleCandidate(null)}
                className="text-outline hover:text-on-surface cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Time (PST)
                  </label>
                  <input
                    type="time"
                    required
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Interview Format &amp; Focus Area
                </label>
                <select
                  value={scheduleFormat}
                  onChange={(e) => setScheduleFormat(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer"
                >
                  <option value="AST Code Deep-Dive & Systems Architecture">
                    AST Code Deep-Dive &amp; Systems Architecture (60 min)
                  </option>
                  <option value="Live Distributed Systems Coding & Concurrency">
                    Live Distributed Systems Coding &amp; Concurrency (45 min)
                  </option>
                  <option value="Engineering VP & Team Cultural Fit Discussion">
                    Engineering VP &amp; Team Cultural Fit Discussion (30 min)
                  </option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 text-outline text-[11px] leading-relaxed">
                A calendar invitation with secure video conferencing link and AST syntax audit dossier will be automatically dispatched to <span className="font-mono text-on-surface font-semibold">{scheduleCandidate.email}</span>.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleCandidate(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-on-surface hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-secondary-mint" />
                  <span>Send Calendar Invite</span>
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
