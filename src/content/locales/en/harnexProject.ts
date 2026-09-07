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
    label: 'APP',
    title: 'Consumer app',
    description: 'Owns the **product workflow, UI state and application data**.',
  },
  {
    label: 'CONTRACT',
    title: 'Consumer SDK + Binder',
    description: 'Owns the **typed contract, transport and caller boundary** between the app and Harnex.',
  },
  {
    label: 'HARNEX',
    title: 'Control plane + runtime',
    description: 'Owns **identity, authorization, model policy, residency, lifecycle, scheduling and inference audit**.',
  },
  {
    label: 'EXECUTION',
    title: 'Backend',
    description: 'Owns local execution. **llama.cpp is the current backend**, not the architecture.',
  },
];

export const harnexRuntimeCapabilities: HarnexRuntimeCapability[] = [
  {
    title: 'Shared runtime',
    description: 'Consumer apps use the **versioned SDK and Binder** instead of embedding the native inference stack themselves.',
  },
  {
    title: 'Android-native trust',
    description: 'Authorization starts from **Binder UID, installed package and signer**, then applies Harnex policy and enabled use cases.',
  },
  {
    title: 'Local inference Activity',
    description: 'Accepted inference can be inspected through a durable, **encrypted local audit trail** without leaking content into normal telemetry.',
  },
  {
    title: 'Control plane',
    description: 'Models, applications, use cases, runtime state, performance, diagnostics and Activity stay visible in **one engineering console**.',
  },
];

export const harnexProductSurfaces = [
  'Overview',
  'Playground',
  'Activity',
  'Applications',
  'Performance',
  'Models',
  'Diagnostics',
  'Settings',
];

export const harnexProjectData: InfrastructureProjectData = {
  meta: {
    title: 'Harnex - Your local AI harness for Android',
    description: 'Harnex is an Android local-AI control plane and shared runtime that lets apps use local LLMs through one governed Consumer SDK and Binder boundary.',
  },

  hero: {
    eyebrow: 'INFRASTRUCTURE · ANDROID LOCAL AI',
    title: 'Harnex',
    lede: 'Your local AI harness for Android. Run and manage local LLMs once, then expose them to Android apps through one controlled boundary.',
    status: 'Active engineering · shared runtime integrated',
    meta: [
      'Android API 26+',
      'Qwen3.5 0.8B / 2B',
      'GGUF + llama.cpp',
      'Consumer SDK + Binder',
      'MIT',
    ],
    actions: [
      { label: 'See how it works ↓', href: '#architecture' },
      { label: 'GitHub ↗', href: 'https://github.com/daniele21/harnex', variant: 'secondary' },
    ],
    visualLabel: 'Harnex system map from Android consumer applications through the shared runtime to local GGUF inference',
    imageHero: 'images/harness/harnex-hero.png',
    imageCaptionLeft: 'Android apps → Consumer SDK → Binder → Harnex',
    imageCaptionRight: 'Runtime → backend → local GGUF',
  },

  proof: {
    statement: 'Apps own the workflow. Harnex owns the models, runtime and lifecycle.',
    detail: 'One shared Android boundary instead of one native inference stack rebuilt inside every app.',
  },

  why: {
    eyebrow: 'WHY HARNEX',
    title: 'One app can embed a model. Harnex makes Local AI reusable across apps.',
    description: 'The goal is not another llama.cpp wrapper. It is a governed Android runtime that keeps product code separate from model, trust and lifecycle concerns.',
    principles: [
      {
        title: 'One governed runtime',
        subtitle: '**Model selection, residency, sessions, generation and cleanup** live in Harnex instead of being reimplemented per app.',
        color: 'blue',
      },
      {
        title: 'Android-native trust',
        subtitle: 'Access is authorized from **caller UID, package and signing identity**, not from what a client claims to be.',
        color: 'teal',
      },
      {
        title: 'Evidence built in',
        subtitle: '**Latency, TTFT, throughput, memory, thermal state and inference Activity** are part of the system, not an afterthought.',
        color: 'violet',
      },
    ],
  },

  problems: {
    eyebrow: 'THE GAP',
    title: 'Running one prompt is easy. Operating Local AI across apps is the hard part.',
    description: 'Without a host layer, every product inherits model files, JNI, lifecycle, memory, cancellation, authorization and diagnostics.',
    items: [
      {
        id: 1,
        title: 'Duplicate runtime infrastructure',
        description: 'Every app otherwise owns the same GGUF, native backend and model-lifecycle plumbing.',
        color: 'blue',
      },
      {
        id: 2,
        title: 'Scatter runtime policy',
        description: 'Model choice, presets, context and authorization become application-specific decisions.',
        color: 'teal',
      },
      {
        id: 3,
        title: 'Repeat lifecycle bugs',
        description: 'Cancellation, process death, Binder loss, memory pressure and cleanup get solved repeatedly in each client.',
        color: 'violet',
      },
    ],
  },

  architecture: {
    eyebrow: 'ARCHITECTURE',
    title: 'One clear ownership boundary.',
    description: 'Consumer app → Consumer Android SDK → Binder → Harnex control plane/runtime → backend-neutral SPI → llama.cpp → local GGUF. Model storage, observability, evaluation and inference Activity stay Harnex-owned around that execution path.',
    diagramImage: 'images/harness/harnex-architecture.png',
    diagramAlt: 'Harnex architecture showing consumer applications, Consumer Android SDK, Binder, Harnex control plane, runtime orchestration, backend, observability and local GGUF models',
  },

  runtime: {
    eyebrow: 'HOW APPS CONNECT',
    title: 'Your app stays focused on the product.',
    description: 'Add the Consumer Android SDK and call Harnex over Binder. The app owns the workflow; Harnex keeps model selection, residency and execution lifecycle behind the boundary.',
    codePreview: {
      language: 'kotlin',
      title: 'Consumer Android SDK',
      code: `implementation("io.github.daniele21.localllm:consumer-android:<version>")

val job = client.submitLogicalGeneration(
    ConsumerLogicalJobSubmitRequest(
        clientRequestId = ConsumerLogicalJobRequestId("analysis-42"),
        useCaseId = prepared.useCaseId,
        preparedId = prepared.preparedId,
        expectedExecution = prepared.toExecutionIdentity(),
        input = ConsumerGenerationInput.Text(input),
    ),
)`,
    },
    surfacesImage: 'images/harness/harnex-control-plane.png',
    surfacesAlt: 'Harnex Local AI Console showing App connections, local Playground, Activity and GGUF model management',
    surfacesCaption: 'Real Harnex surfaces · apps, local inference, Activity and models',
  },

  evidence: {
    eyebrow: 'EVIDENCE',
    title: 'What is proven now and what is still being validated.',
    description: 'The shared runtime and cross-app boundary are real. Physical-device and release evidence remain separate gates for stronger production claims.',
    note: {
      title: 'Keep implementation and release evidence separate.',
      body: 'Harnex already has meaningful cross-application evidence. The remaining gap is representative real-device and release validation, not the core architecture.',
      evidenced: [
        'Shared runtime + Consumer Android SDK/Binder boundary integrated',
        'API 35 cross-application lifecycle, fault and serialization matrix green',
        'Independent-signer consumer path supported with Harnex-owned UID/package/signer authorization',
        'Encrypted local inference Activity with verified caller attribution and restart-safe history implemented',
        'Consumer Android SDK 0.1.0-alpha.11 published from the validated baseline',
      ],
      missing: [
        'Actual Play App Signing identity confirmation',
        'Representative physical ARM64/JNI/GGUF execution evidence',
        'Physical memory and thermal envelope across target devices',
        'OEM/device coverage and selected real-environment release gates',
      ],
    },
  },

  status: {
    eyebrow: 'STATUS',
    title: 'Working Android infrastructure. Real-device release validation is still in progress.',
    description: 'The shared runtime, SDK, control plane and cross-app trust boundary are implemented. The next confidence step is representative hardware and release evidence.',
    decision: {
      title: 'Architecture stable. Evidence hardening next.',
      body: 'Keep the host/Consumer boundary stable and close the remaining physical-device, Play identity, OEM and selected release gates.',
      signals: [
        'Shared runtime + cross-app boundary implemented',
        'Independent-signer path already exercised',
        'Physical-device and release evidence still being expanded',
      ],
    },
  },

  relations: [
    {
      stage: 'BUILD · INFRASTRUCTURE',
      title: 'Harnex',
      current: true,
      note: 'Shared Android Local AI host, control plane and runtime boundary',
    },
    {
      stage: 'TEST · CONSUMER',
      title: 'RedactGuard',
      href: '/redact-guard',
      note: 'Consumer SDK client proving the cross-application boundary',
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
    title: 'Explore the runtime, contracts and evidence.',
    description: 'Harnex is the Android infrastructure experiment behind a simple question: can Local AI become a shared capability instead of a native stack rebuilt inside every app?',
    primaryAction: {
      label: 'Explore on GitHub ↗',
      href: 'https://github.com/daniele21/harnex',
    },
    secondaryAction: {
      label: 'Back to portfolio',
      href: '/',
    },
  },
};
