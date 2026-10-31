import { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Compass, 
  Music, 
  Camera, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Play, 
  Pause
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface AboutBrowserProps {
  onOpenResume: () => void;
}

type BrowserTab = 'about' | 'worklog' | 'journeys' | 'playlist' | 'gallery';

export default function AboutBrowser({ onOpenResume }: AboutBrowserProps) {
  const [activeTab, setActiveTab] = useState<BrowserTab>('about');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: 'Humane Ho Gaye', artist: 'Oshin Jain • Sanoli', duration: '3:42' },
    { title: 'Ilahi (Acoustic)', artist: 'Arijit Singh', duration: '3:24' },
    { title: 'Dil Mere', artist: 'The Local Train', duration: '4:10' },
    { title: 'Kasoor (Acoustic)', artist: 'Prateek Kuhad', duration: '3:15' },
  ];

  const tabs: { id: BrowserTab; title: string; icon: typeof User }[] = [
    { id: 'about', title: 'about me', icon: User },
    { id: 'worklog', title: 'work log', icon: Briefcase },
    { id: 'journeys', title: 'travel journeys', icon: Compass },
    { id: 'playlist', title: 'playlist', icon: Music },
    { id: 'gallery', title: 'gallery', icon: Camera },
  ];

  return (
    <section id="about" className="py-24 bg-[var(--color-paper)] text-[var(--color-ink)] paper-grain relative border-b border-[var(--color-line)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Editorial Section Header with Handwritten Doodle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-dim)] font-semibold block">
              03 / About Me
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-sans text-[var(--color-ink)] tracking-tight">
              A little more{' '}
              <span className="font-editorial italic font-normal text-[var(--color-accent)]">about me.</span>
            </h2>
          </div>

          {/* Handwritten Annotation with arrow pointing to the tabs */}
          <div className="flex items-center gap-2 font-hand text-xl text-[var(--color-ink-dim)] self-start sm:self-end">
            <span>yes, i have too many tabs open</span>
            <svg viewBox="0 0 40 25" className="w-8 h-5 text-[var(--color-accent)] fill-none stroke-current stroke-2 rotate-12">
              <path d="M4 18 C16 4 28 8 36 20" strokeLinecap="round" />
              <path d="M28 18 l8 2 0-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* The Realistic Desktop Browser Window */}
        <div className="rounded-2xl bg-white dark:bg-[#0c0d14] border border-[var(--color-line)] shadow-2xl overflow-hidden flex flex-col">
          {/* Browser Chrome Header */}
          <div className="bg-[#e8e7e1] dark:bg-[#161720] border-b border-[var(--color-line)] px-4 pt-3 pb-0 flex flex-col gap-2">
            {/* Top Row: Window Dots + Back/Forward + URL Address Bar */}
            <div className="flex items-center justify-between gap-4">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></span>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-1 text-zinc-400">
                <ArrowLeft className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-700" />
                <ArrowRight className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-700" />
              </div>

              {/* Address bar */}
              <div className="flex-1 max-w-lg mx-auto flex items-center justify-between px-3.5 py-1 rounded-full bg-white dark:bg-[#0c0d14] border border-[var(--color-line)] text-xs font-mono text-zinc-600 dark:text-zinc-400 shadow-inner">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span className="text-zinc-900 dark:text-zinc-200">anushka.dev/</span>
                  <span className="text-[var(--color-accent)] font-semibold">{activeTab}</span>
                </div>
                <RotateCw className="w-3 h-3 text-zinc-400 cursor-pointer hover:text-zinc-700" />
              </div>

              <div className="w-12"></div>
            </div>

            {/* Tab Strip */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border-t border-x ${
                      isActive
                        ? 'bg-white dark:bg-[#0c0d14] text-zinc-900 dark:text-white font-bold border-[var(--color-line)] -mb-[1px] relative z-10 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 border-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser Window Body Content */}
          <div className="p-6 sm:p-10 lg:p-12 min-h-[520px]">
            {/* ================= TAB 1: ABOUT ME ================= */}
            {activeTab === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                {/* Polaroid Photo on Left */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="p-4 pb-8 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-[var(--color-line)] shadow-xl rotate-[-2deg] max-w-[280px] w-full">
                    <div className="aspect-[4/5] rounded-lg bg-gradient-to-tr from-violet-900 via-indigo-950 to-zinc-900 flex flex-col justify-end p-4 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                      <span className="text-[10px] font-mono text-violet-300">ANUSHKA DWIVEDI</span>
                      <span className="text-xs font-bold font-sans">B.Tech AI/ML @ DJSCE</span>
                    </div>
                    <p className="font-hand text-lg text-center mt-3 text-zinc-600 dark:text-zinc-400 rotate-1">
                      yep, that’s me
                    </p>
                  </div>
                </div>

                {/* Narrative & Nameplate on Right */}
                <div className="md:col-span-7 space-y-6">
                  {/* Nameplate */}
                  <div className="space-y-1">
                    <h3 className="text-4xl sm:text-5xl font-bold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">
                      Anushka <span className="text-[var(--color-ink-dim)] font-normal">dwivedi.</span>
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 italic">
                      if you want to be formal
                    </p>
                  </div>

                  <p className="text-xs font-mono text-[var(--color-accent)] font-semibold uppercase tracking-wider">
                    CURRENTLY STUDYING AI/ML AT SVKM'S DJSCE &amp; VCP ADMIN AT DJS ACM SIGAI
                  </p>

                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                    AI/ML engineer and full-time builder. Most of my time goes to machine learning pipelines, spatial IoT data models, and full-stack web architectures. The rest goes to hackathons, technical symposiums, and building practical technology products.
                  </p>

                  {/* Personality Chips */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      ✦ AI &amp; deep learning
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                      ✦ spatial IoT systems
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                      ✦ 24×7 music &amp; code
                    </span>
                  </div>

                  {/* Meta Strip */}
                  <div className="pt-4 border-t border-[var(--color-line)] text-xs font-mono text-zinc-500 flex flex-wrap items-center gap-3">
                    <span>currently in Mumbai</span>
                    <span>•</span>
                    <span>home is Mumbai</span>
                    <span>•</span>
                    <a href="mailto:anushkadwivedi75@gmail.com" className="text-zinc-900 dark:text-zinc-100 underline">
                      anushkadwivedi75@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: WORK LOG (Exact match to video 00:52) ================= */}
            {activeTab === 'worklog' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    WORK LOG
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 dark:text-zinc-100">
                    where I've <em className="font-editorial italic font-normal text-[var(--color-accent)]">been building.</em>
                  </h3>
                </div>

                {/* Chronological Table */}
                <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] font-mono text-xs">
                  {/* Row 1 */}
                  <li className="py-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 px-2 transition-colors">
                    <span className="text-zinc-400 w-8">01</span>
                    <div className="flex-1 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      DJS ACM SIGAI
                    </div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">
                      VCP Admin (Vice Chairperson)
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                      NOW
                    </span>
                  </li>

                  {/* Row 2 */}
                  <li className="py-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 px-2 transition-colors">
                    <span className="text-zinc-400 w-8">02</span>
                    <div className="flex-1 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      SVKM's DJSCE
                    </div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">
                      B.Tech in Artificial Intelligence &amp; ML
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                      NOW
                    </span>
                  </li>

                  {/* Row 3 */}
                  <li className="py-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 px-2 transition-colors">
                    <span className="text-zinc-400 w-8">03</span>
                    <div className="flex-1 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      DJS eXpress
                    </div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">
                      Events &amp; Operations Head
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/5">
                      BEFORE
                    </span>
                  </li>
                </ul>

                {/* Red Doodle Footnote + Button */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-hand text-xl text-[var(--color-accent)]">
                    <span>the serious bit, in one PDF ↗</span>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenResume();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold bg-[var(--color-accent)] hover:opacity-90 text-white shadow-md cursor-pointer"
                  >
                    <span>open resume ↗</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 3: TRAVEL JOURNEYS (Exact match to video 00:57) ================= */}
            {activeTab === 'journeys' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    TRAVEL JOURNEYS
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 dark:text-zinc-100">
                    the hills are <em className="font-editorial italic font-normal text-[var(--color-accent)]">where I reset.</em>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 space-y-4 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-[var(--color-line)] flex items-center justify-between">
                      <span className="font-bold">2024 Spiti Valley</span>
                      <span className="text-[10px] text-zinc-500">solo trip</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-[var(--color-line)] flex items-center justify-between">
                      <span className="font-bold">2025 Kasol &amp; Parvati</span>
                      <span className="text-[10px] text-zinc-500">with friends</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-[var(--color-line)] flex items-center justify-between">
                      <span className="font-bold">2026 Himachal Snow</span>
                      <span className="text-[10px] text-[var(--color-accent)]">snow trip</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-2">
                      a bike, thin air, and mountain trails where ideas fall into place.
                    </p>
                  </div>

                  <div className="md:col-span-7 flex items-center justify-center gap-4">
                    <div className="p-3 pb-6 rounded-xl bg-white shadow-xl border border-zinc-200 -rotate-3 max-w-[220px]">
                      <div className="aspect-[4/3] rounded bg-gradient-to-tr from-sky-800 to-indigo-900 flex items-center justify-center text-white text-xs font-mono font-bold">
                        Spiti Heights
                      </div>
                      <p className="font-hand text-sm text-center mt-2 text-zinc-600">2024 Spiti</p>
                    </div>

                    <div className="p-3 pb-6 rounded-xl bg-white shadow-xl border border-zinc-200 rotate-4 max-w-[220px]">
                      <div className="aspect-[4/3] rounded bg-gradient-to-tr from-emerald-800 to-teal-950 flex items-center justify-center text-white text-xs font-mono font-bold">
                        Himachal Snowline
                      </div>
                      <p className="font-hand text-sm text-center mt-2 text-zinc-600">2026 Snow</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: PLAYLIST (Exact match to video 00:59) ================= */}
            {activeTab === 'playlist' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    PLAYLIST • NOT UR TYPE
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 dark:text-zinc-100">
                    music is how <em className="font-editorial italic font-normal text-[var(--color-accent)]">I get into flow.</em>
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    98 songs, mostly indie, mostly for long coding sessions and night drives.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                  {/* Left Tracklist */}
                  <div className="md:col-span-7 space-y-2 font-mono text-xs">
                    {tracks.map((track, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          soundManager.playClick();
                          setCurrentTrack(i);
                          setIsPlayingMusic(true);
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                          currentTrack === i
                            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-400 text-[var(--color-accent)] font-bold'
                            : 'bg-zinc-50 dark:bg-zinc-900 border-[var(--color-line)] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-4 text-zinc-400 text-[10px]">{i + 1}</span>
                          <div>
                            <div>{track.title}</div>
                            <div className="text-[10px] text-zinc-400">{track.artist}</div>
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-400">{track.duration}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Vinyl Player Card */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="p-6 rounded-3xl bg-zinc-900 text-white shadow-2xl border border-white/10 space-y-4 max-w-[280px] w-full text-center">
                      <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
                        {/* Vinyl Disc with Spin Animation */}
                        <div
                          className={`w-36 h-36 rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center shadow-2xl ${
                            isPlayingMusic ? 'animate-vinyl' : ''
                          }`}
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center">
                            <span className="w-3 h-3 rounded-full bg-zinc-950"></span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-bold text-sm">{tracks[currentTrack].title}</div>
                        <div className="text-xs text-zinc-400 font-mono">{tracks[currentTrack].artist}</div>
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playPop();
                          setIsPlayingMusic(!isPlayingMusic);
                        }}
                        className="px-6 py-2 rounded-full bg-[var(--color-accent)] text-white text-xs font-mono font-bold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
                      >
                        {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingMusic ? 'PAUSE' : 'PLAY'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 5: GALLERY (Exact match to video 01:01) ================= */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    GALLERY
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 dark:text-zinc-100">
                    bits of <em className="font-editorial italic font-normal text-[var(--color-accent)]">everyday.</em>
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    models, circuits, late-night hackathons &amp; college lab moments.
                  </p>
                </div>

                {/* 3x3 Photo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-violet-900 to-indigo-950 p-3 text-white flex flex-col justify-end text-[10px] font-mono shadow-md">
                    Lab Circuits
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 p-3 text-white flex flex-col justify-end text-[10px] font-mono shadow-md">
                    ESP32 Breadboard
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-emerald-900 to-teal-950 p-3 text-white flex flex-col justify-end text-[10px] font-mono shadow-md">
                    Campus Library
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-amber-900 to-orange-950 p-3 text-white flex flex-col justify-end text-[10px] font-mono shadow-md">
                    Midnight Coffee
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
