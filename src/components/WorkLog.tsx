import { FileText, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface WorkLogProps {
  onOpenResume: () => void;
}

export default function WorkLog({ onOpenResume }: WorkLogProps) {
  const experiences = [
    {
      index: '01',
      org: 'DJS ACM SIGAI',
      sub: 'Special Interest Group on Artificial Intelligence',
      role: 'Vice Chairperson Administrator',
      period: 'now',
      isNow: true,
      tag: 'Technical Leadership & AI Workshops'
    },
    {
      index: '02',
      org: 'SVKM\'s DJSCE',
      sub: 'Honours in Quantitative Finance & Fintech Track',
      role: 'Honours Researcher & Candidate',
      period: 'now',
      isNow: true,
      tag: 'Financial Engineering & Stochastic Models'
    },
    {
      index: '03',
      org: 'DJS eXpress',
      sub: 'Campus Initiatives & Operations',
      role: 'Events Head',
      period: '2025 – 2026',
      isNow: false,
      tag: 'Event Ideation, Logistics & Cross-Team Operations'
    },
    {
      index: '04',
      org: 'AirSentinel & SAT-SA',
      sub: 'Independent Systems & Applied ML Engineering',
      role: 'Lead Systems Architect & Developer',
      period: '2025 – 2026',
      isNow: false,
      tag: 'PostGIS Spatial Telemetry & SOC Analytics'
    }
  ];

  return (
    <div className="pt-12 space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/80 dark:border-white/[0.08] pb-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
            Chronology &amp; Experience Log
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Where I’ve been{' '}
            <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300">
              building &amp; leading
            </span>
            .
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          Curated timeline of technical &amp; leadership roles
        </span>
      </div>

      {/* Samay-style WorkLog Table Grid */}
      <div className="rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] overflow-hidden shadow-sm">
        <ul className="divide-y divide-zinc-200/80 dark:divide-white/[0.06] m-0 p-0 list-none">
          {experiences.map((item) => (
            <li
              key={item.index}
              onMouseEnter={() => soundManager.playPop()}
              className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center hover:bg-violet-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200 group cursor-default"
            >
              {/* Index & Org Name */}
              <div className="sm:col-span-4 flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {item.index}
                </span>
                <div className="space-y-0.5">
                  <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                    {item.org}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono line-clamp-1">
                    {item.sub}
                  </div>
                </div>
              </div>

              {/* Role Title */}
              <div className="sm:col-span-4 space-y-0.5">
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                  {item.role}
                </span>
                <div className="text-[11px] text-zinc-500 font-light">
                  {item.tag}
                </div>
              </div>

              {/* Timeline Status Badge */}
              <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                    item.isNow
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/25 flex items-center gap-1.5'
                      : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-white/[0.06]'
                  }`}
                >
                  {item.isNow && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                  {item.period}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Samay-style Footnote with Cursive Touch */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-100/70 dark:bg-[#0c0d14] border border-zinc-200/80 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-editorial italic text-base text-violet-700 dark:text-violet-300">
            The serious bit, in one consolidated resume?
          </span>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenResume();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-violet-400" />
          <span>Open Printable CV Modal</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
