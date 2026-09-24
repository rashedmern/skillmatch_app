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
    atsPipelineTitle: string;
    atsPipelineSubtitle: string;
    searchCandidatesPlaceholder: string;
    allActiveListings: string;
    candidateProfileCol: string;
    institutionalEduCol: string;
    targetJobCol: string;
    astScoreCol: string;
    verifiedRepoCol: string;
    stageCol: string;
    actionsCol: string;
    noApplicantsFound: string;
    noApplicantsFoundDesc: string;
    talentScoutTitle: string;
    talentScoutSubtitle: string;
    searchScoutPlaceholder: string;
    allLanguages: string;
    allUniversities: string;
    inviteToApply: string;
    invitationSent: string;
    orgSettingsTitle: string;
    orgSettingsSubtitle: string;
    companyName: string;
    industrySector: string;
    recruiterName: string;
    workEmail: string;
    officeLocation: string;
    screeningPoliciesTitle: string;
    defaultCutoffLabel: string;
    alertsTitle: string;
    instantAlerts: string;
    dailyDigest: string;
    accreditedTalentScout: string;
    verifiedStudents: string;
    minAstMatch: string;
    noScoutCandidates: string;
    noScoutCandidatesDesc: string;
    classOf: string;
    astScore: string;
    inviteModalTitle: string;
    selectPositionInvite: string;
    inviteNotice: string;
    sendFastTrackInvite: string;
    employerProfileBadge: string;
    verifiedPartnerBadge: string;
    companyDetailsTitle: string;
    roleTitle: string;
    strictEduTitle: string;
    strictEduDesc: string;
    enforcedGlobally: string;
    cutoffDesc: string;
    instantAlertsDesc: string;
    dailyDigestDesc: string;
    saveSettingsBtn: string;
    techEvalSession: string;
    scheduleInterviewWith: string;
    dateLabel: string;
    timeLabel: string;
    formatLabel: string;
    calendarInviteNotice: string;
    sendCalendarInvite: string;
    applicantsInPipeline: string;
    viewAtsCandidates: string;
    postNewJobTitle: string;
    postNewJobSubtitle: string;
  };
  candidate: {
    allDomains: string;
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
    astScoreLabel: string;
    verifiedRepoLabel: string;
    cleanAstBadge: string;
    nodesLabel: string;
    safetyLabel: string;
    algorithmicDepthLabel: string;
    recruiterReviewsLabel: string;
    atsBypassedLabel: string;
    profileHealthLabel: string;
    gapDetectedTitle: string;
    gapDetectedDesc: string;
    launchSandboxBtn: string;
    allJobsMarketplaceTitle: string;
    allJobsMarketplaceSubtitle: string;
    availablePositions: string;
    searchJobsPlaceholder: string;
    modelFilter: string;
    allModels: string;
    remote: string;
    hybrid: string;
    onSite: string;
    myApplicationsTitle: string;
    myApplicationsSubtitle: string;
    inProgress: string;
    statusFilter: string;
    underReview: string;
    interviewScheduled: string;
    offerExtended: string;
    rejected: string;
    targetRoleCol: string;
    companyCol: string;
    appliedDateCol: string;
    matchScoreCol: string;
    stageTimelineCol: string;
    actionsTelemetryCol: string;
    noApplicationsFound: string;
    noApplicationsFoundDesc: string;
    browseMarketplaceBtn: string;
    profileSetupTitle: string;
    profileSetupSubtitle: string;
    saveProfileBtn: string;
    profilePicture: string;
    uploadPhoto: string;
    photoRequirements: string;
    resumeDropzoneTitle: string;
    resumeDropzoneSubtitle: string;
    uploadedResume: string;
    replaceResume: string;
    skillsTagManagerTitle: string;
    addSkillBtn: string;
    suggestedSkills: string;
    academicCredentialsTitle: string;
    universityName: string;
    degreeProgram: string;
    graduationYear: string;
    gpaScore: string;
    verifiedEduDomainNotice: string;
    socialAndLinksTitle: string;
    githubUsername: string;
    linkedinUrl: string;
    personalPortfolio: string;
    technicalBioTitle: string;
    bioPlaceholder: string;
    personalInfoTitle: string;
    fullName: string;
    headline: string;
    university: string;
    degree: string;
    gradYear: string;
    bio: string;
    resumeParsed: string;
    professionalLinks: string;
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
    createProfileTitle: string;
    createProfileSubtitle: string;
    orRegisterWithEmail: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    candEmailLabel: string;
    recEmailLabel: string;
    candEmailPlaceholder: string;
    recEmailPlaceholder: string;
    specializationLabel: string;
    companyLabel: string;
    companyPlaceholder: string;
    minCharacters: string;
    termsAgreement: string;
    createCandidateBtn: string;
    createRecruiterBtn: string;
    creatingProfile: string;
    returnHome: string;
    encryptedPortal: string;
    twoFactorAuth: string;
    encryptedBadge: string;
    verifyEmailTitle: string;
    verifyEmailSubtitle: string;
    identityConfirmed: string;
    verifyingCode: string;
    verifiedBtn: string;
    verifyEnterDashboard: string;
    demoKeyBtn?: string;
    emailDeliveryNotice: string;
    didntReceiveCode: string;
    resendCodeIn: string;
    resendCodeBtn: string;
    dispatching: string;
    useDifferentMethod: string;
    returnToLogin: string;
    soc2Gateway: string;
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
      atsPipelineTitle: "Candidate Pipeline & Verification ATS",
      atsPipelineSubtitle: "Every candidate is verified via accredited institutional .edu domain and AST syntax analysis.",
      searchCandidatesPlaceholder: "Search by candidate name, .edu domain, university, or repo...",
      allActiveListings: "All Active Job Listings",
      candidateProfileCol: "Candidate Profile",
      institutionalEduCol: "Institutional .edu",
      targetJobCol: "Target Job",
      astScoreCol: "AST Match Score",
      verifiedRepoCol: "Verified Repository",
      stageCol: "Pipeline Stage",
      actionsCol: "Recruiter Actions",
      noApplicantsFound: "No applicants match your criteria",
      noApplicantsFoundDesc: "Try adjusting your search terms, lowering the min match threshold, or selecting a different job.",
      talentScoutTitle: "Verified University Talent Directory",
      talentScoutSubtitle: "Directly scout top students with verified institutional credentials and audited repository AST syntax nodes.",
      searchScoutPlaceholder: "Search by student name, skill (e.g. Raft, Rust, eBPF), or repo...",
      allLanguages: "All Languages",
      allUniversities: "All Accredited Universities",
      inviteToApply: "Invite to Apply",
      invitationSent: "Invitation Dispatched",
      orgSettingsTitle: "Organization Settings",
      orgSettingsSubtitle: "Manage your company profile, algorithmic candidate screening rules, and notifications.",
      companyName: "Company / Organization Name",
      industrySector: "Industry Sector",
      recruiterName: "Recruiter Full Name",
      workEmail: "Work Email (Notifications & SSO)",
      officeLocation: "Primary Office / HQ Location",
      screeningPoliciesTitle: "Algorithmic Screening Policies",
      defaultCutoffLabel: "Default Minimum AST Match % For Incoming Applications",
      alertsTitle: "Recruiter Alerts & Digest",
      instantAlerts: "Instant 95%+ AST Match Alerts",
      dailyDigest: "Daily Morning Pipeline Digest",
      accreditedTalentScout: "Accredited Talent Scout",
      verifiedStudents: "Verified Students",
      minAstMatch: "Min Algorithmic AST Match:",
      noScoutCandidates: "No engineering candidates match your scout criteria.",
      noScoutCandidatesDesc: "Try lowering the minimum AST score or widening your language filter.",
      classOf: "Class of",
      astScore: "AST Score",
      inviteModalTitle: "Invite",
      selectPositionInvite: "Select Position to Invite For",
      inviteNotice: "The candidate will receive a high-priority direct interview invitation and notification highlighting your role match.",
      sendFastTrackInvite: "Send Fast-Track Invite",
      employerProfileBadge: "Employer Profile & Preferences",
      verifiedPartnerBadge: "Verified Talent Partner",
      companyDetailsTitle: "Company & Hiring Manager Details",
      roleTitle: "Title / Role",
      strictEduTitle: "Strict Institutional Verification (.edu)",
      strictEduDesc: "Only candidates registering with verified university domains (e.g., berkeley.edu, stanford.edu, mit.edu) are eligible to submit applications. Personal email addresses are automatically rejected.",
      enforcedGlobally: "Enforced Globally",
      cutoffDesc: "Candidates falling below this cutoff will be categorized under Review Queue instead of direct fast-track shortlists.",
      instantAlertsDesc: "Receive immediate notification when an exceptional candidate applies.",
      dailyDigestDesc: "Daily overview email detailing new applicants, interviews, and verified resumes.",
      saveSettingsBtn: "Save Organization Settings",
      techEvalSession: "Technical Evaluation Session",
      scheduleInterviewWith: "Schedule Interview with",
      dateLabel: "Date",
      timeLabel: "Time (PST)",
      formatLabel: "Interview Format & Focus Area",
      calendarInviteNotice: "A calendar invitation with secure video conferencing link and AST syntax audit dossier will be automatically dispatched to",
      sendCalendarInvite: "Send Calendar Invite",
      applicantsInPipeline: "Applicants in Pipeline",
      viewAtsCandidates: "View ATS Candidates",
      postNewJobTitle: "Post New Engineering Opportunity",
      postNewJobSubtitle: "Publish a high-signal role to verified university engineering students.",
    },
    candidate: {
      allDomains: "All Domains",
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
      astScoreLabel: "AST Vector Match Score",
      verifiedRepoLabel: "Verified Repository",
      cleanAstBadge: "Clean AST",
      nodesLabel: "Nodes:",
      safetyLabel: "Safety:",
      algorithmicDepthLabel: "Algorithmic Depth",
      recruiterReviewsLabel: "Recruiter Reviews",
      atsBypassedLabel: "ATS Filters Bypassed",
      profileHealthLabel: "Profile Health",
      gapDetectedTitle: "1 Target Architectural Gap Detected",
      gapDetectedDesc: "Raft consensus split-brain quorum failure recovery. Complete the 4-hour AST sandbox benchmark to unlock an additional 5 Tier-1 roles.",
      launchSandboxBtn: "Launch Sandbox Challenge",
      allJobsMarketplaceTitle: "All Engineering Job Openings",
      allJobsMarketplaceSubtitle: "Browse positions from verified enterprise recruiters. Match percentages are dynamically computed from your AST syntax tree benchmarks.",
      availablePositions: "Available Positions",
      searchJobsPlaceholder: "Search by role title, company name, or technology (e.g. Raft, eBPF, Go)...",
      modelFilter: "Model:",
      allModels: "All",
      remote: "Remote",
      hybrid: "Hybrid",
      onSite: "On-site",
      myApplicationsTitle: "My Active Applications Pipeline",
      myApplicationsSubtitle: "Track the exact stage of your candidate dossier across top engineering organizations.",
      inProgress: "In-Progress",
      statusFilter: "Status:",
      underReview: "Under Review",
      interviewScheduled: "Interview Scheduled",
      offerExtended: "Offer Extended",
      rejected: "Not Proceeding",
      targetRoleCol: "Target Role & Company",
      companyCol: "Company",
      appliedDateCol: "Applied Date",
      matchScoreCol: "Match Score",
      stageTimelineCol: "Stage & Timeline",
      actionsTelemetryCol: "Actions & Telemetry",
      noApplicationsFound: "No applications found",
      noApplicationsFoundDesc: "Explore open roles and apply with your verified GitHub codebase.",
      browseMarketplaceBtn: "Browse Marketplace",
      profileSetupTitle: "Manual Profile & Skill Setup",
      profileSetupSubtitle: "Manage your academic verification, technical skill tags, cryptographic resume dossier, and developer portfolio links.",
      saveProfileBtn: "Save Profile Changes",
      profilePicture: "Profile Picture",
      uploadPhoto: "Upload Photo",
      photoRequirements: "PNG, JPG or WebP (max 5MB)",
      resumeDropzoneTitle: "Upload Cryptographic Resume",
      resumeDropzoneSubtitle: "Drag & drop PDF resume or click to browse",
      uploadedResume: "Verified Resume Uploaded",
      replaceResume: "Replace File",
      skillsTagManagerTitle: "Skills & Technologies",
      addSkillBtn: "Add",
      suggestedSkills: "Suggested Core Systems Skills (1-Click Add):",
      academicCredentialsTitle: "Academic Credentials",
      universityName: "University Name",
      degreeProgram: "Degree Program",
      graduationYear: "Graduation Year",
      gpaScore: "GPA Score (Optional)",
      verifiedEduDomainNotice: "Institution verified via SSO email gateway.",
      socialAndLinksTitle: "Professional & Code Links",
      githubUsername: "GitHub Username",
      linkedinUrl: "LinkedIn Profile URL",
      personalPortfolio: "Personal Portfolio URL",
      technicalBioTitle: "Technical Summary & Research",
      bioPlaceholder: "Highlight your key systems programming interests, research, or thesis projects...",
      personalInfoTitle: "Candidate Identity & Information",
      fullName: "Full Name",
      headline: "Professional Headline / Target Role",
      university: "Accredited University",
      degree: "Degree Program",
      gradYear: "Graduation Year",
      bio: "Technical Bio & Research Focus",
      resumeParsed: "Parsed for AST Tokens",
      professionalLinks: "Verified Developer & Professional Profiles",
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
      createProfileTitle: "Create Your Profile",
      createProfileSubtitle: "Get matched based on verified GitHub code architecture.",
      orRegisterWithEmail: "or register with email",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Alex Chen or Sarah Miller",
      candEmailLabel: "University or Personal Email",
      recEmailLabel: "Work Email",
      candEmailPlaceholder: "alex.chen@eecs.berkeley.edu",
      recEmailPlaceholder: "sarah.miller@scaleops.io",
      specializationLabel: "Primary Specialization Track",
      companyLabel: "Company & Hiring Team",
      companyPlaceholder: "ScaleOps Inc. • VP of Engineering",
      minCharacters: "Minimum 8 characters",
      termsAgreement: "I agree to the Terms of Service, Privacy Policy, and consent to read-only AST codebase indexing.",
      createCandidateBtn: "Create Candidate Account",
      createRecruiterBtn: "Create Recruiter Account",
      creatingProfile: "Creating Profile...",
      returnHome: "Return to Home",
      encryptedPortal: "256-Bit Encrypted Portal",
      twoFactorAuth: "Two-Factor Authentication",
      encryptedBadge: "256-Bit Encrypted",
      verifyEmailTitle: "Verify Your Email",
      verifyEmailSubtitle: "We sent a 6-digit cryptographic verification code to:",
      identityConfirmed: "Identity Confirmed! Launching Session...",
      verifyingCode: "Verifying Code...",
      verifiedBtn: "Verified",
      verifyEnterDashboard: "Verify & Enter Dashboard",
      emailDeliveryNotice: "A real-time 6-digit cryptographic verification code has been dispatched to your email address.",
      didntReceiveCode: "Didn't receive code?",
      resendCodeIn: "Resend code in",
      resendCodeBtn: "Resend Code",
      dispatching: "Dispatching...",
      useDifferentMethod: "Use different sign in method",
      returnToLogin: "Return to Login",
      soc2Gateway: "SOC-2 Verified Gateway",
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
      atsPipelineTitle: "ক্যান্ডিডেট পাইপলাইন ও যাচাইকরণ ATS",
      atsPipelineSubtitle: "প্রতিটি প্রার্থী অনুমোদিত প্রাতিষ্ঠানিক .edu ডোমেন এবং AST কোড পর্যালোচনার মাধ্যমে যাচাইকৃত।",
      searchCandidatesPlaceholder: "প্রার্থীর নাম, .edu ডোমেন, বিশ্ববিদ্যালয় বা রিপোজিটরি দিয়ে অনুসন্ধান করুন...",
      allActiveListings: "সকল সক্রিয় চাকরির পদ",
      candidateProfileCol: "প্রার্থী পরিচিতি",
      institutionalEduCol: "প্রাতিষ্ঠানিক .edu",
      targetJobCol: "আবেদিত পদবী",
      astScoreCol: "AST ম্যাচ স্কোর",
      verifiedRepoCol: "যাচাইকৃত রিপোজিটরি",
      stageCol: "পাইপলাইন পর্যায়",
      actionsCol: "রিক্রুটার কার্যক্রম",
      noApplicantsFound: "আপনার অনুসন্ধানের সাথে কোন আবেদনকারীর মিল পাওয়া যায়নি",
      noApplicantsFoundDesc: "অনুসন্ধানের শর্ত পরিবর্তন করুন অথবা সর্বনিম্ন ম্যাচ স্কোরের সীমা কমিয়ে দেখুন।",
      talentScoutTitle: "যাচাইকৃত বিশ্ববিদ্যালয় মেধা ডিরেক্টরি",
      talentScoutSubtitle: "সরাসরি প্রাতিষ্ঠানিক সনদপ্রাপ্ত শীর্ষ শিক্ষার্থী এবং অডিটকৃত রিপোজিটরি সার্চ করুন।",
      searchScoutPlaceholder: "শিক্ষার্থীর নাম, প্রযুক্তি (যেমন Raft, Rust, eBPF), বা রিপো দিয়ে খুঁজুন...",
      allLanguages: "সকল প্রোগ্রামিং ভাষা",
      allUniversities: "সকল অনুমোদিত বিশ্ববিদ্যালয়",
      inviteToApply: "আবেদনের আমন্ত্রণ জানান",
      invitationSent: "আমন্ত্রণপত্র পাঠানো হয়েছে",
      orgSettingsTitle: "প্রতিষ্ঠান সেটিংস",
      orgSettingsSubtitle: "কোম্পানি প্রোফাইল, স্ক্রীনিং রুলস ও নোটিফিকেশন নিয়ন্ত্রণ করুন।",
      companyName: "কোম্পানি / প্রতিষ্ঠানের নাম",
      industrySector: "শিল্প খাত",
      recruiterName: "নিয়োগ কর্মকর্তার পূর্ণ নাম",
      workEmail: "অফিসিয়াল ইমেইল (নোটিফিকেশন ও SSO)",
      officeLocation: "প্রধান কার্যালয় / কাজের অবস্থান",
      screeningPoliciesTitle: "অ্যালগোরিদমিক স্ক্রিনিং নীতিমালা",
      defaultCutoffLabel: "ইনকামিং আবেদনের জন্য ডিফল্ট ন্যূনতম AST ম্যাচ % কাটঅফ",
      alertsTitle: "রিক্রুটার অ্যালার্ট ও ডাইজেস্ট",
      instantAlerts: "তাৎক্ষণিক ৯৫%+ AST ম্যাচ অ্যালার্ট",
      dailyDigest: "দৈনিক সকালের পাইপলাইন ডাইজেস্ট",
      accreditedTalentScout: "স্বীকৃত ট্যালেন্ট স্কাউট",
      verifiedStudents: "যাচাইকৃত শিক্ষার্থী",
      minAstMatch: "ন্যূনতম অ্যালগরিদমীয় AST ম্যাচ:",
      noScoutCandidates: "আপনার স্কাউট মানদণ্ডে কোনো ইঞ্জিনিয়ারিং প্রার্থী পাওয়া যায়নি।",
      noScoutCandidatesDesc: "ন্যূনতম AST স্কোর হ্রাস করুন অথবা ভাষার ফিল্টারটি প্রসারিত করুন।",
      classOf: "স্নাতক ব্যাচ",
      astScore: "AST স্কোর",
      inviteModalTitle: "আমন্ত্রণ পাঠান",
      selectPositionInvite: "আমন্ত্রিত পদের নাম নির্বাচন করুন",
      inviteNotice: "প্রার্থী আপনার ভূমিকার ম্যাচ সংক্রান্ত একটি সরাসরি অগ্রাধিকারমূলক ইন্টারভিউ আমন্ত্রণ পাবেন।",
      sendFastTrackInvite: "ফাস্ট-ট্র্যাক আমন্ত্রণ পাঠান",
      employerProfileBadge: "নিয়োগকর্তার প্রোফাইল ও পছন্দসমূহ",
      verifiedPartnerBadge: "যাচাইকৃত ট্যালেন্ট পার্টনার",
      companyDetailsTitle: "কোম্পানি ও হায়ারিং ম্যানেজারের বিবরণ",
      roleTitle: "পদবী / ভূমিকা",
      strictEduTitle: "কঠোর প্রাতিষ্ঠানিক যাচাইকরণ (.edu)",
      strictEduDesc: "শুধুমাত্র অনুমোদিত বিশ্ববিদ্যালয় ডোমেইন (যেমন: berkeley.edu, stanford.edu, mit.edu) দিয়ে নিবন্ধিত প্রার্থীরাই আবেদনের যোগ্য। ব্যক্তিগত ইমেইল স্বয়ংক্রিয়ভাবে প্রত্যাখ্যাত হয়।",
      enforcedGlobally: "বিশ্বব্যাপী কার্যকর",
      cutoffDesc: "এই কাটঅফের নিচে থাকা প্রার্থীদের সরাসরি শর্টলিস্টের পরিবর্তে রিভিউ কিউতে স্থান দেওয়া হবে।",
      instantAlertsDesc: "কোনো উচ্চমানের (৯৫%+ AST) প্রার্থী আবেদন করলে তাৎক্ষণিক নোটিফিকেশন পান।",
      dailyDigestDesc: "নতুন আবেদনকারী, ইন্টারভিউ এবং জীবনবৃত্তান্ত সম্পর্কিত দৈনিক সকালের ইমেইল ওভারভিউ।",
      saveSettingsBtn: "সংস্থার সেটিংস সংরক্ষণ করুন",
      techEvalSession: "প্রযুক্তিগত মূল্যায়ন সেশন",
      scheduleInterviewWith: "সাক্ষাৎকার নির্ধারণ করুন:",
      dateLabel: "তারিখ",
      timeLabel: "সময় (PST)",
      formatLabel: "সাক্ষাৎকারের বিন্যাস ও ফোকাস ক্ষেত্র",
      calendarInviteNotice: "ভিডিও কনফারেন্সিং লিঙ্ক এবং AST সিনট্যাক্স অডিট ডজিয়ার সহ একটি ক্যালেন্ডার আমন্ত্রণ স্বয়ংক্রিয়ভাবে পাঠানো হবে:",
      sendCalendarInvite: "ক্যালেন্ডার আমন্ত্রণ পাঠান",
      applicantsInPipeline: "পাইপলাইনে আবেদনকারী",
      viewAtsCandidates: "ATS প্রার্থী দেখুন",
      postNewJobTitle: "নতুন ইঞ্জিনিয়ারিং চাকরির পদ তৈরি করুন",
      postNewJobSubtitle: "যাচাইকৃত বিশ্ববিদ্যালয় ইঞ্জিনিয়ারিং শিক্ষার্থীদের জন্য নতুন পদ প্রকাশ করুন।",
    },
    candidate: {
      allDomains: "সকল ডোমেন",
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
      astScoreLabel: "AST ভেক্টর ম্যাচ স্কোর",
      verifiedRepoLabel: "যাচাইকৃত রিপোজিটরি",
      cleanAstBadge: "নিখুঁত AST",
      nodesLabel: "নোড:",
      safetyLabel: "নিরাপত্তা:",
      algorithmicDepthLabel: "অ্যালগোরিদমিক গভীরতা",
      recruiterReviewsLabel: "নিয়োগকারী পর্যালোচনা",
      atsBypassedLabel: "ATS ফিল্টার বাইপাস সম্পন্ন",
      profileHealthLabel: "প্রোফাইল স্বাস্থ্য",
      gapDetectedTitle: "১টি আর্কিটেকচারাল গ্যাপ চিহ্নিত",
      gapDetectedDesc: "র‍্যাফট কনসেনসাস স্প্লিট-ব্রেন কোরাম ফেইলিউর রিকভারি। আরও ৫টি টিয়ার-১ পদে সুযোগ পেতে ৪ ঘণ্টার AST স্যান্ডবক্স বেঞ্চমার্ক সম্পন্ন করুন।",
      launchSandboxBtn: "স্যান্ডবক্স চ্যালেঞ্জ শুরু করুন",
      allJobsMarketplaceTitle: "সকল ইঞ্জিনিয়ারিং চাকরির পদ",
      allJobsMarketplaceSubtitle: "যাচাইকৃত এন্টারপ্রাইজ রিক্রুটারদের পদসমূহ দেখুন। ম্যাচ শতকরা হার আপনার কোডের AST সিনট্যাক্স থেকে স্বয়ংক্রিয়ভাবে গণনাকৃত।",
      availablePositions: "উপলব্ধ পদসমূহ",
      searchJobsPlaceholder: "পদের নাম, কোম্পানির নাম বা প্রযুক্তি (যেমন Raft, eBPF, Go) দিয়ে খুঁজুন...",
      modelFilter: "কাজের ধরন:",
      allModels: "সকল",
      remote: "রিমোট",
      hybrid: "হাইব্রিড",
      onSite: "অন-সাইট",
      myApplicationsTitle: "আমার সক্রিয় আবেদন পাইপলাইন",
      myApplicationsSubtitle: "শীর্ষ প্রকৌশল প্রতিষ্ঠানসমূহে আপনার ডজিয়ারের সঠিক পর্যায় ট্র্যাক করুন।",
      inProgress: "চলমান আবেদন",
      statusFilter: "স্ট্যাটাস:",
      underReview: "পর্যালোচনাধীন",
      interviewScheduled: "সাক্ষাৎকার নির্ধারিত",
      offerExtended: "প্রস্তাবিত অফার",
      rejected: "অগ্রসর হচ্ছে না",
      targetRoleCol: "লক্ষ্য পদ ও কোম্পানি",
      companyCol: "কোম্পানি",
      appliedDateCol: "আবেদনের তারিখ",
      matchScoreCol: "ম্যাচ স্কোর",
      stageTimelineCol: "পর্যায় ও সময়রেখা",
      actionsTelemetryCol: "কার্যক্রম ও টেলিমেট্রি",
      noApplicationsFound: "কোনো আবেদন পাওয়া যায়নি",
      noApplicationsFoundDesc: "খোলা পদগুলি অন্বেষণ করুন এবং আপনার যাচাইকৃত গিটহাব কোডবেস দিয়ে আবেদন করুন।",
      browseMarketplaceBtn: "মার্কেটপ্লেস ব্রাউজ করুন",
      profileSetupTitle: "ম্যানুয়াল প্রোফাইল ও দক্ষতা সেটআপ",
      profileSetupSubtitle: "আপনার একাডেমিক যাচাইকরণ, প্রযুক্তিগত দক্ষতা, ক্রিপ্টোগ্রাফিক রিজিউমে ডজিয়ার এবং ডেভেলপার লিঙ্কসমূহ পরিচালনা করুন।",
      saveProfileBtn: "প্রোফাইল সংরক্ষণ করুন",
      profilePicture: "প্রোফাইল ছবি",
      uploadPhoto: "ছবি আপলোড",
      photoRequirements: "PNG, JPG বা WebP (সর্বোচ্চ ৫ মেগাবাইট)",
      resumeDropzoneTitle: "ক্রিপ্টোগ্রাফিক জীবনবৃত্তান্ত আপলোড করুন",
      resumeDropzoneSubtitle: "পিডিএফ ড্র্যাগ ও ড্রপ করুন বা ব্রাউজ করতে ক্লিক করুন",
      uploadedResume: "যাচাইকৃত জীবনবৃত্তান্ত আপলোড সম্পন্ন",
      replaceResume: "ফাইল প্রতিস্থাপন করুন",
      skillsTagManagerTitle: "দক্ষতা ও প্রযুক্তিসমূহ",
      addSkillBtn: "যোগ করুন",
      suggestedSkills: "প্রস্তাবিত কোর সিস্টেমস স্কিল (১-ক্লিকে যোগ করুন):",
      academicCredentialsTitle: "একাডেমিক তথ্য ও যোগ্যতা",
      universityName: "বিশ্ববিদ্যালয়ের নাম",
      degreeProgram: "ডিগ্রি প্রোগ্রাম",
      graduationYear: "স্নাতকের বছর",
      gpaScore: "জিপিএ স্কোর (ঐচ্ছিক)",
      verifiedEduDomainNotice: "SSO ইমেইল গেটওয়ের মাধ্যমে বিশ্ববিদ্যালয় যাচাইকৃত।",
      socialAndLinksTitle: "পেশাদার ও কোড লিঙ্কসমূহ",
      githubUsername: "গিটহাব ইউজারনেম",
      linkedinUrl: "লিঙ্কডইন প্রোফাইল ইউআরএল",
      personalPortfolio: "ব্যক্তিগত পোর্টফোলিও ইউআরএল",
      technicalBioTitle: "প্রযুক্তিগত সংক্ষিপ্ত বিবরণ ও গবেষণা",
      bioPlaceholder: "আপনার মূল সিস্টেমস প্রোগ্রামিং আগ্রহ, গবেষণা বা থিসিস প্রকল্পগুলো উল্লেখ করুন...",
      personalInfoTitle: "ক্যান্ডিডেট পরিচয় ও প্রাথমিক তথ্য",
      fullName: "পূর্ণ নাম",
      headline: "পেশাদার হেডলাইন / লক্ষ্য পদ",
      university: "অনুমোদিত বিশ্ববিদ্যালয়",
      degree: "ডিগ্রি প্রোগ্রাম",
      gradYear: "পাসের বছর",
      bio: "প্রযুক্তিগত পরিচিতি ও গবেষণার ক্ষেত্র",
      resumeParsed: "AST টোকেনের জন্য পার্স করা হয়েছে",
      professionalLinks: "যাচাইকৃত ডেভেলপার ও পেশাদার প্রোফাইল",
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
      createProfileTitle: "আপনার প্রোফাইল তৈরি করুন",
      createProfileSubtitle: "যাচাইকৃত গিটহাব কোড আর্কিটেকচারের ভিত্তিতে শীর্ষ পদে পৌঁছান।",
      orRegisterWithEmail: "অথবা ইমেইল দিয়ে নিবন্ধন করুন",
      fullNameLabel: "সম্পূর্ণ নাম",
      fullNamePlaceholder: "উদাঃ নাফিস আহমেদ বা সারা মিলার",
      candEmailLabel: "বিশ্ববিদ্যালয় বা প্রাতিষ্ঠানিক ইমেইল",
      recEmailLabel: "প্রাতিষ্ঠানিক কাজের ইমেইল",
      candEmailPlaceholder: "alex.chen@berkeley.edu",
      recEmailPlaceholder: "sarah.miller@scaleops.io",
      specializationLabel: "প্রধান বিশেষায়ন ট্র্যাক",
      companyLabel: "কোম্পানি ও নিয়োগকারী টিম",
      companyPlaceholder: "স্কেলঅপস ইনক • ভিপি অব ইঞ্জিনিয়ারিং",
      minCharacters: "ন্যূনতম ৮টি অক্ষর",
      termsAgreement: "আমি সেবার শর্তাবলী, গোপনীয়তা নীতি এবং রিড-অনলি AST কোড বিশ্লেষণ সম্মতিতে একমত।",
      createCandidateBtn: "ক্যান্ডিডেট অ্যাকাউন্ট তৈরি করুন",
      createRecruiterBtn: "নিয়োগকারী অ্যাকাউন্ট তৈরি করুন",
      creatingProfile: "প্রোফাইল তৈরি হচ্ছে...",
      returnHome: "হোমে ফিরুন",
      encryptedPortal: "২৫৬-বিট এনক্রিপ্টেড পোর্টাল",
      twoFactorAuth: "দ্বি-স্তরীয় যাচাইকরণ",
      encryptedBadge: "২৫৬-বিট এনক্রিপ্টেড",
      verifyEmailTitle: "আপনার ইমেইল যাচাই করুন",
      verifyEmailSubtitle: "আমরা একটি ৬-ডিজিটের ক্রিপ্টোগ্রাফিক কোড পাঠিয়েছি:",
      identityConfirmed: "পরিচয় নিশ্চিত হয়েছে! সেশন লোড হচ্ছে...",
      verifyingCode: "কোড যাচাই করা হচ্ছে...",
      verifiedBtn: "যাচাই সম্পন্ন",
      verifyEnterDashboard: "যাচাই করুন ও ড্যাশবোর্ডে প্রবেশ করুন",
      emailDeliveryNotice: "আপনার প্রাতিষ্ঠানিক ইমেইল ঠিকানায় একটি ৬-সংখ্যার ক্রিপ্টোগ্রাফিক যাচাইকরণ কোড পাঠানো হয়েছে।",
      didntReceiveCode: "কোড পাননি?",
      resendCodeIn: "পুনরায় কোড পাঠাতে বাকি",
      resendCodeBtn: "পুনরায় কোড পাঠান",
      dispatching: "পাঠানো হচ্ছে...",
      useDifferentMethod: "অন্য পদ্ধতিতে সাইন ইন করুন",
      returnToLogin: "লগইনে ফিরুন",
      soc2Gateway: "SOC-2 ভেরিফাইড গেটওয়ে",
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
