import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import StandingTelescope from './StandingTelescope';

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

  // Step 2: "but first, look closely."
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

  // Step 3: Standing Telescope rotates in place, then zooms into eyepiece
  let telescopeOpacity = 0;
  let telescopeRotateY = -30;
  let telescopeRotateX = 7;
  let telescopeScale = 1.0;

  if (progress >= 0.55 && progress <= 0.62) {
    const t = (progress - 0.55) / (0.62 - 0.55);
    telescopeOpacity = t;
    telescopeScale = 0.92 + t * 0.08;
    telescopeRotateY = -30;
    telescopeRotateX = 7;
  } else if (progress > 0.62 && progress <= 0.75) {
    telescopeOpacity = 1;
    const t = (progress - 0.62) / (0.75 - 0.62);
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    telescopeRotateY = -30 * (1 - ease);
    telescopeRotateX = 7 * (1 - ease);
    telescopeScale = 1.0;
  } else if (progress > 0.75 && progress <= 0.96) {
    const t = (progress - 0.75) / (0.96 - 0.75);
    telescopeOpacity = t > 0.85 ? Math.max(0, (1 - t) / 0.15) : 1;
    telescopeRotateY = 0;
    telescopeRotateX = 0;
    telescopeScale = 1.0 + Math.pow(t, 2.4) * 31.0;
  } else {
    telescopeOpacity = 0;
  }

  // Step 4: Dark Void Dissolve (Passes through the eyepiece into #work)
  let voidOverlayOpacity = 0;
  if (progress > 0.86) {
    voidOverlayOpacity = Math.min(1, Math.max(0, (progress - 0.86) / (0.98 - 0.86)));
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

        {/* ================= ACT 2: "but first, look closely." ================= */}
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
              <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial italic font-normal text-amber-200 leading-none m-0">
                look closely.
              </p>
            </div>
          </div>
        )}

        {/* ================= ACT 3: STANDING TELESCOPE ROTATING & ENLARGING ================= */}
        {telescopeOpacity > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <StandingTelescope
              rotateY={telescopeRotateY}
              rotateX={telescopeRotateX}
              scale={telescopeScale}
              opacity={telescopeOpacity}
            />
          </div>
        )}

        {/* Step 4: Dark Void Dissolve (Engulfs screen into #0a0a0e as eyepiece meets the eyes) */}
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
