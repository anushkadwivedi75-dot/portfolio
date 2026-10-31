import { GraduationCap, Compass, Code2, CheckCircle2 } from 'lucide-react';
import { educationInfo, personalInfo } from '../data/portfolioData';
import DesignEngineeringHUD from './DesignEngineeringHUD';
import WorkLog from './WorkLog';

interface AboutProps {
  onOpenResume?: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  return (
    <section id="about" className="py-28 border-b border-zinc-200/80 dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
              02 / Background &amp; Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Engineering software with{' '}
            <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300 tracking-normal px-1">
              intellectual curiosity
            </span>{' '}
            &amp; systemic rigor.
          </h2>
        </div>

        {/* Split Grid: Narrative + Structured Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base font-light">
            <p className="text-lg text-zinc-900 dark:text-zinc-200 font-normal leading-relaxed">
              I am an AI &amp; Machine Learning undergraduate at SVKM's DJS College of Engineering. I build end-to-end software where algorithmic intelligence meets resilient full-stack architecture.
            </p>

            {personalInfo.bioNarrative.map((paragraph, idx) => (
              <p key={idx} className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Core Values Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.07] space-y-2 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                  <Code2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>End-to-End Ownership</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Architecting across the entire spectrum: from embedded BLE microcontrollers to PostgreSQL/PostGIS spatial databases and reactive clients.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.07] space-y-2 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                  <Compass className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Build-to-Learn Ethos</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Refining technical capabilities through hackathons, technical leadership in SIGAI, and tackling real spatial &amp; NLP domain constraints.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Unified Education Card */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.08] relative overflow-hidden space-y-6 shadow-xl shadow-zinc-200/50 dark:shadow-2xl">
              {/* Ambient accent glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200 font-semibold text-sm">
                  <GraduationCap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Academic Foundation</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">{educationInfo.duration}</span>
              </div>

              {/* Institution & Degree */}
              <div className="space-y-1.5">
                <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                  {educationInfo.institution}
                </div>
                <div className="text-xs font-mono text-violet-600 dark:text-violet-300 font-medium">
                  {educationInfo.degree} — {educationInfo.specialization}
                </div>
                <div className="text-xs text-zinc-500">
                  {educationInfo.location}
                </div>
              </div>

              {/* Score / Honours Badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#12131b] border border-zinc-200/80 dark:border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    Cumulative CGPA
                  </span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {educationInfo.cgpa}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#12131b] border border-zinc-200/80 dark:border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    Honours Track
                  </span>
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 font-sans block line-clamp-2">
                    {educationInfo.honours}
                  </span>
                </div>
              </div>

              {/* Curriculum Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block font-semibold">
                  Program Highlights &amp; Focus
                </span>
                <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-light">
                  {educationInfo.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Systems Architecture HUD Canvas */}
        <DesignEngineeringHUD />

        {/* Samay-style Interactive Experience & Work Log Table */}
        {onOpenResume && <WorkLog onOpenResume={onOpenResume} />}
      </div>
    </section>
  );
}
