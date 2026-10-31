import { useState } from 'react';
import { X, Printer, Check, Copy, ExternalLink, Mail, MapPin } from 'lucide-react';
import { personalInfo, educationInfo, projectsData, leadershipExperience } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const plainResume = `
${personalInfo.name}
${personalInfo.roleTitle}
Email: ${personalInfo.email} | Location: ${personalInfo.location}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

EDUCATION
${educationInfo.institution}
${educationInfo.degree} - ${educationInfo.specialization} (${educationInfo.duration})
CGPA: ${educationInfo.cgpa} | Honours: ${educationInfo.honours}

TECHNICAL SKILLS
- Programming: Python, C/C++, Java, JavaScript (ES6+), TypeScript, SQL, HTML5 & CSS3
- Web Development: React, Next.js, FastAPI, Node.js, Express.js, Tailwind CSS, REST APIs
- Databases & Tools: PostgreSQL, PostGIS, Firebase, SQLite, MongoDB, Git, GitHub, VS Code
- AI & ML: scikit-learn, Isolation Forest Anomaly Detection, Vector Databases, RAG Pipelines, BLE Telemetry
- Platforms: Docker, Flutter, ESP32, Figma, Supabase

SELECTED PRODUCTION PROJECTS
1. AirSentinel — End-to-End AQI Spatial Monitoring & Anomaly Detection
   Flutter, FastAPI, PostgreSQL, PostGIS, SQLite, Python, scikit-learn, ESP32, BLE, Docker
   - Spatial divergence evaluation against CPCB stations within 300m using PostGIS ST_DWithin.
   - Isolation Forest anomaly detection over rolling 48h temporal window. Offline SQLite batch sync.

2. Legal Simplifier AI — AI Contract Intelligence & Plain-Language Assistant
   React, Next.js, TypeScript, Tailwind CSS, Node.js, Firebase, Gemini API, Vector Database
   - RAG pipeline with semantic vector retrieval, clause-level risk classification, and comparative diffing.

3. Cloud Drive Clone — Full-Stack Distributed Cloud Storage Platform
   React, TypeScript, Firebase Auth & Storage, Tailwind CSS
   - Resumable chunked file uploads, deterministic nested folder hierarchy, and Google OAuth.

4. SAT-SA — Supervisory SOC Analytics & Explainable Incident Assessment
   Python, FastAPI, React, TypeScript, Tailwind CSS, PostgreSQL, Elasticsearch, scikit-learn, Docker
   - Causal graph incident correlation, MITRE ATT&CK mapping across 14 tactics, and explainable risk attribution.

LEADERSHIP & CAMPUS ACTIVITIES
- VCP Admin, DJS ACM SIGAI (2026 – Present)
- Events Head, DJS eXpress (2025 – 2026)
    `.trim();

    navigator.clipboard.writeText(plainResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 dark:bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200 dark:border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Header Controls */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-[#101118] border-b border-zinc-200 dark:border-white/[0.06] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400"></span>
            <span id="resume-title">Curriculum Vitae — {personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlainText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.06] transition-colors cursor-pointer"
              title="Copy formatted plain text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-violet-600 hover:bg-violet-500 text-white transition-colors cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-700 dark:text-zinc-300 font-sans print:bg-white print:text-black">
          {/* Header Info */}
          <div className="border-b border-zinc-200 dark:border-white/[0.08] pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-sans">
              {personalInfo.name}
            </h1>
            <div className="text-violet-600 dark:text-violet-300 font-medium text-sm">
              {personalInfo.roleTitle}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-2">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-200">
                <Mail className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>{personalInfo.email}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>{personalInfo.location}</span>
              </span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:underline">
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:underline">
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">
              Education
            </h2>
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-2">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{educationInfo.institution}</div>
                <div className="text-xs font-mono text-zinc-500">{educationInfo.duration}</div>
              </div>
              <div className="text-xs text-zinc-700 dark:text-zinc-300">
                {educationInfo.degree} in {educationInfo.specialization}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-violet-700 dark:text-violet-300 pt-1">
                <span>CGPA: <strong className="text-zinc-900 dark:text-zinc-100">{educationInfo.cgpa}</strong></span>
                <span>Honours: <strong className="text-zinc-900 dark:text-zinc-100">{educationInfo.honours}</strong></span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">
              Technical Stack Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-1">
                <div className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">PROGRAMMING LANGUAGES</div>
                <div className="text-zinc-800 dark:text-zinc-200">Python, C/C++, Java, JavaScript (ES6+), TypeScript, SQL, HTML5 &amp; CSS3</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-1">
                <div className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">WEB &amp; BACKEND DEVELOPMENT</div>
                <div className="text-zinc-800 dark:text-zinc-200">React, Next.js, FastAPI, Node.js, Express.js, Tailwind CSS, REST APIs</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-1">
                <div className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">AI, ML &amp; DATA SYSTEMS</div>
                <div className="text-zinc-800 dark:text-zinc-200">scikit-learn, PostGIS Spatial ML, Isolation Forest, Vector DBs, RAG, BLE GATT</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-1">
                <div className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">DATABASES &amp; PLATFORMS</div>
                <div className="text-zinc-800 dark:text-zinc-200">PostgreSQL, Firebase, Docker, SQLite, Flutter, MongoDB, Git, Figma</div>
              </div>
            </div>
          </div>

          {/* Selected Work */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">
              Featured Production Architectures
            </h2>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id} className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                      {project.title} — {project.subtitle}
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{project.timeline}</span>
                  </div>
                  <div className="text-xs font-mono text-violet-700 dark:text-violet-300">
                    {project.technologies.join(' • ')}
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-1 font-light">
                    {project.keyHighlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-violet-600 dark:text-violet-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Activities */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">
              Leadership &amp; Campus Responsibilities
            </h2>
            <div className="space-y-3">
              {leadershipExperience.map((role, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-white/[0.06] space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">{role.role} — {role.organization}</span>
                    <span className="font-mono text-zinc-500 text-[11px]">{role.period}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-light">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-[#101118] border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>Verified against academic &amp; technical credentials</span>
          <button
            onClick={onClose}
            className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors font-medium cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
