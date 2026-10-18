import { useState } from 'react';
import { Terminal, Globe, Wrench, Database } from 'lucide-react';
import { skillsList } from '../data/portfolioData';

type CategoryFilter = 'All' | 'Programming' | 'Web Development' | 'Developer Tools & Platforms' | 'AI & Data';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: { label: CategoryFilter; icon: typeof Terminal }[] = [
    { label: 'All', icon: Terminal },
    { label: 'Programming', icon: Terminal },
    { label: 'Web Development', icon: Globe },
    { label: 'Developer Tools & Platforms', icon: Wrench },
    { label: 'AI & Data', icon: Database },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  // Grouped breakdown for comprehensive view
  const categoryGroups = [
    {
      name: 'Programming',
      icon: Terminal,
      skills: skillsList.filter((s) => s.category === 'Programming'),
      context: 'Core algorithmic thinking, systems programming, and script automation.'
    },
    {
      name: 'Web Development',
      icon: Globe,
      skills: skillsList.filter((s) => s.category === 'Web Development'),
      context: 'Reactive frontend clients, high-performance async REST backends, and full-stack integration.'
    },
    {
      name: 'Developer Tools & Platforms',
      icon: Wrench,
      skills: skillsList.filter((s) => s.category === 'Developer Tools & Platforms'),
      context: 'Containerization, version control, cloud platform services, and production developer workflows.'
    },
    {
      name: 'AI & Data',
      icon: Database,
      skills: skillsList.filter((s) => s.category === 'AI & Data'),
      context: 'Spatial SQL queries, relational & vector databases, unsupervised anomaly models, and edge BLE.'
    }
  ];

  return (
    <section id="skills" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                03 / Technical Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 font-sans tracking-tight">
              Tools, frameworks, &amp; engineering stack.
            </h2>
          </div>

          {/* Interactive Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#12131b] border border-white/[0.08]">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat.label
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display: When 'All', show grouped architecture cards; else show filtered grid */}
        {activeCategory === 'All' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div
                  key={group.name}
                  className="p-6 sm:p-7 rounded-2xl bg-[#101117] border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
                      <GroupIcon className="w-4 h-4 text-violet-400" />
                      <span>{group.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {group.skills.length} Technologies
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {group.context}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                          skill.isKey
                            ? 'bg-[#181924] text-zinc-100 border border-violet-500/30 font-medium'
                            : 'bg-[#13141c] text-zinc-400 border border-white/[0.05]'
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
          <div className="p-8 rounded-2xl bg-[#101117] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                Viewing {activeCategory} Technologies
              </span>
              <span className="text-xs font-mono text-zinc-500">{filteredSkills.length} Verified</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-[#14151e] border border-white/[0.06] hover:border-violet-400/40 transition-colors flex items-center justify-between"
                >
                  <span className="font-mono text-xs text-zinc-200 font-medium">{skill.name}</span>
                  {skill.isKey && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Rigor Note */}
        <div className="p-4 rounded-xl bg-[#0e0f15] border border-white/[0.05] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>All technologies reflect hands-on implementation across projects, hackathons &amp; coursework.</span>
          </div>
          <span className="text-zinc-400">Zero arbitrary percentages or unverified claims.</span>
        </div>
      </div>
    </section>
  );
}
