import { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundEffects';

interface PortfolioLoaderProps {
  onComplete?: () => void;
}

export default function PortfolioLoader({ onComplete }: PortfolioLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'draw' | 'exit' | 'done'>('draw');
  const [lettersVisible, setLettersVisible] = useState(0);
  const [dotDropped, setDotDropped] = useState(false);

  const letters = ['a', 'n', 'u', 's', 'h', 'k', 'a'];

  useEffect(() => {
    // Lock scroll during initialization
    document.body.style.overflow = 'hidden';

    // 1. Progress counter animation (0 to 100% over 2.3s)
    const startTime = performance.now();
    const duration = 2300; // 2.3 seconds

    let rafId = 0;
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);

      // Reveal solid letters progressively between 40% and 80%
      if (p >= 40 && p <= 85) {
        const letterProgress = (p - 40) / (85 - 40);
        const count = Math.min(letters.length, Math.floor(letterProgress * letters.length) + 1);
        setLettersVisible(count);
      } else if (p > 85) {
        setLettersVisible(letters.length);
        setDotDropped(true);
      }

      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setLettersVisible(letters.length);
        setDotDropped(true);

        // Whoosh sound & exit slide
        setTimeout(() => {
          soundManager.playWhoosh();
          setPhase('exit');
        }, 180);

        // Finish and unlock scroll
        setTimeout(() => {
          setPhase('done');
          document.body.style.overflow = '';
          onComplete?.();
        }, 1050);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  // Blueprint guide lines
  const guides = [
    { d: 'M20 280 H980', delay: '0.05s' },
    { d: 'M60 172 H940', delay: '0.16s' },
    { d: 'M100 350 H760', delay: '0.28s' },
    { d: 'M160 60 V390', delay: '0.20s' },
    { d: 'M480 90 V380', delay: '0.32s' },
    { d: 'M760 100 V400', delay: '0.44s' },
    { d: 'M110 372 L620 80', delay: '0.38s' },
  ];

  const specs = [
    { x: 26, y: 272, text: 'BASELINE 280PX' },
    { x: 66, y: 164, text: 'X-HEIGHT 172PX' },
    { x: 106, y: 342, text: 'DESCENDER 350PX' },
    { x: 800, y: 130, text: 'SYSTEM: DJSCE AI/ML' },
  ];

  return (
    <div
      role="status"
      aria-label="Initializing Anushka Dwivedi's developer portfolio"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gradient-to-b from-[#0284c7] via-[#38bdf8] via-55% to-[#bae6fd] text-slate-950 select-none overflow-hidden transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Animated Paper Film Grain */}
      <div
        className="absolute inset-[-10%] pointer-events-none opacity-20 mix-blend-multiply bg-repeat"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(15,23,42,0.3) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top-Left Corner Badge */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-12 flex flex-col gap-1 text-[11px] font-mono tracking-widest uppercase text-slate-900 font-medium">
        <span className="font-semibold">anushka dwivedi</span>
        <span className="text-[10px] text-slate-800">from ideas to intelligent systems</span>
      </div>

      {/* Top-Right Corner Badge */}
      <div className="absolute top-6 sm:top-10 right-6 sm:right-12 hidden sm:flex flex-col gap-1 text-right text-[11px] font-mono tracking-widest uppercase text-slate-900 font-medium">
        <span className="font-semibold">visitor no. 01</span>
        <span className="text-[10px] text-slate-800">glad you dropped by</span>
      </div>

      {/* Bottom-Left Corner: Large Tabular Percentage Counter */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 flex flex-col">
        <span className="text-4xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tighter text-slate-950 tabular-nums leading-none">
          {String(progress).padStart(3, '0')}%
        </span>
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-800 mt-1 font-semibold">
          INITIALIZING ARCHITECTURE
        </span>
      </div>

      {/* Bottom-Right Corner Badge */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 hidden sm:flex flex-col gap-1 text-right text-[11px] font-mono tracking-widest uppercase text-slate-900 font-medium">
        <span className="font-semibold">mumbai • svkm's djsce</span>
        <span className="text-[10px] text-slate-800">system: verified 2026</span>
      </div>

      {/* Center Architectural Typography Blueprint */}
      <div className="w-[90vw] sm:w-[82vw] md:w-[72vw] max-w-[920px] relative">
        <svg
          viewBox="0 0 1000 420"
          className="w-full h-auto overflow-visible fill-none"
        >
          {/* 1. Blueprint Guide Lines (Draws in immediately) */}
          <g className="stroke-slate-900 opacity-30 stroke-[1px]">
            {guides.map((g, idx) => (
              <path
                key={idx}
                d={g.d}
                strokeDasharray="1200"
                strokeDashoffset="1200"
                className="animate-blueprint-draw"
                style={{
                  animationDelay: g.delay,
                  animationDuration: '1.2s',
                  animationFillMode: 'forwards',
                }}
              />
            ))}

            {/* Circular Dimension Ring around dot */}
            <circle
              cx="820"
              cy="252"
              r="34"
              strokeDasharray="300"
              strokeDashoffset="300"
              className="animate-blueprint-draw"
              style={{
                animationDelay: '0.6s',
                animationDuration: '1s',
                animationFillMode: 'forwards',
              }}
            />
          </g>

          {/* 2. Technical Blueprint Specification Labels */}
          {specs.map((s, idx) => (
            <text
              key={idx}
              x={s.x}
              y={s.y}
              className="text-[11px] sm:text-[12px] font-mono uppercase tracking-widest fill-slate-800 select-none font-semibold"
            >
              {s.text}
            </text>
          ))}

          {/* 3. The Word Outline (Contrasting Dark Stroked Text Drawing) */}
          <text
            x="160"
            y="280"
            className="font-sans font-bold text-[190px] sm:text-[230px] md:text-[250px] tracking-tighter fill-none stroke-slate-950 stroke-[2px]"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: Math.max(0, 1400 - (progress / 80) * 1400),
              transition: 'stroke-dashoffset 0.08s ease-out',
            }}
          >
            anushka
          </text>

          {/* 4. Solid Filled Letters (Contrasting Dark Color against Sky) */}
          <text
            x="160"
            y="280"
            className="font-sans font-bold text-[190px] sm:text-[230px] md:text-[250px] tracking-tighter fill-slate-950"
          >
            {letters.map((char, index) => (
              <tspan
                key={index}
                style={{
                  opacity: index < lettersVisible ? 1 : 0,
                  transition: 'opacity 0.25s ease-out',
                }}
              >
                {char}
              </tspan>
            ))}
          </text>

          {/* 5. The Signature Spring Bouncing Dot */}
          <circle
            cx="820"
            cy="252"
            r="28"
            className="fill-[#e04428]"
            style={{
              transform: dotDropped ? 'scale(1) translateY(0)' : 'scale(0) translateY(-90px)',
              transformOrigin: '820px 252px',
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        </svg>
      </div>

      {/* Subtle Skip Prompt for Impatient Viewers */}
      <button
        onClick={() => {
          soundManager.playPop();
          setPhase('exit');
          setTimeout(() => {
            setPhase('done');
            document.body.style.overflow = '';
            onComplete?.();
          }, 850);
        }}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-1/2 sm:translate-x-1/2 text-[10px] font-mono tracking-widest text-slate-800 hover:text-slate-950 underline underline-offset-4 cursor-pointer uppercase transition-colors font-semibold"
      >
        [skip intro ↗]
      </button>
    </div>
  );
}
