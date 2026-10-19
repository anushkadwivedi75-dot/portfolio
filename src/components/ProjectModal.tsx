import { useState } from 'react';
import type { Project } from '../types';
import { X, Check, Copy, Layers, Database, ShieldAlert, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.architecture.schemaOrSnippet?.code) {
      navigator.clipboard.writeText(project.architecture.schemaOrSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-[#0c0d13] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#101118] border-b border-white/[0.06] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/25 px-2.5 py-1 rounded">
              CASE STUDY {project.number}
            </span>
            <div>
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-zinc-100 font-sans">
                {project.title} — Technical Deep Dive
              </h2>
              <p className="text-xs text-zinc-400 font-mono">{project.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm font-sans">
          {/* Executive Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>System Architectural Overview</span>
            </h3>
            <p className="text-zinc-300 leading-relaxed font-light text-[13.5px]">
              {project.architecture.overview}
            </p>
          </div>

          {/* System Layer Architecture Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>Pipeline &amp; Tier Breakdown</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.architecture.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#111219] border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-200 text-xs font-mono">
                      {layer.layer}
                    </span>
                    <span className="text-[10px] text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded font-mono">
                      Layer 0{idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {layer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-white/[0.04]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1 font-light">
                    {layer.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code / Query / Schema Snippet */}
          {project.architecture.schemaOrSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4 text-violet-400" />
                  <span>{project.architecture.schemaOrSnippet.title}</span>
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-lg border border-white/[0.08] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-[#08090d] border border-white/[0.08] p-4 sm:p-5 overflow-x-auto font-mono text-xs text-zinc-300">
                <pre className="leading-relaxed">
                  <code>{project.architecture.schemaOrSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Technical Highlights Exhaustive List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Verified Implementation Highlights
            </h3>
            <ul className="space-y-2.5">
              {project.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0"></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & Code Notice */}
          <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/25 flex items-start gap-3 text-xs text-violet-200/90 font-mono">
            <ShieldAlert className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-violet-300">Verification &amp; Source Integrity</span>
              <p className="text-[11px] leading-relaxed text-zinc-400 font-sans">
                {project.links.notice}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#101118] border-t border-white/[0.06] flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-500 font-mono">
            Anushka Dwivedi • Portfolio Technical Case Study
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
