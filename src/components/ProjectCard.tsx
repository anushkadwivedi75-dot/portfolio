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
      className={`group relative rounded-3xl bg-[#0c0d14] text-white border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between ${
        isRail ? 'p-7 sm:p-9 w-full min-h-[580px]' : 'p-6 sm:p-10 lg:p-12 space-y-8'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded">
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
              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-white/[0.08]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Left Column Typography & Story, Right Column Live Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-violet-400 font-sans leading-snug">
              {project.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Key Metrics / Highlights */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            {project.keyHighlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7 cols): The Heroic Interactive Mockup */}
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08] bg-[#08090d]">
          {renderMockup()}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <span className="text-zinc-500 text-[11px]">
          {project.timeline} • SVKM's DJSCE Architecture
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
