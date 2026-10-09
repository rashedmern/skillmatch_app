import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@/server/services/jobService";

/**
 * GET /api/applications
 * Retrieves candidate applications or recruiter pipeline from Supabase PostgreSQL.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const candidateEmail = searchParams.get("candidateEmail");
    const recruiterEmail = searchParams.get("recruiterEmail");

    if (candidateEmail) {
      const applications = await JobService.getCandidateApplications(candidateEmail);
      return NextResponse.json({ success: true, count: applications.length, data: applications }, { status: 200 });
    }

    const applicants = await JobService.getRecruiterApplications(recruiterEmail || undefined);
    return NextResponse.json({ success: true, count: applicants.length, data: applicants }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/applications error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications from Supabase database." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/applications
 * Submits a candidate job application and records stage audit history.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateEmail, jobId, matchScore, notes } = body;

    if (!candidateEmail || !jobId) {
      return NextResponse.json(
        { success: false, error: "Candidate email and job ID are required." },
        { status: 400 }
      );
    }

    const result = await JobService.submitApplication({
      candidateEmail,
      jobId,
      matchScore: typeof matchScore === "number" ? matchScore : undefined,
      notes,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[POST /api/applications error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit candidate application." },
      { status: 500 }
    );
  }
}
