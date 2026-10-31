import { useRef, useEffect } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import MoreWork from './MoreWork';
import { soundManager } from '../utils/soundEffects';
import { ArrowDown } from 'lucide-react';

interface WorkRailProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export default function WorkRail({ projects, onOpenModal }: WorkRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const travelRef = useRef<number>(3200);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const rail = railRef.current;

    if (!container || !stage || !rail) return;

    const measure = () => {
      // Calculate how far the rail needs to translate
      const railWidth = rail.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTravel = Math.max(0, railWidth - viewportWidth + 140);

      travelRef.current = maxTravel;
      container.style.setProperty('--work-travel', `${maxTravel}px`);
    };

    measure();
    const timer = setTimeout(measure, 150);
    document.fonts?.ready?.then(measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(rail);
    window.addEventListener('resize', measure);

    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - stage.offsetHeight;

        if (totalScrollable > 0) {
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

          // Physical GPU-accelerated horizontal translation (never clamps, never fails)
          const currentTravel = travelRef.current;
          rail.style.transform = `translate3d(-${progress * currentTravel}px, 0, 0)`;

          // Direct DOM updates for progress bar & text
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.round(progress * 100)}% TRAVERSED`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [projects]);

  return (
    <div
      id="work"
      ref={containerRef}
      className="work-scroll"
    >
      {/* Pinned Sticky Stage */}
      <div
        ref={stageRef}
        data-scroll-stage
        className="work-stage"
      >
        {/* Top Section Label */}
        <h2 className="work-stage-label">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            <span>01 / Featured Work &amp; Systems</span>
          </span>
        </h2>

        {/* Skip Ahead Button */}
        <a
          href="#snippets"
          onClick={() => soundManager.playPop()}
          className="work-stage-skip flex items-center gap-1.5"
        >
          <span>SKIP AHEAD</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        {/* The Rail Viewport Container */}
        <div ref={scrollBoxRef} className="work-rail-track">
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

            {/* End of Rail: More Work Archive Card */}
            <MoreWork />
          </div>
        </div>

        {/* Bottom Status & Progress Bar (Desktop only) */}
        <div className="absolute bottom-6 left-10 z-20 hidden lg:flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span className="text-[11px] uppercase tracking-wider text-violet-400">
            Glide: AirSentinel • Legal Simplifier AI • Cloud Drive • SAT-SA
          </span>
          <div className="w-24 h-1 rounded-full bg-white/10 overflow-hidden">
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
      </div>
    </div>
  );
}
