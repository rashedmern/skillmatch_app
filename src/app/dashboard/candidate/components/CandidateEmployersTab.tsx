"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Users,
  Building2,
  Landmark,
  ChevronDown,
  Check,
  Plus,
  SlidersHorizontal,
  X,
  ExternalLink,
  Briefcase,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Globe,
} from "lucide-react";
import { JobListing } from "./types";
import { CompanyLogo } from "@/components/common/CompanyLogo";

export interface EmployerItem {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  logoTextColor?: string;
  logoSubtext?: string;
  industry: string;
  followersCount: number; // e.g. 81900
  followersFormatted: string; // "81.9k followers"
  location: string;
  addressSnippet?: string;
  size: "1,000 - 5,000" | "5,000 - 10,000" | "10,000 - 25,000" | "25,000+";
  orgType: "Public" | "Private" | "Government";
  website: string;
  about: string;
  earlyCareerPerks: string[];
  openRolesCount: number;
}

const INITIAL_EMPLOYERS: EmployerItem[] = [
  {
    id: "emp-jnj",
    name: "Johnson & Johnson",
    logoText: "J&J",
    logoBg: "bg-[#D51900]",
    logoTextColor: "text-white",
    industry: "Healthcare",
    followersCount: 81900,
    followersFormatted: "81.9k followers",
    location: "New Brunswick, NJ",
    addressSnippet: "One Johnson & Johnson Plaza, New Brunswick, NJ",
    size: "25,000+",
    orgType: "Public",
    website: "https://www.jnj.com",
    about:
      "At Johnson & Johnson, we believe health is everything. Our strength in healthcare innovation empowers us to build a world where complex diseases are prevented, treated, and cured. We offer rotational engineering leadership programs and cutting-edge software development roles in medical robotics, telemetry, and health tech.",
    earlyCareerPerks: [
      "Technology Leadership Development Program (TLDP)",
      "Dedicated Senior Mentorship & Rotations",
      "Comprehensive Health & Tuition Reimbursement",
    ],
    openRolesCount: 14,
  },
  {
    id: "emp-granite",
    name: "Granite",
    logoText: "GRANITE",
    logoBg: "bg-[#1E3A2F]",
    logoTextColor: "text-emerald-100",
    industry: "Construction",
    followersCount: 12300,
    followersFormatted: "12.3k followers",
    location: "585 West Beach Street, Watsonville, Calif...",
    addressSnippet: "585 West Beach Street, Watsonville, California 95076",
    size: "5,000 - 10,000",
    orgType: "Public",
    website: "https://www.graniteconstruction.com",
    about:
      "Granite is America's infrastructure company. An industry leader in safety and an award-winning workplace, Granite solves complex infrastructure challenges through sustainable solutions, modern telemetry, civil analytics, and autonomous jobsite engineering.",
    earlyCareerPerks: [
      "Field Engineering & Systems Rotations",
      "Hands-on Technology Apprenticeship",
      "Full 401(k) Match & Stock Purchase Program",
    ],
    openRolesCount: 6,
  },
  {
    id: "emp-uscg",
    name: "U.S. Coast Guard",
    logoText: "USCG",
    logoBg: "bg-[#0B2545]",
    logoTextColor: "text-amber-300",
    industry: "Government - Local, State & Federal",
    followersCount: 18600,
    followersFormatted: "18.6k followers",
    location: "2703 Martin Luther King Jr Avenue SE, Wa...",
    addressSnippet: "2703 Martin Luther King Jr Avenue SE, Washington, DC 20593",
    size: "25,000+",
    orgType: "Government",
    website: "https://www.gocoastguard.com",
    about:
      "The United States Coast Guard is a unique branch of the military responsible for maritime safety, security, and environmental stewardship. Coast Guard Cyber and C5I (Command, Control, Communications, Computers, Cyber and Intelligence) design mission-critical distributed systems and secure communication networks.",
    earlyCareerPerks: [
      "100% Tuition Assistance & GI Bill",
      "Top Secret Security Clearance Sponsorship",
      "Specialized Cyber Defense & Systems Training",
    ],
    openRolesCount: 9,
  },
  {
    id: "emp-kindercare",
    name: "KinderCare Learning Companies",
    logoText: "KC",
    logoBg: "bg-[#059669]",
    logoTextColor: "text-white",
    industry: "Other Education",
    followersCount: 3960,
    followersFormatted: "3.96k followers",
    location: "5005 Meadows Road, Suite 200 Lake Oswego...",
    addressSnippet: "5005 Meadows Road, Suite 200 Lake Oswego, Oregon 97035",
    size: "25,000+",
    orgType: "Private",
    website: "https://www.kindercare.com",
    about:
      "KinderCare Learning Companies is the largest private provider of early childhood education and care in the United States. Our engineering organization builds modern digital family portals, mobile attendance tracking apps, and cloud operations supporting thousands of early education centers nationwide.",
    earlyCareerPerks: [
      "Generous Childcare Tuition Discounts",
      "Flexible Remote/Hybrid Software Engineering Roles",
      "Wellness & Continuing Education Stipends",
    ],
    openRolesCount: 4,
  },
  {
    id: "emp-caltrans",
    name: "Caltrans HQ",
    logoText: "Caltrans",
    logoBg: "bg-[#0284C7]",
    logoTextColor: "text-white",
    industry: "Transportation & Logistics",
    followersCount: 14300,
    followersFormatted: "14.3k followers",
    location: "Sacramento, CA",
    addressSnippet: "1120 N Street, Sacramento, CA 95814",
    size: "10,000 - 25,000",
    orgType: "Government",
    website: "https://dot.ca.gov",
    about:
      "The California Department of Transportation (Caltrans) manages more than 50,000 miles of California highway and freeway lanes. Caltrans IT and Intelligent Transportation Systems (ITS) teams deploy IoT traffic sensors, high-throughput road telemetry, and automated transit dispatching systems.",
    earlyCareerPerks: [
      "California State Civil Service Pension & Benefits",
      "Student Assistant & Junior Engineer Programs",
      "Predictable Work-Life Balance with Hybrid Options",
    ],
    openRolesCount: 8,
  },
  {
    id: "emp-uncommon",
    name: "Uncommon Schools",
    logoText: "UN",
    logoBg: "bg-[#D97706]",
    logoTextColor: "text-white",
    industry: "Primary and Secondary Education",
    followersCount: 7940,
    followersFormatted: "7.94k followers",
    location: "New York, NY",
    addressSnippet: "826 Broadway, 9th Floor, New York, NY 10003",
    size: "1,000 - 5,000",
    orgType: "Public",
    website: "https://www.uncommonschools.org",
    about:
      "Uncommon Schools is a nonprofit network of high-performing public charter schools closing the opportunity gap and preparing students from historically underserved communities for college success. Our technology group builds real-time educational analytics and classroom platforms.",
    earlyCareerPerks: [
      "Summer Technology Fellows Program",
      "1-on-1 Executive Coaching & Peer Cohorts",
      "Full Medical, Dental, and Transit Subsidies",
    ],
    openRolesCount: 3,
  },
  {
    id: "emp-uline",
    name: "Uline",
    logoText: "ULINE",
    logoBg: "bg-[#0F172A]",
    logoTextColor: "text-white",
    industry: "Wholesale Trade",
    followersCount: 12200,
    followersFormatted: "12.2k followers",
    location: "Pleasant Prairie, WI",
    addressSnippet: "12575 Uline Drive, Pleasant Prairie, WI 53158",
    size: "5,000 - 10,000",
    orgType: "Private",
    website: "https://www.uline.com",
    about:
      "Uline, a family-owned business, is the leading distributor of shipping, industrial, and packaging materials to businesses throughout North America. Uline's Enterprise IT division builds high-availability distribution supply-chain software, automated warehouse routing algorithms, and high-volume e-commerce engines.",
    earlyCareerPerks: [
      "Industry-Leading Starting Salaries & Annual Bonuses",
      "State-of-the-Art Corporate Campus & Fitness Centers",
      "Comprehensive On-Site IT Apprenticeships",
    ],
    openRolesCount: 11,
  },
  {
    id: "emp-nestle",
    name: "Nestlé Purina",
    logoText: "PURINA",
    logoBg: "bg-[#BE123C]",
    logoTextColor: "text-white",
    industry: "CPG - Consumer Packaged Goods",
    followersCount: 5260,
    followersFormatted: "5.26k followers",
    location: "St. Louis, MO",
    addressSnippet: "Checkerboard Square, St. Louis, MO 63164",
    size: "10,000 - 25,000",
    orgType: "Public",
    website: "https://www.purinajobs.com",
    about:
      "Nestlé Purina PetCare promotes responsible pet care and scientific innovations in animal nutrition. Purina's Digital Technology teams design predictive manufacturing pipelines, IoT connected pet devices, and global supply logistics microservices.",
    earlyCareerPerks: [
      "Pet-Friendly Office Campuses",
      "Rotational Technical Development Program",
      "Parental Leave & Global Relocation Assistance",
    ],
    openRolesCount: 7,
  },
  {
    id: "emp-datadog",
    name: "Datadog",
    logoText: "DD",
    logoBg: "bg-[#6366F1]",
    logoTextColor: "text-white",
    industry: "Internet & Software",
    followersCount: 142000,
    followersFormatted: "142k followers",
    location: "New York, NY",
    addressSnippet: "620 8th Avenue, 45th Floor, New York, NY 10018",
    size: "5,000 - 10,000",
    orgType: "Public",
    website: "https://www.datadoghq.com",
    about:
      "Datadog is the monitoring and security platform for cloud applications. We bring together end-to-end traces, metrics, and logs to make applications, infrastructure, and third-party services entirely observable. Our engineers build systems processing trillions of daily events in Go, C++, and Kafka.",
    earlyCareerPerks: [
      "Direct code pushes to production in week 1",
      "1:1 Staff Engineer Mentorship Program",
      "Competitive Equity (RSUs) & Relocation Support",
    ],
    openRolesCount: 18,
  },
  {
    id: "emp-stripe",
    name: "Stripe",
    logoText: "S",
    logoBg: "bg-[#4F46E5]",
    logoTextColor: "text-white",
    industry: "Financial Infrastructure",
    followersCount: 198000,
    followersFormatted: "198k followers",
    location: "South San Francisco, CA",
    addressSnippet: "354 Oyster Point Blvd, South San Francisco, CA 94080",
    size: "5,000 - 10,000",
    orgType: "Private",
    website: "https://www.stripe.com",
    about:
      "Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world's largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.",
    earlyCareerPerks: [
      "High Engineering Autonomy & Systems Depth",
      "Generous Remote Workspace & Learning Stipend",
      "Intern-to-New-Grad Conversion Rate > 85%",
    ],
    openRolesCount: 22,
  },
  {
    id: "emp-scaleops",
    name: "ScaleOps",
    logoText: "SO",
    logoBg: "bg-[#0F766E]",
    logoTextColor: "text-[#00D4BE]",
    industry: "Internet & Software",
    followersCount: 28400,
    followersFormatted: "28.4k followers",
    location: "San Francisco, CA",
    addressSnippet: "Market Street, Suite 400, San Francisco, CA 94105",
    size: "1,000 - 5,000",
    orgType: "Private",
    website: "https://www.scaleops.com",
    about:
      "ScaleOps develops autonomous cloud resource management and Kubernetes optimization engines. We build automated real-time workload rightsizing, node provisioning, and container elasticity platforms in Go and Rust.",
    earlyCareerPerks: [
      "Open-Source Kubernetes Contributions",
      "Fast-Track Growth in Series-B Unicorn",
      "Daily Catered Lunches & Full Health Coverage",
    ],
    openRolesCount: 5,
  },
  {
    id: "emp-cloudflare",
    name: "Cloudflare",
    logoText: "CF",
    logoBg: "bg-[#EA580C]",
    logoTextColor: "text-white",
    industry: "Internet & Software",
    followersCount: 89200,
    followersFormatted: "89.2k followers",
    location: "San Francisco, CA",
    addressSnippet: "101 Townsend St, San Francisco, CA 94107",
    size: "1,000 - 5,000",
    orgType: "Public",
    website: "https://www.cloudflare.com",
    about:
      "Cloudflare's mission is to help build a better Internet. We protect and accelerate millions of web properties worldwide with anycast routing, edge computing with Workers, DDoS mitigation, and modern cryptography.",
    earlyCareerPerks: [
      "Summer Systems Internship Program (Rust/Go/C)",
      "Patent Incentive Program for Student Interns",
      "Extensive Global Engineering Network",
    ],
    openRolesCount: 12,
  },
];

interface CandidateEmployersTabProps {
  onTriggerToast: (msg: string) => void;
  onNavigateToJobs?: (employerName?: string) => void;
}

export const CandidateEmployersTab: React.FC<CandidateEmployersTabProps> = ({
  onTriggerToast,
  onNavigateToJobs,
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [showFollowingOnly, setShowFollowingOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedOrgType, setSelectedOrgType] = useState<string>("All");

  // Modal filters state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Followed state tracking (initialized with J&J followed as demonstration)
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    "emp-jnj": true,
  });

  // Selected Employer Detail Drawer
  const [selectedEmployer, setSelectedEmployer] = useState<EmployerItem | null>(null);

  // Toggle follow status
  const handleToggleFollow = (e: React.MouseEvent, emp: EmployerItem) => {
    e.stopPropagation();
    const isCurrentlyFollowing = !!followingMap[emp.id];
    const newStatus = !isCurrentlyFollowing;

    setFollowingMap((prev) => ({
      ...prev,
      [emp.id]: newStatus,
    }));

    if (newStatus) {
      onTriggerToast(`Following ${emp.name}! You will receive notifications about new job openings.`);
    } else {
      onTriggerToast(`Unfollowed ${emp.name}.`);
    }
  };

  // Distinct Filter Options
  const locationOptions = useMemo(() => {
    const set = new Set<string>();
    INITIAL_EMPLOYERS.forEach((e) => {
      // Pick primary city/state
      const parts = e.location.split(",");
      if (parts.length >= 2) {
        set.add(parts.slice(-2).join(",").trim().replace("...", ""));
      } else {
        set.add(e.location);
      }
    });
    return Array.from(set);
  }, []);

  const industryOptions = useMemo(() => {
    const set = new Set<string>();
    INITIAL_EMPLOYERS.forEach((e) => set.add(e.industry));
    return Array.from(set);
  }, []);

  const sizeOptions = ["1,000 - 5,000", "5,000 - 10,000", "10,000 - 25,000", "25,000+"];

  // Filtered Employers List
  const filteredEmployers = useMemo(() => {
    return INITIAL_EMPLOYERS.filter((emp) => {
      // 1. Followed filter
      if (showFollowingOnly && !followingMap[emp.id]) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = emp.name.toLowerCase().includes(query);
        const matchesIndustry = emp.industry.toLowerCase().includes(query);
        const matchesLocation = emp.location.toLowerCase().includes(query);
        const matchesAbout = emp.about.toLowerCase().includes(query);
        if (!matchesName && !matchesIndustry && !matchesLocation && !matchesAbout) {
          return false;
        }
      }

      // 3. Location filter
      if (selectedLocation !== "All" && !emp.location.includes(selectedLocation)) {
        return false;
      }

      // 4. Industry filter
      if (selectedIndustry !== "All" && emp.industry !== selectedIndustry) {
        return false;
      }

      // 5. Size filter
      if (selectedSize !== "All" && emp.size !== selectedSize) {
        return false;
      }

      // 6. Org Type filter
      if (selectedOrgType !== "All" && emp.orgType !== selectedOrgType) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    showFollowingOnly,
    selectedLocation,
    selectedIndustry,
    selectedSize,
    selectedOrgType,
    followingMap,
  ]);

  const followedCount = Object.values(followingMap).filter(Boolean).length;
  const isAnyFilterActive =
    searchQuery !== "" ||
    showFollowingOnly ||
    selectedLocation !== "All" ||
    selectedIndustry !== "All" ||
    selectedSize !== "All" ||
    selectedOrgType !== "All";

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setShowFollowingOnly(false);
    setSelectedLocation("All");
    setSelectedIndustry("All");
    setSelectedSize("All");
    setSelectedOrgType("All");
    onTriggerToast("All filters have been reset.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 select-none pb-16">
      {/* 1. SECTION TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Employers
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Discover verified companies, follow engineering teams, and receive updates when new internships drop.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="font-semibold text-zinc-800">{filteredEmployers.length}</span> employers found
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search input pill */}
        <div className="relative min-w-[220px] sm:min-w-[280px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-10 pl-4 pr-10 rounded-full bg-white border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#00D4BE] shadow-2xs transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          )}
        </div>

        {/* Filter Pill 1: Employers you follow */}
        <button
          type="button"
          onClick={() => {
            const next = !showFollowingOnly;
            setShowFollowingOnly(next);
            if (next && followedCount === 0) {
              onTriggerToast("You are not following any employers yet. Click 'Follow' on any company below.");
            }
          }}
          className={`h-10 px-4 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer shadow-2xs ${
            showFollowingOnly
              ? "bg-[#00D4BE]/15 text-[#075951] border-[#00D4BE] font-bold"
              : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <span>Employers you follow</span>
          {followedCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                showFollowingOnly
                  ? "bg-[#00D4BE] text-[#051C19]"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {followedCount}
            </span>
          )}
        </button>

        {/* Filter Pill 2: Location dropdown */}
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="h-10 pl-4 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
          >
            <option value="All">Location</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>

        {/* Filter Pill 3: Industry dropdown */}
        <div className="relative">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-10 pl-4 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
          >
            <option value="All">Industry</option>
            {industryOptions.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>

        {/* Filter Pill 4: Employer size dropdown */}
        <div className="relative">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="h-10 pl-4 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
          >
            <option value="All">Employer size</option>
            {sizeOptions.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>

        {/* Filter Pill 5: + Filters (Advanced modal) */}
        <button
          type="button"
          onClick={() => setIsFilterModalOpen(true)}
          className="h-10 px-4 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 hover:text-zinc-950 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Filters</span>
          {selectedOrgType !== "All" && (
            <span className="w-2 h-2 rounded-full bg-[#00D4BE]" />
          )}
        </button>

        {/* Clear Filters Button if any active */}
        {isAnyFilterActive && (
          <button
            type="button"
            onClick={handleClearAllFilters}
            className="h-10 px-3.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 cursor-pointer underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* 3. EMPLOYER LIST VIEW */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs divide-y divide-zinc-200/80 overflow-hidden">
        {filteredEmployers.length > 0 ? (
          filteredEmployers.map((emp) => {
            const isFollowing = !!followingMap[emp.id];

            return (
              <div
                key={emp.id}
                onClick={() => setSelectedEmployer(emp)}
                className="p-5 sm:p-6 hover:bg-zinc-50/70 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left Side: Logo & Details */}
                <div className="flex items-start gap-4 min-w-0">
                  {/* Employer Logo Square */}
                  <CompanyLogo name={emp.name} size="xl" className="shrink-0" />

                  {/* Employer Meta Column */}
                  <div className="space-y-1.5 min-w-0">
                    {/* Line 1: Employer Name */}
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#095964] transition-colors truncate">
                        {emp.name}
                      </h2>
                    </div>

                    {/* Line 2: Industry • followers */}
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                      <span>{emp.industry}</span>
                      <span className="text-zinc-400">•</span>
                      <span>
                        {isFollowing
                          ? `${(emp.followersCount + 1).toLocaleString()} followers`
                          : emp.followersFormatted}
                      </span>
                    </div>

                    {/* Line 3: Location | Size | Org Type */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 pt-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate max-w-[220px] sm:max-w-[320px]">
                          {emp.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{emp.size}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Landmark className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{emp.orgType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Follow / Following Button */}
                <div className="flex items-center justify-end sm:shrink-0 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleFollow(e, emp)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 min-w-[96px] ${
                      isFollowing
                        ? "bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-zinc-200"
                        : "bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 active:scale-98"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00D4BE]" />
                        <span>Following</span>
                      </>
                    ) : (
                      <span>Follow</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-zinc-900 text-base">No employers match your criteria</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try broadening your search keyword or clearing selected location, size, or industry filters.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="px-4 py-2 rounded-full bg-[#00D4BE] text-[#051C19] text-xs font-bold hover:bg-[#00bda8] transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* 4. PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3 text-xs text-zinc-500">
        <div>
          Showing <span className="font-semibold text-zinc-900">1</span> -{" "}
          <span className="font-semibold text-zinc-900">{filteredEmployers.length}</span> of{" "}
          <span className="font-semibold text-zinc-900">{INITIAL_EMPLOYERS.length}</span> employers
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="px-3.5 py-1.5 rounded-lg border border-zinc-200 text-zinc-400 text-xs font-semibold cursor-not-allowed bg-zinc-50"
          >
            Previous
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-[#095964] text-white text-xs font-bold flex items-center justify-center shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast("Page 2 is not needed with current dataset.")}
            className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-semibold flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast("Next page")}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-semibold cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* 5. ADVANCED FILTER MODAL */}
      {isFilterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00D4BE]" />
                <h3 className="font-bold text-base text-zinc-900">Filter Employers</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Institution / Org Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Organization Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["All", "Public", "Private", "Government"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedOrgType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                        selectedOrgType === type
                          ? "bg-[#00D4BE]/15 text-[#075951] border-[#00D4BE] font-bold"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Employer Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Employer Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["All", ...sizeOptions].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                        selectedSize === sz
                          ? "bg-[#00D4BE]/15 text-[#075951] border-[#00D4BE] font-bold"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Early Career & Internship Focus */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-900 leading-relaxed">
                  <span className="font-bold">Early-Career Guarantee:</span> All listed employers actively recruit undergraduate interns and recent graduates for software and systems engineering roles.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                Reset all
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#095964] text-white text-xs font-bold hover:bg-[#074750] transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. EMPLOYER DETAIL SLIDE-OVER DRAWER / MODAL */}
      {selectedEmployer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs"
        >
          {/* Backdrop Click */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedEmployer(null)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header Banner */}
            <div className="h-32 bg-gradient-to-r from-[#051C19] via-[#095964] to-[#0D3E35] relative p-6 flex items-start justify-between">
              <button
                type="button"
                onClick={() => setSelectedEmployer(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Header Content with Overlapping Logo */}
            <div className="px-6 pb-4 pt-0 border-b border-zinc-100 relative">
              <div className="flex items-end justify-between -mt-10 mb-3">
                <CompanyLogo
                  name={selectedEmployer.name}
                  size="2xl"
                  className="shrink-0 border-4 border-white shadow-md"
                />

                {/* Follow Button inside Drawer */}
                <button
                  type="button"
                  onClick={(e) => handleToggleFollow(e, selectedEmployer)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    followingMap[selectedEmployer.id]
                      ? "bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-zinc-200"
                      : "bg-[#095964] text-white hover:bg-[#074750] shadow-sm"
                  }`}
                >
                  {followingMap[selectedEmployer.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00D4BE]" />
                      <span>Following</span>
                    </>
                  ) : (
                    <span>Follow</span>
                  )}
                </button>
              </div>

              <div>
                <h2 className="text-xl font-black text-zinc-900">
                  {selectedEmployer.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mt-1">
                  <span>{selectedEmployer.industry}</span>
                  <span>•</span>
                  <span>
                    {followingMap[selectedEmployer.id]
                      ? `${(selectedEmployer.followersCount + 1).toLocaleString()} followers`
                      : selectedEmployer.followersFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Details Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200/70">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Location</span>
                  <p className="font-semibold text-zinc-800 mt-0.5">{selectedEmployer.location}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Employer Size</span>
                  <p className="font-semibold text-zinc-800 mt-0.5">{selectedEmployer.size}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Organization Type</span>
                  <p className="font-semibold text-zinc-800 mt-0.5">{selectedEmployer.orgType}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Official Website</span>
                  <a
                    href={selectedEmployer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-[#095964] hover:text-[#00D4BE] mt-0.5"
                  >
                    <span>Visit website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* About Employer */}
              <div className="space-y-2">
                <h3 className="font-bold text-zinc-900 text-sm">About {selectedEmployer.name}</h3>
                <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm">
                  {selectedEmployer.about}
                </p>
              </div>

              {/* Early-Career Programs */}
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-900 text-sm">Student &amp; Early-Career Highlights</h3>
                <div className="space-y-2">
                  {selectedEmployer.earlyCareerPerks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-[#00D4BE] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Roles Preview Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-teal-950 text-sm">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <span>{selectedEmployer.openRolesCount} Open Engineering Roles</span>
                  </div>
                  <p className="text-[11px] text-teal-700 mt-0.5">
                    Internships &amp; Full-Time early-career roles open for applications
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEmployer(null);
                    if (onNavigateToJobs) {
                      onNavigateToJobs(selectedEmployer.name);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#095964] hover:bg-[#074750] text-white font-bold text-xs shadow-xs cursor-pointer transition-colors shrink-0"
                >
                  View Roles
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                Verified SkillMatch Employer Network
              </span>
              <button
                type="button"
                onClick={() => setSelectedEmployer(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-200 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
