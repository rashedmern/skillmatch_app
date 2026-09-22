"use client";

import React, { useState } from "react";
import { RecruiterProfile } from "./types";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Save,
  Bell,
  Sliders,
} from "lucide-react";

interface RecruiterSettingsTabProps {
  profile: RecruiterProfile;
  onUpdateProfile: (updated: RecruiterProfile) => void;
  onTriggerToast: (msg: string) => void;
}

export const RecruiterSettingsTab: React.FC<RecruiterSettingsTabProps> = ({
  profile,
  onUpdateProfile,
  onTriggerToast,
}) => {
  const [companyName, setCompanyName] = useState(profile.companyName);
  const [recruiterName, setRecruiterName] = useState(profile.recruiterName);
  const [roleTitle, setRoleTitle] = useState(profile.roleTitle);
  const [email, setEmail] = useState(profile.email);
  const [industry, setIndustry] = useState(profile.industry);
  const [location, setLocation] = useState(profile.location);
  const [defaultCutoff, setDefaultCutoff] = useState(88);
  const [notifyOnHighMatch, setNotifyOnHighMatch] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      companyName,
      recruiterName,
      roleTitle,
      email,
      industry,
      location,
    });
    onTriggerToast("Organization settings and hiring preferences updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5">
            <Building2 className="w-3 h-3 text-secondary-mint" />
            <span>Employer Profile &amp; Preferences</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            Organization Settings
          </h2>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            Manage your company profile, algorithmic candidate screening rules, and notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Talent Partner</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company & Recruiter Profile */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary-mint" />
            Company &amp; Hiring Manager Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Company / Organization Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Industry Sector</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Recruiter Full Name</label>
              <input
                type="text"
                required
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Title / Role</label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Work Email (Notifications &amp; SSO)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-mono text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-on-surface">Primary Office / HQ Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
            </div>
          </div>
        </div>

        {/* Screening Policy & AST Criteria */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-secondary-mint" />
            Algorithmic Screening Policies
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-container-low border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary-mint flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-on-surface">Strict Institutional Verification (.edu)</h4>
                <p className="text-outline text-[11px] mt-0.5">
                  Only candidates registering with verified university domains (e.g., berkeley.edu, stanford.edu, mit.edu) are eligible to submit applications. Personal email addresses are automatically rejected.
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Enforced Globally</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-on-surface">
                  Default Minimum AST Match % For Incoming Applications
                </label>
                <span className="font-mono font-black text-primary-container px-2.5 py-0.5 rounded bg-secondary-mint/15 text-xs">
                  {defaultCutoff}%
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                step="1"
                value={defaultCutoff}
                onChange={(e) => setDefaultCutoff(Number(e.target.value))}
                className="w-full accent-primary-container cursor-pointer"
              />
              <p className="text-[11px] text-outline">
                Candidates falling below this cutoff will be categorized under Review Queue instead of direct fast-track shortlists.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-secondary-mint" />
            Recruiter Alerts &amp; Digest
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <div className="font-bold text-on-surface">Instant 95%+ AST Match Alerts</div>
                <div className="text-outline text-[11px]">
                  Receive immediate notification when an exceptional candidate applies.
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifyOnHighMatch}
                onChange={(e) => setNotifyOnHighMatch(e.target.checked)}
                className="w-4 h-4 accent-primary-container cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <div className="font-bold text-on-surface">Daily Morning Pipeline Digest</div>
                <div className="text-outline text-[11px]">
                  Daily overview email detailing new applicants, interviews, and verified resumes.
                </div>
              </div>
              <input
                type="checkbox"
                checked={dailyDigest}
                onChange={(e) => setDailyDigest(e.target.checked)}
                className="w-4 h-4 accent-primary-container cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-level-1 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-secondary-mint" />
            <span>Save Organization Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
