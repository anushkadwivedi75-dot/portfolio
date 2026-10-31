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

export type SkillCategory = 
  | 'Programming Languages'
  | 'Frontend Development'
  | 'Backend Development'
  | 'AI & Machine Learning'
  | 'Databases & Tools'
  | 'Development Platforms';

export interface SkillItem {
  name: string;
  category: SkillCategory;
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

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  period: string;
  category: 'Academic Honor' | 'Competition & Hackathon' | 'Certification';
  description: string;
  highlights: string[];
  badgeText?: string;
}

export interface AdditionalProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Completed' | 'In Progress' | 'Open Source';
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
