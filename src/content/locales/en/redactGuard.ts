/**
 * redactGuard.ts
 * Structured data configuration for the RedactGuard Desktop project page.
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
    title: "RedactGuard Desktop, Local-first document anonymization",
    description: "Desktop document redaction with configurable PII, human review and local AI execution through Korgis.",
  },
  hero: {
    eyebrow: "Desktop · Powered by Korgis",
    titleLine1: "Detect sensitive data.",
    titleLine2: "Share only what's needed.",
    lede: "**RedactGuard Desktop** turns local AI into a document-privacy workflow: define the PII you care about, detect it locally through the **Korgis** execution backbone, review every finding, then export only the minimized result.",
    pills: ["Desktop workflow", "Korgis backbone", "Human review"],
    imageHero: "images/redact-guard/redactguard-review.jpg",
    imageCaptionLeft: "Detect locally → review → redact",
    imageCaptionRight: "Desktop · Korgis",
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
    kicker: "The desktop solution",
    titleLine1: "Own the document workflow.",
    titleLine2: "Delegate local execution to Korgis.",
    lede: "RedactGuard owns the product problem — import, PII policy, review, redaction and export — while **Korgis provides the reusable local AI execution boundary** underneath it.",
    sub: "The result is a clearer separation between **application workflow** and **local inference infrastructure**, without making cloud AI the default path for sensitive content.",
    steps: [
      {
        step: 1,
        title: "Define PII",
        description: "Use a profile or add custom sensitive categories.",
      },
      {
        step: 2,
        title: "Execute locally",
        description: "Korgis owns the local model execution path.",
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
    title: "Privacy, reusable infrastructure and control.",
    items: [
      {
        id: "01",
        title: "Private by design",
        description: "The document can be processed with **local inference**, without making cloud AI the default path for sensitive content.",
        color: "teal",
      },
      {
        id: "02",
        title: "App and runtime stay separate",
        description: "RedactGuard focuses on the **document workflow** while Korgis provides the reusable local execution layer beneath it.",
        color: "blue",
        quote: "One product problem. A reusable local backbone.",
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
    sub: "The desktop workflow stays visible and reversible until the user confirms the final redactions.",
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
    title: "Same product problem. Desktop execution boundary.",
    sub: "RedactGuard keeps document-specific responsibilities in the application and uses Korgis as the local AI backbone, so product logic and inference infrastructure do not collapse into one code path.",
    image: "images/redact-guard/redactguard-desktop-architecture.svg",
    points: [
      {
        title: "RedactGuard Desktop",
        description: "Owns import, document processing, PII policy, review, redaction and export.",
      },
      {
        title: "Korgis",
        description: "Provides the reusable local AI execution boundary beneath the desktop workflow.",
      },
      {
        title: "Local model runtime",
        description: "Runs the GGUF inference path on infrastructure controlled by the user.",
      },
    ],
    disclaimer: "RedactGuard is an experimental privacy tool, not a compliance guarantee. Local AI can miss, misclassify or over-detect sensitive information, so results still require human review.",
  },
  cta: {
    kicker: "RedactGuard · Desktop",
    titleLine1: "Private document workflows.",
    titleLine2: "Reusable local execution.",
    sub: "The desktop variant separates the **RedactGuard product workflow** from the **Korgis execution backbone**, while keeping the final privacy decision with the user.",
  },
};
