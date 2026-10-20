"use client";

import React, { useState, useEffect, useRef } from "react";
import { RecruiterProfile } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Save,
  Bell,
  Sliders,
  Camera,
  Trash2,
  Upload,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyName, setCompanyName] = useState(profile.companyName);
  const [recruiterName, setRecruiterName] = useState(profile.recruiterName);
  const [roleTitle, setRoleTitle] = useState(profile.roleTitle);
  const [email, setEmail] = useState(profile.email);
  const [industry, setIndustry] = useState(profile.industry);
  const [location, setLocation] = useState(profile.location);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatarUrl || null);
  const [defaultCutoff, setDefaultCutoff] = useState(88);
  const [notifyOnHighMatch, setNotifyOnHighMatch] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);

  // Synchronize local form state whenever profile prop updates
  useEffect(() => {
    setCompanyName(profile.companyName || "");
    setRecruiterName(profile.recruiterName || "");
    setRoleTitle(profile.roleTitle || "");
    setEmail(profile.email || "");
    setIndustry(profile.industry || "");
    setLocation(profile.location || "");
    setAvatarUrl(profile.avatarUrl || null);
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      onTriggerToast(
        language === "bn"
          ? "ছবির সাইজ ২ মেগাবাইটের কম হতে হবে!"
          : "Photo size must be less than 2MB!"
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarUrl(base64);
      onTriggerToast(
        language === "bn"
          ? "ছবি লোড হয়েছে! সেভ করতে 'সেটিংস সংরক্ষণ করুন' বাটনে ক্লিক করুন।"
          : "Photo loaded! Click 'Save Settings' to apply permanently."
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onTriggerToast(
      language === "bn" ? "প্রোফাইল ছবি সরানো হয়েছে।" : "Profile photo removed."
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: RecruiterProfile = {
      ...profile,
      companyName,
      recruiterName,
      roleTitle,
      email,
      industry,
      location,
      avatarUrl,
    };
    onUpdateProfile(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("skillmatch_recruiter_profile", JSON.stringify(updated));
      } catch (err) {
        console.warn("Failed to write recruiter profile to localStorage:", err);
      }
    }
    const msg =
      language === "bn"
        ? "প্রতিষ্ঠান সেটিংস ও নিয়োগ পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে!"
        : "Organization settings and hiring preferences updated successfully!";
    onTriggerToast(msg);
  };

  const initials = recruiterName
    ? recruiterName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "RC";

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
        {/* Recruiter Avatar & Identity Picture */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-secondary-mint" />
            <span>{language === "bn" ? "নিয়োগকারী প্রোফাইল ছবি" : "Recruiter Profile Picture"}</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl border-2 border-secondary-mint/40 overflow-hidden bg-primary-container text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              {avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatarUrl}
                  alt={recruiterName || "Recruiter Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="recruiter-avatar-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint"
                >
                  <Upload className="w-3.5 h-3.5 text-secondary-mint" />
                  <span>{language === "bn" ? "ছবি আপলোড করুন" : "Upload Photo"}</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-3.5 py-2 rounded-xl bg-accent-gap/10 hover:bg-accent-gap/20 text-accent-gap text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gap"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "ছবি মুছুন" : "Remove"}</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-500">
                {language === "bn"
                  ? "সুপারিশ: ৪০০x৪০০ পিক্সেল (PNG, JPG, WEBP, সর্বোচ্চ ২MB)। এটি টপবার ও সাইডবারে রিয়েল-টাইমে প্রদর্শিত হবে।"
                  : "Recommended: 400x400px (PNG, JPG, or WEBP, max 2MB). Renders across topbar & sidebar instantly."}
              </p>
            </div>
          </div>
        </div>

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
