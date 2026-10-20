"use client";

import React, { useState } from "react";
import { CandidateProfile, JobListing } from "./types";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import {
  Bookmark,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Circle,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface DashboardOverviewTabProps {
  profile: CandidateProfile;
  jobs: JobListing[];
  onApplyJob: (job: JobListing) => void;
  onNavigateToAllJobs: () => void;
  onNavigateToProfile: () => void;
  onTriggerToast: (msg: string) => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  profile,
  jobs,
  onApplyJob,
  onNavigateToAllJobs,
  onNavigateToProfile,
  onTriggerToast,
}) => {
  // Bookmarked job IDs
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Record<string, boolean>>({});

  // Checklist state
  const [checklist, setChecklist] = useState({
    cv: true,
    profile: true,
    preferences: false,
  });

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedJobs((prev) => {
      const next = !prev[id];
      onTriggerToast(next ? `Saved '${title}' to bookmarks!` : `Removed '${title}' from bookmarks.`);
      return { ...prev, [id]: next };
    });
  };

  // Curated job categories
  const newMatches: JobListing[] = [
    {
      id: "hm-1",
      title: "Site Reliability & Backend Intern",
      company: "Dev Technology Group",
      logoText: "DT",
      location: "Ashburn, VA (On-site)",
      workModel: "Hybrid",
      domain: "Cloud & SRE",
      salary: "$45 - $55/hr",
      matchScore: 96,
      tags: ["Go", "Kubernetes", "Linux"],
      description: "Assist engineering teams with cluster provisioning and telemetry pipeline maintenance.",
      postedDate: "2 days ago • New",
    },
    {
      id: "hm-2",
      title: "Mobile & Systems Developer Intern",
      company: "RideCo",
      logoText: "RC",
      location: "Waterloo, Ontario (Remote)",
      workModel: "Remote",
      domain: "Distributed Systems",
      salary: "$40 - $50/hr",
      matchScore: 92,
      tags: ["TypeScript", "React Native", "APIs"],
      description: "Build next-generation transit routing and dispatch systems with low-latency APIs.",
      postedDate: "2 days ago • New",
    },
    {
      id: "hm-3",
      title: "Platform Infrastructure Intern",
      company: "Stripe",
      logoText: "SP",
      location: "San Francisco, CA",
      workModel: "Hybrid",
      domain: "Distributed Systems",
      salary: "$55 - $70/hr",
      matchScore: 98,
      tags: ["Go", "Distributed Storage", "gRPC"],
      description: "Design high-reliability payment infrastructure serving millions of global transactions.",
      postedDate: "3 days ago • New",
    },
    {
      id: "hm-4",
      title: "Security & Systems Trust Intern",
      company: "Truveta",
      logoText: "TV",
      location: "Seattle, WA (Remote)",
      workModel: "Remote",
      domain: "Kernel & Systems",
      salary: "$50 - $60/hr",
      matchScore: 91,
      tags: ["Zero-Trust", "Python", "Cloud Security"],
      description: "Collaborate on cryptographic audit logs and data isolation for distributed healthcare systems.",
      postedDate: "2 days ago • New",
    },
  ];

  const jobPicks: JobListing[] = [
    {
      id: "jp-1",
      title: "Software Engineering Intern",
      company: "Google, Inc.",
      logoText: "G",
      location: "Mountain View, CA",
      workModel: "Hybrid",
      domain: "Distributed Systems",
      salary: "$55 - $65/hr",
      matchScore: 97,
      tags: ["C++", "Go", "Distributed Systems"],
      description: "Build scalable microservices and internal developer tooling used by thousands of engineers.",
      postedDate: "4 weeks ago",
    },
    {
      id: "jp-2",
      title: "Site Reliability Graduate Intern",
      company: "TikTok Inc.",
      logoText: "TT",
      location: "San Jose, CA",
      workModel: "Hybrid",
      domain: "Cloud & SRE",
      salary: "$55 - $65/hr",
      matchScore: 94,
      tags: ["Linux", "Kubernetes", "Prometheus"],
      description: "Maintain core multi-region streaming infrastructure and monitor edge server clusters.",
      postedDate: "4 weeks ago",
    },
    {
      id: "jp-3",
      title: "Cloud Native Kubernetes Intern",
      company: "ScaleOps",
      logoText: "SO",
      location: "San Francisco, CA",
      workModel: "Remote",
      domain: "Distributed Systems",
      salary: "$45 - $55/hr",
      matchScore: 95,
      tags: ["Go", "Docker", "Kubernetes CRDs"],
      description: "Build custom controllers and automated autoscaling operators for cloud-native clusters.",
      postedDate: "3 days ago",
    },
    {
      id: "jp-4",
      title: "Backend Observability Intern",
      company: "Datadog",
      logoText: "DD",
      location: "New York, NY",
      workModel: "Hybrid",
      domain: "Cloud & SRE",
      salary: "$50 - $60/hr",
      matchScore: 96,
      tags: ["Go", "PostgreSQL", "Kafka"],
      description: "Work on ingestion pipelines processing billions of telemetry events with sub-second latency.",
      postedDate: "1 week ago",
    },
  ];

  const goodFits: JobListing[] = [
    {
      id: "gf-1",
      title: "Edge Network Systems Intern",
      company: "Cloudflare",
      logoText: "CF",
      location: "Austin, TX (Remote)",
      workModel: "Remote",
      domain: "Kernel & Systems",
      salary: "$52 - $62/hr",
      matchScore: 93,
      tags: ["Rust", "WASM", "HTTP/3"],
      description: "Help optimize edge workers and low-latency DNS resolution for a third of the internet.",
      postedDate: "1 day ago",
    },
    {
      id: "gf-2",
      title: "Distributed Database Engine Intern",
      company: "CockroachLabs",
      logoText: "CR",
      location: "New York, NY",
      workModel: "Remote",
      domain: "Database Engines",
      salary: "$55 - $70/hr",
      matchScore: 96,
      tags: ["Go", "Raft", "SQL Execution"],
      description: "Implement query planner optimizers and distributed multi-region transaction protocols.",
      postedDate: "2 days ago",
    },
    {
      id: "gf-3",
      title: "Real-Time Infrastructure Intern",
      company: "Uber",
      logoText: "UB",
      location: "San Francisco, CA",
      workModel: "Hybrid",
      domain: "Distributed Systems",
      salary: "$55 - $65/hr",
      matchScore: 94,
      tags: ["Go", "Kafka", "Redis"],
      description: "Contribute to real-time dispatch pipelines and geofencing distributed state stores.",
      postedDate: "5 days ago",
    },
    {
      id: "gf-4",
      title: "Production Engineering Intern",
      company: "Meta",
      logoText: "ME",
      location: "Menlo Park, CA",
      workModel: "Hybrid",
      domain: "Cloud & SRE",
      salary: "$60 - $70/hr",
      matchScore: 95,
      tags: ["Python", "Linux Kernel", "BGP"],
      description: "Troubleshoot large-scale data center networks and automate server fleet deployments.",
      postedDate: "1 week ago",
    },
  ];

  const renderJobCard = (job: JobListing) => {
    const isBookmarked = !!bookmarkedJobs[job.id];

    return (
      <div
        key={job.id}
        className="group relative bg-white border border-zinc-200/90 hover:border-[#00D4BE]/60 rounded-2xl p-4 sm:p-5 hover:shadow-[0_8px_25px_rgba(0,212,190,0.12)] transition-all flex flex-col justify-between select-none"
      >
        <div className="space-y-3">
          {/* Top Row: Company Info & Bookmark Button */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <CompanyLogo name={job.company} size="md" className="shrink-0" />
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 truncate leading-snug">
                  {job.company}
                </h4>
                <p className="text-[11px] text-zinc-500 truncate">Internet &amp; Software</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleBookmark(job.id, job.title)}
              className="p-1 rounded-md text-zinc-400 hover:text-[#00D4BE] transition-colors cursor-pointer shrink-0"
              aria-label="Bookmark role"
            >
              <Bookmark
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isBookmarked ? "fill-[#00D4BE] text-[#00D4BE]" : ""
                }`}
              />
            </button>
          </div>

          {/* Role Title */}
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-[#095964] transition-colors line-clamp-2 leading-snug">
              {job.title}
            </h3>
            <p className="text-xs font-semibold text-zinc-700 mt-1">{job.salary} • Full-time internship</p>
          </div>
        </div>

        {/* Bottom Details & 1-Click Action */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="truncate">{job.location}</span>
          <button
            type="button"
            onClick={() => onApplyJob(job)}
            className="text-xs font-bold text-[#095964] hover:text-[#00D4BE] transition-colors cursor-pointer shrink-0 ml-2"
          >
            Apply &rarr;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. WELCOME GREETING */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
          Welcome back, {profile.name ? profile.name.split(" ")[0] : "Rashed"}
        </h1>
      </div>

      {/* 2. "GET MATCH-READY" CARD (Styled with User's Soft Green Gradient Theme) */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#e6fbf7] to-[#f4fdfb] border border-[#00D4BE]/30 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Heading & Subtitle */}
          <div className="space-y-1.5 max-w-md">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Get search-ready
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Set up to get matched with the right engineering internships
            </p>
          </div>

          {/* Right: 3 Checklist Items */}
          <div className="space-y-2.5 sm:space-y-3 shrink-0">
            {/* Item 1: Upload a CV */}
            <button
              type="button"
              onClick={() => {
                setChecklist((p) => ({ ...p, cv: !p.cv }));
                onNavigateToProfile();
              }}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:text-[#095964] transition-colors cursor-pointer text-left"
            >
              {checklist.cv ? (
                <CheckCircle2 className="w-4 h-4 text-[#00D4BE] shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
              <span>Upload a CV or connect GitHub</span>
            </button>

            {/* Item 2: Complete profile */}
            <button
              type="button"
              onClick={() => {
                setChecklist((p) => ({ ...p, profile: !p.profile }));
                onNavigateToProfile();
              }}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:text-[#095964] transition-colors cursor-pointer text-left"
            >
              {checklist.profile ? (
                <CheckCircle2 className="w-4 h-4 text-[#00D4BE] shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
              <span>Complete your technical profile</span>
            </button>

            {/* Item 3: Review preferences */}
            <button
              type="button"
              onClick={() => {
                setChecklist((p) => ({ ...p, preferences: !p.preferences }));
                onTriggerToast("Preferences updated!");
              }}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:text-[#095964] transition-colors cursor-pointer text-left"
            >
              {checklist.preferences ? (
                <CheckCircle2 className="w-4 h-4 text-[#00D4BE] shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
              <span>Review your internship preferences</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. "LEVEL UP YOUR SKILLS" BANNER (Dark Green Gradient Card) */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
          Level up your skills
        </h3>

        <div className="relative rounded-2xl bg-gradient-to-r from-[#051C19] via-[#0D3E35] to-[#095964] border border-[#00D4BE]/30 p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-white shadow-xl overflow-hidden">
          {/* Ambient Glow & Sphere */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00D4BE] via-[#0a887d] to-[#051C19] shadow-[0_0_25px_rgba(0,212,190,0.6)] flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                Introducing SkillMatch Code Studio
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-normal max-w-xl">
                Build projects with real code to get verified experience for any engineering path
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={onNavigateToAllJobs}
            className="relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-[#051C19] bg-white hover:bg-[#00D4BE] active:scale-95 shadow-md transition-all cursor-pointer shrink-0"
          >
            Explore tracks
          </button>
        </div>
      </div>

      {/* 4. SECTION 1: "New matches for your search" */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onNavigateToAllJobs}
          className="group inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-zinc-900 hover:text-[#095964] transition-colors cursor-pointer"
        >
          <span>New matches for your search: Software Engineer + 3 more interests</span>
          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#095964] group-hover:translate-x-0.5 transition-all" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {newMatches.map(renderJobCard)}
        </div>
      </div>

      {/* 5. SECTION 2: "Job picks for software developers and engineers" */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onNavigateToAllJobs}
          className="group inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-zinc-900 hover:text-[#095964] transition-colors cursor-pointer"
        >
          <span>Job picks for software developers and engineers</span>
          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#095964] group-hover:translate-x-0.5 transition-all" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {jobPicks.map(renderJobCard)}
        </div>
      </div>

      {/* 6. SECTION 3: "Good fits for software developers and engineers" */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onNavigateToAllJobs}
          className="group inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-zinc-900 hover:text-[#095964] transition-colors cursor-pointer"
        >
          <span>Good fits for software developers and engineers</span>
          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#095964] group-hover:translate-x-0.5 transition-all" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {goodFits.map(renderJobCard)}
        </div>
      </div>
    </div>
  );
};
