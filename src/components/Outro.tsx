import { soundManager } from '../utils/soundEffects';

interface OutroProps {
  onOpenResume?: () => void;
}

export default function Outro({ onOpenResume }: OutroProps) {
  return (
    <footer className="py-24 bg-[var(--color-paper)] text-[var(--color-ink)] paper-grain relative overflow-hidden">
      {/* 1. Centered Outro Statement */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4 mb-20">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold font-sans tracking-tight text-[var(--color-ink)]">
          that’s all from
        </h2>
        <p className="text-5xl sm:text-7xl md:text-8xl font-sans font-bold text-[var(--color-ink-dim)]">
          my side.
        </p>
      </div>

      {/* 2. Mountain Summit Contour Curve with K2 Elevation */}
      <div className="max-w-6xl mx-auto px-6 relative my-12">
        <div className="relative w-full h-56 flex flex-col items-center justify-end overflow-hidden">
          {/* SVG Peak Curve */}
          <svg
            viewBox="0 0 1000 200"
            className="w-full h-full stroke-current text-zinc-800 dark:text-zinc-300 fill-none stroke-[2]"
          >
            <path d="M0 200 L300 200 Q450 190 500 20 Q550 190 700 200 L1000 200" />
            <path d="M500 20 L500 200" strokeDasharray="3 4" className="stroke-zinc-400 stroke-1" />
          </svg>

          {/* Summit Pin & Labels */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-red-500/30"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-[var(--color-paper)] px-2 py-0.5 rounded">
              DEATH ZONE • ABOVE 8,000 M
            </span>
          </div>

          {/* Headline on peak */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
            <p className="text-3xl sm:text-5xl font-bold font-sans text-[var(--color-ink)]">
              now let’s build{' '}
              <em className="font-editorial italic font-normal text-[var(--color-accent)]">something remarkable.</em>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Footer Split Grid: Someday K2 on Left, Contact/Resume on Right */}
      <div className="max-w-6xl mx-auto px-6 pt-12 border-t border-[var(--color-line)] grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        {/* Left Column: Personal Ambition & Ethos */}
        <div className="md:col-span-6 space-y-3">
          <h4 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--color-ink)] tracking-tight">
            someday, k2<span className="text-[var(--color-accent)]">.</span>
          </h4>
          <p className="text-xs sm:text-sm text-[var(--color-ink-dim)] font-sans font-light leading-relaxed max-w-md">
            8,611 metres, and the mountain's long-held reputation: roughly one climber lost for every four who have stood on top. Which is precisely why turning hard problems into working software won’t leave me alone.
          </p>
          <p className="font-hand text-xl text-[var(--color-accent)] pt-1">
            see you there ↗
          </p>
        </div>

        {/* Right Column: Resume Button + Large Email + Socials */}
        <div className="md:col-span-6 space-y-6 flex flex-col items-start md:items-end">
          <div className="flex items-center gap-3">
            {onOpenResume && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-[var(--color-accent)] hover:opacity-90 text-white shadow-md cursor-pointer transition-transform hover:scale-105"
              >
                resume ↗
              </button>
            )}
          </div>

          {/* Giant Email Link */}
          <a
            href="mailto:anushkadwivedi75@gmail.com"
            onClick={() => soundManager.playPop()}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-[var(--color-ink)] hover:text-[var(--color-accent)] underline underline-offset-8 transition-colors"
          >
            anushkadwivedi75@gmail.com
          </a>

          {/* Social Links Row */}
          <div className="flex items-center gap-6 text-xs font-mono text-[var(--color-ink-dim)]">
            <a
              href="https://www.linkedin.com/in/anushkadwivedi"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/anushkadwivedi75"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              X (Twitter) ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Minimalist Copyright Baseline */}
      <div className="max-w-6xl mx-auto px-6 pt-12 mt-12 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--color-ink-dim)]">
        <span>© 2026 Anushka Dwivedi. Mumbai, India</span>
        <span>Crafted with precision &amp; care.</span>
      </div>
    </footer>
  );
}
