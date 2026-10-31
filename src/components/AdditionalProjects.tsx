import { useState } from 'react';
import { additionalProjectsData } from '../data/portfolioData';
import { GithubIcon } from './icons/BrandIcons';
import { ExternalLink, FolderGit2 } from 'lucide-react';

export default function AdditionalProjects() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-8">
      {/* Interactive Expand / Collapse Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-100/80 dark:bg-[#0c0d14] border border-zinc-200 dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/25 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 font-sans">
              More Engineering Projects &amp; Explorations
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
              Quantitative models, financial NLP pipelines, and computer vision utilities.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-white/[0.09] hover:border-violet-500/50 shadow-sm"
        >
          {isOpen ? 'Collapse Archive' : `Explore ${additionalProjectsData.length} Additional Projects`}
        </button>
      </div>

      {/* Grid of Additional Projects */}
      {isOpen && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {additionalProjectsData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] hover:border-violet-500/40 dark:hover:border-violet-500/30 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-none group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-violet-600 dark:text-violet-300 font-semibold bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded border border-violet-200 dark:border-violet-500/20">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h5 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-xs font-medium text-violet-600/90 dark:text-violet-300/80 font-sans">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-white/[0.06]">
                <div className="flex flex-wrap gap-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-white transition-colors pt-1 cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
