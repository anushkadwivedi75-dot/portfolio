import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import MoreWork from './MoreWork';
import { soundManager } from '../utils/soundEffects';
import { ArrowDown } from 'lucide-react';
import ConnectedSystemsCanvas from './ConnectedSystemsCanvas';
import ThreeTelescope from './ThreeTelescope';

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
  const whooshPlayedRef = useRef(false);

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

          // If in Stage 4 (Horizontal Glide), anchor at Project 01 first (0.66 -> 0.72),
          // then smoothly glide through the rest of the projects (0.72 -> 1.00)
          if (p >= 0.72 && railRef.current) {
            const glideProgress = Math.max(0, Math.min(1, (p - 0.72) / (1.0 - 0.72)));
            const currentTravel = travelRef.current;
            railRef.current.style.transform = `translate3d(-${glideProgress * currentTravel}px, 0, 0)`;

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(glideProgress * 100)}%`;
            }
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${Math.round(glideProgress * 100)}% TRAVERSED`;
            }
          } else if (p < 0.72 && railRef.current) {
            // Anchor firmly at Project 01 (zero scroll displacement)
            railRef.current.style.transform = `translate3d(0px, 0, 0)`;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `0%`;
            }
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `0% TRAVERSED`;
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

  // Audio cue when plunging through eyepiece into Project 01
  useEffect(() => {
    if (scrollProgress >= 0.65 && !whooshPlayedRef.current) {
      soundManager.playWhoosh();
      whooshPlayedRef.current = true;
    } else if (scrollProgress < 0.55) {
      whooshPlayedRef.current = false;
    }
  }, [scrollProgress]);

  // =========================================================================
  // PRECISE SEQUENTIAL TIMELINE (Appears ONE BY ONE as user scrolls)
  //
  // Total Scroll Progress: 0.00 -> 1.00
  //
  // ACT 1: "welcome to my" (0.00 -> 0.18)
  //        "work section." + red squiggle (0.06 -> 0.18)
  //        Both fade out cleanly: (0.18 -> 0.23)
  //
  // ACT 2: "but first," (0.24 -> 0.39)
  //        "look closely." (0.29 -> 0.39)
  //        Both fade out cleanly: (0.39 -> 0.44)
  //
  // ACT 3: STANDING TELESCOPE SEQUENCE (0.44 -> 0.66)
  //        - Fades in standing on tripod in 3/4 perspective: (0.44 -> 0.50)
  //        - Rotates in place on tripod mount as scrolled: (0.50 -> 0.58)
  //        - Zooms directly into the ocular eyepiece: (0.58 -> 0.66)
  //
  // ACT 4: VIEWING PROJECTS DIRECTLY THROUGH TELESCOPE (0.64 -> 1.00)
  //        Observatory HUD active, curved edges, horizontal gliding through projects!
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

  // Act 2 Line 2: "look closely." (appears AFTER Line 1!)
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

  // Act 3: True 3D WebGL Telescope (rotates in place, then zooms into eyepiece)
  let telescopeOpacity = 0;

  if (scrollProgress >= 0.44 && scrollProgress <= 0.49) {
    // 1. Fade in standing on tripod in 3/4 perspective
    const t = (scrollProgress - 0.44) / (0.49 - 0.44);
    telescopeOpacity = t;
  } else if (scrollProgress > 0.49 && scrollProgress <= 0.66) {
    // 2. Rotates in place, then begins slow, majestic camera zoom
    telescopeOpacity = 1;
  } else if (scrollProgress > 0.66 && scrollProgress <= 0.70) {
    // 3. Smoothly dissolves as camera passes through ocular lens focal plane
    telescopeOpacity = Math.max(0, 1 - (scrollProgress - 0.66) / 0.04);
  } else {
    telescopeOpacity = 0;
  }

  // Act 4: Inside the Telescope Observatory (Spatial HUD + Horizontal Gliding Projects)
  // Anchored firmly at Project 01 (0.66 -> 0.72) so the user has time to view the first project!
  let projectStageOpacity = 0;
  if (scrollProgress >= 0.66 && scrollProgress <= 0.71) {
    projectStageOpacity = (scrollProgress - 0.66) / (0.71 - 0.66);
  } else if (scrollProgress > 0.71) {
    projectStageOpacity = 1;
  }

  const isInsideObservatory = scrollProgress >= 0.66;

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative bg-[var(--color-void)] text-[var(--color-fog)]"
      style={{ height: '900vh' }}
    >
      {/* Sticky Fullscreen Cockpit Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Spatial Constellation Field in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-60 z-0">
          <ConnectedSystemsCanvas />
        </div>
        
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
        {/* ACT 2: "but first," ... then "look closely." (one by one)      */}
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
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial italic font-normal text-amber-200 leading-none mt-3 sm:mt-4 transition-transform duration-75"
              style={{
                opacity: l4Opacity,
                transform: `translate3d(0, ${l4Y}px, 0)`,
              }}
            >
              look closely.
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 3: TRUE 3D WEBGL STANDING TELESCOPE: ROTATES & ZOOMS IN   */}
        {/* ============================================================== */}
        {telescopeOpacity > 0 && (
          <ThreeTelescope
            scrollProgress={scrollProgress}
            opacity={telescopeOpacity}
          />
        )}

        {/* ============================================================== */}
        {/* ACT 4: VIEWING PROJECTS THROUGH THE TELESCOPE (OBSERVATORY VIEW) */}
        {/* ============================================================== */}
        {isInsideObservatory && (
          <div
            className="absolute inset-0 flex flex-col justify-between transition-opacity duration-300 z-30"
            style={{ opacity: projectStageOpacity }}
          >
            {/* Observatory Aperture Curved Edge Vignette & Telemetry HUD */}
            <div className="absolute inset-0 pointer-events-none z-30 border-[10px] sm:border-[16px] border-[#0a0a0e] rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[inset_0_0_70px_rgba(0,0,0,0.95),inset_0_0_20px_rgba(245,158,11,0.15)]">
              {/* Subtle Observatory Telemetry in Corners */}
              <div className="absolute top-4 left-8 hidden sm:flex items-center gap-2 text-[10px] font-mono text-amber-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>OBSERVATORY RETICLE • OPTICAL f/2.8 • DEEP FIELD VIEW</span>
              </div>
              <div className="absolute top-4 right-8 hidden sm:flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                <span>CELESTIAL COORDINATES: RA 14h 29m • DEC +62°</span>
              </div>
            </div>

            {/* Cosmic Starlight Bloom during Lens Entry onto Project 01 */}
            {scrollProgress >= 0.65 && scrollProgress <= 0.72 && (
              <div
                className="absolute inset-0 pointer-events-none z-35 bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.3)_0%,rgba(168,85,247,0.18)_40%,transparent_70%)] transition-opacity duration-150"
                style={{
                  opacity: Math.sin(((scrollProgress - 0.65) / 0.07) * Math.PI),
                }}
              />
            )}

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

