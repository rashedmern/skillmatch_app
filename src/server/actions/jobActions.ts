"use server";

/**
 * Server Actions: Job Postings, Search, Applications & ATS Pipeline
 * Dedicated Next.js Server Actions with strict execution boundaries,
 * connecting directly to live Supabase PostgreSQL via Prisma ORM.
 */

import {
  JobService,
  JobFilterParams,
  CreateJobInput,
  SubmitApplicationInput,
} from "../services/jobService";

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Fetches all job postings with full relational joins
 * (Company, Recruiter, JobSkills) and multi-field search filtering.
 */
export async function getJobsAction(
  filters: JobFilterParams = {}
): Promise<ActionResponse<any[]>> {
  try {
    const jobs = await JobService.getJobListings(filters);
    return { success: true, data: jobs };
  } catch (error) {
    console.error("[getJobsAction error]:", error);
    return {
      success: false,
      error: "Failed to retrieve job listings from database.",
    };
  }
}

/**
 * Server Action: Fetches single job posting by ID.
 */
export async function getJobByIdAction(
  jobId: string
): Promise<ActionResponse<any>> {
  try {
    const job = await JobService.getJobById(jobId);
    if (!job) {
      return { success: false, error: "Job posting not found." };
    }
    return { success: true, data: job };
  } catch (error) {
    console.error("[getJobByIdAction error]:", error);
    return {
      success: false,
      error: "Failed to retrieve job details from database.",
    };
  }
}

/**
 * Server Action: Creates a new job posting with company, recruiter, and skills relations.
 */
export async function createJobAction(
  input: CreateJobInput
): Promise<ActionResponse<any>> {
  try {
    if (!input.title || !input.location || !input.description) {
      return {
        success: false,
        error: "Job title, location, and description are required.",
      };
    }

    const created = await JobService.createJobPosting(input);
    return { success: true, data: created };
  } catch (error) {
    console.error("[createJobAction error]:", error);
    return {
      success: false,
      error: "Failed to publish job opening to database.",
    };
  }
}

/**
 * Server Action: Toggles job posting between Active and Paused.
 */
export async function toggleJobStatusAction(
  jobId: string
): Promise<ActionResponse<any>> {
  try {
    const updated = await JobService.toggleJobStatus(jobId);
    return { success: true, data: updated };
  } catch (error) {
    console.error("[toggleJobStatusAction error]:", error);
    return {
      success: false,
      error: "Failed to toggle job status.",
    };
  }
}

/**
 * Server Action: Deletes a job posting from Supabase PostgreSQL.
 */
export async function deleteJobAction(
  jobId: string
): Promise<ActionResponse<{ deletedId: string }>> {
  try {
    await JobService.deleteJobPosting(jobId);
    return { success: true, data: { deletedId: jobId } };
  } catch (error) {
    console.error("[deleteJobAction error]:", error);
    return {
      success: false,
      error: "Failed to delete job posting.",
    };
  }
}

/**
 * Server Action: Candidate 1-Click Application Submission.
 * Creates Application record in prisma.application and records audit history in prisma.applicationStageHistory.
 */
export async function applyJobAction(
  input: SubmitApplicationInput
): Promise<ActionResponse<any>> {
  try {
    if (!input.candidateEmail || !input.jobId) {
      return {
        success: false,
        error: "Candidate email and job ID are required to submit an application.",
      };
    }

    const result = await JobService.submitApplication(input);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("[applyJobAction error]:", error);
    return {
      success: false,
      error: "Failed to submit candidate application.",
    };
  }
}

/**
 * Server Action: Retrieves all active applications for candidate dashboard.
 */
export async function getCandidateApplicationsAction(
  candidateEmail: string
): Promise<ActionResponse<any[]>> {
  try {
    if (!candidateEmail) {
      return { success: false, error: "Candidate email is required." };
    }

    const apps = await JobService.getCandidateApplications(candidateEmail);
    return { success: true, data: apps };
  } catch (error) {
    console.error("[getCandidateApplicationsAction error]:", error);
    return {
      success: false,
      error: "Failed to fetch candidate applications.",
    };
  }
}

/**
 * Server Action: Retrieves talent pipeline candidate applications for recruiter dashboard.
 */
export async function getRecruiterApplicationsAction(
  recruiterEmail?: string
): Promise<ActionResponse<any[]>> {
  try {
    const applicants = await JobService.getRecruiterApplications(recruiterEmail);
    return { success: true, data: applicants };
  } catch (error) {
    console.error("[getRecruiterApplicationsAction error]:", error);
    return {
      success: false,
      error: "Failed to fetch applicants pipeline.",
    };
  }
}

/**
 * Server Action: Updates candidate application stage and creates audit record in prisma.applicationStageHistory.
 */
export async function updateCandidateStageAction(
  applicationId: string,
  toStage: string,
  notes?: string
): Promise<ActionResponse<any>> {
  try {
    if (!applicationId || !toStage) {
      return {
        success: false,
        error: "Application ID and destination stage are required.",
      };
    }

    const result = await JobService.updateApplicationStage(applicationId, toStage, notes);
    return { success: true, data: result };
  } catch (error) {
    console.error("[updateCandidateStageAction error]:", error);
    return {
      success: false,
      error: "Failed to transition candidate stage.",
    };
  }
}
