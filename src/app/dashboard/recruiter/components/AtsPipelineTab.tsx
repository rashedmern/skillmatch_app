"use client";

import React, { useState, useMemo } from "react";
import { ApplicantCandidate, JobPosting } from "./types";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  GraduationCap,
  ShieldCheck,
  LayoutList,
  Sparkles,
  UserCheck,
  UserX,
  Briefcase,
  Code2,
} from "lucide-react";

interface AtsPipelineTabProps {
  applicants: ApplicantCandidate[];
  jobs: JobPosting[];
  selectedJobFilter: string;
  onFilterByJob: (jobId: string) => void;
  onShortlistCandidate: (id: string) => void;
  onRejectCandidate: (id: string) => void;
  onOpenScheduleModal: (candidate: ApplicantCandidate) => void;
  onTriggerToast: (msg: string) => void;
}

type StageType = "New Applicant" | "Shortlisted" | "Interview Scheduled" | "Offer Stage" | "Rejected";

export const AtsPipelineTab: React.FC<AtsPipelineTabProps> = ({
  applicants,
  jobs,
  selectedJobFilter,
  onFilterByJob,
  onShortlistCandidate,
  onRejectCandidate,
  onOpenScheduleModal,
  onTriggerToast,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [minMatchThreshold, setMinMatchThreshold] = useState<number>(75);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  // Filtering candidates
  const filteredApplicants = useMemo(() => {
    return applicants.filter((c) => {
      // Job filter
      if (selectedJobFilter && selectedJobFilter !== "ALL" && c.jobId !== selectedJobFilter) {
        return false;
      }
      // Stage filter
      if (stageFilter !== "All" && c.stage !== stageFilter) {
        return false;
      }
      // Match threshold
      if (c.matchScore < minMatchThreshold) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesUni = c.university.toLowerCase().includes(q);
        const matchesJob = c.jobTitle.toLowerCase().includes(q);
        const matchesRepo = c.highlightRepo.toLowerCase().includes(q);
        const matchesEmail = c.email.toLowerCase().includes(q);
        if (!matchesName && !matchesUni && !matchesJob && !matchesRepo && !matchesEmail) {
          return false;
        }
      }
      return true;
    });
  }, [applicants, selectedJobFilter, stageFilter, minMatchThreshold, searchQuery]);

  // Stage counts
  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: applicants.length,
      "New Applicant": 0,
      Shortlisted: 0,
      "Interview Scheduled": 0,
      "Offer Stage": 0,
      Rejected: 0,
    };
    applicants.forEach((a) => {
      if (counts[a.stage] !== undefined) {
        counts[a.stage]++;
      }
    });
    return counts;
  }, [applicants]);

  const stagesList: StageType[] = [
    "New Applicant",
    "Shortlisted",
    "Interview Scheduled",
    "Offer Stage",
    "Rejected",
  ];

  return (
    <div className="space-y-6">
      {/* ATS Header & Quick Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5">
            <Sparkles className="w-3 h-3 text-secondary-mint" />
            <span>Algorithmic ATS Pipeline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            Candidate Pipeline &amp; Verification ATS
          </h2>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            Every candidate is verified via accredited institutional .edu domain and AST syntax analysis.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <div className="inline-flex p-1 bg-surface-container rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-primary-container shadow-sm border border-slate-200"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-white text-primary-container shadow-sm border border-slate-200"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name, .edu domain, university, or repo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
            />
          </div>

          {/* Job Filter Dropdown */}
          <div className="md:col-span-4">
            <div className="relative">
              <Briefcase className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={selectedJobFilter}
                onChange={(e) => onFilterByJob(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all cursor-pointer appearance-none"
              >
                <option value="ALL">All Active Job Listings ({jobs.length})</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.applicantsCount} applicants)
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Min AST Score Slider */}
          <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low border border-slate-200">
            <div className="text-[11px] font-bold text-on-surface whitespace-nowrap">
              Min Match: <span className="text-primary-container font-mono">{minMatchThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              step="1"
              value={minMatchThreshold}
              onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
              className="w-full accent-primary-container cursor-pointer"
            />
          </div>
        </div>

        {/* Stage Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider mr-1">Stage:</span>
          {["All", ...stagesList].map((st) => {
            const count = stageCounts[st] || 0;
            const isSelected = stageFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary-container text-white shadow-sm"
                    : "bg-surface-container hover:bg-slate-200 text-on-surface-variant"
                }`}
              >
                <span>{st}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-outline"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Switch: Table vs Kanban */}
      {viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-slate-200 text-[11px] font-bold text-outline uppercase tracking-wider">
                  <th className="py-3.5 px-4">Candidate Profile</th>
                  <th className="py-3.5 px-4">Institutional .edu</th>
                  <th className="py-3.5 px-4">Target Job</th>
                  <th className="py-3.5 px-4">AST Match Score</th>
                  <th className="py-3.5 px-4">Verified Repository</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4 text-right">Recruiter Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-outline">
                      <div className="max-w-xs mx-auto space-y-2">
                        <UserX className="w-8 h-8 text-outline mx-auto" />
                        <p className="font-bold text-on-surface">No applicants match your criteria</p>
                        <p className="text-[11px]">
                          Try adjusting your search terms, lowering the min match threshold, or selecting a different job.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((cand) => {
                    const isPassed = cand.matchScore >= 90;
                    return (
                      <tr
                        key={cand.id}
                        className="hover:bg-surface-container-low transition-colors group"
                      >
                        {/* Candidate Details */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-container to-secondary-mint text-white font-extrabold flex items-center justify-center text-xs shadow-sm flex-shrink-0">
                              {cand.initials}
                            </div>
                            <div>
                              <div className="font-bold text-on-surface text-sm">{cand.name}</div>
                              <div className="text-[11px] text-outline font-mono">{cand.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Institutional .edu Status */}
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container font-semibold text-[11px]">
                              <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
                              <span>{cand.university}</span>
                            </div>
                            <div className="text-[10px] text-outline flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-outline" />
                              <span>{cand.degree}</span>
                            </div>
                          </div>
                        </td>

                        {/* Target Job */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-on-surface text-xs bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {cand.jobTitle}
                          </span>
                        </td>

                        {/* AST Match Score */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                                  isPassed
                                    ? "bg-secondary-mint/20 text-primary-container"
                                    : "bg-surface-container text-outline"
                                }`}
                              >
                                {cand.matchScore.toFixed(1)}%
                              </span>
                              <span className="text-[10px] text-outline font-mono">
                                ({cand.astNodes.toLocaleString()} nodes)
                              </span>
                            </div>
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isPassed ? "bg-secondary-mint" : "bg-primary-container"
                                }`}
                                style={{ width: `${Math.min(100, cand.matchScore)}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Highlight Repository */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-mono bg-surface-container-low px-2 py-1 rounded border border-slate-200 max-w-[200px] truncate">
                            <Code2 className="w-3 h-3 text-secondary-mint flex-shrink-0" />
                            <span className="truncate" title={cand.highlightRepo}>
                              {cand.highlightRepo}
                            </span>
                          </div>
                        </td>

                        {/* Pipeline Stage */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              cand.stage === "Offer Stage"
                                ? "bg-amber-100 text-amber-800"
                                : cand.stage === "Interview Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : cand.stage === "Shortlisted"
                                ? "bg-emerald-100 text-emerald-800"
                                : cand.stage === "Rejected"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                cand.stage === "Offer Stage"
                                  ? "bg-amber-500"
                                  : cand.stage === "Interview Scheduled"
                                  ? "bg-blue-500"
                                  : cand.stage === "Shortlisted"
                                  ? "bg-emerald-500"
                                  : cand.stage === "Rejected"
                                  ? "bg-rose-500"
                                  : "bg-slate-400"
                              }`}
                            />
                            {cand.stage}
                          </span>
                        </td>

                        {/* Recruiter Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {cand.stage !== "Shortlisted" && cand.stage !== "Interview Scheduled" && cand.stage !== "Offer Stage" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onShortlistCandidate(cand.id);
                                  onTriggerToast(`Shortlisted candidate ${cand.name}!`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-secondary-mint/15 hover:bg-secondary-mint/25 text-primary-container font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                                title="Add to Shortlist"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-secondary-mint" />
                                <span>Shortlist</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => onOpenScheduleModal(cand)}
                              className="px-2.5 py-1 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                              title="Schedule Technical Interview"
                            >
                              <Calendar className="w-3.5 h-3.5 text-secondary-mint" />
                              <span>Schedule</span>
                            </button>

                            {cand.stage !== "Rejected" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onRejectCandidate(cand.id);
                                  onTriggerToast(`Archived application from ${cand.name}.`);
                                }}
                                className="p-1 rounded-lg text-outline hover:text-error hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Reject Candidate"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stagesList.map((stage) => {
            const candidatesInStage = filteredApplicants.filter((c) => c.stage === stage);

            return (
              <div
                key={stage}
                className="flex flex-col rounded-2xl bg-surface-container-low border border-slate-200 overflow-hidden shadow-xs min-h-[500px]"
              >
                {/* Column Header */}
                <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        stage === "Offer Stage"
                          ? "bg-amber-500"
                          : stage === "Interview Scheduled"
                          ? "bg-blue-500"
                          : stage === "Shortlisted"
                          ? "bg-emerald-500"
                          : stage === "Rejected"
                          ? "bg-rose-500"
                          : "bg-slate-400"
                      }`}
                    />
                    <h3 className="font-bold text-xs text-on-surface truncate">{stage}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                    {candidatesInStage.length}
                  </span>
                </div>

                {/* Candidate Cards in Column */}
                <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                  {candidatesInStage.length === 0 ? (
                    <div className="py-8 text-center text-outline text-[11px]">
                      No candidates in this stage
                    </div>
                  ) : (
                    candidatesInStage.map((cand) => (
                      <div
                        key={cand.id}
                        className="p-3 rounded-xl bg-white border border-slate-200 hover:border-secondary-mint transition-all shadow-xs space-y-2.5"
                      >
                        {/* Name and Match Score */}
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="font-bold text-on-surface text-xs">{cand.name}</div>
                            <div className="text-[10px] text-outline font-mono truncate max-w-[120px]">
                              {cand.email}
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded font-mono font-black text-[11px] bg-secondary-mint/20 text-primary-container">
                            {cand.matchScore.toFixed(0)}%
                          </span>
                        </div>

                        {/* University & Degree */}
                        <div className="text-[10px] space-y-0.5">
                          <div className="flex items-center gap-1 text-primary-container font-semibold">
                            <ShieldCheck className="w-3 h-3 text-secondary-mint" />
                            <span className="truncate">{cand.university}</span>
                          </div>
                          <div className="text-outline truncate">{cand.degree}</div>
                        </div>

                        {/* Job Badge */}
                        <div className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-on-surface-variant font-medium truncate">
                          {cand.jobTitle}
                        </div>

                        {/* Code Telemetry */}
                        <div className="text-[10px] font-mono text-outline flex items-center justify-between border-t border-slate-100 pt-1.5">
                          <span className="flex items-center gap-1">
                            <Code2 className="w-3 h-3 text-secondary-mint" />
                            {cand.astNodes.toLocaleString()} nodes
                          </span>
                          <span className="text-[9px] text-secondary-mint font-semibold">AST PASS</span>
                        </div>

                        {/* Kanban Quick Action Buttons */}
                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                          {stage !== "Shortlisted" && stage !== "Interview Scheduled" && stage !== "Offer Stage" && (
                            <button
                              type="button"
                              onClick={() => {
                                onShortlistCandidate(cand.id);
                                onTriggerToast(`Shortlisted candidate ${cand.name}!`);
                              }}
                              className="text-[10px] px-2 py-1 rounded bg-secondary-mint/15 text-primary-container font-bold hover:bg-secondary-mint/25 transition-colors cursor-pointer"
                            >
                              Shortlist
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onOpenScheduleModal(cand)}
                            className="text-[10px] px-2 py-1 rounded bg-primary-container text-white font-bold hover:bg-primary-hover transition-colors cursor-pointer"
                          >
                            Schedule
                          </button>

                          {stage !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() => {
                                onRejectCandidate(cand.id);
                                onTriggerToast(`Rejected candidate ${cand.name}.`);
                              }}
                              className="text-[10px] p-1 text-outline hover:text-error transition-colors cursor-pointer"
                              title="Reject"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info Box */}
      <div className="p-4 rounded-xl bg-primary-container/5 border border-primary-container/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-primary-container">
          <ShieldCheck className="w-4 h-4 text-secondary-mint flex-shrink-0" />
          <span className="font-medium">
            <strong>Autonomous Verification Pipeline:</strong> All candidates shown have verified institutional emails ending in <code className="text-secondary-mint font-bold">.edu</code>.
          </span>
        </div>
        <div className="text-outline text-[11px]">
          Showing {filteredApplicants.length} of {applicants.length} candidates
        </div>
      </div>
    </div>
  );
};
