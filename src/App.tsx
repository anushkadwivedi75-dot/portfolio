import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import About from './components/About';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import { projectsData } from './data/portfolioData';
import type { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ededf0] font-sans selection:bg-violet-500/25 selection:text-violet-200 antialiased overflow-x-hidden">
      {/* Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* Selected Work Section */}
        <section id="work" className="py-24 border-b border-white/[0.06] relative">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                  <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                    01 / Selected Production Systems
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 font-sans tracking-tight">
                  Applied architectures &amp; end-to-end engineering.
                </h2>
              </div>
              <p className="text-zinc-400 max-w-md text-sm font-light leading-relaxed">
                Substantial case studies spanning spatial hardware telemetry, cloud storage architectures, and applied retrieval-augmented NLP.
              </p>
            </div>

            {/* Project Showcase List */}
            <div className="space-y-16">
              {projectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenModal={(proj) => setSelectedProject(proj)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About & Education Section */}
        <About />

        {/* Technical Skills Matrix */}
        <Skills />

        {/* Leadership & Extracurriculars */}
        <Leadership />

        {/* Contact & Footer Section */}
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>

      {/* Technical Deep Dive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
