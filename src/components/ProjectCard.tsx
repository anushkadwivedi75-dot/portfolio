import type { Project } from '../types';
import { Layers, ArrowUpRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import AirSentinelMockup from './mockups/AirSentinelMockup';
import CloudDriveMockup from './mockups/CloudDriveMockup';
import LegalSimplifierMockup from './mockups/LegalSimplifierMockup';
import SATSAMockup from './mockups/SATSAMockup';
import { soundManager } from '../utils/soundEffects';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  layout?: 'rail' | 'stacked';
}

export default function ProjectCard({
  project,
  onOpenModal,
  layout = 'rail'
}: ProjectCardProps) {
  const renderMockup = () => {
    switch (project.id) {
      case 'airsentinel':
        return <AirSentinelMockup />;
      case 'clouddrive':
        return <CloudDriveMockup />;
      case 'legalsimplifier':
        return <LegalSimplifierMockup />;
      case 'satsa':
        return <SATSAMockup />;
      default:
        return null;
    }
  };

  const isRail = layout === 'rail';

  return (
    <article
      className={`group relative rounded-[2.5rem] bg-gradient-to-b from-[#141522] via-[#0d0e17] to-[#090a10] text-white border-2 border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col justify-between ${
        isRail ? 'p-7 sm:p-8 w-[clamp(760px,71vw,1120px)] h-[580px] lg:h-[610px] shrink-0' : 'p-6 sm:p-10 lg:p-12 space-y-8'
      }`}
      style={isRail ? {
        backdropFilter: 'blur(20px)',
      } : undefined}
    >
      {/* VR Curved Top Specular Edge Highlight */}
      <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
            PROJECT {project.number}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900/90 text-zinc-300 border border-white/[0.08]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Left Column Typography & Story, Right Column Live Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 py-3 overflow-hidden">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-1 space-y-3">
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-violet-400 font-sans leading-snug">
              {project.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
              {project.shortDescription}
            </p>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            {project.keyHighlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-zinc-500">
            {project.timeline} • SVKM's DJSCE Architecture
          </div>
        </div>

        {/* Right Column (7 cols): The Heroic Interactive Mockup with Fixed Aspect & Curved VR Border */}
        <div className="lg:col-span-7 h-[360px] lg:h-[390px] w-full rounded-2xl overflow-y-auto border border-white/10 bg-[#08090d] shadow-2xl relative">
          {renderMockup()}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <span className="text-zinc-500 text-[11px] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Spatial Hardware &amp; Web Interface</span>
        </span>

        <div className="flex items-center gap-3">
          {project.links?.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playPop()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}

          {project.links?.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playPop()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </a>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenModal(project);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer group shadow-md"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Deep Dive</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
