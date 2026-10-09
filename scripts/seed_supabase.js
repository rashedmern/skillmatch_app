/**
 * Seed Script for Supabase PostgreSQL Database
 * Populates all 14 entities according to the ER and Relational Schema diagrams.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding on Supabase...");

  // 1. Clean existing records (in reverse dependency order)
  await prisma.applicationStageHistory.deleteMany();
  await prisma.application.deleteMany();
  await prisma.jobSkill.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.trackSkill.deleteMany();
  await prisma.cseTrack.deleteMany();
  await prisma.astMetric.deleteMany();
  await prisma.candidateSkill.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.recruiterProfile.deleteMany();
  await prisma.candidateProfile.deleteMany();
  await prisma.company.deleteMany();
  await prisma.session.deleteMany();
  await prisma.otpToken.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleared existing data.");

  // 2. Create Companies
  const scaleOps = await prisma.company.create({
    data: {
      name: "ScaleOps Inc.",
      slug: "scaleops",
      domain: "scaleops.io",
      industry: "Distributed Cloud Infrastructure & Databases",
      is_verified_partner: true,
    },
  });

  const cloudScale = await prisma.company.create({
    data: {
      name: "CloudScale Infrastructure Labs",
      slug: "cloudscale",
      domain: "cloudscale.io",
      industry: "Low-Level Networking & Observability",
      is_verified_partner: true,
    },
  });

  const veritasCloud = await prisma.company.create({
    data: {
      name: "Veritas Cloud",
      slug: "veritas",
      domain: "veritascloud.io",
      industry: "Cloud & Site Reliability Engineering",
      is_verified_partner: true,
    },
  });

  const neuralFlow = await prisma.company.create({
    data: {
      name: "NeuralFlow",
      slug: "neuralflow",
      domain: "neuralflow.ai",
      industry: "High Performance Kernel Systems",
      is_verified_partner: true,
    },
  });

  console.log("✅ Companies created.");

  // 3. Create Skills
  const skillNames = [
    { name: "Go", category: "Language" },
    { name: "Distributed Systems", category: "Architecture" },
    { name: "Raft Consensus", category: "Consensus" },
    { name: "Concurrency", category: "Systems" },
    { name: "Linux Kernel", category: "OS" },
    { name: "PostgreSQL Internals", category: "Database" },
    { name: "TypeScript", category: "Language" },
    { name: "React 19", category: "Frontend" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "C++", category: "Language" },
    { name: "eBPF", category: "Systems" },
    { name: "DPDK", category: "Networking" },
    { name: "Rust", category: "Language" },
    { name: "gRPC", category: "Networking" },
    { name: "RocksDB", category: "Storage" },
  ];

  const skillMap = {};
  for (const s of skillNames) {
    const created = await prisma.skill.create({ data: s });
    skillMap[s.name] = created.id;
  }
  console.log(`✅ ${skillNames.length} Skills created.`);

  // 4. Create CSE Tracks & Track Skills
  const track1 = await prisma.cseTrack.create({
    data: {
      title: "Distributed Systems & Infrastructure",
      category: "Backend & Systems",
      icon_name: "Server",
      benchmark_metric: "p99 Tail Latency & Consensus Throughput",
    },
  });

  await prisma.trackSkill.createMany({
    data: [
      { track_id: track1.id, skill_id: skillMap["Go"], priority: 1 },
      { track_id: track1.id, skill_id: skillMap["Distributed Systems"], priority: 1 },
      { track_id: track1.id, skill_id: skillMap["Raft Consensus"], priority: 2 },
      { track_id: track1.id, skill_id: skillMap["gRPC"], priority: 3 },
    ],
  });

  const track2 = await prisma.cseTrack.create({
    data: {
      title: "Linux Kernel & Low-Level Systems",
      category: "Systems & OS",
      icon_name: "Cpu",
      benchmark_metric: "Zero-Copy Packet Rate & Cache Locality",
    },
  });

  await prisma.trackSkill.createMany({
    data: [
      { track_id: track2.id, skill_id: skillMap["C++"], priority: 1 },
      { track_id: track2.id, skill_id: skillMap["Linux Kernel"], priority: 1 },
      { track_id: track2.id, skill_id: skillMap["eBPF"], priority: 2 },
    ],
  });

  console.log("✅ CSE Tracks and TrackSkills created.");

  // 5. Create Recruiter Users & RecruiterProfiles
  const recruiterUser1 = await prisma.user.create({
    data: {
      email: "s.jenkins@cloudscale.io",
      name: "Sarah Jenkins",
      role: "recruiter",
      auth_provider: "email",
      is_email_verified: true,
      recruiter_profile: {
        create: {
          company_id: cloudScale.id,
          role_title: "Lead Systems & Infrastructure Recruiter",
          office_location: "San Francisco, CA (HQ)",
        },
      },
    },
    include: { recruiter_profile: true },
  });

  const recruiterUser2 = await prisma.user.create({
    data: {
      email: "sarah.miller@scaleops.io",
      name: "Sarah Miller",
      role: "recruiter",
      auth_provider: "email",
      is_email_verified: true,
      recruiter_profile: {
        create: {
          company_id: scaleOps.id,
          role_title: "Technical Talent Lead",
          office_location: "San Francisco, CA",
        },
      },
    },
    include: { recruiter_profile: true },
  });

  console.log("✅ Recruiters created.");

  // 6. Create Candidate Users, CandidateProfiles, Skills & AST Metrics
  const alexUser = await prisma.user.create({
    data: {
      email: "alex.chen@berkeley.edu",
      name: "Alex Chen",
      role: "candidate",
      auth_provider: "google",
      is_email_verified: true,
      candidate_profile: {
        create: {
          headline: "Distributed Systems & Infrastructure Engineer",
          university: "UC Berkeley",
          degree: "B.S. Electrical Engineering & Computer Sciences",
          graduation_year: "2026",
          github_username: "alexchen-dev",
          linkedin_url: "https://linkedin.com/in/alexchen-dev",
          portfolio_url: "https://alexchen.berkeley.edu",
          resume_file_url: "https://skillmatch.io/resumes/Alex_Chen_UCBerkeley_EECS_2026.pdf",
          resume_sha256: "sha256-8f4b23c91e7d80aa2345bc79ef0142de56a89c4456b21c43d99e01",
        },
      },
    },
    include: { candidate_profile: true },
  });

  const alexProfileId = alexUser.candidate_profile.id;

  // Add Candidate Skills for Alex
  const alexSkills = ["Go", "Distributed Systems", "Raft Consensus", "Concurrency", "Linux Kernel", "PostgreSQL Internals", "TypeScript", "Docker"];
  for (const sk of alexSkills) {
    if (skillMap[sk]) {
      await prisma.candidateSkill.create({
        data: {
          candidate_id: alexProfileId,
          skill_id: skillMap[sk],
          proficiency: "Advanced",
          is_verified: true,
          verified_at: new Date(),
        },
      });
    }
  }

  // Add AST Metric for Alex
  await prisma.astMetric.create({
    data: {
      candidate_id: alexProfileId,
      repository_url: "https://github.com/alexchen-dev/distributed-kv-store",
      commit_hash: "a4f81c9b20e14d8a",
      nodes_analyzed: 14280,
      overall_score: 95.8,
      algorithmic_score: 96.2,
      concurrency_score: 98.4,
      memory_safety_score: 94.0,
    },
  });

  // Candidate 2: Elena Rostova
  const elenaUser = await prisma.user.create({
    data: {
      email: "elena.r@stanford.edu",
      name: "Elena Rostova",
      role: "candidate",
      auth_provider: "github",
      is_email_verified: true,
      candidate_profile: {
        create: {
          headline: "Systems & Consensus Protocols Researcher",
          university: "Stanford University",
          degree: "M.S. Computer Science ('25)",
          graduation_year: "2025",
          github_username: "elena-rostova",
        },
      },
    },
    include: { candidate_profile: true },
  });

  await prisma.astMetric.create({
    data: {
      candidate_id: elenaUser.candidate_profile.id,
      repository_url: "https://github.com/elena-rostova/raft-consensus-engine",
      commit_hash: "b19df3e48810ca23",
      nodes_analyzed: 18400,
      overall_score: 96.1,
      algorithmic_score: 97.0,
      concurrency_score: 96.5,
      memory_safety_score: 95.2,
    },
  });

  console.log("✅ Candidates, Profiles, Skills and AST Metrics created.");

  // 7. Create Job Postings & JobSkills
  const job1 = await prisma.jobPosting.create({
    data: {
      company_id: scaleOps.id,
      recruiter_id: recruiterUser2.recruiter_profile.id,
      title: "Staff Distributed Systems Engineer",
      team: "Core Consensus & Storage Engine",
      location: "San Francisco, CA",
      work_model: "Hybrid",
      min_salary: "$185,000",
      max_salary: "$210,000",
      min_match_score: 90.0,
      status: "Active",
      description: "Architect high-throughput log replication protocols, Raft cluster failover semantics, and telemetry pipelines for mission-critical cloud backbones.",
    },
  });

  await prisma.jobSkill.createMany({
    data: [
      { job_id: job1.id, skill_id: skillMap["Go"], is_mandatory: true, weight: 1.0 },
      { job_id: job1.id, skill_id: skillMap["Raft Consensus"], is_mandatory: true, weight: 1.2 },
      { job_id: job1.id, skill_id: skillMap["Distributed Systems"], is_mandatory: true, weight: 1.0 },
      { job_id: job1.id, skill_id: skillMap["gRPC"], is_mandatory: false, weight: 0.8 },
    ],
  });

  const job2 = await prisma.jobPosting.create({
    data: {
      company_id: cloudScale.id,
      recruiter_id: recruiterUser1.recruiter_profile.id,
      title: "Linux Kernel & eBPF Telemetry Specialist",
      team: "Low-Level Networking & Observability",
      location: "San Francisco, CA",
      work_model: "On-site",
      min_salary: "$185,000",
      max_salary: "$215,000",
      min_match_score: 88.0,
      status: "Active",
      description: "Write high-performance eBPF probes for kernel networking hooks. Trace socket packet drops and compute lock contention metrics.",
    },
  });

  await prisma.jobSkill.createMany({
    data: [
      { job_id: job2.id, skill_id: skillMap["C++"], is_mandatory: true, weight: 1.0 },
      { job_id: job2.id, skill_id: skillMap["Linux Kernel"], is_mandatory: true, weight: 1.2 },
      { job_id: job2.id, skill_id: skillMap["eBPF"], is_mandatory: true, weight: 1.1 },
    ],
  });

  const job3 = await prisma.jobPosting.create({
    data: {
      company_id: veritasCloud.id,
      recruiter_id: recruiterUser1.recruiter_profile.id,
      title: "Core Platform Infrastructure Engineer",
      team: "Cloud Automation & SRE",
      location: "New York, NY",
      work_model: "Hybrid",
      min_salary: "$175,000",
      max_salary: "$195,000",
      min_match_score: 90.0,
      status: "Active",
      description: "Design automated multi-region cluster topologies, zero-downtime control planes, and global service mesh networking.",
    },
  });

  console.log("✅ Job Postings & JobSkills created.");

  // 8. Create Applications & Stage History
  const app1 = await prisma.application.create({
    data: {
      candidate_id: alexProfileId,
      job_id: job1.id,
      match_score: 95.0,
      stage: "Interview Scheduled",
      stage_history: {
        create: [
          { from_stage: null, to_stage: "Under Review", notes: "Dossier dispatched to hiring lead" },
          { from_stage: "Under Review", to_stage: "Assessment Passed", notes: "AST score verified in 98th percentile" },
          { from_stage: "Assessment Passed", to_stage: "Interview Scheduled", notes: "Technical deep-dive scheduled" },
        ],
      },
    },
  });

  const app2 = await prisma.application.create({
    data: {
      candidate_id: elenaUser.candidate_profile.id,
      job_id: job1.id,
      match_score: 96.1,
      stage: "Under Review",
      stage_history: {
        create: [
          { from_stage: null, to_stage: "Under Review", notes: "Candidate application received" },
        ],
      },
    },
  });

  console.log("✅ Applications & Stage History created.");
  console.log("\n🎉 ALL 14 TABLES SUCCESSFULLY POPULATED ON SUPABASE!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
