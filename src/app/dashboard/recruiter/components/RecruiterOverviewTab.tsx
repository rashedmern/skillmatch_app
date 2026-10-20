"use client";

import React from "react";
import { JobPosting, ApplicantCandidate, RecruiterProfile } from "./types";
import { CompanyLogo } from "@/components/common/CompanyLogo";
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
  ExternalLink,
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
  const recentApplicants = applicants.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#051C19] via-[#0A2E28] to-[#0D3E35] text-white relative overflow-hidden shadow-level-2 border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(0,212,190,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.22),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <CompanyLogo name={profile.companyName} size="xs" />
              <span>{profile.companyName} • {language === "bn" ? "নিয়োগ ব্যবস্থাপনা পোর্টাল" : "Hiring Workspace"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t.recruiter.commandTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
              {t.recruiter.commandSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-stretch md:self-auto">
            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              id="overview-post-job-btn"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-[#051C19] text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-level-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#051C19]"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              <span>{t.recruiter.createJobBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Users className="w-4 h-4 text-secondary-mint" aria-hidden="true" />
              <span>{language === "bn" ? "পাইপলাইন দেখুন" : "View Pipeline"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Stat Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Active Job Openings */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-secondary-mint/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-primary-container" />
              {t.metrics.activeJobs}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {language === "bn" ? "সক্রিয়" : "Live"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {activeJobs.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              {language === "bn" ? "যাচাইকৃত শিক্ষার্থী ও গ্র্যাজুয়েটদের আবেদন গ্রহণ করছে" : "Positions accepting verified student applications"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "+২ চলতি মাসে" : "+2 roles this month"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-[11px] font-bold text-primary-container hover:underline cursor-pointer"
            >
              {language === "bn" ? "পরিচালনা" : "Manage"}
            </button>
          </div>
        </div>

        {/* Metric 2: Total Applicants */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-secondary-mint/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary-container" />
              {t.metrics.totalApplicants}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container font-bold border border-secondary-mint/30">
              {language === "bn" ? "১০০% যাচাইকৃত" : "100% Verified"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {applicants.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              {language === "bn" ? "প্রযুক্তিগত দক্ষতা ও প্রজেক্ট অনুসারে স্ক্রীনকৃত" : "Screened by tech stack & project experience"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-secondary-mint font-semibold flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "+২৮% এই সপ্তাহে" : "+28% this week"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-[11px] font-bold text-primary-container hover:underline cursor-pointer"
            >
              {language === "bn" ? "সবগুলো দেখুন" : "View All"}
            </button>
          </div>
        </div>

        {/* Metric 3: Shortlisted Candidates */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-secondary-mint/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              {t.metrics.shortlisted}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
              {language === "bn" ? "বাছাইকৃত" : "Top Picks"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              {shortlistedApplicants.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              {language === "bn" ? "ইন্টারভিউ ও পর্যালোচনার জন্য প্রস্তুত" : "Ready for technical review & interviews"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>68% {language === "bn" ? "ইন্টারভিউ রূপান্তর" : "Interview rate"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-[11px] font-bold text-primary-container hover:underline cursor-pointer"
            >
              {language === "bn" ? "রিভিউ" : "Review"}
            </button>
          </div>
        </div>

        {/* Metric 4: Top Talent Match Score */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-secondary-mint/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary-mint" />
              {language === "bn" ? "গড় শীর্ষ ম্যাচ" : "Top Match Score"}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
              {language === "bn" ? "শীর্ষ ২%" : "Top 2%"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono text-on-surface tabular-nums">
              96.4%
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              {language === "bn" ? "শীর্ষ বিশ্ববিদ্যালয় কম্পিউটার সায়েন্স শিক্ষার্থী" : "Top verified CS & engineering cohorts"}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
              <span>{language === "bn" ? "যাচাইকৃত প্রোফাইল" : "Verified Portfolios"}</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab("talent-search")}
              className="text-[11px] font-bold text-primary-container hover:underline cursor-pointer"
            >
              {language === "bn" ? "সার্চ করুন" : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Applicants (Left 7) & Active Roles Summary (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Applicants (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-on-surface tracking-tight">
                {t.recruiter.recentSubmissions}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.recruiter.recentSubmissionsDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("pipeline")}
              className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === "bn" ? `সম্পূর্ণ তালিকা (${applicants.length})` : `View Pipeline (${applicants.length})`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-secondary-mint" />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplicants.map((cand) => (
              <div
                key={cand.id}
                className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-secondary-mint/50 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-xs border border-slate-200">
                    {cand.avatarUrl ? (
                      <img
                        src={cand.avatarUrl}
                        alt={cand.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-container to-[#0A2E28] text-white font-extrabold text-xs flex items-center justify-center">
                        {cand.initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="font-bold text-xs text-on-surface flex items-center gap-1.5 truncate">
                      <span>{cand.name}</span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 truncate font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                      <span>{cand.university} • {cand.degree}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{cand.jobTitle}</span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                        <svg className="w-3 h-3 text-slate-700 fill-current shrink-0" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>{cand.highlightRepo}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                  <div className="text-right mr-1 hidden sm:block">
                    <span className="inline-block font-mono text-xs font-extrabold px-2 py-0.5 rounded-lg bg-secondary-mint/15 text-primary-container border border-secondary-mint/30">
                      {cand.matchScore.toFixed(0)}% {language === "bn" ? "ম্যাচ" : "Match"}
                    </span>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {cand.experience || "Verified GitHub"}
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
                    aria-label={`${t.recruiter.shortlistCandidate}: ${cand.name}`}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-secondary-mint/15 text-slate-700 hover:text-primary-container border border-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    <Star className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onScheduleCandidate(cand.id)}
                    title={t.recruiter.scheduleInterview}
                    aria-label={`${t.recruiter.scheduleInterview}: ${cand.name}`}
                    className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    <Calendar className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                    <span>{language === "bn" ? "সাক্ষাৎকার" : "Schedule"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Postings & Sourcing (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-on-surface tracking-tight">
                {t.recruiter.activePostingsTitle}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.recruiter.activePostingsDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.recruiter.manageRoles}</span>
              <ArrowRight className="w-3.5 h-3.5 text-secondary-mint" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            {activeJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-on-surface truncate">
                      {job.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {job.team} • {job.workModel}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-secondary-mint/15 text-primary-container text-[10px] font-mono font-bold shrink-0 border border-secondary-mint/20">
                    Min {job.minMatch}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 font-semibold">{job.salary}</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab("pipeline")}
                    className="font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{job.applicantsCount} {language === "bn" ? "আবেদনকারী" : "Applicants"}</span>
                    <ArrowRight className="w-3 h-3 text-secondary-mint" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onNavigateToTab("post-job")}
              className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-secondary-mint text-xs font-bold text-slate-700 hover:text-primary-container flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-slate-50/50 hover:bg-secondary-mint/5"
            >
              <PlusCircle className="w-4 h-4 text-secondary-mint" />
              <span>{t.recruiter.createJobBtn}</span>
            </button>
          </div>

          {/* Institutional Guarantee Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-on-surface">
              <ShieldCheck className="w-4 h-4 text-secondary-mint shrink-0" />
              <span>{t.recruiter.institutionalGuaranteeTitle}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              {t.recruiter.institutionalGuaranteeDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
