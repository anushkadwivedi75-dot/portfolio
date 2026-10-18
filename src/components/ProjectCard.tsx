import type { Project } from '../types';
import { Layers, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
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
    <article className="group relative rounded-2xl bg-[#0f1016] border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-8 lg:p-10 space-y-8 shadow-xl">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded">
            PROJECT {project.number}
          </span>
          <span className="text-xs font-mono text-zinc-400">{project.category}</span>
        </div>
        <span className="text-xs font-mono text-zinc-500">{project.timeline}</span>
      </div>

      {/* Main Grid: Info + Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Story, Problem, Approach & Architecture */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-violet-300/90 leading-snug">
              {project.subtitle}
            </p>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Problem & Approach Brief */}
          <div className="space-y-3 p-4 rounded-xl bg-[#14151e] border border-white/[0.05] text-xs">
            <div>
              <span className="font-semibold text-zinc-200 block mb-1 uppercase tracking-wider text-[10px] text-zinc-400 font-mono">
                The Engineering Challenge
              </span>
              <p className="text-zinc-400 leading-relaxed">{project.problem}</p>
            </div>
            <div className="pt-2 border-t border-white/[0.04]">
              <span className="font-semibold text-zinc-200 block mb-1 uppercase tracking-wider text-[10px] text-violet-300 font-mono">
                The Applied Solution
              </span>
              <p className="text-zinc-300 leading-relaxed">{project.approach}</p>
            </div>
          </div>

          {/* Key Technical Highlights Checklist */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
              Core Technical Features
            </span>
            <ul className="space-y-2">
              {project.keyHighlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action to open technical case study */}
          <div className="pt-2">
            <button
              onClick={() => onOpenModal(project)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#1a1c26] hover:bg-violet-600/20 text-zinc-200 hover:text-white border border-white/[0.1] hover:border-violet-500/40 transition-all cursor-pointer group/btn"
            >
              <Layers className="w-3.5 h-3.5 text-violet-400 group-hover/btn:rotate-12 transition-transform" />
              <span>View Full Technical Architecture</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity Interactive Preview & Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          {/* Custom Interactive Mockup */}
          <div className="relative">
            <div className="absolute -top-3 right-3 z-20">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-[#1a1b24] text-zinc-400 border border-white/[0.1] px-2 py-0.5 rounded-full shadow">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Interactive Visual Architecture
              </span>
            </div>
            {renderMockup()}
          </div>

          {/* Metrics / Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metricsOrFeatures.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#121319] border border-white/[0.05] text-center"
              >
                <div className="font-mono text-zinc-100 font-bold text-sm">{m.value}</div>
                <div className="text-[10px] text-zinc-400 font-medium mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Technologies Tag Cloud */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#14151d] text-zinc-300 border border-white/[0.06] hover:border-violet-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
