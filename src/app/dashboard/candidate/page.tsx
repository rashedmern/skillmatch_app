"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Code2,
  Building2,
  Cpu,
  LogOut,
  CheckCircle2,
  Sparkles,
  Terminal,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  FileText,
  Briefcase,
  BarChart3,
  Upload,
  Download,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface AppliedJob {
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

const mockAppliedJobs: AppliedJob[] = [
  {
    id: "app-1",
    company: "HyperScale AI",
    role: "Kernel & Memory Systems Engineer",
    location: "San Francisco, CA (Hybrid)",
    salary: "$200,000 - $230,000",
    appliedDate: "Sep 18, 2026",
    matchScore: 95,
    status: "Offer Extended",
    nextStep: "Review formal offer packet ($215k base + equity)",
  },
  {
    id: "app-2",
    company: "ScaleOps Inc.",
    role: "Distributed Systems Engineer",
    location: "San Francisco, CA",
    salary: "$185,000 - $210,000",
    appliedDate: "Sep 14, 2026",
    matchScore: 94,
    status: "Interview Scheduled",
    nextStep: "Technical Deep-Dive with Engineering VP (Tomorrow, 10:00 AM)",
  },
  {
    id: "app-3",
    company: "Veritas Cloud",
    role: "Core Infrastructure Engineer",
    location: "New York, NY",
    salary: "$175,000 - $195,000",
    appliedDate: "Sep 10, 2026",
    matchScore: 91,
    status: "Under Review",
    nextStep: "Dossier screened by Staff SRE lead",
  },
  {
    id: "app-4",
    company: "NeuralFlow",
    role: "Systems Performance Engineer",
    location: "Remote (US)",
    salary: "$190,000 - $220,000",
    appliedDate: "Sep 06, 2026",
    matchScore: 88,
    status: "Assessment Passed",
    nextStep: "AST Sandbox benchmark scored in 98th percentile",
  },
];

function CandidateDashboardContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");

  const [activeTab, setActiveTab] = useState<"overview" | "applied" | "skills" | "resume">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResumeUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      triggerToast("Resume AST parser completed: 48 tokens verified with 99.1% syntax accuracy.");
    }, 1500);
  };

  const getStatusBadge = (status: AppliedJob["status"]) => {
    switch (status) {
      case "Offer Extended":
        return "bg-secondary/15 text-secondary-mint border-secondary/30";
      case "Interview Scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      case "Assessment Passed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
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
              <span>Candidate Portal • Institutional .edu Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* RBAC Role Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-xs font-bold text-primary">
              <Code2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Role: Candidate</span>
            </div>

            {/* Switch Role Test Link (Triggers RBAC Middleware Block) */}
            <Link
              href="/dashboard/recruiter"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-outline hover:text-on-surface hover:bg-surface-container-low transition-all"
              title="Test RBAC security enforcement"
            >
              <Building2 className="w-3 h-3" />
              <span className="hidden md:inline">Test Recruiter Route</span>
            </Link>

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
        {warning === "unauthorized_recruiter_access" && (
          <div className="p-4 rounded-xl bg-accent-gap/10 border border-accent-gap/30 text-accent-gap flex items-start gap-3 text-xs shadow-sm">
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
        )}

        {/* Candidate Identity Dossier Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.25),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-secondary-container backdrop-blur-md shadow-inner">
                AC
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Alex Chen
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary-container border border-secondary-container/30 text-xs font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ABET Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-secondary-container" />
                    UC Berkeley (EECS &apos;26)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
                    alex.chen@berkeley.edu
                  </span>
                </div>
              </div>
            </div>

            {/* AST Match Telemetry */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-start">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                  AST Vector Match Score
                </div>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-secondary-container">
                  94.2%
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-secondary-container/40 flex items-center justify-center text-xs font-bold text-secondary-container">
                Top 6%
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-stroke-card pb-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "bg-primary-container text-white shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Overview &amp; Code Dossier</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("applied")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "applied"
                ? "bg-primary-container text-white shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Applied Jobs Tracker</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
              {mockAppliedJobs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "skills"
                ? "bg-primary-container text-white shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Skill Analytics &amp; Benchmarks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "resume"
                ? "bg-primary-container text-white shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume &amp; AST Match</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* AST Telemetry Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Verified Codebase */}
              <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-secondary-mint" />
                    Verified Repository
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary-mint font-bold">
                    Clean AST
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-on-surface font-mono">
                    distributed-kv-store
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Go implementation of Raft consensus with log replication &amp; RPC state machine.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-100 font-mono">
                  <div>
                    <span className="text-outline text-[10px]">AST Nodes:</span>
                    <p className="font-bold text-on-surface">14,280</p>
                  </div>
                  <div>
                    <span className="text-outline text-[10px]">Concurrency Safety:</span>
                    <p className="font-bold text-secondary-mint">98th %ile</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Algorithmic Efficiency */}
              <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-secondary-mint" />
                    Algorithmic Efficiency
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary-mint font-bold">
                    O(log n)
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-extrabold text-on-surface font-mono tabular-nums">
                    96.0%
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Data structure traversal benchmarks match Tier-1 distributed engineering standards.
                  </p>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary-mint h-full rounded-full" style={{ width: "96%" }} />
                </div>
              </div>

              {/* Card 3: Direct Recruiter Pipeline */}
              <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-secondary-mint" />
                    Recruiter Telemetry
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    Active
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-extrabold text-on-surface font-mono tabular-nums">
                    14 Lead Reviews
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Engineering leads from ScaleOps, Veritas, and NeuralFlow inspected your dossier.
                  </p>
                </div>

                <div className="pt-2 text-xs border-t border-slate-100 flex items-center gap-1.5 text-secondary-mint font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ATS Keyword Filters Bypassed</span>
                </div>
              </div>
            </div>

            {/* Target Architectural Gap Card */}
            <div className="p-5 rounded-2xl bg-white border border-accent-gap/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-gap/10 text-accent-gap flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">
                    1 Target Architectural Gap Detected
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Raft consensus split-brain quorum failure recovery. Complete the 4-hour AST
                    sandbox benchmark to unlock an additional 5 Tier-1 roles.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerToast("Initializing ephemeral AST Code Sandbox benchmark...")}
                className="px-4 py-2 rounded-lg bg-accent-gap hover:bg-accent-gap/90 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
              >
                Launch Sandbox Challenge
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: APPLIED JOBS TRACKER */}
        {activeTab === "applied" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-on-surface tracking-tight">
                  Active Application Pipeline
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Direct recruiter interview dispatch without ATS keyword discard.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-lg bg-primary/10">
                {mockAppliedJobs.length} Applications Active
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stroke-card bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-stroke-card text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Company &amp; Role</th>
                      <th className="py-3 px-4">Match Vector</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Next Action / Schedule</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockAppliedJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-surface-container-lowest/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-sm text-on-surface">{job.company}</div>
                          <div className="text-xs text-on-surface-variant font-medium">{job.role}</div>
                          <div className="text-[11px] text-outline font-mono mt-0.5">
                            {job.salary} • {job.location}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <span className="inline-flex items-center gap-1 font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded text-xs">
                            {job.matchScore}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                              job.status
                            )}`}
                          >
                            <Clock className="w-3 h-3" />
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-on-surface-variant max-w-xs">
                          {job.nextStep}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => triggerToast(`Forwarding direct message to ${job.company} lead recruiter.`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-slate-200 text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                          >
                            <span>Details</span>
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

        {/* TAB 3: SKILL ANALYTICS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-on-surface">
                  ABET Curriculum &amp; Syntax Verification Matrix
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Static analysis parses your GitHub repos into an Abstract Syntax Tree (AST), benchmarked against accredited CS degree requirements.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Distributed Systems & Raft Consensus", score: 96, pct: "96th %ile", tag: "Advanced" },
                  { name: "Concurrency & Lock-Free Thread Safety", score: 98, pct: "98th %ile", tag: "Exceptional" },
                  { name: "Algorithmic Tree & Graph Traversal", score: 94, pct: "94th %ile", tag: "Advanced" },
                  { name: "Database Engine & WAL Serialization", score: 89, pct: "89th %ile", tag: "Proficient" },
                  { name: "Cloud Infrastructure & eBPF Telemetry", score: 91, pct: "91th %ile", tag: "Advanced" },
                ].map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">{item.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-outline text-[11px]">{item.pct}</span>
                        <span className="font-bold text-secondary-mint">{item.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary-mint h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-outline font-medium">
                  Last AST parse completed 2 hours ago from <code className="text-primary font-bold">github.com/alexchen-dev</code>
                </span>
                <button
                  type="button"
                  onClick={() => triggerToast("AST Re-scan queued. Running AST tree diff against main branch...")}
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Trigger Live Code Re-Index
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESUME & ATS MATCH */}
        {activeTab === "resume" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: Active Resume File Card */}
              <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-outline">
                      Active Verified Resume
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint text-[10px] font-mono font-bold">
                    ATS 98% Score
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-on-surface">
                    Alex_Chen_UCBerkeley_EECS_2026.pdf
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Parsed with AST Token Extractor. 48 verified technologies indexed.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-mono space-y-1">
                  <div className="text-outline text-[10px]">Cryptographic SHA-256:</div>
                  <div className="text-[11px] text-on-surface truncate">
                    8f4b23c91e7d80aa2345bc79ef0142de56a89c4456b21c43d99e01
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => triggerToast("Downloading verified candidate dossier...")}
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResumeUpload}
                    disabled={isUploading}
                    className="flex-1 py-2 px-3 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? "Re-parsing..." : "Upload New Version"}</span>
                  </button>
                </div>
              </div>

              {/* Right: ATS Verification Telemetry */}
              <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-secondary-mint" />
                    ATS Optimization Audit
                  </span>
                  <span className="text-xs font-mono font-bold text-secondary-mint">
                    Passed (98/100)
                  </span>
                </div>

                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 text-on-surface">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                    <span>Zero layout parsing failures (standard semantic structure)</span>
                  </li>
                  <li className="flex items-center gap-2 text-on-surface">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                    <span>Direct ABET institutional email verification header included</span>
                  </li>
                  <li className="flex items-center gap-2 text-on-surface">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                    <span>Code repositories cross-linked with AST vector hashes</span>
                  </li>
                  <li className="flex items-center gap-2 text-on-surface">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                    <span>No unparsable graphics or nested column tables</span>
                  </li>
                </ul>

                <div className="p-3.5 rounded-xl bg-surface border border-stroke-card text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">SkillMatch Direct Delivery:</span>
                  <p className="mt-0.5 text-[11px] leading-relaxed">
                    Because your profile holds ABET-verified institutional status, your resume bypasses first-round automated discard filters and lands directly in engineering hiring lead review queues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-outline">Loading candidate dossier...</div>}>
      <CandidateDashboardContent />
    </Suspense>
  );
}
