import { useState } from 'react';
import { 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import EditorialSectionHeading from './EditorialSectionHeading';
import ConnectedSystemsCanvas from './ConnectedSystemsCanvas';

type FilterType = 'all' | 'mobile' | 'web' | 'ai' | 'shipped';

interface SnippetItem {
  id: string;
  title: string;
  category: 'mobile' | 'web' | 'ai';
  tag: string;
  previewType: 'mobile-app' | 'dashboard' | 'terminal';
  accentColor: string;
}

export default function Snippets() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters = [
    { id: 'all', label: 'All', count: 18 },
    { id: 'mobile', label: 'Mobile', count: 6 },
    { id: 'web', label: 'Web', count: 8 },
    { id: 'ai', label: 'AI & Models', count: 4 },
  ];

  const snippets: SnippetItem[] = [
    {
      id: 'airsentinel-mobile',
      title: 'AirSentinel Mobile Hub',
      category: 'mobile',
      tag: 'Flutter • BLE GATT',
      previewType: 'mobile-app',
      accentColor: '#8b5cf6',
    },
    {
      id: 'legal-rag-ui',
      title: 'Legal Clause Scanner',
      category: 'web',
      tag: 'React • Vector RAG',
      previewType: 'dashboard',
      accentColor: '#10b981',
    },
    {
      id: 'drive-stream',
      title: 'Resumable Storage Stream',
      category: 'web',
      tag: 'Next.js • Firebase',
      previewType: 'dashboard',
      accentColor: '#3b82f6',
    },
    {
      id: 'soc-radar',
      title: 'SOC Incident Radar',
      category: 'ai',
      tag: 'MITRE ATT&CK Graph',
      previewType: 'terminal',
      accentColor: '#f43f5e',
    },
    {
      id: 'quant-optimizer',
      title: 'QuantAlpha Stress-Test',
      category: 'web',
      tag: 'FastAPI • Monte Carlo',
      previewType: 'dashboard',
      accentColor: '#eab308',
    },
  ];

  const filtered = snippets.filter((s) => activeFilter === 'all' || s.category === activeFilter);

  return (
    <section id="snippets" className="py-24 bg-[var(--color-paper)] text-[var(--color-ink)] paper-grain relative border-b border-[var(--color-line)] overflow-hidden select-none">
      {/* Interactive Constellation Background */}
      <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-75 z-0">
        <ConnectedSystemsCanvas />
      </div>

      {/* 1. Pre-Header: The Work Between the Case Studies */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <EditorialSectionHeading
          tag="02 / Experimental Systems & Exploration"
          line1="the work between"
          line2="the case studies."
          subtitle="screens, interactions & little experiments."
          align="center"
          hasSquiggle={true}
        />
      </div>

      {/* 2. Topographic Mountain Illustration with Interactive Milestone Peaks */}
      <div className="max-w-6xl mx-auto px-6 relative mb-20">
        <div className="relative w-full h-44 sm:h-56 flex items-end justify-center overflow-hidden">
          {/* Hand-drawn Mountain SVG Contour */}
          <svg
            viewBox="0 0 1000 240"
            className="w-full h-full stroke-current text-zinc-400 dark:text-zinc-600 fill-none stroke-[1.5]"
          >
            {/* Background Mountains */}
            <path
              d="M0 240 L120 160 L240 210 L380 90 L480 180 L620 60 L740 170 L860 110 L1000 240"
              className="opacity-40"
            />
            {/* Foreground Main Peaks */}
            <path
              d="M0 240 L180 120 L320 180 L500 40 L680 160 L820 90 L1000 240"
              className="stroke-[2] text-zinc-700 dark:text-zinc-400"
            />
            {/* Shading hatched lines */}
            <path d="M500 40 L500 240" strokeDasharray="3 3" className="opacity-30" />
            <path d="M180 120 L180 240" strokeDasharray="3 3" className="opacity-30" />
            <path d="M820 90 L820 240" strokeDasharray="3 3" className="opacity-30" />
          </svg>

          {/* Interactive Milestone Red Dots along the Peaks */}
          <div className="absolute inset-0 flex items-center justify-between px-10 pointer-events-none">
            {/* Peak 1: Mobile */}
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveFilter('mobile');
              }}
              className="pointer-events-auto absolute top-24 left-[18%] -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <span className="w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-red-500/20 group-hover:scale-125 transition-transform"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink)] font-bold">
                MOBILE
              </span>
            </button>

            {/* Peak 2: AI & ML (Summit) */}
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveFilter('ai');
              }}
              className="pointer-events-auto absolute top-6 left-[50%] -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] ring-4 ring-red-500/30 animate-pulse group-hover:scale-125 transition-transform"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-accent)] font-bold bg-white dark:bg-zinc-900 px-2 py-0.5 rounded shadow-sm border border-red-500/20">
                AI / ML SUMMIT
              </span>
            </button>

            {/* Peak 3: Web & Cloud */}
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveFilter('web');
              }}
              className="pointer-events-auto absolute top-16 left-[82%] -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <span className="w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-red-500/20 group-hover:scale-125 transition-transform"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink)] font-bold">
                WEB &amp; CLOUD
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section Title & Category Filter Pills */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-line)] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-dim)] font-semibold block">
              02 / UI Snippets
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[var(--color-ink)] tracking-tight">
              little pieces of UI,{' '}
              <em className="font-editorial italic font-normal text-[var(--color-accent)]">
                across web, mobile &amp; spatial systems.
              </em>
            </h2>
            <p className="text-xs font-mono text-[var(--color-ink-dim)] uppercase tracking-wider">
              DIFFERENT SCREENS. SAME CRAFT.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-white dark:bg-zinc-900 border border-[var(--color-line)] shadow-sm text-xs font-mono self-start md:self-end">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveFilter(f.id as FilterType);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                    : 'text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]'
                }`}
              >
                <span>{f.label}</span>
                <span className="text-[10px] opacity-75">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Horizontal Phone Screens Carousel (Exact match to video 00:43) */}
        <div className="pt-4 overflow-x-auto pb-8 scrollbar-none flex gap-6 snap-x">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[240px] sm:w-[260px] rounded-[2.5rem] bg-zinc-950 p-3 shadow-2xl border-4 border-zinc-800 relative flex flex-col justify-between overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Dynamic Island / Notch */}
              <div className="w-20 h-4 bg-zinc-900 rounded-full mx-auto my-1 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-zinc-950"></span>
              </div>

              {/* Inner Screen UI Mockup */}
              <div className="h-[380px] rounded-[1.8rem] bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 text-white flex flex-col justify-between overflow-hidden relative border border-white/5">
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>9:41</span>
                    <span className="text-violet-400 font-bold">5G • 100%</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider block">
                      {item.tag}
                    </span>
                    <h4 className="text-base font-bold font-sans tracking-tight text-white mt-1">
                      {item.title}
                    </h4>
                  </div>

                  {/* UI Card Graphic inside phone */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 mt-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span>Live Telemetry</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-violet-500 w-3/4"></div>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Spatial divergence: 0.14 delta
                    </p>
                  </div>
                </div>

                {/* Bottom phone action */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>Interactive Node</span>
                  <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto my-1.5"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => soundManager.playPop()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold bg-white dark:bg-zinc-900 border border-[var(--color-line)] shadow-sm hover:border-[var(--color-accent)] transition-all cursor-pointer"
          >
            <span>VIEW ALL 38 DESIGNS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
