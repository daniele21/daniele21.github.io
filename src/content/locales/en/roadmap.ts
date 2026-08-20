export const roadmapData = {
  hero: {
    title: 'Run AI where it makes sense.',
    principle: 'Local AI first ≠ Local AI only',
    subtitle:
      'Start by asking what can stay under your control. Then choose Local, Hybrid or Cloud based on privacy, cost, latency and real product constraints.',
    proof:
      'I build, test and measure AI across local infrastructure, desktops and mobile devices to understand what actually works outside the cloud.',
    primaryCta: { label: 'Explore the work →', href: '#strategy' },
    secondaryCta: { label: 'See the decision framework', href: '#strategy' },
  },
  strategy: {
    kicker: '01 — STRATEGY',
    title: 'Where should AI actually run?',
    intro:
      'Local AI creates value when keeping data, execution and dependencies under your control matters.',
    items: [
      {
        title: 'Keep sensitive data closer',
        text: 'Reduce unnecessary movement of private data.',
        icon: 'shield',
      },
      {
        title: 'Stay in control',
        text: 'Own the models, runtimes and execution path.',
        icon: 'lock',
      },
      {
        title: 'Reduce dependency',
        text: 'Limit exposure to vendor lock-in and changing API costs.',
        icon: 'link',
      },
      {
        title: 'Trace the system',
        text: 'Understand what happened from input to output.',
        icon: 'search',
      },
    ],
    decisionFramework: {
      title: 'Decision framework',
      root: 'Use case',
      question: 'Sensitive?',
      yesLabel: 'Yes',
      yesResult: 'Local / Hybrid',
      noLabel: 'No',
      noResult: 'Cloud / Hybrid',
      caption: 'Decide based on privacy, control, cost and constraints.',
    },
    comparison: {
      title: 'Local vs Hybrid vs Cloud',
      columns: ['Local', 'Hybrid', 'Cloud'],
      rows: [
        ['Privacy', '✓', '✓', '–'],
        ['Control', '✓', '✓', '×'],
        ['Cost', '$', '$$', '$$$'],
        ['Latency', '✓', '✓', '×'],
        ['Reliability', '✓', '✓', '×'],
      ],
      caption: 'No single winner. Choose by constraints.',
    },
    tradeoffs: {
      title: 'Trade-off guide',
      questions: [
        'Where is my data?',
        'Who should access it?',
        'Where does it need to run well?',
        'What can I operate and maintain?',
        'What happens if it fails?',
      ],
      caption: 'Make trade-offs explicit. Revisit as needs evolve.',
    },
  },
  architecture: {
    kicker: '02 — ARCHITECTURE & INFRASTRUCTURE',
    title: 'Can we actually run it locally?',
    intro:
      'I build the pieces needed to test Local AI across very different environments — from local servers to mobile devices.',
    image: 'images/ecosystem.png',
    items: [
      {
        title: 'Desktop & local infrastructure',
        text: 'Run open models while keeping control over data and inference.',
        icon: 'desktop',
      },
      {
        title: 'Mobile / on-device',
        text: 'See what survives real memory, battery and thermal constraints.',
        icon: 'mobile',
      },
      {
        title: 'Local speech',
        text: 'Add private ASR without making the cloud mandatory.',
        icon: 'wave',
      },
      {
        title: 'Runtimes & deployment',
        text: 'Turn individual components into systems that can actually be used.',
        icon: 'cube',
      },
    ],
  },
  applications: {
    kicker: '03 — APPLICATIONS',
    title: 'What happens in a real product?',
    intro: 'Infrastructure only matters when it survives real data, users and workflows.',
    note: 'I use applications as test beds for the stack.',
    questions: [
      'Can sensitive documents stay local?',
      'How useful can AI become on-device?',
      'Can meeting intelligence stay private?',
    ],
    cards: [
      {
        name: 'RedactGuard',
        description: 'Local-first redaction for sensitive documents.',
        image: 'images/redact-guard/logo.png',
        href: 'redact-guard',
        tone: 'red',
        cta: 'View project →',
      },
      {
        name: 'Aura',
        description: 'On-device assistant for private use and real workflows.',
        image: 'images/aura/logo.png',
        href: 'aura-finance',
        tone: 'purple',
        cta: 'View project →',
      },
      {
        name: 'ClosedRoom',
        description: 'Private meetings and local-first conversation intelligence.',
        image: 'images/closedroom/logo.png',
        href: 'closedroom',
        tone: 'blue',
        cta: 'View project →',
      },
      {
        name: 'Your next application',
        description: 'Your idea, built with the same local-first principles.',
        image: null,
        href: null,
        tone: 'neutral',
        cta: 'Coming soon',
      },
    ],
  },
  observability: {
    kicker: '04 — OBSERVABILITY & MEASUREMENT',
    title: 'Does it actually work well?',
    intro:
      'It runs isn’t enough. Local AI has to perform under real hardware and product constraints.',
    items: [
      { title: 'Is it fast enough?', text: 'Latency and throughput.', icon: 'chart' },
      { title: 'Does it fit?', text: 'Memory, CPU/GPU and storage.', icon: 'chip' },
      { title: 'Can the device sustain it?', text: 'Thermals and battery.', icon: 'thermo' },
      { title: 'Is it reliable?', text: 'Errors, requests and runtime behavior.', icon: 'shield' },
    ],
    metrics: {
      performance: {
        title: 'Performance Lab',
        stats: [
          ['P95 Latency', '62 ms'],
          ['Throughput', '12.4K/min'],
          ['Error rate', '0.02%'],
        ],
      },
      traffic: {
        title: 'Traffic Monitoring',
        stats: [
          ['Requests', '18,542'],
          ['Tokens', '2.1M'],
          ['Errors', '23 (0.12%)'],
        ],
      },
      keyMetrics: {
        title: 'Key Metrics',
        stats: [
          ['Latency (P95)', '62 ms'],
          ['Throughput', '12.4K/min'],
          ['Error Rate', '0.02%'],
          ['Success Rate', '99.65%'],
          ['Tokens / min', '1.8M'],
        ],
      },
      resources: {
        title: 'Resource Usage',
        distribution: [
          ['CPU', '34%'],
          ['GPU', '28%'],
          ['RAM', '26%'],
          ['Disk', '12%'],
        ],
        memory: [
          ['RAM', '10.8 / 32 GB'],
          ['VRAM', '10.1 / 24 GB'],
        ],
      },
    },
  },
  transitions: [
    {
      direction: 'ltr' as const,
      label: 'DECIDE → BUILD',
      sublabel: 'If it should run locally, make it possible.',
      icon: 'target',
      filterId: 'roadmap-glow-a',
    },
    {
      direction: 'rtl' as const,
      label: 'BUILD → TEST',
      sublabel: 'If it runs, put it inside a real product.',
      icon: 'cube',
      filterId: 'roadmap-glow-b',
    },
    {
      direction: 'ltr' as const,
      label: 'TEST → MEASURE',
      sublabel: 'If it works, prove how well.',
      icon: 'bars',
      filterId: 'roadmap-glow-c',
    },
  ],
  closing: {
    evidenceTitle: 'Evidence feeds the next decision.',
    evidenceText:
      'Measure what happened. Learn from the constraints. Decide again whether the next workload belongs Local, Hybrid or Cloud.',
    collaborationTitle: 'Let’s build something together.',
    collaborationText: 'Have a project, idea or question? I’d love to hear from you.',
    primaryCta: 'Get in touch →',
    secondaryCta: 'View my work',
  },
  header: {
    brand: 'Daniele Moltisanti',
    links: [
      { label: 'Work', href: '#strategy' },
      { label: 'Projects', href: '#applications' },
      { label: 'Articles', href: 'insights' },
      { label: 'About', href: 'about' },
    ],
    cta: { label: 'Get in touch', href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20conversation' },
  },
} as const;

export type RoadmapData = typeof roadmapData;
