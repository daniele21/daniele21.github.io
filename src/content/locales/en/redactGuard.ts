/**
 * redactGuard.ts
 * Structured data configuration for RedactGuard page matching prototype (2).
 */

export interface RedactGuardProblem {
  id: string;
  title: string;
  description: string;
  color: 'blue' | 'violet' | 'teal';
}

export interface RedactGuardFlowStep {
  step: number;
  title: string;
  description: string;
}

export interface RedactGuardBenefit {
  id: string;
  title: string;
  description: string;
  color: 'teal' | 'blue' | 'violet';
  quote?: string;
  featured?: boolean;
}

export interface RedactGuardScreen {
  tag: string;
  title: string;
  description: string;
  image: string;
}

export interface RedactGuardTechPoint {
  title: string;
  description: string;
}

export interface RedactGuardData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    pills: string[];
    imageHero: string;
    imageCaptionLeft: string;
    imageCaptionRight: string;
  };
  problem: {
    kicker: string;
    title: string;
    lede: string;
    items: RedactGuardProblem[];
    painLine: string;
  };
  solution: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    sub: string;
    steps: RedactGuardFlowStep[];
  };
  benefits: {
    kicker: string;
    title: string;
    items: RedactGuardBenefit[];
  };
  product: {
    kicker: string;
    title: string;
    sub: string;
    screens: RedactGuardScreen[];
  };
  architecture: {
    kicker: string;
    title: string;
    sub: string;
    image: string;
    points: RedactGuardTechPoint[];
    disclaimer: string;
  };
  cta: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
  };
}

export const redactGuardData: RedactGuardData = {
  meta: {
    title: "RedactGuard, Local-first document anonymization",
    description: "Detect sensitive data locally, review every finding, and share only what is needed.",
  },
  hero: {
    eyebrow: "Local-first document privacy",
    titleLine1: "Detect sensitive data.",
    titleLine2: "Share only what's needed.",
    lede: "**RedactGuard** uses a **local LLM** to detect standard or **custom PII**, lets you review every finding, and creates a minimized document before sharing.",
    pills: ["Local processing", "Custom PII", "Human review"],
    imageHero: "images/redact-guard/redactguard-review.jpg",
    imageCaptionLeft: "Detect locally → review → redact",
    imageCaptionRight: "Nothing leaves automatically",
  },
  problem: {
    kicker: "The problem",
    title: "Sensitive data is not a fixed list.",
    lede: "What must be protected changes by **document, industry, organization and workflow**. That makes detection both a privacy problem and a maintenance problem.",
    items: [
      {
        id: "01",
        title: "Manual review is slow",
        description: "Long documents make anonymization repetitive, expensive and inconsistent.",
        color: "blue",
      },
      {
        id: "02",
        title: "Static rules are hard to adapt",
        description: "New PII often means new regex, mappings, exceptions and application logic.",
        color: "violet",
      },
      {
        id: "03",
        title: "Cloud AI changes the privacy boundary",
        description: "The original sensitive document must leave the machine before it can be analyzed.",
        color: "teal",
      },
    ],
    painLine: "The hidden cost: **every change in what counts as sensitive can become a software change.**",
  },
  solution: {
    kicker: "The solution",
    titleLine1: "Define what is sensitive.",
    titleLine2: "RedactGuard finds it locally.",
    lede: "Standard identifiers or domain-specific information can be expressed through **profiles and custom PII instructions** used by the local LLM.",
    sub: "For many taxonomy changes, you update the **definition** instead of building another hard-coded detector.",
    steps: [
      {
        step: 1,
        title: "Define PII",
        description: "Use a profile or add custom sensitive categories.",
      },
      {
        step: 2,
        title: "Detect locally",
        description: "The GGUF model analyzes the document on the machine.",
      },
      {
        step: 3,
        title: "Review",
        description: "The model suggests. The user confirms.",
      },
      {
        step: 4,
        title: "Export",
        description: "Only the minimized result moves to the next workflow.",
      },
    ],
  },
  benefits: {
    kicker: "Why it matters",
    title: "Privacy, adaptability and control.",
    items: [
      {
        id: "01",
        title: "Private by design",
        description: "The document can be processed with **local inference**, without making cloud AI the default path for sensitive content.",
        color: "teal",
      },
      {
        id: "02",
        title: "Adaptable by configuration",
        description: "New or changing PII can often be handled by updating the **profile or prompt**, instead of adding another detector.",
        color: "blue",
        quote: "Change the definition, not the software.",
        featured: true,
      },
      {
        id: "03",
        title: "Human-controlled",
        description: "AI accelerates detection, but **the user decides** what is actually removed before export.",
        color: "violet",
      },
    ],
  },
  product: {
    kicker: "Product proof",
    title: "Load. Review. Export.",
    sub: "The workflow stays visible and reversible until the user confirms the final redactions.",
    screens: [
      {
        tag: "1 · LOAD",
        title: "Choose the document and profile",
        description: "Start from a built-in domain profile or a custom detection definition.",
        image: "images/redact-guard/redactguard-upload.jpg",
      },
      {
        tag: "2 · REVIEW",
        title: "Inspect every finding",
        description: "Keep, remove or adjust what the local model identified as sensitive.",
        image: "images/redact-guard/redactguard-review.jpg",
      },
      {
        tag: "3 · EXPORT",
        title: "Share the minimized result",
        description: "Export only after the redaction choices have been explicitly reviewed.",
        image: "images/redact-guard/redactguard-export.jpg",
      },
    ],
  },
  architecture: {
    kicker: "Under the hood",
    title: "Local by architecture.",
    sub: "Once the product idea is clear, the implementation is intentionally simple: UI, document processing, and local inference have separate responsibilities.",
    image: "images/redact-guard/redact-guard-architecture.png",
    points: [
      {
        title: "React / Vite",
        description: "Upload, profile selection, human review and export workflow.",
      },
      {
        title: "FastAPI + Docling",
        description: "Document conversion, sessions, PII orchestration, redaction and caching.",
      },
      {
        title: "Local GGUF LLM",
        description: "Contextual PII detection through llama-cpp-python, including profile and custom-type instructions.",
      },
    ],
    disclaimer: "RedactGuard is an experimental privacy tool, not a compliance guarantee. Local AI can miss, misclassify or over-detect sensitive information, so results still require human review.",
  },
  cta: {
    kicker: "Local-first data minimization",
    titleLine1: "Define what is sensitive.",
    titleLine2: "Share less.",
    sub: "RedactGuard turns local AI into a configurable privacy workflow: **define → detect → review → redact → export.**",
  },
};
