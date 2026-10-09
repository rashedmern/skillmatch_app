import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@/server/services/jobService";

/**
 * GET /api/jobs
 * Search and retrieve live job postings with full relations from Supabase PostgreSQL.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const workModel = searchParams.get("workModel") || undefined;
    const status = searchParams.get("status") || undefined;
    const candidateEmail = searchParams.get("candidateEmail") || undefined;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

    const jobs = await JobService.getJobListings({
      search,
      workModel,
      status,
      candidateEmail,
      limit,
    });

    return NextResponse.json({ success: true, count: jobs.length, data: jobs }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/jobs error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job postings from Supabase database." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/jobs
 * Creates a new job posting in Supabase PostgreSQL with connected relations.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, location, workModel, description, skills } = body;

    if (!title || !location || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (title, location, description)." },
        { status: 400 }
      );
    }

    const newJob = await JobService.createJobPosting({
      title,
      team: body.team,
      location,
      workModel: workModel || "Hybrid",
      salary: body.salary,
      minSalary: body.minSalary,
      maxSalary: body.maxSalary,
      minMatch: body.minMatch,
      description,
      skills: Array.isArray(skills) ? skills : [],
      recruiterEmail: body.recruiterEmail,
      companyName: body.companyName,
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/jobs error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to publish job opening." },
      { status: 500 }
    );
  }
}
