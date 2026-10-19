import type { Project } from '../types';
import { Layers, ChevronRight, CheckCircle2 } from 'lucide-react';
import AirSentinelMockup from './mockups/AirSentinelMockup';
import CloudDriveMockup from './mockups/CloudDriveMockup';
import LegalSimplifierMockup from './mockups/LegalSimplifierMockup';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const renderMockup = () => {
    switch (project.id) {
      case 'airsentinel':
        return <AirSentinelMockup />;
      case 'clouddrive':
        return <CloudDriveMockup />;
      case 'legalsimplifier':
        return <LegalSimplifierMockup />;
      default:
        return null;
    }
  };

  return (
    <article className="group relative rounded-3xl bg-[#0c0d13] border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-10 lg:p-12 space-y-10 shadow-2xl overflow-hidden">
      {/* Editorial Project Header */}
      <div className="space-y-4">
        {/* Meta Row: Project Number & Domain */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/25 px-2.5 py-0.5 rounded">
              PROJECT {project.number}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">{project.category}</span>
          </div>
          <span className="text-xs font-mono text-zinc-500">{project.timeline}</span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2 max-w-4xl">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 font-sans tracking-tight">
            {project.title}
          </h3>
          <p className="text-base sm:text-lg font-medium text-violet-300/90 leading-snug font-sans">
            {project.subtitle}
          </p>
        </div>

        {/* Overview Narrative */}
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
          {project.shortDescription}
        </p>
      </div>

      {/* Heroic Visual Showcase Stage (Full Width) */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.04]">
        {renderMockup()}
      </div>

      {/* Un-Boxed 3-Column Editorial Technical Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-white/[0.06] text-xs">
        {/* Column 1: The Engineering Challenge (4 cols) */}
        <div className="md:col-span-4 space-y-3 md:pr-6 md:border-r border-white/[0.06]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
            The Engineering Challenge
          </span>
          <p className="text-zinc-300 leading-relaxed text-xs sm:text-[13px] font-light">
            {project.problem}
          </p>
        </div>

        {/* Column 2: Applied Architecture & Features (5 cols) */}
        <div className="md:col-span-5 space-y-3 md:px-3 md:border-r border-white/[0.06]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-300 font-semibold block">
            Applied System Solution
          </span>
          <p className="text-zinc-300 leading-relaxed text-xs sm:text-[13px] font-light mb-3">
            {project.approach}
          </p>

          <ul className="space-y-2 pt-2">
            {project.keyHighlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-zinc-400 text-xs leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Telemetry Specs & Deep Dive Action (3 cols) */}
        <div className="md:col-span-3 space-y-4 md:pl-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
              System Specifications
            </span>
            <div className="grid grid-cols-2 gap-2">
              {project.metricsOrFeatures.map((m, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="font-mono text-zinc-100 font-bold text-xs">{m.value}</div>
                  <div className="text-[10px] text-zinc-500 font-medium mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Dive Action Button */}
          <button
            onClick={() => onOpenModal(project)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161722] hover:bg-violet-600/20 text-zinc-200 hover:text-white border border-white/[0.08] hover:border-violet-500/40 transition-all cursor-pointer group/btn shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-violet-400 group-hover/btn:rotate-12 transition-transform" />
            <span>Technical Deep Dive</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
