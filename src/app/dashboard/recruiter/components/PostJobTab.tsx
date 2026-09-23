"use client";

import React, { useState } from "react";
import { JobPosting } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  PlusCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Trash2,
  PauseCircle,
  PlayCircle,
  Plus,
  X,
} from "lucide-react";

interface PostJobTabProps {
  jobs: JobPosting[];
  onCreateJob: (newJob: Omit<JobPosting, "id" | "applicantsCount" | "postedDate">) => void;
  onToggleJobStatus: (id: string) => void;
  onDeleteJob: (id: string) => void;
  onNavigateToPipeline: (jobId?: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const PostJobTab: React.FC<PostJobTabProps> = ({
  jobs,
  onCreateJob,
  onToggleJobStatus,
  onDeleteJob,
  onNavigateToPipeline,
  onTriggerToast,
}) => {
  const { t, language } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("Core Infrastructure");
  const [workModel, setWorkModel] = useState<"Remote" | "Hybrid" | "On-site">("Hybrid");
  const [location, setLocation] = useState("San Francisco, CA");
  const [salary, setSalary] = useState("$185,000 - $210,000");
  const [minMatch, setMinMatch] = useState(90);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>(["Go", "Raft", "Distributed Systems", "gRPC"]);
  const [skillInput, setSkillInput] = useState("");

  const suggestedJobSkills = [
    "Rust",
    "Kubernetes",
    "eBPF",
    "C++",
    "PostgreSQL",
    "Kafka",
    "Docker",
    "Linux Kernel",
  ];

  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showCreateModal) {
        setShowCreateModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCreateModal]);

  const handleAddSkill = (skillToAdd?: string) => {
    const s = (skillToAdd || skillInput).trim();
    if (!s) return;
    if (skills.some((item) => item.toLowerCase() === s.toLowerCase())) return;
    setSkills([...skills, s]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onCreateJob({
      title,
      team,
      location,
      workModel,
      salary,
      minMatch: Number(minMatch),
      status: "Active",
      skills,
      description: description || `Architect and build next-generation ${team.toLowerCase()} systems with verified AST benchmarks.`,
    });

    onTriggerToast(
      language === "bn"
        ? `'${title}' পদটি প্রকাশিত হয়েছে! ABET নেটওয়ার্কের শিক্ষার্থীরা বিজ্ঞপ্তি পাবে।`
        : `Position '${title}' published! Candidates from ABET network will be alerted.`
    );
    setShowCreateModal(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <Briefcase className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
              <span>{language === "bn" ? "ইঞ্জিনিয়ারিং পদ লাইফসাইকেল" : "Engineering Position Lifecycle"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {language === "bn" ? "চাকরির বিজ্ঞপ্তি ও মেধা সংগ্রহের শর্তাবলী" : "Job Postings & Sourcing Requirements"}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {language === "bn"
                ? "কঠোর AST অ্যালগোরিদমিক মানদণ্ড অনুযায়ী নতুন পদ তৈরি করুন। কিওয়ার্ড স্প্যাম ছাড়াই আমাদের ইঞ্জিন স্বয়ংক্রিয়ভাবে প্রার্থীর কোড বিশ্লেষণ করে ম্যাচ হিসাব করে।"
                : "Create new roles with strict AST algorithmic criteria. Our matching engine automatically parses candidate code repositories to calculate compatibility without keyword spam."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            id="create-new-job-btn"
            className="px-5 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-level-2 transition-all cursor-pointer self-stretch md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>{t.recruiter.createJobBtn}</span>
          </button>
        </div>
      </div>

      {/* Postings Counter Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stroke-card shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-on-surface">
            {language === "bn" ? "সক্রিয় চাকরির পদ" : "Active Positions"}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
            {jobs.length} {language === "bn" ? "মোট" : "Total"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-container hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint rounded-lg px-2 py-1"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>{language === "bn" ? "নতুন পদ যুক্ত করুন" : "Add New Role"}</span>
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-2xl bg-white border border-stroke-card hover:border-slate-300 shadow-sm hover:shadow-level-2 transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-on-surface tracking-tight">
                      {job.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        job.status === "Active"
                          ? "bg-secondary-mint/15 text-secondary-mint border-secondary-mint/30"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {job.status === "Active"
                        ? language === "bn"
                          ? "সক্রিয়"
                          : "Active"
                        : language === "bn"
                        ? "স্থগিত"
                        : "Paused"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{job.team}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onToggleJobStatus(job.id)}
                    title={job.status === "Active" ? "Pause posting" : "Resume posting"}
                    aria-label={job.status === "Active" ? `Pause ${job.title}` : `Resume ${job.title}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    {job.status === "Active" ? (
                      <PauseCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-secondary-mint" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteJob(job.id)}
                    title="Remove posting"
                    aria-label={`Delete ${job.title}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-accent-gap hover:bg-accent-gap/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gap"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{job.location} ({job.workModel})</span>
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{job.salary}</span>
                </span>
                <span className="font-mono text-primary font-bold">
                  {t.recruiter.minAstCutoff}: {job.minMatch}%
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{job.description}</p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-surface-container-low border border-slate-200 text-[11px] font-mono font-semibold text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stroke-card flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Users className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                <span className="font-mono font-bold text-on-surface">{job.applicantsCount}</span>
                <span>{t.recruiter.applicantsInPipeline}</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToPipeline(job.id)}
                className="font-bold text-primary-container hover:text-secondary-mint transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint rounded px-1.5 py-0.5"
              >
                {t.recruiter.viewAtsCandidates} &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE JOB MODAL */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-job-modal-title"
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 id="create-job-modal-title" className="text-lg font-black text-on-surface">
                  {t.recruiter.postNewJobTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {t.recruiter.postNewJobSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                aria-label="Close create job modal"
                className="text-slate-500 hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label htmlFor="job-title-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.jobTitle}
                </label>
                <input
                  id="job-title-input"
                  type="text"
                  required
                  placeholder={
                    language === "bn"
                      ? "যেমন Distributed Database Engine Architect"
                      : "e.g. Distributed Database Engine Architect"
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="job-team-select" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.recruiter.engineeringTeam}
                  </label>
                  <select
                    id="job-team-select"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    <option value="Core Infrastructure">Core Infrastructure</option>
                    <option value="Platform SRE">Platform SRE</option>
                    <option value="Database Engines">Database Engines</option>
                    <option value="Kernel & Systems">Kernel &amp; Systems</option>
                    <option value="Cloud Security">Cloud Security</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="job-workmodel-select" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {language === "bn" ? "কাজের ধরন" : "Work Model"}
                  </label>
                  <select
                    id="job-workmodel-select"
                    value={workModel}
                    onChange={(e) => setWorkModel(e.target.value as "Remote" | "Hybrid" | "On-site")}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    <option value="Hybrid">{language === "bn" ? "হাইব্রিড" : "Hybrid"}</option>
                    <option value="Remote">{language === "bn" ? "রিমোট" : "Remote"}</option>
                    <option value="On-site">{language === "bn" ? "অন-সাইট" : "On-site"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="job-location-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.recruiter.location}
                  </label>
                  <input
                    id="job-location-input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="job-salary-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.recruiter.salaryRange}
                  </label>
                  <input
                    id="job-salary-input"
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="job-minmatch-slider" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.minAstCutoff}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="job-minmatch-slider"
                    type="range"
                    min="75"
                    max="98"
                    value={minMatch}
                    onChange={(e) => setMinMatch(Number(e.target.value))}
                    className="flex-1 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                  <span className="font-mono font-bold text-sm text-primary px-2.5 py-1 rounded bg-primary/10">
                    {minMatch}%
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium">
                  {language === "bn"
                    ? "এই সিনট্যাক্স বেঞ্চমার্কের নিচের প্রার্থীরা স্বয়ংক্রিয়ভাবে ফিল্টার হয়ে যাবে।"
                    : "Candidates below this syntax benchmark will be filtered out automatically."}
                </p>
              </div>

              {/* Skills Tag Manager */}
              <div className="space-y-2">
                <label htmlFor="job-skill-input" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.skillsRequired}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="job-skill-input"
                    type="text"
                    placeholder={
                      language === "bn"
                        ? "দক্ষতার নাম লিখুন (যেমন Raft, Rust, eBPF)..."
                        : "Add skill requirement (e.g. Raft, Rust, eBPF)..."
                    }
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint text-xs focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="h-9 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    {language === "bn" ? "যোগ করুন" : "Add"}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-surface-container-low border border-slate-200">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-mono font-semibold text-primary"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        aria-label={`Remove ${s} requirement`}
                        className="text-slate-400 hover:text-accent-gap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gap rounded"
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-600">
                  <span className="font-bold">{language === "bn" ? "পরামর্শ:" : "Suggestions:"}</span>
                  {suggestedJobSkills
                    .filter((s) => !skills.includes(s))
                    .map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleAddSkill(s)}
                        aria-label={`Add suggested skill: ${s}`}
                        className="px-2 py-0.5 rounded bg-surface border border-slate-200 hover:border-secondary-mint hover:text-secondary-mint transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                      >
                        + {s}
                      </button>
                    ))}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="job-description-textarea" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.jobDescription}
                </label>
                <textarea
                  id="job-description-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    language === "bn"
                      ? "মূল ডিস্ট্রিবিউটেড চ্যালেঞ্জ, স্টেট রেপ্লিকেশন সমস্যা এবং থ্রুপুট প্রত্যাশা লিখুন..."
                      : "Detail core distributed problems, state replication challenges, and throughput expectations..."
                  }
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs leading-relaxed text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-on-surface font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  {t.common.cancel}
                </button>

                <button
                  type="submit"
                  id="confirm-publish-role-btn"
                  className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  {language === "bn" ? "ABET নেটওয়ার্কে বিজ্ঞপ্তি প্রকাশ করুন" : "Publish Role to ABET Network"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
