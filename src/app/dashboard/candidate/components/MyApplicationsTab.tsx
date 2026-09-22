"use client";

import React, { useState } from "react";
import { AppliedJob } from "./types";
import {
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

interface MyApplicationsTabProps {
  applications: AppliedJob[];
  onNavigateToAllJobs: () => void;
  onTriggerToast: (msg: string) => void;
}

export const MyApplicationsTab: React.FC<MyApplicationsTabProps> = ({
  applications,
  onNavigateToAllJobs,
  onTriggerToast,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredApps = applications.filter((app) => {
    if (selectedStatus === "All") return true;
    return app.status === selectedStatus;
  });

  const getStatusBadge = (status: AppliedJob["status"]) => {
    switch (status) {
      case "Offer Extended":
        return "bg-secondary/15 text-secondary-mint border-secondary/30";
      case "Interview Scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      case "Assessment Passed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Real-Time Recruiter Dispatch Tracking</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              My Active Applications Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              Track the exact stage of your candidate dossier across top engineering organizations. Your ABET-verified student status guarantees direct access to engineering hiring managers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-right self-stretch md:self-auto">
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
              In-Progress
            </div>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-secondary-container">
              {applications.length} Active
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stroke-card shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider mr-1">
            Status:
          </span>
          {[
            "All",
            "Offer Extended",
            "Interview Scheduled",
            "Under Review",
            "Assessment Passed",
          ].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedStatus === status
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onNavigateToAllJobs}
          className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Explore More Open Roles</span>
        </button>
      </div>

      {/* Applications Data Table */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-low text-outline mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-on-surface">No Applications Match Filter</h3>
            <p className="text-xs text-on-surface-variant">
              There are no jobs currently under &apos;{selectedStatus}&apos;. Browse all available jobs to submit a new 1-click application.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToAllJobs}
            className="px-4 py-2 rounded-xl bg-primary-container text-white text-xs font-bold inline-flex items-center gap-2"
          >
            <span>Browse All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stroke-card bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-stroke-card text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Target Organization &amp; Role</th>
                  <th className="py-3 px-4">AST Match Vector</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Next Action / Timeline</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-container-lowest/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-sm text-on-surface">{job.company}</div>
                      <div className="text-xs text-primary font-bold mt-0.5">{job.role}</div>
                      <div className="text-[11px] text-outline font-mono mt-0.5">
                        {job.salary} • {job.location} • Applied {job.appliedDate}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="inline-flex items-center gap-1 font-bold text-secondary-mint bg-secondary/10 px-2 py-0.5 rounded text-xs">
                        {job.matchScore}% Match
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          job.status
                        )}`}
                      >
                        <Clock className="w-3 h-3" />
                        {job.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-on-surface-variant max-w-xs">
                      {job.nextStep}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onTriggerToast(`Reviewing packet telemetry for ${job.company}...`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-slate-200 text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                      >
                        <span>Telemetry</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
