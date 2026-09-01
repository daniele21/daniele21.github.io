export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  lede: string;
  primaryAction: {
    label: string;
    href: string;
  };
  linkedinAction: {
    label: string;
    href: string;
  };
  currentExperiment: {
    label: string;
    text: string;
  };
  proofCard: {
    tag: string;
    image: string;
    alt: string;
    href: string;
    metrics: HeroMetric[];
  };
}

export interface FeaturedProject {
  title: string;
  eyebrow: string;
  question: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  splitImages?: {
    src: string;
    alt: string;
    tag: string;
  }[];
}

export interface SecondaryWorkItem {
  title: string;
  description: string;
  href: string;
}

export interface LabItem {
  date: string;
  year?: string;
  type: 'Experiment' | 'Deep dive' | 'Architecture' | 'Benchmark';
  title: string;
  tags: string[];
  href: string;
}

export interface EvidenceMetric {
  value: string;
  unit: string;
  label: string;
  description: string;
  highlight?: boolean;
}

export interface EvidenceSpotlightData {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  cta: {
    label: string;
    href: string;
  };
  metrics: EvidenceMetric[];
  note: string;
}

export interface WritingItem {
  title: string;
  source: string;
  href: string;
  external?: boolean;
}

export interface ResearchChannel {
  name: string;
  purpose: string;
  href: string;
  mark: string;
}

export interface TrackCredential {
  value: string;
  label: string;
}

export interface AdvisoryData {
  kicker: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
}

export const heroData: HeroData = {
  eyebrow: 'DANIELE MOLTISANTI · LOCAL AI',
  titlePrefix: 'I make local AI work ',
  titleHighlight: 'in real products.',
  lede: 'On-device inference, runtimes and hybrid architectures -built and measured on real hardware.',
  primaryAction: {
    label: 'Explore my work',
    href: '#work',
  },
  linkedinAction: {
    label: 'Follow on LinkedIn ↗',
    href: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
  currentExperiment: {
    label: 'Current experiment:',
    text: 'shared local LLM infrastructure on Android.',
  },
  proofCard: {
    tag: 'ANDROID · REAL RUN',
    image: 'images/harness/harness-playground-current.webp',
    alt: 'Android Local LLM Harness running Qwen locally on a physical device',
    href: 'android-local-llm-harness',
    metrics: [
      { value: '1318 ms', label: 'TTFT' },
      { value: '9.50', label: 'tok/s' },
      { value: 'Qwen 2B', label: 'Q4_K_M' },
    ],
  },
};

export const featuredProjects: {
  main: FeaturedProject;
  stack: FeaturedProject[];
  more: SecondaryWorkItem[];
} = {
  main: {
    title: 'Android Local LLM Harness',
    eyebrow: 'ON-DEVICE AI · RUNTIME',
    question: 'Can Android become a reusable local AI runtime?',
    description: 'A shared local LLM runtime tested on real devices with resident model management, IPC and runtime metrics.',
    href: 'android-local-llm-harness',
    featured: true,
    splitImages: [
      {
        src: 'images/harness/harness-split-prompt.webp',
        alt: 'Harness on-device prompt and configuration request',
        tag: '01 · PROMPT',
      },
      {
        src: 'images/harness/harness-split-response.webp',
        alt: 'Harness local model response and runtime metrics',
        tag: '02 · RESPONSE',
      },
    ],
  },
  stack: [
    {
      title: 'Korgis',
      eyebrow: 'LOCAL RUNTIME · DESKTOP',
      question: 'One inference layer. Multiple local products.',
      description: 'Reusable local inference across products with OpenAI-compatible API endpoints.',
      href: 'local-llm-server',
      image: 'images/local-llm-server/chat-studio.png',
      imageAlt: 'Korgis chat studio interface.',
    },
    {
      title: 'ClosedRoom',
      eyebrow: 'LOCAL APPLICATION · MACOS',
      question: 'Meeting intelligence without sending the meeting away.',
      description: 'Private meeting intelligence and local speech transcription running 100% on-device.',
      href: 'closedroom',
      image: 'images/closedroom/home.jpg',
      imageAlt: 'ClosedRoom local meeting intelligence application interface.',
    },
  ],
  more: [
    {
      title: 'RedactGuard',
      description: 'Local PII intelligence for sensitive documents',
      href: 'redact-guard',
    },
    {
      title: 'Traffic Monitoring',
      description: 'Evidence for what local software actually sends',
      href: 'traffic-monitoring',
    },
    {
      title: 'Field Guide',
      description: 'A practical map of the Local AI stack & decisions',
      href: 'local-ai',
    },
  ],
};

export const latestLab: LabItem[] = [
  {
    date: '19 AUG',
    year: '2026',
    type: 'Experiment',
    title: 'Running one resident LLM across Android apps',
    tags: ['Android', 'llama.cpp'],
    href: 'android-local-llm-harness',
  },
  {
    date: '18 AUG',
    year: '2026',
    type: 'Deep dive',
    title: 'What llama.cpp actually changes on mobile',
    tags: ['Runtime', 'Inference'],
    href: 'local-ai',
  },
  {
    date: '12 AUG',
    year: '2026',
    type: 'Experiment',
    title: 'Encoder vs local LLM for PII detection',
    tags: ['RedactGuard', 'PII'],
    href: 'redact-guard',
  },
  {
    date: '04 AUG',
    year: '2026',
    type: 'Architecture',
    title: 'Separating inference runtimes from application state',
    tags: ['Local Server', 'IPC'],
    href: 'local-llm-server',
  },
];

export const evidenceSpotlight: EvidenceSpotlightData = {
  kicker: 'REAL-DEVICE EVIDENCE',
  titlePrefix: 'Not “can it run?”. ',
  titleHighlight: 'How well does it run?',
  subtitle: 'Qwen3.5-2B · Q4_K_M · Android (Single observed run)',
  cta: {
    label: 'See the experiment →',
    href: 'android-local-llm-harness',
  },
  metrics: [
    {
      value: '1318',
      unit: 'ms',
      label: 'TTFT',
      description: 'Time to first visible token',
      highlight: true,
    },
    {
      value: '9.50',
      unit: 'tok/s',
      label: 'DECODE',
      description: 'Local generation throughput',
    },
    {
      value: '3451',
      unit: 'ms',
      label: 'TOTAL',
      description: 'Full on-device turn duration',
    },
  ],
  note: 'Single observed Harness run on physical Android hardware. Device thermals, model quantization, prompt length and runtime context matter.',
};

export const writingData: {
  articles: WritingItem[];
  channels: ResearchChannel[];
} = {
  articles: [
    {
      title: 'Local AI is becoming an architecture decision',
      source: 'stAI tuned',
      href: 'https://staituned.com',
      external: true,
    },
    {
      title: 'Running LLMs on Android: what actually matters in practice',
      source: 'Research note',
      href: 'android-local-llm-harness',
      external: false,
    },
    {
      title: 'Local-first ≠ local-only: finding the real boundary',
      source: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      external: true,
    },
    {
      title: 'Designing observable network boundaries for on-device AI',
      source: 'Field Guide',
      href: 'local-ai',
      external: false,
    },
  ],
  channels: [
    {
      name: 'GitHub',
      purpose: 'Code & experiments',
      href: 'https://github.com/daniele21',
      mark: 'GH',
    },
    {
      name: 'stAI tuned',
      purpose: 'Long-form research',
      href: 'https://staituned.com',
      mark: 'AI',
    },
    {
      name: 'LinkedIn',
      purpose: 'Working ideas',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      mark: 'in',
    },
  ],
};

export const trackCredentials: TrackCredential[] = [
  { value: 'Enterprise', label: 'AI technical leadership' },
  { value: '80+', label: 'technical articles & notes' },
  { value: '150+', label: 'AI projects reviewed' },
  { value: 'Top Nova 111', label: 'Nova Talent (AI & Tech)' },
];

export const advisoryData: AdvisoryData = {
  kicker: 'ADVISORY',
  title: 'Deciding what should run locally?',
  description: 'I help teams evaluate feasibility, runtime choices and the local / cloud boundary for real workloads.',
  cta: {
    label: 'Discuss a workload →',
    href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20workload',
  },
};
