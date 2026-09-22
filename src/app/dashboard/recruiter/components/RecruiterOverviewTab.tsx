"use client";

import React from "react";
import { JobPosting, ApplicantCandidate, RecruiterProfile } from "./types";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  GraduationCap,
  ShieldCheck,
  Building2,
  Star,
  Calendar,
} from "lucide-react";

interface RecruiterOverviewTabProps {
  profile: RecruiterProfile;
  jobs: JobPosting[];
  applicants: ApplicantCandidate[];
  onNavigateToTab: (tab: "post-job" | "pipeline" | "talent-search") => void;
  onShortlistCandidate: (id: string) => void;
  onScheduleCandidate: (id: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const RecruiterOverviewTab: React.FC<RecruiterOverviewTabProps> = ({
  profile,
  jobs,
  applicants,
  onNavigateToTab,
  onShortlistCandidate,
  onScheduleCandidate,
  onTriggerToast,
}) => {
  const activeJobs = jobs.filter((j) => j.status === "Active");
  const shortlistedApplicants = applicants.filter((a) => a.stage === "Shortlisted");
  const recentApplicants = applicants.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.25),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <Building2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span>{profile.companyName} • Talent Acquisition Gateway</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Recruitment Command &amp; Pipeline Overview
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              Source verified student computer science engineers from ABET-accredited universities. Evaluate candidates through Abstract Syntax Tree (AST) code benchmarks with zero resume keyword hallucinations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              id="overview-post-job-btn"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-level-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Role</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Open ATS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Stat Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Active Job Postings */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-primary" />
              Active Postings
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
              Live
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {activeJobs.length}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Positions accepting verified .edu applicants
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2 this month</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              Manage
            </button>
          </div>
        </div>

        {/* Metric 2: Total Applicants */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              Total Applicants
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
              100% .EDU
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {applicants.length}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Screened via AST syntax token parsing
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+28% this week</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              View All
            </button>
          </div>
        </div>

        {/* Metric 3: Shortlisted Candidates */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Star className="w-4 h-4 text-secondary-mint" />
              Shortlisted
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
              High Priority
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {shortlistedApplicants.length}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Fast-tracked for engineering screen
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>68% Conversion</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              Review
            </button>
          </div>
        </div>

        {/* Metric 4: Top AST Compatibility */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary-mint" />
              Peak AST Match
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">
              Top 2%
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              96.1%
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Stanford &amp; UC Berkeley EECS cohorts
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-outline text-[11px] font-mono">Zero Hallucinations</span>
            <button
              type="button"
              onClick={() => onNavigateToTab("talent-search")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Applicants (Left 7) & Active Roles Summary (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Applicants ATS Quick Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-on-surface tracking-tight">
                Recent Pipeline Submissions
              </h2>
              <p className="text-xs text-on-surface-variant">
                Candidates screened via institutional .edu verification.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full ATS ({applicants.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplicants.map((cand) => (
              <div
                key={cand.id}
                className="p-4 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/40 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                    {cand.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-on-surface flex items-center gap-1.5 truncate">
                      <span>{cand.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                    </div>
                    <div className="text-[11px] text-on-surface-variant flex items-center gap-1 truncate">
                      <GraduationCap className="w-3 h-3 text-secondary-mint shrink-0" />
                      <span>{cand.university} • {cand.degree}</span>
                    </div>
                    <div className="text-[10px] text-outline font-mono truncate">
                      Applied: <strong className="text-primary">{cand.jobTitle}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="font-mono text-xs font-bold text-secondary-mint">
                      {cand.matchScore}% Match
                    </div>
                    <div className="text-[10px] text-outline font-mono">
                      {cand.astNodes.toLocaleString()} AST Nodes
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onShortlistCandidate(cand.id);
                      onTriggerToast(`Shortlisted ${cand.name} for technical interview!`);
                    }}
                    title="Shortlist Candidate"
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-secondary/15 text-outline hover:text-secondary-mint border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onScheduleCandidate(cand.id);
                      onTriggerToast(`Interview invite prepared for ${cand.name}.`);
                    }}
                    title="Schedule Interview"
                    className="p-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Schedule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Postings & Funnel Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-on-surface tracking-tight">
                Active Job Postings
              </h2>
              <p className="text-xs text-on-surface-variant">Live roles accepting applications.</p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Roles</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
            {activeJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-on-surface truncate pr-2">
                    {job.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint text-[10px] font-mono font-bold shrink-0">
                    Min {job.minMatch}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-outline font-mono">
                  <span>{job.salary}</span>
                  <span className="font-bold text-primary">{job.applicantsCount} Applicants</span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-200 hover:border-secondary-mint text-xs font-bold text-outline hover:text-secondary-mint flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Another Position</span>
            </button>
          </div>

          {/* Sourcing Guarantee Card */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-on-surface">
              <ShieldCheck className="w-4 h-4 text-secondary-mint" />
              <span>ABET Institutional Email Guarantee</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Every applicant in this pipeline has authenticated with an accredited university (.edu) address. Spam candidates and bot accounts are prevented at the OAuth gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
