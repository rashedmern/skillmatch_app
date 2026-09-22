"use client";

import React, { useState, useRef } from "react";
import { CandidateProfile } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import {
  User,
  Upload,
  FileText,
  Plus,
  X,
  CheckCircle2,
  Download,
  GraduationCap,
  Save,
  Trash2,
  ShieldCheck,
  Tag,
  Link as LinkIcon,
  Globe,
} from "lucide-react";

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8V19.3h-2.8v-8.4M7.86 6.87a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
  </svg>
);

interface ProfileSetupTabProps {
  profile: CandidateProfile;
  onUpdateProfile: (updated: CandidateProfile) => void;
  onTriggerToast: (msg: string) => void;
}

export const ProfileSetupTab: React.FC<ProfileSetupTabProps> = ({
  profile,
  onUpdateProfile,
  onTriggerToast,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<CandidateProfile>(profile);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Skill Suggestions for Quick Addition
  const suggestedSkills = [
    "Rust",
    "Kubernetes",
    "eBPF",
    "gRPC",
    "GraphQL",
    "Apache Kafka",
    "Docker",
    "PostgreSQL Internals",
    "Raft Consensus",
    "Distributed Systems",
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
        onTriggerToast(
          language === "bn"
            ? "প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে!"
            : "Profile picture updated successfully!"
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, avatarUrl: null }));
    onTriggerToast(
      language === "bn"
        ? "প্রোফাইল ছবি ডিফল্ট আদ্যক্ষরে রিসেট করা হয়েছে।"
        : "Profile picture reset to default initials."
    );
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileSize: `${sizeMb} MB`,
        resumeSha256: `sha256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      }));
      onTriggerToast(
        language === "bn"
          ? `রিজিউমে '${file.name}' আপলোড এবং AST টোকেনের জন্য পার্স করা হয়েছে!`
          : `Resume '${file.name}' uploaded and parsed for AST tokens!`
      );
    }
  };

  const handleAddSkill = (skillToAdd?: string) => {
    const skill = (skillToAdd || newSkillInput).trim();
    if (!skill) return;

    if (formData.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      onTriggerToast(
        language === "bn"
          ? `'${skill}' ইতিমধ্যে আপনার তালিকায় রয়েছে।`
          : `'${skill}' is already in your verified skills list.`
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setNewSkillInput("");
    onTriggerToast(
      language === "bn"
        ? `'${skill}' দক্ষতা প্রোফাইলে যোগ করা হয়েছে।`
        : `Skill '${skill}' added to profile.`
    );
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    onTriggerToast(
      language === "bn"
        ? `'${skillToRemove}' অপসারণ করা হয়েছে।`
        : `Skill '${skillToRemove}' removed.`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdateProfile(formData);
      setIsSaving(false);
      onTriggerToast(
        language === "bn"
          ? "প্রোফাইল পরিবর্তন সফলভাবে সংরক্ষিত ও সিঙ্ক হয়েছে!"
          : "Candidate profile changes saved and synced across network!"
      );
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] text-white relative overflow-hidden shadow-level-2">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.4),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-container backdrop-blur-sm border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
              <span>
                {language === "bn"
                  ? "ABET প্রাতিষ্ঠানিক প্রোফাইল ব্যবস্থাপনা"
                  : "ABET Institutional Profile Management"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t.candidate.profileSetupTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {t.candidate.profileSetupSubtitle}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            id="save-profile-top-btn"
            className="px-5 py-2.5 rounded-xl bg-secondary-mint hover:bg-secondary-mint/90 active:scale-95 text-white text-xs font-extrabold flex items-center gap-2 shadow-level-2 transition-all cursor-pointer self-stretch md:self-auto justify-center"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (language === "bn" ? "সংরক্ষণ করা হচ্ছে..." : "Saving...") : t.common.save}</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Column (Avatar + Resume + Skills) & Right Column (Profile Fields) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Media & Assets (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Profile Picture Uploader */}
          <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {language === "bn" ? "প্রোফাইল ছবি" : "Profile Picture"}
              </span>
              <span className="text-[10px] font-mono font-bold text-secondary-mint px-2 py-0.5 rounded bg-secondary/10">
                {language === "bn" ? "যাচাইকৃত" : "Verified"}
              </span>
            </div>

            <div className="flex items-center gap-5">
              {avatarPreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatarPreview}
                  alt={formData.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-secondary-mint shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-primary-container text-secondary-container font-mono font-extrabold text-2xl flex items-center justify-center border-2 border-white/20 shadow-sm">
                  AC
                </div>
              )}

              <div className="space-y-2 flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{language === "bn" ? "ছবি আপলোড করুন" : "Upload Picture"}</span>
                </button>

                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="w-full py-1.5 px-3 rounded-xl border border-slate-200 text-outline hover:text-accent-gap hover:border-accent-gap/30 hover:bg-accent-gap/5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "আদ্যক্ষরে রিসেট করুন" : "Reset to Initials"}</span>
                  </button>
                )}
                <p className="text-[10px] text-outline">
                  {language === "bn"
                    ? "JPG, PNG, বা WebP। সর্বোচ্চ ৫ মেগাবাইট।"
                    : "JPG, PNG, or WebP. Max file size: 5MB."}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Resume / CV File Uploader */}
          <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                {language === "bn" ? "রিজিউমে / সিভি ফাইল" : "Resume / CV File"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary-mint font-bold">
                ATS 98%
              </span>
            </div>

            {/* Active Resume Details */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xs text-on-surface truncate pr-2">
                  {formData.resumeFileName}
                </div>
                <span className="text-[10px] font-mono text-outline shrink-0">
                  {formData.resumeFileSize}
                </span>
              </div>
              <div className="text-[10px] font-mono text-outline truncate">
                Hash: {formData.resumeSha256}
              </div>
            </div>

            {/* Drag & Drop / Select Button */}
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeFileChange}
              accept=".pdf,.docx"
              className="hidden"
            />
            <div
              onClick={() => resumeInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-secondary-mint/60 rounded-xl p-4 text-center cursor-pointer transition-all hover:bg-surface-container-lowest group"
            >
              <Upload className="w-6 h-6 text-outline group-hover:text-secondary-mint mx-auto transition-colors" />
              <p className="text-xs font-bold text-on-surface mt-2">
                {language === "bn"
                  ? "নতুন সিভি আপলোড করতে ক্লিক করুন বা ড্র্যাগ ও ড্রপ করুন"
                  : "Click or drag & drop to upload new CV"}
              </p>
              <p className="text-[11px] text-outline mt-0.5">
                {language === "bn"
                  ? "পিডিএফ বা ওয়ার্ড ফাইল। AST পার্সার সক্রিয় হবে।"
                  : "PDF or Word Document. Will trigger AST parser."}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onTriggerToast(
                  language === "bn"
                    ? `সক্রিয় ডজিয়ার ${formData.resumeFileName} ডাউনলোড হচ্ছে...`
                    : `Downloading active dossier ${formData.resumeFileName}...`
                )
              }
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-on-surface hover:bg-surface-container-low flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "সক্রিয় রিজিউমে ডাউনলোড করুন" : "Download Active Resume"}</span>
            </button>
          </div>

          {/* Card 3: Interactive Skills Tag Manager */}
          <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary" />
                {t.candidate.skillsManagerTitle}
              </span>
              <span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                {formData.skills.length} {language === "bn" ? "দক্ষতা" : "Skills"}
              </span>
            </div>

            {/* Add Skill Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={t.candidate.addSkillPlaceholder}
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs text-on-surface focus:outline-none focus:bg-white focus:border-secondary-mint transition-all"
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                id="add-skill-btn"
                className="h-9 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "যোগ করুন" : "Add"}</span>
              </button>
            </div>

            {/* Active Skills Chips */}
            <div className="flex flex-wrap items-center gap-1.5 min-h-16 p-3 rounded-xl bg-surface-container-low border border-slate-200/80">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono font-semibold text-primary shadow-xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="text-outline hover:text-accent-gap p-0.5 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Add Suggestions */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                {t.candidate.suggestedSkills}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {suggestedSkills
                  .filter((s) => !formData.skills.some((sk) => sk.toLowerCase() === s.toLowerCase()))
                  .map((suggested) => (
                    <button
                      key={suggested}
                      type="button"
                      onClick={() => handleAddSkill(suggested)}
                      className="px-2 py-0.5 rounded-md bg-surface border border-slate-200 hover:border-secondary-mint text-[11px] font-mono text-on-surface-variant hover:text-secondary-mint transition-all cursor-pointer"
                    >
                      + {suggested}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Candidate Info Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stroke-card shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stroke-card pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-base font-extrabold text-on-surface">
                  {t.candidate.personalInfoTitle}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-secondary-mint flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === "bn" ? "ABET সিঙ্ক্রোনাইজড" : "ABET Synchronized"}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {t.candidate.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {t.candidate.headline}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {t.candidate.university}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {t.candidate.gradYear}
                  </label>
                  <input
                    type="text"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {t.candidate.degree}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-secondary-mint"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                    {language === "bn" ? "যাচাইকৃত প্রাতিষ্ঠানিক (.edu) ইমেইল" : "Verified Institutional (.edu) Email"}
                  </label>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full h-10 px-3 rounded-xl bg-slate-100 border border-slate-200 text-sm font-mono text-outline cursor-not-allowed"
                    title={
                      language === "bn"
                        ? "প্রাতিষ্ঠানিক ইমেইল যাচাইকৃত OAuth সেশনের সাথে লক করা রয়েছে।"
                        : "Institutional email is locked to verified OAuth session."
                    }
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-on-surface text-xs">
                  <LinkIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{t.candidate.professionalLinks}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] text-outline font-medium flex items-center gap-1">
                      <GithubIcon className="w-3 h-3" />
                      {language === "bn" ? "গিটহাব প্রোফাইল" : "GitHub Profile"}
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 font-mono text-xs focus:outline-none focus:bg-white focus:border-secondary-mint"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] text-outline font-medium flex items-center gap-1">
                      <LinkedinIcon className="w-3 h-3" />
                      {language === "bn" ? "লিঙ্কডইন প্রোফাইল" : "LinkedIn Profile"}
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 font-mono text-xs focus:outline-none focus:bg-white focus:border-secondary-mint"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] text-outline font-medium flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {language === "bn" ? "পোর্টফোলিও সাইট" : "Portfolio Site"}
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://yourname.dev"
                      className="w-full h-9 px-3 rounded-xl bg-surface-container-low border border-slate-200 font-mono text-xs focus:outline-none focus:bg-white focus:border-secondary-mint"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="block font-bold text-on-surface uppercase tracking-wider text-[11px]">
                  {t.candidate.bio}
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder={
                    language === "bn"
                      ? "আপনার ডিস্ট্রিবিউটেড সিস্টেমস অভিজ্ঞতা, অ্যালগোরিদম দক্ষতা বা ওপেন সোর্স অবদান সংক্ষেপে লিখুন..."
                      : "Describe your distributed systems experience, core algorithms focus, or open source contributions..."
                  }
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-slate-200 text-xs leading-relaxed focus:outline-none focus:bg-white focus:border-secondary-mint"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  id="save-profile-btn"
                  className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary-hover active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? (language === "bn" ? "সংরক্ষণ করা হচ্ছে..." : "Saving...") : t.common.save}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
