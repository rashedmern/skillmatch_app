"use client";

import React from "react";
import Link from "next/link";
import { handleAppSignOut } from "@/utils/authClient";
import { BrandLogo } from "@/components/common/BrandLogo";
import { CandidateProfile, CandidateTabType } from "./types";
import {
  Home,
  Briefcase,
  FileCheck2,
  UserCheck,
  LogOut,
  Mail,
  Calendar,
  Users,
  Building2,
  Compass,
  Sparkles,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface CandidateSidebarProps {
  activeTab: CandidateTabType;
  onTabChange: (tab: CandidateTabType) => void;
  profile: CandidateProfile;
  appliedCount: number;
  totalJobsCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({
  activeTab,
  onTabChange,
  profile,
  appliedCount,
  totalJobsCount,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  // Handle Escape key to close mobile drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        onCloseMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const navPrimary = [
    {
      id: "overview" as CandidateTabType,
      label: "Home",
      icon: Home,
      badge: null,
    },
    {
      id: "all-jobs" as CandidateTabType,
      label: "Jobs",
      icon: Briefcase,
      badge: totalJobsCount > 0 ? `${totalJobsCount}` : null,
    },
  ];

  const navNetwork = [
    {
      id: "inbox" as CandidateTabType,
      label: "Inbox",
      icon: Mail,
      badge: "2",
    },
    {
      id: "events" as CandidateTabType,
      label: "Events",
      icon: Calendar,
      badge: null,
    },
    {
      id: "applications" as CandidateTabType,
      label: "Applications",
      icon: FileCheck2,
      badge: appliedCount > 0 ? `${appliedCount}` : null,
    },
    {
      id: "employers" as CandidateTabType,
      label: "Employers",
      icon: Building2,
      badge: null,
    },
    {
      id: "profile" as CandidateTabType,
      label: "Profile",
      icon: UserCheck,
      badge: null,
    },
  ];

  const navStudio = [
    {
      id: "code-studio" as CandidateTabType,
      label: "Code Studio",
      icon: Sparkles,
      hasDot: true,
    },
    {
      id: "overview" as CandidateTabType,
      label: "Showcase",
      icon: Award,
      hasDot: false,
    },
  ];

  const renderNavItem = (item: {
    id: CandidateTabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | null;
    hasDot?: boolean;
  }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.label}
        type="button"
        onClick={() => {
          onTabChange(item.id);
          if (isMobileOpen) onCloseMobile();
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
          isActive
            ? "bg-[#00D4BE]/15 text-[#075951] font-bold border border-[#00D4BE]/30 shadow-xs"
            : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon
            className={`w-4 h-4 shrink-0 transition-colors ${
              isActive ? "text-[#00D4BE]" : "text-zinc-500"
            }`}
          />
          {!isCollapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-1.5 shrink-0">
            {item.hasDot && (
              <span className="w-2 h-2 rounded-full bg-[#00D4BE] shadow-[0_0_6px_#00D4BE]" />
            )}
            {item.badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-[#00D4BE] text-[#051C19]"
                    : "bg-zinc-200 text-zinc-700"
                }`}
              >
                {item.badge}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-white border-r border-zinc-200 select-none">
      {/* Top Header & Brand */}
      <div className="space-y-4">
        <div className="flex items-center justify-between h-10 px-2">
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size="sm" />
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <div className="w-9 h-9 rounded-xl bg-[#095964] text-[#00D4BE] flex items-center justify-center font-bold text-xs shadow-sm">
                SM
              </div>
            </Link>
          )}

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Group 1: Primary Navigation */}
        <div className="space-y-1">
          {navPrimary.map(renderNavItem)}
        </div>

        {/* Divider */}
        <hr className="border-t border-zinc-200" />

        {/* Group 2: Student Network */}
        <div className="space-y-1">
          {navNetwork.map(renderNavItem)}
        </div>

        {/* Divider */}
        <hr className="border-t border-zinc-200" />

        {/* Group 3: Skill Studio & Showcase */}
        <div className="space-y-1">
          {navStudio.map(renderNavItem)}
        </div>
      </div>

      {/* Bottom Profile & Sign Out */}
      <div className="pt-4 border-t border-zinc-200 space-y-3">
        {!isCollapsed ? (
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {profile.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#00D4BE]/60 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#00D4BE]/20 text-[#095964] border border-[#00D4BE]/40 flex items-center justify-center font-bold text-xs shrink-0">
                  {profile.name ? profile.name.slice(0, 2).toUpperCase() : "RA"}
                </div>
              )}
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-zinc-900 truncate">
                  {profile.name || "Rashed"}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">
                  {profile.university || "CSE Student"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAppSignOut("/")}
              title="Sign out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {profile.avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-[#00D4BE]/60 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#00D4BE]/20 text-[#095964] border border-[#00D4BE]/40 flex items-center justify-center font-bold text-xs">
                {profile.name ? profile.name.slice(0, 2).toUpperCase() : "RA"}
              </div>
            )}
            <button
              type="button"
              onClick={() => handleAppSignOut("/")}
              title="Sign out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden md:flex w-full items-center justify-center py-1 text-xs text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[11px]">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block h-screen sticky top-0 transition-all duration-200 z-30 shrink-0 ${
          isCollapsed ? "w-20" : "w-60"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          role="presentation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-200 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
