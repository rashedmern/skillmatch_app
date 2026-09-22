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
    const iconProps = { className: "w-5 h-5 text-secondary-mint", strokeWidth: 2 };
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
      className={`group relative rounded-2xl bg-surface-container-lowest border border-stroke-card p-6 shadow-level-1 hover:shadow-level-2 hover:border-secondary-mint/40 transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      {/* Top Meta: Icon + Trend Pill */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface-container-low border border-stroke-card flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          {renderIcon(metric.iconName)}
        </div>

        {metric.trend && (
          <span className="text-[11px] font-semibold text-secondary-mint bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
            {metric.trend}
          </span>
        )}
      </div>

      {/* Main Metric Value (Enforcing OpenType tabular-nums strictly) */}
      <div className="space-y-1">
        <div className="flex items-baseline font-mono font-bold text-on-surface tracking-tight">
          <span className="text-3xl sm:text-4xl tabular-nums font-bold font-sans">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="ml-1 text-lg sm:text-xl text-secondary-mint font-bold font-sans">
              {metric.unit}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-bold text-on-surface font-sans leading-snug">
          {metric.label}
        </h3>

        <p className="text-xs sm:text-[13px] text-on-surface-variant font-normal leading-relaxed pt-1 font-sans">
          {metric.subtext}
        </p>
      </div>

      {/* Subtle bottom accent line on hover */}
      <div className="mt-4 pt-3 border-t border-stroke-card/60 flex items-center justify-between text-[11px] text-outline font-medium">
        <span>Verified Signal</span>
        <span className="group-hover:text-secondary-mint transition-colors">
          Telemetry Ready →
        </span>
      </div>
    </div>
  );
};
