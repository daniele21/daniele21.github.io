import type { RedactGuardData } from './redactGuard';

/**
 * RedactGuard Android keeps the same product journey as the desktop variant,
 * but moves local AI execution behind the Harnex Android boundary.
 */
export const redactGuardAndroidData: RedactGuardData = {
  meta: {
    title: "RedactGuard Android, On-device document redaction through Harnex",
    description: "Privacy-first Android document redaction with local PII detection through Harnex, human review and deterministic export.",
  },
  hero: {
    eyebrow: "Android · Powered by Harnex",
    titleLine1: "Protect sensitive documents.",
    titleLine2: "Directly on Android.",
    lede: "**RedactGuard Android** owns the document workflow and privacy decisions while **Harnex** owns models, runtime lifecycle and on-device inference. The original content does not need a silent cloud fallback to be useful.",
    pills: ["Android app", "Harnex backbone", "Fail-closed"],
    imageHero: "images/redact-guard-android/redactguard-android-review.svg",
    imageCaptionLeft: "Import → detect → review → redact",
    imageCaptionRight: "Android · Harnex",
  },
  problem: {
    kicker: "The mobile problem",
    title: "Privacy-sensitive AI is harder when the runtime lives inside the app.",
    lede: "A useful Android product has to manage **documents, lifecycle, resource pressure and user recovery** without turning every consumer app into an LLM runtime project.",
    items: [
      {
        id: "01",
        title: "Sensitive files should not need cloud detours",
        description: "The document should remain inside the chosen local boundary unless the user explicitly chooses otherwise.",
        color: "teal",
      },
      {
        id: "02",
        title: "The app should not own model infrastructure",
        description: "Bundling models, llama.cpp, scheduling and residency into every app creates duplicated infrastructure and tighter coupling.",
        color: "blue",
      },
      {
        id: "03",
        title: "Mobile failures must remain understandable",
        description: "Runtime availability, Binder loss and local-AI setup need product-level recovery instead of hidden fallback behavior.",
        color: "violet",
      },
    ],
    painLine: "The architectural question: **can a real Android app consume local AI without becoming the runtime host itself?**",
  },
  solution: {
    kicker: "The Android solution",
    titleLine1: "Keep the workflow in RedactGuard.",
    titleLine2: "Move runtime ownership to Harnex.",
    lede: "RedactGuard owns PDF or text ingestion, PII policy, masked review, redaction and export. **Harnex owns model and runtime infrastructure** behind its Consumer Android SDK and Binder boundary.",
    sub: "The separation makes the trust model explicit: when local AI is unavailable, RedactGuard surfaces recovery and **does not silently send the source document to cloud inference**.",
    steps: [
      {
        step: 1,
        title: "Import",
        description: "Add a PDF or paste text inside the Android app.",
      },
      {
        step: 2,
        title: "Detect",
        description: "Request local analysis through the Harnex consumer boundary.",
      },
      {
        step: 3,
        title: "Review",
        description: "Sensitive values stay hidden by default while decisions remain human-controlled.",
      },
      {
        step: 4,
        title: "Export",
        description: "Create a protected PDF only after the review state is complete.",
      },
    ],
  },
  benefits: {
    kicker: "Why it matters",
    title: "A real consumer app proves the Android boundary.",
    items: [
      {
        id: "01",
        title: "Product and infrastructure stay separate",
        description: "RedactGuard owns the **user problem**; Harnex owns the **local AI platform responsibilities** beneath it.",
        color: "blue",
      },
      {
        id: "02",
        title: "Privacy failure is fail-closed",
        description: "When local AI is unavailable, the app exposes setup or recovery instead of quietly changing the execution boundary.",
        color: "teal",
        quote: "No runtime is better than a hidden cloud fallback.",
        featured: true,
      },
      {
        id: "03",
        title: "Human review stays first-class",
        description: "Findings remain suggestions. Sensitive values are masked by default and export stays blocked until decisions are resolved.",
        color: "violet",
      },
    ],
  },
  product: {
    kicker: "Product workflow",
    title: "Import. Protect. Review. Export.",
    sub: "The implemented Android journey keeps local-AI status and recovery visible while preserving human control over every redaction decision.",
    screens: [
      {
        tag: "1 · IMPORT",
        title: "Start with a PDF or text",
        description: "Choose the source, then select built-in or custom PII definitions before analysis can start.",
        image: "images/redact-guard-android/redactguard-android-import.svg",
      },
      {
        tag: "2 · REVIEW",
        title: "Review masked findings",
        description: "Sensitive values stay hidden by default while the user confirms or rejects each proposed redaction.",
        image: "images/redact-guard-android/redactguard-android-review.svg",
      },
      {
        tag: "3 · EXPORT",
        title: "Save the protected PDF",
        description: "Export remains fail-closed until the review state is complete, then uses Android's system file flow.",
        image: "images/redact-guard-android/redactguard-android-export.svg",
      },
    ],
  },
  architecture: {
    kicker: "Who owns what",
    title: "The app owns the workflow. Harnex owns local AI infrastructure.",
    sub: "The Android variant is a concrete consumer of Harnex: application workflow stays inside RedactGuard, while the Consumer SDK and Binder boundary connect it to Harnex runtime ownership.",
    image: "images/redact-guard-android/redactguard-android-architecture.svg",
    points: [
      {
        title: "RedactGuard Android",
        description: "Owns document ingestion, PII policy, human review, deterministic redaction and export.",
      },
      {
        title: "Consumer SDK + Binder",
        description: "Defines the explicit contract between the consumer application and Harnex host.",
      },
      {
        title: "Harnex",
        description: "Owns model selection, runtime lifecycle, scheduling, residency and the local inference backend.",
      },
    ],
    disclaimer: "RedactGuard Android reduces unnecessary exposure; it is not a compliance guarantee. OCR and VLM document understanding remain out of scope, and local model findings still require human review.",
  },
  cta: {
    kicker: "RedactGuard · Android",
    titleLine1: "One privacy workflow.",
    titleLine2: "A mobile execution boundary.",
    sub: "RedactGuard Android is the consumer proof for **Harnex**: a real privacy-sensitive application using on-device AI without owning the model runtime itself.",
  },
};
