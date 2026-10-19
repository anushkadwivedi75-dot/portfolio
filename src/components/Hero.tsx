import { ArrowDown, FileText, Mail, Sparkles, Terminal, Activity, MapPin } from 'lucide-react';
import { personalInfo, educationInfo } from '../data/portfolioData';
import ConnectedSystemsCanvas from './ConnectedSystemsCanvas';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[94vh] pt-32 pb-16 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]"
    >
      {/* Subtle Connected Systems Interactive Background */}
      <ConnectedSystemsCanvas />

      {/* Grid Pattern Vignette */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/60 via-transparent to-[#08080a] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full my-auto space-y-14">
        {/* Main Grid: Typographic Narrative on Left, Anchored Telemetry Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status & Focus Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0e0f16] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-200 font-medium">B.Tech AI &amp; ML @ DJSCE</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-violet-300 hidden sm:inline">Mumbai, IN</span>
            </div>

            {/* Large Typographic Headline with Editorial Serif Accents */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 font-sans leading-[1.12]">
              I build{' '}
              <span className="font-editorial italic font-normal text-violet-300 tracking-normal text-[1.12em] px-0.5">
                intelligent systems
              </span>{' '}
              and{' '}
              <span className="font-editorial italic font-normal text-violet-300 tracking-normal text-[1.12em] px-0.5">
                full-stack products
              </span>{' '}
              that solve real-world problems.
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
              AI/ML engineering undergraduate at SVKM's DJS College of Engineering. I build end-to-end software bridging hardware edge telemetry, spatial database pipelines, and responsive cloud applications.
            </p>

            {/* Action CTAs & Social Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-200 shadow-lg shadow-white/5 hover:scale-[1.02] cursor-pointer group"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4 text-zinc-700 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#111219] hover:bg-[#161822] text-zinc-200 border border-white/[0.09] hover:border-violet-400/40 transition-all duration-200 cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
                <span>Resume</span>
              </button>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#111219] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.07] transition-colors cursor-pointer"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#111219] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.07] transition-colors cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-full bg-[#111219] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.07] transition-colors cursor-pointer"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Anchored System Profile & Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0c0d14]/90 border border-white/[0.09] p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
              {/* Subtle ambient corner light */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]"></span>
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">engineer_profile.sys</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="w-3 h-3" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Engineering Profile Summary */}
              <div className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Engineer Identity</div>
                  <div className="text-zinc-100 font-sans font-semibold text-base flex items-center justify-between">
                    <span>{personalInfo.name}</span>
                    <span className="text-xs text-violet-400 font-mono font-normal">Class of 2028</span>
                  </div>
                  <div className="text-zinc-400 text-xs font-sans">
                    B.Tech AI &amp; Machine Learning • SVKM's DJSCE
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Cumulative CGPA</span>
                    <span className="text-base font-bold font-sans text-zinc-100 mt-0.5 block">{educationInfo.cgpa}</span>
                    <span className="text-[10px] text-emerald-400">First Class Distinction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Honours Program</span>
                    <span className="text-xs font-bold font-sans text-zinc-200 mt-1 block">Quant Finance</span>
                    <span className="text-[10px] text-violet-400">Fintech Analytics</span>
                  </div>
                </div>

                {/* Core Domains */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-violet-400" />
                    <span>Technical Architecture Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Spatial PostGIS', 'Isolation Forest ML', 'FastAPI Backends', 'Next.js / React', 'BLE Telemetry'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location & Status Strip */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-violet-400" />
                    <span>Mumbai, India</span>
                  </span>
                  <span className="text-violet-300 font-sans">Open for Collaborations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Telemetry Strip */}
        <div className="pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-zinc-500 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span>Academic CGPA</span>
            </div>
            <div className="text-zinc-100 font-bold text-base font-sans">{educationInfo.cgpa}</div>
            <div className="text-zinc-500 text-[11px]">SVKM's DJSCE • AI &amp; ML</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px] uppercase tracking-wider">Honours Degree</div>
            <div className="text-zinc-100 font-bold text-base font-sans">Quantitative Finance</div>
            <div className="text-zinc-500 text-[11px]">Fintech &amp; Statistical Models</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px] uppercase tracking-wider">Production Systems</div>
            <div className="text-zinc-100 font-bold text-base font-sans">03 Complete Platforms</div>
            <div className="text-zinc-500 text-[11px]">Edge Telemetry, Cloud &amp; NLP</div>
          </div>

          <div className="space-y-1">
            <div className="text-zinc-500 text-[11px] uppercase tracking-wider">Engineering Focus</div>
            <div className="text-zinc-100 font-bold text-base font-sans">Full-Stack + Applied AI</div>
            <div className="text-zinc-500 text-[11px]">End-to-End System Design</div>
          </div>
        </div>
      </div>
    </section>
  );
}
