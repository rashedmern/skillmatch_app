"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Layout,
  Server,
  Database,
  Brain,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { CseTrackItem } from "@/data/tracksData";
import { SkillChip } from "@/components/ui/SkillChip";

interface TrackCardProps {
  track: CseTrackItem;
  className?: string;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  className = "",
}) => {
  const renderTrackIcon = (name: CseTrackItem["iconName"]) => {
    const iconProps = {
      className: "w-5 h-5 text-[#00D4BE] transition-transform duration-200 group-hover:scale-110",
      strokeWidth: 2,
    };
    switch (name) {
      case "cpu":
        return <Cpu {...iconProps} />;
      case "layout":
        return <Layout {...iconProps} />;
      case "server":
        return <Server {...iconProps} />;
      case "database":
        return <Database {...iconProps} />;
      case "brain":
        return <Brain {...iconProps} />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl bg-[#121920] border border-white/10 p-5 sm:p-6 lg:p-7 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all duration-200 flex flex-col justify-between text-white ${className}`}
    >
      <div>
        {/* Top Header: Icon & Active Roles Count */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00D4BE]/10 transition-colors shrink-0">
            {renderTrackIcon(track.iconName)}
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00D4BE] font-mono tabular-nums shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4BE] shrink-0" />
            <span>{track.activeRolesCount} Live Roles</span>
          </div>
        </div>

        {/* Category & Title */}
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00D4BE] block">
            {track.category}
          </span>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-sans group-hover:text-[#00D4BE] transition-colors">
            {track.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed pt-1 font-sans">
            {track.description}
          </p>
        </div>

        {/* Benchmark Metric Tag */}
        <div className="mt-4 py-2 px-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-zinc-300 font-medium min-w-0">
          <TrendingUp className="w-3.5 h-3.5 text-[#00D4BE] shrink-0" />
          <span className="truncate">{track.benchmarkMetric}</span>
        </div>

        {/* Skill Chips Cluster */}
        <div className="mt-5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
            Core Skills &amp; Tools
          </span>
          <div className="flex flex-wrap gap-1.5">
            {track.skills.map((skill) => (
              <SkillChip
                key={skill.name}
                name={skill.name}
                status={skill.status}
                proficiency={skill.proficiency}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer / Action Link */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-zinc-300">
        <span className="group-hover:text-[#00D4BE] transition-colors">
          Explore Track Roadmap
        </span>
        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#00D4BE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
      </div>
    </motion.div>
  );
};
