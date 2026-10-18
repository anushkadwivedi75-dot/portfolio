import { ArrowDown, FileText, Mail, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ConnectedSystemsCanvas from './ConnectedSystemsCanvas';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]"
    >
      {/* Subtle Connected Systems Interactive Background */}
      <ConnectedSystemsCanvas />

      {/* Grid Pattern Vignette */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/40 via-transparent to-[#09090b] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full my-auto">
        <div className="max-w-4xl space-y-8">
          {/* Status & Focus Indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#14151c] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-200 font-medium">B.Tech AI &amp; ML @ DJSCE</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-violet-300 hidden sm:inline">Focus: Applied ML &amp; Full-Stack Systems</span>
          </div>

          {/* Large Typographic Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 font-sans leading-[1.08]">
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-violet-300">intelligent systems</span> and full-stack products that solve real-world problems.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
              AI/ML engineering student at SVKM's DJS College of Engineering. I build end-to-end software systems bridging hardware telemetry, spatial data pipelines, and responsive web platforms.
            </p>
          </div>

          {/* Action CTAs & Social Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-200 shadow-lg shadow-white/5 hover:scale-[1.02] cursor-pointer group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 text-zinc-700 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#14151c] hover:bg-[#1a1c26] text-zinc-200 border border-white/[0.1] hover:border-violet-400/40 transition-all duration-200 cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
              <span>Resume</span>
            </button>

            {/* Social Link Badges */}
            <div className="flex items-center gap-2 pl-1 sm:pl-3 border-l border-white/[0.08]">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#14151c] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#14151c] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-full bg-[#14151c] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Technical Highlights Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-zinc-500 flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span>ACADEMIC CGPA</span>
            </div>
            <div className="text-zinc-200 font-bold text-base font-sans">8.13 / 10.0</div>
            <div className="text-zinc-500 text-[10px]">DJSCE • AI &amp; ML (2024–2028)</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px]">HONOURS PROGRAM</div>
            <div className="text-zinc-200 font-bold text-base font-sans">Quant Finance</div>
            <div className="text-zinc-500 text-[10px]">Financial Engineering &amp; Fintech</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px]">SYSTEM CASE STUDIES</div>
            <div className="text-zinc-200 font-bold text-base font-sans">03 Production Architectures</div>
            <div className="text-zinc-500 text-[10px]">Spatial ML, Cloud &amp; Applied NLP</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px]">CORE STACK</div>
            <div className="text-zinc-200 font-bold text-base font-sans">Full-Stack + AI/ML</div>
            <div className="text-zinc-500 text-[10px]">FastAPI, React, PostGIS, PyTorch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
