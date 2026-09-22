"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Building2,
  Code2,
  Briefcase,
  Users,
  PlusCircle,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  LogOut,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Terminal,
  ShieldCheck,
  ShieldAlert,
  X,
} from "lucide-react";

interface CandidateApplicant {
  id: string;
  name: string;
  initials: string;
  university: string;
  degree: string;
  email: string;
  matchScore: number;
  astNodes: number;
  highlightRepo: string;
  stage: "New Applicant" | "AST Screen Passed" | "Interview Scheduled" | "Offer Stage";
}

interface JobPosting {
  id: string;
  title: string;
  team: string;
  location: string;
  salary: string;
  minMatch: number;
  applicantsCount: number;
  status: "Active" | "Paused" | "Draft";
}

const initialApplicants: CandidateApplicant[] = [
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
    stage: "AST Screen Passed",
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
    stage: "Offer Stage",
  },
  {
    id: "cand-5",
    name: "David Kim",
    initials: "DK",
    university: "Georgia Tech",
    degree: "B.S. Computer Science ('26)",
    email: "dkim42@gatech.edu",
    matchScore: 89.7,
    astNodes: 9800,
    highlightRepo: "b-tree-storage-engine (Go)",
    stage: "New Applicant",
  },
];

const initialJobs: JobPosting[] = [
  {
    id: "job-1",
    title: "Staff Distributed Systems Engineer",
    team: "Core Infrastructure",
    location: "San Francisco, CA (Hybrid)",
    salary: "$185,000 - $210,000",
    minMatch: 90,
    applicantsCount: 28,
    status: "Active",
  },
  {
    id: "job-2",
    title: "Core Platform SRE Engineer",
    team: "Cloud Operations",
    location: "San Francisco, CA / Remote",
    salary: "$175,000 - $195,000",
    minMatch: 85,
    applicantsCount: 42,
    status: "Active",
  },
  {
    id: "job-3",
    title: "Systems Performance & Kernel Lead",
    team: "Performance Architecture",
    location: "Remote (US)",
    salary: "$190,000 - $220,000",
    minMatch: 88,
    applicantsCount: 19,
    status: "Active",
  },
  {
    id: "job-4",
    title: "Database Engine & Storage Developer",
    team: "Data Tier",
    location: "New York, NY",
    salary: "$180,000 - $205,000",
    minMatch: 87,
    applicantsCount: 14,
    status: "Active",
  },
];

function RecruiterDashboardContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");

  const [activeTab, setActiveTab] = useState<"pool" | "jobs" | "pipeline">("pool");
  const [applicants] = useState<CandidateApplicant[]>(initialApplicants);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [showNewJobModal, setShowNewJobModal] = useState(false);
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

  // New Job Modal Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTeam, setNewTeam] = useState("Core Infrastructure");
  const [newLocation, setNewLocation] = useState("San Francisco, CA (Hybrid)");
  const [newSalary, setNewSalary] = useState("$180,000 - $210,000");
  const [newMinMatch, setNewMinMatch] = useState(90);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const createdJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: newTitle,
      team: newTeam,
      location: newLocation,
      salary: newSalary,
      minMatch: Number(newMinMatch),
      applicantsCount: 0,
      status: "Active",
    };

    setJobs([createdJob, ...jobs]);
    setShowNewJobModal(false);
    setNewTitle("");
    triggerToast(`New role '${createdJob.title}' published to verified ABET student network!`);
  };

  const filteredApplicants = applicants.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.highlightRepo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUni =
      selectedUniversity === "all" ||
      c.university.toLowerCase().includes(selectedUniversity.toLowerCase());

    return matchesSearch && matchesUni;
  });

  const getStageBadge = (stage: CandidateApplicant["stage"]) => {
    switch (stage) {
      case "Offer Stage":
        return "bg-secondary/15 text-secondary-mint border-secondary/30";
      case "Interview Scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      case "AST Screen Passed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-slate-100 text-on-surface-variant border-slate-200";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-primary-container text-white text-xs font-semibold shadow-level-3 flex items-center gap-3 border border-secondary-mint/30 animate-bounce">
          <Sparkles className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="w-full border-b border-stroke-card bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BrandLogo size="md" />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-slate-200 text-xs text-on-surface-variant font-medium">
              <StatusDot size="sm" />
              <span>Recruiter Portal • Enterprise Talent Gateway</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* RBAC Role Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs font-bold text-primary">
              <Building2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Role: Recruiter</span>
            </div>

            {/* Switch Role Test Link (Triggers RBAC Middleware Block) */}
            <Link
              href="/dashboard/candidate"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-outline hover:text-on-surface hover:bg-surface-container-low transition-all"
              title="Test RBAC security enforcement"
            >
              <Code2 className="w-3 h-3" />
              <span className="hidden md:inline">Test Candidate Route</span>
            </Link>

            {/* Post New Job Action Button */}
            <button
              type="button"
              onClick={() => setShowNewJobModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Role</span>
            </button>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-on-surface-variant hover:text-accent-gap hover:border-accent-gap/30 hover:bg-accent-gap/5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Security Warning Banner (Triggered by RBAC Middleware) */}
        {warning === "unauthorized_candidate_access" && !dismissedWarning && (
          <div
            className={`p-4 rounded-xl bg-accent-gap/10 border border-accent-gap/30 text-accent-gap flex items-start justify-between gap-3 text-xs shadow-sm transition-all duration-300 ${
              isFadingOut ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-bold text-sm">Access Denied: Candidate Dossier Restricted</p>
                <p className="text-accent-gap/90 mt-0.5 leading-relaxed">
                  Your account is currently registered with enterprise recruiter authorization. Student
                  examination dossiers and candidate private telemetry are restricted to authenticated
                  candidates. You have been redirected to your enterprise recruitment pool.
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

        {/* Recruiter Overview Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.35),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.2),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container">
                <StatusDot size="sm" />
                <span>Verified Talent Sourcing Pool</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2">
                ScaleOps Talent Engineering Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Source top-percentile engineering talent through verified AST syntax parsing, ABET university alignment, and direct candidate interview dispatch.
              </p>
            </div>

            {/* Quick Metrics Pill */}
            <div className="grid grid-cols-2 gap-3 self-stretch md:self-auto">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  Verified Candidates
                </div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-secondary-container">
                  1,240
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  Active Open Roles
                </div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-secondary-container">
                  {jobs.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-stroke-card pb-1">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("pool")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "pool"
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Verified Applicant Pool</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {filteredApplicants.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "jobs"
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Active Job Postings</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {jobs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Recruitment Funnel &amp; Pipeline</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowNewJobModal(true)}
            className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-bold"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>

        {/* TAB 1: APPLICANT POOL */}
        {activeTab === "pool" && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-between bg-white p-3 rounded-2xl border border-stroke-card shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  placeholder="Search candidate by name, repo, or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-outline" />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="text-xs bg-surface-container-low border border-slate-200 rounded-lg px-2.5 py-1.5 text-on-surface focus:outline-none focus:border-secondary-mint"
                >
                  <option value="all">All ABET Universities</option>
                  <option value="berkeley">UC Berkeley</option>
                  <option value="stanford">Stanford University</option>
                  <option value="mit">MIT</option>
                  <option value="cmu">Carnegie Mellon</option>
                  <option value="georgia">Georgia Tech</option>
                </select>
              </div>
            </div>

            {/* Applicants Table */}
            <div className="overflow-hidden rounded-2xl border border-stroke-card bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-stroke-card text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Candidate &amp; University</th>
                      <th className="py-3 px-4">AST Vector Match</th>
                      <th className="py-3 px-4">Verified GitHub Codebase</th>
                      <th className="py-3 px-4">Current Stage</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplicants.map((cand) => (
                      <tr key={cand.id} className="hover:bg-surface-container-lowest/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                              {cand.initials}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                                <span>{cand.name}</span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint" />
                              </div>
                              <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                                <GraduationCap className="w-3 h-3 text-secondary-mint" />
                                <span>{cand.university} • {cand.degree}</span>
                              </div>
                              <div className="text-[11px] font-mono text-outline">{cand.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          <div className="inline-flex items-center gap-1 font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded text-xs">
                            {cand.matchScore}% Match
                          </div>
                          <div className="text-[10px] text-outline mt-0.5">
                            {cand.astNodes.toLocaleString()} AST Nodes
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-mono text-xs font-semibold text-primary flex items-center gap-1">
                            <Terminal className="w-3.5 h-3.5 text-secondary-mint" />
                            <span>{cand.highlightRepo}</span>
                          </div>
                          <div className="text-[10px] text-outline mt-0.5">
                            Syntactic integrity verified with zero AI hallucinations
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStageBadge(
                              cand.stage
                            )}`}
                          >
                            {cand.stage}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => triggerToast(`Dossier opened for ${cand.name}. Direct candidate interview invite prepared.`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                          >
                            <span>Schedule</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE JOB POSTINGS */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-on-surface tracking-tight">
                  Active Engineering Positions
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Positions matched against real AST syntactic syntax models.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewJobModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Position</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/40 transition-all shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary-mint text-[11px] font-bold border border-secondary/30">
                      {job.team}
                    </span>
                    <span className="text-xs font-mono font-bold text-outline">
                      Min {job.minMatch}% Match
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-on-surface">{job.title}</h3>
                    <p className="text-xs text-outline font-mono mt-0.5">
                      {job.salary} • {job.location}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-primary flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {job.applicantsCount} Verified Applicants
                    </span>

                    <button
                      type="button"
                      onClick={() => triggerToast(`Filtering candidate pool for ${job.title}...`)}
                      className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-surface-container-low text-xs font-bold text-on-surface transition-colors cursor-pointer"
                    >
                      View Pool
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PIPELINE & FUNNEL */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-on-surface">
                  Autonomous Recruitment Funnel (ABET Sourcing)
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Visual breakdown of candidates moving from institutional verification to technical screen and hire.
                </p>
              </div>

              {/* Visual Pipeline Funnel */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { stage: "Sourced (.edu)", count: 42, rate: "100%", color: "border-slate-200 bg-surface-container-low" },
                  { stage: "AST Screen", count: 28, rate: "66.7%", color: "border-blue-200 bg-blue-50/50" },
                  { stage: "Technical Screen", count: 14, rate: "33.3%", color: "border-amber-200 bg-amber-50/50" },
                  { stage: "Partner Final", count: 6, rate: "14.3%", color: "border-purple-200 bg-purple-50/50" },
                  { stage: "Offer Accepted", count: 2, rate: "4.8%", color: "border-secondary/40 bg-secondary/10" },
                ].map((step, idx) => (
                  <div
                    key={step.stage}
                    className={`p-4 rounded-xl border text-center space-y-1 ${step.color}`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-outline">
                      Step {idx + 1}
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-on-surface">
                      {step.count}
                    </div>
                    <div className="text-xs font-bold text-on-surface">{step.stage}</div>
                    <div className="text-[11px] font-mono text-secondary-mint font-semibold mt-1">
                      {step.rate} conversion
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-surface border border-stroke-card flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary-mint" />
                  <span className="text-on-surface font-medium">
                    All candidates in this pipeline possess accredited institutional (.edu) email confirmation.
                  </span>
                </div>
                <span className="font-mono text-outline text-[11px]">SOC-2 Audited Pipeline</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Post New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-stroke-card shadow-level-3 p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-stroke-card pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" />
                <h3 className="text-base font-extrabold text-on-surface">
                  Post New Engineering Role
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewJobModal(false)}
                className="text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Database Engineer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Engineering Team
                  </label>
                  <input
                    type="text"
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Location / Work Model
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Salary Range (USD)
                  </label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Min AST Match % Cutoff
                  </label>
                  <input
                    type="number"
                    min="70"
                    max="99"
                    value={newMinMatch}
                    onChange={(e) => setNewMinMatch(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface-variant text-[11px]">
                <span className="font-bold text-on-surface">Target Distribution:</span> Only candidates from ABET-accredited computer science departments meeting your AST match cutoff will be alerted.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-on-surface font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold transition-all cursor-pointer shadow-sm"
                >
                  Publish Role
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
    <Suspense fallback={<div className="p-8 text-center text-xs text-outline">Loading recruiter portal...</div>}>
      <RecruiterDashboardContent />
    </Suspense>
  );
}
