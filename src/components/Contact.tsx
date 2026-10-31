import { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUpRight, ArrowUp, MapPin, Clock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface ContactProps {
  onOpenResume: () => void;
}

export default function Contact({ onOpenResume }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-28 pb-12 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Contact Invitation Box */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-white to-zinc-50 dark:from-[#0e0f16] dark:to-[#0a0b10] border border-zinc-200/90 dark:border-white/[0.08] relative overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-2xl space-y-8">
          {/* Subtle violet ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/25 text-xs font-mono text-violet-700 dark:text-violet-300">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></span>
              <span>Available for Technical Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight leading-tight">
              Let’s build something{' '}
              <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300 tracking-normal px-1">
                intelligent
              </span>{' '}
              together.
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              Whether you are exploring applied machine learning, robust full-stack engineering, or upcoming engineering opportunities, my inbox is always open.
            </p>
          </div>

          {/* Email Card & Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4 relative z-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 transition-all duration-200 shadow-lg shadow-zinc-900/10 dark:shadow-white/5 hover:scale-[1.02] cursor-pointer group"
            >
              <Mail className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
              <span>{personalInfo.email}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium bg-white hover:bg-zinc-50 text-zinc-800 dark:bg-[#14151e] dark:hover:bg-[#191a26] dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.09] hover:border-violet-500/40 dark:hover:border-violet-400/40 transition-all cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
              <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium bg-transparent hover:bg-zinc-100 dark:hover:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.08] transition-all cursor-pointer"
            >
              <span>View Full CV</span>
            </button>
          </div>

          {/* Social Pills & Location Ticker */}
          <div className="pt-8 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-6 text-xs text-zinc-600 dark:text-zinc-400 relative z-10 font-mono">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-200 dark:border-white/[0.06] transition-colors cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5 text-zinc-500" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white border border-zinc-200 dark:border-white/[0.06] transition-colors cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-zinc-500" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                <span>Mumbai, IN</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                <span>{currentTime || 'IST Local Time'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Anushka Dwivedi.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline">
              React • TypeScript • Tailwind CSS • Vite
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
