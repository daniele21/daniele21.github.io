import type { InfrastructureProjectData } from '../../../types/projectInfrastructure';

export interface HarnexArchitectureLayer {
  label: string;
  title: string;
  description: string;
}

export interface HarnexRuntimeCapability {
  title: string;
  description: string;
}

export const harnexArchitectureLayers: HarnexArchitectureLayer[] = [
  {
    label: 'PRODUCT',
    title: 'Consumer Android app',
    description: 'Owns the user workflow, product state and any sensitive input that should remain application-scoped.',
  },
  {
    label: 'BOUNDARY',
    title: 'Consumer SDK + Binder',
    description: 'Provides a versioned, typed Android boundary without exposing Harnex model-store, runtime or llama.cpp internals.',
  },
  {
    label: 'HOST',
    title: 'Harnex control plane',
    description: 'Authenticates consumers and resolves applications, use cases, presets, model identity and execution policy.',
  },
  {
    label: 'RUNTIME',
    title: 'Runtime orchestration',
    description: 'Owns scheduling, sessions, cancellation, durable logical-job state, memory pressure and model residency.',
  },
  {
    label: 'NATIVE',
    title: 'llama.cpp + GGUF',
    description: 'Keeps native handles and curated local model execution behind one host-owned backend boundary.',
  },
];

export const harnexRuntimeCapabilities: HarnexRuntimeCapability[] = [
  {
    title: 'Shared runtime',
    description: 'Authorized Android apps use the Consumer SDK and Binder instead of embedding the native inference stack themselves.',
  },
  {
    title: 'Explicit policy',
    description: 'Application, use-case, preset and execution identity are host-controlled. Harnex does not silently substitute models.',
  },
  {
    title: 'Durable jobs',
    description: 'Long-running work can keep a stable logical job identity across transient Binder or UI observation loss.',
  },
  {
    title: 'Operational evidence',
    description: 'Latency, throughput, memory, thermal state, health, logs and request timelines are observable without normal prompt/output telemetry.',
  },
];

export const harnexProductSurfaces = [
  'Overview',
  'Playground',
  'Applications',
  'Performance',
  'Models',
  'Diagnostics',
  'Settings',
];

export const harnexProjectData: InfrastructureProjectData = {
  meta: {
    title: 'Harnex - Your local AI harness for Android',
    description: 'Harnex is a shared Android Local AI host and engineering control plane that owns models, runtime policy, lifecycle and evidence behind a versioned Consumer SDK and Binder boundary.',
  },

  hero: {
    eyebrow: 'INFRASTRUCTURE · ANDROID LOCAL AI',
    title: 'Harnex',
    lede: 'Your local AI harness for Android. Run and manage local LLMs once, then expose them to Android apps through one controlled boundary while Harnex owns models, runtime policy, lifecycle and evidence.',
    status: 'Active engineering · shared runtime integrated',
    meta: [
      'Android API 26+',
      'Qwen3.5 0.8B / 2B',
      'GGUF + llama.cpp',
      'Consumer SDK + Binder',
      'MIT',
    ],
    actions: [
      { label: 'Explore architecture ↓', href: '#architecture' },
      { label: 'GitHub ↗', href: 'https://github.com/daniele21/android-local-llm-harness', variant: 'secondary' },
    ],
    visualLabel: 'Harnex system map from Android consumer applications through the shared runtime to local GGUF inference',
    imageHero: '',
    imageCaptionLeft: 'Planned visual · Android apps → Consumer SDK → Binder → Harnex Host',
    imageCaptionRight: 'llama.cpp · curated GGUF',
  },

  proof: {
    statement: 'Local AI becomes reusable Android infrastructure when applications depend on a stable consumer boundary instead of owning GGUF, JNI, model lifecycle and memory policy themselves.',
    detail: 'Harnex already implements the shared runtime and Consumer SDK boundary; stronger production claims still depend on representative-device and lifecycle evidence.',
  },

  why: {
    eyebrow: 'WHY IT EXISTS',
    title: 'A local model inside one app is a feature. A shared runtime is infrastructure.',
    description: 'If every Android app owns model files, native bindings, lifecycle, memory policy and diagnostics, Local AI scales by duplication. Harnex moves those concerns behind one Android-owned host boundary.',
    principles: [
      {
        title: 'One owner for expensive state',
        subtitle: 'The host owns model bytes, native runtime state, residency and scheduling instead of duplicating them across products.',
        color: 'blue',
      },
      {
        title: 'Small consumer boundary',
        subtitle: 'Applications keep their workflow and integrate through a typed SDK/Binder contract rather than inheriting runtime internals.',
        color: 'teal',
      },
      {
        title: 'Evidence before platform claims',
        subtitle: 'Automated and emulator evidence proves contracts; physical Android evidence remains a separate release boundary.',
        color: 'violet',
      },
    ],
  },

  problems: {
    eyebrow: 'THE INFRASTRUCTURE GAP',
    title: 'Without a host layer, every app rebuilds the hard parts.',
    description: 'The difficult work begins after the first successful generation: ownership, policy, lifecycle and failure semantics all need one authoritative place.',
    items: [
      {
        id: 1,
        title: 'Duplicate the native stack',
        description: 'Each product otherwise carries GGUF handling, JNI, backend packaging and model lifecycle as application-specific infrastructure.',
        color: 'blue',
      },
      {
        id: 2,
        title: 'Couple product code to runtime policy',
        description: 'Model choice, presets, context, residency and authorization become scattered product decisions instead of explicit host policy.',
        color: 'teal',
      },
      {
        id: 3,
        title: 'Turn lifecycle failures into app bugs',
        description: 'Cancellation, Binder loss, process death, memory pressure and cleanup need durable semantics rather than ad-hoc recovery in every client.',
        color: 'violet',
      },
    ],
  },

  architecture: {
    eyebrow: 'ARCHITECTURE',
    title: 'One host boundary separates Android products from local inference infrastructure.',
    description: 'The execution path is Consumer app → Consumer Android SDK → signature-protected Binder → Harnex host/control plane → runtime orchestration → llama.cpp → curated GGUF. Model storage, observability and evaluation stay host-owned around that data plane.',
    diagramAlt: 'Harnex architecture showing consumer applications, Consumer Android SDK, Binder, host control plane, runtime orchestration, observability, llama.cpp and GGUF models',
  },

  runtime: {
    eyebrow: 'RUNTIME & API',
    title: 'Consumer apps call a versioned SDK. Harnex keeps runtime ownership.',
    description: 'The supported direct dependency is the Consumer Android SDK. It owns public consumer contracts, Binder composition, typed transport failures, readiness inspection and durable logical jobs without exposing model-store or llama.cpp implementation types.',
    codePreview: {
      language: 'kotlin',
      title: 'Consumer boundary · simplified',
      code: `implementation("io.github.daniele21.localllm:consumer-android:<version>")

// Harnex resolves an allowed use case and exact execution identity.
val prepared = consumer.prepare(/* host-approved use case */)

// Durable work keeps one logical identity across transient Binder/UI loss.
val job = consumer.submitLogicalGeneration(
    /* prepared identity + application-owned input */
)`,
    },
  },

  evidence: {
    eyebrow: 'EVIDENCE & LIMITS',
    title: 'The shared runtime is implemented. Production readiness is not claimed.',
    description: 'The current development line proves the architecture, Consumer boundary and host behavior in code and automated integration. Representative Android hardware remains the boundary for stronger performance, memory, thermal and release claims.',
    note: {
      title: 'Implemented capability and release evidence are different things.',
      body: 'Harnex is an active engineering baseline. Automated and emulator evidence can prove contracts, failure semantics and cross-application integration, but it is not promoted into physical-device or production evidence.',
      evidenced: [
        'Consumer Android SDK and Binder shared-runtime boundary are integrated',
        'Curated Qwen3.5 dense 0.8B / 2B model lifecycle and verified GGUF execution are implemented',
        'Generation, streaming, cancellation, single-decode scheduling, memory-pressure handling and durable logical jobs are implemented',
        'Host applications/use cases/presets/bindings plus Overview, Playground, Applications, Performance, Models, Diagnostics and Settings are integrated',
        'Privacy-safe telemetry, health, performance and evaluation foundations are present',
      ],
      missing: [
        'Representative physical-device Qwen3.5 tuning plus memory and thermal evidence',
        'Final physical two-APK shared-runtime and release gates',
        'Remaining cross-process lifecycle convergence before stronger reliability claims',
      ],
    },
  },

  status: {
    eyebrow: 'STATUS & NEXT DECISION',
    title: 'The next work is evidence hardening, not another architecture rewrite.',
    description: 'Keep the shared host/Consumer boundary stable and close the physical-device and lifecycle gates that determine whether it deserves stronger platform-level claims.',
    decision: {
      title: 'Treat Harnex as working infrastructure under validation, not as a production Android AI platform yet.',
      body: 'The shared runtime, SDK, control plane and local inference stack exist. The next confidence step comes from representative Android hardware and end-to-end process/lifecycle evidence rather than adding more abstraction.',
      signals: [
        'Shared runtime + Consumer SDK already integrated',
        'Physical memory, thermal and model-tuning evidence still required',
        'Cross-process lifecycle and two-APK release evidence still being closed',
      ],
    },
  },

  relations: [
    {
      stage: 'BUILD · INFRASTRUCTURE',
      title: 'Harnex',
      current: true,
      note: 'Shared Android Local AI host, model plane and runtime boundary',
    },
    {
      stage: 'TEST · CONSUMER',
      title: 'RedactGuard',
      href: '/redact-guard',
      note: 'Pure Consumer SDK client proving the cross-application boundary',
    },
    {
      stage: 'MEASURE · EVIDENCE',
      title: 'Performance Lab',
      href: '/performance-lab',
      note: 'Model, runtime and hardware viability evidence',
    },
  ],

  cta: {
    badge: 'OPEN SOURCE · MIT',
    title: 'Explore Harnex as Android Local AI infrastructure.',
    description: 'Read the code, architecture and evidence if you are evaluating whether on-device inference should live once behind a controlled host instead of once inside every app.',
    primaryAction: {
      label: 'Explore on GitHub ↗',
      href: 'https://github.com/daniele21/android-local-llm-harness',
    },
    secondaryAction: {
      label: 'Back to portfolio',
      href: '/',
    },
  },
};
