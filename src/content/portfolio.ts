/**
 * Canonical public portfolio narrative.
 *
 * Keep this file conservative: every capability/status should be traceable to the
 * linked repository current-state/README. Last verified against repository sources
 * on 2026-09-29.
 */

export const portfolioNarrative = {
  lastVerified: '2026-09-29',
  mission: {
    eyebrow: 'AI SYSTEMS · PRODUCT · EVIDENCE',
    title: 'I build AI systems from problem to evidence.',
    lede:
      'I frame the workload, build the system and product, then measure what works to guide the next decision.',
    specialization:
      'Local and on-device AI are a major area of depth. The broader goal is useful, controllable and measurable AI products.',
  },
  capabilities: [
    {
      label: 'DECIDE',
      title: 'Turn a problem into an architecture.',
      detail: 'Product framing, workload constraints, Local / Hybrid / Cloud boundaries, reliability, cost, governance and failure behavior.',
    },
    {
      label: 'BUILD',
      title: 'Build the systems around the model.',
      detail: 'Inference runtimes, lifecycle, APIs, mobile boundaries, stateful decisions, resource policy and observability.',
    },
    {
      label: 'TEST',
      title: 'Put the system inside a real product.',
      detail: 'End-to-end workflows, UX, integration, privacy boundaries, deterministic rules and explicit human control.',
    },
    {
      label: 'MEASURE',
      title: 'Generate evidence before making claims.',
      detail: 'Capability, quality, reliability, latency, failure analysis, system effectiveness and reproducible comparisons.',
    },
  ],
  systems: [
    {
      id: 'korgis',
      name: 'Korgis',
      href: '/korgis',
      repo: 'https://github.com/daniele21/korgis',
      status: 'Active',
      role: 'Local AI runtime control plane',
      question: 'Can local models become reliable, reusable infrastructure for real applications?',
      summary:
        'One application-facing boundary for local text, vision-language, transcription and image-generation runtimes, with explicit lifecycle, scheduling, resource policy, diagnostics and evidence.',
      proof: [
        'GGUF and MLX backends behind a stable local API',
        'Multi-runtime residency, scheduling and bounded resource policy',
        'Text, VLM, transcription and local image-generation capability paths',
        'Representative Apple Silicon evidence for the accepted tested scope',
      ],
      limits:
        'Support and performance claims remain tied to tested model/backend/hardware identities; new image-generation hardware claims still need representative evidence.',
      soWhat:
        'Applications should not have to own model lifecycle and backend complexity. A reusable runtime boundary lets the product evolve independently from the concrete inference engine.',
      sourceLabel: 'README + docs/current-state.md · verified 2026-09-29',
    },
    {
      id: 'harnex',
      name: 'Harnex',
      href: '/harnex',
      repo: 'https://github.com/daniele21/harnex',
      status: 'Active · pre-stable',
      role: 'Shared Android local-AI control plane',
      question: 'Can multiple Android products safely reuse one governed on-device AI runtime?',
      summary:
        'A shared Android runtime boundary with model installation, authorization, Binder transport, lifecycle, scheduling, cancellation, audit and runtime evidence behind a published Consumer SDK.',
      proof: [
        'Consumer SDK 0.1.0-alpha.11 is published',
        'Cross-app authorization and lifecycle paths are covered by deterministic evidence',
        'A focused physical Play Internal run validates the current pre-release first-party journey',
        'Overview, Playground, Activity, Applications, Performance, Models, Diagnostics and Settings are implemented',
      ],
      limits:
        'Broader representative-device runtime, memory, thermal and distinct-signer Play claims remain explicitly gated.',
      soWhat:
        'On-device AI becomes more useful when runtime ownership is separated from product ownership: apps keep their workflow while one host governs models, policy and lifecycle.',
      sourceLabel: 'README + docs/current-state.md · verified 2026-09-29',
    },
    {
      id: 'decisio',
      name: 'Decisio',
      href: '/decisio',
      repo: 'https://github.com/daniele21/decisio',
      status: 'Active · experimental',
      role: 'Stateful local decision runtime',
      question: 'Can repeated bounded AI decisions reuse stable model context instead of recomputing it every time?',
      summary:
        'Prefill stable decision context once, reuse exact model state across changing application state, apply deterministic constraints first and return typed actions through direct option scoring.',
      proof: [
        'llama.cpp GGUF reference runtime and provenance are implemented',
        'Exact prefix-safe state snapshot/restore and bounded reuse are implemented',
        'Stateful and fresh direct execution have matched exactly in the retained reference evidence',
        'Failed semantic-scorer promotion gates are preserved rather than hidden',
      ],
      limits:
        'The direct-v2 Snake remediation still needs the pinned 2B rerun; answerability and calibration remain planned.',
      soWhat:
        'For bounded repeated decisions, the architecture can optimize the amount of model computation—not only the location where inference runs—while keeping fresh-path equivalence explicit.',
      sourceLabel: 'README + docs/current-state.md · verified 2026-09-29',
    },
  ],
  products: [
    {
      id: 'redactguard',
      name: 'RedactGuard',
      href: '/redact-guard',
      repo: 'https://github.com/daniele21/redact-guard',
      status: 'Active · experimental privacy tool',
      question: 'Can configurable document privacy policy stay local, reviewable and independent from the inference engine?',
      summary:
        'Configurable PII taxonomy → local contextual detection → human review → deterministic redaction → controlled export. Desktop uses Korgis; Android uses Harnex.',
      systemLinks: ['Korgis', 'Harnex'],
      evidenceLink: '/experiments#redactguard-local-anonymization',
      evidenceLabel: 'RedactGuard Local Anonymization',
      soWhat:
        'The product boundary matters as much as the model: privacy policy stays configurable, model findings remain proposals, and deterministic redaction happens only after review.',
      visualPlaceholder:
        'Use a split product visual: configurable PII taxonomy on the left and a synthetic detected custom identifier on the review screen on the right. It should prove configuration → model behavior, not just show a generic dashboard.',
    },
    {
      id: 'aura',
      name: 'Aura Finance',
      href: '/aura-finance',
      repo: 'https://github.com/daniele21/personal-budget/tree/new-features',
      status: 'Active app',
      question: 'Can a useful personal-finance product keep the canonical financial workspace on the device?',
      summary:
        'Android-first local financial workspace with deterministic domain rules, human-reviewed payment candidates, portable data and optional client-side encrypted cloud continuity.',
      systemLinks: ['Android platform boundaries'],
      evidenceLink: '',
      evidenceLabel: '',
      soWhat:
        'AI is not automatically the answer. Aura deliberately keeps financial calculations and the current import workflow deterministic; automation must earn its place without taking ownership away from the user.',
      visualPlaceholder:
        'Use the existing paired Actual / Net mobile screens. If replaced, show one concrete decision before/after rather than a feature collage.',
    },
    {
      id: 'closedroom',
      name: 'ClosedRoom',
      href: '/closedroom',
      repo: 'https://github.com/daniele21/closedroom',
      status: 'Working local-first macOS application',
      question: 'Can meeting intelligence become private operational memory instead of another cloud transcription tool?',
      summary:
        'Record → transcribe → diarize → enrich → analyze → remember. Local ASR, local reasoning and project memory are the default path; cloud providers remain explicit opt-in alternatives.',
      systemLinks: ['Korgis', 'Local ASR'],
      evidenceLink: '',
      evidenceLabel: '',
      soWhat:
        'The useful product is not speech-to-text. The end-to-end system must preserve the meeting first, tolerate enrichment failures, turn transcripts into work and carry knowledge across meetings.',
      visualPlaceholder:
        'Use a Today → Meeting → Project-memory sequence with real synthetic/demo content, showing how one meeting becomes actions, decisions and cross-meeting context.',
    },
  ],
  experiments: {
    href: '/experiments',
    repo: 'https://github.com/daniele21/experiments',
    status: 'Active research/evaluation workspace',
    aggregates: [
      { value: '5', label: 'experiment tracks' },
      { value: '3', label: 'executable / implemented tracks today' },
      { value: '2', label: 'multimodal tracks planned' },
      { value: 'Local + API', label: 'execution boundaries' },
      { value: 'Model + E2E', label: 'evidence levels' },
    ],
    note:
      'Counts describe the current repository structure, not the number of benchmark runs. Numeric model results are published only when the experiment contract allows it.',
    tracks: [
      {
        id: 'jev-vs-llm',
        name: 'Jev vs LLM',
        status: 'In progress',
        question: 'Which architecture works best for this bounded decision workload?',
        method:
          'Compare typed decision systems, decomposed LLM workflows, monolithic baselines, local Korgis models and other bounded-decision providers on quality, calibration, latency, scaling and end-to-end actions.',
        results:
          'The harness supports five distinct experiment families and drill-down from aggregate metrics to exact request-level evidence. TypeSafe/Jev numeric benchmark results remain private unless publication terms permit them.',
        soWhat:
          'The useful comparison is not “which model wins?” but whether the task benefits from a different decision architecture, workflow decomposition or execution boundary.',
        changed:
          'Creates the decision-system evidence base that informs Decisio and the shared benchmark-core abstractions.',
        href: 'https://github.com/daniele21/experiments/tree/main/experiments/jev-vs-llm',
        publishableMetrics: false,
      },
      {
        id: 'model-capability-benchmark',
        name: 'Model Capability Benchmark',
        status: 'Architecture complete · controlled real-provider validation pending',
        question: 'How do local and API models behave on the same reusable capability suites?',
        method:
          'Run one capability × model matrix across shared model/runtime/provider registries, task plugins and dataset adapters, then produce neutral reports without an overall winner score.',
        results:
          'The five-capability suite, generic contracts, shared benchmark core, registry, unified runner and neutral reporting are implemented and CI-covered; controlled real Korgis + API validation is the next evidence step.',
        soWhat:
          'Model choice becomes a workload-specific evidence question. Separating model identity, runtime identity and provider identity makes comparisons reusable instead of coupling benchmarks to one serving path.',
        changed:
          'Turns one-off comparisons into a reusable evaluation substrate for local and API models.',
        href: 'https://github.com/daniele21/experiments/tree/main/experiments/model-capability-benchmark',
        publishableMetrics: true,
      },
      {
        id: 'redactguard-local-anonymization',
        name: 'RedactGuard Local Anonymization',
        status: 'Implemented · evaluation v3',
        question: 'Which local configuration protects sensitive documents effectively, and where do failures actually occur?',
        method:
          'Separate transport, structured-output validity, span resolution, model quality, extraction quality and end-to-end system effectiveness. Run local models through a pinned Korgis / RedactGuard contract.',
        results:
          'The benchmark includes realistic model-only data, document E2E evaluation, repeated latency evidence, failure typing, append-only history and an interactive React dashboard.',
        soWhat:
          'A high model score is not enough for a privacy workflow. Extraction failures, invalid inference and unresolved spans must remain visible in the final system metric instead of disappearing from the denominator.',
        changed:
          'Changed RedactGuard evaluation from a model-only question into an end-to-end privacy-system contract.',
        href: 'https://github.com/daniele21/experiments/tree/main/experiments/redactguard-local-anonymization',
        publishableMetrics: true,
      },
      {
        id: 'vlm-capability-benchmark',
        name: 'VLM Capability Benchmark',
        status: 'Planned',
        question: 'How should local/open and API vision-language models be compared on product-relevant visual tasks?',
        method:
          'Planned shared multimodal benchmark path for documents, charts, visual reasoning, grounding and UI understanding.',
        results: 'No publication-grade result is claimed yet.',
        soWhat:
          'Multimodal evaluation should reuse the same evidence discipline rather than becoming a separate collection of demos.',
        changed: 'Extends the evaluation system toward visual product workloads.',
        href: 'https://github.com/daniele21/experiments/tree/main/experiments/vlm-capability-benchmark',
        publishableMetrics: true,
      },
      {
        id: 'image-generation-benchmark',
        name: 'Image Generation Benchmark',
        status: 'Planned',
        question: 'How do local/open and frontier image models differ on repeatable generation and editing tasks?',
        method:
          'Planned reproducible prompt suites, objective checks where meaningful, blind human evaluation and side-by-side visual reports.',
        results: 'No publication-grade result is claimed yet.',
        soWhat:
          'Visual quality cannot be reduced to one synthetic score; the evaluation contract should combine reproducibility, task-specific checks and blinded human judgment.',
        changed: 'Creates an evidence path for local image-generation work already entering Korgis.',
        href: 'https://github.com/daniele21/experiments/tree/main/experiments/image-generation-benchmark',
        publishableMetrics: true,
      },
    ],
  },
} as const;

export type PortfolioNarrative = typeof portfolioNarrative;
