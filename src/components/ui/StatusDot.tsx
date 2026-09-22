import React from "react";

interface StatusDotProps {
  color?: string;
  pingColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  color = "bg-secondary-mint",
  pingColor = "bg-secondary-mint",
  size = "md",
  className = "",
  animated = true,
}) => {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  }[size];

  return (
    <span className={`relative flex shrink-0 ${sizeClasses} ${className}`}>
      {animated && (
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColor}`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-full w-full ${color}`} />
    </span>
  );
};
