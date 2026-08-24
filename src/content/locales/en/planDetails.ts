export interface PlanDetailItem {
  index: string;
  title: string;
  text: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
  image?: string;
  imageAlt?: string;
}

export interface PlanDetailData {
  number: 1 | 2 | 3 | 4;
  phase: 'DECIDE' | 'BUILD' | 'TEST' | 'MEASURE';
  eyebrow: string;
  title: string;
  lede: string;
  thesis: string;
  origin: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PlanDetailItem[];
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PlanDetailItem[];
  };
  handoff: {
    eyebrow: string;
    title: string;
    text: string;
    nextHref: string;
    nextLabel: string;
  };
}

export const planLinks = [
  { number: '01', label: 'Strategy', phase: 'DECIDE', href: '/local-ai-strategy' },
  { number: '02', label: 'Architecture', phase: 'BUILD', href: '/local-ai-infrastructure' },
  { number: '03', label: 'Use cases', phase: 'TEST', href: '/local-ai-use-cases' },
  { number: '04', label: 'Performance', phase: 'MEASURE', href: '/local-ai-performance' },
] as const;

export const strategyPlan: PlanDetailData = {
  number: 1,
  phase: 'DECIDE',
  eyebrow: 'PLANE 01 · STRATEGY & DECISION',
  title: 'Start with the workload, not the model.',
  lede:
    'I started from a strategic problem: cloud execution had become the assumed answer before privacy, control, dependency, and operational constraints were made explicit.',
  thesis: 'The cloud is not the problem. Unexamined dependency is.',
  origin: {
    eyebrow: 'WHERE I STARTED · WHY',
    title: 'Turn an architectural default into an explicit decision.',
    paragraphs: [
      'Cloud AI is often the right choice. The risk appears when it is treated as inevitable, because the team can give up control over data boundaries, runtime behavior, model versions, availability, portability, and future provider cost without evaluating that trade-off.',
      '“Local AI first” therefore means asking what can remain inside an environment we control before introducing an external dependency. It does not mean forcing every workload onto local hardware. The valid outcome remains Local, Hybrid, or Cloud.',
    ],
  },
  method: {
    eyebrow: 'THE DECISION RATIONALE',
    title: 'Five questions define the placement brief.',
    intro: 'The model is selected after the workload boundary and acceptable thresholds are understood.',
    items: [
      { index: '01', title: 'Privacy & data boundary', text: 'Which data is sensitive, what may leave the environment, and what is the minimum information that must cross the boundary?' },
      { index: '02', title: 'Control', text: 'How much value comes from owning the model, runtime, configuration, lifecycle, and the path that produced an output?' },
      { index: '03', title: 'Dependency', text: 'What exposure do API changes, pricing, rate limits, deprecations, lock-in, or external availability introduce?' },
      { index: '04', title: 'Operational fit', text: 'What do latency, connectivity, scale, maintenance, support, and failure behavior require in the real operating environment?' },
      { index: '05', title: 'Evidence threshold', text: 'What quality, performance, resource, and reliability thresholds must a controlled execution option meet to earn a role?' },
    ],
  },
  work: {
    eyebrow: 'OUTPUT OF THIS PLANE',
    title: 'A decision brief the engineering planes can execute.',
    intro: 'Strategy is useful only when it produces explicit inputs for architecture and later evaluation.',
    items: [
      {
        index: 'A',
        title: 'Workload placement',
        meta: 'LOCAL · HYBRID · CLOUD',
        text: 'A provisional placement based on the constraints and value of control—not on ideology.',
        image: 'images/strategy/decision-framework.svg',
        imageAlt: 'Decision framework flow: Workload to constraints to Local, Hybrid, or Cloud',
      },
      {
        index: 'B',
        title: 'Architecture requirements',
        meta: 'BOUNDARIES · FAILURE MODES',
        text: 'The trust boundary, runtime ownership, connectivity behavior, and operational constraints the system must support.',
        image: 'images/strategy/local-vs-hybrid-vs-cloud-native-final.svg',
        imageAlt: 'Local vs Hybrid vs Cloud deployment boundary comparison',
      },
      {
        index: 'C',
        title: 'Success thresholds',
        meta: 'QUALITY · LATENCY · RESOURCES',
        text: 'The measurable conditions and trade-off spectrums that determine whether the initial decision survives real products and hardware.',
        image: 'images/strategy/tradeoff-guide.svg',
        imageAlt: 'Trade-off spectrums guide for privacy, control, elasticity, and capability',
      },
    ],
  },
  handoff: {
    eyebrow: '01 DECIDE → 02 BUILD',
    title: 'If Local or Hybrid earns a role, make it technically possible.',
    text: 'The strategy plane produces the brief. Architecture & Infrastructure turns it into reusable execution capabilities instead of one-off demos.',
    nextHref: '/local-ai-infrastructure',
    nextLabel: 'Continue to Architecture & Infrastructure',
  },
};

export const infrastructurePlan: PlanDetailData = {
  number: 2,
  phase: 'BUILD',
  eyebrow: 'PLANE 02 · ARCHITECTURE & INFRASTRUCTURE',
  title: 'Make Local AI usable, reusable, and observable.',
  lede:
    'Once a workload has a reason to run locally, the hard part is no longer loading model weights. It is building dependable boundaries that products can actually consume.',
  thesis: 'A running model is a demo. A managed execution boundary is infrastructure.',
  origin: {
    eyebrow: 'WHAT THIS PLANE RECEIVES',
    title: 'Translate strategy constraints into an execution layer.',
    paragraphs: [
      'The placement brief defines where data should remain, what latency and availability are required, which devices must be supported, and which failure behavior is acceptable. Architecture turns those constraints into runtime ownership, APIs, lifecycle, telemetry, and resource coordination.',
      'My work spans desktop and private servers, Android devices, and local speech. The goal is not one universal runtime. It is a set of reusable boundaries that let different products use controlled compute without rebuilding the foundation every time.',
    ],
  },
  method: {
    eyebrow: 'HOW I AM BUILDING IT',
    title: 'Four engineering concerns make local execution product-ready.',
    intro: 'Each concern exists because a real application needs more than inference output.',
    items: [
      { index: '01', title: 'Stable product boundary', text: 'Expose local inference through explicit APIs and contracts so applications depend on a capability, not a specific backend implementation.' },
      { index: '02', title: 'Model & runtime lifecycle', text: 'Own loading, unloading, configuration, routing, concurrency, streaming, and failure behavior across GGUF, MLX, and device runtimes.' },
      { index: '03', title: 'Device-aware execution', text: 'Treat memory, thermal state, battery, storage, and mobile lifecycle as first-class constraints rather than benchmark footnotes.' },
      { index: '04', title: 'Observable operation', text: 'Capture identity, requests, timing, resource behavior, and uncertainty so later planes can evaluate what actually happened.' },
    ],
  },
  work: {
    eyebrow: 'WHAT I AM WORKING ON',
    title: 'Three infrastructure tracks, one controlled-compute goal.',
    intro: 'Each track tests a different execution environment and maturity boundary.',
    items: [
      { index: '01', title: 'Local LLM Server', meta: 'ACTIVE SYSTEM · DESKTOP / SERVER', text: 'OpenAI-compatible GGUF and MLX inference with model lifecycle, routing, streaming, concurrency, and telemetry.', href: '/local-llm-server', linkLabel: 'Open system deep dive', image: 'images/local-llm-server/overview.png', imageAlt: 'Local LLM Server overview interface' },
      { index: '02', title: 'Android Local LLM Harness', meta: 'ACTIVE PROTOTYPE · ON-DEVICE', text: 'A real-device inference laboratory exploring model ownership, diagnostics, memory and thermal constraints. Cross-application AIDL remains a target, not a finished claim.', href: '/android-local-llm-harness', linkLabel: 'Open Android deep dive', image: 'images/harness/architecture-hero.png', imageAlt: 'Android Local LLM Harness architecture' },
      { index: '03', title: 'Local ASR Server', meta: 'ACTIVE TRACK · SPEECH', text: 'A private speech-to-text primitive for local transcription and audio workflows that should not require a cloud boundary by default.', href: '/local-asr-server', linkLabel: 'Open speech deep dive' },
    ],
  },
  handoff: {
    eyebrow: '02 BUILD → 03 TEST',
    title: 'Infrastructure creates capability. Products reveal value.',
    text: 'The next plane embeds these execution boundaries inside privacy-sensitive workflows and exposes integration friction, usefulness, and failure cases.',
    nextHref: '/local-ai-use-cases',
    nextLabel: 'Continue to real use cases',
  },
};

export const useCasesPlan: PlanDetailData = {
  number: 3,
  phase: 'TEST',
  eyebrow: 'PLANE 03 · APPLICATIONS / USE CASES',
  title: 'Put the infrastructure under real product pressure.',
  lede:
    'Architecture can prove that a capability exists. Only real workflows reveal whether it creates enough value, fits the human process, and survives product constraints.',
  thesis: 'These applications are proving grounds, not unrelated portfolio projects.',
  origin: {
    eyebrow: 'WHAT THIS PLANE RECEIVES',
    title: 'Take reusable execution capabilities outside the lab.',
    paragraphs: [
      'Each use case starts with a concrete question and consumes one or more capabilities from the infrastructure plane. Sensitive documents exercise local text inference; personal finance exercises on-device semantic understanding; meeting intelligence composes recording, speech, local analysis, and project memory.',
      'The point is not to demonstrate that a UI can call a model. It is to observe where local execution changes privacy, control, latency, review, and failure behavior inside an end-to-end user workflow.',
    ],
  },
  method: {
    eyebrow: 'HOW A USE CASE BECOMES A TEST',
    title: 'Question, boundary, workflow, observation.',
    intro: 'The same test structure keeps product evidence connected to the architecture hypothesis.',
    items: [
      { index: '01', title: 'Frame a bounded question', text: 'Define the user outcome and why controlled execution may create value for this specific workflow.' },
      { index: '02', title: 'Declare the trust boundary', text: 'Make explicit what stays local, what may leave, where human review is required, and which fallback is optional.' },
      { index: '03', title: 'Integrate the real workflow', text: 'Exercise data ingestion, inference, review, correction, export, lifecycle, and failure states-not only the happy-path prompt.' },
      { index: '04', title: 'Capture what the product reveals', text: 'Record usefulness, integration friction, quality gaps, resource pressure, and the questions the measurement plane must answer.' },
    ],
  },
  work: {
    eyebrow: 'CURRENT PROVING GROUNDS',
    title: 'Three products test three different local boundaries.',
    intro: 'Each product links back to the infrastructure capability it is putting under pressure.',
    items: [
      { index: '01', title: 'RedactGuard', meta: 'SENSITIVE DOCUMENTS · LOCAL LLM', text: 'Can configurable PII detection, human review, and controlled export reduce exposure of the original document without pretending to be a compliance guarantee?', href: '/redact-guard', linkLabel: 'Explore the document workflow', image: 'images/redact-guard/redactguard-review.jpg', imageAlt: 'RedactGuard human review workflow' },
      { index: '02', title: 'Aura Finance', meta: 'PERSONAL FINANCE · ON-DEVICE', text: 'Can local semantic parsing recognize merchants and propose categories while deterministic logic remains responsible for balances, ledgers, and calculations?', href: '/aura-finance', linkLabel: 'Explore the on-device workflow', image: 'images/aura-finance/aura-payment-detection.png', imageAlt: 'Aura Finance transaction understanding interface' },
      { index: '03', title: 'ClosedRoom', meta: 'MEETINGS · SPEECH + LOCAL AI', text: 'Can recording, ASR, speaker context, analysis, and project memory remain inside the room while external providers stay opt-in?', href: '/closedroom', linkLabel: 'Explore the meeting workflow', image: 'images/closedroom/meeting-analysis.jpg', imageAlt: 'ClosedRoom meeting analysis interface' },
    ],
  },
  handoff: {
    eyebrow: '03 TEST → 04 MEASURE',
    title: 'A useful workflow is not yet performance evidence.',
    text: 'The use cases define the real workload. Performance & Observability measures how that workload behaves on specific models, runtimes, configurations, and devices.',
    nextHref: '/local-ai-performance',
    nextLabel: 'Continue to Performance & Observability',
  },
};

export const performancePlan: PlanDetailData = {
  number: 4,
  phase: 'MEASURE',
  eyebrow: 'PLANE 04 · PERFORMANCE & OBSERVABILITY',
  title: 'The question is not “does it run?” but “how does it run?”',
  lede:
    'A model producing output is only a feasibility signal. The architecture decision depends on quality, latency, throughput, resources, reliability, and observed boundaries under the real use-case workload.',
  thesis: '“It runs” is not the finish line. Measurement explains whether the experience is viable.',
  origin: {
    eyebrow: 'WHAT THIS PLANE RECEIVES',
    title: 'Measure the workload the product actually created.',
    paragraphs: [
      'The use-case plane supplies realistic prompts, data shapes, interaction patterns, session lengths, concurrency, and acceptable quality thresholds. Performance must be evaluated against that identity-not against an unrelated generic benchmark.',
      'The result is deliberately multidimensional. A configuration may be faster but use too much memory, fit the device but miss the quality threshold, or look local while making network calls that weaken the declared boundary.',
    ],
  },
  method: {
    eyebrow: 'WHAT “HOW” MEANS',
    title: 'Keep performance dimensions separate and comparable.',
    intro: 'There is no best model in absolute terms; there is a better configuration for a specific workload and device.',
    items: [
      { index: '01', title: 'Task quality', text: 'Does the output meet the use case’s required correctness, format, coverage, and review burden?' },
      { index: '02', title: 'Latency & TTFT', text: 'How long does the user wait for the first useful signal and for the end-to-end result?' },
      { index: '03', title: 'Throughput', text: 'How much work can the runtime sustain across generation, requests, batches, and concurrent consumers?' },
      { index: '04', title: 'Memory & compute', text: 'What RAM/VRAM, storage, CPU/GPU/NPU, and memory-pressure cost does the configuration impose?' },
      { index: '05', title: 'Thermal & battery', text: 'Can mobile and edge hardware sustain the workload over realistic sessions without unacceptable degradation?' },
      { index: '06', title: 'Reliability & boundaries', text: 'What fails, how often, with which retries, and does observed network behavior match the declared local-first boundary?' },
    ],
  },
  work: {
    eyebrow: 'MEASUREMENT SYSTEMS',
    title: 'Performance evidence plus boundary evidence.',
    intro: 'Metrics remain attached to full execution identity and explicit limitations; decorative benchmark numbers are not evidence.',
    items: [
      { index: '01', title: 'Performance Lab', meta: 'MODEL × RUNTIME × CONFIG × DEVICE', text: 'Compares quality, latency, throughput, resource usage, and reliability for a specific workload and hardware target.', href: '/performance-lab', linkLabel: 'Explore the performance layer' },
      { index: '02', title: 'Traffic Monitoring · macOS', meta: 'OBSERVE · DO NOT INSPECT', text: 'Makes network behavior and evidence coverage discussable without turning observability into payload inspection.', href: '/traffic-monitoring', linkLabel: 'Explore macOS observability', image: 'images/traffic-monitoring/overview.png', imageAlt: 'Traffic Monitoring macOS overview' },
      { index: '03', title: 'Traffic Monitoring · Android', meta: 'DEVICE BOUNDARY EVIDENCE', text: 'Observes application traffic on Android so local-first claims can be checked against device behavior with explicit uncertainty.', href: '/traffic-monitoring-android', linkLabel: 'Explore Android observability', image: 'images/traffic-monitoring-android/overview.png', imageAlt: 'Traffic Monitoring Android overview' },
    ],
  },
  handoff: {
    eyebrow: '04 MEASURE → 01 DECIDE AGAIN',
    title: 'Evidence changes the next architecture decision.',
    text: 'Measured quality, performance, resources, reliability, and boundary behavior return to Strategy. The next answer may remain Local, become Hybrid, or move to Cloud.',
    nextHref: '/local-ai-strategy',
    nextLabel: 'Return to Strategy with evidence',
  },
};
