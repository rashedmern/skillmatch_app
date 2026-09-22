"use client";

import React from "react";
import { JobPosting, ApplicantCandidate, RecruiterProfile } from "./types";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t, language } = useLanguage();
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
              <span>{profile.companyName} • {language === "bn" ? "ট্যালেন্ট অ্যাকুইজিশন গেটওয়ে" : "Talent Acquisition Gateway"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t.recruiter.commandTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {t.recruiter.commandSubtitle}
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
              <span>{t.recruiter.createJobBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{language === "bn" ? "এটিএস খুলুন" : "Open ATS"}</span>
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
              {t.metrics.activeJobs}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
              {language === "bn" ? "লাইভ" : "Live"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {activeJobs.length}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {language === "bn" ? "যাচাইকৃত .edu আবেদন গ্রহণ করছে" : "Positions accepting verified .edu applicants"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "+২ চলতি মাসে" : "+2 this month"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              {language === "bn" ? "পরিচালনা" : "Manage"}
            </button>
          </div>
        </div>

        {/* Metric 2: Total Applicants */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              {t.metrics.totalApplicants}
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
              {language === "bn" ? "AST সিনট্যাক্স টোকেন দ্বারা স্ক্রীনকৃত" : "Screened via AST syntax token parsing"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "+২৮% এই সপ্তাহে" : "+28% this week"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              {language === "bn" ? "সকল দেখুন" : "View All"}
            </button>
          </div>
        </div>

        {/* Metric 3: Shortlisted Candidates */}
        <div className="p-5 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Star className="w-4 h-4 text-secondary-mint" />
              {t.metrics.shortlisted}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
              {language === "bn" ? "শীর্ষ অগ্রাধিকার" : "High Priority"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {shortlistedApplicants.length}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {language === "bn" ? "ইঞ্জিনিয়ারিং স্ক্রিনিংয়ের জন্য মনোনীত" : "Fast-tracked for engineering screen"}
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
              {t.metrics.peakMatch}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">
              {language === "bn" ? "শীর্ষ ২%" : "Top 2%"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              96.1%
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {language === "bn" ? "স্ট্যানফোর্ড ও ইউসি বার্কলে সিএসই দল" : "Stanford & UC Berkeley EECS cohorts"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-outline text-[11px] font-mono">
              {language === "bn" ? "ভুল তথ্য মুক্ত" : "Zero Hallucinations"}
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("talent-search")}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              {language === "bn" ? "সার্চ" : "Search"}
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
                {t.recruiter.recentSubmissions}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {t.recruiter.recentSubmissionsDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === "bn" ? `সম্পূর্ণ এটিএস খুলুন (${applicants.length})` : `Open Full ATS (${applicants.length})`}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplicants.map((cand) => (
              <div
                key={cand.id}
                className="p-4 rounded-xl bg-white border border-stroke-card hover:border-secondary-mint/40 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
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
                      <span>
                        {cand.university} • {cand.degree}
                      </span>
                    </div>
                    <div className="text-[10px] text-outline font-mono truncate">
                      {language === "bn" ? "আবেদনকৃত:" : "Applied:"} <strong className="text-primary">{cand.jobTitle}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="font-mono text-xs font-bold text-secondary-mint">
                      {cand.matchScore.toFixed(1)}% {language === "bn" ? "ম্যাচ" : "Match"}
                    </div>
                    <div className="text-[10px] text-outline font-mono">
                      {cand.astNodes.toLocaleString()} {language === "bn" ? "AST নোড" : "AST Nodes"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onShortlistCandidate(cand.id);
                      onTriggerToast(
                        language === "bn"
                          ? `${cand.name}-কে বাছাই তালিকায় যুক্ত করা হয়েছে!`
                          : `Shortlisted candidate ${cand.name}!`
                      );
                    }}
                    title={t.recruiter.shortlistCandidate}
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-secondary/15 text-outline hover:text-secondary-mint border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onScheduleCandidate(cand.id)}
                    title={t.recruiter.scheduleInterview}
                    className="p-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === "bn" ? "সাক্ষাৎকার" : "Schedule"}</span>
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
                {t.recruiter.activePostingsTitle}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {t.recruiter.activePostingsDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.recruiter.manageRoles}</span>
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
                  <span className="font-bold text-primary">
                    {job.applicantsCount} {language === "bn" ? "আবেদনকারী" : "Applicants"}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-200 hover:border-secondary-mint text-xs font-bold text-outline hover:text-secondary-mint flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.recruiter.createJobBtn}</span>
            </button>
          </div>

          {/* Sourcing Guarantee Card */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-on-surface">
              <ShieldCheck className="w-4 h-4 text-secondary-mint" />
              <span>{t.recruiter.institutionalGuaranteeTitle}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {t.recruiter.institutionalGuaranteeDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
