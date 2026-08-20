/**
 * roadmap.ts — Content data for the Local AI Roadmap landing page.
 *
 * All copy, labels and structured data extracted from LocalAIRoadmapMockup
 * to keep components data-free and i18n-ready.
 */

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export const heroContent = {
  title: 'Run AI where it makes sense.',
  titleHighlight: 'Local AI first ≠ Local AI only',
  principle:
    'Start by asking what can stay under your control. Then choose Local, Hybrid or Cloud based on privacy, cost, latency and real product constraints.',
  proof:
    'I build, test and measure AI across local infrastructure, desktops and mobile devices to understand what actually works outside the cloud.',
  primaryCta: { label: 'Explore the work', href: '#strategy' },
  secondaryCta: { label: 'See the decision framework', href: '#strategy' },
};

/* ------------------------------------------------------------------ */
/*  Stage 1 — Strategy                                                 */
/* ------------------------------------------------------------------ */

export const strategyContent = {
  kicker: '01 — STRATEGY',
  title: 'Where should AI\nactually run?',
  intro:
    'Local AI creates value when keeping data, execution and dependencies under your control matters.',
  items: [
    { icon: '◇', title: 'Keep sensitive data closer', text: 'Reduce unnecessary movement of private data.' },
    { icon: '▣', title: 'Stay in control', text: 'Own the models, runtimes and execution path.' },
    { icon: '↗', title: 'Reduce dependency', text: 'Limit exposure to vendor lock-in and changing API costs.' },
    { icon: '⌕', title: 'Trace the system', text: 'Understand what happened from input to output.' },
  ],
};

/** Decision framework panel */
export const decisionFramework = {
  title: 'Decision framework',
  footer: 'Decide based on privacy, control, cost and constraints.',
};

/** Local vs Hybrid vs Cloud comparison table */
export const comparisonTable = {
  title: 'Local vs Hybrid vs Cloud',
  columns: ['Local', 'Hybrid', 'Cloud'] as const,
  rows: [
    { label: 'Privacy',     values: ['✓', '✓', '–'],   classes: ['good', 'good', ''] },
    { label: 'Control',     values: ['✓', '✓', '×'],   classes: ['good', 'good', 'bad'] },
    { label: 'Cost',        values: ['$', '$$', '$$$'], classes: ['good', 'warn', 'bad'] },
    { label: 'Latency',     values: ['✓', '✓', '×'],   classes: ['good', 'good', 'bad'] },
    { label: 'Reliability', values: ['✓', '✓', '×'],   classes: ['good', 'good', 'bad'] },
  ],
  footer: 'No single winner.\nChoose by constraints.',
};

/** Trade-off guide panel */
export const tradeoffGuide = {
  title: 'Trade-off guide',
  questions: [
    { icon: '▤', text: 'Where is my data?' },
    { icon: '♙', text: 'Who should access it?' },
    { icon: '◷', text: 'Where does it need to run well?' },
    { icon: '⚙', text: 'What can I operate and maintain?' },
    { icon: '△', text: 'What happens if it fails?' },
  ],
  footer: 'Make trade-offs explicit.\nRevisit as needs evolve.',
};

/* ------------------------------------------------------------------ */
/*  Stage 2 — Architecture & Infrastructure                            */
/* ------------------------------------------------------------------ */

export const architectureContent = {
  kicker: '02 — ARCHITECTURE & INFRASTRUCTURE',
  title: 'Can we actually\nrun it locally?',
  intro:
    'I build the pieces needed to test Local AI across very different environments — from local servers to mobile devices.',
  /** Path relative to public/ — resolved at component level */
  ecosystemImage: 'images/ecosystem.png',
  ecosystemAlt: 'Connected Local AI stack across desktop, Android, local server and cloud',
  items: [
    { icon: '▱', title: 'Desktop & local infrastructure', text: 'Run open models while keeping control over data and inference.' },
    { icon: '▯', title: 'Mobile / on-device', text: 'See what survives real memory, battery and thermal constraints.' },
    { icon: '⌁', title: 'Local speech', text: 'Add private ASR without making the cloud mandatory.' },
    { icon: '⬡', title: 'Runtimes & deployment', text: 'Turn individual components into systems that can actually be used.' },
  ],
};

/* ------------------------------------------------------------------ */
/*  Stage 3 — Applications                                             */
/* ------------------------------------------------------------------ */

export const applicationsContent = {
  kicker: '03 — APPLICATIONS',
  title: 'What happens in\na real product?',
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
      href: 'redact-guard',
      logoPath: 'images/redact-guard/logo.png',
      colorClass: 'red',
      linkLabel: 'View project →',
    },
    {
      name: 'Aura',
      description: 'On-device assistant for private use and real workflows.',
      href: 'aura-finance',
      logoPath: 'images/aura/logo.png',
      colorClass: 'purple',
      linkLabel: 'View project →',
    },
    {
      name: 'ClosedRoom',
      description: 'Private meetings and local-first conversation intelligence.',
      href: 'closedroom',
      logoPath: 'images/closedroom/logo.png',
      colorClass: 'blue',
      linkLabel: 'View project →',
    },
  ],
  nextCard: {
    name: 'Your next application',
    description: 'Your idea, built with the same local-first principles.',
    linkLabel: 'Coming soon',
  },
};

/* ------------------------------------------------------------------ */
/*  Stage 4 — Observability & Measurement                              */
/* ------------------------------------------------------------------ */

export const observabilityContent = {
  kicker: '04 — OBSERVABILITY & MEASUREMENT',
  title: 'Does it actually\nwork well?',
  intro: "It runs isn't enough. Local AI has to perform under real hardware and product constraints.",
  items: [
    { icon: '▥', title: 'Is it fast enough?', text: 'Latency and throughput.' },
    { icon: '▧', title: 'Does it fit?', text: 'Memory, CPU/GPU and storage.' },
    { icon: '♨', title: 'Can the device sustain it?', text: 'Thermals and battery.' },
    { icon: '◇', title: 'Is it reliable?', text: 'Errors, requests and runtime behavior.' },
  ],
};

/** Performance Lab metrics */
export const performanceLabMetrics = {
  title: 'Performance Lab',
  /** SVG sparkline points */
  sparkline: '0,54 12,42 23,48 36,36 48,49 61,31 73,37 85,24 97,38 110,30 122,43 136,32 150,40 165,22 180,29',
  stats: [
    { label: 'P95 Latency', value: '62 ms' },
    { label: 'Throughput', value: '12.4K/min' },
    { label: 'Error rate', value: '0.02%', className: 'positive' },
  ],
};

/** Traffic Monitoring metrics */
export const trafficMetrics = {
  title: 'Traffic Monitoring',
  /** Bar heights as CSS percentage values */
  barHeights: ['38%', '53%', '62%', '74%', '88%', '96%'],
  stats: [
    { label: 'Requests', value: '18,542' },
    { label: 'Tokens', value: '2.1M' },
    { label: 'Errors', value: '23 (0.12%)', className: 'negative' },
  ],
};

/** Key Metrics card */
export const keyMetrics = {
  title: 'Key Metrics',
  rows: [
    { label: 'Latency (p95)', value: '62 ms', barClass: 'mini-green' },
    { label: 'Throughput', value: '12.4K/min', barClass: 'mini-blue' },
    { label: 'Error Rate', value: '0.02%', barClass: 'mini-red' },
    { label: 'Success Rate', value: '99.65%', barClass: 'mini-green' },
    { label: 'Tokens / min', value: '1.8M', barClass: 'mini-green' },
  ],
};

/** Resource Usage card */
export const resourceUsage = {
  title: 'Resource Usage',
  donut: [
    { label: 'CPU', value: '34%', colorClass: 'cpu' },
    { label: 'GPU', value: '28%', colorClass: 'gpu' },
    { label: 'RAM', value: '26%', colorClass: 'ram' },
    { label: 'Disk', value: '12%', colorClass: 'disk' },
  ],
  lines: [
    { label: 'RAM', value: '10.8 / 32 GB' },
    { label: 'VRAM', value: '10.1 / 24 GB' },
  ],
};

/* ------------------------------------------------------------------ */
/*  Flow Transitions (between stages)                                  */
/* ------------------------------------------------------------------ */

export const flowTransitions = [
  { icon: '◎', label: 'DECIDE → BUILD', sublabel: 'If it should run locally, make it possible.', direction: 'ltr' as const },
  { icon: '⬡', label: 'BUILD → TEST', sublabel: 'If it runs, put it inside a real product.', direction: 'rtl' as const },
  { icon: '▥', label: 'TEST → MEASURE', sublabel: 'If it works, prove how well.', direction: 'ltr' as const },
];

/* ------------------------------------------------------------------ */
/*  Closing Section                                                    */
/* ------------------------------------------------------------------ */

export const closingContent = {
  left: {
    title: 'Evidence feeds the next decision.',
    text: 'Measure what happened. Learn from the constraints.\nDecide again whether the next workload belongs Local, Hybrid or Cloud.',
  },
  right: {
    title: "Let's build something together.",
    text: "Have a project, idea or question? I'd love to hear from you.",
    primaryCta: {
      label: 'Get in touch',
      href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20conversation',
    },
    secondaryCta: { label: 'View my work', href: '#strategy' },
  },
};

/* ------------------------------------------------------------------ */
/*  Header Navigation                                                  */
/* ------------------------------------------------------------------ */

export const headerNav = {
  brandName: 'Daniele Moltisanti',
  links: [
    { label: 'Work', href: '#strategy' },
    { label: 'Projects', href: '#applications' },
    { label: 'Articles', href: 'insights' },
    { label: 'About', href: 'about' },
  ],
  cta: {
    label: 'Get in touch',
    href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20conversation',
  },
};

/**
 * Aggregated export for convenient single-import usage.
 */
export const roadmapData = {
  hero: heroContent,
  strategy: strategyContent,
  decisionFramework,
  comparisonTable,
  tradeoffGuide,
  architecture: architectureContent,
  applications: applicationsContent,
  observability: observabilityContent,
  performanceLab: performanceLabMetrics,
  traffic: trafficMetrics,
  keyMetrics,
  resourceUsage,
  flowTransitions,
  closing: closingContent,
  headerNav,
};
