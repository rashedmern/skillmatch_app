"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Building2,
  Cpu,
  Database,
  Cloud,
  MessageSquare,
  Sparkles,
  CalendarCheck,
  GitBranch,
} from "lucide-react";
import { HERO_SIMULATION_DATA } from "@/data/heroSimulation";
import { StatusDot } from "@/components/ui/StatusDot";

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
    <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto select-none pt-6 pb-4">
      {/* Floating Pill 1: Top-Right Recruiter Message */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-2 sm:-right-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-stroke-card shadow-level-3 backdrop-blur-md max-w-[280px]"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs text-on-surface">Stripe Recruiter</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-outline truncate">
            "Loved your Postgres repo. Let's chat!"
          </p>
        </div>
      </motion.div>

      {/* Floating Pill 2: Bottom-Left Offer/Interview Alert */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-2 sm:-left-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-stroke-card shadow-level-3 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <span className="font-bold text-xs text-on-surface block">
            Technical Screen Confirmed
          </span>
          <span className="text-[10px] text-outline">
            Tomorrow at 2:00 PM • Google Meet
          </span>
        </div>
      </motion.div>

      {/* Main Match Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-surface-container-lowest border border-stroke-card shadow-level-3 overflow-hidden p-5 sm:p-6 space-y-4 sm:space-y-5"
      >
        {/* Top Header: Candidate Identity */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with Verified Status */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-primary-container to-secondary text-white font-extrabold text-base flex items-center justify-center shadow-md">
                RM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary-mint border-2 border-surface-container-lowest flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-on-surface text-base leading-none font-sans truncate">
                  {data.candidate.name}
                </h3>
                <span className="text-xs text-outline font-normal truncate hidden xs:inline">
                  {data.candidate.handle}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 font-medium truncate">
                {data.candidate.institution} • {data.candidate.gradTerm}
              </p>
            </div>
          </div>

          {/* High Match Score Badge */}
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-primary-container font-extrabold text-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-secondary-mint" />
            <span className="tabular-nums font-mono">
              {data.matchSummary.score}% Match
            </span>
          </div>
        </div>

        {/* Target Match Opportunity Sub-Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-low border border-stroke-card space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-mint block">
                Target Role Match
              </span>
              <h4 className="font-bold text-sm sm:text-base text-on-surface leading-tight mt-0.5 truncate">
                {data.targetRole.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1">
                <Building2 className="w-3.5 h-3.5 text-outline shrink-0" />
                <span className="font-medium truncate">{data.targetRole.company}</span>
              </div>
            </div>

            {/* Comp Badge */}
            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-full bg-surface-container-lowest border border-stroke-card font-bold text-xs text-primary-container tabular-nums">
                {data.targetRole.compensation}
              </span>
              <p className="text-[10px] text-outline mt-0.5">
                {data.targetRole.term}
              </p>
            </div>
          </div>

          {/* Logistics Pill Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-outline border border-stroke-card">
              {data.targetRole.location}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Direct Interview Screening
            </span>
          </div>
        </div>

        {/* Verified Code AST Telemetry Progress Rows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-[10px] text-outline">
              Verified Codebase Telemetry
            </span>
            <span className="text-[11px] text-secondary-mint font-bold">
              AST Scored
            </span>
          </div>

          <div className="space-y-2.5">
            {data.astMetrics.map((metric) => (
              <div
                key={metric.id}
                onMouseEnter={() => setActiveMetricId(metric.id)}
                onMouseLeave={() => setActiveMetricId(null)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  activeMetricId === metric.id
                    ? "bg-surface-container-low border-secondary-mint/40 shadow-sm"
                    : "bg-surface-container-lowest border-stroke-card/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    {getMetricIcon(metric.category)}
                    <span className="font-bold text-on-surface">
                      {metric.category}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-primary-container tabular-nums">
                    {metric.percentile}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-secondary-mint rounded-full transition-all duration-500"
                    style={{ width: `${metric.percentile}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
