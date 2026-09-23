
"use client";

import React, { useState } from "react";
import { JobListing } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame,
} from "lucide-react";

interface AllJobsTabProps {
  jobs: JobListing[];
  onApplyJob: (job: JobListing) => void;
  onNavigateToApplications: () => void;
}

export const AllJobsTab: React.FC<AllJobsTabProps> = ({
  jobs,
  onApplyJob,
  onNavigateToApplications,
}) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModel =
      selectedModel === "All" || job.workModel === selectedModel;

    const matchesDomain =
      selectedDomain === "All" || job.domain === selectedDomain;

    return matchesSearch && matchesModel && matchesDomain;
  });

  const getModelLabel = (model: string) => {
    if (language !== "bn") return model;
    switch (model) {
      case "All":
        return t.candidate.allModels;
      case "Remote":
        return t.candidate.remote;
      case "Hybrid":
        return t.candidate.hybrid;
      case "On-site":
        return t.candidate.onSite;
      default:
        return model;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <Flame className="w-3.5 h-3.5 text-accent-gap" />
              <span>
                {language === "bn"
                  ? "যাচাইকৃত কম্পিউটার সায়েন্স ইঞ্জিনিয়ারিং মার্কেটপ্লেস"
                  : "Verified Computer Science Engineering Marketplace"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t.candidate.allJobsMarketplaceTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {t.candidate.allJobsMarketplaceSubtitle}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-right self-stretch md:self-auto">
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
              {t.candidate.availablePositions}
            </div>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-secondary-container">
              {jobs.length} {language === "bn" ? "সক্রিয়" : "Active"}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between bg-white p-4 rounded-2xl border border-stroke-card shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            aria-label={t.candidate.searchJobsPlaceholder}
            placeholder={t.candidate.searchJobsPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-secondary-mint focus:ring-2 focus:ring-secondary/15 focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
          />
        </div>

        {/* Work Model Filter Pills */}
        <div
          role="group"
          aria-label="Filter jobs by work model"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
        >
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1 hidden sm:inline">
            {t.candidate.modelFilter}
          </span>
          {["All", "Remote", "Hybrid", "On-site"].map((model) => (
            <button
              key={model}
              type="button"
              aria-pressed={selectedModel === model}
              onClick={() => setSelectedModel(model)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint ${selectedModel === model
                  ? "bg-primary-container text-white shadow-sm font-bold"
                  : "bg-surface-container-low text-slate-700 hover:text-on-surface hover:bg-surface-container-high"
                }`}
            >
              {getModelLabel(model)}
            </button>
          ))}
        </div>

        {/* Domain Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <select
            aria-label="Filter jobs by domain"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="h-10 text-xs bg-surface-container-low border border-slate-200 rounded-xl px-3 text-on-surface focus:outline-none focus:border-secondary-mint font-medium cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
          >
            <option value="All">{t.candidate.allDomains}</option>
            <option value="Distributed Systems">
              {language === "bn" ? "ডিস্ট্রিবিউটেড সিস্টেমস" : "Distributed Systems"}
            </option>
            <option value="Cloud & SRE">
              {language === "bn" ? "ক্লাউড ও এসআরই" : "Cloud & SRE"}
            </option>
            <option value="Database Engines">
              {language === "bn" ? "ডাটাবেজ ইঞ্জিন" : "Database Engines"}
            </option>
            <option value="Kernel & Systems">
              {language === "bn" ? "কার্নেল ও সিস্টেমস" : "Kernel & Systems"}
            </option>
          </select>
        </div>
      </div>

      {/* Job Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-700 font-medium px-1">
        <span>
          {language === "bn" ? (
            <>
              প্রদর্শিত হচ্ছে <strong className="text-on-surface">{filteredJobs.length}</strong>টি যাচাইকৃত পদ
            </>
          ) : (
            <>
              Showing <strong className="text-on-surface">{filteredJobs.length}</strong> verified roles
            </>
          )}
        </span>
        <button
          type="button"
          onClick={onNavigateToApplications}
          className="text-primary hover:text-primary-hover font-bold hover:underline flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint rounded px-1"
        >
          <span>{language === "bn" ? "আমার আবেদন পাইপলাইন দেখুন" : "View My Applications Pipeline"}</span>
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/40 hover:shadow-level-1 transition-all space-y-4 flex flex-col justify-between group"
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary font-mono font-extrabold text-sm flex items-center justify-center shrink-0 border border-primary/20 shadow-sm group-hover:scale-105 transition-transform">
                    {job.logoText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">{job.company}</span>
                      <span className="text-[10px] font-mono text-slate-500">• {job.postedDate}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-on-surface leading-tight mt-0.5 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div
                  role="status"
                  aria-label={`${job.matchScore}% Match Score`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary-mint border border-secondary/30 text-xs font-mono font-bold shrink-0"
                >
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  <span>
                    {job.matchScore}% {language === "bn" ? "ম্যাচ" : "Match"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              {/* Location & Salary Telemetry */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-mono text-on-surface font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                  {job.salary}
                </span>
                <span aria-hidden="true">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{job.location}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-bold text-slate-700">
                  {getModelLabel(job.workModel)}
                </span>
              </div>

              {/* Tech Tags Cloud */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-surface-container-low border border-slate-200/60 text-[11px] font-mono font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-secondary-mint font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                <span>{language === "bn" ? "ডাইরেক্ট লিড ডিসপ্যাচ" : "Direct Lead Dispatch"}</span>
              </span>

              {job.isApplied ? (
                <button
                  type="button"
                  disabled
                  aria-label={`${t.candidate.applied} for ${job.title} at ${job.company}`}
                  className="px-4 py-2 rounded-xl bg-secondary/15 text-secondary-mint border border-secondary/30 text-xs font-bold flex items-center gap-1.5 cursor-default"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.candidate.applied}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onApplyJob(job)}
                  id={`apply-btn-${job.id}`}
                  aria-label={`${language === "bn" ? "১-ক্লিকে আবেদন করুন" : "1-Click Apply for"} ${job.title} at ${job.company}`}
                  className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-hover active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  <span>{language === "bn" ? "১-ক্লিকে আবেদন" : "1-Click Apply"}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
