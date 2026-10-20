"use client";

import React, { useState, useMemo } from "react";
import { ApplicantCandidate, JobPosting } from "./types";
import { useLanguage } from "@/context/LanguageContext";
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
  CheckCircle2,
  ExternalLink,
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
  const { t, language } = useLanguage();
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

  const getStageLabel = (stage: string) => {
    if (language !== "bn") return stage;
    switch (stage) {
      case "All":
        return t.common.all;
      case "New Applicant":
        return "নতুন আবেদনকারী";
      case "Shortlisted":
        return "বাছাইকৃত";
      case "Interview Scheduled":
        return "সাক্ষাৎকার নির্ধারিত";
      case "Offer Stage":
        return "অফার পর্যায়";
      case "Rejected":
        return "আর্কাইভকৃত";
      default:
        return stage;
    }
  };

  return (
    <div className="space-y-6">
      {/* ATS Header & Quick Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5 border border-secondary-mint/30">
            <Sparkles className="w-3 h-3 text-secondary-mint" />
            <span>{language === "bn" ? "ক্যান্ডিডেট পাইপলাইন" : "Candidate Pipeline"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            {t.recruiter.atsPipelineTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {t.recruiter.atsPipelineSubtitle}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <div
            role="group"
            aria-label="Pipeline view mode"
            className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200"
          >
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-pressed={viewMode === "table"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint ${
                viewMode === "table"
                  ? "bg-white text-primary-container shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-on-surface"
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.recruiter.tableView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              aria-pressed={viewMode === "kanban"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint ${
                viewMode === "kanban"
                  ? "bg-white text-primary-container shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-on-surface"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.recruiter.kanbanView}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              aria-label={t.recruiter.searchCandidatesPlaceholder}
              placeholder={t.recruiter.searchCandidatesPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all font-medium"
            />
          </div>

          {/* Job Filter Dropdown */}
          <div className="md:col-span-4">
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <select
                aria-label="Filter candidates by job posting"
                value={selectedJobFilter}
                onChange={(e) => onFilterByJob(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all cursor-pointer appearance-none"
              >
                <option value="ALL">
                  {language === "bn"
                    ? `সকল সক্রিয় চাকরির পদ (${jobs.length})`
                    : `All Active Job Listings (${jobs.length})`}
                </option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.applicantsCount} {language === "bn" ? "আবেদনকারী" : "applicants"})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]" aria-hidden="true">
                ▼
              </div>
            </div>
          </div>

          {/* Min Match Score Slider */}
          <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
              {language === "bn" ? "ন্যূনতম ম্যাচ:" : "Min Match:"}{" "}
              <span className="text-primary-container font-mono font-black">{minMatchThreshold}%</span>
            </div>
            <input
              type="range"
              aria-label="Minimum Match percentage threshold"
              min="70"
              max="95"
              step="1"
              value={minMatchThreshold}
              onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
              className="w-full accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
            />
          </div>
        </div>

        {/* Stage Filter Chips */}
        <div
          role="group"
          aria-label="Filter candidates by pipeline stage"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin"
        >
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            {language === "bn" ? "পর্যায়:" : "Stage:"}
          </span>
          {["All", ...stagesList].map((st) => {
            const count = stageCounts[st] || 0;
            const isSelected = stageFilter === st;
            return (
              <button
                key={st}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint ${
                  isSelected
                    ? "bg-primary-container text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>{getStageLabel(st)}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
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
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse" aria-label={t.recruiter.atsPipelineTitle}>
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.candidateProfileCol}</th>
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.institutionalEduCol}</th>
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.targetJobCol}</th>
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.astScoreCol}</th>
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.verifiedRepoCol}</th>
                  <th scope="col" className="py-3.5 px-4">{t.recruiter.stageCol}</th>
                  <th scope="col" className="py-3.5 px-4 text-right">{t.recruiter.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="max-w-xs mx-auto space-y-2">
                        <UserX className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
                        <p className="font-bold text-on-surface">{t.recruiter.noApplicantsFound}</p>
                        <p className="text-[11px] font-medium text-slate-500">
                          {t.recruiter.noApplicantsFoundDesc}
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
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* Candidate Details */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                              {cand.avatarUrl ? (
                                <img
                                  src={cand.avatarUrl}
                                  alt={cand.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-container to-[#0A2E28] text-white font-extrabold flex items-center justify-center text-xs">
                                  {cand.initials}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-on-surface text-xs flex items-center gap-1.5">
                                <span>{cand.name}</span>
                                <CheckCircle2 className="w-3 h-3 text-secondary-mint shrink-0" />
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono truncate">{cand.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Education */}
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary-mint/15 text-primary-container font-semibold text-[11px] border border-secondary-mint/20">
                              <ShieldCheck className="w-3 h-3 text-secondary-mint shrink-0" aria-hidden="true" />
                              <span className="truncate">{cand.university}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
                              <span>{cand.degree}</span>
                            </div>
                          </div>
                        </td>

                        {/* Applied Job */}
                        <td className="py-3 px-4">
                          <span className="font-medium text-slate-700 text-xs bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {cand.jobTitle}
                          </span>
                        </td>

                        {/* Skill Match Score */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                                  isPassed
                                    ? "bg-secondary-mint/20 text-primary-container border border-secondary-mint/30"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {cand.matchScore.toFixed(0)}%
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                {cand.experience || "Verified GitHub"}
                              </span>
                            </div>
                            <div
                              role="progressbar"
                              aria-valuenow={Math.round(cand.matchScore)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Match score for ${cand.name}`}
                              className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden"
                            >
                              <div
                                className={`h-full rounded-full ${
                                  isPassed ? "bg-secondary-mint" : "bg-primary-container"
                                }`}
                                style={{ width: `${Math.min(100, cand.matchScore)}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Featured Repository */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 max-w-[220px]">
                            <svg className="w-3.5 h-3.5 text-slate-700 fill-current shrink-0" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span className="font-semibold text-slate-800 text-xs truncate" title={cand.highlightRepo}>
                              {cand.highlightRepo}
                            </span>
                          </div>
                        </td>

                        {/* Pipeline Stage */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                              cand.stage === "Offer Stage"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : cand.stage === "Interview Scheduled"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : cand.stage === "Shortlisted"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : cand.stage === "Rejected"
                                ? "bg-rose-50 text-rose-800 border-rose-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
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
                              aria-hidden="true"
                            />
                            {getStageLabel(cand.stage)}
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
                                  onTriggerToast(
                                    language === "bn"
                                      ? `${cand.name}-কে বাছাই তালিকায় যোগ করা হয়েছে!`
                                      : `Shortlisted candidate ${cand.name}!`
                                  );
                                }}
                                aria-label={`${language === "bn" ? "বাছাই করুন" : "Shortlist"} ${cand.name}`}
                                className="px-2.5 py-1 rounded-lg bg-secondary-mint/15 hover:bg-secondary-mint/25 text-primary-container font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint border border-secondary-mint/30"
                                title={language === "bn" ? "বাছাই তালিকায় যোগ করুন" : "Add to Shortlist"}
                              >
                                <UserCheck className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                                <span>{language === "bn" ? "বাছাই" : "Shortlist"}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => onOpenScheduleModal(cand)}
                              aria-label={`${language === "bn" ? "সাক্ষাৎকার নির্ধারণ করুন" : "Schedule Interview"} - ${cand.name}`}
                              className="px-2.5 py-1 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                              title={language === "bn" ? "সাক্ষাৎকার নির্ধারণ করুন" : "Schedule Interview"}
                            >
                              <Calendar className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                              <span>{language === "bn" ? "সাক্ষাৎকার" : "Schedule"}</span>
                            </button>

                            {cand.stage !== "Rejected" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onRejectCandidate(cand.id);
                                  onTriggerToast(
                                    language === "bn"
                                      ? `${cand.name}-এর আবেদন আর্কাইভ করা হয়েছে।`
                                      : `Archived application from ${cand.name}.`
                                  );
                                }}
                                aria-label={`${language === "bn" ? "আবেদন আর্কাইভ করুন" : "Archive Application"} ${cand.name}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                                title={language === "bn" ? "আর্কাইভ করুন" : "Archive"}
                              >
                                <UserX className="w-4 h-4" aria-hidden="true" />
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
                className="flex flex-col rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-xs min-h-[500px]"
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
                      aria-hidden="true"
                    />
                    <h3 className="font-bold text-xs text-on-surface truncate">{getStageLabel(stage)}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {candidatesInStage.length}
                  </span>
                </div>

                {/* Candidate Cards in Column */}
                <div className="p-2 space-y-2.5 flex-1 overflow-y-auto">
                  {candidatesInStage.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-[11px] font-medium">
                      {language === "bn" ? "এই পর্যায়ে কোনো প্রার্থী নেই" : "No candidates in this stage"}
                    </div>
                  ) : (
                    candidatesInStage.map((cand) => (
                      <div
                        key={cand.id}
                        className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-secondary-mint transition-all shadow-xs space-y-2.5"
                      >
                        {/* Name and Match Score */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                              {cand.avatarUrl ? (
                                <img
                                  src={cand.avatarUrl}
                                  alt={cand.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-container to-[#0A2E28] text-white font-extrabold flex items-center justify-center text-[10px]">
                                  {cand.initials}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-on-surface text-xs truncate flex items-center gap-1">
                                <span>{cand.name}</span>
                                <CheckCircle2 className="w-3 h-3 text-secondary-mint shrink-0" />
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">
                                {cand.email}
                              </div>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded font-mono font-black text-[11px] bg-secondary-mint/15 text-primary-container border border-secondary-mint/30 shrink-0">
                            {cand.matchScore.toFixed(0)}%
                          </span>
                        </div>

                        {/* University & Degree */}
                        <div className="text-[10px] space-y-0.5">
                          <div className="flex items-center gap-1 text-primary-container font-semibold">
                            <ShieldCheck className="w-3 h-3 text-secondary-mint shrink-0" aria-hidden="true" />
                            <span className="truncate">{cand.university}</span>
                          </div>
                          <div className="text-slate-500 font-medium truncate">{cand.degree}</div>
                        </div>

                        {/* Job Badge */}
                        <div className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium truncate">
                          {cand.jobTitle}
                        </div>

                        {/* Featured Project */}
                        <div className="text-[11px] text-slate-700 flex items-center justify-between border-t border-slate-100 pt-1.5">
                          <span className="flex items-center gap-1.5 truncate max-w-[130px]" title={cand.highlightRepo}>
                            <svg className="w-3.5 h-3.5 text-slate-700 fill-current shrink-0" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span className="truncate font-semibold">{cand.highlightRepo}</span>
                          </span>
                          <span className="text-[9px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            Verified
                          </span>
                        </div>

                        {/* Kanban Quick Action Buttons */}
                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                          {stage !== "Shortlisted" && stage !== "Interview Scheduled" && stage !== "Offer Stage" && (
                            <button
                              type="button"
                              onClick={() => {
                                onShortlistCandidate(cand.id);
                                onTriggerToast(
                                  language === "bn"
                                    ? `${cand.name}-কে বাছাই তালিকায় যোগ করা হয়েছে!`
                                    : `Shortlisted candidate ${cand.name}!`
                                );
                              }}
                              aria-label={`${language === "bn" ? "বাছাই করুন" : "Shortlist"} ${cand.name}`}
                              className="text-[10px] px-2 py-1 rounded bg-secondary-mint/15 text-primary-container font-bold hover:bg-secondary-mint/25 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                            >
                              {language === "bn" ? "বাছাই" : "Shortlist"}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onOpenScheduleModal(cand)}
                            aria-label={`${language === "bn" ? "সাক্ষাৎকার" : "Schedule"} ${cand.name}`}
                            className="text-[10px] px-2 py-1 rounded bg-primary-container text-white font-bold hover:bg-primary-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                          >
                            {language === "bn" ? "সাক্ষাৎকার" : "Schedule"}
                          </button>

                          {stage !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() => {
                                onRejectCandidate(cand.id);
                                onTriggerToast(
                                  language === "bn"
                                    ? `${cand.name}-এর আবেদন আর্কাইভ করা হয়েছে।`
                                    : `Archived candidate ${cand.name}.`
                                );
                              }}
                              aria-label={`${language === "bn" ? "আর্কাইভ" : "Archive"} ${cand.name}`}
                              className="text-[10px] p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                              title={language === "bn" ? "আর্কাইভ" : "Archive"}
                            >
                              <UserX className="w-3.5 h-3.5" aria-hidden="true" />
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
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-secondary-mint shrink-0" />
          <span className="font-medium">
            {language === "bn" ? (
              <>
                <strong>যাচাইকৃত শিক্ষার্থী নেটওয়ার্ক:</strong> সকল প্রার্থীর অনুমোদিত বিশ্ববিদ্যালয় সনদ ও সক্রিয় কোড রিপোজিটরি যাচাই করা হয়েছে।
              </>
            ) : (
              <>
                <strong>Verified Student Network:</strong> All candidates have authenticated university credentials and verified code repositories.
              </>
            )}
          </span>
        </div>
        <div className="text-slate-500 text-[11px] font-medium font-mono">
          {language === "bn"
            ? `${applicants.length} জনের মধ্যে ${filteredApplicants.length} জন প্রার্থী প্রদর্শিত হচ্ছে`
            : `Showing ${filteredApplicants.length} of ${applicants.length} candidates`}
        </div>
      </div>
    </div>
  );
};
