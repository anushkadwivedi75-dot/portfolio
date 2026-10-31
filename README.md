# Anushka Dwivedi — Personal Developer Portfolio

A production-quality developer portfolio built for **Anushka Dwivedi**, B.Tech student specializing in **Artificial Intelligence and Machine Learning** at SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE).

Inspired by the interaction design, digital craftsmanship, and fluid presentation of [Samay Maurya's portfolio on Wall of Portfolios](https://www.wallofportfolios.in/portfolios/samay/). Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## ✦ Core Architecture & Visual Direction

- **Core Positioning**: *"I build intelligent systems and full-stack products that solve real-world problems."*
- **Color System**:
  - Signature lavender and deep violet accents (`#c4b5fd`, `#a78bfa`, `#7c3aed`).
  - **Dark Mode**: Deep charcoal canvas (`#08080a`) with refined card elevations (`#0c0d13`, `#12131c`).
  - **Light Mode**: Soft off-white canvas (`#f8f7fc`) with crisp card surfaces (`#ffffff`, `#f1eff8`).
  - Persistent theme engine saved to `localStorage` with system preference detection and accessible contrast.
- **Typography**:
  - Expressive modern geometric sans: `Plus Jakarta Sans`.
  - Editorial display serif: `Instrument Serif` (italic).
  - Technical telemetry: `JetBrains Mono`.
- **Dynamic Background**: Interactive HTML5 connected systems canvas responding gracefully to mouse proximity.

---

## ✦ Featured Case Studies (Interactive Architecture)

### 01. AirSentinel — End-to-End AQI Spatial Monitoring & Anomaly Detection
- **Stack**: Flutter, FastAPI, PostgreSQL, PostGIS, SQLite, Python, scikit-learn, ESP32, BLE, Docker.
- **Key Features**: Spatial divergence detection between personal wearables and official CPCB ground stations within 300m via PostGIS `ST_DWithin` and `ST_Distance`. Rolling 48-hour multi-variate anomaly detection using unsupervised Isolation Forest.
- **Interactive Component**: Live radar map with toggleable 300m spatial buffer, CPCB AQI color-scale transitions, and an anomaly spike simulator.

### 02. Legal Simplifier AI — AI-Powered Contract Intelligence
- **Stack**: Next.js, React, TypeScript, Tailwind CSS, Node.js, Firebase, Gemini / OpenAI API, Vector Database.
- **Key Features**: Retrieval-Augmented Generation (RAG) with vector similarity cosine ranking. Automated clause-level risk classification (`HIGH`, `MEDIUM`, `LOW`).
- **Interactive Component**: Split-screen contract analyzer with toggleable sample legal clauses (Indemnification, Non-Compete, Termination) and instant AI risk synthesis.

### 03. Cloud Drive Clone — Distributed Cloud Storage Platform
- **Stack**: React, TypeScript, Firebase Auth, Firebase Storage, Tailwind CSS.
- **Key Features**: Resumable chunked file uploads with network interruption state recovery. Deterministic recursive nested directory hierarchy with breadcrumb routing.
- **Interactive Component**: Simulated multi-file upload progress queue with live percentage feedback and directory tree navigation.

### 04. SAT-SA — Supervisory Analytics Platform for SOC Assessment
- **Stack**: Python, FastAPI, React, TypeScript, Tailwind CSS, PostgreSQL, Elasticsearch, scikit-learn, Docker.
- **Key Features**: Causal graph incident correlation, MITRE ATT&CK kill-chain mapping across 14 tactics, and explainable AI risk scoring (SHAP feature attribution weights).
- **Interactive Component**: Live incident alert stream, correlated attack cluster review, explainable feature weighting bars, and automated playbook containment execution.

### 05. Additional Projects Archive
- **QuantAlpha**: Quantitative Portfolio Optimizer & Risk Modeling (Python, Pandas, NumPy, Modern Portfolio Theory).
- **FinSentiment**: Financial News Entity & Sentiment Extraction Pipeline (FastAPI, Transformers, PyTorch, React).
- **VisionGate**: Edge Computer Vision & Contact-Free Gesture Tracker (OpenCV, MediaPipe, Python, SQLite).

---

## ✦ Website Sections

1. **Dynamic Floating Navbar**: Glassmorphism container with personal wordmark, live scroll-spy section tracking, theme toggle switch (Dark/Light mode), and quick Resume trigger.
2. **Hero Section**: Live telemetry status indicator (`B.Tech AI & ML @ DJSCE • Mumbai, IN`), headline with editorial serif typography, dual CTAs, social links, and an anchored developer specimen telemetry card.
3. **Selected Work**: 4 flagship production architectures with interactive UI previews, unboxed 3-column engineering breakdowns, and deep-dive technical modals.
4. **Additional Projects**: Expandable archive exploring open-source repositories and quantitative tools.
5. **About & Philosophy**: Narrative on end-to-end engineering and systems thinking, paired with an academic foundation block (`CGPA: 8.13 / 10`, `Honours in Quantitative Finance and Fintech`).
6. **Technical Skills Matrix**: Filterable matrix across 6 categories:
   - Programming Languages
   - Frontend Development
   - Backend Development
   - AI & Machine Learning
   - Databases & Tools
   - Development Platforms
7. **Leadership & Community**: Timeline showcasing leadership as **VCP Admin at DJS ACM SIGAI** and **Events Head at DJS eXpress**.
8. **Achievements & Certifications**: Academic honors, hackathon achievements, and verified technical certifications.
9. **Contact & Footer**: Interactive one-click email copy with feedback toast (`anushkadwivedi75@gmail.com`), live Mumbai time indicator, social links, and smooth back-to-top button.
10. **Interactive Curriculum Vitae Modal**: In-app CV viewer with one-click print/save as PDF and plain-text copy functionality.

---

## ✦ Getting Started & Local Development

### 1. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 2. Build for Production
```bash
npm run build
```
Type checks the project with `tsc -b` and bundles static production assets into `dist/`.

### 3. Preview Production Build
```bash
npm run preview
```
