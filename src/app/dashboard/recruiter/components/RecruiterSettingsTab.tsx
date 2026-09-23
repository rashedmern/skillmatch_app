"use client";

import React, { useState } from "react";
import { RecruiterProfile } from "./types";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t, language } = useLanguage();
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
    const msg =
      language === "bn"
        ? "প্রতিষ্ঠান সেটিংস ও নিয়োগ পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে!"
        : "Organization settings and hiring preferences updated successfully!";
    onTriggerToast(msg);
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-mint/15 text-primary-container text-[11px] font-bold tracking-wide uppercase mb-1.5">
            <Building2 className="w-3 h-3 text-secondary-mint" />
            <span>{t.recruiter.employerProfileBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            {t.recruiter.orgSettingsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            {t.recruiter.orgSettingsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.recruiter.verifiedPartnerBadge}</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company & Recruiter Profile */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary-mint" />
            {t.recruiter.companyDetailsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label htmlFor="settings-company-name" className="block font-bold text-on-surface">
                {t.recruiter.companyName}
              </label>
              <input
                id="settings-company-name"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-semibold text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-industry" className="block font-bold text-on-surface">
                {t.recruiter.industrySector}
              </label>
              <input
                id="settings-industry"
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-recruiter-name" className="block font-bold text-on-surface">
                {t.recruiter.recruiterName}
              </label>
              <input
                id="settings-recruiter-name"
                type="text"
                required
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-role-title" className="block font-bold text-on-surface">
                {t.recruiter.roleTitle}
              </label>
              <input
                id="settings-role-title"
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-email" className="block font-bold text-on-surface">
                {t.recruiter.workEmail}
              </label>
              <input
                id="settings-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs font-mono text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-location" className="block font-bold text-on-surface">
                {t.recruiter.officeLocation}
              </label>
              <input
                id="settings-location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint focus-visible:ring-2 focus-visible:ring-secondary-mint transition-all"
              />
            </div>
          </div>
        </div>

        {/* Screening Policy & AST Criteria */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-secondary-mint" aria-hidden="true" />
            {t.recruiter.screeningPoliciesTitle}
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-container-low border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary-mint flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-bold text-on-surface">{t.recruiter.strictEduTitle}</h4>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  {t.recruiter.strictEduDesc}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                  <span>{t.recruiter.enforcedGlobally}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="settings-default-cutoff" className="font-bold text-on-surface">
                  {t.recruiter.defaultCutoffLabel}
                </label>
                <span className="font-mono font-black text-primary-container px-2.5 py-0.5 rounded bg-secondary-mint/15 text-xs">
                  {defaultCutoff}%
                </span>
              </div>
              <input
                id="settings-default-cutoff"
                type="range"
                min="70"
                max="95"
                step="1"
                value={defaultCutoff}
                onChange={(e) => setDefaultCutoff(Number(e.target.value))}
                className="w-full accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
              />
              <p className="text-[11px] text-slate-600">
                {t.recruiter.cutoffDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-secondary-mint" aria-hidden="true" />
            {t.recruiter.alertsTitle}
          </h3>

          <div className="space-y-3 text-xs">
            <label htmlFor="settings-instant-alerts" className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <div className="font-bold text-on-surface">{t.recruiter.instantAlerts}</div>
                <div className="text-slate-600 text-[11px]">
                  {t.recruiter.instantAlertsDesc}
                </div>
              </div>
              <input
                id="settings-instant-alerts"
                type="checkbox"
                checked={notifyOnHighMatch}
                onChange={(e) => setNotifyOnHighMatch(e.target.checked)}
                className="w-4 h-4 accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint rounded"
              />
            </label>

            <label htmlFor="settings-daily-digest" className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <div className="font-bold text-on-surface">{t.recruiter.dailyDigest}</div>
                <div className="text-slate-600 text-[11px]">
                  {t.recruiter.dailyDigestDesc}
                </div>
              </div>
              <input
                id="settings-daily-digest"
                type="checkbox"
                checked={dailyDigest}
                onChange={(e) => setDailyDigest(e.target.checked)}
                className="w-4 h-4 accent-primary-container cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint rounded"
              />
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-level-1 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
          >
            <Save className="w-4 h-4 text-secondary-mint" aria-hidden="true" />
            <span>{t.recruiter.saveSettingsBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
