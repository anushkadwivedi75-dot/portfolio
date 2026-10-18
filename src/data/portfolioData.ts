import type { PersonalInfo, Education, Project, SkillItem, LeadershipRole } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Anushka Dwivedi',
  roleTitle: 'AI/ML Engineering Student & Full-Stack Developer',
  headline: 'I build intelligent systems and full-stack products that solve real-world problems.',
  bioIntro:
    'B.Tech candidate in Artificial Intelligence and Machine Learning at SVKM\'s DJS College of Engineering. Focused on bridging applied machine learning with robust, production-grade distributed web applications and spatial data infrastructure.',
  bioNarrative: [
    'I believe that the most compelling software exists at the collision point between algorithmic intelligence and thoughtful systems engineering. Rather than stopping at notebook demonstrations, I build complete products—from hardware-interfacing edge monitoring to high-throughput backend APIs and reactive interfaces.',
    'My technical focus spans full-stack web development (React, Next.js, FastAPI), spatial databases (PostGIS, PostgreSQL), and applied ML models for anomaly detection and automated document understanding. Through hackathons, college leadership, and project-driven exploration, I continuously turn complex ideas into tangible, production-tested software.'
  ],
  location: 'Mumbai, India',
  email: 'anushkadwivedi75@gmail.com',
  github: 'https://github.com/anushkadwivedi75',
  linkedin: 'https://www.linkedin.com/in/anushkadwivedi',
  availabilityStatus: 'Open for engineering internships & technical collaborations'
};

export const educationInfo: Education = {
  institution: "SVKM's Dwarkadas J. Sanghvi College of Engineering (DJSCE)",
  degree: 'Bachelor of Technology (B.Tech)',
  specialization: 'Artificial Intelligence and Machine Learning',
  duration: 'September 2024 – May 2028',
  cgpa: '8.13 / 10',
  honours: 'Quantitative Finance and Fintech',
  location: 'Mumbai, Maharashtra, India',
  highlights: [
    'Core Focus: Machine Learning Systems, Spatial Analytics, Distributed Backend Architecture & Quantitative Models',
    'Honours Track: Mathematical Foundations of Quantitative Finance, Financial Engineering & Algorithmic Modeling',
    'Active leadership in departmental technical societies (ACM SIGAI) and campus initiatives'
  ]
};

export const projectsData: Project[] = [
  {
    id: 'airsentinel',
    number: '01',
    title: 'AirSentinel',
    subtitle: 'End-to-End AQI Spatial Monitoring & Anomaly Detection Platform',
    category: 'Spatial Systems & Applied ML',
    timeline: '2025 – 2026',
    shortDescription:
      'An end-to-end air-quality monitoring platform connecting an ESP32 wearable, Bluetooth Low Energy, a Flutter application, and a FastAPI backend with PostGIS spatial divergence and scikit-learn anomaly detection.',
    problem:
      'Official government air-quality monitoring stations (CPCB) are sparsely distributed across cities, creating localized micro-climate blindspots. Meanwhile, low-cost community wearable sensors are prone to sensor drift, electrical noise, or erroneous readings, making raw community data unreliable without spatial validation.',
    approach:
      'Designed a multi-tier telemetry platform: ESP32 edge hardware broadcasts sensor packets via BLE to an offline-first Flutter client. The mobile app batches readings via SQLite and synchronizes with a FastAPI backend. PostGIS evaluates spatial divergence between community sensors and official CPCB stations within a 300-metre radius using ST_DWithin, while an Isolation Forest model detects multi-dimensional sensor anomalies over a rolling 48-hour temporal window.',
    technologies: [
      'Flutter',
      'FastAPI',
      'PostgreSQL',
      'PostGIS',
      'SQLite',
      'Python',
      'scikit-learn',
      'ESP32',
      'Bluetooth LE',
      'Docker'
    ],
    keyHighlights: [
      'PostGIS Spatial Processing: Evaluates spatial divergence between personal sensors and official CPCB stations within 300m using ST_DWithin and ST_Distance.',
      'Isolation Forest Anomaly Detection: Unsupervised outlier detection across a rolling 48-hour window to flag sensor drift and rapid environmental spikes.',
      'Offline-First Mobile Architecture: Local SQLite buffering with automatic transactional batch sync upon network reconnection.',
      'CPCB 6-Category AQI Scale: Real-time computation and mapping across Good (0-50), Satisfactory (51-100), Moderate (101-200), Poor (201-300), Very Poor (301-400), and Severe (401-500).',
      'Production Testing & Reliability: Automated Docker Compose environment, Alembic database migrations, pytest API test suite, Flutter widget tests, and a Python BLE simulator for stress-testing ingestion.'
    ],
    architecture: {
      overview:
        'Bi-directional edge-to-cloud pipeline combining hardware telemetry, local embedded caching, async REST ingestion, spatial querying, and ML classification.',
      layers: [
        {
          layer: 'Edge Hardware & BLE',
          tools: ['ESP32', 'BLE GATT', 'Python BLE Simulator'],
          purpose: 'Collects PM2.5, PM10, Temperature & Humidity; broadcasts structured binary BLE packets at 1Hz.'
        },
        {
          layer: 'Mobile Client (Edge Cache)',
          tools: ['Flutter', 'SQLite', 'flutter_reactive_ble'],
          purpose: 'Pairing, offline-first local storage, batch queue manager, India CPCB color-coded gauge displays.'
        },
        {
          layer: 'Backend API & Ingestion',
          tools: ['FastAPI', 'JWT Auth', 'Pydantic v2', 'Alembic'],
          purpose: 'High-throughput async batch ingestion, authenticated station administration, spatial alert webhooks.'
        },
        {
          layer: 'Spatial & ML Database',
          tools: ['PostgreSQL', 'PostGIS', 'scikit-learn (Isolation Forest)'],
          purpose: 'Spatial indexing (GIST), ST_DWithin 300m comparison against CPCB stations, rolling 48-hour anomaly scoring.'
        }
      ],
      schemaOrSnippet: {
        language: 'sql',
        title: 'PostGIS Spatial Divergence Query',
        code: `-- Detect spatial divergence within 300 meters of official CPCB stations
SELECT 
  cs.sensor_id,
  cs.recorded_at,
  cs.pm25_reading AS community_pm25,
  os.station_name AS official_station,
  os.pm25_reading AS official_pm25,
  ABS(cs.pm25_reading - os.pm25_reading) AS absolute_divergence,
  ST_Distance(cs.geom::geography, os.geom::geography) AS distance_meters
FROM community_readings cs
JOIN official_cpcb_stations os
  ON ST_DWithin(cs.geom::geography, os.geom::geography, 300.0)
WHERE cs.recorded_at >= NOW() - INTERVAL '1 hour'
  AND ABS(cs.pm25_reading - os.pm25_reading) > 25.0
ORDER BY distance_meters ASC;`
      }
    },
    technicalDeepDive: {
      title: 'Spatial Validation & Anomaly Detection Engine',
      detail:
        'When community sensors stream data, the backend runs two validation filters. First, PostGIS performs a spatial join with official ground stations within a 300-metre radius (ST_DWithin). If the divergence exceeds 25 AQI units, an alert flag is triggered. Concurrently, an unsupervised scikit-learn Isolation Forest evaluates rolling 48-hour sensor streams across temperature, humidity, PM2.5, and PM10 to isolate hardware failure from genuine atmospheric spikes.',
      codeSnippet: `from sklearn.ensemble import IsolationForest
import numpy as np

def detect_sensor_anomalies(rolling_window_df, contamination=0.03):
    """
    Evaluates multi-variate telemetry over a rolling 48-hour window
    to isolate hardware sensor malfunction from true particulate shifts.
    """
    features = ['pm25', 'pm10', 'temperature', 'humidity', 'delta_rate']
    X = rolling_window_df[features].dropna().values
    
    model = IsolationForest(
        n_estimators=100,
        contamination=contamination,
        random_state=42
    )
    predictions = model.fit_predict(X)
    # -1 represents an anomaly, 1 represents normal behavior
    return predictions == -1`
    },
    metricsOrFeatures: [
      {
        label: 'Spatial Radius',
        value: '300m',
        description: 'PostGIS ST_DWithin threshold for divergence calculation'
      },
      {
        label: 'AQI Categories',
        value: '6 Tiers',
        description: 'Compliant with India National CPCB AQI standards'
      },
      {
        label: 'Anomaly Window',
        value: '48 Hours',
        description: 'Rolling temporal window for Isolation Forest model'
      },
      {
        label: 'Offline Tolerance',
        value: '100%',
        description: 'SQLite persistence with automatic batch re-sync'
      }
    ],
    links: {
      githubUrl: 'https://github.com/anushkadwivedi75',
      isMockup: false,
      notice: 'Repository code and documentation available upon request / in active development.'
    }
  },
  {
    id: 'clouddrive',
    number: '02',
    title: 'Cloud Drive Clone',
    subtitle: 'Full-Stack Distributed Cloud Storage Platform',
    category: 'Full-Stack Cloud Architecture',
    timeline: '2025',
    shortDescription:
      'A full-stack cloud storage platform with Google OAuth, resumable multi-file uploads, nested folders, drag-and-drop, and synchronized cloud storage operations.',
    problem:
      'Modern cloud storage requires handling unpredictable network connections during massive multi-file uploads, maintaining deterministic nested folder directory structures, and preventing UI freezing or inconsistent states during concurrent cloud mutation operations.',
    approach:
      'Built a reactive single-page architecture using React and Tailwind CSS backed by Firebase Authentication and Firebase Storage. Implemented a chunked, resumable upload state machine with concurrent queue throttling, deterministic folder path recursion, drag-and-drop file ingestion, and real-time state synchronization.',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'Firebase Authentication',
      'Firebase Storage',
      'Tailwind CSS',
      'CSS3'
    ],
    keyHighlights: [
      'Resumable Multi-File Uploads: Chunked upload tracking with pause, resume, and retry capability during unexpected network interruptions.',
      'Deterministic Nested Folder Hierarchy: Recursive folder path management allowing deep navigation, folder creation, and relational breadcrumbs.',
      'Google OAuth & Secure Storage: Role-based storage security rules tied to authenticated user IDs ensuring zero cross-tenant leakage.',
      'Drag-and-Drop Ingestion: Custom dropzone handling single files, multi-file batches, and folder structures with instantaneous client-side progress bars.',
      'Synchronized Cloud Operations: Live metadata updates, inline file renaming, search-as-you-type, and direct URL asset retrieval.'
    ],
    architecture: {
      overview:
        'Client-centric reactive cloud storage system utilizing Firebase serverless storage buckets with asynchronous chunked stream ingestion and atomic state reconciliation.',
      layers: [
        {
          layer: 'Client UI & State',
          tools: ['React', 'TypeScript', 'Tailwind CSS'],
          purpose: 'Interactive folder tree, drag-and-drop zone, live upload progress widgets, breadcrumb routing.'
        },
        {
          layer: 'Auth & Access Control',
          tools: ['Firebase Auth', 'Google OAuth 2.0'],
          purpose: 'Token generation, session persistence, secure storage bucket path namespace isolation.'
        },
        {
          layer: 'Storage & Synchronization',
          tools: ['Firebase Storage API', 'Upload Tasks'],
          purpose: 'Resumable byte chunk streaming, upload task snapshots, download URL signing, file deletion.'
        }
      ],
      schemaOrSnippet: {
        language: 'javascript',
        title: 'Resumable Upload Task State Controller',
        code: `// Resumable upload chunk handler with state feedback
const uploadFileWithProgress = (file, currentFolderId, userId) => {
  const storageRef = ref(storage, \`users/\${userId}/\${currentFolderId}/\${file.name}\`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      updateUploadQueue(file.name, {
        progress: Math.round(progress),
        bytesUploaded: snapshot.bytesTransferred,
        totalBytes: snapshot.totalBytes,
        status: snapshot.state // 'running' | 'paused' | 'success'
      });
    },
    (error) => handleUploadFailure(file.name, error),
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await persistFileMetadata({
        name: file.name,
        size: file.size,
        folderId: currentFolderId,
        url: downloadURL,
        createdAt: new Date().toISOString()
      });
    }
  );
};`
      }
    },
    metricsOrFeatures: [
      {
        label: 'Upload Reliability',
        value: 'Resumable',
        description: 'Auto-retries on network drop with byte position recovery'
      },
      {
        label: 'Directory Tree',
        value: 'N-Levels',
        description: 'Recursive nested directory hierarchy with breadcrumb sync'
      },
      {
        label: 'Authentication',
        value: 'OAuth 2.0',
        description: 'Google single-sign-on with scoped user bucket security'
      },
      {
        label: 'Client Latency',
        value: 'Optimistic',
        description: 'Instantaneous UI feedback on folder ops before cloud ACK'
      }
    ],
    links: {
      githubUrl: 'https://github.com/anushkadwivedi75',
      isMockup: false,
      notice: 'Production demo link and codebase configured for authorized access.'
    }
  },
  {
    id: 'legalsimplifier',
    number: '03',
    title: 'Legal Simplifier AI',
    subtitle: 'AI-Powered Contract Analysis & Plain-Language Intelligence',
    category: 'Applied NLP & Document Intelligence',
    timeline: '2025',
    shortDescription:
      'An AI-powered legal document platform designed to make legal information easier to understand through plain-language summaries, contract comparisons, legal assistance, semantic search, and AI-driven document analysis.',
    problem:
      'Standard contracts, indemnity clauses, and service agreements contain dense legalese that obscure liability caps, non-compete clauses, and termination penalties from everyday founders, developers, and consumers.',
    approach:
      'Engineered an intelligent document parsing and comparative analysis platform using Next.js, React, TypeScript, and Tailwind CSS. Integrated Gemini / OpenAI LLM APIs with vector database semantic search to chunk documents, extract critical risks, synthesize plain-language explanations, and provide side-by-side contract diffing.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Firebase',
      'Gemini API / OpenAI API',
      'Vector Database'
    ],
    keyHighlights: [
      'Plain-Language Synthesis: Converts convoluted legal paragraphs into bulleted, risk-weighted human explanations.',
      'Clause-by-Clause Contract Comparison: Side-by-side comparative diffing showing changed indemnification terms and altered obligations between versions.',
      'Vector Semantic Search: High-dimensional embeddings indexing for rapid natural-language question answering across lengthy legal packets.',
      'Risk Classification Engine: Automatically labels clauses with Risk Levels (Low, Medium, High) based on liability exposure and termination penalties.',
      'Interactive Legal Assistant: Conversational agent trained with strict grounding guardrails to prevent legal hallucinations and summarize terms accurately.'
    ],
    architecture: {
      overview:
        'Retrieval-Augmented Generation (RAG) pipeline combining client document parsing, vector indexing for semantic similarity search, and structured prompt engineering with strict grounding.',
      layers: [
        {
          layer: 'Interface & Document Viewer',
          tools: ['Next.js', 'React', 'Tailwind CSS'],
          purpose: 'Split-view contract analyzer, risk highlighting, clause-by-clause diffing, responsive markdown renderer.'
        },
        {
          layer: 'Document Ingestion & Chunking',
          tools: ['Node.js API Routes', 'PDF/Text Parsers'],
          purpose: 'Section boundary detection, hierarchical clause extraction, token-aware chunking.'
        },
        {
          layer: 'Vector Embedding & Retrieval',
          tools: ['Vector Database', 'Embeddings API'],
          purpose: 'Calculates cosine similarity to surface relevant legal precedent and definitions.'
        },
        {
          layer: 'LLM Reasoning & Guardrails',
          tools: ['Gemini API', 'OpenAI API', 'JSON Schema Enforcement'],
          purpose: 'Produces verified risk levels, plain summaries, and structured contract diffs.'
        }
      ],
      schemaOrSnippet: {
        language: 'typescript',
        title: 'Structured Legal Clause Analysis Prompt & Schema',
        code: `// Structured clause analysis with explicit risk categorization
export interface ClauseAnalysisResult {
  clauseTitle: string;
  originalText: string;
  plainEnglishSummary: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  keyObligations: string[];
  hiddenLiabilities: string[];
  recommendation: string;
}

export async function analyzeLegalClause(clauseText: string): Promise<ClauseAnalysisResult> {
  const prompt = \`
You are an expert contract analyst. Analyze this legal clause with strict grounding:
"""\${clauseText}"""

Extract:
1. Plain English translation (concise, clear).
2. Risk Level (LOW, MEDIUM, HIGH) with exact rationale.
3. Hidden liabilities and operational obligations.
Return strictly in valid JSON matching ClauseAnalysisResult.
\`;
  return await callLLMWithJsonMode(prompt);
}`
      }
    },
    metricsOrFeatures: [
      {
        label: 'Analysis Latency',
        value: '< 2.5s',
        description: 'Streaming token generation for real-time document critique'
      },
      {
        label: 'Risk Classification',
        value: '3 Tiers',
        description: 'Automated High / Medium / Low exposure indicators'
      },
      {
        label: 'Search Mode',
        value: 'Semantic',
        description: 'Vector embeddings retrieval across multi-page agreements'
      },
      {
        label: 'Comparison View',
        value: 'Side-by-Side',
        description: 'Direct diffing between original and revised contract terms'
      }
    ],
    links: {
      githubUrl: 'https://github.com/anushkadwivedi75',
      isMockup: false,
      notice: 'Demo platform and repository available upon request / in active development.'
    }
  }
];

export const skillsList: SkillItem[] = [
  // Programming
  { name: 'C/C++', category: 'Programming', isKey: true },
  { name: 'Python', category: 'Programming', isKey: true },
  { name: 'Java', category: 'Programming', isKey: true },
  { name: 'JavaScript', category: 'Programming', isKey: true },
  { name: 'HTML5', category: 'Programming' },
  { name: 'CSS3', category: 'Programming' },
  { name: 'SQL', category: 'Programming', isKey: true },
  { name: 'TypeScript', category: 'Programming', isKey: true },

  // Web Development
  { name: 'ReactJS', category: 'Web Development', isKey: true },
  { name: 'FastAPI', category: 'Web Development', isKey: true },
  { name: 'Express.js', category: 'Web Development', isKey: true },
  { name: 'Next.js', category: 'Web Development', isKey: true },
  { name: 'Tailwind CSS', category: 'Web Development', isKey: true },
  { name: 'Bootstrap', category: 'Web Development' },
  { name: 'Node.js', category: 'Web Development', isKey: true },
  { name: 'REST APIs', category: 'Web Development', isKey: true },

  // Developer Tools & Platforms
  { name: 'Git', category: 'Developer Tools & Platforms', isKey: true },
  { name: 'GitHub', category: 'Developer Tools & Platforms', isKey: true },
  { name: 'Docker', category: 'Developer Tools & Platforms', isKey: true },
  { name: 'VS Code', category: 'Developer Tools & Platforms' },
  { name: 'Figma', category: 'Developer Tools & Platforms' },
  { name: 'Firebase', category: 'Developer Tools & Platforms', isKey: true },
  { name: 'Supabase', category: 'Developer Tools & Platforms' },
  { name: 'MongoDB', category: 'Developer Tools & Platforms' },

  // AI & Data
  { name: 'PostgreSQL', category: 'AI & Data', isKey: true },
  { name: 'PostGIS', category: 'AI & Data', isKey: true },
  { name: 'scikit-learn', category: 'AI & Data', isKey: true },
  { name: 'SQLite', category: 'AI & Data' },
  { name: 'Vector Databases', category: 'AI & Data', isKey: true },
  { name: 'ESP32 / BLE', category: 'AI & Data' },
  { name: 'Flutter', category: 'AI & Data' },
  { name: 'LLM Prompt Engineering', category: 'AI & Data', isKey: true }
];

export const leadershipExperience: LeadershipRole[] = [
  {
    role: 'VCP Admin',
    organization: 'DJS ACM SIGAI (Special Interest Group on Artificial Intelligence)',
    period: '2026 – Present',
    type: 'Technical Leadership & Community',
    description:
      'Serving as Vice Chairperson Administrator for DJS ACM SIGAI, leading technical initiatives, student workshops, and collaborative AI development sessions.',
    responsibilities: [
      'Coordinate technical operations, hands-on developer workshops, and peer mentorship sessions on machine learning and software engineering.',
      'Collaborate with student development teams to structure AI project sprints and hackathon preparation tracks.',
      'Organize technical symposiums bridging theoretical AI concepts with applied industry practices.'
    ]
  },
  {
    role: 'Events Head',
    organization: 'DJS eXpress',
    period: '2025 – 2026',
    type: 'College Community & Operations',
    description:
      'Led event ideation, logistics, and multi-team cross-collaboration for DJS eXpress, managing campus-wide cultural and technical initiatives.',
    responsibilities: [
      'Spearheaded end-to-end event execution, budget coordination, and inter-departmental scheduling.',
      'Managed volunteer teams, stage logistics, and participant engagement across flagship campus events.',
      'Cultivated team communication and rapid problem-solving under tight event deadlines.'
    ]
  }
];
