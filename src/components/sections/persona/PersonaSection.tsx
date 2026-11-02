"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  ArrowRight,
  MessageSquare,
  Search,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Code2,
} from "lucide-react";

export const PersonaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"candidates" | "employers">("candidates");

  return (
    <section id="recruiters" className="w-full py-16 sm:py-24 bg-[#14151C] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#0D3E35]/25 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00D4BE] px-3.5 py-1.5 rounded-full bg-[#00D4BE]/10 border border-[#00D4BE]/30">
            Platform Overview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Designed for candidates <br className="hidden sm:inline" />
            and hiring teams.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for an engineering role or searching for developers with verified project experience, SkillMatch simplifies the connection.
          </p>

          {/* Persona Segmented Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-[#121920] border border-white/10 shadow-lg mt-4">
            <button
              onClick={() => setActiveTab("candidates")}
              className={`relative flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "candidates"
                  ? "bg-[#00D4BE] text-[#051C19] shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>For Candidates</span>
            </button>

            <button
              onClick={() => setActiveTab("employers")}
              className={`relative flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "employers"
                  ? "bg-[#00D4BE] text-[#051C19] shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Recruiters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Persona Content */}
        <AnimatePresence mode="wait">
          {activeTab === "candidates" ? (
            <motion.div
              key="candidates"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Value Props for Students */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Direct outreach from recruiters
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Hiring managers and recruiters contact you directly based on your verified skills, projects, and portfolio links.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Showcase real engineering projects
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Highlight your practical codebases, relational databases, backend APIs, and web applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Structured skill matching
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        View how your technical skills match against active job requirements with transparent scoring.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
                  >
                    <span>Create Candidate Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Candidate Dashboard Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#121920] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Candidate Dashboard
                      </span>
                      <h4 className="font-bold text-lg text-white mt-0.5">
                        Matched Engineering Roles
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-bold text-xs border border-[#00D4BE]/30">
                      Live Matching
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Backend Systems Engineer</span>
                        <span className="text-xs text-zinc-400">ScaleOps Inc. • PostgreSQL, Go, Docker</span>
                      </div>
                      <span className="text-xs font-bold text-[#00D4BE] bg-[#00D4BE]/10 px-2.5 py-1 rounded-lg">95% Match</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Full-Stack Platform Engineer</span>
                        <span className="text-xs text-zinc-400">CloudScale Labs • React, TypeScript, Prisma</span>
                      </div>
                      <span className="text-xs font-bold text-[#00D4BE] bg-[#00D4BE]/10 px-2.5 py-1 rounded-lg">92% Match</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Database Administrator / SRE</span>
                        <span className="text-xs text-zinc-400">Veritas Cloud • PostgreSQL, Query Tuning</span>
                      </div>
                      <span className="text-xs font-bold text-[#00D4BE] bg-[#00D4BE]/10 px-2.5 py-1 rounded-lg">89% Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="employers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Recruiter Value Props */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Filter by verified technical skills
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Search candidates based on specific technologies like PostgreSQL, Docker, Next.js, and API engineering.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Comprehensive candidate dossiers
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        View academic credentials, verified skills, GitHub repositories, and resumes in one unified interface.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Integrated ATS pipeline
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Track applicants through Review, Interview, and Offer stages with relational database stage history tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/register?role=recruiter"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
                  >
                    <span>Post a Job &amp; Find Talent</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Recruiter Pipeline Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#121920] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Employer Pipeline
                      </span>
                      <h4 className="font-bold text-lg text-white mt-0.5">
                        Applicant Tracking
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-bold text-xs border border-[#00D4BE]/30">
                      Active Jobs
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Rashed Molla</span>
                        <span className="text-xs text-zinc-400">Software Engineer • University of Asia Pacific</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">Interview Scheduled</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Alex Chen</span>
                        <span className="text-xs text-zinc-400">Distributed Systems • UC Berkeley</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">Under Review</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">Elena Rostova</span>
                        <span className="text-xs text-zinc-400">Database Internals • ETH Zurich</span>
                      </div>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg">Offer Extended</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
