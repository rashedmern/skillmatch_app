"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "bn";

export interface Translations {
  common: {
    brandName: string;
    brandTagline: string;
    loading: string;
    save: string;
    saved: string;
    cancel: string;
    close: string;
    confirm: string;
    delete: string;
    edit: string;
    view: string;
    search: string;
    filter: string;
    all: string;
    status: string;
    actions: string;
    back: string;
    continue: string;
    role: string;
    candidate: string;
    recruiter: string;
    verifiedEdu: string;
    verifiedPartner: string;
    switchRole: string;
    logOut: string;
  };
  sidebar: {
    overview: string;
    postJob: string;
    pipeline: string;
    talentSearch: string;
    settings: string;
    allJobs: string;
    myApplications: string;
    profileSetup: string;
    recruiterPortal: string;
    candidatePortal: string;
    switchToCandidate: string;
    switchToRecruiter: string;
    partnerBadge: string;
    eduBadge: string;
  };
  metrics: {
    activeJobs: string;
    totalApplicants: string;
    shortlisted: string;
    peakMatch: string;
    avgMatch: string;
    appliedJobs: string;
    inReview: string;
    interviewsScheduled: string;
    offersExtended: string;
    liveOpportunities: string;
  };
  recruiter: {
    commandTitle: string;
    commandSubtitle: string;
    createJobBtn: string;
    recentSubmissions: string;
    recentSubmissionsDesc: string;
    activePostingsTitle: string;
    activePostingsDesc: string;
    manageRoles: string;
    publishRole: string;
    institutionalGuaranteeTitle: string;
    institutionalGuaranteeDesc: string;
    jobTitle: string;
    engineeringTeam: string;
    location: string;
    salaryRange: string;
    minAstCutoff: string;
    skillsRequired: string;
    jobDescription: string;
    pause: string;
    activate: string;
    scheduleInterview: string;
    shortlistCandidate: string;
    rejectCandidate: string;
    tableView: string;
    kanbanView: string;
    talentScoutTitle: string;
    talentScoutSubtitle: string;
    inviteToApply: string;
    invitationSent: string;
    orgSettingsTitle: string;
    orgSettingsSubtitle: string;
    companyName: string;
    industrySector: string;
    recruiterName: string;
    workEmail: string;
    officeLocation: string;
  };
  candidate: {
    dossierTitle: string;
    dossierSubtitle: string;
    algorithmicDossier: string;
    exploreJobsBtn: string;
    editProfileBtn: string;
    recentApplicationsTitle: string;
    matchedOpportunitiesTitle: string;
    applyNow: string;
    applied: string;
    viewAllJobs: string;
    academicVerificationTitle: string;
    resumeUploaderTitle: string;
    skillsManagerTitle: string;
    addSkillPlaceholder: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    asCandidate: string;
    asRecruiter: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    signInBtn: string;
    orContinueWith: string;
    googleSso: string;
    githubAuth: string;
    noAccount: string;
    haveAccount: string;
    signUpLink: string;
    signInLink: string;
    eduRequirementAlert: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      brandName: "SkillMatch",
      brandTagline: "Algorithmic Code-First CSE Career Gateway",
      loading: "Loading...",
      save: "Save Changes",
      saved: "Saved Successfully",
      cancel: "Cancel",
      close: "Close",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search...",
      filter: "Filter",
      all: "All",
      status: "Status",
      actions: "Actions",
      back: "Back",
      continue: "Continue",
      role: "Role",
      candidate: "Candidate",
      recruiter: "Recruiter",
      verifiedEdu: "Verified .EDU",
      verifiedPartner: "Verified Partner",
      switchRole: "Switch View",
      logOut: "Log Out",
    },
    sidebar: {
      overview: "Overview",
      postJob: "Post Job",
      pipeline: "Candidate Pipeline / ATS",
      talentSearch: "Talent Search",
      settings: "Settings",
      allJobs: "All Jobs",
      myApplications: "My Applications",
      profileSetup: "Profile Setup",
      recruiterPortal: "Recruiter Workspace",
      candidatePortal: "Candidate Dossier",
      switchToCandidate: "View Candidate Portal",
      switchToRecruiter: "View Recruiter Portal",
      partnerBadge: "Verified Employer",
      eduBadge: "Verified Student",
    },
    metrics: {
      activeJobs: "Active Job Postings",
      totalApplicants: "Total Applicants",
      shortlisted: "Shortlisted Candidates",
      peakMatch: "Peak AST Match Score",
      avgMatch: "Avg Match Score",
      appliedJobs: "Applied Jobs",
      inReview: "In Review",
      interviewsScheduled: "Interviews Scheduled",
      offersExtended: "Offers Extended",
      liveOpportunities: "Live Engineering Roles",
    },
    recruiter: {
      commandTitle: "Recruitment Command & Pipeline",
      commandSubtitle: "Algorithmic matching, AST code verifications, and high-throughput talent acquisition.",
      createJobBtn: "Create New Role",
      recentSubmissions: "Recent Pipeline Submissions",
      recentSubmissionsDesc: "Candidates evaluated by automated AST code analyzer.",
      activePostingsTitle: "Active Job Openings",
      activePostingsDesc: "Live roles accepting institutional applicants.",
      manageRoles: "Manage Roles",
      publishRole: "Publish Role",
      institutionalGuaranteeTitle: "ABET Institutional Email Guarantee",
      institutionalGuaranteeDesc: "Every applicant in this pipeline has authenticated with an accredited university (.edu) address. Spam candidates and bot accounts are prevented at the OAuth gateway.",
      jobTitle: "Job Title",
      engineeringTeam: "Engineering Team",
      location: "Office / Work Location",
      salaryRange: "Salary Range (USD)",
      minAstCutoff: "Min AST Match % Cutoff",
      skillsRequired: "Required Skills & Tags",
      jobDescription: "Role Description",
      pause: "Pause",
      activate: "Activate",
      scheduleInterview: "Schedule Interview",
      shortlistCandidate: "Shortlist",
      rejectCandidate: "Reject",
      tableView: "Table View",
      kanbanView: "Kanban Board",
      talentScoutTitle: "Verified University Talent Directory",
      talentScoutSubtitle: "Directly scout top students with verified institutional credentials and audited repository AST syntax nodes.",
      inviteToApply: "Invite to Apply",
      invitationSent: "Invitation Dispatched",
      orgSettingsTitle: "Organization Settings",
      orgSettingsSubtitle: "Manage your company profile, algorithmic candidate screening rules, and notifications.",
      companyName: "Company / Organization Name",
      industrySector: "Industry Sector",
      recruiterName: "Recruiter Full Name",
      workEmail: "Work Email (Notifications & SSO)",
      officeLocation: "Primary Office / HQ Location",
    },
    candidate: {
      dossierTitle: "CSE Career Match Dossier",
      dossierSubtitle: "Algorithmic code assessment and automated matching with top engineering infrastructure teams.",
      algorithmicDossier: "Algorithmic Student Dossier",
      exploreJobsBtn: "Explore All Jobs",
      editProfileBtn: "Edit Profile",
      recentApplicationsTitle: "Recent Applications & Pipeline Status",
      matchedOpportunitiesTitle: "Algorithmically Matched Opportunities",
      applyNow: "Apply with Code Dossier",
      applied: "Applied",
      viewAllJobs: "View All 8 Roles",
      academicVerificationTitle: "Institutional Academic Verification",
      resumeUploaderTitle: "Cryptographic Resume Dossier",
      skillsManagerTitle: "Verified Skills & Technologies",
      addSkillPlaceholder: "Add technology tag...",
    },
    auth: {
      loginTitle: "Sign In to SkillMatch",
      loginSubtitle: "Autonomous algorithmic recruitment powered by AST syntax verification.",
      registerTitle: "Create Your SkillMatch Account",
      registerSubtitle: "Join the premier platform connecting verified engineering talent with elite infrastructure teams.",
      asCandidate: "Candidate / Student",
      asRecruiter: "Employer / Recruiter",
      emailLabel: "Institutional or Corporate Email",
      emailPlaceholder: "alex@berkeley.edu or recruiter@scale.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your secure password",
      rememberMe: "Remember my session",
      forgotPassword: "Forgot password?",
      signInBtn: "Sign In to Dashboard",
      orContinueWith: "Or continue with institutional SSO",
      googleSso: "Continue with Google",
      githubAuth: "Continue with GitHub",
      noAccount: "Don't have an account?",
      haveAccount: "Already registered?",
      signUpLink: "Sign up now",
      signInLink: "Sign in here",
      eduRequirementAlert: "Candidate accounts strictly require an institutional (.edu) university email address.",
    },
  },
  bn: {
    common: {
      brandName: "স্কিলম্যাচ",
      brandTagline: "অ্যালগোরিদমিক কোড-ভিত্তিক সিএসই ক্যারিয়ার প্ল্যাটফর্ম",
      loading: "লোড হচ্ছে...",
      save: "সংরক্ষণ করুন",
      saved: "সফলভাবে সংরক্ষিত",
      cancel: "বাতিল",
      close: "বন্ধ করুন",
      confirm: "নিশ্চিত করুন",
      delete: "মুছে ফেলুন",
      edit: "সম্পাদনা",
      view: "দেখুন",
      search: "অনুসন্ধান করুন...",
      filter: "ফিল্টার",
      all: "সকল",
      status: "অবস্থা",
      actions: "কার্যক্রম",
      back: "পেছনে",
      continue: "চালিয়ে যান",
      role: "ভূমিকা",
      candidate: "ক্যান্ডিডেট",
      recruiter: "রিক্রুটার",
      verifiedEdu: "যাচাইকৃত .EDU",
      verifiedPartner: "ভেরিফাইড পার্টনার",
      switchRole: "ভিউ পরিবর্তন করুন",
      logOut: "লগ আউট",
    },
    sidebar: {
      overview: "ওভারভিউ",
      postJob: "চাকরি পোস্ট করুন",
      pipeline: "ক্যান্ডিডেট পাইপলাইন / ATS",
      talentSearch: "ট্যালেন্ট সার্চ",
      settings: "সেটিংস",
      allJobs: "সকল চাকরি",
      myApplications: "আমার আবেদনসমূহ",
      profileSetup: "প্রোফাইল সেটআপ",
      recruiterPortal: "নিয়োগকারী ওয়ার্কস্পেস",
      candidatePortal: "ক্যান্ডিডেট ডজিয়ার",
      switchToCandidate: "ক্যান্ডিডেট পোর্টাল দেখুন",
      switchToRecruiter: "রিক্রুটার পোর্টাল দেখুন",
      partnerBadge: "যাচাইকৃত নিয়োগকর্তা",
      eduBadge: "যাচাইকৃত শিক্ষার্থী",
    },
    metrics: {
      activeJobs: "সক্রিয় চাকরির পদ",
      totalApplicants: "মোট আবেদনকারী",
      shortlisted: "বাছাইকৃত প্রার্থী",
      peakMatch: "সর্বোচ্চ AST ম্যাচ স্কোর",
      avgMatch: "গড় ম্যাচ স্কোর",
      appliedJobs: "আবেদনকৃত চাকরি",
      inReview: "পর্যালোচনাধীন",
      interviewsScheduled: "নির্ধারিত সাক্ষাৎকার",
      offersExtended: "প্রস্তাবিত অফার",
      liveOpportunities: "লাইভ ইঞ্জিনিয়ারিং সুযোগ",
    },
    recruiter: {
      commandTitle: "নিয়োগ কমান্ড ও পাইপলাইন",
      commandSubtitle: "অ্যালগোরিদমিক ম্যাচিং, AST কোড যাচাইকরণ এবং দ্রুত দক্ষ কর্মী নিয়োগ।",
      createJobBtn: "নতুন পদ তৈরি করুন",
      recentSubmissions: "সাম্প্রতিক আবেদনসমূহ",
      recentSubmissionsDesc: "স্বয়ংক্রিয় AST কোড অ্যানালাইজার দ্বারা মূল্যায়নকৃত প্রার্থী।",
      activePostingsTitle: "সক্রিয় চাকরির বিজ্ঞপ্তি",
      activePostingsDesc: "লাইভ পদসমূহ যেখানে আবেদন গ্রহণ করা হচ্ছে।",
      manageRoles: "পদসমূহ পরিচালনা",
      publishRole: "বিজ্ঞপ্তি প্রকাশ করুন",
      institutionalGuaranteeTitle: "প্রাতিষ্ঠানিক .EDU ইমেইল গ্যারান্টি",
      institutionalGuaranteeDesc: "এই পাইপলাইনের প্রত্যেক আবেদনকারী অনুমোদিত বিশ্ববিদ্যালয়ের (.edu) ঠিকানা দিয়ে যাচাইকৃত। স্প্যাম এবং বট অ্যাকাউন্ট আগেই ব্লক করা হয়।",
      jobTitle: "চাকরির পদবী",
      engineeringTeam: "ইঞ্জিনিয়ারিং টিম",
      location: "অফিস / কাজের স্থান",
      salaryRange: "বেতন সীমা (USD)",
      minAstCutoff: "সর্বনিম্ন AST ম্যাচ % কাটঅফ",
      skillsRequired: "প্রয়োজনীয় দক্ষতা ও ট্যাগ",
      jobDescription: "পদের বিবরণ",
      pause: "স্থগিত করুন",
      activate: "চালু করুন",
      scheduleInterview: "সাক্ষাৎকার নির্ধারণ",
      shortlistCandidate: "বাছাই করুন",
      rejectCandidate: "বাতিল",
      tableView: "টেবিল ভিউ",
      kanbanView: "কানবান বোর্ড",
      talentScoutTitle: "যাচাইকৃত বিশ্ববিদ্যালয় মেধা ডিরেক্টরি",
      talentScoutSubtitle: "সরাসরি প্রাতিষ্ঠানিক সনদপ্রাপ্ত শীর্ষ শিক্ষার্থী এবং অডিটকৃত রিপোজিটরি সার্চ করুন।",
      inviteToApply: "আবেদনের আমন্ত্রণ জানান",
      invitationSent: "আমন্ত্রণপত্র পাঠানো হয়েছে",
      orgSettingsTitle: "প্রতিষ্ঠান সেটিংস",
      orgSettingsSubtitle: "কোম্পানি প্রোফাইল, স্ক্রীনিং রুলস ও নোটিফিকেশন নিয়ন্ত্রণ করুন।",
      companyName: "কোম্পানি / প্রতিষ্ঠানের নাম",
      industrySector: "শিল্প খাত",
      recruiterName: "নিয়োগ কর্মকর্তার পূর্ণ নাম",
      workEmail: "অফিসিয়াল ইমেইল (নোটিফিকেশন ও SSO)",
      officeLocation: "প্রধান কার্যালয় / কাজের অবস্থান",
    },
    candidate: {
      dossierTitle: "সিএসই ক্যারিয়ার ম্যাচ ডজিয়ার",
      dossierSubtitle: "শীর্ষ ইঞ্জিনিয়ারিং ইনফ্রাস্ট্রাকচার টিমের সাথে অ্যালগোরিদমিক কোড মূল্যায়ন ও স্বয়ংক্রিয় ম্যাচিং।",
      algorithmicDossier: "অ্যালগোরিদমিক স্টুডেন্ট ডজিয়ার",
      exploreJobsBtn: "সকল চাকরি অন্বেষণ করুন",
      editProfileBtn: "প্রোফাইল সম্পাদনা",
      recentApplicationsTitle: "সাম্প্রতিক আবেদন ও পাইপলাইন স্ট্যাটাস",
      matchedOpportunitiesTitle: "অ্যালগোরিদমিকভাবে ম্যাচকৃত সুযোগসমূহ",
      applyNow: "কোড ডজিয়ার দিয়ে আবেদন করুন",
      applied: "আবেদন সম্পন্ন",
      viewAllJobs: "সকল ৮টি পদ দেখুন",
      academicVerificationTitle: "প্রাতিষ্ঠানিক একাডেমিক যাচাইকরণ",
      resumeUploaderTitle: "ক্রিপ্টোগ্রাফিক রিজিউমে ডজিয়ার",
      skillsManagerTitle: "যাচাইকৃত দক্ষতা ও প্রযুক্তি",
      addSkillPlaceholder: "প্রযুক্তি ট্যাগ যোগ করুন...",
    },
    auth: {
      loginTitle: "স্কিলম্যাচে লগ ইন করুন",
      loginSubtitle: "AST সিনট্যাক্স যাচাইকরণ ভিত্তিক স্বায়ত্তশাসিত অ্যালগোরিদমিক নিয়োগ ব্যবস্থা।",
      registerTitle: "স্কিলম্যাচ অ্যাকাউন্ট তৈরি করুন",
      registerSubtitle: "যাচাইকৃত ইঞ্জিনিয়ারিং প্রতিভাদের সাথে শীর্ষ ইনফ্রাস্ট্রাকচার দলের সাথে যুক্ত হন।",
      asCandidate: "ক্যান্ডিডেট / শিক্ষার্থী",
      asRecruiter: "নিয়োগকারী / প্রতিষ্ঠান",
      emailLabel: "প্রাতিষ্ঠানিক বা প্রাতিষ্ঠানিক ইমেইল",
      emailPlaceholder: "alex@berkeley.edu অথবা recruiter@scale.com",
      passwordLabel: "পাসওয়ার্ড",
      passwordPlaceholder: "আপনার গোপনীয় পাসওয়ার্ড দিন",
      rememberMe: "আমার সেশন মনে রাখুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signInBtn: "ড্যাশবোর্ডে প্রবেশ করুন",
      orContinueWith: "অথবা প্রাতিষ্ঠানিক SSO দিয়ে চালিয়ে যান",
      googleSso: "গুগল দিয়ে চালিয়ে যান",
      githubAuth: "গিটহাব দিয়ে চালিয়ে যান",
      noAccount: "অ্যাকাউন্ট নেই?",
      haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      signUpLink: "নিবন্ধন করুন",
      signInLink: "এখানে সাইন ইন করুন",
      eduRequirementAlert: "ক্যান্ডিডেট অ্যাকাউন্টের জন্য অবশ্যই অনুমোদিত বিশ্ববিদ্যালয়ের (.edu) ইমেইল প্রয়োজন।",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = "skillmatch_locale";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const saved = localStorage.getItem(COOKIE_NAME) as Language | null;
      if (saved === "en" || saved === "bn") return saved;

      const cookieMatch = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_NAME}=`));
      if (cookieMatch) {
        const val = cookieMatch.split("=")[1] as Language;
        if (val === "en" || val === "bn") return val;
      }
    } catch {
      // Ignore storage errors in restrictive environments
    }
    return "en";
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(COOKIE_NAME, newLang);
      document.cookie = `${COOKIE_NAME}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors in restrictive environments
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
