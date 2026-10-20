"use client";

import React, { useState, useMemo } from "react";
import { JobPosting } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Send,
  CheckCircle2,
  Star,
  ExternalLink,
} from "lucide-react";

interface ScoutCandidate {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string;
  university: string;
  gradYear: string;
  degree: string;
  primaryLang: string;
  skills: string[];
  matchScore: number;
  projectTitle: string;
  projectDesc: string;
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
    avatarUrl: "/images/avatars/alex-chen.jpg",
    university: "UC Berkeley",
    gradYear: "2026",
    degree: "B.S. EECS",
    primaryLang: "Go",
    skills: ["Go", "Distributed Systems", "Raft", "gRPC", "Docker"],
    matchScore: 95,
    projectTitle: "Distributed Key-Value Store",
    projectDesc: "Raft consensus implementation in Go with snapshotting and gRPC replication.",
    highlightRepo: "distributed-kv-store",
    repoStars: 142,
    verifiedEdu: true,
  },
  {
    id: "scout-2",
    name: "Elena Rostova",
    initials: "ER",
    avatarUrl: "/images/avatars/elena-rostova.jpg",
    university: "Stanford University",
    gradYear: "2025",
    degree: "M.S. Computer Science",
    primaryLang: "Rust",
    skills: ["Rust", "Tokio", "Concurrency", "Systems Programming"],
    matchScore: 97,
    projectTitle: "Raft Consensus Engine",
    projectDesc: "High-performance async state machine in Rust with zero-copy networking.",
    highlightRepo: "raft-consensus-engine",
    repoStars: 310,
    verifiedEdu: true,
  },
  {
    id: "scout-3",
    name: "Marcus Vance",
    initials: "MV",
    avatarUrl: "/images/avatars/marcus-vance.jpg",
    university: "Carnegie Mellon",
    gradYear: "2026",
    degree: "B.S. ECE",
    primaryLang: "C++",
    skills: ["C++20", "High-Throughput", "Networking", "TCP/IP"],
    matchScore: 93,
    projectTitle: "Zero-Copy Network Stack",
    projectDesc: "Microsecond-latency kernel-bypass packet processor with DPDK and ring buffers.",
    highlightRepo: "zero-copy-network-stack",
    repoStars: 98,
    verifiedEdu: true,
  },
  {
    id: "scout-4",
    name: "Priya Sharma",
    initials: "PS",
    avatarUrl: "/images/avatars/priya-sharma.jpg",
    university: "MIT",
    gradYear: "2025",
    degree: "M.Eng. EECS",
    primaryLang: "C",
    skills: ["C", "Linux Kernel", "eBPF", "Telemetry", "BCC"],
    matchScore: 96,
    projectTitle: "Linux eBPF Kernel Probe",
    projectDesc: "Socket tracing and telemetry daemon capturing TCP retransmissions with <1% overhead.",
    highlightRepo: "ebpf-kernel-probe",
    repoStars: 245,
    verifiedEdu: true,
  },
  {
    id: "scout-5",
    name: "David Kim",
    initials: "DK",
    avatarUrl: "/images/avatars/david-kim.jpg",
    university: "UIUC",
    gradYear: "2026",
    degree: "B.S. Computer Science",
    primaryLang: "TypeScript",
    skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "GraphQL"],
    matchScore: 91,
    projectTitle: "Distributed Cache Sync",
    projectDesc: "Multi-region cache replication service with Redis, PostgreSQL, and WebSocket events.",
    highlightRepo: "distributed-cache-sync",
    repoStars: 84,
    verifiedEdu: true,
  },
  {
    id: "scout-6",
    name: "Zoe Martinez",
    initials: "ZM",
    avatarUrl: "/images/avatars/zoe-martinez.jpg",
    university: "Caltech",
    gradYear: "2025",
    degree: "B.S. Applied Computation",
    primaryLang: "Python",
    skills: ["Python", "PyTorch", "CUDA", "C++", "TensorRT"],
    matchScore: 98,
    projectTitle: "Quantized Inference Kernel",
    projectDesc: "CUDA-accelerated low-bit transformer inference pipeline with optimized GEMM kernels.",
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
  const [minMatchScore, setMinMatchScore] = useState(85);
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
      if (c.matchScore < minMatchScore) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesSkill = c.skills.some((s) => s.toLowerCase().includes(q));
        const matchesUni = c.university.toLowerCase().includes(q);
        const matchesRepo = c.highlightRepo.toLowerCase().includes(q) || c.projectTitle.toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesUni && !matchesRepo) return false;
      }
      return true;
    });
  }, [candidates, selectedLanguage, selectedUniversity, minMatchScore, searchQuery]);

  // Handle Escape key to close invite modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCandidateForInvite) {
        setSelectedCandidateForInvite(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCandidateForInvite]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidateForInvite) return;

    // Mark candidate as invited
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateForInvite.id ? { ...c, invited: true } : c
      )
    );

    const targetJob = jobs.find((j) => j.id === selectedTargetJobId);
    const toastMsg =
      language === "bn"
        ? `${selectedCandidateForInvite.name}-এর কাছে ${targetJob ? targetJob.title : "পদ"}-এর জন্য ইন্টারভিউ আমন্ত্রণ পাঠানো হয়েছে!`
        : `Interview invitation sent to ${selectedCandidateForInvite.name} for ${targetJob ? targetJob.title : "role"}!`;

    onTriggerToast(toastMsg);
    setSelectedCandidateForInvite(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5 border border-secondary-mint/30">
            <Sparkles className="w-3 h-3 text-secondary-mint" aria-hidden="true" />
            <span>{t.recruiter.accreditedTalentScout}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            {t.recruiter.talentScoutTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {t.recruiter.talentScoutSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-black text-primary-container font-mono">100% Verified</div>
            <div className="text-[11px] text-slate-500 font-medium">{t.recruiter.verifiedStudents}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              aria-label={t.recruiter.searchScoutPlaceholder}
              placeholder={t.recruiter.searchScoutPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-on-surface placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all font-medium"
            />
          </div>

          {/* Language Selector */}
          <div className="md:col-span-3">
            <select
              aria-label="Filter candidates by programming language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l === "All"
                    ? t.recruiter.allLanguages
                    : language === "bn"
                    ? `মূল প্রযুক্তি: ${l}`
                    : `Primary Tech: ${l}`}
                </option>
              ))}
            </select>
          </div>

          {/* University Selector */}
          <div className="md:col-span-4">
            <select
              aria-label="Filter candidates by university"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all cursor-pointer"
            >
              {universities.map((u) => (
                <option key={u} value={u}>
                  {u === "All" ? t.recruiter.allUniversities : u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Min Match Score Slider */}
        <div className="flex items-center gap-4 pt-1">
          <div className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {language === "bn" ? "ন্যূনতম ম্যাচ স্কোর:" : "Minimum Match Score:"}{" "}
            <span className="font-mono text-primary-container font-black">{minMatchScore}%</span>
          </div>
          <input
            type="range"
            aria-label="Minimum Match score threshold"
            min="80"
            max="98"
            step="1"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="flex-1 accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
          />
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-2" aria-hidden="true" />
            <p className="font-bold text-sm text-on-surface">{t.recruiter.noScoutCandidates}</p>
            <p className="text-xs text-slate-500 mt-1">{t.recruiter.noScoutCandidatesDesc}</p>
          </div>
        ) : (
          filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-secondary-mint/60 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Human Photo Avatar, Name, Title, Score */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-xs border border-slate-200/80">
                      {candidate.avatarUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={candidate.avatarUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-container to-[#0A2E28] text-white font-extrabold flex items-center justify-center text-sm">
                          {candidate.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-on-surface leading-tight flex items-center gap-1.5">
                        <span>{candidate.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
                      </h3>
                      <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                        {candidate.primaryLang} Developer
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-lg font-mono font-black text-xs bg-secondary-mint/15 text-primary-container border border-secondary-mint/30">
                      {candidate.matchScore}%
                    </span>
                  </div>
                </div>

                {/* University & Degree */}
                <div className="text-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-primary-container font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint flex-shrink-0" aria-hidden="true" />
                    <span>{candidate.university}</span>
                  </div>
                  <span className="text-slate-500 block text-[11px] font-medium">
                    {candidate.degree} ({t.recruiter.classOf} {candidate.gradYear})
                  </span>
                </div>

                {/* Featured Project Showcase Card (Clean, Human & Non-AI) */}
                <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-1.5 hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <svg className="w-3.5 h-3.5 text-slate-700 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span className="font-bold text-slate-800 text-xs truncate">
                        {candidate.projectTitle}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{candidate.repoStars}</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-1">
                    {candidate.projectDesc}
                  </p>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
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
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>{t.recruiter.invitationSent}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedCandidateForInvite(candidate)}
                    aria-label={`${t.recruiter.inviteToApply} - ${candidate.name}`}
                    className="w-full py-2 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                  >
                    <Send className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
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
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-modal-title"
          onClick={() => setSelectedCandidateForInvite(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-level-3 border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                  {selectedCandidateForInvite.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={selectedCandidateForInvite.avatarUrl}
                      alt={selectedCandidateForInvite.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-slate-700">{selectedCandidateForInvite.initials}</span>
                  )}
                </div>
                <div>
                  <h3 id="invite-modal-title" className="text-base font-black text-on-surface">
                    {t.recruiter.inviteModalTitle} {selectedCandidateForInvite.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {selectedCandidateForInvite.university} • {selectedCandidateForInvite.degree}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidateForInvite(null)}
                aria-label="Close invitation modal"
                className="text-slate-400 hover:text-on-surface p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label htmlFor="select-position-invite" className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {t.recruiter.selectPositionInvite}
                </label>
                <select
                  id="select-position-invite"
                  value={selectedTargetJobId}
                  onChange={(e) => setSelectedTargetJobId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint cursor-pointer"
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium">
                {t.recruiter.inviteNotice}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateForInvite(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  <Send className="w-3.5 h-3.5 text-secondary-mint" aria-hidden="true" />
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
