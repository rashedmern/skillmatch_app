"use client";

import React, { useState } from "react";
import {
  Search,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronDown,
  SlidersHorizontal,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { CompanyLogo } from "@/components/common/CompanyLogo";

interface EventItem {
  id: string;
  title: string;
  organizer: string;
  logoText: string;
  logoBg: string;
  partnerLogos?: string[];
  format: "Virtual" | "In-person" | "Hybrid";
  dateString: string;
  badges: { text: string; bg: string; color: string }[];
  attendeesCount?: number;
  highlightText?: string;
  description: string;
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Building High-Scale Distributed Systems with Go",
    organizer: "Datadog Infrastructure Team",
    logoText: "DD",
    logoBg: "bg-teal-100 text-teal-800",
    format: "Virtual",
    dateString: "Virtual • Mon, 19 Oct • 18:00 +06",
    badges: [
      { text: "HIRING", bg: "bg-[#00D4BE]/15", color: "text-[#075951]" },
      { text: "WORKSHOP", bg: "bg-blue-50", color: "text-blue-700" },
    ],
    attendeesCount: 45,
    description:
      "Join senior distributed systems engineers from Datadog to learn how we process trillions of daily telemetry points with Go routines, channels, and zero-allocation memory pools.",
  },
  {
    id: "evt-2",
    title: "Fall 2026 Systems Engineering Hackathon",
    organizer: "ScaleOps & Stripe Engineering",
    logoText: "SO",
    logoBg: "bg-purple-100 text-purple-800",
    partnerLogos: ["SP", "CF"],
    format: "Virtual",
    dateString: "Virtual • Fri, 24 Oct - Sun, 26 Oct",
    badges: [
      { text: "CAREER FAIR", bg: "bg-purple-50", color: "text-purple-700" },
      { text: "HIRING", bg: "bg-[#00D4BE]/15", color: "text-[#075951]" },
    ],
    attendeesCount: 128,
    description:
      "48-hour student hackathon focusing on cloud-native controllers, distributed consensus, and microservices. $15,000 in prizes and fast-track technical interview invitations.",
  },
  {
    id: "evt-3",
    title: "Google Cloud & Distributed AI Engineering Series",
    organizer: "Google Core Systems",
    logoText: "G",
    logoBg: "bg-red-50 text-red-600",
    format: "Virtual",
    dateString: "Virtual • Wed, 28 Oct • 17:00 +06",
    badges: [
      { text: "EMPLOYER INFO", bg: "bg-blue-50", color: "text-blue-700" },
      { text: "ADVICE", bg: "bg-zinc-100", color: "text-zinc-700" },
    ],
    highlightText: "Event is today!",
    description:
      "Technical deep-dive on Tensor Processing Unit (TPU) hardware clusters, distributed GPU training frameworks, and advice on acing early-career software engineering screens.",
  },
  {
    id: "evt-4",
    title: "PostgreSQL Internals & Query Optimization Masterclass",
    organizer: "CockroachLabs & PostgreSQL Labs",
    logoText: "CR",
    logoBg: "bg-emerald-100 text-emerald-800",
    format: "Virtual",
    dateString: "Virtual • Thu, 29 Oct • 19:00 +06",
    badges: [
      { text: "HIRING", bg: "bg-[#00D4BE]/15", color: "text-[#075951]" },
      { text: "EMPLOYER INFO", bg: "bg-blue-50", color: "text-blue-700" },
    ],
    attendeesCount: 64,
    description:
      "Hands-on masterclass analyzing EXPLAIN query execution plans, B-Tree and GiST index internals, and lock-free concurrency handling under heavy transactional loads.",
  },
  {
    id: "evt-5",
    title: "Cloudflare Edge & WASM Network Systems Workshop",
    organizer: "Cloudflare Engineering",
    logoText: "CF",
    logoBg: "bg-amber-100 text-amber-800",
    format: "Virtual",
    dateString: "Virtual • Mon, 2 Nov • 23:00 +06",
    badges: [
      { text: "HIRING", bg: "bg-[#00D4BE]/15", color: "text-[#075951]" },
      { text: "EMPLOYER INFO", bg: "bg-blue-50", color: "text-blue-700" },
    ],
    attendeesCount: 52,
    description:
      "Learn how Cloudflare Workers run WebAssembly at edge nodes across 300+ global cities with sub-millisecond cold starts and robust memory safety.",
  },
  {
    id: "evt-6",
    title: "Campus Engineering Career Fair - Fall 2026",
    organizer: "50+ Top Tech Teams (Uber, Meta, Stripe)",
    logoText: "CF",
    logoBg: "bg-zinc-900 text-white",
    partnerLogos: ["UB", "ME", "DD"],
    format: "In-person",
    dateString: "In-person • Tue, 10 Nov - Wed, 11 Nov",
    badges: [
      { text: "CAREER FAIR", bg: "bg-purple-50", color: "text-purple-700" },
      { text: "HIRING", bg: "bg-[#00D4BE]/15", color: "text-[#075951]" },
    ],
    attendeesCount: 210,
    description:
      "Connect in person with engineering leads and managers hiring software engineering, backend systems, database, and cloud infrastructure interns for Summer 2026.",
  },
];

interface CandidateEventsTabProps {
  onTriggerToast: (msg: string) => void;
}

export const CandidateEventsTab: React.FC<CandidateEventsTabProps> = ({
  onTriggerToast,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [selectedEmployer, setSelectedEmployer] = useState<string>("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({});
  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "saved" | "registered" | "checkins">("all");
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds((prev) => {
      const next = !prev[id];
      onTriggerToast(next ? `Saved '${title}' to events!` : `Removed '${title}' from saved events.`);
      return { ...prev, [id]: next };
    });
  };

  const toggleRegister = (id: string, title: string) => {
    setRegisteredIds((prev) => {
      const next = !prev[id];
      onTriggerToast(next ? `Registered for '${title}'! Ticket confirmed.` : `Cancelled registration for '${title}'.`);
      return { ...prev, [id]: next };
    });
  };

  const savedCount = Object.values(bookmarkedIds).filter(Boolean).length;
  const registeredCount = Object.values(registeredIds).filter(Boolean).length;

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    if (activeFilterTab === "saved" && !bookmarkedIds[evt.id]) return false;
    if (activeFilterTab === "registered" && !registeredIds[evt.id]) return false;

    const matchesQuery =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMedium =
      selectedMedium === "All" || evt.format === selectedMedium;

    const matchesEmployer =
      selectedEmployer === "All" ||
      evt.organizer.toLowerCase().includes(selectedEmployer.toLowerCase());

    return matchesQuery && matchesMedium && matchesEmployer;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* 1. TOP SEARCH & QUICK METRICS ROW (Exact Handshake Layout) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Search & Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search events capsule */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events"
              className="w-full h-10 pl-4 pr-10 rounded-full bg-white border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#00D4BE] shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Medium Dropdown Pill */}
          <div className="relative">
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="h-10 pl-3.5 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">Medium</option>
              <option value="Virtual">Virtual</option>
              <option value="In-person">In-person</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Date Dropdown Pill */}
          <div className="relative">
            <select
              className="h-10 pl-3.5 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">Date</option>
              <option value="Today">Today</option>
              <option value="This week">This week</option>
              <option value="This month">This month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Employer Dropdown Pill */}
          <div className="relative">
            <select
              value={selectedEmployer}
              onChange={(e) => setSelectedEmployer(e.target.value)}
              className="h-10 pl-3.5 pr-8 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:outline-none focus:border-[#00D4BE] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">Employer</option>
              <option value="Datadog">Datadog</option>
              <option value="Stripe">Stripe</option>
              <option value="Google">Google</option>
              <option value="Cloudflare">Cloudflare</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Sliders Filter Button */}
          <button
            type="button"
            onClick={() => {
              setSelectedMedium("All");
              setSelectedEmployer("All");
              setSearchQuery("");
              setActiveFilterTab("all");
            }}
            className="h-10 px-3.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
            title="Reset filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Quick Action Pill Metrics (Saved · 0 | Registered · 0 | Check-Ins · 0) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Saved */}
          <button
            type="button"
            onClick={() => setActiveFilterTab(activeFilterTab === "saved" ? "all" : "saved")}
            className={`h-10 px-4 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              activeFilterTab === "saved"
                ? "bg-[#00D4BE]/15 border-[#00D4BE]/40 text-[#075951] font-bold"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved · {savedCount}</span>
          </button>

          {/* Registered */}
          <button
            type="button"
            onClick={() => setActiveFilterTab(activeFilterTab === "registered" ? "all" : "registered")}
            className={`h-10 px-4 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              activeFilterTab === "registered"
                ? "bg-[#00D4BE]/15 border-[#00D4BE]/40 text-[#075951] font-bold"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Registered · {registeredCount}</span>
          </button>

          {/* Check-Ins */}
          <button
            type="button"
            onClick={() => onTriggerToast("No event check-ins recorded yet.")}
            className="h-10 px-4 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check-Ins · 0</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION TITLE */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
          All events
        </h1>
      </div>

      {/* 3. 3-COLUMN CARDS GRID (Exact Handshake Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-zinc-200 text-zinc-400 text-sm">
            No events match your current filter criteria.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isBookmarked = !!bookmarkedIds[evt.id];
            const isRegistered = !!registeredIds[evt.id];

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEventModal(evt)}
                className="group relative bg-white border border-zinc-200/90 hover:border-[#00D4BE]/60 rounded-2xl p-5 hover:shadow-[0_8px_25px_rgba(0,212,190,0.12)] transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top Row: Organizer Logo + Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Logo or Multi-Avatar */}
                      {evt.partnerLogos && evt.partnerLogos.length > 0 ? (
                        <div className="flex -space-x-1.5 shrink-0">
                          <CompanyLogo name={evt.organizer} size="xs" className="border-2 border-white rounded-full" />
                          {evt.partnerLogos.map((p, i) => (
                            <CompanyLogo key={i} name={p} size="xs" className="border-2 border-white rounded-full" />
                          ))}
                        </div>
                      ) : (
                        <CompanyLogo name={evt.organizer} size="md" className="shrink-0" />
                      )}

                      <span className="text-xs font-semibold text-zinc-500 truncate">
                        {evt.organizer}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(evt.id, evt.title);
                      }}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-[#00D4BE] transition-colors cursor-pointer shrink-0"
                      title="Bookmark event"
                    >
                      <Bookmark
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isBookmarked ? "fill-[#00D4BE] text-[#00D4BE]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Date */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-zinc-900 group-hover:text-[#095964] transition-colors line-clamp-2 leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {evt.dateString}
                    </p>
                  </div>

                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evt.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase ${b.bg} ${b.color}`}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Attendees / Status & Register Action */}
                <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  {evt.attendeesCount ? (
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1 shrink-0">
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold border border-white">
                          R
                        </span>
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold border border-white">
                          A
                        </span>
                      </div>
                      <span className="text-xs font-medium text-zinc-600">
                        {evt.attendeesCount} students going
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600">
                      {evt.highlightText || "Registration open"}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRegister(evt.id, evt.title);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isRegistered
                        ? "bg-[#00D4BE] text-[#051C19]"
                        : "bg-zinc-100 text-zinc-800 hover:bg-[#00D4BE]/20 hover:text-[#075951]"
                    }`}
                  >
                    {isRegistered ? "Registered ✓" : "RSVP"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. EVENT DETAILS MODAL (When card is clicked) */}
      {selectedEventModal && (
        <div
          role="presentation"
          onClick={() => setSelectedEventModal(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-zinc-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <CompanyLogo name={selectedEventModal.organizer} size="lg" className="shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">{selectedEventModal.organizer}</h3>
                  <span className="text-xs text-zinc-500">{selectedEventModal.format} Session</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 leading-snug">
                {selectedEventModal.title}
              </h2>
              <p className="text-xs font-semibold text-zinc-500 mt-1">
                {selectedEventModal.dateString}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {selectedEventModal.description}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  toggleBookmark(selectedEventModal.id, selectedEventModal.title);
                }}
                className="px-4 py-2 rounded-full border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
              >
                {bookmarkedIds[selectedEventModal.id] ? "Saved ✓" : "Save Event"}
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleRegister(selectedEventModal.id, selectedEventModal.title);
                  setSelectedEventModal(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#00D4BE] hover:bg-[#00bda8] text-[#051C19] font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                {registeredIds[selectedEventModal.id] ? "Registered ✓" : "Confirm RSVP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
