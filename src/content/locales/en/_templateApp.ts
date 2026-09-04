/**
 * _templateApp.ts
 *
 * Example content file for the app / product project template.
 * Copy this file, rename it, and replace placeholder values
 * with your project's real data.
 *
 * USAGE:
 *   1. Copy this file: cp _templateApp.ts myProduct.ts
 *   2. Replace all "TODO:" values with real content
 *   3. Update the export name to match your project
 *   4. Import in the page template
 */
import type { AppProjectData } from '../../../types/projectApp';

export const templateAppData: AppProjectData = {

  /* ---------------------------------------------------------------- */
  /*  SEO & page metadata                                              */
  /* ---------------------------------------------------------------- */
  meta: {
    title: 'TODO: Product Name - Daniele Moltisanti',
    description: 'TODO: One-sentence description of what this product does and the problem it solves.',
  },

  /* ---------------------------------------------------------------- */
  /*  Hero - first visible section, above the fold                     */
  /* ---------------------------------------------------------------- */
  hero: {
    eyebrow: 'PRODUCT · TODO: CATEGORY',
    title: 'TODO: Product Name',
    lede: 'TODO: One-paragraph description that explains what the user can do with this product and why it matters.',
    status: 'TODO: Status label · e.g. "Active app"',
    logoPath: 'images/TODO/logo.png',           // relative to public/
    meta: [
      'TODO: Key feature 1',                    // e.g. "Local-first by default"
      'TODO: Key feature 2',                    // e.g. "Speaker-aware transcripts"
      'TODO: Key feature 3',                    // e.g. "Cross-meeting memory"
    ],
    actions: [
      { label: 'See the workflow ↓', href: '#workflow' },
      { label: 'GitHub ↗', href: 'https://github.com/TODO', variant: 'secondary' },
    ],
    visualLabel: 'TODO: Alt text for the hero visual area',
    visuals: [
      {
        image: 'images/TODO/hero-1.png',        // relative to public/
        alt: 'TODO: Main screenshot alt text',
        caption: 'TODO: Screenshot caption',
      },
      {
        image: 'images/TODO/hero-2.png',
        alt: 'TODO: Secondary screenshot alt text',
        caption: 'TODO: Screenshot caption',
      },
    ],
    visualNote: 'TODO: Optional contextual note for the hero visual',
  },

  /* ---------------------------------------------------------------- */
  /*  Proof statement - right after hero                               */
  /* ---------------------------------------------------------------- */
  proof: {
    statement: 'TODO: One sentence that defines the thesis this product proves.',
    detail: 'TODO: One sentence that adds nuance to the proof statement.',
  },

  /* ---------------------------------------------------------------- */
  /*  Problem - why this product exists                                */
  /* ---------------------------------------------------------------- */
  problem: {
    kicker: 'THE PROBLEM',
    titleLine1: 'TODO: What is broken or missing',
    titleLine2: 'TODO: in the current landscape?',
    lede: 'TODO: Describe the user pain in 1-2 sentences.',
    items: [
      {
        id: 1,
        title: 'TODO: Problem 1',
        description: 'TODO: How this problem affects the user.',
        color: 'blue',
      },
      {
        id: 2,
        title: 'TODO: Problem 2',
        description: 'TODO: How this problem affects the user.',
        color: 'teal',
      },
      {
        id: 3,
        title: 'TODO: Problem 3',
        description: 'TODO: How this problem affects the user.',
        color: 'violet',
      },
    ],
    statement: 'TODO: **Bold key insight** followed by the concluding problem statement.',
  },

  /* ---------------------------------------------------------------- */
  /*  Benefits - what the user gains                                   */
  /* ---------------------------------------------------------------- */
  benefits: {
    eyebrow: 'WHAT YOU GET',
    title: 'TODO: The key benefits this product delivers.',
    description: 'TODO: Brief contextual description.',
    items: [
      {
        icon: '🔒',
        title: 'TODO: Benefit 1',
        description: 'TODO: Why this benefit matters to the user.',
      },
      {
        icon: '⚡',
        title: 'TODO: Benefit 2',
        description: 'TODO: Why this benefit matters to the user.',
      },
      {
        icon: '🎯',
        title: 'TODO: Benefit 3',
        description: 'TODO: Why this benefit matters to the user.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Workflow - how the product works                                 */
  /* ---------------------------------------------------------------- */
  workflow: {
    eyebrow: 'HOW IT WORKS',
    title: 'TODO: The workflow from input to value.',
    description: 'TODO: Brief overview of the user journey.',
    steps: [
      {
        step: 1,
        title: 'TODO: Step 1 title',
        description: 'TODO: What the user does in this step.',
        image: 'images/TODO/step-1.png',
        imageAlt: 'TODO: Step 1 visual alt text',
      },
      {
        step: 2,
        title: 'TODO: Step 2 title',
        description: 'TODO: What the product does in this step.',
        image: 'images/TODO/step-2.png',
        imageAlt: 'TODO: Step 2 visual alt text',
      },
      {
        step: 3,
        title: 'TODO: Step 3 title',
        description: 'TODO: What the user gets as output.',
        image: 'images/TODO/step-3.png',
        imageAlt: 'TODO: Step 3 visual alt text',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Product - screenshot showcase                                    */
  /* ---------------------------------------------------------------- */
  product: {
    eyebrow: 'THE PRODUCT',
    title: 'TODO: Product showcase title.',
    description: 'TODO: Brief description of the product interface.',
    screenshots: [
      {
        image: 'images/TODO/product-1.png',
        alt: 'TODO: Screenshot 1 alt text',
        caption: 'TODO: What this screen shows',
      },
      {
        image: 'images/TODO/product-2.png',
        alt: 'TODO: Screenshot 2 alt text',
        caption: 'TODO: What this screen shows',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Architecture - technical design                                  */
  /* ---------------------------------------------------------------- */
  architecture: {
    eyebrow: 'ARCHITECTURE',
    title: 'TODO: How the system is built.',
    description: 'TODO: Description of the technical architecture.',
    diagramImage: 'images/TODO/architecture.png',
    diagramAlt: 'TODO: Architecture diagram alt text',
  },

  /* ---------------------------------------------------------------- */
  /*  Evidence & limits - honest assessment                            */
  /* ---------------------------------------------------------------- */
  evidence: {
    eyebrow: 'EVIDENCE & LIMITS',
    title: 'TODO: What is proven and what is not yet.',
    description: 'TODO: Description of the evidence boundary.',
    note: {
      title: 'TODO: Evidence note headline.',
      body: 'TODO: Detailed description of what evidence exists and what limitations remain.',
      evidenced: [
        'TODO: What is implemented and working',
        'TODO: What is architecturally proven',
        'TODO: What the user can rely on today',
      ],
      missing: [
        'TODO: What is not yet validated',
        'TODO: What the user should not assume',
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  /*  Relations - where this product fits in the ecosystem             */
  /* ---------------------------------------------------------------- */
  relations: [
    {
      stage: 'BUILD · INFRASTRUCTURE',
      title: 'TODO: Related infrastructure',
      href: '/TODO',
      note: 'TODO: What infrastructure this product uses',
    },
    {
      stage: 'PRODUCT · TODO: CATEGORY',
      title: 'TODO: This product',
      current: true,
      note: 'TODO: What this product provides',
    },
    {
      stage: 'MEASURE · EVIDENCE',
      title: 'TODO: Measurement layer',
      href: '/TODO',
      note: 'TODO: How this is measured',
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  CTA - final call to action at page bottom                        */
  /* ---------------------------------------------------------------- */
  cta: {
    kicker: 'TODO: CTA KICKER',
    titleLine1: 'TODO: CTA headline that invites',
    titleLine2: 'TODO: the user to take action.',
    lede: 'TODO: One sentence motivating the reader to explore or try the product.',
    primaryAction: {
      label: 'Explore the project ↗',
      href: 'https://github.com/TODO',
    },
    secondaryAction: {
      label: 'Back to Portfolio ↗',
      href: '/',
    },
  },
};
