/**
 * Job & Application Domain Business Logic Service
 * Orchestrates job posting lifecycle, full-text multi-criteria candidate search queries,
 * 1-Click candidate applications, and application stage audit histories
 * backed directly by live Supabase PostgreSQL via Prisma ORM.
 */

import { prisma } from "../db/client";

export interface JobFilterParams {
  search?: string;
  workModel?: string;
  domain?: string;
  status?: string;
  candidateEmail?: string;
  limit?: number;
}

export interface CreateJobInput {
  title: string;
  team?: string;
  location: string;
  workModel: "Remote" | "Hybrid" | "On-site";
  salary?: string;
  minSalary?: string;
  maxSalary?: string;
  minMatch?: number;
  description: string;
  skills: string[];
  recruiterEmail?: string;
  companyName?: string;
}

export interface SubmitApplicationInput {
  candidateEmail: string;
  jobId: string;
  matchScore?: number;
  notes?: string;
}

/**
 * Formats a Date to a human readable relative time string (e.g. "Just now", "2 days ago")
 */
function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } else if (diffDays >= 1) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours >= 1) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMin >= 1) {
    return `${diffMin} min ago`;
  }
  return "Just now";
}

/**
 * Maps database stage string to recruiter UI stage contract
 */
function mapToRecruiterStage(
  stage: string
): "New Applicant" | "Shortlisted" | "Interview Scheduled" | "Offer Stage" | "Rejected" {
  switch (stage) {
    case "Under Review":
      return "New Applicant";
    case "Assessment Passed":
    case "Shortlisted":
      return "Shortlisted";
    case "Interview Scheduled":
      return "Interview Scheduled";
    case "Offer Extended":
    case "Offer Stage":
      return "Offer Stage";
    case "Rejected":
      return "Rejected";
    default:
      return "New Applicant";
  }
}

export class JobService {
  /**
   * Retrieves all job postings from Supabase PostgreSQL,
   * joining company, recruiter, and job_skills relations with search query filtering.
   */
  static async getJobListings(filters: JobFilterParams = {}) {
    const { search, workModel, status, candidateEmail, limit } = filters;

    const whereClause: any = {};

    // 1. Status Filter
    if (status && status !== "ALL") {
      whereClause.status = { equals: status, mode: "insensitive" };
    }

    // 2. Work Model Filter
    if (workModel && workModel !== "All") {
      whereClause.work_model = { equals: workModel, mode: "insensitive" };
    }

    // 3. Search Query Filter across title, description, company name, and required skills
    if (search && search.trim().length > 0) {
      const q = search.trim();
      whereClause.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { company: { name: { contains: q, mode: "insensitive" } } },
        {
          job_skills: {
            some: {
              skill: {
                name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
      ];
    }

    const jobs = await prisma.jobPosting.findMany({
      where: whereClause,
      include: {
        company: true,
        recruiter: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        job_skills: {
          include: {
            skill: true,
          },
        },
        applications: {
          select: {
            id: true,
            candidate_id: true,
            candidate: {
              select: {
                user: { select: { email: true } },
              },
            },
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { created_at: "desc" },
      take: limit || 100,
    });

    const cleanCandidateEmail = candidateEmail ? candidateEmail.toLowerCase().trim() : null;

    // Map each Prisma model to frontend UI contract
    return jobs.map((job) => {
      const isApplied = cleanCandidateEmail
        ? job.applications.some(
            (app) => app.candidate?.user?.email?.toLowerCase().trim() === cleanCandidateEmail
          )
        : false;

      const salaryDisplay =
        job.min_salary && job.max_salary
          ? `${job.min_salary} - ${job.max_salary}`
          : job.min_salary || job.max_salary || "$185,000 - $210,000";

      const companyWords = job.company.name.split(" ");
      const logoText =
        companyWords.length > 1
          ? `${companyWords[0][0]}${companyWords[1][0]}`.toUpperCase()
          : job.company.name.slice(0, 2).toUpperCase();

      return {
        id: job.id,
        title: job.title,
        company: job.company.name,
        companySlug: job.company.slug,
        logoText,
        location: job.location,
        workModel: job.work_model as "Remote" | "Hybrid" | "On-site",
        domain: (job.team || "Distributed Systems") as
          | "Distributed Systems"
          | "Cloud & SRE"
          | "Database Engines"
          | "Kernel & Systems",
        team: job.team || "Infrastructure Engineering",
        salary: salaryDisplay,
        matchScore: Math.round(job.min_match_score || 90),
        minMatch: Math.round(job.min_match_score || 90),
        tags: job.job_skills.map((js) => js.skill.name),
        skills: job.job_skills.map((js) => js.skill.name),
        description: job.description,
        postedDate: formatRelativeTime(job.created_at),
        createdAt: job.created_at.toISOString(),
        status: job.status as "Active" | "Paused" | "Closed",
        applicantsCount: job._count?.applications || job.applications.length,
        isApplied,
        recruiter: {
          name: job.recruiter?.user?.name || "Talent Lead",
          email: job.recruiter?.user?.email || "recruiter@skillmatch.io",
          roleTitle: job.recruiter?.role_title || "Technical Recruiter",
        },
      };
    });
  }

  /**
   * Retrieves single job posting by ID with all relations.
   */
  static async getJobById(id: string) {
    const job = await prisma.jobPosting.findUnique({
      where: { id },
      include: {
        company: true,
        recruiter: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        job_skills: {
          include: {
            skill: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) return null;

    const salaryDisplay =
      job.min_salary && job.max_salary
        ? `${job.min_salary} - ${job.max_salary}`
        : job.min_salary || job.max_salary || "$185,000 - $210,000";

    const companyWords = job.company.name.split(" ");
    const logoText =
      companyWords.length > 1
        ? `${companyWords[0][0]}${companyWords[1][0]}`.toUpperCase()
        : job.company.name.slice(0, 2).toUpperCase();

    return {
      id: job.id,
      title: job.title,
      company: job.company.name,
      companySlug: job.company.slug,
      logoText,
      location: job.location,
      workModel: job.work_model as "Remote" | "Hybrid" | "On-site",
      domain: (job.team || "Distributed Systems") as
        | "Distributed Systems"
        | "Cloud & SRE"
        | "Database Engines"
        | "Kernel & Systems",
      team: job.team || "Infrastructure Engineering",
      salary: salaryDisplay,
      matchScore: Math.round(job.min_match_score || 90),
      minMatch: Math.round(job.min_match_score || 90),
      tags: job.job_skills.map((js) => js.skill.name),
      skills: job.job_skills.map((js) => js.skill.name),
      description: job.description,
      postedDate: formatRelativeTime(job.created_at),
      createdAt: job.created_at.toISOString(),
      status: job.status as "Active" | "Paused" | "Closed",
      applicantsCount: job._count?.applications || 0,
      recruiter: {
        name: job.recruiter?.user?.name || "Talent Lead",
        email: job.recruiter?.user?.email || "recruiter@skillmatch.io",
        roleTitle: job.recruiter?.role_title || "Technical Recruiter",
      },
    };
  }

  /**
   * Creates a new job posting in Supabase PostgreSQL,
   * automatically wiring relations to Company, RecruiterProfile, and Skill junction records.
   */
  static async createJobPosting(data: CreateJobInput) {
    // 1. Resolve Recruiter Profile & Company
    let recruiter: any = null;

    if (data.recruiterEmail) {
      recruiter = await prisma.recruiterProfile.findFirst({
        where: {
          user: { email: data.recruiterEmail.toLowerCase().trim() },
        },
        include: { company: true },
      });
    }

    if (!recruiter) {
      recruiter = await prisma.recruiterProfile.findFirst({
        include: { company: true },
      });
    }

    if (!recruiter) {
      // Create fallback company and recruiter profile if database has zero recruiters
      const fallbackCompany = await prisma.company.create({
        data: {
          name: data.companyName || "CloudScale Infrastructure Labs",
          slug: `cloudscale-${Date.now().toString(36)}`,
          industry: "Distributed Cloud Infrastructure",
          is_verified_partner: true,
        },
      });

      const fallbackUser = await prisma.user.create({
        data: {
          email: "recruiter.default@skillmatch.io",
          name: "Default Talent Lead",
          role: "recruiter",
          is_email_verified: true,
          recruiter_profile: {
            create: {
              company_id: fallbackCompany.id,
              role_title: "Lead Technical Recruiter",
              office_location: "San Francisco, CA",
            },
          },
        },
        include: {
          recruiter_profile: { include: { company: true } },
        },
      });

      recruiter = fallbackUser.recruiter_profile!;
    }

    // 2. Parse Salary range
    let minSalary = data.minSalary;
    let maxSalary = data.maxSalary;

    if (data.salary && (!minSalary || !maxSalary)) {
      const parts = data.salary.split("-").map((s) => s.trim());
      if (parts.length === 2) {
        minSalary = parts[0];
        maxSalary = parts[1];
      } else {
        minSalary = data.salary;
        maxSalary = data.salary;
      }
    }

    // 3. Create JobPosting in Supabase
    const newJob = await prisma.jobPosting.create({
      data: {
        company_id: recruiter.company_id,
        recruiter_id: recruiter.id,
        title: data.title.trim(),
        team: data.team?.trim() || "Core Infrastructure",
        location: data.location.trim(),
        work_model: data.workModel,
        min_salary: minSalary || "$185,000",
        max_salary: maxSalary || "$215,000",
        min_match_score: data.minMatch || 88.0,
        status: "Active",
        description: data.description.trim(),
      },
      include: {
        company: true,
      },
    });

    // 4. Link required skills in job_skills junction table
    const skillList = Array.isArray(data.skills) ? data.skills : [];
    for (const skillName of skillList) {
      const cleanSkill = skillName.trim();
      if (!cleanSkill) continue;

      const skillRecord = await prisma.skill.upsert({
        where: { name: cleanSkill },
        update: {},
        create: { name: cleanSkill, category: "Engineering" },
      });

      await prisma.jobSkill.create({
        data: {
          job_id: newJob.id,
          skill_id: skillRecord.id,
          is_mandatory: true,
          weight: 1.0,
        },
      });
    }

    return await this.getJobById(newJob.id);
  }

  /**
   * Toggles job status between 'Active' and 'Paused'
   */
  static async toggleJobStatus(jobId: string) {
    const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
    if (!job) throw new Error("Job posting not found");

    const newStatus = job.status === "Active" ? "Paused" : "Active";
    const updated = await prisma.jobPosting.update({
      where: { id: jobId },
      data: { status: newStatus },
      include: { company: true },
    });

    return updated;
  }

  /**
   * Deletes a job posting and cascade removes related job_skills and applications.
   */
  static async deleteJobPosting(jobId: string) {
    return await prisma.jobPosting.delete({
      where: { id: jobId },
    });
  }

  /**
   * Submits a candidate job application:
   * - Connects candidate profile
   * - Wires application to prisma.application
   * - Automatically creates initial audit record in prisma.applicationStageHistory
   */
  static async submitApplication(input: SubmitApplicationInput) {
    const cleanEmail = input.candidateEmail.toLowerCase().trim();

    // 1. Resolve or auto-provision Candidate Profile in Supabase
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { candidate_profile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: cleanEmail.split("@")[0].replace(".", " "),
          role: "candidate",
          auth_provider: "email",
          is_email_verified: true,
          candidate_profile: {
            create: {
              headline: "Distributed Systems Candidate",
              university: cleanEmail.includes("@")
                ? `${cleanEmail.split("@")[1].split(".")[0].toUpperCase()} University`
                : "Partner University",
              degree: "B.S. EECS ('26)",
              graduation_year: "2026",
            },
          },
        },
        include: { candidate_profile: true },
      });
    } else if (!user.candidate_profile) {
      await prisma.candidateProfile.create({
        data: {
          user_id: user.id,
          headline: "Distributed Systems Candidate",
          university: cleanEmail.includes("@")
            ? `${cleanEmail.split("@")[1].split(".")[0].toUpperCase()} University`
            : "Partner University",
          degree: "B.S. EECS ('26)",
          graduation_year: "2026",
        },
      });
      user = await prisma.user.findUnique({
        where: { id: user.id },
        include: { candidate_profile: true },
      });
    }

    const candidateProfileId = user!.candidate_profile!.id;

    // 2. Prevent duplicate active submissions
    const existingApplication = await prisma.application.findFirst({
      where: {
        candidate_id: candidateProfileId,
        job_id: input.jobId,
      },
      include: {
        stage_history: { orderBy: { changed_at: "desc" } },
        job: { include: { company: true } },
      },
    });

    if (existingApplication) {
      return {
        success: true,
        isDuplicate: true,
        application: existingApplication,
        message: "Application already on file for this opening.",
      };
    }

    // 3. Create Application & Initial Stage Audit Record in atomic transaction
    const application = await prisma.application.create({
      data: {
        candidate_id: candidateProfileId,
        job_id: input.jobId,
        match_score: input.matchScore || 95.0,
        stage: "Under Review",
        stage_history: {
          create: [
            {
              from_stage: null,
              to_stage: "Under Review",
              notes: input.notes || "Initial application submitted via SkillMatch 1-Click Apply",
            },
          ],
        },
      },
      include: {
        stage_history: { orderBy: { changed_at: "desc" } },
        job: { include: { company: true } },
        candidate: { include: { user: true } },
      },
    });

    return {
      success: true,
      isDuplicate: false,
      application,
      message: "Application submitted successfully with audit stage history recorded.",
    };
  }

  /**
   * Retrieves all applications submitted by a specific candidate.
   */
  static async getCandidateApplications(candidateEmail: string) {
    const cleanEmail = candidateEmail.toLowerCase().trim();

    const applications = await prisma.application.findMany({
      where: {
        candidate: {
          user: { email: cleanEmail },
        },
      },
      include: {
        job: {
          include: { company: true },
        },
        stage_history: {
          orderBy: { changed_at: "desc" },
        },
      },
      orderBy: { applied_at: "desc" },
    });

    return applications.map((app) => {
      const salaryDisplay =
        app.job.min_salary && app.job.max_salary
          ? `${app.job.min_salary} - ${app.job.max_salary}`
          : app.job.min_salary || app.job.max_salary || "$185,000 - $210,000";

      const latestAuditNote =
        app.stage_history[0]?.notes || "Dossier under review by engineering recruiting lead";

      return {
        id: app.id,
        jobId: app.job_id,
        company: app.job.company.name,
        role: app.job.title,
        location: `${app.job.location} (${app.job.work_model})`,
        salary: salaryDisplay,
        appliedDate: formatRelativeTime(app.applied_at),
        matchScore: Math.round(app.match_score),
        status: app.stage as
          | "Interview Scheduled"
          | "Under Review"
          | "Assessment Passed"
          | "Offer Extended",
        nextStep: latestAuditNote,
        stageHistory: app.stage_history.map((h) => ({
          fromStage: h.from_stage,
          toStage: h.to_stage,
          notes: h.notes,
          changedAt: h.changed_at.toISOString(),
        })),
      };
    });
  }

  /**
   * Retrieves candidate applications for recruiter talent pipeline views.
   */
  static async getRecruiterApplications(recruiterEmail?: string) {
    const whereClause: any = {};

    if (recruiterEmail) {
      whereClause.job = {
        recruiter: {
          user: { email: recruiterEmail.toLowerCase().trim() },
        },
      };
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        candidate: {
          include: {
            user: true,
            ast_metrics: {
              orderBy: { overall_score: "desc" },
              take: 1,
            },
          },
        },
        job: {
          include: { company: true },
        },
        stage_history: {
          orderBy: { changed_at: "desc" },
        },
      },
      orderBy: { applied_at: "desc" },
    });

    return applications.map((app) => {
      const candUser = app.candidate.user;
      const name = candUser.name || "Candidate";
      const nameParts = name.split(" ");
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
          : name.slice(0, 2).toUpperCase();

      const topMetric = app.candidate.ast_metrics[0];
      const repoDisplay = topMetric?.repository_url
        ? topMetric.repository_url.replace("https://github.com/", "")
        : "distributed-systems/core";

      return {
        id: app.id,
        candidateProfileId: app.candidate_id,
        name,
        initials,
        university: app.candidate.university || "Partner University",
        degree: app.candidate.degree || "B.S. EECS ('26)",
        email: candUser.email,
        matchScore: Number(app.match_score.toFixed(1)),
        astNodes: topMetric?.nodes_analyzed || 14200,
        highlightRepo: repoDisplay,
        jobId: app.job_id,
        jobTitle: app.job.title,
        appliedDate: formatRelativeTime(app.applied_at),
        stage: mapToRecruiterStage(app.stage),
        stageHistory: app.stage_history.map((h) => ({
          fromStage: h.from_stage,
          toStage: h.to_stage,
          notes: h.notes,
          changedAt: h.changed_at.toISOString(),
        })),
      };
    });
  }

  /**
   * Updates application stage and appends audit trail entry into prisma.applicationStageHistory.
   */
  static async updateApplicationStage(
    applicationId: string,
    toStage: string,
    notes?: string
  ) {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!app) {
      throw new Error(`Application ${applicationId} not found`);
    }

    const fromStage = app.stage;

    // Transactionally update status and append history audit
    return await prisma.$transaction([
      prisma.applicationStageHistory.create({
        data: {
          application_id: applicationId,
          from_stage: fromStage,
          to_stage: toStage,
          notes: notes || `Stage advanced from ${fromStage} to ${toStage}`,
        },
      }),
      prisma.application.update({
        where: { id: applicationId },
        data: { stage: toStage },
        include: {
          stage_history: { orderBy: { changed_at: "desc" } },
        },
      }),
    ]);
  }
}
