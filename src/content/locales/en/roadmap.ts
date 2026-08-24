/**
 * roadmap.ts -Content data for the Local AI Roadmap landing page.
 *
 * All copy, labels and structured data aligned with:
 * - 08 -Local AI Strategy, Positioning & Storytelling
 * - 09 -Local AI Landing Page -Narrative, UX & Copy
 */

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export const heroContent = {
  eyebrow: "WHAT I'M EXPLORING",
  title: 'Run AI where it makes sense.',
  titleHighlight: 'Local AI first ≠ Local AI only',
  challenge: 'How far can AI move from the cloud to systems we control?',
  principle:
    'Some workloads benefit from staying local: sensitive data stays closer, dependencies shrink, and you gain more control over how the system runs. Others still belong in the cloud.',
  position: 'Find the boundary with evidence, not ideology.',
  proof:
    'I do that by deciding where AI should run, building the infrastructure that makes local execution possible, testing it inside real products, and measuring how well it actually performs.',
  primaryCta: { label: 'Explore the work', href: '#strategy' },
  secondaryCta: { label: 'Read my thinking', href: 'insights' },
};

/* ------------------------------------------------------------------ */
/*  Stage 1 -Strategy                                                 */
/* ------------------------------------------------------------------ */

export const strategyContent = {
  kicker: '01 -STRATEGY',
  title: 'Where should AI actually run?',
  intro:
    'Before choosing models or runtimes, start with the workload. What do we gain by keeping data and execution under our control, and what do we give up?',
  items: [
    {
      icon: '◇',
      title: 'Privacy',
      text: 'Does sensitive data need to leave the environment?',
    },
    {
      icon: '▣',
      title: 'Control',
      text: 'Do we need ownership of models, runtimes, configuration and execution path?',
    },
    {
      icon: '↗',
      title: 'Dependency',
      text: 'How exposed are we to vendors, API changes, pricing and external availability?',
    },
    {
      icon: '⌕',
      title: 'Operational fit',
      text: 'What do latency, connectivity, reliability and scale actually require?',
    },
  ],
  keyMessage: 'Local is one option. Hybrid and Cloud remain part of the decision.',
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
    { label: 'Privacy', values: ['✓', '✓', '–'], classes: ['good', 'good', ''] },
    { label: 'Control', values: ['✓', '✓', '×'], classes: ['good', 'good', 'bad'] },
    { label: 'Cost', values: ['$', '$$', '$$$'], classes: ['good', 'warn', 'bad'] },
    { label: 'Latency', values: ['✓', '✓', '×'], classes: ['good', 'good', 'bad'] },
    { label: 'Reliability', values: ['✓', '✓', '×'], classes: ['good', 'good', 'bad'] },
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
/*  Stage 2 -Architecture & Infrastructure                            */
/* ------------------------------------------------------------------ */

export const architectureContent = {
  kicker: '02 -ARCHITECTURE & INFRASTRUCTURE',
  title: 'Can we actually run it locally?',
  intro:
    'This is where the strategy becomes engineering. I build the infrastructure needed to make local execution reusable, observable and manageable across very different environments.',
  proofLine: 'Different environments. Same question: what can realistically stay local?',
  /** Path relative to public/ -resolved at component level */
  ecosystemImage: 'images/ecosystem.png',
  ecosystemAlt: 'Connected Local AI stack across desktop, Android, local server and cloud',
  items: [
    {
      icon: '▱',
      title: 'Local infrastructure',
      text: 'Models, inference servers, lifecycle and stable API boundaries on desktop/workstation/private server.',
    },
    {
      icon: '▯',
      title: 'On-device',
      text: 'Real LLM inference under memory, thermal, battery and mobile lifecycle constraints.',
    },
    {
      icon: '⌁',
      title: 'Local speech',
      text: 'Private ASR as another reusable primitive for local workflows.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Stage 3 -Applications                                             */
/* ------------------------------------------------------------------ */

export const applicationsContent = {
  kicker: '03 -APPLICATIONS',
  title: 'What happens in a real product?',
  intro:
    'A runtime or benchmark cannot expose every product constraint. Real workflows can. I use applications as proving grounds for the infrastructure and architecture I build.',
  note: 'Each application is a test bed.',
  questions: [
    'Can sensitive document processing stay local?',
    'Can personal financial transactions be understood and categorized without leaving the device?',
    'Can meeting intelligence stay inside the room?',
  ],
  cards: [
    {
      name: 'RedactGuard',
      description: 'Local LLM inference for sensitive documents -configurable PII detection, human review and controlled export.',
      href: 'redact-guard',
      logoPath: 'images/redact-guard/logo.png',
      colorClass: 'red',
      linkLabel: 'View project →',
    },
    {
      name: 'Aura Finance',
      description: 'On-device transaction intelligence -merchant recognition, categorization and human review without sending personal data externally.',
      href: 'aura-finance',
      logoPath: 'images/aura/logo.png',
      colorClass: 'purple',
      linkLabel: 'View project →',
    },
    {
      name: 'ClosedRoom',
      description: 'Local recording, ASR, speaker context, analysis and project memory -external providers opt-in, not default.',
      href: 'closedroom',
      logoPath: 'images/closedroom/logo.png',
      colorClass: 'blue',
      linkLabel: 'View project →',
    },
  ],
  nextCard: {
    name: 'Your next application',
    description: 'Your idea, tested with the same local-first evidence method.',
    linkLabel: 'Coming soon',
  },
  closingMessage: 'The value of this layer is turning architecture capability into product evidence.',
};

/* ------------------------------------------------------------------ */
/*  Stage 4 -Observability & Measurement                              */
/* ------------------------------------------------------------------ */

export const observabilityContent = {
  kicker: '04 -OBSERVABILITY & MEASUREMENT',
  title: 'Does it actually work well?',
  intro:
    "'It runs' is a very low bar. Local AI has to perform under real hardware and product constraints.",
  items: [
    { icon: '▥', title: 'Is it fast enough?', text: 'Latency, time to first token and throughput.' },
    { icon: '▧', title: 'Does it fit?', text: 'RAM/VRAM, CPU/GPU, storage and model footprint.' },
    { icon: '♨', title: 'Can the device sustain it?', text: 'Thermals, battery and long-running behavior.' },
    { icon: '◇', title: 'Is it reliable?', text: 'Errors, retries, request completion and runtime health.' },
    { icon: '◎', title: 'Is the claim observable?', text: 'Network behavior, evidence coverage and uncertainty.' },
  ],
  closingMessage:
    'Working ≠ performing well. Performing well ≠ production ready. Evidence is what allows the next architecture decision.',
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
  {
    icon: '◎',
    label: 'DECIDE → BUILD',
    sublabel: 'If Local AI makes sense for the workload, the next question is whether we can actually make it work.',
    direction: 'ltr' as const,
  },
  {
    icon: '⬡',
    label: 'BUILD → TEST',
    sublabel: 'Infrastructure proves what can run. A real product reveals whether the architecture is actually useful.',
    direction: 'rtl' as const,
  },
  {
    icon: '▥',
    label: 'TEST → MEASURE',
    sublabel: 'A product running locally is not proof that Local AI works well. If it works, measure it.',
    direction: 'ltr' as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Closing Section                                                    */
/* ------------------------------------------------------------------ */

export const closingContent = {
  left: {
    title: 'Evidence changes the next decision.',
    text: 'What I learn from real hardware, real products and measured behavior feeds back into the next architecture choice.',
    payoff: "That's what Local AI first ≠ Local AI only means in practice.",
  },
  right: {
    title: 'Facing the same decisions?',
    text: 'I also work with teams deciding what should run Local, Hybrid or Cloud.',
    primaryCta: {
      label: 'Discuss an AI architecture',
      href: 'mailto:danielemoltisanti@gmail.com?subject=AI%20Architecture%20conversation',
    },
    secondaryCta: {
      label: 'Discuss your workload →',
      href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20workload',
    },
  },
  loopSequence: 'DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN',
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
