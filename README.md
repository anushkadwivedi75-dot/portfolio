# Anushka Dwivedi — Personal Developer Portfolio

A personal developer portfolio built for **Anushka Dwivedi**, B.Tech student specializing in **Artificial Intelligence and Machine Learning** at SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE).

Designed with an editorial, minimal dark aesthetic inspired by top-tier engineering studios and independent software developers. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## ✦ Core Positioning & Design Language

- **Core Positioning**: *"I build intelligent systems and full-stack products that solve real-world problems."*
- **Visual Aesthetic**:
  - Deep charcoal canvas (`#09090b`) with refined card elevations (`#101117`, `#14151e`).
  - Off-white typography with restrained lavender and violet accents (`#c4b5fd`, `#a78bfa`).
  - Expressive modern sans (`Plus Jakarta Sans`) paired with editorial serif display (`Instrument Serif`) and monospaced technical labels (`JetBrains Mono`).
  - Subtle interactive engineering motif: A generative connected systems canvas background that gently responds to cursor proximity.
  - Zero arbitrary percentage bars, no generic templates, and no distracting animations.

---

## ✦ Featured Case Studies (Interactive Architecture)

### 01. AirSentinel — End-to-End AQI Spatial Monitoring & Anomaly Detection
- **Stack**: Flutter, FastAPI, PostgreSQL, PostGIS, SQLite, Python, scikit-learn, ESP32, BLE, Docker.
- **Key Features**:
  - Spatial divergence detection between personal wearables and official CPCB ground stations within 300m via PostGIS `ST_DWithin` and `ST_Distance`.
  - Rolling 48-hour multi-variate anomaly detection using unsupervised Isolation Forest in scikit-learn.
  - Offline-first mobile synchronization utilizing local SQLite transaction queuing.
  - Full adherence to India National CPCB 6-tier AQI standard.
- **Interactive Component**: Live radar map with toggleable 300m spatial buffer, CPCB AQI color-scale transitions, and an anomaly spike simulator.

### 02. Cloud Drive Clone — Distributed Cloud Storage Platform
- **Stack**: React, TypeScript, Firebase Auth, Firebase Storage, Tailwind CSS.
- **Key Features**:
  - Resumable chunked file uploads with network interruption state recovery.
  - Deterministic recursive nested directory hierarchy with breadcrumb routing.
  - Role-based Google OAuth token authorization and storage namespace isolation.
- **Interactive Component**: Simulated multi-file upload progress queue with live percentage feedback and directory tree navigation.

### 03. Legal Simplifier AI — AI-Powered Contract Intelligence
- **Stack**: Next.js, React, TypeScript, Tailwind CSS, Node.js, Firebase, Gemini / OpenAI API, Vector Database.
- **Key Features**:
  - Retrieval-Augmented Generation (RAG) with vector similarity cosine ranking.
  - Automated clause-level risk classification (`HIGH`, `MEDIUM`, `LOW`).
  - Plain-language legal translation extracting hidden liabilities and mutual obligations.
- **Interactive Component**: Split-screen contract analyzer with toggleable sample legal clauses (Indemnification, Non-Compete, Termination) and instant AI risk synthesis.

---

## ✦ Website Structure

1. **Header & Navigation**: Sticky blur bar with personal wordmark, active section tracking, smooth scrolling, and quick Resume trigger.
2. **Hero Section**: Live telemetry status indicator (`B.Tech AI & ML @ DJSCE`), headline, primary and secondary CTAs, social links, and an academic stats ticker.
3. **Selected Work**: Three detailed case studies with interactive UI previews, architectural specs, and a modal for deep-dive system diagrams and database queries.
4. **About & Education**: Narrative covering end-to-end engineering, paired with a structured academic block (`CGPA: 8.13 / 10`, `Honours in Quantitative Finance and Fintech`).
5. **Technical Skills Matrix**: Filterable matrix across *Programming*, *Web Development*, *Developer Tools & Platforms*, and *AI & Data*.
6. **Leadership & Community**: Timeline showcasing leadership as **VCP Admin at DJS ACM SIGAI** and **Events Head at DJS eXpress**.
7. **Contact & Footer**: Working mailto link (`anushkadwivedi75@gmail.com`), one-click copy email button with feedback, local Mumbai time indicator, and back-to-top button.
8. **Interactive CV Modal**: Built-in resume viewer with one-click print/save as PDF and plain-text copy functionality.

---

## ✦ Project Directory Layout

```
portfolio/
├── public/
│   └── favicon.svg              # Minimal personal brand vector favicon
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── BrandIcons.tsx   # Verified SVG icons for GitHub & LinkedIn
│   │   ├── mockups/
│   │   │   ├── AirSentinelMockup.tsx     # Interactive AQI map & anomaly simulator
│   │   │   ├── CloudDriveMockup.tsx      # Interactive cloud storage & upload bar
│   │   │   └── LegalSimplifierMockup.tsx # Interactive split-screen contract analyzer
│   │   ├── About.tsx            # Personal story & DJSCE education card
│   │   ├── ConnectedSystemsCanvas.tsx # Interactive graph network background
│   │   ├── Contact.tsx          # Understated contact box & local time ticker
│   │   ├── Hero.tsx             # Typographic headline & metric cards
│   │   ├── Leadership.tsx       # DJS ACM SIGAI & DJS eXpress experience
│   │   ├── Navbar.tsx           # Responsive sticky navigation & mobile drawer
│   │   ├── ProjectCard.tsx      # Case study card with interactive preview
│   │   ├── ProjectModal.tsx     # Architectural deep-dive drawer
│   │   ├── ResumeModal.tsx      # In-app CV viewer with print/copy support
│   │   └── Skills.tsx           # Categorized technical skill matrix
│   ├── data/
│   │   └── portfolioData.ts     # CENTRAL PLACE TO UPDATE ALL CONTENT & LINKS
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for all data structures
│   ├── App.tsx                  # Master application layout
│   ├── index.css                # Tailwind CSS v4 design tokens, fonts, & styles
│   └── main.tsx                 # Application entry point
├── dist/                        # Production build output
├── index.html                   # HTML entry with SEO metadata and Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.ts               # Vite configuration with @tailwindcss/vite plugin
└── README.md
```

---

## ✦ How to Customize Your Content & Links

All personal content, social URLs, and project links are centralized in:
`src/data/portfolioData.ts`

- **Personal Information & Links**:
  ```typescript
  export const personalInfo = {
    name: 'Anushka Dwivedi',
    email: 'anushkadwivedi75@gmail.com',
    github: 'https://github.com/anushkadwivedi75', // Update if different
    linkedin: 'https://www.linkedin.com/in/anushkadwivedi', // Update with exact slug
    location: 'Mumbai, India',
    ...
  };
  ```
- **Project Repositories & Live Demos**:
  Each project object in `projectsData` has a `links` property where you can set verified URLs.

---

## ✦ Getting Started & Local Development

### 1. Prerequisites
- Node.js (v20+ recommended)
- npm (v10+)

### 2. Run the Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173/`.

### 3. Production Build & Validation
```bash
npm run build
```
This runs TypeScript type checking (`tsc -b`) and bundles the static production output into the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## ✦ Deploying to Production

The application compiles to pure static HTML/CSS/JS in `dist/`. It can be deployed in seconds to any modern hosting service:

- **Vercel**: Run `npx vercel` or connect the GitHub repository. Build command: `npm run build`, Output directory: `dist`.
- **Netlify**: Run `npx netlify deploy` or link Git. Build command: `npm run build`, Publish directory: `dist`.
- **GitHub Pages**: Configure GitHub Actions with the standard Vite deployment workflow.

---

## ✦ Information for Anushka to Finalize

1. **LinkedIn Profile URL**: Replace the default placeholder in [src/data/portfolioData.ts](file:///c:/portfolio/src/data/portfolioData.ts) with your exact public profile link.
2. **GitHub Repository Links**: Add direct repository links to [src/data/portfolioData.ts](file:///c:/portfolio/src/data/portfolioData.ts) as your projects are open-sourced.
3. **Optional Static PDF**: If you have a pre-formatted single-page PDF resume, place it in `public/resume.pdf` to link directly alongside the built-in printable CV modal.
