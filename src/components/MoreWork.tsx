import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles, FolderGit2 } from 'lucide-react';
import { additionalProjectsData } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function MoreWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [smoothedPos, setSmoothedPos] = useState({ x: 0, y: 0, lean: 0 });
  const rafRef = useRef<number>(0);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0, lean: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const loop = () => {
      const cur = currentPos.current;
      const tar = targetPos.current;

      const dx = tar.x - cur.x;
      const dy = tar.y - cur.y;

      cur.x += dx * 0.15;
      cur.y += dy * 0.15;
      cur.lean = Math.max(-12, Math.min(12, dx * 0.2));

      setSmoothedPos({ x: cur.x, y: cur.y, lean: cur.lean });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeProject = hoveredIndex !== null ? additionalProjectsData[hoveredIndex] : null;

  return (
    <div className="w-[520px] h-[580px] lg:h-[610px] shrink-0 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-[#141522] via-[#0d0e17] to-[#090a10] text-white border-2 border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between space-y-6 relative overflow-hidden">
      {/* VR Curved Top Specular Edge Highlight */}
      <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
              Project Archive &amp; Explorations
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            0{additionalProjectsData.length} Selected
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            More Engineering Work
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Exploratory architectures across quantitative finance, financial NLP, and hardware edge vision. Hover to inspect:
          </p>
        </div>

        {/* Project List */}
        <ul className="space-y-2.5 pt-2">
          {additionalProjectsData.map((project, index) => (
            <li
              key={project.id}
              onPointerEnter={(e) => {
                soundManager.playPop();
                setHoveredIndex(index);
                targetPos.current = { x: e.clientX, y: e.clientY };
                currentPos.current = { x: e.clientX, y: e.clientY, lean: 0 };
              }}
              onPointerLeave={() => setHoveredIndex(null)}
              className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/[0.05] hover:border-violet-500/40 dark:hover:border-violet-500/30 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </span>
                  <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/20 px-1.5 py-0.2 rounded">
                    {project.status}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-light">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 hidden sm:inline">
                  {project.technologies.slice(0, 2).join(' • ')}
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">
          Full codebases on GitHub
        </span>
        <a
          href="https://github.com/Anushka-Dwivedi"
          target="_blank"
          rel="noreferrer"
          onClick={() => soundManager.playClick()}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-sm"
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Browse GitHub</span>
        </a>
      </div>

      {/* Floating Cursor Preview Card (Samay-style .more-preview) */}
      {activeProject && (
        <div
          className="more-preview fixed pointer-events-none z-50 transition-opacity duration-200"
          style={{
            transform: `translate3d(${smoothedPos.x - 140}px, ${smoothedPos.y - 180}px, 0) rotate(${smoothedPos.lean}deg)`,
          }}
        >
          <div className="p-4 rounded-2xl bg-zinc-950 text-white border border-violet-500/30 shadow-2xl space-y-2 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[10px] font-mono text-violet-400 border-b border-white/10 pb-1.5">
              <span>{activeProject.category}</span>
              <span>{activeProject.status}</span>
            </div>
            <h4 className="text-sm font-bold text-white font-sans">
              {activeProject.title}
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              {activeProject.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {activeProject.technologies.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
