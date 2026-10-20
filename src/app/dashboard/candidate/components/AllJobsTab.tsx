"use client";

import React, { useState } from "react";
import { JobListing } from "./types";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import {
  Search,
  MapPin,
  DollarSign,
  Bookmark,
  Share2,
  ExternalLink,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  X,
  Briefcase,
  Building2,
  Clock,
  Sparkles,
  ShieldCheck,
  MoreHorizontal,
} from "lucide-react";

interface AllJobsTabProps {
  jobs: JobListing[];
  onApplyJob: (job: JobListing) => void;
  onNavigateToApplications: () => void;
}

const EXTENDED_ROLE_LISTINGS: JobListing[] = [
  {
    id: "hs-1",
    title: ".NET Developer - IV",
    company: "Radiant Digital",
    logoText: "RD",
    location: "Irving, TX (Hybrid)",
    workModel: "Hybrid",
    domain: "Distributed Systems",
    salary: "US$80/hr",
    matchScore: 94,
    tags: [".NET Core", "C#", "SQL Server", "Microservices", "REST APIs"],
    description: `Description: Max Rate: $80.00/hour
Location: Irving TX, Alpharetta, GA, or Basking Ridge, NJ
Working Model: Hybrid, once a week Full-Stack .NET Developer IV

The work you'll be doing supports mission- and business-critical applications within the Corporate Security organization. Joining the Security Systems team, you will design, build, and maintain software solutions across legal compliance, hazard monitoring, and physical security domains. You will play a key role in protecting company assets and operations through modern full-stack engineering, automated integrations, and robust distributed services.

Key Responsibilities:
• Build high-performance backend APIs using .NET 8 / C#
• Architect relational database schemas, stored procedures, and query index plans
• Collaborate with security architects on encryption, OAuth2, and automated vulnerability scanning
• Write comprehensive automated integration tests and maintain CI/CD pipelines`,
    postedDate: "2 weeks ago",
    isApplied: false,
  },
  {
    id: "hs-2",
    title: "Software Engineer, Android, Level 4",
    company: "Snap Inc.",
    logoText: "SNAP",
    location: "Santa Monica, CA (Hybrid)",
    workModel: "Hybrid",
    domain: "Kernel & Systems",
    salary: "US$183k - US$200k/yr",
    matchScore: 92,
    tags: ["Kotlin", "Android NDK", "Concurrency", "C++", "OpenGL"],
    description: `Snap Inc. is a technology company. We believe the camera presents the greatest opportunity to improve the way people live and communicate.

We are looking for an experienced Software Engineer to join our Camera Platform team. You will work on low-level Android frameworks, camera HAL interfaces, real-time image processing, and memory optimizations for millions of daily active users.

Requirements:
• Strong proficiency in Kotlin, Java, and modern Android architecture
• Experience with multithreaded programming and performance profiling
• Familiarity with Android NDK and camera hardware abstractions`,
    postedDate: "1 week ago",
    isApplied: false,
  },
  {
    id: "hs-3",
    title: "IT Software Engineer - DBA",
    company: "Nelnet",
    logoText: "N",
    location: "Madison, WI (Remote)",
    workModel: "Remote",
    domain: "Database Engines",
    salary: "US$88k - US$158k/yr",
    matchScore: 95,
    tags: ["PostgreSQL", "Query Plans", "Disaster Recovery", "High Availability"],
    description: `Nelnet is seeking an IT Software Engineer - DBA to lead database optimization, replication clusters, and disaster recovery architectures.

You will diagnose query performance bottlenecks, configure automated failovers, and ensure high availability across multi-terabyte transactional database systems.`,
    postedDate: "3 days ago",
    isApplied: false,
  },
  {
    id: "hs-4",
    title: "Silicon Engineer, PhD / Master's Intern",
    company: "Google, Inc.",
    logoText: "G",
    location: "Sunnyvale, CA (On-site)",
    workModel: "On-site",
    domain: "Kernel & Systems",
    salary: "US$188k - US$197k/yr",
    matchScore: 97,
    tags: ["Verilog", "Architecture", "Python", "ASIC Design"],
    description: `Google's Silicon team develops custom chips and hardware accelerators powering Google Cloud and Tensor Processing Units (TPUs).

Join our engineering team to design, simulate, and verify state-of-the-art silicon architectures for machine learning inference.`,
    postedDate: "2 weeks ago",
    isApplied: false,
  },
  {
    id: "hs-5",
    title: "Backend Observability Intern",
    company: "Datadog",
    logoText: "DD",
    location: "New York, NY (Hybrid)",
    workModel: "Hybrid",
    domain: "Cloud & SRE",
    salary: "US$50 - $60/hr",
    matchScore: 98,
    tags: ["Go", "Distributed Tracing", "Kafka", "PostgreSQL"],
    description: `Datadog is the monitoring and security platform for cloud applications.

As a Backend Intern, you will work directly on distributed ingestion pipelines processing trillions of metrics per day, implementing lock-free data structures and custom Go services.`,
    postedDate: "3 days ago",
    isApplied: false,
  },
  {
    id: "hs-6",
    title: "Platform Infrastructure Intern",
    company: "Stripe",
    logoText: "SP",
    location: "San Francisco, CA (Hybrid)",
    workModel: "Hybrid",
    domain: "Distributed Systems",
    salary: "US$55 - $70/hr",
    matchScore: 96,
    tags: ["Go", "Raft", "Distributed Systems", "gRPC"],
    description: `Stripe powers online commerce worldwide. Join our Platform team to build reliable, scalable distributed systems handling billions of dollars in daily transactions with five-nines availability.`,
    postedDate: "5 days ago",
    isApplied: false,
  },
  {
    id: "hs-7",
    title: "Cloud Native Kubernetes Intern",
    company: "ScaleOps",
    logoText: "SO",
    location: "San Francisco, CA (Remote)",
    workModel: "Remote",
    domain: "Distributed Systems",
    salary: "US$45 - $55/hr",
    matchScore: 95,
    tags: ["Kubernetes", "Docker", "Go", "Helm"],
    description: `ScaleOps automates cloud resource allocation in real-time. You'll build Kubernetes custom resource definitions (CRDs), operators, and automated autoscaling controllers.`,
    postedDate: "Yesterday",
    isApplied: false,
  },
  {
    id: "hs-8",
    title: "Analyst / Software Engineering",
    company: "DXC Technology",
    logoText: "DXC",
    location: "Remote (US)",
    workModel: "Remote",
    domain: "Cloud & SRE",
    salary: "US$60k - US$93k/yr",
    matchScore: 90,
    tags: ["Java", "Spring Boot", "Cloud Migration", "Git"],
    description: `DXC Technology helps global companies run mission-critical systems and operations. Work with senior systems analysts on enterprise modernization and cloud migration workflows.`,
    postedDate: "Just now",
    isApplied: false,
  },
];

export const AllJobsTab: React.FC<AllJobsTabProps> = ({
  jobs,
  onApplyJob,
  onNavigateToApplications,
}) => {
  // Combine props jobs with catalog listings
  const allAvailableJobs = [...EXTENDED_ROLE_LISTINGS, ...jobs];

  // Active top sub-nav tab
  const [subTab, setSubTab] = useState<"search" | "saved" | "optimizer">("search");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All"); // All, Full-time, Internship, Part-time
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedJobId, setSelectedJobId] = useState<string>(allAvailableJobs[0].id);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [dismissedIds, setDismissedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const dismissJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedIds((prev) => ({ ...prev, [id]: true }));
  };

  // Filtered list
  const filteredJobs = allAvailableJobs.filter((job) => {
    if (dismissedIds[job.id]) return false;
    if (subTab === "saved" && !bookmarkedIds[job.id]) return false;

    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      selectedType === "All" ||
      (selectedType === "Full-time" && (job.salary.includes("/yr") || job.title.includes("Developer") || job.title.includes("Engineer"))) ||
      (selectedType === "Internship" && (job.salary.includes("/hr") || job.title.toLowerCase().includes("intern")));

    const matchesLocation =
      selectedLocation === "All" ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesQuery && matchesType && matchesLocation;
  });

  const activeJob =
    filteredJobs.find((j) => j.id === selectedJobId) ||
    filteredJobs[0] ||
    allAvailableJobs[0];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs select-none">
      {/* 1. TOP SUB-NAV BAR (Search | Saved | Resume optimizer [New]) */}
      <div className="px-6 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setSubTab("search")}
            className={`py-3.5 relative transition-colors cursor-pointer ${
              subTab === "search"
                ? "text-zinc-950 font-bold"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <span>Search</span>
            {subTab === "search" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00D4BE]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubTab("saved")}
            className={`py-3.5 relative transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === "saved"
                ? "text-zinc-950 font-bold"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <span>Saved</span>
            {Object.values(bookmarkedIds).filter(Boolean).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-zinc-200 text-zinc-800">
                {Object.values(bookmarkedIds).filter(Boolean).length}
              </span>
            )}
            {subTab === "saved" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00D4BE]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubTab("optimizer")}
            className={`py-3.5 relative transition-colors cursor-pointer flex items-center gap-1.5 ${
              subTab === "optimizer"
                ? "text-zinc-950 font-bold"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <span>Resume optimizer</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00D4BE]/20 text-[#075951] border border-[#00D4BE]/40">
              New
            </span>
            {subTab === "optimizer" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00D4BE]" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onNavigateToApplications}
          className="text-xs font-bold text-[#095964] hover:text-[#00D4BE] transition-colors cursor-pointer"
        >
          My Applications Pipeline &rarr;
        </button>
      </div>

      {/* 2. FILTER TOOLBAR (Capsule Search, Location, Pills, Filters) */}
      <div className="p-3.5 sm:px-6 border-b border-zinc-200 bg-white flex flex-wrap items-center gap-2.5 shrink-0">
        {/* Search jobs input capsule */}
        <div className="relative min-w-[220px] flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs"
            className="w-full h-9 pl-3.5 pr-8 rounded-full bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#00D4BE] focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>

        {/* Location Dropdown Pill */}
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="h-9 pl-3.5 pr-7 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none"
          >
            <option value="All">Location</option>
            <option value="Remote">Remote</option>
            <option value="San Francisco">San Francisco, CA</option>
            <option value="New York">New York, NY</option>
            <option value="Irving">Irving, TX</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>

        {/* Full-time job pill */}
        <button
          type="button"
          onClick={() => setSelectedType(selectedType === "Full-time" ? "All" : "Full-time")}
          className={`h-9 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedType === "Full-time"
              ? "bg-[#00D4BE]/15 text-[#075951] border border-[#00D4BE]/40 font-bold"
              : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"
          }`}
        >
          Full-time job
        </button>

        {/* Internship pill */}
        <button
          type="button"
          onClick={() => setSelectedType(selectedType === "Internship" ? "All" : "Internship")}
          className={`h-9 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedType === "Internship"
              ? "bg-[#00D4BE]/15 text-[#075951] border border-[#00D4BE]/40 font-bold"
              : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"
          }`}
        >
          Internship
        </button>

        {/* Part-time pill */}
        <button
          type="button"
          onClick={() => setSelectedType(selectedType === "Part-time" ? "All" : "Part-time")}
          className={`h-9 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedType === "Part-time"
              ? "bg-[#00D4BE]/15 text-[#075951] border border-[#00D4BE]/40 font-bold"
              : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"
          }`}
        >
          Part-time
        </button>

        {/* All Filters button */}
        <button
          type="button"
          onClick={() => {
            setSelectedType("All");
            setSelectedLocation("All");
            setSearchQuery("");
          }}
          className="h-9 px-3.5 rounded-full border border-zinc-200 text-zinc-700 hover:border-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer ml-auto"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
          <span>Filters</span>
        </button>
      </div>

      {/* 3. SPLIT MAIN VIEW (Left: Feed | Right: Sticky Details) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Feed of Job Cards */}
        <div className="w-full md:w-[380px] lg:w-[420px] border-r border-zinc-200 flex flex-col bg-white shrink-0 overflow-hidden">
          {/* Metadata & Sort Row */}
          <div className="p-3 sm:px-4 border-b border-zinc-100 flex items-center justify-between text-xs text-zinc-500 bg-white">
            <span className="font-semibold text-zinc-700">
              {filteredJobs.length > 5 ? "10K+ jobs found" : `${filteredJobs.length} jobs found`}
            </span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-zinc-800">
              <span>Sort by: <strong className="text-zinc-900 font-bold">Most relevant</strong></span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </div>
          </div>

          {/* Cards Scroll Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {filteredJobs.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 text-sm">
                No jobs match your active filters.
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isSelected = activeJob?.id === job.id;
                const isBookmarked = !!bookmarkedIds[job.id];

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`p-4 transition-all cursor-pointer relative group flex gap-3 ${
                      isSelected
                        ? "bg-[#00D4BE]/5 border-l-4 border-l-[#00D4BE]"
                        : "hover:bg-zinc-50/80"
                    }`}
                  >
                    {/* Left: Company Logo Square */}
                    <CompanyLogo name={job.company} size="lg" className="shrink-0" />

                    {/* Middle: Job Information */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">
                        {job.company}
                      </h4>
                      <h3 className="font-bold text-sm text-zinc-900 leading-snug mt-0.5 group-hover:text-[#095964] transition-colors truncate">
                        {job.title}
                      </h3>
                      <p className="text-xs font-semibold text-zinc-700 mt-1">
                        {job.salary} • Full-time
                      </p>

                      {/* Tag Badge (if any) */}
                      {job.id === "hs-3" && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-bold border border-zinc-200">
                          Be an early applicant
                        </span>
                      )}

                      <p className="text-[11px] text-zinc-400 mt-1.5 truncate">
                        {job.location} • {job.postedDate}
                      </p>
                    </div>

                    {/* Top-Right: Bookmark & Dismiss Icons */}
                    <div className="absolute top-3.5 right-3 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(job.id);
                        }}
                        className="p-1 text-zinc-400 hover:text-[#00D4BE] transition-colors cursor-pointer"
                        title="Bookmark job"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isBookmarked ? "fill-[#00D4BE] text-[#00D4BE]" : ""
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => dismissJob(job.id, e)}
                        className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                        title="Dismiss job"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Job Detail View Pane */}
        {activeJob ? (
          <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto">
            {/* Header Area */}
            <div className="p-6 sm:p-8 border-b border-zinc-200 space-y-5">
              <div className="flex items-start gap-4">
                <CompanyLogo name={activeJob.company} size="xl" className="shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-zinc-900 leading-tight">
                    {activeJob.company}
                  </h3>
                  <p className="text-xs text-zinc-500">Internet &amp; Software</p>
                </div>
              </div>

              {/* Title & Posted Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                  {activeJob.title}
                </h1>
                <p className="text-xs text-zinc-500 mt-2">
                  Posted {activeJob.postedDate} • Apply by October 29, 2026 at 7:27 AM
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Save button */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(activeJob.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    bookmarkedIds[activeJob.id]
                      ? "border-[#00D4BE] bg-[#00D4BE]/10 text-[#075951]"
                      : "border-zinc-300 text-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedIds[activeJob.id] ? "fill-[#00D4BE] text-[#00D4BE]" : ""
                    }`}
                  />
                  <span>Save</span>
                </button>

                {/* Share dropdown */}
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Share</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {/* Apply externally / 1-Click Apply */}
                <button
                  type="button"
                  onClick={() => onApplyJob(activeJob)}
                  className="px-6 py-2.5 rounded-full bg-[#051C19] hover:bg-[#0D3E35] active:scale-98 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Apply externally</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {/* More options button */}
                <button
                  type="button"
                  className="p-2 rounded-full border border-zinc-300 text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
                  title="More options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* At a glance Section */}
            <div className="p-6 sm:p-8 border-b border-zinc-200 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                At a glance
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">{activeJob.salary}</span>
                    <span className="text-[11px] text-zinc-500">Hourly rate / compensation</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">{activeJob.location}</span>
                    <span className="text-[11px] text-zinc-500">Work in person for part of the week, from location</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">Job</span>
                    <span className="text-[11px] text-zinc-500">Full-time / Internship</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">Work authorization not required</span>
                    <span className="text-[11px] text-zinc-500">Eligible for all students</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SkillMatch Verified Telemetry (Unique Feature) */}
            <div className="p-6 sm:p-8 border-b border-zinc-200 bg-[#e6fbf7]/50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00D4BE]" />
                  <span className="text-xs font-bold text-[#075951]">SkillMatch AST Compatibility</span>
                </div>
                <p className="text-xs text-zinc-600">Your verified code profile matches {activeJob.matchScore}% of this team&apos;s requirements.</p>
              </div>
              <span className="text-xl font-mono font-black text-[#075951] bg-[#00D4BE]/20 px-3 py-1 rounded-xl border border-[#00D4BE]/40">
                {activeJob.matchScore}%
              </span>
            </div>

            {/* Job Description Area */}
            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                Job Description
              </h2>

              <div className="text-xs sm:text-sm text-zinc-700 whitespace-pre-line leading-relaxed font-normal">
                {activeJob.description}
              </div>

              {/* Skill Tags */}
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Required Competencies &amp; Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
