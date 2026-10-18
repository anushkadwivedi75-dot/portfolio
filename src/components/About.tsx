import { GraduationCap, Award, BookOpen, Compass, Code2 } from 'lucide-react';
import { educationInfo, personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
              02 / Background &amp; Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 font-sans tracking-tight">
            Engineering software with intellectual curiosity &amp; systemic rigor.
          </h2>
        </div>

        {/* Split Grid: Narrative + Structured Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-base font-light">
            <p className="text-lg text-zinc-200 font-normal leading-relaxed">
              I am an AI &amp; Machine Learning undergraduate at SVKM's DJS College of Engineering. I build end-to-end software where algorithmic intelligence meets resilient full-stack architecture.
            </p>

            {personalInfo.bioNarrative.map((paragraph, idx) => (
              <p key={idx} className="text-zinc-400 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Core Values Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#121319] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  <span>End-to-End Ownership</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Architecting across the entire spectrum: from embedded BLE microcontrollers to PostgreSQL/PostGIS databases and reactive frontend clients.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121319] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Compass className="w-4 h-4 text-violet-400" />
                  <span>Build-to-Learn Ethos</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Refining technical capabilities through hackathons, technical leadership in SIGAI, and tackling real spatial &amp; NLP domain constraints.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Honours Block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#101117] border border-white/[0.08] relative overflow-hidden space-y-6 shadow-xl">
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                  <GraduationCap className="w-4 h-4 text-violet-400" />
                  <span>Academic Foundation</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">{educationInfo.duration}</span>
              </div>

              {/* Institution & Degree */}
              <div className="space-y-1.5">
                <div className="text-base font-bold text-zinc-100 font-sans">
                  {educationInfo.institution}
                </div>
                <div className="text-sm font-medium text-violet-300">
                  {educationInfo.degree}
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Major: {educationInfo.specialization}
                </div>
              </div>

              {/* CGPA & Standing */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#151722] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Cumulative CGPA
                  </span>
                  <div className="text-xl font-bold font-sans text-zinc-100 mt-0.5">
                    {educationInfo.cgpa}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#151722] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Campus Location
                  </span>
                  <div className="text-xs font-semibold text-zinc-200 mt-1">
                    {educationInfo.location}
                  </div>
                </div>
              </div>

              {/* Honours Specialization */}
              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
                  <Award className="w-4 h-4 text-violet-400" />
                  <span>Honours Specialization</span>
                </div>
                <div className="text-sm font-bold text-zinc-100">
                  {educationInfo.honours}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Rigorous focus on statistical modeling, mathematical finance, algorithmic trading fundamentals, and quantitative analytics.
                </p>
              </div>

              {/* Coursework & Competencies */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                  <span>Curriculum Highlights</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {educationInfo.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1 text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
