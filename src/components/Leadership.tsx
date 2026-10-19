import { Users, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { leadershipExperience } from '../data/portfolioData';

export default function Leadership() {
  return (
    <section id="leadership" className="py-28 border-b border-white/[0.06] relative">
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
            Initiative, community, &amp;{' '}
            <span className="font-editorial italic font-normal text-violet-300 tracking-normal px-1">
              technical leadership
            </span>
            .
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base font-light leading-relaxed">
            Beyond individual code contributions, I actively contribute to the technical culture and student community at SVKM's DJS College of Engineering.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {leadershipExperience.map((role, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#0c0d13] border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between space-y-7 shadow-2xl relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <span className="text-xs font-mono font-medium text-violet-300 bg-violet-500/10 border border-violet-500/25 px-2.5 py-1 rounded">
                    {role.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{role.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 font-sans">
                    {role.role}
                  </h3>
                  <div className="text-sm font-semibold text-zinc-300 mt-1 flex items-center gap-2">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span>{role.organization}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {role.description}
                </p>

                {/* Verified Responsibilities */}
                <div className="space-y-2 pt-3 border-t border-white/[0.05]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                    Key Contributions &amp; Scope
                  </span>
                  <ul className="space-y-2">
                    {role.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>DJSCE Campus Society</span>
                <span className="text-violet-400/90 flex items-center gap-1 font-sans">
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
