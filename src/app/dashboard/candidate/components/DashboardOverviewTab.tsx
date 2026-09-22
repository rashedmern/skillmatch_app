"use client";

import React from "react";
import { CandidateProfile, JobListing } from "./types";
import {
  Terminal,
  Cpu,
  Building2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface DashboardOverviewTabProps {
  profile: CandidateProfile;
  jobs: JobListing[];
  onApplyJob: (job: JobListing) => void;
  onNavigateToAllJobs: () => void;
  onNavigateToProfile: () => void;
  onTriggerToast: (msg: string) => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  profile,
  jobs,
  onApplyJob,
  onNavigateToAllJobs,
  onNavigateToProfile,
  onTriggerToast,
}) => {
  const topMatches = jobs.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Candidate Identity Dossier Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.25),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile.avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-secondary-mint shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-secondary-container backdrop-blur-md shadow-inner">
                AC
              </div>
            )}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary-container border border-secondary-container/30 text-xs font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  ABET Verified
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-medium">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary-container" />
                  {profile.university} ({profile.degree} &apos;{profile.graduationYear})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
                  {profile.email}
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

      {/* Bento Grid: 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Verified Codebase */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
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
            <h3 className="text-sm font-extrabold text-on-surface font-mono">
              distributed-kv-store
            </h3>
            <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
              Raft consensus with log replication &amp; RPC state machine in Go.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-100 font-mono">
            <div>
              <span className="text-outline text-[10px]">Nodes:</span>
              <p className="font-bold text-on-surface">14,280</p>
            </div>
            <div>
              <span className="text-outline text-[10px]">Safety:</span>
              <p className="font-bold text-secondary-mint">98th %ile</p>
            </div>
          </div>
        </div>

        {/* Card 2: Algorithmic Efficiency */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-secondary-mint" />
              Algorithmic Depth
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary-mint font-bold">
              O(log n)
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-surface font-mono tabular-nums">
              96.0%
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
              Data structure traversal benchmarks match Tier-1 engineering standards.
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-secondary-mint h-full rounded-full" style={{ width: "96%" }} />
          </div>
        </div>

        {/* Card 3: Recruiter Reviews */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-secondary-mint" />
              Recruiter Reviews
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
              Active
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-surface font-mono tabular-nums">
              14 Lead Reviews
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
              Leads from ScaleOps, Veritas, and NeuralFlow inspected your dossier.
            </p>
          </div>
          <div className="pt-2 text-[11px] border-t border-slate-100 flex items-center gap-1 text-secondary-mint font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ATS Filters Bypassed</span>
          </div>
        </div>

        {/* Card 4: Profile & Resume Health */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-secondary-mint" />
              Profile Health
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
              99% Syntax
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-surface font-mono tabular-nums">
              {profile.skills.length} Skills
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
              Resume SHA-256 synced with active AST vector tokenizer.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateToProfile}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Edit Profile</span>
              <ArrowRight className="w-3 h-3" />
            </button>
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
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Raft consensus split-brain quorum failure recovery. Complete the 4-hour AST
              sandbox benchmark to unlock an additional 5 Tier-1 roles.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onTriggerToast("Initializing ephemeral AST Code Sandbox benchmark...")}
          className="px-4 py-2 rounded-xl bg-accent-gap hover:bg-accent-gap/90 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-sm"
        >
          Launch Sandbox Challenge
        </button>
      </div>

      {/* High-Confidence Algorithmic Role Matches Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-on-surface tracking-tight">
              Top Algorithmic Matches
            </h2>
            <p className="text-xs text-on-surface-variant">
              High-confidence positions matching your verified CS curriculum.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToAllJobs}
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All {jobs.length} Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMatches.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/50 transition-all shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-primary">{job.company}</span>
                  <span className="text-xs font-mono font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded">
                    {job.matchScore}% Match
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface line-clamp-1">{job.title}</h4>
                  <p className="text-xs text-outline font-mono mt-0.5">
                    {job.salary} • {job.workModel}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-secondary-mint font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Fast-Tracked</span>
                </span>

                {job.isApplied ? (
                  <span className="text-[11px] font-bold text-secondary-mint bg-secondary/15 px-2 py-1 rounded-lg">
                    Applied ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onApplyJob(job)}
                    className="px-3 py-1 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer"
                  >
                    1-Click Apply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
