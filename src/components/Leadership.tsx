import { Calendar, CheckCircle2 } from 'lucide-react';
import { leadershipExperience } from '../data/portfolioData';

export default function Leadership() {
  return (
    <section id="leadership" className="py-28 border-b border-zinc-200/80 dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
              04 / Technical Leadership &amp; Community
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Initiatives, student mentorship, &amp;{' '}
            <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300 tracking-normal px-1">
              community impact
            </span>
            .
          </h2>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipExperience.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] hover:border-violet-500/40 dark:hover:border-violet-500/30 transition-all duration-300 space-y-6 shadow-sm hover:shadow-lg dark:shadow-none flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Meta Row: Period & Type */}
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-3">
                  <span className="text-xs font-mono text-violet-700 dark:text-violet-400 font-medium">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Role & Organization */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {item.organization}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Responsibilities Bullets */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.06] space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block font-semibold">
                  Key Responsibilities &amp; Impact
                </span>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
