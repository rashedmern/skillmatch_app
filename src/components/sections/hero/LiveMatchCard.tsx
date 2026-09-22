"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Building2,
  ExternalLink,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import { HERO_SIMULATION_DATA } from "@/data/heroSimulation";

export const LiveMatchCard: React.FC = () => {
  const data = HERO_SIMULATION_DATA;
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "Concurrency":
        return <Cpu className="w-3.5 h-3.5 text-secondary-mint" />;
      case "Databases":
        return <Database className="w-3.5 h-3.5 text-secondary-mint" />;
      case "Cloud Native":
        return <Cloud className="w-3.5 h-3.5 text-secondary-mint" />;
      default:
        return <GitBranch className="w-3.5 h-3.5 text-secondary-mint" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[460px] mx-auto lg:ml-auto select-none"
    >
      {/* Background Ambient Teal Radiance */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-secondary/15 via-primary-container/10 to-transparent blur-xl pointer-events-none opacity-80" />

      {/* Main Card Container */}
      <div className="relative rounded-2xl bg-surface-container-lowest border border-stroke-card shadow-level-2 overflow-hidden">
        {/* Top Card Badge Ribbon */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-low/70 border-b border-stroke-card text-xs">
          <div className="flex items-center gap-2 text-on-surface-variant font-medium">
            <GitBranch className="w-3.5 h-3.5 text-secondary-mint" />
            <span>AST Code Verification Simulation</span>
          </div>
          <span className="font-mono text-[11px] text-outline tabular-nums">
            ID: cse_94a2f
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* 1. Candidate Identity Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar with Verified Status */}
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-primary-container/10 border-2 border-surface-container-lowest shadow-sm flex items-center justify-center font-bold text-primary-container">
                  AC
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-mint border-2 border-surface-container-lowest flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-on-surface text-base leading-none font-sans">
                    {data.candidate.name}
                  </h3>
                  <span className="text-xs text-outline font-normal">
                    {data.candidate.handle}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 font-medium">
                  {data.candidate.institution} • {data.candidate.gradTerm}
                </p>
              </div>
            </div>

            {/* High Match Score Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-primary-container font-bold text-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-mint opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-mint" />
              </span>
              <span className="tabular-nums font-mono">
                {data.matchSummary.score}% Match
              </span>
            </div>
          </div>

          {/* 2. Target Match Opportunity Sub-Card */}
          <div className="p-3.5 rounded-xl bg-surface-container-low/80 border border-stroke-slate space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-mint">
                  Target Opportunity Match
                </span>
                <h4 className="font-bold text-sm text-on-surface leading-tight mt-0.5">
                  {data.targetRole.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1">
                  <Building2 className="w-3.5 h-3.5 text-outline" />
                  <span className="font-medium">{data.targetRole.company}</span>
                </div>
              </div>

              {/* Comp Badge */}
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded-md bg-surface-container-lowest border border-stroke-card font-bold text-xs text-primary-container tabular-nums">
                  {data.targetRole.compensation}
                </span>
                <p className="text-[10px] text-outline mt-0.5">
                  {data.targetRole.term}
                </p>
              </div>
            </div>

            {/* Logistics Pill Tags */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-container-lowest text-outline border border-stroke-card/60">
                {data.targetRole.location}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-container-lowest text-outline border border-stroke-card/60">
                Direct Engineering Lead Screen
              </span>
            </div>
          </div>

          {/* 3. Verified Code AST Telemetry Progress Rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px] text-outline">
                Verified Codebase AST Benchmarks
              </span>
              <span className="text-[11px] text-secondary-mint font-semibold">
                OpenType Tabular Precision
              </span>
            </div>

            <div className="space-y-2.5">
              {data.astMetrics.map((metric) => (
                <div
                  key={metric.id}
                  onMouseEnter={() => setActiveMetricId(metric.id)}
                  onMouseLeave={() => setActiveMetricId(null)}
                  className={`p-2.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    activeMetricId === metric.id
                      ? "bg-surface-container-low border-secondary-mint shadow-sm"
                      : "bg-surface-container-lowest border-stroke-card hover:border-stroke-hover"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {getMetricIcon(metric.category)}
                      <span className="font-medium text-on-surface truncate">
                        {metric.skillName}
                      </span>
                    </div>

                    <span className="font-bold text-primary-container tabular-nums font-mono whitespace-nowrap">
                      {metric.percentile}th %ile
                    </span>
                  </div>

                  {/* Meter Arc / Bar Fill */}
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.percentile}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-primary-container to-secondary-mint rounded-full"
                    />
                  </div>

                  {/* Context Microcopy */}
                  <p className="text-[10px] text-outline mt-1.5 truncate">
                    {metric.verifiedContext}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Calibrated Qualification Gap Notice (Coral Red Micro-Contrast) */}
          <div className="p-3.5 rounded-xl bg-accent-gap-subtle border border-accent-gap-border">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-accent-gap/10 text-accent-gap flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-accent-gap">
                    Skill Gap: {data.gapAlert.missingSkill}
                  </span>
                  <span className="text-[10px] font-semibold text-accent-gap/80 bg-accent-gap/10 px-1.5 py-0.5 rounded">
                    Missing Req
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Target team utilizes eBPF probes for kernel metrics. Suggested prep:{" "}
                  <strong className="text-on-surface font-semibold">
                    {data.gapAlert.suggestedPrepTime}
                  </strong>
                  .
                </p>
                <div className="pt-2">
                  <a
                    href="#prep"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-container hover:text-secondary-mint transition-colors"
                  >
                    <span>{data.gapAlert.actionLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Live Telemetry Footer */}
        <div className="px-5 py-2.5 bg-surface-container-low/50 border-t border-stroke-card flex items-center justify-between text-[11px] text-outline">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-mint" />
            Verified Against ScaleOps Production Stack
          </span>
          <span className="font-mono tabular-nums">Sync: 14s ago</span>
        </div>
      </div>
    </motion.div>
  );
};
