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
- Programming: C/C++, Python, Java, JavaScript, HTML5, CSS3, SQL, TypeScript
- Web Development: ReactJS, Express.js, FastAPI, Tailwind CSS, Bootstrap, Next.js, Node.js
- Developer Tools & Platforms: Git, GitHub, Docker, VS Code, Figma, Firebase, Supabase, MongoDB
- AI & Data: PostgreSQL, PostGIS, scikit-learn, SQLite, Vector Databases, ESP32, BLE

PROJECTS
1. AirSentinel: AQI Monitoring System
   Flutter, FastAPI, PostgreSQL, PostGIS, SQLite, Python, scikit-learn, ESP32, BLE, Docker
   - Evaluated spatial divergence between community sensors and CPCB stations within 300m via PostGIS ST_DWithin.
   - Isolation Forest anomaly detection over rolling 48-hour window. Offline-first SQLite batch sync.

2. Cloud Drive Clone
   React, Firebase Auth, Firebase Storage, TypeScript, Tailwind CSS
   - Resumable multi-file uploads with progress tracking, nested folder structures, and Google OAuth.

3. Legal Simplifier AI
   React, Next.js, TypeScript, Tailwind CSS, Node.js, Firebase, Gemini API, Vector Database
   - Plain-language legal summaries, clause-by-clause contract comparisons, vector semantic search, risk classification.

LEADERSHIP & EXTRACURRICULARS
- VCP Admin, DJS ACM SIGAI (2026 – Present)
- Events Head, DJS eXpress (2025 – 2026)
    `.trim();

    navigator.clipboard.writeText(plainResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0e0f16] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Header Controls */}
        <div className="px-6 py-4 bg-[#13141f] border-b border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span id="resume-title">Curriculum Vitae — {personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlainText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.06] transition-colors cursor-pointer"
              title="Copy formatted plain text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
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
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-300 font-sans print:bg-white print:text-black">
          {/* Header Info */}
          <div className="border-b border-white/[0.08] pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
              {personalInfo.name}
            </h1>
            <div className="text-violet-300 font-medium text-sm">
              {personalInfo.roleTitle}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-2">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-zinc-200">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <span>{personalInfo.email}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                <span>{personalInfo.location}</span>
              </span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-violet-400 hover:underline">
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-violet-400 hover:underline">
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Education
            </h2>
            <div className="p-4 rounded-xl bg-[#13141f] border border-white/[0.05] space-y-2">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <div className="font-bold text-zinc-100 text-sm">{educationInfo.institution}</div>
                <div className="text-xs font-mono text-zinc-400">{educationInfo.duration}</div>
              </div>
              <div className="text-xs text-zinc-300">
                {educationInfo.degree} in {educationInfo.specialization}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-violet-300 pt-1">
                <span>CGPA: <strong className="text-zinc-100">{educationInfo.cgpa}</strong></span>
                <span>Honours: <strong className="text-zinc-100">{educationInfo.honours}</strong></span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#13141f] border border-white/[0.05] space-y-1">
                <div className="font-mono text-zinc-400 text-[11px] font-semibold">PROGRAMMING</div>
                <div className="text-zinc-200">C/C++, Python, Java, JavaScript, TypeScript, SQL, HTML5, CSS3</div>
              </div>
              <div className="p-3 rounded-lg bg-[#13141f] border border-white/[0.05] space-y-1">
                <div className="font-mono text-zinc-400 text-[11px] font-semibold">WEB &amp; BACKEND</div>
                <div className="text-zinc-200">ReactJS, Next.js, FastAPI, Express.js, Tailwind CSS, Bootstrap, Node.js</div>
              </div>
              <div className="p-3 rounded-lg bg-[#13141f] border border-white/[0.05] space-y-1">
                <div className="font-mono text-zinc-400 text-[11px] font-semibold">TOOLS &amp; PLATFORMS</div>
                <div className="text-zinc-200">Git, GitHub, Docker, VS Code, Figma, Firebase, Supabase, MongoDB</div>
              </div>
              <div className="p-3 rounded-lg bg-[#13141f] border border-white/[0.05] space-y-1">
                <div className="font-mono text-zinc-400 text-[11px] font-semibold">AI, DATA &amp; SPATIAL</div>
                <div className="text-zinc-200">PostgreSQL, PostGIS, scikit-learn, SQLite, Vector Databases, ESP32, BLE</div>
              </div>
            </div>
          </div>

          {/* Selected Work */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Production Projects
            </h2>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-[#13141f] border border-white/[0.05] space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <div className="font-bold text-zinc-100 text-sm">
                      {project.title} — {project.subtitle}
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{project.timeline}</span>
                  </div>
                  <div className="text-xs font-mono text-violet-300">
                    {project.technologies.join(' • ')}
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400 pt-1">
                    {project.keyHighlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">•</span>
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
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Leadership &amp; Campus Activities
            </h2>
            <div className="space-y-3">
              {leadershipExperience.map((role, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#13141f] border border-white/[0.05] space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-200">{role.role} — {role.organization}</span>
                    <span className="font-mono text-zinc-500 text-[11px]">{role.period}</span>
                  </div>
                  <p className="text-zinc-400">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="px-6 py-3 bg-[#13141f] border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>Verified against academic &amp; technical credentials</span>
          <button
            onClick={onClose}
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
