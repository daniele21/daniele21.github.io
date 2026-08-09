/**
 * harness.ts
 * Exact content data configuration matching harness-landing-prototype (3).html.
 */

export interface HarnessProblem {
  id: number;
  title: string;
  description: string;
}

export interface HarnessPrinciple {
  title: string;
  subtitle: string;
  color: 'blue' | 'teal' | 'violet';
}

export interface HarnessSurface {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface HarnessValue {
  title: string;
  description: string;
}

export interface HarnessRoadmapPhase {
  phase: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface HarnessMaturityCard {
  title: string;
  type: 'good' | 'wait';
  items: string[];
}

export interface HarnessData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    keyPills: string[];
    badges: string[];
    imageHero: string;
    imageNoteLeft: string;
    imageNoteRight: string;
  };
  mission: {
    eyebrow: string;
    statement: string;
    lede: string;
    principles: HarnessPrinciple[];
  };
  problems: {
    eyebrow: string;
    title: string;
    sub: string;
    items: HarnessProblem[];
  };
  concept: {
    eyebrow: string;
    title: string;
    lede: string;
    items: Array<{ n: string; title: string; desc: string }>;
  };
  surfaces: {
    eyebrow: string;
    title: string;
    sub: string;
    items: HarnessSurface[];
    securityNotice: string;
  };
  architecture: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: Array<{ label: string; detail: string }>;
    imageDetail: string;
  };
  values: {
    eyebrow: string;
    title: string;
    sub: string;
    items: HarnessValue[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    sub: string;
    phases: HarnessRoadmapPhase[];
  };
  code: {
    eyebrow: string;
    title: string;
    sub: string;
    snippet: string;
  };
  maturity: {
    eyebrow: string;
    title: string;
    sub: string;
    cards: HarnessMaturityCard[];
  };
  cta: {
    badge: string;
    title: string;
    sub: string;
  };
}

export const harnessData: HarnessData = {
  meta: {
    title: "Harness, Local AI Gateway for Android",
    description: "Harness is a local-first Android AI infrastructure project: one gateway, shared model and runtime foundations, measurable on-device inference.",
  },
  hero: {
    eyebrow: "From AI strategy to reusable infrastructure",
    titleLine1: "Build local AI once.",
    titleLine2: "Reuse it across Android.",
    lede: "Harness is a **Local AI Gateway for Android**: one foundation for **GGUF models**, **on-device inference**, **runtime lifecycle** and **diagnostics**.",
    keyPills: [
      "Local-first execution",
      "Explicit model identity",
      "Measured performance",
    ],
    badges: ["Android API 26+", "GGUF", "llama.cpp", "Kotlin + JNI/C++", "MIT"],
    imageHero: "images/harness/architecture-hero.png",
    imageNoteLeft: "Core Gateway Pattern: App → IPC → Gateway → Engine",
    imageNoteRight: "GGUF / llama.cpp",
  },
  mission: {
    eyebrow: "Project Mission",
    statement: "Make local AI on Android explicit, measurable and reusable.",
    lede: "Running LLMs on-device shouldn't mean re-implementing model loading, memory limits, and runtime bindings in every single app. Harness abstracts on-device inference into an explicit system service.",
    principles: [
      { title: "Explicit", subtitle: "No opaque black boxes", color: "blue" },
      { title: "Measurable", subtitle: "Tokens/sec & RAM tracking", color: "teal" },
      { title: "Reusable", subtitle: "One gateway for N apps", color: "violet" },
    ],
  },
  problems: {
    eyebrow: "The Challenge",
    title: "Why on-device AI needs a Gateway layer",
    sub: "Building local LLM features on mobile today comes with structural friction that impedes product reliability.",
    items: [
      {
        id: 1,
        title: "Duplicated Engine Setup",
        description: "Every app bundles its own runtime binaries, inflating APK size and multiplying maintenance overhead.",
      },
      {
        id: 2,
        title: "Uncontrolled Memory Spikes",
        description: "On-device LLMs consume gigabytes of RAM. Without centralized management, apps crash silently under OOM conditions.",
      },
      {
        id: 3,
        title: "No Standard IPC Protocol",
        description: "Integrating local AI into existing background services or third-party apps requires custom ad-hoc protocols.",
      },
      {
        id: 4,
        title: "Opaque Performance Metrics",
        description: "Measuring prompt evaluation speed, generation latency, and thermal throttling requires dedicated telemetry.",
      },
    ],
  },
  concept: {
    eyebrow: "Concept",
    title: "Think of Harness as the local AI layer of an Android device.",
    lede: "Just as Android provides system services for location, camera, or network, Harness provides a system gateway for local LLM execution.",
    items: [
      {
        n: "01",
        title: "Unified Model Repository",
        desc: "Store and manage GGUF quantized models in a centralized device location shared across applications.",
      },
      {
        n: "02",
        title: "High-Performance C++ Runtime",
        desc: "Direct bindings to llama.cpp via JNI with hardware acceleration for ARM NEON and Vulkan GPU execution.",
      },
      {
        n: "03",
        title: "Standardized AIDL & IPC",
        desc: "Expose thread-safe Android Binder interfaces so any app can stream tokens without runtime lock-in.",
      },
    ],
  },
  surfaces: {
    eyebrow: "Connected console",
    title: "Five product surfaces. One inference foundation.",
    sub: "Harness connects runtime controls, model management, interactive testing, diagnostics and system settings into a unified mobile console.",
    items: [
      {
        id: "overview",
        title: "Overview",
        description: "Runtime readiness, device resources and next valid action.",
        image: "images/harness/harness-overview.png",
      },
      {
        id: "playground",
        title: "Playground",
        description: "Prompt, configure, stream and cancel inference locally.",
        image: "images/harness/harness-playground.png",
      },
      {
        id: "models",
        title: "Models",
        description: "Import, download, verify, select and remove GGUF artifacts.",
        image: "images/harness/harness-models.png",
      },
      {
        id: "diagnostics",
        title: "Diagnostics",
        description: "Runs, health, resources, logs and benchmarks.",
        image: "images/harness/harness-diagnostics.png",
      },
      {
        id: "settings",
        title: "Settings",
        description: "Privacy, storage, build information and developer controls.",
        image: "images/harness/harness-settings.png",
      },
    ],
    securityNotice: "Current boundary: the runtime is still embedded and in-process inside Harness. Other Android apps cannot connect to a shared Binder/AIDL service yet. The gateway is the target architecture, not a current capability.",
  },
  architecture: {
    eyebrow: "Under the hood",
    title: "Start simple. Then go technical.",
    sub: "The architecture is intentionally layered so the product surface, runtime contracts, model plane, native backend and observability can evolve without leaking implementation details into every client.",
    steps: [
      { label: "Android app", detail: "product / client" },
      { label: "LocalLlmClient", detail: "public boundary" },
      { label: "RuntimeOrchestrator", detail: "lifecycle + scheduling" },
      { label: "Model resolution", detail: "app + use case" },
      { label: "Model store", detail: "verified GGUF" },
      { label: "InferenceBackend", detail: "replaceable backend" },
      { label: "llama.cpp", detail: "JNI / C++17" },
    ],
    imageDetail: "images/harness/architecture-detail.png",
  },
  values: {
    eyebrow: "Design values",
    title: "Infrastructure designed for decisions, not demos.",
    sub: "The product is organized around the qualities that make local AI useful after the first successful generation.",
    items: [
      {
        title: "Local-first control",
        description: "Inference runs on-device and normal telemetry excludes prompts and generated output.",
      },
      {
        title: "Reuse instead of duplication",
        description: "The gateway vision centralizes model storage and resource ownership so multiple authorized apps can reuse infrastructure.",
      },
      {
        title: "Evaluation before confidence",
        description: "Latency, throughput, memory, thermal state, health and benchmarks make model choices inspectable.",
      },
      {
        title: "Guardrails that enable delivery",
        description: "Bindings, integrity, cancellation, failures and cleanup are explicit rather than hidden runtime assumptions.",
      },
      {
        title: "Open, replaceable boundaries",
        description: "Product contracts stay independent from llama.cpp internals, Android UI and transport details.",
      },
      {
        title: "Shared operational visibility",
        description: "The target gateway adds one privacy-conscious control plane across local AI applications.",
      },
    ],
  },
  roadmap: {
    eyebrow: "Strategy",
    title: "From console to gateway.",
    sub: "The sequence deliberately proves difficult runtime and model-management foundations before introducing cross-application IPC and shared ownership.",
    phases: [
      {
        phase: "1 · Local AI Console",
        title: "Prove the data plane",
        description: "Distribution, storage, inference, cancellation, cleanup, diagnostics and real-device behavior.",
      },
      {
        phase: "2 · Stable client boundary",
        title: "Stabilize the contract",
        description: "Keep explicit application/use-case identity and backend-neutral domain contracts.",
        active: true,
      },
      {
        phase: "3 · Local AI Gateway",
        title: "Move ownership",
        description: "Protected Binder/AIDL transport plus a lightweight Android client integration.",
      },
      {
        phase: "4 · Multi-app platform",
        title: "Unlock shared value",
        description: "Shared models, RAM coordination, scheduling, health and monitoring across authorized apps.",
      },
    ],
  },
  code: {
    eyebrow: "Developer boundary",
    title: "Client code stays small on purpose.",
    sub: "Applications depend on a neutral client and explicit identifiers rather than calling JNI directly. The target gateway keeps this interaction while moving backend ownership behind the host service.",
    snippet: `val prepared = client.prepare(applicationId, useCaseId)
check(prepared.ready)

val sessionId = client.createSession(applicationId, useCaseId)
val handle = client.generate(
    request = generationRequest(sessionId, applicationId, useCaseId),
    listener = generationListener,
)

handle.cancel()`,
  },
  maturity: {
    eyebrow: "Evidence & maturity",
    title: "Useful today. Still an engineering and validation project.",
    sub: "Harness should not be presented as a production-ready Android inference platform yet. The current value is a connected console and tested foundation that de-risks the final gateway architecture.",
    cards: [
      {
        title: "Integrated today",
        type: "good",
        items: [
          "Embedded GGUF inference path",
          "Streaming and cancellation",
          "Model import, verification and lifecycle",
          "Connected console surfaces",
          "Telemetry, health, resources and benchmarks",
        ],
      },
      {
        title: "Still blocking production claims",
        type: "wait",
        items: [
          "Representative physical-device GGUF evidence",
          "Memory and thermal validation on target devices",
          "Packaging and production-readiness evidence",
          "Cross-application Binder/AIDL host is still future work",
        ],
      },
    ],
  },
  cta: {
    badge: "Open-source · MIT",
    title: "Make local AI explicit, measurable and reusable on Android.",
    sub: "Harness is part of a broader mission: move beyond isolated AI experiments and build product infrastructure that can be understood, evaluated and scaled deliberately.",
  },
};
