"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Code2,
  Building2,
  GitBranch,
  Cpu,
  LogOut,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  Terminal,
  AlertCircle,
  GraduationCap,
} from "lucide-react";

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<"candidate" | "recruiter">("candidate");
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-stroke-card bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BrandLogo size="md" />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-slate-200 text-xs text-on-surface-variant font-medium">
              <StatusDot size="sm" />
              <span>Session Authenticated • SOC-2 Gateway</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Perspective Switcher Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveRole("candidate")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeRole === "candidate"
                    ? "bg-white text-primary-container shadow-sm border border-slate-200/50"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Candidate Dossier</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRole("recruiter")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeRole === "recruiter"
                    ? "bg-white text-primary-container shadow-sm border border-slate-200/50"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Recruiter Pool</span>
              </button>
            </div>

            {/* Logout Link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-on-surface-variant hover:text-accent-gap hover:border-accent-gap/30 hover:bg-accent-gap/5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeRole === "candidate" ? (
          /* =======================================================
             CANDIDATE PERSPECTIVE: AST DOSSIER & ROLE MATCHING
             ======================================================= */
          <div className="space-y-8">
            {/* Candidate Header Profile Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
              {/* Radial ambient background glows */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.25),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-secondary-container backdrop-blur-md">
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
                        <GitBranch className="w-3.5 h-3.5 text-secondary-container" />
                        github.com/alexchen-dev
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Score Badge */}
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

                {/* Progress bar */}
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

            {/* Active Target Role Matches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-on-surface tracking-tight">
                  Algorithmic Role Matches
                </h2>
                <span className="text-xs text-on-surface-variant font-medium">
                  3 Open High-Confidence Matches
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role 1 */}
                <div className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/50 transition-all shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary">ScaleOps Inc.</span>
                    <span className="text-xs font-mono font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded">
                      94% Match
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">
                      Distributed Systems Engineer
                    </h4>
                    <p className="text-xs text-outline font-mono mt-0.5">
                      $185k - $210k • San Francisco, CA
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-secondary-mint font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Lead Fast-Tracked
                    </span>
                    <button
                      type="button"
                      onClick={() => alert("Technical interview dispatch initiated with ScaleOps")}
                      className="px-3 py-1 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-primary-hover transition-colors"
                    >
                      Schedule Interview
                    </button>
                  </div>
                </div>

                {/* Role 2 */}
                <div className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/50 transition-all shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary">Veritas Cloud</span>
                    <span className="text-xs font-mono font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded">
                      91% Match
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Core Infrastructure Engineer</h4>
                    <p className="text-xs text-outline font-mono mt-0.5">
                      $175k - $195k • New York, NY
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Dossier Screened
                    </span>
                    <button
                      type="button"
                      onClick={() => alert("Application packet forwarded to Veritas Tech Lead")}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-on-surface hover:bg-surface-container-low text-xs font-bold transition-colors"
                    >
                      View Role
                    </button>
                  </div>
                </div>

                {/* Role 3 */}
                <div className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/50 transition-all shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary">NeuralFlow</span>
                    <span className="text-xs font-mono font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded">
                      88% Match
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">
                      Systems Performance Engineer
                    </h4>
                    <p className="text-xs text-outline font-mono mt-0.5">
                      $190k - $220k • Remote (US)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Skill Gap Check
                    </span>
                    <button
                      type="button"
                      onClick={() => alert("Targeting Raft split-brain benchmark prep")}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-on-surface hover:bg-surface-container-low text-xs font-bold transition-colors"
                    >
                      Start Prep
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Gap Alert Card */}
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
                onClick={() => alert("Launching AST Code Sandbox Benchmark Environment...")}
                className="px-4 py-2 rounded-lg bg-accent-gap hover:bg-accent-gap/90 text-white text-xs font-bold shrink-0 transition-colors"
              >
                Launch Sandbox Challenge
              </button>
            </div>
          </div>
        ) : (
          /* =======================================================
             RECRUITER PERSPECTIVE: TALENT SEARCH & AST SOURCING
             ======================================================= */
          <div className="space-y-8">
            {/* Recruiter Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container">
                    <StatusDot size="sm" />
                    <span>Verified Talent Sourcing Pool</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2">
                    Verified Computer Science Engineering Candidates
                  </h1>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                    Search candidate codebases by AST syntax depth, algorithmic percentile, and ABET curriculum alignment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-right">
                  <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                    Screen-Ready Engineers
                  </div>
                  <div className="text-2xl font-extrabold font-mono tabular-nums text-secondary-container">
                    1,240 Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-outline mr-2 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Track:
              </span>
              {[
                { id: "all", label: "All Specializations" },
                { id: "dist", label: "Distributed Systems" },
                { id: "front", label: "Frontend Architecture" },
                { id: "aiml", label: "AI & ML Inference" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedFilter === tab.id
                      ? "bg-primary-container text-white shadow-sm"
                      : "bg-white border border-slate-200 text-on-surface-variant hover:border-primary/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Candidates Table / Bento */}
            <div className="space-y-3">
              {[
                {
                  name: "Alex Chen",
                  school: "UC Berkeley (EECS '26)",
                  track: "Distributed Systems & Go",
                  astScore: "94.2%",
                  topSkill: "Mutex & Concurrency (98th %ile)",
                  repo: "distributed-kv-store",
                },
                {
                  name: "Marcus Vance",
                  school: "Carnegie Mellon (CS '25)",
                  track: "Cloud Infrastructure & Rust",
                  astScore: "92.8%",
                  topSkill: "Memory Zero-Copy (95th %ile)",
                  repo: "async-reactor-core",
                },
                {
                  name: "Priya Sharma",
                  school: "Stanford (AI Systems '26)",
                  track: "AI / Inference Kernels",
                  astScore: "95.1%",
                  topSkill: "CUDA Tensor Optimization (99th %ile)",
                  repo: "quantized-llm-runtime",
                },
              ].map((cand, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/40 transition-all shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-slate-200 flex items-center justify-center font-bold text-sm text-primary">
                      {cand.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-on-surface">{cand.name}</h4>
                        <span className="text-[11px] text-outline font-medium">({cand.school})</span>
                      </div>
                      <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                        Track: {cand.track} • Repo:{" "}
                        <span className="text-primary font-semibold">{cand.repo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-start">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-secondary-mint">
                        {cand.astScore} AST Percentile
                      </div>
                      <div className="text-[10px] text-outline font-medium">{cand.topSkill}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Direct interview dispatched to ${cand.name}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-colors"
                    >
                      Dispatch Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
