import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function WorkTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const scrolled = -rect.top;
          const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
          setProgress(p);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // =========================================================================
  // STRICT SEQUENTIAL SCROLL TIMELINE (ZERO CLUTTER, ZERO OVERLAPPING)
  //
  // Act 1: "welcome to my work section."
  //   - 0.00 to 0.16: Solid visible
  //   - 0.16 to 0.24: Fades out cleanly
  //   - 0.24+: Completely invisible
  //
  // Act 2: "but first, put these on."
  //   - < 0.28: Completely invisible
  //   - 0.28 to 0.35: Fades in cleanly
  //   - 0.35 to 0.48: Solid visible, centered
  //   - 0.48 to 0.55: Fades out cleanly
  //   - 0.55+: Completely invisible
  //
  // Act 3: VR Headset appears and enlarges like putting it on
  //   - < 0.58: Completely invisible (both texts are gone!)
  //   - 0.58 to 0.65: Headset fades in at center of screen (scale 0.85 -> 1.0)
  //   - 0.65 to 0.94: Headset dramatically enlarges (scale 1.0 -> 24.0)
  //   - 0.85 to 0.98: Deep dark void dissolves as lenses fill the eyes
  //   - 0.98+: Seamless arrival into #work
  // =========================================================================

  // Step 1: "welcome to my work section."
  let text1Opacity = 0;
  let text1Y = 0;
  if (progress <= 0.16) {
    text1Opacity = 1;
    text1Y = 0;
  } else if (progress < 0.24) {
    const t = (progress - 0.16) / (0.24 - 0.16);
    text1Opacity = 1 - t;
    text1Y = -t * 35;
  } else {
    text1Opacity = 0;
    text1Y = -35;
  }

  // Step 2: "but first, put these on."
  let text2Opacity = 0;
  let text2Y = 0;
  if (progress < 0.28) {
    text2Opacity = 0;
    text2Y = 35;
  } else if (progress <= 0.35) {
    const t = (progress - 0.28) / (0.35 - 0.28);
    text2Opacity = t;
    text2Y = (1 - t) * 35;
  } else if (progress <= 0.48) {
    text2Opacity = 1;
    text2Y = 0;
  } else if (progress < 0.55) {
    const t = (progress - 0.48) / (0.55 - 0.48);
    text2Opacity = 1 - t;
    text2Y = -t * 35;
  } else {
    text2Opacity = 0;
    text2Y = -35;
  }

  // Step 3: VR Headset appears alone, then enlarges exponentially like putting it on
  let headsetOpacity = 0;
  let headsetScale = 0.85;
  if (progress < 0.58) {
    headsetOpacity = 0;
    headsetScale = 0.85;
  } else if (progress <= 0.65) {
    // Fades in cleanly in center of screen
    const t = (progress - 0.58) / (0.65 - 0.58);
    headsetOpacity = t;
    headsetScale = 0.85 + t * 0.15; // 0.85 -> 1.0
  } else {
    // Both texts are long gone: Headset zooms directly towards the user
    headsetOpacity = 1;
    const t = Math.min(1, Math.max(0, (progress - 0.65) / (0.94 - 0.65)));
    headsetScale = 1.0 + Math.pow(t, 2.3) * 23.0; // 1.0 -> 24.0
  }

  // Step 4: Dark Void Dissolve (Passes through the dual optical chambers into #work)
  let voidOverlayOpacity = 0;
  if (progress > 0.84) {
    voidOverlayOpacity = Math.min(1, Math.max(0, (progress - 0.84) / (0.97 - 0.84)));
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--canvas-bg)] text-[var(--canvas-text)] paper-grain select-none"
      style={{ height: '380vh' }}
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* ================= ACT 1: "welcome to my work section." ================= */}
        {text1Opacity > 0 && (
          <div
            className="text-center flex flex-col items-center justify-center absolute inset-0 my-auto pointer-events-none transition-transform duration-75"
            style={{
              opacity: text1Opacity,
              transform: `translate3d(0, ${text1Y}px, 0)`,
            }}
          >
            <div className="flex flex-col items-center justify-center leading-none">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-[var(--canvas-text)] leading-none m-0">
                welcome to my
              </h2>
              <div className="relative inline-block mt-2 sm:mt-3">
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial italic font-normal text-[var(--canvas-text)] leading-none m-0">
                  work section.
                </h2>
                {/* Red drawn squiggle underline */}
                <svg
                  viewBox="0 0 320 24"
                  className="w-full h-4 sm:h-6 text-[var(--color-accent)] fill-none stroke-current stroke-[3] mt-1.5"
                >
                  <path
                    d="M4 14C50 6 120 22 170 12C220 2 280 18 316 10"
                    strokeLinecap="round"
                    className="animate-squiggle"
                  />
                </svg>
              </div>
            </div>

            <p className="text-xs font-mono text-[var(--color-ink-dim)] pt-8 flex items-center gap-1.5 animate-pulse">
              <span>scroll down</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </p>
          </div>
        )}

        {/* ================= ACT 2: "but first, put these on." ================= */}
        {text2Opacity > 0 && (
          <div
            className="text-center flex flex-col items-center justify-center absolute inset-0 my-auto pointer-events-none transition-transform duration-75"
            style={{
              opacity: text2Opacity,
              transform: `translate3d(0, ${text2Y}px, 0)`,
            }}
          >
            <div className="flex flex-col items-center justify-center leading-none space-y-2 sm:space-y-3">
              <h3 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-[var(--canvas-text)] leading-none m-0">
                but first,
              </h3>
              <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-light text-[var(--color-ink-dim)] leading-none m-0">
                put these on.
              </p>
            </div>
          </div>
        )}

        {/* ================= ACT 3: VR HEADSET ENLARGING LIKE PUTTING IT ON ================= */}
        {headsetOpacity > 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            style={{
              opacity: headsetOpacity,
              transform: `scale(${headsetScale})`,
              transformOrigin: '50% 50%',
              willChange: 'transform, opacity',
            }}
          >
            {/* Precision Spatial Visor (Apple Vision Pro style) */}
            <div className="relative w-80 sm:w-96 h-40 sm:h-48 rounded-[3rem] p-[3px] bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 dark:from-zinc-700 dark:via-zinc-500 dark:to-zinc-700 shadow-2xl flex items-center justify-center">
              
              {/* Outer Enclosure Frame */}
              <div className="w-full h-full rounded-[2.9rem] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-2.5 flex items-center justify-center relative overflow-hidden shadow-inner">
                
                {/* 3D Glass Surface Reflections & Specular Highlights */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-purple-400/20 pointer-events-none"></div>
                <div className="absolute top-2 left-10 w-28 h-5 bg-white/25 rounded-full blur-sm -rotate-6 pointer-events-none"></div>
                <div className="absolute bottom-2 right-12 w-20 h-3 bg-violet-400/20 rounded-full blur-xs pointer-events-none"></div>
                
                {/* Dual Micro-OLED Optical Chambers */}
                <div className="flex items-center justify-center gap-12 sm:gap-16 w-full h-full relative z-10">
                  {/* Left Lens Chamber */}
                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-violet-500/40 bg-zinc-900/90 shadow-[inset_0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full border border-violet-400/30 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-violet-400/80 animate-ping"></div>
                      <div className="w-3 h-3 rounded-full bg-violet-300 absolute"></div>
                    </div>
                    {/* Retina tracking sensor ring */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-violet-400/20 animate-spin" style={{ animationDuration: '12s' }}></div>
                  </div>

                  {/* Right Lens Chamber */}
                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-violet-500/40 bg-zinc-900/90 shadow-[inset_0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full border border-violet-400/30 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-violet-400/80 animate-ping"></div>
                      <div className="w-3 h-3 rounded-full bg-violet-300 absolute"></div>
                    </div>
                    {/* Retina tracking sensor ring */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-violet-400/20 animate-spin" style={{ animationDuration: '12s' }}></div>
                  </div>
                </div>

                {/* Spatial Audio Pods & Sensors */}
                <div className="absolute top-1.5 right-12 w-4 h-1.5 bg-zinc-400 rounded-full"></div>
                <div className="absolute top-1.5 left-12 w-6 h-1.5 bg-zinc-400 rounded-full"></div>
              </div>

              {/* Side Straps (Solo Knit Band) */}
              <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-7 sm:w-9 h-12 sm:h-14 bg-gradient-to-r from-zinc-500 to-zinc-400 dark:from-zinc-800 dark:to-zinc-700 rounded-l-xl shadow-md border-y border-l border-white/20 flex flex-col justify-around py-1.5 px-1">
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
              </div>
              <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-7 sm:w-9 h-12 sm:h-14 bg-gradient-to-l from-zinc-500 to-zinc-400 dark:from-zinc-800 dark:to-zinc-700 rounded-r-xl shadow-md border-y border-r border-white/20 flex flex-col justify-around py-1.5 px-1">
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
                <div className="h-0.5 bg-zinc-600/40 w-full rounded"></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Dark Void Dissolve (Engulfs screen into #0a0a0e as headset meets the eyes) */}
        {voidOverlayOpacity > 0 && (
          <div
            className="absolute inset-0 bg-[#0a0a0e] pointer-events-none z-30 transition-opacity duration-75"
            style={{ opacity: voidOverlayOpacity }}
          />
        )}

        {/* Skip to Work button at bottom right */}
        <a
          href="#work"
          onClick={() => soundManager.playPop()}
          className="absolute bottom-8 right-8 z-40 text-xs font-mono text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] underline underline-offset-4 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>SKIP TO WORK</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
