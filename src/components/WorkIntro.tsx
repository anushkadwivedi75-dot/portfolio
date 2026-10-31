import { ArrowDown } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function WorkIntro() {
  return (
    <section className="py-24 border-b border-zinc-200/80 dark:border-white/[0.06] paper-grain relative bg-[var(--canvas-bg)]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 text-xs font-mono text-violet-700 dark:text-violet-300">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
          <span>01 / Selected Production Systems</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-normal font-editorial text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.15]">
          welcome to my{' '}
          <span className="italic text-violet-600 dark:text-violet-300">work section.</span>
        </h2>

        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-lg mx-auto leading-relaxed">
          Four full-stack architectures spanning spatial IoT telemetry, applied document intelligence, distributed cloud storage, and SOC assessment analytics.
        </p>

        <div className="pt-2">
          <a
            href="#work"
            onClick={() => soundManager.playPop()}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
          >
            <span>keep scrolling to enter void rail</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
