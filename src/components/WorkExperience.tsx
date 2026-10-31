import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import MoreWork from './MoreWork';
import { soundManager } from '../utils/soundEffects';
import { ArrowDown } from 'lucide-react';

interface WorkExperienceProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export default function WorkExperience({ projects, onOpenModal }: WorkExperienceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const travelRef = useRef<number>(3200);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure rail width for horizontal glide
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      const railWidth = rail.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTravel = Math.max(0, railWidth - viewportWidth + 160);
      travelRef.current = maxTravel;
    };

    measure();
    const timer = setTimeout(measure, 200);
    document.fonts?.ready?.then(measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(rail);
    window.addEventListener('resize', measure);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [projects]);

  // Unified scroll listener
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
          setScrollProgress(p);

          // If in Stage 3 (Inside Headset / Horizontal Glide), update rail transform directly
          if (p >= 0.64 && railRef.current) {
            const glideProgress = Math.max(0, Math.min(1, (p - 0.64) / (1.0 - 0.64)));
            const currentTravel = travelRef.current;
            railRef.current.style.transform = `translate3d(-${glideProgress * currentTravel}px, 0, 0)`;

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(glideProgress * 100)}%`;
            }
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${Math.round(glideProgress * 100)}% TRAVERSED`;
            }
          }
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
  // PRECISE SEQUENTIAL TIMELINE (Appears ONE BY ONE as user scrolls)
  //
  // Total Scroll Progress: 0.00 -> 1.00
  //
  // ACT 1: "welcome to my" (0.00 -> 0.20)
  //        "work section." + red squiggle (0.06 -> 0.20)
  //        Both fade out cleanly: (0.18 -> 0.23)
  //
  // ACT 2: "but first," (0.24 -> 0.42)
  //        "put these on." (0.30 -> 0.42)
  //        Both fade out cleanly: (0.40 -> 0.45)
  //
  // ACT 3: VR Headset appears (0.46 -> 0.52)
  //        VR Headset zooms in (0.52 -> 0.65)
  //
  // ACT 4: VIEWING PROJECTS DIRECTLY IN THE HEADSET (0.64 -> 1.00)
  //        Spatial HUD active, curved edges, horizontal gliding through projects!
  // =========================================================================

  // Act 1 Line 1: "welcome to my"
  let l1Opacity = 0;
  let l1Y = 30;
  if (scrollProgress <= 0.05) {
    const t = Math.max(0, scrollProgress / 0.05);
    l1Opacity = t;
    l1Y = (1 - t) * 30;
  } else if (scrollProgress <= 0.18) {
    l1Opacity = 1;
    l1Y = 0;
  } else if (scrollProgress <= 0.23) {
    const t = (scrollProgress - 0.18) / (0.23 - 0.18);
    l1Opacity = 1 - t;
    l1Y = -t * 30;
  } else {
    l1Opacity = 0;
  }

  // Act 1 Line 2: "work section." (appears AFTER Line 1!)
  let l2Opacity = 0;
  let l2Y = 30;
  if (scrollProgress >= 0.06 && scrollProgress <= 0.12) {
    const t = (scrollProgress - 0.06) / (0.12 - 0.06);
    l2Opacity = t;
    l2Y = (1 - t) * 30;
  } else if (scrollProgress > 0.12 && scrollProgress <= 0.18) {
    l2Opacity = 1;
    l2Y = 0;
  } else if (scrollProgress > 0.18 && scrollProgress <= 0.23) {
    const t = (scrollProgress - 0.18) / (0.23 - 0.18);
    l2Opacity = 1 - t;
    l2Y = -t * 30;
  } else {
    l2Opacity = 0;
  }

  // Act 2 Line 1: "but first,"
  let l3Opacity = 0;
  let l3Y = 30;
  if (scrollProgress >= 0.24 && scrollProgress <= 0.30) {
    const t = (scrollProgress - 0.24) / (0.30 - 0.24);
    l3Opacity = t;
    l3Y = (1 - t) * 30;
  } else if (scrollProgress > 0.30 && scrollProgress <= 0.39) {
    l3Opacity = 1;
    l3Y = 0;
  } else if (scrollProgress > 0.39 && scrollProgress <= 0.44) {
    const t = (scrollProgress - 0.39) / (0.44 - 0.39);
    l3Opacity = 1 - t;
    l3Y = -t * 30;
  } else {
    l3Opacity = 0;
  }

  // Act 2 Line 2: "put these on." (appears AFTER Line 1!)
  let l4Opacity = 0;
  let l4Y = 30;
  if (scrollProgress >= 0.29 && scrollProgress <= 0.35) {
    const t = (scrollProgress - 0.29) / (0.35 - 0.29);
    l4Opacity = t;
    l4Y = (1 - t) * 30;
  } else if (scrollProgress > 0.35 && scrollProgress <= 0.39) {
    l4Opacity = 1;
    l4Y = 0;
  } else if (scrollProgress > 0.39 && scrollProgress <= 0.44) {
    const t = (scrollProgress - 0.39) / (0.44 - 0.39);
    l4Opacity = 1 - t;
    l4Y = -t * 30;
  } else {
    l4Opacity = 0;
  }

  // Act 3: VR Headset appears & zooms in towards viewer
  let headsetOpacity = 0;
  let headsetScale = 0.85;
  if (scrollProgress >= 0.46 && scrollProgress <= 0.52) {
    const t = (scrollProgress - 0.46) / (0.52 - 0.46);
    headsetOpacity = t;
    headsetScale = 0.85 + t * 0.15;
  } else if (scrollProgress > 0.52 && scrollProgress <= 0.65) {
    headsetOpacity = 1;
    const t = (scrollProgress - 0.52) / (0.65 - 0.52);
    headsetScale = 1.0 + Math.pow(t, 2.3) * 23.0; // 1.0 -> 24.0
  } else {
    headsetOpacity = 0;
  }

  // Act 4: Inside the Headset (Spatial HUD + Horizontal Project Rail)
  let projectStageOpacity = 0;
  if (scrollProgress >= 0.63 && scrollProgress <= 0.67) {
    projectStageOpacity = (scrollProgress - 0.63) / (0.67 - 0.63);
  } else if (scrollProgress > 0.67) {
    projectStageOpacity = 1;
  }

  const isInsideHeadset = scrollProgress >= 0.63;

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative bg-[var(--color-void)] text-[var(--color-fog)]"
      style={{ height: '700vh' }}
    >
      {/* Sticky Fullscreen Cockpit Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* ============================================================== */}
        {/* ACT 1: "welcome to my" ... then "work section." (one by one)   */}
        {/* ============================================================== */}
        {(l1Opacity > 0 || l2Opacity > 0) && (
          <div className="text-center flex flex-col items-center justify-center absolute inset-0 my-auto pointer-events-none select-none z-10 px-6">
            {/* Line 1 */}
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-white leading-none m-0 transition-transform duration-75"
              style={{
                opacity: l1Opacity,
                transform: `translate3d(0, ${l1Y}px, 0)`,
              }}
            >
              welcome to my
            </h2>

            {/* Line 2 (appears right after Line 1) */}
            <div
              className="relative inline-block mt-2 sm:mt-3 transition-transform duration-75"
              style={{
                opacity: l2Opacity,
                transform: `translate3d(0, ${l2Y}px, 0)`,
              }}
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial italic font-normal text-white leading-none m-0">
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

            <p className="text-xs font-mono text-zinc-400 pt-8 flex items-center gap-1.5 animate-pulse">
              <span>keep scrolling down</span>
              <ArrowDown className="w-3.5 h-3.5 text-violet-400" />
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 2: "but first," ... then "put these on." (one by one)      */}
        {/* ============================================================== */}
        {(l3Opacity > 0 || l4Opacity > 0) && (
          <div className="text-center flex flex-col items-center justify-center absolute inset-0 my-auto pointer-events-none select-none z-10 px-6">
            {/* Line 1 */}
            <h3
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-white leading-none m-0 transition-transform duration-75"
              style={{
                opacity: l3Opacity,
                transform: `translate3d(0, ${l3Y}px, 0)`,
              }}
            >
              but first,
            </h3>

            {/* Line 2 (appears right after Line 1) */}
            <p
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-light text-zinc-400 leading-none mt-3 sm:mt-4 transition-transform duration-75"
              style={{
                opacity: l4Opacity,
                transform: `translate3d(0, ${l4Y}px, 0)`,
              }}
            >
              put these on.
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 3: VR HEADSET ENLARGING LIKE PUTTING IT ON                 */}
        {/* ============================================================== */}
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
            {/* Precision Spatial Visor Enclosure */}
            <div className="relative w-80 sm:w-96 h-40 sm:h-48 rounded-[3rem] p-[3px] bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 dark:from-zinc-700 dark:via-zinc-500 dark:to-zinc-700 shadow-2xl flex items-center justify-center">
              
              {/* Outer Enclosure Frame */}
              <div className="w-full h-full rounded-[2.9rem] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-2.5 flex items-center justify-center relative overflow-hidden shadow-inner">
                
                {/* 3D Glass Surface Reflections */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-purple-400/20 pointer-events-none"></div>
                <div className="absolute top-2 left-10 w-28 h-5 bg-white/25 rounded-full blur-sm -rotate-6 pointer-events-none"></div>
                
                {/* Dual Micro-OLED Optical Chambers */}
                <div className="flex items-center justify-center gap-12 sm:gap-16 w-full h-full relative z-10">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-violet-500/40 bg-zinc-900/90 shadow-[inset_0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full border border-violet-400/30 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-violet-400/80 animate-ping"></div>
                    </div>
                  </div>

                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-violet-500/40 bg-zinc-900/90 shadow-[inset_0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full border border-violet-400/30 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-violet-400/80 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Solo Knit Straps */}
              <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-zinc-500 to-zinc-400 rounded-l-xl"></div>
              <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-l from-zinc-500 to-zinc-400 rounded-r-xl"></div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 4: VIEWING PROJECTS DIRECTLY IN THE HEADSET (HORIZONTAL GLIDE) */}
        {/* ============================================================== */}
        {isInsideHeadset && (
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-300 z-30"
            style={{ opacity: projectStageOpacity }}
          >
            {/* Spatial Visor Curved Edge Vignette & Telemetry HUD */}
            <div className="absolute inset-0 pointer-events-none z-30 border-[10px] sm:border-[16px] border-[#0a0a0e] rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[inset_0_0_60px_rgba(0,0,0,0.9),inset_0_0_15px_rgba(139,92,246,0.2)]">
              {/* Subtle HUD Telemetry in Corners */}
              <div className="absolute top-4 left-8 hidden sm:flex items-center gap-2 text-[10px] font-mono text-violet-400/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SPATIAL HUD • 120 FPS • 4K DUAL-OLED</span>
              </div>
              <div className="absolute top-4 right-8 hidden sm:flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                <span>HEADSET VIEWPORT ACTIVE</span>
              </div>
            </div>

            {/* Top Stage Label & Skip */}
            <div className="relative z-40 px-6 sm:px-12 pt-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                <span>01 / Featured Work &amp; Systems</span>
              </h2>

              <a
                href="#snippets"
                onClick={() => soundManager.playPop()}
                className="text-xs font-mono text-zinc-400 hover:text-violet-400 transition-colors flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                <span>SKIP AHEAD</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* The Horizontal Gliding Rail with Curved Edges */}
            <div className="work-rail-track relative z-20 flex-1 flex items-center">
              <div ref={railRef} className="work-rail">
                {projects.map((project) => (
                  <div key={project.id} className="work-card-item">
                    <ProjectCard
                      project={project}
                      onOpenModal={onOpenModal}
                      layout="rail"
                    />
                  </div>
                ))}

                {/* More Work Archive Card */}
                <MoreWork />
              </div>
            </div>

            {/* Bottom Status & Progress Bar */}
            <div className="relative z-40 px-6 sm:px-12 pb-6 flex items-center justify-between text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-wider text-violet-400 hidden sm:inline">
                  Scroll to glide through case studies
                </span>
                <div className="w-28 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-violet-400 transition-all duration-75"
                    style={{ width: '0%' }}
                  />
                </div>
                <span ref={progressTextRef} className="text-[11px]">
                  0% TRAVERSED
                </span>
              </div>

              <div className="text-[10px] text-zinc-600 hidden md:block">
                TAP ANY CARD TO INSPECT ARCHITECTURE
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

