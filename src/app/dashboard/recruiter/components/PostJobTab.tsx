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
  Building2,
  ArrowRight,
  CheckCircle2,
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
  const [team, setTeam] = useState("Core Platform");
  const [workModel, setWorkModel] = useState<"Remote" | "Hybrid" | "On-site">("Hybrid");
  const [location, setLocation] = useState("San Francisco, CA");
  const [salary, setSalary] = useState("$185,000 - $210,000");
  const [minMatch, setMinMatch] = useState(85);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>(["Go", "Distributed Systems", "PostgreSQL", "Docker"]);
  const [skillInput, setSkillInput] = useState("");

  const suggestedJobSkills = [
    "Rust",
    "Kubernetes",
    "TypeScript",
    "Python",
    "React",
    "C++",
    "Kafka",
    "AWS",
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
      description: description || `Join our ${team} team building reliable, high-performance infrastructure systems.`,
    });

    onTriggerToast(
      language === "bn"
        ? `'${title}' পদটি প্রকাশিত হয়েছে! উপযুক্ত প্রার্থীরা বিজ্ঞপ্তি পাবেন।`
        : `Position '${title}' published! Matched candidates will receive notifications.`
    );
    setShowCreateModal(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#051C19] via-[#0A2E28] to-[#0D3E35] text-white relative overflow-hidden shadow-level-2 border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(0,212,190,0.18),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <Briefcase className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
              <span>{language === "bn" ? "চাকরি ও নিয়োগ ব্যবস্থাপনা" : "Open Positions Management"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {language === "bn" ? "চাকরির বিজ্ঞপ্তি ও প্রয়োজনীয়তা" : "Job Postings & Requirements"}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
              {language === "bn"
                ? "নতুন পদ তৈরি করুন এবং সরাসরি প্রযুক্তিগত দক্ষতা ও প্রজেক্ট অভিজ্ঞতার ভিত্তিতে যাচাইকৃত প্রার্থীদের সাথে যুক্ত হন।"
                : "Create open engineering roles to reach pre-vetted candidates matched directly by tech stack, project experience, and verified skills."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            id="create-new-job-btn"
            className="px-5 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-[#051C19] text-xs font-extrabold flex items-center justify-center gap-2 shadow-level-2 transition-all cursor-pointer self-stretch md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>{t.recruiter.createJobBtn}</span>
          </button>
        </div>
      </div>

      {/* Postings Counter Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-on-surface">
            {language === "bn" ? "সক্রিয় চাকরির পদ" : "Active Positions"}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-xs font-mono font-bold border border-secondary-mint/30">
            {jobs.length} {language === "bn" ? "টি পদ" : "Roles"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-secondary-mint" />
          <span>{language === "bn" ? "নতুন পদ যোগ করুন" : "Add New Role"}</span>
        </button>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" aria-hidden="true" />
            <p className="font-bold text-sm text-on-surface">
              {language === "bn" ? "কোন চাকরির পদ তৈরি করা হয়নি" : "No job postings yet"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === "bn" ? "নতুন বিজ্ঞপ্তি তৈরি করতে উপরের বাটনে ক্লিক করুন।" : "Click 'Create New Role' above to publish your first opening."}
            </p>
          </div>
        ) : (
          jobs.map((job) => {
            const isActive = job.status === "Active";

            return (
              <div
                key={job.id}
                className={`p-5 rounded-2xl bg-white border transition-all shadow-xs flex flex-col justify-between space-y-4 hover:shadow-sm ${
                  isActive ? "border-slate-200/90 hover:border-secondary-mint/60" : "border-slate-200 bg-slate-50/50 opacity-80"
                }`}
              >
                <div className="space-y-3">
                  {/* Top: Title & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-on-surface leading-tight truncate">
                          {job.title}
                        </h3>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                        <span>{job.team}</span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {job.workModel}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                        isActive
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {isActive
                        ? language === "bn" ? "সক্রিয়" : "Active"
                        : language === "bn" ? "স্থগিত" : "Paused"}
                    </span>
                  </div>

                  {/* Metadata: Location, Salary, Min Match */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-slate-700 font-bold truncate">
                      <DollarSign className="w-3.5 h-3.5 text-secondary-mint shrink-0" aria-hidden="true" />
                      <span className="truncate">{job.salary}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded-md bg-secondary-mint/15 text-primary-container text-[11px] font-mono font-bold border border-secondary-mint/20">
                      Min {job.minMatch}% Match
                    </span>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => onNavigateToPipeline(job.id)}
                    className="font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                    <span>
                      {job.applicantsCount} {language === "bn" ? "জন আবেদনকারী" : "Applicants"}
                    </span>
                    <ArrowRight className="w-3 h-3 text-secondary-mint" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onToggleJobStatus(job.id)}
                      title={isActive ? t.recruiter.pause : t.recruiter.activate}
                      aria-label={`${isActive ? t.recruiter.pause : t.recruiter.activate} ${job.title}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                    >
                      {isActive ? (
                        <PauseCircle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <PlayCircle className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteJob(job.id)}
                      title="Delete posting"
                      aria-label={`Delete posting ${job.title}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE JOB MODAL */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-job-modal-title"
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 id="create-job-modal-title" className="text-base font-black text-on-surface">
                  {t.recruiter.createJobBtn}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {language === "bn" ? "প্রয়োজনীয় বিবরণ পূরণ করে নতুন চাকরির বিজ্ঞপ্তি প্রকাশ করুন।" : "Fill in the details to publish a new engineering opening."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-on-surface p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Job Title */}
              <div className="space-y-1">
                <label htmlFor="create-job-title" className="block font-bold text-slate-700">
                  {t.recruiter.jobTitle} *
                </label>
                <input
                  id="create-job-title"
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-medium"
                />
              </div>

              {/* Department & Work Model */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="create-job-team" className="block font-bold text-slate-700">
                    {t.recruiter.engineeringTeam}
                  </label>
                  <input
                    id="create-job-team"
                    type="text"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="create-job-workmodel" className="block font-bold text-slate-700">
                    {language === "bn" ? "কাজের ধরন" : "Work Model"}
                  </label>
                  <select
                    id="create-job-workmodel"
                    value={workModel}
                    onChange={(e) => setWorkModel(e.target.value as "Remote" | "Hybrid" | "On-site")}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint cursor-pointer"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              {/* Location & Salary Range */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="create-job-location" className="block font-bold text-slate-700">
                    {t.recruiter.location}
                  </label>
                  <input
                    id="create-job-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="create-job-salary" className="block font-bold text-slate-700">
                    {t.recruiter.salaryRange}
                  </label>
                  <input
                    id="create-job-salary"
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-mono font-medium"
                  />
                </div>
              </div>

              {/* Min Match Cutoff */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="create-job-minmatch" className="font-bold text-slate-700">
                    {t.recruiter.minAstCutoff}
                  </label>
                  <span className="font-mono font-bold text-primary-container px-2 py-0.5 rounded bg-secondary-mint/15 text-xs border border-secondary-mint/30">
                    {minMatch}%
                  </span>
                </div>
                <input
                  id="create-job-minmatch"
                  type="range"
                  min="70"
                  max="95"
                  step="1"
                  value={minMatch}
                  onChange={(e) => setMinMatch(Number(e.target.value))}
                  className="w-full accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                />
              </div>

              {/* Required Skills */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  {t.recruiter.skillsRequired}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type skill & press Enter (e.g. Kubernetes)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="px-3.5 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary-mint/15 text-primary-container font-semibold text-xs border border-secondary-mint/20"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-rose-600 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                {/* Suggested Skills */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">Suggestions:</span>
                  {suggestedJobSkills.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddSkill(s)}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition-colors cursor-pointer"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label htmlFor="create-job-desc" className="block font-bold text-slate-700">
                  {t.recruiter.jobDescription}
                </label>
                <textarea
                  id="create-job-desc"
                  rows={3}
                  placeholder="Outline key responsibilities, tech stack, and qualifications..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint font-medium resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
                  <span>{t.recruiter.publishRole}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
