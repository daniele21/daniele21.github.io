/**
 * _templateInfrastructure.ts
 *
 * Example content file for the infrastructure project template.
 * Copy this file, rename it, and replace placeholder values
 * with your project's real data.
 *
 * USAGE:
 *   1. Copy this file: cp _templateInfrastructure.ts myProject.ts
 *   2. Replace all "TODO:" values with real content
 *   3. Update the export name to match your project
 *   4. Import in the page template
 */
import type { InfrastructureProjectData } from '../../../types/projectInfrastructure';

export const templateInfrastructureData: InfrastructureProjectData = {

  /* ---------------------------------------------------------------- */
  /*  SEO & page metadata                                              */
  /* ---------------------------------------------------------------- */
  meta: {
    title: 'TODO: Project Name — Daniele Moltisanti',
    description: 'TODO: One-sentence description of what this infrastructure project does and why it matters.',
  },

  /* ---------------------------------------------------------------- */
  /*  Hero — first visible section, above the fold                     */
  /* ---------------------------------------------------------------- */
  hero: {
    eyebrow: 'INFRASTRUCTURE · TODO: DOMAIN',
    title: 'TODO: Project Name',
    lede: 'TODO: One-paragraph description of the project. What it does, what boundary it owns, and why someone should care.',
    status: 'TODO: Status label · e.g. "Spec & prototype"',
    logoPath: 'images/TODO/logo.png',          // relative to public/
    meta: [
      'TODO: Platform',                         // e.g. "Android API 26+"
      'TODO: Model format',                     // e.g. "GGUF + llama.cpp"
      'TODO: Tech stack',                       // e.g. "Kotlin + JNI/C++"
      'TODO: License',                          // e.g. "MIT"
    ],
    actions: [
      { label: 'Explore architecture ↓', href: '#architecture' },
      { label: 'GitHub ↗', href: 'https://github.com/TODO', variant: 'secondary' },
    ],
    visualLabel: 'TODO: Alt text for the hero visual area',
    imageHero: 'images/TODO/hero.png',          // relative to public/
    imageCaptionLeft: 'TODO: Left caption',
    imageCaptionRight: 'TODO: Right caption',
  },

  /* ---------------------------------------------------------------- */
  /*  Proof statement — right after hero                               */
  /* ---------------------------------------------------------------- */
  proof: {
    statement: 'TODO: One sentence that defines the thesis this project proves.',
    detail: 'TODO: One sentence that adds nuance or context to the proof statement.',
  },

  /* ---------------------------------------------------------------- */
  /*  Why it exists — design principles                                */
  /* ---------------------------------------------------------------- */
  why: {
    eyebrow: 'WHY IT EXISTS',
    title: 'TODO: The core insight that justifies this project.',
    description: 'TODO: 1-2 sentences explaining the infrastructure gap or tension this addresses.',
    principles: [
      {
        title: 'TODO: Principle 1 title',
        subtitle: 'TODO: Principle 1 description',
        color: 'blue',
      },
      {
        title: 'TODO: Principle 2 title',
        subtitle: 'TODO: Principle 2 description',
        color: 'teal',
      },
      {
        title: 'TODO: Principle 3 title',
        subtitle: 'TODO: Principle 3 description',
        color: 'violet',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Problems — the specific issues this project solves               */
  /* ---------------------------------------------------------------- */
  problems: {
    eyebrow: 'THE PROBLEM',
    title: 'TODO: What goes wrong without this project?',
    description: 'TODO: Description of the problem space.',
    items: [
      {
        id: 1,
        title: 'TODO: Problem 1',
        description: 'TODO: Why this problem matters.',
        color: 'blue',
      },
      {
        id: 2,
        title: 'TODO: Problem 2',
        description: 'TODO: Why this problem matters.',
        color: 'teal',
      },
      {
        id: 3,
        title: 'TODO: Problem 3',
        description: 'TODO: Why this problem matters.',
        color: 'violet',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Architecture — system design deep-dive                           */
  /* ---------------------------------------------------------------- */
  architecture: {
    eyebrow: 'ARCHITECTURE',
    title: 'TODO: How the system is designed.',
    description: 'TODO: Description of the architectural approach.',
    diagramImage: 'images/TODO/architecture.png',
    diagramAlt: 'TODO: Architecture diagram alt text',
  },

  /* ---------------------------------------------------------------- */
  /*  Runtime — code preview, surfaces, operational details            */
  /* ---------------------------------------------------------------- */
  runtime: {
    eyebrow: 'RUNTIME',
    title: 'TODO: What the runtime does and how it works.',
    description: 'TODO: Description of runtime behavior.',
    codePreview: {
      language: 'kotlin',
      title: 'TODO: Code snippet title',
      code: `// TODO: Replace with a representative code snippet
fun main() {
    println("Hello, Infrastructure!")
}`,
    },
  },

  /* ---------------------------------------------------------------- */
  /*  Evidence & limits — honest assessment of project maturity        */
  /* ---------------------------------------------------------------- */
  evidence: {
    eyebrow: 'EVIDENCE & LIMITS',
    title: 'TODO: Summary of what is proven vs what is not yet.',
    description: 'TODO: Description of the evidence boundary.',
    note: {
      title: 'TODO: Evidence note headline.',
      body: 'TODO: Detailed description of what evidence exists and what limitations remain.',
      evidenced: [
        'TODO: What is implemented and working',
        'TODO: What is tested and validated',
        'TODO: What is architecturally proven',
      ],
      missing: [
        'TODO: What is not yet validated',
        'TODO: What requires further evidence',
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  /*  Status & roadmap — current phase and next steps                  */
  /* ---------------------------------------------------------------- */
  status: {
    eyebrow: 'STATUS & NEXT',
    title: 'TODO: Current direction and next decision.',
    description: 'TODO: What the roadmap looks like.',
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'TODO: Phase 1 title',
        description: 'TODO: What this phase delivers.',
        active: true,
      },
      {
        phase: 'Phase 2',
        title: 'TODO: Phase 2 title',
        description: 'TODO: What this phase delivers.',
      },
      {
        phase: 'Phase 3',
        title: 'TODO: Phase 3 title',
        description: 'TODO: What this phase delivers.',
      },
    ],
    // Alternative to roadmap: use a decision band instead
    // decision: {
    //   title: 'TODO: Current decision statement',
    //   body: 'TODO: Context for the decision.',
    //   signals: ['TODO: Signal 1', 'TODO: Signal 2', 'TODO: Signal 3'],
    // },
  },

  /* ---------------------------------------------------------------- */
  /*  Relations — where this project fits in the ecosystem             */
  /* ---------------------------------------------------------------- */
  relations: [
    {
      stage: 'BUILD · INFRASTRUCTURE',
      title: 'TODO: This project',
      current: true,
      note: 'TODO: What this project provides',
    },
    {
      stage: 'TEST · PRODUCT',
      title: 'TODO: Related product',
      href: '/TODO',
      note: 'TODO: How the related product uses this',
    },
    {
      stage: 'MEASURE · EVIDENCE',
      title: 'TODO: Measurement layer',
      href: '/TODO',
      note: 'TODO: How this is measured',
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  CTA — final call to action at page bottom                        */
  /* ---------------------------------------------------------------- */
  cta: {
    badge: 'TODO: BADGE TEXT',
    title: 'TODO: CTA headline that invites action.',
    description: 'TODO: One sentence motivating the reader to explore or contribute.',
    primaryAction: {
      label: 'Explore on GitHub ↗',
      href: 'https://github.com/TODO',
    },
    secondaryAction: {
      label: 'Back to Portfolio ↗',
      href: '/',
    },
  },
};
