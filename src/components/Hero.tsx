import { soundManager } from '../utils/soundEffects';
import ConnectedSystemsCanvas from './ConnectedSystemsCanvas';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <header className="min-h-screen pt-28 pb-14 px-6 sm:px-12 lg:px-20 flex flex-col justify-between relative bg-[var(--canvas-bg)] text-[var(--canvas-text)] paper-grain overflow-hidden">
      {/* Interactive Constellation Background (Restored from Initial Design) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 z-0">
        <ConnectedSystemsCanvas />
      </div>

      {/* Subtle Dot Grid Pattern Vignette */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 dark:opacity-25 pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <nav className="absolute top-0 left-0 right-0 py-6 px-6 sm:px-12 lg:px-20 flex items-center justify-between z-30">
        <a
          href="#hero"
          onClick={() => soundManager.playPop()}
          className="font-sans font-bold text-base tracking-tight text-[var(--canvas-text)] hover:opacity-80 transition-opacity"
        >
          anushka.
        </a>

        <div className="flex items-center gap-6 sm:gap-8 text-xs font-mono">
          <a
            href="#work"
            onClick={() => soundManager.playPop()}
            className="text-[var(--color-ink-dim)] hover:text-[var(--canvas-text)] transition-colors"
          >
            work
          </a>
          <a
            href="#snippets"
            onClick={() => soundManager.playPop()}
            className="text-[var(--color-ink-dim)] hover:text-[var(--canvas-text)] transition-colors"
          >
            systems
          </a>
          <a
            href="#about"
            onClick={() => soundManager.playPop()}
            className="text-[var(--color-ink-dim)] hover:text-[var(--canvas-text)] transition-colors"
          >
            about me
          </a>
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            className="text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            resume ↗
          </button>
        </div>
      </nav>

      {/* Main Hero Content Stage */}
      <div className="my-auto pt-8 sm:pt-12 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Wordmark & Typography */}
        <div className="lg:col-span-6 space-y-8">
          {/* Eyebrow */}
          <div className="space-y-1">
            <p className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-ink-dim)] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI/ML Engineer &amp; Full-Stack Developer</span>
            </p>
          </div>

          {/* Hand-drawn "hey, I'm" with SVG arrow */}
          <div className="relative inline-block">
            <div className="flex items-center gap-2">
              <span className="font-hand text-3xl sm:text-4xl text-[var(--canvas-text)] -rotate-3">
                hey, I’m
              </span>
              <svg
                viewBox="0 0 50 35"
                className="w-10 h-7 text-[var(--color-accent)] fill-none stroke-current stroke-2 rotate-6"
              >
                <path d="M4 8C20 3 36 8 42 26" strokeLinecap="round" />
                <path d="M34 22l8 6 6-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Giant Signature Display Wordmark */}
            <div className="relative mt-1">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter font-sans text-[var(--canvas-text)] leading-none select-none">
                anushka<span className="text-[var(--color-accent)] cursor-pointer inline-block hover:scale-125 transition-transform">.</span>
              </h1>
            </div>
          </div>

          {/* Subtitle Statement */}
          <div className="pt-2 max-w-md text-base sm:text-lg leading-relaxed text-[var(--canvas-text)] font-normal space-y-1">
            <p>I build intelligent products.</p>
            <p className="text-[var(--color-ink-dim)]">
              I also like making them <em className="font-editorial italic font-normal text-[var(--canvas-text)]">work.</em>
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="pt-3 flex items-center gap-4 text-xs font-mono">
            <a
              href="#work"
              onClick={() => soundManager.playPop()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--canvas-text)] text-[var(--canvas-bg)] font-sans font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              <span>Explore My Work</span>
              <span>↓</span>
            </a>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              className="px-4 py-2.5 rounded-full border border-zinc-300 dark:border-white/10 hover:border-violet-400 text-[var(--canvas-text)] font-sans transition-colors cursor-pointer"
            >
              View CV ↗
            </button>
          </div>
        </div>

        {/* Right Column: Three Editorial Picture Templates with Paperclips & Tape */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] sm:min-h-[480px]">
          
          {/* Picture Template 1 (Top-Left, tilted -6deg) */}
          <div
            onClick={() => soundManager.playPop()}
            className="w-52 sm:w-60 p-3 pb-7 rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transform -rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer absolute -top-4 sm:top-2 left-2 sm:left-6 z-10 group"
          >
            {/* Paper clip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-8 border-2 border-zinc-400 dark:border-zinc-300 rounded-full z-20 pointer-events-none group-hover:-translate-y-0.5 transition-transform"></div>

            {/* Photo slot */}
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-violet-950 via-indigo-900 to-black flex flex-col justify-end p-3 text-white overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 opacity-40 bg-grid-pattern"></div>
              {/* Telemetry wave graphic */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></span>
                <span className="text-[9px] font-mono text-violet-300">EPOCH 400</span>
              </div>
              <span className="text-[10px] font-mono text-violet-300 relative z-10">DJSCE AI/ML LAB</span>
              <span className="text-xs font-bold font-sans relative z-10">Model Training Room</span>
            </div>
            <p className="font-hand text-base text-zinc-700 dark:text-zinc-300 text-center mt-2.5 -rotate-1">
              usually thinking about loss curves
            </p>
          </div>

          {/* Picture Template 2 (Top-Right, tilted +8deg) */}
          <div
            onClick={() => soundManager.playPop()}
            className="w-52 sm:w-60 p-3 pb-7 rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transform rotate-8 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer absolute top-12 sm:top-8 right-2 sm:right-6 z-15 group"
          >
            {/* Paper clip */}
            <div className="absolute -top-3 right-8 w-6 h-8 border-2 border-zinc-400 dark:border-zinc-300 rounded-full z-20 pointer-events-none group-hover:-translate-y-0.5 transition-transform"></div>

            {/* Photo slot */}
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-emerald-950 via-zinc-900 to-black flex flex-col justify-end p-3 text-white overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 opacity-30 bg-grid-pattern"></div>
              {/* Sensor graphic */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] font-mono text-emerald-300">AQI 24 LIVE</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 relative z-10">AIRSENTINEL 300M</span>
              <span className="text-xs font-bold font-sans relative z-10">Spatial Sensor Test</span>
            </div>
            <p className="font-hand text-base text-zinc-700 dark:text-zinc-300 text-center mt-2.5 rotate-1">
              a small 300m spatial IoT run
            </p>
          </div>

          {/* Picture Template 3 (Bottom Center, tilted -2deg) */}
          <div
            onClick={() => soundManager.playPop()}
            className="w-54 sm:w-64 p-3 pb-7 rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 group"
          >
            {/* Washi Masking Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/80 dark:bg-amber-100/30 backdrop-blur-xs -rotate-2 shadow-xs border-x border-amber-300/40 rounded-xs pointer-events-none"></div>

            {/* Photo slot */}
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-950 via-zinc-900 to-black flex flex-col justify-end p-3 text-white overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 opacity-30 bg-grid-pattern"></div>
              {/* Code glyph */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                <span className="text-[9px] font-mono text-violet-300">FULL-STACK</span>
              </div>
              <span className="text-[10px] font-mono text-violet-400 relative z-10">SYSTEMS &amp; INTERFACES</span>
              <span className="text-xs font-bold font-sans relative z-10">Late Night Studio Desk</span>
            </div>
            <p className="font-hand text-base text-zinc-700 dark:text-zinc-300 text-center mt-2.5">
              building tools people love using ☕
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}
