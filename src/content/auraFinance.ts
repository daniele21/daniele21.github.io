/**
 * auraFinance.ts
 * Structured data configuration for Aura Finance page matching prototype.
 */

export interface AuraQuestion {
  id: string;
  question: string;
  description: string;
  color: 'blue' | 'teal' | 'violet';
}

export interface AuraFlowStep {
  step: number;
  title: string;
  description: string;
}

export interface AuraBenefit {
  id: string;
  title: string;
  description: string;
  color: 'teal' | 'blue' | 'violet' | 'amber';
  quote?: string;
  featured?: boolean;
}

export interface AuraScenario {
  tag: string;
  question: string;
  description: string;
  shot1: {
    image: string;
    alt: string;
    label: string;
  };
  shot2: {
    image: string;
    alt: string;
    label: string;
  };
  reverse?: boolean;
}

export interface AuraPaymentStep {
  title: string;
  description: string;
}

export interface AuraTechPoint {
  title: string;
  description: string;
}

export interface AuraFinanceData {
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
    phoneActual: string;
    phoneNet: string;
    noteTitle: string;
    noteSub: string;
  };
  why: {
    kicker: string;
    title: string;
    lede: string;
    questions: AuraQuestion[];
    problemLine: string;
  };
  solution: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    steps: AuraFlowStep[];
  };
  benefits: {
    kicker: string;
    title: string;
    items: AuraBenefit[];
  };
  product: {
    kicker: string;
    title: string;
    sub: string;
    scenarios: AuraScenario[];
  };
  payment: {
    kicker: string;
    title: string;
    lede: string;
    steps: AuraPaymentStep[];
    image: string;
  };
  architecture: {
    kicker: string;
    title: string;
    sub: string;
    image: string;
    points: AuraTechPoint[];
  };
  cta: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
  };
}

export const auraFinanceData: AuraFinanceData = {
  meta: {
    title: "Aura Finance, Private, Android-first personal finance",
    description: "Understand what you can safely spend, where your money goes, and what needs attention, without making a cloud backend the owner of your financial history.",
  },
  hero: {
    eyebrow: "Private, Android-first personal finance",
    titleLine1: "Understand your money.",
    titleLine2: "Keep your history yours.",
    lede: "**Aura Finance** helps answer three everyday questions: **what can I safely spend, where is my money going, and what needs attention?** Your financial workspace stays local first, with optional encrypted continuity.",
    pills: ["Local-first ledger", "Explainable numbers", "Human-reviewed automation"],
    phoneActual: "images/aura-finance/aura-home.png",
    phoneNet: "images/aura-finance/aura-home-net.png",
    noteTitle: "One ledger.",
    noteSub: "Two useful views of your month.",
  },
  why: {
    kicker: "Why Aura exists",
    title: "A personal budget should help you decide.",
    lede: "Aura starts from a simple constraint: understanding your finances should not require a cloud backend to become the owner of your complete financial history.",
    questions: [
      {
        id: "01",
        question: "What can I safely spend?",
        description: "Budget, recorded spending and remaining days become a direct monthly signal.",
        color: "blue",
      },
      {
        id: "02",
        question: "Where is my money going?",
        description: "Local reports show category totals, trends, comparisons and exceptional spending.",
        color: "teal",
      },
      {
        id: "03",
        question: "What still needs my decision?",
        description: "Alerts, imports and detected Android payments stay visible until the user chooses what belongs in the ledger.",
        color: "violet",
      },
    ],
    problemLine: "The goal is not more automation. It is **more clarity without giving up ownership or control.**",
  },
  solution: {
    kicker: "The idea",
    titleLine1: "One local financial workspace.",
    titleLine2: "Clear signals, explicit control.",
    lede: "Aura keeps the canonical ledger on the device, derives its insights through **deterministic finance rules**, and treats imports or detected payments as proposals until you confirm them.",
    steps: [
      {
        step: 1,
        title: "Record",
        description: "Income, expenses, budgets, recurring commitments and goals.",
      },
      {
        step: 2,
        title: "Understand",
        description: "Safe-to-spend, pace, trends, category views and comparisons.",
      },
      {
        step: 3,
        title: "Review",
        description: "Imports and Android payment candidates never silently enter the ledger.",
      },
      {
        step: 4,
        title: "Keep control",
        description: "Portable data and optional encrypted backup preserve ownership.",
      },
    ],
  },
  benefits: {
    kicker: "What changes",
    title: "Useful finance software with fewer hidden trade-offs.",
    items: [
      {
        id: "01",
        title: "Local-first ownership",
        description: "Transactions, budgets, reports, settings and attachments live on the device first.",
        color: "teal",
        quote: "The local workspace is the source of truth.",
        featured: true,
      },
      {
        id: "02",
        title: "Explainable numbers",
        description: "Safe-to-spend, pace, totals and comparisons come from deterministic rules that can be traced back to recorded data.",
        color: "blue",
      },
      {
        id: "03",
        title: "Human-reviewed automation",
        description: "Imports and Android payment detection reduce manual work without creating irreversible ledger changes.",
        color: "violet",
      },
      {
        id: "04",
        title: "Optional encrypted continuity",
        description: "Cloud backup is disabled by default and encrypted on the client before a payload reaches Firestore.",
        color: "amber",
      },
    ],
  },
  product: {
    kicker: "Product proof",
    title: "From totals to decisions.",
    sub: "The current mobile product turns the feature list into concrete financial questions.",
    scenarios: [
      {
        tag: "ACTUAL vs NET",
        question: "Did one large purchase really change my month?",
        description: "**Actual** keeps the complete cash record visible. **Net** separates marked exceptional spending so the repeatable pattern stays readable.",
        shot1: {
          image: "images/aura-finance/aura-home.png",
          alt: "Aura Actual home view",
          label: "Actual · complete month",
        },
        shot2: {
          image: "images/aura-finance/aura-home-net.png",
          alt: "Aura Net home view",
          label: "Net · repeatable pattern",
        },
      },
      {
        tag: "BUDGET → HISTORY",
        question: "Where should I act before the month gets away from me?",
        description: "Budget alerts expose the immediate exception. Category history then shows whether it is **a recurring baseline or a temporary spike.**",
        reverse: true,
        shot1: {
          image: "images/aura-finance/aura-budgets.png",
          alt: "Aura budget alerts",
          label: "Budget · what needs attention",
        },
        shot2: {
          image: "images/aura-finance/aura-reports-category-groceries.png",
          alt: "Aura groceries category report",
          label: "History · is it a pattern?",
        },
      },
      {
        tag: "COMPARE → REVIEW",
        question: "What changed, and what still needs my decision?",
        description: "Period comparison explains the difference. Detected Android payments remain **candidates** until edited, confirmed or ignored.",
        shot1: {
          image: "images/aura-finance/aura-reports-compare.png",
          alt: "Aura period comparison report",
          label: "Explain · what changed",
        },
        shot2: {
          image: "images/aura-finance/aura-payment-detection.png",
          alt: "Aura Android payment candidate review",
          label: "Review · before recording",
        },
      },
    ],
  },
  payment: {
    kicker: "Android-only capability",
    title: "Faster capture. No silent bookkeeping.",
    lede: "On supported Android flows, Aura can recognize a likely payment locally and prepare a structured candidate. **The transaction is created only after explicit review.**",
    steps: [
      {
        title: "Detect locally",
        description: "Selected supported notifications are filtered and parsed on-device.",
      },
      {
        title: "Store minimally",
        description: "Only encrypted structured candidates enter the private native queue.",
      },
      {
        title: "Confirm first",
        description: "Edit, confirm or ignore before anything becomes a canonical transaction.",
      },
    ],
    image: "images/aura-finance/aura-payment-detection.png",
  },
  architecture: {
    kicker: "Under the hood",
    title: "Local-first is an architecture boundary.",
    sub: "The shared React product and deterministic financial domain stay separate from Android-only capabilities, while cloud continuity remains optional and encrypted client-side.",
    image: "images/aura-finance/aura-architecture.png",
    points: [
      {
        title: "React Native / Expo",
        description: "Cross-platform core product, offline SQLite database, financial state engine and user experience.",
      },
      {
        title: "Native Android Service",
        description: "Background notification parsing, payment candidate detection and secure local IPC queue.",
      },
      {
        title: "Client-Side Encryption",
        description: "AES-256 encrypted payload serialization before optional Firebase cloud synchronization.",
      },
    ],
  },
  cta: {
    kicker: "Local-first personal finance",
    titleLine1: "Understand your money.",
    titleLine2: "Keep your data yours.",
    sub: "Aura Finance turns financial tracking into an explicit local workflow: **record → understand → review → decide.**",
  },
};
