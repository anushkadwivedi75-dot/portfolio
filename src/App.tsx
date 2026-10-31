import { useState } from 'react';
import Hero from './components/Hero';
import WorkExperience from './components/WorkExperience';
import Snippets from './components/Snippets';
import AboutBrowser from './components/AboutBrowser';
import Outro from './components/Outro';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import SoundDock from './components/SoundDock';
import PencilScroller from './components/PencilScroller';
import { projectsData } from './data/portfolioData';
import type { Project } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';

function MainApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Initialize official Lenis smooth inertia scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--canvas-text)] font-sans antialiased selection:bg-red-500/20 selection:text-red-900 transition-colors duration-300 relative">
      {/* Interactive Vertical Pencil Progress Scroller (Matches Reference Video) */}
      <PencilScroller />

      {/* Floating Tactile Sound Dock */}
      <SoundDock />

      {/* Main Content Sections */}
      <main>
        {/* 00 / Hero Section with Wordmark & Three Editorial Picture Templates */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* 01 / Unified Work Experience: Sequential Word Reveal -> Headset Zoom -> Direct Gliding Project Rail in Headset */}
        <WorkExperience
          projects={projectsData}
          onOpenModal={(proj) => setSelectedProject(proj)}
        />

        {/* 02 / The Work Between Case Studies: Topographic Peaks + UI Snippets + Phone Carousel */}
        <Snippets />

        {/* 03 / Desktop Browser OS Window: About, Work Log, Journeys, Playlist, Gallery */}
        <AboutBrowser onOpenResume={() => setResumeOpen(true)} />

        {/* Outro Sign-off with Summit Curve, K2 quote, Resume button & Giant Email */}
        <Outro onOpenResume={() => setResumeOpen(true)} />
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

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
