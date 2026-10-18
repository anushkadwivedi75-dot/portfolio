import { Users, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { leadershipExperience } from '../data/portfolioData';

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
              04 / Leadership &amp; Community
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 font-sans tracking-tight">
            Initiative, community, &amp; technical leadership.
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base font-light">
            Beyond individual code contributions, I actively contribute to the technical culture and student community at SVKM's DJS College of Engineering.
          </p>
        </div>

        {/* Leadership Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {leadershipExperience.map((role, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[#101117] border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"
            >
              {/* Subtle accent bar on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/40 via-violet-400/20 to-transparent"></div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded">
                    {role.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{role.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
                    {role.role}
                  </h3>
                  <div className="text-sm font-semibold text-zinc-300 mt-1 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span>{role.organization}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {role.description}
                </p>

                {/* Verified Responsibilities */}
                <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                    Key Contributions
                  </span>
                  <ul className="space-y-2">
                    {role.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>DJSCE Campus Leadership</span>
                <span className="text-violet-400/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Active Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
