import { useState } from 'react';
import { BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';
import type { AchievementItem } from '../types';

export default function Achievements() {
  const [filter, setFilter] = useState<'All' | AchievementItem['category']>('All');

  const categories: ('All' | AchievementItem['category'])[] = [
    'All',
    'Academic Honor',
    'Competition & Hackathon',
    'Certification'
  ];

  const filteredAchievements =
    filter === 'All'
      ? achievementsData
      : achievementsData.filter((item) => item.category === filter);

  return (
    <section id="achievements" className="py-28 border-b border-white/[0.08] dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
                05 / Recognition &amp; Honors
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
              Honors, hackathons, &amp;{' '}
              <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300 tracking-normal px-1">
                certifications
              </span>
              .
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-[#0c0d13] border border-zinc-200 dark:border-white/[0.08]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-violet-600 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] hover:border-violet-500/40 dark:hover:border-violet-500/30 transition-all duration-300 space-y-5 shadow-sm hover:shadow-lg dark:shadow-none flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Meta Badge & Period */}
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/25 px-2.5 py-0.5 rounded font-semibold">
                    {item.badgeText || item.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{item.period}</span>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.issuerOrEvent}
                  </div>
                </div>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Highlights Bulleted List */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.06] space-y-2">
                {item.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Placeholder Guarantee */}
        <div className="p-4 rounded-2xl bg-zinc-100/90 dark:bg-[#0a0b10] border border-zinc-200 dark:border-white/[0.05] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-violet-500" />
            <span>Official academic transcript, certificates, and code repositories are available for verification.</span>
          </div>
          <span className="text-zinc-500 dark:text-zinc-400">Zero fabricated awards or synthetic metrics.</span>
        </div>
      </div>
    </section>
  );
}
