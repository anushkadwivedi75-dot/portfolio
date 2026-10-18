export interface ArchitectureLayer {
  layer: string;
  tools: string[];
  purpose: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  timeline: string;
  shortDescription: string;
  problem: string;
  approach: string;
  technologies: string[];
  keyHighlights: string[];
  architecture: {
    overview: string;
    layers: ArchitectureLayer[];
    schemaOrSnippet?: {
      language: string;
      title: string;
      code: string;
    };
  };
  technicalDeepDive?: {
    title: string;
    detail: string;
    codeSnippet?: string;
  };
  metricsOrFeatures: ProjectMetric[];
  links: {
    githubUrl?: string;
    liveUrl?: string;
    isMockup: boolean;
    notice?: string;
  };
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Web Development' | 'Developer Tools & Platforms' | 'AI & Data';
  isKey?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
  cgpa: string;
  honours: string;
  location: string;
  highlights: string[];
}

export interface LeadershipRole {
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
}

export interface PersonalInfo {
  name: string;
  roleTitle: string;
  headline: string;
  bioIntro: string;
  bioNarrative: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  availabilityStatus: string;
}
