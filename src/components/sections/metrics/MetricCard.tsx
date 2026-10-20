import React from "react";
import { Clock, BadgeCheck, GitBranch, ShieldCheck } from "lucide-react";
import { PlatformMetricItem } from "@/data/metricsData";

interface MetricCardProps {
  metric: PlatformMetricItem;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  className = "",
}) => {
  const renderIcon = (name: PlatformMetricItem["iconName"]) => {
    const iconProps = { className: "w-5 h-5 text-[#00D4BE]", strokeWidth: 2 };
    switch (name) {
      case "clock":
        return <Clock {...iconProps} />;
      case "badgeCheck":
        return <BadgeCheck {...iconProps} />;
      case "gitBranch":
        return <GitBranch {...iconProps} />;
      case "shield":
        return <ShieldCheck {...iconProps} />;
    }
  };

  return (
    <div
      className={`group relative rounded-2xl bg-[#121920] border border-white/10 p-6 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all duration-200 flex flex-col justify-between text-white ${className}`}
    >
      {/* Top Meta: Icon + Trend Pill */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#00D4BE]/10 transition-all duration-200">
          {renderIcon(metric.iconName)}
        </div>

        {metric.trend && (
          <span className="text-[11px] font-bold text-[#00D4BE] bg-[#00D4BE]/10 px-2.5 py-1 rounded-full border border-[#00D4BE]/30">
            {metric.trend}
          </span>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="space-y-1">
        <div className="flex items-baseline font-mono font-bold text-white tracking-tight">
          <span className="text-3xl sm:text-4xl tabular-nums font-bold font-sans">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="text-sm sm:text-base font-semibold text-[#00D4BE] ml-1 font-sans">
              {metric.unit}
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-white font-sans pt-1">
          {metric.label}
        </h3>

        {metric.subtext && (
          <p className="text-xs text-zinc-400 font-normal leading-relaxed pt-1 font-sans">
            {metric.subtext}
          </p>
        )}
      </div>
    </div>
  );
};
