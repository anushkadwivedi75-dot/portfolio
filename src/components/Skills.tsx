import { useState } from 'react';
import {
  Code2,
  Layout,
  Server,
  Cpu,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { skillsList } from '../data/portfolioData';
import type { SkillCategory } from '../types';

type CategoryFilter = 'All' | SkillCategory;

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: { label: CategoryFilter; icon: typeof Code2 }[] = [
    { label: 'All', icon: Sparkles },
    { label: 'Programming Languages', icon: Code2 },
    { label: 'Frontend Development', icon: Layout },
    { label: 'Backend Development', icon: Server },
    { label: 'AI & Machine Learning', icon: Cpu },
    { label: 'Databases & Tools', icon: Database },
    { label: 'Development Platforms', icon: Layers },
  ];

  const categoryGroups: {
    name: SkillCategory;
    icon: typeof Code2;
    context: string;
  }[] = [
    {
      name: 'Programming Languages',
      icon: Code2,
      context: 'Core algorithmic thinking, systems programming, object-oriented paradigms, and script automation.'
    },
    {
      name: 'Frontend Development',
      icon: Layout,
      context: 'Reactive component design, responsive interfaces, state management, and modern web applications.'
    },
    {
      name: 'Backend Development',
      icon: Server,
      context: 'High-throughput asynchronous REST APIs, authentication layers, microservices, and server architecture.'
    },
    {
      name: 'AI & Machine Learning',
      icon: Cpu,
      context: 'Unsupervised anomaly detection, spatial indexing, retrieval-augmented NLP, and LLM prompt engineering.'
    },
    {
      name: 'Databases & Tools',
      icon: Database,
      context: 'Spatial SQL queries, relational & document databases, vector stores, and Git version control workflows.'
    },
    {
      name: 'Development Platforms',
      icon: Layers,
      context: 'Containerization, edge BLE microcontrollers, mobile app ecosystems, and design engineering.'
    }
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 border-b border-white/[0.08] dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
                03 / Technical Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
              Tools, frameworks, &amp;{' '}
              <span className="font-editorial italic font-normal text-violet-600 dark:text-violet-300 tracking-normal px-1">
                engineering stack
              </span>
              .
            </h2>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-[#0c0d13] border border-zinc-200 dark:border-white/[0.08] max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-violet-600 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display */}
        {activeCategory === 'All' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryGroups.map((group) => {
              const GroupIcon = group.icon;
              const groupSkills = skillsList.filter((s) => s.category === group.name);
              return (
                <div
                  key={group.name}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] hover:border-violet-500/40 dark:hover:border-violet-500/30 transition-all duration-300 space-y-4 shadow-sm hover:shadow-lg dark:shadow-none flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm font-sans">
                        <GroupIcon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span>{group.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
                        {groupSkills.length} Verified
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {group.context}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {groupSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                          skill.isKey
                            ? 'bg-violet-50 text-violet-900 border border-violet-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-violet-500/30 font-medium'
                            : 'bg-zinc-100/80 text-zinc-600 border border-zinc-200 dark:bg-zinc-900/60 dark:text-zinc-400 dark:border-white/[0.05]'
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200 dark:border-white/[0.08] space-y-6 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.06] pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-300 font-semibold">
                Viewing {activeCategory}
              </span>
              <span className="text-xs font-mono text-zinc-500">{filteredSkills.length} Verified Technologies</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/[0.06] hover:border-violet-400/50 transition-colors flex items-center justify-between"
                >
                  <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                    {skill.name}
                  </span>
                  {skill.isKey && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" title="Key Focus"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Rigor Note */}
        <div className="p-4 rounded-2xl bg-zinc-100/90 dark:bg-[#0a0b10] border border-zinc-200 dark:border-white/[0.05] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            <span>All technologies reflect hands-on implementation across projects, hackathons &amp; academic coursework.</span>
          </div>
          <span className="text-zinc-500 dark:text-zinc-400">Zero arbitrary percentages or ungrounded claims.</span>
        </div>
      </div>
    </section>
  );
}
