# SkillMatch Career Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Design_System-Oceanic_Intelligence-095964?style=for-the-badge)](../Plans/DESIGN(info).md)

**A high-precision early-career recruiting engine built for Computer Science & Engineering (CSE) talent and technical hiring teams.**

[Explore Design Specs](../Plans/DESIGN(landingpage).md) • [Read PRD](../Plans/PRD(landingpage).md) • [Component Architecture](../Plans/ARCHITECTURE(landingpage).md) • [GitHub OAuth Setup Guide](docs/GITHUB_OAUTH_SETUP.md)

</div>

---

## 📌 Project Overview

**SkillMatch** re-engineers the broken early-career technical hiring pipeline:

* 🚫 **The Broken Pipeline**: Over 70% of qualified engineering candidates are eliminated by keyword-based Applicant Tracking Systems (ATS) that favor resume buzzwords over actual engineering competency.
* ⚡ **The SkillMatch Paradigm**: We replace static PDF resumes with automated **Abstract Syntax Tree (AST) code verification** and **multi-dimensional vector embeddings**, directly matching students' public GitHub repositories against production engineering stacks.
* 🎯 **Direct Engineering Access**: Fast-tracks verified candidates directly to engineering leads and hiring managers, bypassing recruiters and non-technical screeners.

---

## 🎨 Design System: "Oceanic Intelligence"

SkillMatch is styled strictly under the **Oceanic Intelligence** design system—blending the keyboard-first speed of **Linear**, the talent transparency of **Wellfound**, and the institutional trust of **LinkedIn**.

### Visual Foundation & Tokens
* **Primary Deep Teal (`#095964` / `#004049`)**: Dominant actions, active navigation anchors, and primary headers.
* **Secondary Technical Mint (`#0A887D`)**: High-confidence indicators, 90%+ match scores, skill progress fill states, and active focus rings.
* **Accent Gap Coral (`#E42520`)**: Reserved strictly for missing prerequisite skills, qualification gaps, and deadline alerts.
* **Surfaces & Canvases**: High-comfort canvas (`#F8F9FF`), pure white modules (`#FFFFFF`), and hairline border dividers (`#EAECF0`, `#E2E8F0`).
* **Typography (Arimo)**: Enforces OpenType **tabular figures** (`font-variant-numeric: tabular-nums` / `tnum`) across all match scores, percentiles, and counts to guarantee **0.00 Cumulative Layout Shift (CLS)**.
* **Elevation Tiers**: Paper-thin hairline strokes (`1px`) coupled with diffused, primary-tinted ambient shadows (Level 0 through Level 3).

---

## 🛠️ Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Hybrid Server Component architecture (RSC) delivering sub-1.2s LCP and zero client hydration bloat. |
| **Library** | [React 19](https://react.dev/) | Concurrent rendering and modern React primitives. |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type contracts across all AST telemetry and matching schemas. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS | Token-driven utility architecture mapped directly to custom design tokens. |
| **Typography** | [Google Fonts: Arimo](https://fonts.google.com/specimen/Arimo) | Neutral, authoritative sans-serif with monospace-grade metric alignment. |

---

## 🏗️ Project Architecture

The application adopts an **Atomic Component Hierarchy** with strict Server vs. Client rendering boundaries:

```text
skillmatch_app/
├── app/                        # Next.js App Router root
│   ├── globals.css             # Oceanic Intelligence CSS variables, @theme tokens & utilities
│   ├── layout.tsx              # Root HTML shell, Arimo typography injection & metadata
│   └── page.tsx                # Landing Page orchestrator (Composes section organisms)
│
├── src/                        # Modular Frontend Source Directory
│   ├── components/
│   │   ├── ui/                 # Pure Atomic Primitives
│   │   │   ├── Button.tsx      # Primary (#095964), Subtle & Ghost variants
│   │   │   ├── Badge.tsx       # Status pills, match percentage badges & pulsing dots
│   │   │   ├── SkillChip.tsx   # Matched (Mint) vs. Gap (Coral Red) skill chips
│   │   │   ├── RadialGauge.tsx # Mini SVG meter arc with tabular percentage center
│   │   │   ├── Card.tsx        # Levels 0-3 elevation containers with hairline strokes
│   │   │   └── Kbd.tsx         # Command shortcut chip (⌘K)
│   │   │
│   │   ├── common/             # Cross-Section Molecules
│   │   │   ├── BrandLogo.tsx   # AST squircle hub icon + Arimo wordmark + CSE pill
│   │   │   ├── CommandSearch.tsx # Global keyboard-first search pill (⌘K)
│   │   │   └── SectionHead.tsx # Section badge, title & value prop copy
│   │   │
│   │   └── sections/           # Section Organisms (RSC & Interactive Islands)
│   │       ├── navbar/         # Sticky navigation header & mobile slide-over drawer
│   │       ├── hero/           # Asymmetrical 12-col hero + Live AST Match preview card
│   │       ├── metrics/        # 4-col Bento metrics telemetry strip & testimonial
│   │       ├── tracks/         # 5-Track CSE Specializations (3 + 2 Bento Grid)
│   │       ├── how-it-works/   # 3-step AST code verification pipeline
│   │       ├── cta/            # Deep oceanic gradient final banner
│   │       └── footer/         # Institutional directory, SOC-2 & ABET compliance
│   │
│   ├── data/                   # Static content & candidate simulation fixtures
│   ├── hooks/                  # Custom hooks (e.g. useKeyboardShortcut, useScroll)
│   ├── types/                  # TypeScript data contracts & landing page interfaces
│   └── lib/                    # Shared utilities (class merger cn(), tabular formatters)
│
├── tailwind.config.ts          # Complete Tailwind token mappings & breakpoint matrix
└── postcss.config.mjs          # PostCSS Tailwind plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.18.0` or `v20.x`+ recommended
* **Package Manager**: `npm` (v9+) or `pnpm`

### Installation & Local Setup

1. **Clone the repository and enter the project folder**:
   ```bash
   cd "e:/Dbms_project/Skill Match System/skillmatch_app"
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser. The page will hot-reload automatically upon modifying files.

### 🔐 OAuth 2.0 Configuration (GitHub & Google SSO)

SkillMatch integrates with Google Workspace SSO and GitHub Code Verification:
* **GitHub OAuth**: Follow the [GitHub OAuth Professional Setup Guide](docs/GITHUB_OAUTH_SETUP.md) to configure your OAuth app under a GitHub Organization (e.g. `@SkillMatchOfficial`) so the authorization consent screen strictly displays **SkillMatch** with official squircle branding and no personal developer names.
* **Branding Assets**: Use `public/images/skillmatch-oauth-logo.png` (512x512 PNG) for the GitHub Application Logo badge.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with Turbopack on `http://localhost:3000`. |
| `npm run build` | Compiles the production build with type checking and static optimization. |
| `npm run start` | Runs the built production server locally. |
| `npm run lint` | Runs ESLint to verify code quality and style standards. |

---

## 🏆 Engineering Quality Standards

* **Zero Layout Shift (`CLS = 0.00`)**: Guaranteed through static card dimension reservations and OpenType tabular figures (`tnum`).
* **Instant First Paint (`LCP < 1.2s`)**: Above-the-fold content rendered purely via React Server Components (RSC).
* **Accessibility (WCAG AA)**: Strict contrast conformance (>7:1 on primary text), full keyboard navigable flows, and explicit focus rings (`0 0 0 3px rgba(10, 136, 125, 0.24)`).

---

<div align="center">
Built with precision for early-career computer science engineers.
</div>
