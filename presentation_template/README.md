# SkillMatch Academic Presentation Template System (PPTX + JSON)

> **Source Platform**: [https://skillmatchapp-ten.vercel.app/](https://skillmatchapp-ten.vercel.app/)  
> **Repository**: [github.com/rashedmern/skillmatch_app](https://github.com/rashedmern/skillmatch_app)  
> **Design Language**: Oceanic Intelligence Design System  
> **Output Format**: 16:9 Widescreen (13.333" × 7.5"), Native Editable PowerPoint (.pptx)  

---

## 1. Executive Summary & Design Translation

This repository package contains a complete, production-grade academic presentation template directly reconstructed from the live **SkillMatch Career Platform** (`https://skillmatchapp-ten.vercel.app/`).

Instead of flattening website screenshots, the visual identity has been translated into **100% native, editable PowerPoint objects**—including vector squircle brand badges, Bento grid card layouts, multi-tier architectural block diagrams, 3NF database schema tables, quantitative metric scorecards, and IEEE reference citations.

### Visual Identity Tokens (Oceanic Intelligence)

| Token Name | HEX Code | Role in Presentation |
| :--- | :--- | :--- |
| **Deep Obsidian** | `#051C19` | Hero cover and closing viva canvas |
| **Dark Surface** | `#14151C` | Content slide background canvas |
| **Card Container** | `#121920` | Content and bento card surface |
| **Card Elevated** | `#1A232D` | Highlighted metric and frame surface |
| **Pine Container** | `#095964` | Primary brand accent and badge fills |
| **Technical Mint** | `#00D4BE` | Accent glows, headings, numbers, and active borders |
| **Cyan Glow** | `#67E8F9` | Secondary highlights and AST metrics |
| **Warning Coral** | `#E42520` | Problem statements, bottlenecks, and skill gaps |
| **Primary White** | `#FFFFFF` | Slide titles, table headers, and key emphasis |
| **Slate Secondary** | `#94A3B8` | Body copy, descriptive paragraphs, and citations |
| **Slate Muted** | `#64748B` | Footers, slide counters, and running headers |

---

## 2. Deliverables Directory

All files are located in `e:\Dbms_project\Skill Match System\presentation_template\`:

1. **`website_presentation_template.pptx`**  
   The compiled, editable 20-slide PowerPoint presentation formatted for 16:9 widescreen display.
2. **`website_presentation_template.json`**  
   The source-of-truth machine-readable design specification defining metadata, theme tokens, slide master layout, and 20 layout definitions with coordinate mappings and placeholders.
3. **`design_tokens.json`**  
   Standalone tokens for colors, typography scales, spacing, border styles, and corner radii.
4. **`asset_manifest.json`**  
   Inventory of brand glyphs, logo geometry, vector shapes, and replaceable asset parameters.
5. **`generate_presentation.js`**  
   Node.js script powered by `pptxgenjs` that programmatically builds the 20-slide template from scratch.
6. **`generate_presentation.py`**  
   Python script template using `python-pptx` for Python-based automation workflows.
7. **`README.md`**  
   This master documentation and usage guide.

---

## 3. The 20 Slide Layouts Catalogue

The template provides 20 distinct academic layouts:

| Slide # | Layout Identifier | Slide Title | Academic Purpose |
| :---: | :--- | :--- | :--- |
| **01** | `LAYOUT_01_TITLE_COVER` | Title / Cover Slide | Opening title, presenter team, supervisor, and course meta |
| **02** | `LAYOUT_02_AGENDA` | Table of Contents | Structured roadmap across 6 presentation sections |
| **03** | `LAYOUT_03_PROJECT_INTRODUCTION` | Project Introduction | Executive summary and 3 core engineering pillars |
| **04** | `LAYOUT_04_PROBLEM_STATEMENT` | Problem Statement | 3 comparative problem cards highlighting resume filtering issues |
| **05** | `LAYOUT_05_OBJECTIVES` | Project Objectives | 4 quantitative and functional engineering goals |
| **06** | `LAYOUT_06_BACKGROUND_MOTIVATION` | Background & Motivation | Comparative analysis: Legacy resume trap vs. AST paradigm |
| **07** | `LAYOUT_07_LITERATURE_REVIEW` | Literature Review | Full comparison matrix (LinkedIn, Handshake, LeetCode, SkillMatch) |
| **08** | `LAYOUT_08_METHODOLOGY` | Methodology / Procedure | 4-phase agile engineering lifecycle from SRS to deployment |
| **09** | `LAYOUT_09_SYSTEM_ARCHITECTURE` | System Architecture | 4-tier architectural block diagram (Client, Gateway, Services, DB) |
| **10** | `LAYOUT_10_PROCESS_FLOWCHART` | Process Flowchart | 5-step data flow from candidate auth to recruiter pipeline |
| **11** | `LAYOUT_11_DATABASE_SCHEMA` | Database Schema / ER | 6 relational entity cards with PKs, FKs, and attributes |
| **12** | `LAYOUT_12_FEATURES_FUNCTIONALITIES` | Features & Capabilities | Two-column taxonomy: Candidate suite vs. Recruiter ATS suite |
| **13** | `LAYOUT_13_TECHNICAL_IMPLEMENTATION` | Technical Implementation | 6 tech stack cards (Next.js 16, TypeScript 5, Prisma, Supabase) |
| **14** | `LAYOUT_14_RESULTS_SCREENSHOTS` | Results & Live Demo | Multi-frame showcase linking to the active Vercel deployment |
| **15** | `LAYOUT_15_EVALUATION_TESTING` | Evaluation & Benchmarks | Quantitative benchmark cards (98.4% AST, <35ms query latency) |
| **16** | `LAYOUT_16_ADVANTAGES_LIMITATIONS` | Advantages & Limitations | Balanced academic critique of strengths and current boundaries |
| **17** | `LAYOUT_17_CONCLUSION` | Project Conclusion | Core thesis validation and academic contribution synthesis |
| **18** | `LAYOUT_18_FUTURE_WORK` | Future Work Roadmap | 3-horizon development plan (LLM insights, multi-university, ATS API) |
| **19** | `LAYOUT_19_REFERENCES` | Academic References | IEEE-compliant citations of research papers and standards |
| **20** | `LAYOUT_20_THANK_YOU_QA` | Thank You / Viva Q&A | Defense closing, live repository link, and team contact details |

---

## 4. Academic Placeholders Dictionary

To customize the presentation for your project defense, replace the bracketed placeholders:

* `[PROJECT_TITLE]` → e.g., *SkillMatch: Student Skill-Based Internship Matching System*
* `[STUDENT_NAMES]` → e.g., *Rashed Molla & Engineering Team*
* `[STUDENT_IDS]` → e.g., *Student ID: 2026-CSE-1042*
* `[SUPERVISOR_NAME]` → e.g., *Prof. Dr. Sarah Jenkins*
* `[SUPERVISOR_TITLE]` → e.g., *Associate Professor, Department of Computer Science & Engineering*
* `[UNIVERSITY_NAME]` → e.g., *University / Academic Institution Name*
* `[DEPARTMENT_NAME]` → e.g., *Department of Computer Science & Engineering*
* `[COURSE_NAME]` → e.g., *CSE 4100: Database Systems Project & Defense*
* `[PRESENTATION_DATE]` → e.g., *October 2026 / Academic Session 2026*
* `[STUDENT_EMAILS]` → e.g., *team@skillmatch.university.edu*

---

## 5. How to Regenerate or Modify the Presentation

### Via Node.js (Recommended)
The generation script uses `pptxgenjs`:

```powershell
cd "e:\Dbms_project\Skill Match System\presentation_template"
node generate_presentation.js
```
Output:
```
[SUCCESS] Generated 20-slide PPTX template at: ...\website_presentation_template.pptx
```

### Via Python (Optional)
If running in a Python environment with `python-pptx`:

```powershell
pip install python-pptx
python generate_presentation.py
```

---

## 6. Programmatic JSON Integration

You can parse `website_presentation_template.json` directly into your web apps, automated slide deck generators, or CMS pipelines:

```javascript
const templateConfig = require("./website_presentation_template.json");

// Access color tokens
const primaryBrand = templateConfig.theme.colorPalette.brandTeal; // #095964
const accentMint = templateConfig.theme.colorPalette.accentMint;   // #00D4BE

// Inspect available layouts
templateConfig.layouts.forEach((layout) => {
  console.log(`[Layout ${layout.layoutId}] ${layout.name} - ${layout.purpose}`);
});
```
