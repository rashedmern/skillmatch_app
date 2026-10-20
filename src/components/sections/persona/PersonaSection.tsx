"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Users,
  Code2,
  GitBranch,
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
            Engineered For Real Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            No resume black hole. <br className="hidden sm:inline" />
            Just verified engineering skills.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re a college student hunting for your first summer engineering internship or a tech lead tired of screening unverified resumes, SkillMatch connects you directly through working code.
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
              <span>For Students &amp; Grads</span>
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
              <span>For Engineering Teams</span>
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
              {/* Left: 3 Practical Value Props for Students */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Direct outreach from tech leads
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Engineering managers message you directly based on your verified code solutions and GitHub projects—bypassing automated ATS filters.
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
                        No previous corporate internships needed
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Don&apos;t have a brand-name company on your CV? Your code speaks for itself. Prove how you handle real databases, APIs, and edge cases.
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
                        Clear skill benchmarks &amp; practice
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Get specific, automated feedback on where your code has performance bottlenecks or concurrency issues, with guided tracks to level up.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
                  >
                    <span>Create Your Free Student Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Student Dashboard Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#121920] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Candidate Dashboard
                      </span>
                      <h4 className="font-bold text-lg text-white mt-0.5">
                        Matched Internships For You
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-bold text-xs border border-[#00D4BE]/30">
                      3 Active Inbound Invites
                    </span>
                  </div>

                  {/* Sample Job Match 1 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1015] border border-white/10 hover:border-[#00D4BE]/40 transition-colors space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#00D4BE]">Datadog</span>
                        <h5 className="font-bold text-sm sm:text-base text-white">Backend Distributed Systems Intern</h5>
                        <p className="text-xs text-zinc-400">$48/hr • Remote / NYC • Summer 2026</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-mono font-bold text-xs shrink-0">
                        98% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">Go</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">PostgreSQL</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">Distributed Systems</span>
                    </div>
                  </div>

                  {/* Sample Job Match 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1015] border border-white/10 hover:border-[#00D4BE]/40 transition-colors space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#00D4BE]">Stripe</span>
                        <h5 className="font-bold text-sm sm:text-base text-white">Platform Infrastructure Intern</h5>
                        <p className="text-xs text-zinc-400">$55/hr • San Francisco / Remote • Summer 2026</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-mono font-bold text-xs shrink-0">
                        95% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">TypeScript</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">Docker</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 font-mono text-zinc-300 border border-white/10">Kubernetes</span>
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
              {/* Left: 3 Practical Employer Value Props */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="p-6 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/15 border border-[#00D4BE]/30 flex items-center justify-center shrink-0 text-[#00D4BE] group-hover:scale-105 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors">
                        Filter by code quality, not keywords
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Search candidates by specific competencies—like writing concurrent Go, optimizing SQL queries, or containerization—with verified code attached.
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
                        Cut through 1,000+ unverified resumes
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Instead of wading through flooded inboxes and keyword-stuffed CVs, evaluate students who have already proven they can write clean, functioning code.
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
                        Direct pipeline from campus to team
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Reach talented computer science students across university programs before traditional career fairs even start.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/register?role=recruiter"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
                  >
                    <span>Start Hiring Verified Interns</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Recruiter ATS Pipeline Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#121920] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Employer Pipeline
                      </span>
                      <h4 className="font-bold text-lg text-white mt-0.5">
                        Active Engineering Candidates
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00D4BE]/15 text-[#00D4BE] font-bold text-xs border border-[#00D4BE]/30">
                      Live Sourcing Active
                    </span>
                  </div>

                  {/* ATS Stage Columns Preview */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0b1015] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                        <span>Code Verified</span>
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">14</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#141b22] border border-white/5 text-xs">
                        <p className="font-bold text-white truncate">Alex Chen</p>
                        <p className="text-[10px] text-[#00D4BE] font-semibold">98% Match</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b1015] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                        <span>Tech Screen</span>
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">6</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#141b22] border border-white/5 text-xs">
                        <p className="font-bold text-white truncate">Sarah Khan</p>
                        <p className="text-[10px] text-[#00D4BE] font-semibold">94% Match</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b1015] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                        <span>Offer Sent</span>
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">2</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#00D4BE]/15 border border-[#00D4BE]/30 text-xs">
                        <p className="font-bold text-white truncate">Rashed M.</p>
                        <p className="text-[10px] text-[#00D4BE] font-semibold">Accepted</p>
                      </div>
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
