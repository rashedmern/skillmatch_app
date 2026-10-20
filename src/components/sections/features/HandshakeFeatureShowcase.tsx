"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Sparkles, Code2, Terminal } from "lucide-react";

export const HandshakeFeatureShowcase: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#14151C] text-white space-y-24 sm:space-y-32">
      {/* FEATURE 1: Left Dark Green Gradient Canvas + Right "Get hired" */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Rich Dark Green Gradient Canvas with Floating White Job Cards */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-br from-[#051C19] via-[#0D3E35] to-[#095964] border border-[#00D4BE]/25 shadow-2xl shadow-[#051C19]/80">
              {/* Subtle ambient green glow pools */}
              <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-[#00D4BE]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-[#051C19]/60 blur-2xl pointer-events-none" />

              {/* Stack of Floating Clean White Cards */}
              <div className="space-y-4 relative z-10">
                {/* Card 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white text-black shadow-xl border border-black/5 transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center font-bold text-teal-800 text-sm shrink-0">
                      DD
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-500">Datadog</span>
                      <h4 className="font-bold text-base text-zinc-900 leading-snug">
                        Backend Systems &amp; Observability Intern
                      </h4>
                      <p className="text-xs text-zinc-600 font-medium mt-0.5">
                        $45 - $55/hr • Summer 2026 Internship • Remote / NYC
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 (Elevated) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white text-black shadow-2xl border border-black/5 ml-2 sm:ml-6 transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#00D4BE]/20 flex items-center justify-center font-bold text-[#095964] text-sm shrink-0">
                      SP
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-500">Stripe</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D4BE]/15 text-[#075951] border border-[#00D4BE]/30">
                          98% Skill Match
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-zinc-900 leading-snug mt-0.5">
                        Platform Infrastructure Intern
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
                        $55 - $70/hr • Summer Internship • San Francisco / Remote
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 text-black shadow-lg border border-black/5 opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 text-sm shrink-0">
                      SO
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-500">ScaleOps</span>
                      <h4 className="font-bold text-base text-zinc-900 leading-snug">
                        Cloud Native &amp; DevOps Intern
                      </h4>
                      <p className="text-xs text-zinc-600 font-medium mt-0.5">
                        $40 - $50/hr • Summer 2026 • Remote
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Get hired */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Get hired
            </h3>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              Skip the resume black hole. Connect directly with engineering managers who hire based on working code, problem-solving, and verified project tracks—not generic CV keywords.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 2: Left "Work with Real Code" + Right Dashboard Mockup */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Headline & Button */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Work with Real Code
            </h3>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              No previous corporate brand names required. Build distributed systems, optimize query planners, and earn verified proof of your engineering skills through practical challenges.
            </p>
            <div className="pt-2">
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right: Rich Dark Green Gradient Canvas with White Projects Dashboard */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-[#051C19] via-[#0D3E35] to-[#095964] border border-[#00D4BE]/25 shadow-2xl shadow-[#051C19]/80">
              {/* Ambient lighting */}
              <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-[#00D4BE]/15 blur-3xl pointer-events-none" />

              {/* White Dashboard Window */}
              <div className="relative z-10 rounded-2xl bg-white text-black p-5 sm:p-7 shadow-2xl border border-black/5 space-y-5">
                {/* Header with Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="font-black text-lg sm:text-xl text-zinc-900">
                      Open tracks to build real proof
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Evaluated on execution efficiency, tests, and code quality
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="font-black text-base text-zinc-900 block">$4.8M+</span>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold">Stipends Earned</span>
                    </div>
                    <div>
                      <span className="font-black text-base text-zinc-900 block">12,000+</span>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold">Students Placed</span>
                    </div>
                  </div>
                </div>

                {/* 4 Project Track Cards Grid (Inside White Dashboard) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#00D4BE] transition-colors">
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 block">
                      Concurrent Go Microservices
                    </span>
                    <span className="text-xs font-semibold text-[#095964] mt-1 block">
                      Up to $65/hr
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-2 block">
                      Distributed Systems • Channels • Concurrency
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#00D4BE] transition-colors">
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 block">
                      Postgres Query Optimization
                    </span>
                    <span className="text-xs font-semibold text-[#095964] mt-1 block">
                      Up to $70/hr
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-2 block">
                      Indexing • EXPLAIN Analysis • Connection Pooling
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#00D4BE] transition-colors">
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 block">
                      Kubernetes Operator Runtime
                    </span>
                    <span className="text-xs font-semibold text-[#095964] mt-1 block">
                      Up to $75/hr
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-2 block">
                      Cloud Native • Custom Controllers • Docker
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#00D4BE] transition-colors">
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 block">
                      AI Evaluation &amp; Inference
                    </span>
                    <span className="text-xs font-semibold text-[#095964] mt-1 block">
                      Up to $80/hr
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-2 block">
                      PyTorch • Latency Benchmarks • LLM Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 3: Laptop / Code Studio Showcase */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-[#051C19] via-[#0D3E35] to-[#091a13] border border-[#00D4BE]/20 text-center space-y-6 overflow-hidden relative shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D4BE] px-3 py-1 rounded-full bg-[#00D4BE]/10 border border-[#00D4BE]/30">
              SkillMatch Code Studio
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Build on Real Code
            </h3>
            <p className="text-sm sm:text-base text-zinc-300">
              Complete hands-on engineering challenges evaluated on efficiency, memory, and edge-case handling—the exact criteria lead engineers look for.
            </p>
          </div>

          {/* Code IDE Window Mockup */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#091412] border border-white/15 shadow-2xl overflow-hidden text-left font-mono text-xs">
            {/* Window Title Bar */}
            <div className="px-4 py-2.5 bg-[#060e0d] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-zinc-400 ml-2 font-sans font-medium text-xs">
                  SkillMatch Studio • query_optimizer.go
                </span>
              </div>
              <span className="text-[10px] text-[#00D4BE] font-bold px-2 py-0.5 rounded bg-[#00D4BE]/15 border border-[#00D4BE]/30">
                Verified: 98.4% Score
              </span>
            </div>

            {/* Code Content */}
            <div className="p-5 space-y-2 text-zinc-300 overflow-x-auto">
              <p className="text-zinc-500">// Benchmarking concurrency handling on PostgreSQL connection pool</p>
              <p><span className="text-emerald-400 font-bold">func</span> <span className="text-cyan-300">EvaluateDatabasePool</span>(ctx context.Context, workers <span className="text-amber-400">int</span>) <span className="text-amber-400">error</span> &#123;</p>
              <p className="pl-4">pool, err := pgxpool.New(ctx, os.Getenv(<span className="text-emerald-300">&quot;DATABASE_URL&quot;</span>))</p>
              <p className="pl-4"><span className="text-emerald-400 font-bold">defer</span> pool.Close()</p>
              <p className="pl-4 text-emerald-400 font-bold">// Verified: Concurrency handled safely without race conditions or memory leaks</p>
              <p className="pl-4"><span className="text-cyan-300">fmt</span>.Println(<span className="text-emerald-300">&quot;Student verified for Backend Engineering Intern Track&quot;</span>)</p>
              <p className="pl-4"><span className="text-emerald-400 font-bold">return</span> nil</p>
              <p>&#125;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
