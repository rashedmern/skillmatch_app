"use client";

import React from "react";

export const FeatureShowcase: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#14151C] text-white">
      {/* FEATURE: Code Studio Showcase */}
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

          {/* Code IDE Window */}
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
