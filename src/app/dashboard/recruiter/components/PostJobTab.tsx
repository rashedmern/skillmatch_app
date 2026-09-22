"use client";

import React, { useState } from "react";
import { JobPosting } from "./types";
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

    onTriggerToast(`Position '${title}' published! Candidates from ABET network will be alerted.`);
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
              <Briefcase className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Engineering Position Lifecycle</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Job Postings &amp; Sourcing Requirements
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              Create new roles with strict AST algorithmic criteria. Our matching engine automatically parses candidate code repositories to calculate compatibility without keyword spam.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            id="create-new-job-btn"
            className="px-5 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-level-2 transition-all cursor-pointer self-stretch md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Role</span>
          </button>
        </div>
      </div>

      {/* Postings Counter Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stroke-card shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-on-surface">Active Positions</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
            {jobs.length} Total
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Quick Create</span>
        </button>
      </div>

      {/* Active Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-white border border-stroke-card hover:border-secondary-mint/40 hover:shadow-level-1 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary-mint text-[11px] font-bold border border-secondary/30">
                    {job.team}
                  </span>
                  <h3 className="text-base font-extrabold text-on-surface mt-1.5 leading-tight">
                    {job.title}
                  </h3>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    job.status === "Active"
                      ? "bg-secondary-mint/15 text-secondary-mint border border-secondary-mint/30"
                      : "bg-slate-100 text-outline border border-slate-200"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                {job.description}
              </p>

              {/* Telemetry info */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-outline pt-1">
                <span className="flex items-center gap-1 font-mono text-on-surface font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-secondary-mint" />
                  {job.salary}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location} ({job.workModel})
                </span>
                <span>•</span>
                <span className="text-[11px] font-mono font-bold text-primary">
                  Min {job.minMatch}% AST Match
                </span>
              </div>

              {/* Skills required */}
              <div className="flex flex-wrap items-center gap-1 pt-1">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-surface-container-low border border-slate-200 text-[10px] font-mono text-on-surface-variant font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => onNavigateToPipeline(job.id)}
                className="font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>{job.applicantsCount} Applicants</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleJobStatus(job.id)}
                  title={job.status === "Active" ? "Pause Applications" : "Activate Role"}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-surface-container-low text-outline hover:text-on-surface transition-colors cursor-pointer"
                >
                  {job.status === "Active" ? (
                    <PauseCircle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <PlayCircle className="w-4 h-4 text-secondary-mint" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteJob(job.id)}
                  title="Delete Role"
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-accent-gap/10 text-outline hover:text-accent-gap transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-stroke-card shadow-level-3 p-6 space-y-5 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stroke-card pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" />
                <h3 className="text-base font-extrabold text-on-surface">
                  Create New Engineering Role
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Database Engine Architect"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Engineering Team / Domain
                  </label>
                  <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  >
                    <option value="Core Infrastructure">Core Infrastructure</option>
                    <option value="Platform SRE">Platform SRE</option>
                    <option value="Database Engines">Database Engines</option>
                    <option value="Kernel &amp; Systems">Kernel &amp; Systems</option>
                    <option value="Cloud Security">Cloud Security</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Work Model
                  </label>
                  <select
                    value={workModel}
                    onChange={(e) => setWorkModel(e.target.value as "Remote" | "Hybrid" | "On-site")}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    Annual Compensation Range
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Min AST Match % Cutoff
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="75"
                    max="98"
                    value={minMatch}
                    onChange={(e) => setMinMatch(Number(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="font-mono font-bold text-sm text-primary px-2.5 py-1 rounded bg-primary/10">
                    {minMatch}%
                  </span>
                </div>
                <p className="text-[10px] text-outline">
                  Candidates below this syntax benchmark will be filtered out automatically.
                </p>
              </div>

              {/* Skills Tag Manager */}
              <div className="space-y-2">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Required Technical Skills
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add skill requirement (e.g. Raft, Rust, eBPF)..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 focus:outline-none focus:bg-white focus:border-secondary-mint text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="h-9 px-3 rounded-xl bg-primary-container text-white font-bold text-xs"
                  >
                    Add
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
                        className="text-outline hover:text-accent-gap"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1 text-[11px] text-outline">
                  <span className="font-bold">Suggestions:</span>
                  {suggestedJobSkills
                    .filter((s) => !skills.includes(s))
                    .map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleAddSkill(s)}
                        className="px-2 py-0.5 rounded bg-surface border border-slate-200 hover:border-secondary-mint hover:text-secondary-mint transition-colors cursor-pointer"
                      >
                        + {s}
                      </button>
                    ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  Role Responsibilities &amp; Architecture Details
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail core distributed problems, state replication challenges, and throughput expectations..."
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs leading-relaxed focus:outline-none focus:bg-white focus:border-secondary-mint"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-on-surface font-semibold hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  id="confirm-publish-role-btn"
                  className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold transition-all shadow-sm"
                >
                  Publish Role to ABET Network
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
