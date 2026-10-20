/**
 * Generator script for SkillMatch Academic Project Proposal (.docx)
 * Strictly structured to span approximately 6 pages with professional styling.
 */

const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  ShadingType,
} = require("docx");

// Color Palette - Oceanic Intelligence
const PRIMARY_TEAL = "004049";      // #004049 Deep Teal
const BRAND_TEAL = "095964";        // #095964 Primary Container
const SECONDARY_MINT = "0A887D";    // #0A887D Technical Mint
const ACCENT_CORAL = "E42520";      // #E42520 Gap Coral
const TEXT_DARK = "1A202C";         // #1A202C Dark Charcoal
const TEXT_MUTED = "4A5568";        // #4A5568 Slate Muted
const BG_SURFACE = "F8F9FF";        // #F8F9FF Light Canvas
const BORDER_COLOR = "CBD5E1";      // #CBD5E1 Hairline Border

// Utility helpers for consistent typography
function createHeading1(text, hasPageBreak = false) {
  const children = [];
  if (hasPageBreak) {
    children.push(new PageBreak());
  }
  children.push(
    new TextRun({
      text: text,
      bold: true,
      size: 32, // 16pt
      color: PRIMARY_TEAL,
      font: "Calibri",
    })
  );
  return new Paragraph({
    children,
    spacing: { before: 280, after: 120 },
    heading: HeadingLevel.HEADING_1,
  });
}

function createHeading2(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 26, // 13pt
        color: BRAND_TEAL,
        font: "Calibri",
      }),
    ],
    spacing: { before: 200, after: 80 },
    heading: HeadingLevel.HEADING_2,
  });
}

function createHeading3(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22, // 11pt
        color: SECONDARY_MINT,
        font: "Calibri",
      }),
    ],
    spacing: { before: 140, after: 60 },
    heading: HeadingLevel.HEADING_3,
  });
}

function createBodyParagraph(text, isJustified = true) {
  return new Paragraph({
    alignment: isJustified ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
    children: [
      new TextRun({
        text: text,
        size: 21, // 10.5pt
        color: TEXT_DARK,
        font: "Calibri",
      }),
    ],
    spacing: { after: 120, line: 260 }, // ~1.15 line spacing
  });
}

function createBulletItem(boldPrefix, restOfText) {
  return new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({
        text: boldPrefix + " ",
        bold: true,
        size: 21,
        color: BRAND_TEAL,
        font: "Calibri",
      }),
      new TextRun({
        text: restOfText,
        size: 21,
        color: TEXT_DARK,
        font: "Calibri",
      }),
    ],
    spacing: { after: 80, line: 250 },
  });
}

function createTableCell(content, isHeader = false, widthPercent = 25, bgColor = null) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: {
      type: ShadingType.CLEAR,
      fill: bgColor ? bgColor : isHeader ? "E6F4F6" : "FFFFFF",
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      left: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
    },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: Array.isArray(content) ? content : [
      new Paragraph({
        children: [
          new TextRun({
            text: content,
            bold: isHeader,
            size: isHeader ? 20 : 19,
            color: isHeader ? PRIMARY_TEAL : TEXT_DARK,
            font: "Calibri",
          }),
        ],
        spacing: { before: 20, after: 20 },
      }),
    ],
  });
}

async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 21, color: TEXT_DARK },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              bottom: 1440, // 1 inch
              left: 1440,   // 1 inch
              right: 1440,  // 1 inch
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "SkillMatch Career Platform — Academic Project Proposal & Specification",
                    size: 16,
                    color: TEXT_MUTED,
                    font: "Calibri",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Page ",
                    size: 18,
                    color: TEXT_MUTED,
                    font: "Calibri",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    bold: true,
                    color: BRAND_TEAL,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: " of ",
                    size: 18,
                    color: TEXT_MUTED,
                    font: "Calibri",
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 18,
                    color: TEXT_MUTED,
                    font: "Calibri",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // ==========================================
          // COVER HEADER / TITLE BLOCK
          // ==========================================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PROJECT PROPOSAL & SYSTEM SPECIFICATION",
                bold: true,
                size: 38, // 19pt
                color: PRIMARY_TEAL,
                font: "Calibri",
              }),
            ],
            spacing: { before: 100, after: 60 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Student Skill-Based Internship Matching and Recruitment Management System",
                bold: true,
                size: 26, // 13pt
                color: BRAND_TEAL,
                font: "Calibri",
              }),
            ],
            spacing: { after: 40 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Platform Codename: SkillMatch (skillmatch_app)  •  Academic Session 2026",
                italics: true,
                size: 20,
                color: TEXT_MUTED,
                font: "Calibri",
              }),
            ],
            spacing: { after: 180 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Document Type:", true, 25, "E6F4F6"),
                  createTableCell("Academic Project Proposal & SRS Specification", false, 75, "F8F9FF"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Engineering Standard:", true, 25, "E6F4F6"),
                  createTableCell("IEEE Std 830-1998 Aligned Software Requirements Specification", false, 75, "FFFFFF"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Architectural Stack:", true, 25, "E6F4F6"),
                  createTableCell("Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4", false, 75, "F8F9FF"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Security & Auth Gateway:", true, 25, "E6F4F6"),
                  createTableCell("NextAuth.js v5 (Google/GitHub OAuth), Resend Real-Time Cryptographic OTP", false, 75, "FFFFFF"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Target Audience:", true, 25, "E6F4F6"),
                  createTableCell("Academic Examination Committee, Technical Advisory Board, Enterprise Hiring Leads", false, 75, "F8F9FF"),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 180 } }),

          // ==========================================
          // SECTION 1: INTRODUCTION (~2 PAGES)
          // ==========================================
          createHeading1("1. Introduction"),

          createHeading2("1.1 Background & Industry Context"),
          createBodyParagraph(
            "The contemporary software engineering industry is undergoing an unprecedented structural transformation. Driven by rapid advances in distributed computing, cloud-native microservices, systems-level kernel engineering, and artificial intelligence, the modern enterprise demands early-career software engineers who possess practical, verifiable engineering competencies rather than mere textbook knowledge. Concurrently, academic institutions and engineering faculties worldwide graduate hundreds of thousands of Computer Science & Engineering (CSE) students each year, each eager to transition from academic study into high-impact industrial internships and foundational software engineering positions."
          ),
          createBodyParagraph(
            "Despite this historic alignment of talent supply and industry demand, the transitional conduit connecting academia to industry remains severely impaired. The conventional recruitment pipeline—established decades ago for generalist corporate hiring—relies almost exclusively on static, text-based PDF resumes as proxies for human software development capability. In the modern technical domain, this document-centric approach has collapsed under its own weight. Software engineering is fundamentally an empirical discipline; it cannot be faithfully represented or evaluated through static text bullet points."
          ),
          createBodyParagraph(
            "Modern computer science students do not merely complete theoretical homework. Talented undergraduate and graduate students actively construct distributed systems, develop high-concurrency networked services in Go and Rust, experiment with Linux kernel telemetry using eBPF probes, architect modular full-stack web applications with modern libraries like React 19, and maintain active repositories on decentralized version control platforms such as GitHub. However, when these students submit their credentials into traditional corporate hiring portals, years of genuine source code architecture, test coverage discipline, and algorithmic optimization are compressed into an unverified, two-page static text file."
          ),
          createBodyParagraph(
            "On the employer side, technical recruiters and engineering managers face an overwhelming influx of unvetted applications. Powered by automated job-application scripts and AI resume generation tools, candidates now broadcast hundreds of identical applications to open listings with zero marginal effort. To cope with this deluge, corporate human resources departments deploy automated Applicant Tracking Systems (ATS) that filter incoming resumes using superficial keyword-matching heuristics. This produces a catastrophic market failure: over 70% of qualified engineering candidates are rejected before a human engineer ever sees their dossier, while hiring teams expend hundreds of senior engineering hours screening candidates who optimized their resumes with buzzwords but lack basic coding proficiency."
          ),

          createHeading2("1.2 The Paradigm Shift: Empirical Skill Verification"),
          createBodyParagraph(
            "The SkillMatch platform is conceived and engineered to resolve this market failure by establishing a new paradigm in technical recruitment: replacing self-reported, unverified text claims with empirical, codebase-driven skill verification and cryptographic institutional identity attestation. Instead of asking students to describe what they know on paper, SkillMatch connects directly to students' public codebases via GitHub and inspects the authentic Abstract Syntax Tree (AST) of their source code."
          ),
          createBodyParagraph(
            "By parsing syntactic structures rather than text strings, SkillMatch analyzes genuine programming mechanics: concurrent channel synchronization and mutex locking in Go, manual memory management and RAII patterns in C++, component decomposition and server-action boundaries in React 19, database transaction boundaries, and unit test suite presence. SkillMatch translates these empirical artifacts into a multi-dimensional technical capability graph, which is matched algorithmically against production engineering stack requirements provided by hiring teams. This eliminates resume keyword gaming and establishes an objective, transparent bridge between verified student talent and engineering teams."
          ),

          createHeading2("1.3 Project Scope & System Boundaries"),
          createBodyParagraph(
            "SkillMatch is engineered as an enterprise-grade, full-stack web application running on the Next.js 16 App Router framework. The functional scope of the project encompasses the complete lifecycle of early-career technical internship recruitment:"
          ),
          createBulletItem(
            "Institutional Identity Governance:",
            "Enforcement of strict academic integrity by restricting candidate accounts to accredited university domains (.edu, .edu.*, .ac.uk) through RFC-compliant regular expression evaluation and Google Workspace institutional Single Sign-On (SSO)."
          ),
          createBulletItem(
            "Cryptographic Two-Factor Authentication:",
            "Guaranteeing account authenticity and eliminating automated bot registrations through a real-time, 6-digit numeric One-Time Password (OTP) challenge dispatched via the Resend REST API, protected across serverless lambda instances using HMAC-SHA256 signed tamper-proof challenge cookies."
          ),
          createBulletItem(
            "Developer Handshake & Codebase Inspection:",
            "Secure OAuth 2.0 integration with GitHub under the official @SkillMatchOfficial organization, enabling students to authorize read-only inspection of their public repositories without exposing private repositories or storing proprietary source code on platform servers."
          ),
          createBulletItem(
            "Role-Isolated Dedicated Portals:",
            "Dual workspaces for Candidates (identity dossier, 1-Click Instant Apply, real-time match telemetry, skill-gap alerts, status tracker) and Recruiters (multi-field vacancy publisher, minimum AST match threshold sliders, Kanban ATS pipeline, AST node complexity inspector, technical interview scheduler)."
          ),
          createBulletItem(
            "Zero-Layout-Shift Web Ergonomics:",
            "Adherence to the custom Oceanic Intelligence design system, leveraging React Server Components and OpenType tabular figures (font-variant-numeric: tabular-nums) to guarantee CLS = 0.00 and LCP < 1.2s across all viewports."
          ),
          createBodyParagraph(
            "System Boundaries (Out of Scope): SkillMatch strictly focuses on technical talent matching and verified code evaluation. It does not provide payroll processing, legal immigration/visa sponsorship filings, or criminal background checks."
          ),

          createHeading2("1.4 Target Stakeholder Ecosystem"),
          createBulletItem(
            "Primary Stakeholders (CSE Candidates):",
            "Undergraduate and postgraduate engineering students seeking high-signal software engineering internships who require their authentic code quality to bypass non-technical gatekeepers."
          ),
          createBulletItem(
            "Secondary Stakeholders (Technical Recruiters & Engineering Leads):",
            "Engineering Managers (EMs), Tech Leads, and Technical Talent Partners who demand pre-screened, verified candidate pipelines with zero resume spam."
          ),
          createBulletItem(
            "Tertiary Stakeholders (Academic Institutions & ABET):",
            "University engineering faculties and career centers seeking empirical data on graduate placement and curriculum-to-industry alignment."
          ),

          // ==========================================
          // SECTION 2: EXISTING OF THE PROJECT (~1 PAGE)
          // ==========================================
          createHeading1("2. Existing of the Project", true),

          createHeading2("2.1 Critical Review of Traditional Recruitment Systems"),
          createBodyParagraph(
            "The contemporary recruitment landscape relies on four fragmented categories of software tools, none of which were architected to evaluate empirical software engineering capability:"
          ),
          createBulletItem(
            "Generic Labor Portals (LinkedIn, Indeed):",
            "Broad platforms designed for multi-industry generalist hiring. Their discovery algorithms prioritize network proximity, sponsored corporate advertising, and superficial string searches, offering zero capability to evaluate codebase architecture, design patterns, or engineering hygiene."
          ),
          createBulletItem(
            "Campus Aggregators (Handshake, Symplicity):",
            "University portals that verify enrollment but function merely as static digital bulletin boards. Students upload unverified PDF resumes and wait for campus career fairs, perpetuating the same document-based bottlenecks."
          ),
          createBulletItem(
            "Corporate Applicant Tracking Systems (ATS) (Workday, Taleo, Greenhouse):",
            "Compliance-driven workflow tools engineered for human resources departments. They ingest resumes as unstructured text and apply brittle regular expressions to filter candidates based on exact keyword density."
          ),
          createBulletItem(
            "Third-Party Coding Assessment Platforms (HackerRank, Codility):",
            "Platforms that evaluate students through isolated algorithmic brainteasers and LeetCode-style puzzles in artificial sandboxes, testing memorization rather than the ability to build maintainable, modular, concurrent production software."
          ),

          createHeading2("2.2 Systemic Limitations and Failure Modes"),
          createBulletItem(
            "High False-Negative Rejection Rate:",
            "Academic research indicates that keyword-based ATS filters eliminate up to 70% of qualified technical candidates simply because their resumes lack arbitrary synonyms (e.g., listing 'Distributed Consensus Protocols' instead of the exact phrase 'Raft Leader Election')."
          ),
          createBulletItem(
            "Resume Inflation & Fraud:",
            "Unverified PDF resumes encourage candidates to list frameworks they have never used or claim false credit on group repositories. Employers have no way to verify claims without conducting live interviews."
          ),
          createBulletItem(
            "The 'Application Black Hole':",
            "Candidates receive automated form rejections with zero diagnostic data, preventing them from understanding why they were rejected or what skills they need to acquire."
          ),
          createBulletItem(
            "Excessive Screening Overhead:",
            "Because paper resumes provide almost no correlation with actual engineering competence, senior engineering staff must conduct 15 to 20 phone screens per successful hire, costing companies tens of thousands of dollars in lost engineering velocity."
          ),
          createBulletItem(
            "Lack of Institutional Security:",
            "Traditional job boards allow anyone with commercial email accounts to apply to university-specific listings, overwhelming university-targeted programs with unqualified external applicants."
          ),

          createHeading2("2.3 Comparative Architectural Analysis"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Feature / Metric", true, 20),
                  createTableCell("Legacy Job Boards", true, 25),
                  createTableCell("Corporate ATS (Workday)", true, 25),
                  createTableCell("SkillMatch Platform", true, 30),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Primary Artifact", true, 20, "F8F9FF"),
                  createTableCell("Self-reported text profile", false, 25),
                  createTableCell("Parsed PDF text resume", false, 25),
                  createTableCell("Verified GitHub Codebase & AST Metrics", false, 30, "E6F4F6"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Verification Method", true, 20, "F8F9FF"),
                  createTableCell("None (Honors system)", false, 25),
                  createTableCell("Keyword regex scanning", false, 25),
                  createTableCell("AST Parser + .EDU Institutional Domain", false, 30, "E6F4F6"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Authentication Security", true, 20, "F8F9FF"),
                  createTableCell("Basic password / Social", false, 25),
                  createTableCell("Manual user account", false, 25),
                  createTableCell("NextAuth v5 + Resend Cryptographic OTP", false, 30, "E6F4F6"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Serverless Resilience", true, 20, "F8F9FF"),
                  createTableCell("Monolithic server sessions", false, 25),
                  createTableCell("Centralized database", false, 25),
                  createTableCell("HMAC-SHA256 Signed Challenge Cookies", false, 30, "E6F4F6"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Candidate Feedback", true, 20, "F8F9FF"),
                  createTableCell("Silent rejection / None", false, 25),
                  createTableCell("Automated form rejection", false, 25),
                  createTableCell("Actionable Skill Gap Alerts (Gap Coral)", false, 30, "E6F4F6"),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Layout Shift Standard", true, 20, "F8F9FF"),
                  createTableCell("Moderate CLS (> 0.10)", false, 25),
                  createTableCell("High CLS (> 0.20)", false, 25),
                  createTableCell("Zero Layout Shift (CLS = 0.00, Arimo tnum)", false, 30, "E6F4F6"),
                ],
              }),
            ],
          }),

          // ==========================================
          // SECTION 3: OBJECTIVES (EXACT 1 PAGE)
          // ==========================================
          createHeading1("3. Objectives of the Proposed Project", true),

          createHeading2("Objective 1: Implement an Empirical Codebase AST Verification & Matching Engine"),
          createBodyParagraph(
            "Technical Definition: Replace subjective, self-reported text resumes with automated source code analysis of students' public GitHub repositories using Abstract Syntax Tree (AST) inspection."
          ),
          createBodyParagraph(
            "Architectural Rationale: Inspecting syntax trees allows SkillMatch to evaluate structural software characteristics—such as cyclomatic complexity, concurrency patterns (Goroutines, mutexes), modularity, and automated test coverage."
          ),
          createBulletItem(
            "Measurable Target 1.1:",
            "Achieve an AST parsing accuracy rate of >= 98% across CSE target languages (Go, TypeScript, C++, Rust, Python)."
          ),
          createBulletItem(
            "Measurable Target 1.2:",
            "Calculate empirical match percentage scores directly correlating candidate repositories with hiring stack requirements."
          ),
          createBulletItem(
            "Measurable Target 1.3:",
            "Provide candidates with real-time, actionable skill-gap diagnostics (highlighting missing prerequisites in Accent Gap Coral #E42520)."
          ),

          createHeading2("Objective 2: Enforce High-Trust Identity Attestation via Dual-Layer Cryptographic Security"),
          createBodyParagraph(
            "Technical Definition: Establish an unassailable verification gateway authenticating both academic status and individual human identity, preventing synthetic accounts and unauthorized external applicants."
          ),
          createBodyParagraph(
            "Architectural Rationale: Early-career recruitment integrity demands verified academic pedigree. Candidate accounts must be tethered to accredited educational institutions."
          ),
          createBulletItem(
            "Measurable Target 2.1:",
            "Enforce strict RFC-compliant validation requiring accredited institutional domains (.edu, .edu.*, .ac.uk)."
          ),
          createBulletItem(
            "Measurable Target 2.2:",
            "Deploy NextAuth.js v5 supporting multi-tenant Google Workspace SSO (prompt='select_account') and GitHub OAuth under the verified @SkillMatchOfficial organization."
          ),
          createBulletItem(
            "Measurable Target 2.3:",
            "Engineer a real-time 6-digit numeric OTP engine via the Resend REST API, secured against serverless multi-lambda desynchronization using HMAC-SHA256 signed tamper-proof challenge cookies."
          ),

          createHeading2("Objective 3: Streamline the Recruitment Lifecycle through Role-Isolated Dedicated Portals"),
          createBodyParagraph(
            "Technical Definition: Provide specialized, high-velocity workspaces for both students and technical recruiters, governed by Edge-level Role-Based Access Control (RBAC)."
          ),
          createBodyParagraph(
            "Architectural Rationale: Candidates require rapid discovery and transparent tracking; recruiters require high-density candidate evaluation, pipeline filtering, and instant interview scheduling."
          ),
          createBulletItem(
            "Measurable Target 3.1:",
            "Implement Next.js Edge Middleware (middleware.ts) enforcing zero unauthorized cross-role penetration with auto-dismissing security alert banners."
          ),
          createBulletItem(
            "Measurable Target 3.2:",
            "Enable 1-Click Instant Apply for candidates, transmitting pre-verified dossiers without redundant forms."
          ),
          createBulletItem(
            "Measurable Target 3.3:",
            "Equip recruiters with an interactive, Kanban-style ATS pipeline, vacancy publisher, candidate shortlisting, and an integrated technical interview scheduling engine with automated calendar invites."
          ),

          createHeading2("Objective 4: Achieve Production-Grade Web Ergonomics and Zero Cumulative Layout Shift"),
          createBodyParagraph(
            "Technical Definition: Deliver a developer-centric user interface matching the responsiveness and aesthetics of modern tools like Linear and Wellfound, adhering to the 'Oceanic Intelligence' design system."
          ),
          createBodyParagraph(
            "Architectural Rationale: High-density dashboards require visual clarity and typographic stability. Layout shifts during data updates erode user trust."
          ),
          createBulletItem(
            "Measurable Target 4.1:",
            "Guarantee a Cumulative Layout Shift of exactly 0.00 (CLS = 0.00) using OpenType tabular figures (tabular-nums / tnum) on all match scores."
          ),
          createBulletItem(
            "Measurable Target 4.2:",
            "Achieve a Largest Contentful Paint under 1.2 seconds (LCP < 1.2s) via React Server Component streaming."
          ),
          createBulletItem(
            "Measurable Target 4.3:",
            "Ensure full WCAG 2.1 AA accessibility and seamless English/Bengali bilingual localization via a zero-reload context."
          ),

          // ==========================================
          // SECTION 4: SUMMARY & FUNCTIONS (~2 PAGES)
          // ==========================================
          createHeading1("4. Summary & Functions of the Proposed Project", true),

          createHeading2("4.1 Detailed Module Description"),

          createHeading3("4.1.1 Candidate Workspace Module (/dashboard/candidate)"),
          createBulletItem(
            "Academic Verification Dossier:",
            "Displays verified university credentials (e.g., Alex Chen, UC Berkeley EECS, Class of 2026), SHA-256 cryptographic resume hash attestation (sha256-8f4b23c9...), and ABET accreditation liveness."
          ),
          createBulletItem(
            "Interactive Job Discovery Engine:",
            "Full-text search and filtering across technical tracks (Distributed Systems, Kernel & Systems, Cloud & SRE, Database Engines), work models (Remote, Hybrid, On-site), and dynamic match scores (e.g., 95% Match in Technical Mint #0A887D)."
          ),
          createBulletItem(
            "1-Click Instant Apply Subsystem:",
            "Transmits pre-verified dossiers directly into the recruiter's active queue with a single click, eliminating duplicate external applications."
          ),
          createBulletItem(
            "Application Lifecycle Tracker:",
            "Transparent multi-stage pipeline tracking: Under Review -> Assessment Passed -> Interview Scheduled -> Offer Extended -> Rejected."
          ),
          createBulletItem(
            "Profile & Repository Setup:",
            "Repository sync, personal portfolio integration, and dynamic multi-chip skill manager."
          ),

          createHeading3("4.1.2 Recruiter Enterprise Module (/dashboard/recruiter)"),
          createBulletItem(
            "Recruiter KPI Telemetry:",
            "Real-time counters tracking active job vacancies, applicant volume, shortlisted candidates, and pipeline velocity."
          ),
          createBulletItem(
            "Job Publishing Engine:",
            "Multi-field opening publisher specifying role title, team, salary band, dynamic skill chips, and customizable Minimum AST Match Thresholds (e.g., 90%)."
          ),
          createBulletItem(
            "ATS Candidate Pipeline:",
            "Filterable applicant management cards displaying AST Node Complexity Counts (e.g., 14,280 AST Nodes), Highlight Repositories (e.g., distributed-kv-store in Go), and 1-click Shortlist/Reject controls."
          ),
          createBulletItem(
            "Technical Interview Scheduler:",
            "Modal scheduler supporting structured formats (AST Code Deep-Dive, Live Concurrency, Engineering VP Fit) with automated email calendar dispatch."
          ),
          createBulletItem(
            "Proactive Talent Search:",
            "Query tool across all verified students in the database by technical keyword and university."
          ),

          createHeading2("4.2 Core Architectural & Security Functions"),
          createBulletItem(
            "Multi-Provider OAuth 2.0 (NextAuth v5):",
            "Google Workspace SSO (prompt='select_account') and GitHub OAuth under the verified @SkillMatchOfficial organization, with dynamic host trusting (AUTH_TRUST_HOST='true') and automatic sanitization of localhost redirects."
          ),
          createBulletItem(
            "Strict .EDU Domain Validation:",
            "Evaluates candidate emails using RFC-compliant regex in ValidationService. Unauthorized commercial domains are immediately rejected with localized error alerts."
          ),
          createBulletItem(
            "Cryptographic Resend OTP System:",
            "Generates CSPRNG 6-digit codes, creates tamper-proof HMAC-SHA256 signed challenge cookies (__Secure-skillmatch_otp_challenge) for serverless lambda resilience on Vercel, and dispatches HTML emails via the Resend REST API with constant-time verification (crypto.timingSafeEqual)."
          ),
          createBulletItem(
            "Edge RBAC Middleware:",
            "Enforces role isolation between Candidate and Recruiter workspaces using dual cookies (skillmatch_auth_role & __Secure-skillmatch_auth_role), with auto-dismissing security banners."
          ),

          createHeading2("4.3 End-to-End System Process & Workflow"),
          createBodyParagraph(
            "The operational lifecycle of the SkillMatch platform is structured into five distinct phases:"
          ),
          createBulletItem(
            "Step 1: Recruiter Vacancy Publication:",
            "The recruiter publishes an active engineering opening, setting minimum AST thresholds (e.g., 90%), required skill chips (Go, Raft, RocksDB), and compensation parameters."
          ),
          createBulletItem(
            "Step 2: Candidate Registration & .EDU Validation:",
            "A student initiates registration. The system enforces .edu academic email syntax. Upon passing, a 6-digit cryptographic OTP is generated, an HMAC-SHA256 signed challenge cookie is written to the client, and Resend dispatches the HTML verification email."
          ),
          createBulletItem(
            "Step 3: Two-Factor Handshake:",
            "The student enters the 6-digit code into the auto-advancing input. The server validates the code against the signed cookie using constant-time evaluation. The student is authorized and directed to /dashboard/candidate."
          ),
          createBulletItem(
            "Step 4: AST Matching & 1-Click Application:",
            "The candidate discovers vacancies sorted by real-time match percentage scores. The student clicks '1-Click Apply', instantly transmitting their verified dossier into the recruiter's active queue."
          ),
          createBulletItem(
            "Step 5: ATS Pipeline Review & Interview Scheduling:",
            "The recruiter reviews the inbound dossier, inspects AST node metrics (14,280 AST nodes) and highlight repositories, shortlists the candidate, and schedules a technical evaluation session. The platform automatically dispatches calendar invites to the candidate's university email, concluding a seamless, empirical recruitment workflow."
          ),

          createHeading2("4.4 Conclusion & Verification Summary"),
          createBodyParagraph(
            "The SkillMatch Career Platform (skillmatch_app) represents an architecturally sound, technologically sophisticated, and socially transformative solution to the early-career engineering recruitment crisis. By replacing static, keyword-stuffed PDF resumes with verifiable Abstract Syntax Tree (AST) code analysis, enforcing institutional academic identity via .edu validation and Resend cryptographic OTP, and delivering role-isolated enterprise workspaces, SkillMatch establishes a new gold standard in technical talent acquisition."
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "SkillMatch Systems Inc.  •  Autonomous Skill Verification and Candidate Matching Platform",
                size: 18,
                italics: true,
                color: TEXT_MUTED,
                font: "Calibri",
              }),
            ],
            spacing: { before: 200, after: 40 },
          }),
        ],
      },
    ],
  });

  const outputPath = path.join(__dirname, "..", "PROJECT_PROPOSAL.docx");
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log("Successfully generated:", outputPath, "(Length:", buffer.length, "bytes)");
}

generateDocx().catch((err) => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
