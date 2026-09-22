"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import { CandidateProfile, CandidateTabType } from "./types";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  UserCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
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
  const navItems = [
    {
      id: "overview" as CandidateTabType,
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "all-jobs" as CandidateTabType,
      label: "All Jobs",
      icon: Briefcase,
      badge: totalJobsCount > 0 ? `${totalJobsCount}` : null,
      badgeColor: "bg-secondary-mint/15 text-secondary-mint border-secondary-mint/30",
    },
    {
      id: "applications" as CandidateTabType,
      label: "My Applications",
      icon: FileCheck2,
      badge: appliedCount > 0 ? `${appliedCount}` : null,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
    },
    {
      id: "profile" as CandidateTabType,
      label: "Profile Setup",
      icon: UserCheck,
      badge: "ABET",
      badgeColor: "bg-secondary-container/20 text-secondary-container border-secondary-container/30",
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-white border-r border-stroke-card selection:bg-secondary/20 select-none">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between h-12">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <BrandLogo size="sm" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-sm mx-auto">
              SM
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            id="sidebar-toggle-btn"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-all"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Telemetry Pill */}
        {!isCollapsed && (
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-on-surface">
              <span className="flex items-center gap-1.5">
                <StatusDot size="sm" />
                <span>Verified .edu Identity</span>
              </span>
              <span className="font-mono text-secondary-mint">ABET</span>
            </div>
            <p className="text-[10px] text-outline truncate">{profile.university}</p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1.5" aria-label="Candidate Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                id={`candidate-nav-${item.id}`}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                  isActive
                    ? "bg-primary-container text-white shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-secondary-container" : "text-outline group-hover:text-primary"
                  }`}
                />

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : item.badgeColor || "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Sign Out Section */}
      <div className="pt-4 border-t border-stroke-card space-y-3">
        {/* Test Recruiter Route Link */}
        {!isCollapsed ? (
          <Link
            href="/dashboard/recruiter"
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-slate-200 text-[11px] font-medium text-outline hover:text-on-surface hover:bg-surface-container-low transition-all"
            title="Tests role-based middleware security block"
          >
            <Building2 className="w-3 h-3 text-outline" />
            <span className="truncate">Switch to Recruiter View</span>
          </Link>
        ) : (
          <Link
            href="/dashboard/recruiter"
            className="w-full flex justify-center py-2 text-outline hover:text-on-surface"
            title="Switch to Recruiter View"
          >
            <Building2 className="w-4 h-4" />
          </Link>
        )}

        {/* User Profile Card */}
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-surface border border-stroke-card ${
            isCollapsed ? "justify-center p-1.5" : ""
          }`}
        >
          {profile.avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-9 h-9 rounded-xl object-cover shrink-0 border border-secondary-mint/40"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-primary-container text-secondary-container font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
              AC
            </div>
          )}

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-on-surface truncate flex items-center gap-1">
                <span>{profile.name}</span>
                <ShieldCheck className="w-3 h-3 text-secondary-mint shrink-0" />
              </div>
              <div className="text-[10px] text-outline font-mono truncate">{profile.email}</div>
            </div>
          )}

          {!isCollapsed && (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label="Sign Out"
              title="Sign Out"
              className="text-outline hover:text-accent-gap p-1.5 rounded-lg hover:bg-accent-gap/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {isCollapsed && (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign Out"
            className="w-full flex items-center justify-center p-2 rounded-lg text-outline hover:text-accent-gap hover:bg-accent-gap/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
