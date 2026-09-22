"use client";

import React, { useState, useMemo } from "react";
import { JobPosting } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  GraduationCap,
  ShieldCheck,
  Code2,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";

interface ScoutCandidate {
  id: string;
  name: string;
  initials: string;
  university: string;
  gradYear: string;
  degree: string;
  primaryLang: string;
  skills: string[];
  astScore: number;
  highlightRepo: string;
  repoStars: number;
  verifiedEdu: boolean;
  invited?: boolean;
}

const mockScoutDirectory: ScoutCandidate[] = [
  {
    id: "scout-1",
    name: "Alex Chen",
    initials: "AC",
    university: "UC Berkeley",
    gradYear: "2026",
    degree: "B.S. EECS",
    primaryLang: "Go",
    skills: ["Go", "Raft", "Distributed Systems", "gRPC", "Docker"],
    astScore: 94.2,
    highlightRepo: "distributed-kv-store",
    repoStars: 142,
    verifiedEdu: true,
  },
  {
    id: "scout-2",
    name: "Elena Rostova",
    initials: "ER",
    university: "Stanford University",
    gradYear: "2025",
    degree: "M.S. Computer Science",
    primaryLang: "Rust",
    skills: ["Rust", "Tokio", "Zero-Copy", "Systems Programming"],
    astScore: 96.1,
    highlightRepo: "raft-consensus-engine",
    repoStars: 310,
    verifiedEdu: true,
  },
  {
    id: "scout-3",
    name: "Marcus Vance",
    initials: "MV",
    university: "Carnegie Mellon",
    gradYear: "2026",
    degree: "B.S. ECE",
    primaryLang: "C++",
    skills: ["C++20", "Networking", "DPDK", "Kernel Bypass"],
    astScore: 92.4,
    highlightRepo: "zero-copy-network-stack",
    repoStars: 98,
    verifiedEdu: true,
  },
  {
    id: "scout-4",
    name: "Priya Sharma",
    initials: "PS",
    university: "MIT",
    gradYear: "2025",
    degree: "M.Eng. EECS",
    primaryLang: "C",
    skills: ["C", "Linux Kernel", "eBPF", "Telemetry", "BCC"],
    astScore: 95.8,
    highlightRepo: "eBPF-kernel-probe",
    repoStars: 245,
    verifiedEdu: true,
  },
  {
    id: "scout-5",
    name: "David Kim",
    initials: "DK",
    university: "UIUC",
    gradYear: "2026",
    degree: "B.S. Computer Science",
    primaryLang: "TypeScript",
    skills: ["TypeScript", "Next.js", "GraphQL", "Node.js", "PostgreSQL"],
    astScore: 89.5,
    highlightRepo: "distributed-cache-sync",
    repoStars: 84,
    verifiedEdu: true,
  },
  {
    id: "scout-6",
    name: "Zoe Martinez",
    initials: "ZM",
    university: "Caltech",
    gradYear: "2025",
    degree: "B.S. Applied Computation",
    primaryLang: "Python",
    skills: ["Python", "PyTorch", "CUDA", "TensorRT", "C++"],
    astScore: 97.4,
    highlightRepo: "quantized-llm-kernel",
    repoStars: 520,
    verifiedEdu: true,
  },
];

interface TalentSearchTabProps {
  jobs: JobPosting[];
  onTriggerToast: (msg: string) => void;
}

export const TalentSearchTab: React.FC<TalentSearchTabProps> = ({
  jobs,
  onTriggerToast,
}) => {
  const { t, language } = useLanguage();
  const [candidates, setCandidates] = useState<ScoutCandidate[]>(mockScoutDirectory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [minAstScore, setMinAstScore] = useState(85);
  const [selectedCandidateForInvite, setSelectedCandidateForInvite] = useState<ScoutCandidate | null>(null);
  const [selectedTargetJobId, setSelectedTargetJobId] = useState(jobs[0]?.id || "");

  // Unique languages & universities
  const languages = ["All", "Go", "Rust", "C++", "C", "TypeScript", "Python"];
  const universities = ["All", "UC Berkeley", "Stanford University", "Carnegie Mellon", "MIT", "UIUC", "Caltech"];

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (selectedLanguage !== "All" && c.primaryLang !== selectedLanguage) return false;
      if (selectedUniversity !== "All" && c.university !== selectedUniversity) return false;
      if (c.astScore < minAstScore) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesSkill = c.skills.some((s) => s.toLowerCase().includes(q));
        const matchesUni = c.university.toLowerCase().includes(q);
        const matchesRepo = c.highlightRepo.toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesUni && !matchesRepo) return false;
      }
      return true;
    });
  }, [candidates, selectedLanguage, selectedUniversity, minAstScore, searchQuery]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidateForInvite) return;
    const targetJob = jobs.find((j) => j.id === selectedTargetJobId) || jobs[0];

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateForInvite.id ? { ...c, invited: true } : c
      )
    );

    const toastMsg =
      language === "bn"
        ? `${selectedCandidateForInvite.name}-এর কাছে ${targetJob ? targetJob.title : "পদ"}-এর জন্য দ্রুত আমন্ত্রণ পাঠানো হয়েছে!`
        : `Invitation sent to ${selectedCandidateForInvite.name} for ${targetJob ? targetJob.title : "job"}!`;

    onTriggerToast(toastMsg);
    setSelectedCandidateForInvite(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5">
            <Sparkles className="w-3 h-3 text-secondary-mint" />
            <span>{t.recruiter.accreditedTalentScout}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            {t.recruiter.talentScoutTitle}
          </h2>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            {t.recruiter.talentScoutSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-black text-primary-container font-mono">100% .edu</div>
            <div className="text-[11px] text-outline">{t.recruiter.verifiedStudents}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.recruiter.searchScoutPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
            />
          </div>

          {/* Language Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l === "All"
                    ? t.recruiter.allLanguages
                    : language === "bn"
                    ? `মূল ভাষা: ${l}`
                    : `Primary: ${l}`}
                </option>
              ))}
            </select>
          </div>

          {/* University Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all cursor-pointer"
            >
              {universities.map((u) => (
                <option key={u} value={u}>
                  {u === "All" ? t.recruiter.allUniversities : u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Min AST Score Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              {t.recruiter.minAstMatch}
            </span>
            <span className="text-xs font-mono font-black text-primary-container px-2 py-0.5 rounded bg-secondary-mint/15">
              {minAstScore}%
            </span>
          </div>
          <div className="w-full sm:w-64 flex items-center gap-2">
            <span className="text-[11px] text-outline font-mono">75%</span>
            <input
              type="range"
              min="75"
              max="95"
              step="1"
              value={minAstScore}
              onChange={(e) => setMinAstScore(Number(e.target.value))}
              className="w-full accent-primary-container cursor-pointer"
            />
            <span className="text-[11px] text-outline font-mono">95%</span>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full py-16 text-center text-outline bg-white rounded-2xl border border-slate-200">
            <p className="font-bold text-on-surface text-sm">{t.recruiter.noScoutCandidates}</p>
            <p className="text-xs mt-1">{t.recruiter.noScoutCandidatesDesc}</p>
          </div>
        ) : (
          filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-secondary-mint transition-all shadow-xs flex flex-col justify-between space-y-4 group"
            >
              {/* Top Row: Avatar & University */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-container to-secondary-mint text-white font-extrabold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                      {candidate.initials}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-on-surface text-sm">{candidate.name}</h3>
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-container">
                        <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
                        <span>{candidate.university}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-black text-sm text-primary-container">
                      {candidate.astScore.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-outline uppercase font-bold">{t.recruiter.astScore}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-outline">
                  <GraduationCap className="w-3.5 h-3.5 text-outline" />
                  <span>
                    {candidate.degree} ({t.recruiter.classOf} {candidate.gradYear})
                  </span>
                </div>

                {/* Highlight Repository */}
                <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <Code2 className="w-3.5 h-3.5 text-secondary-mint flex-shrink-0" />
                    <span className="truncate font-semibold text-on-surface">{candidate.highlightRepo}</span>
                  </div>
                  <span className="text-[11px] text-outline flex-shrink-0">
                    ★ {candidate.repoStars}
                  </span>
                </div>

                {/* Skill Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[11px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {candidate.invited ? (
                  <div className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.recruiter.invitationSent}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedCandidateForInvite(candidate)}
                    className="w-full py-2 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-secondary-mint" />
                    <span>{t.recruiter.inviteToApply}</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invite Modal */}
      {selectedCandidateForInvite && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-on-surface">
                  {t.recruiter.inviteModalTitle} {selectedCandidateForInvite.name}
                </h3>
                <p className="text-xs text-outline mt-0.5">
                  {selectedCandidateForInvite.university} • {selectedCandidateForInvite.degree}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidateForInvite(null)}
                className="text-outline hover:text-on-surface cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  {t.recruiter.selectPositionInvite}
                </label>
                <select
                  value={selectedTargetJobId}
                  onChange={(e) => setSelectedTargetJobId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint cursor-pointer"
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 text-outline text-[11px] leading-relaxed">
                {t.recruiter.inviteNotice}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateForInvite(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-on-surface hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-secondary-mint" />
                  <span>{t.recruiter.sendFastTrackInvite}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
