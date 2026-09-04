/**
 * projectApp.ts
 *
 * Type contract for application / product project pages.
 * Used by the _template-app page and by every concrete
 * product project (ClosedRoom, Aura Finance, RedactGuard, etc.).
 *
 * The contract enforces a consistent section sequence:
 *   Hero → Proof → Problem → Benefits → Workflow → Product → Architecture → Evidence → Relations → CTA
 */

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

/** A CTA button definition for hero and footer sections. */
export interface ProjectAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

/** A problem card with optional color accent. */
export interface ProblemItem {
  id: number | string;
  title: string;
  description: string;
  color?: 'blue' | 'teal' | 'violet';
}

/** A benefit/value card in the benefits section. */
export interface BenefitItem {
  icon?: string;
  title: string;
  description: string;
}

/** A workflow step with an optional visual. */
export interface WorkflowStep {
  step: string | number;
  title: string;
  description: string;
  /** Path to an optional step screenshot/visual (relative to public/). */
  image?: string;
  imageAlt?: string;
}

/** A product screenshot in the product showcase. */
export interface ProductScreenshot {
  /** Path to screenshot image (relative to public/). */
  image: string;
  alt: string;
  caption?: string;
}

/** A related project node in the ProjectRelations component. */
export interface RelationItem {
  stage: string;
  title: string;
  href?: string;
  current?: boolean;
  note?: string;
}

/* ------------------------------------------------------------------ */
/*  Section-level data contracts                                       */
/* ------------------------------------------------------------------ */

/** SEO and page metadata. */
export interface AppMeta {
  title: string;
  description: string;
}

/** Hero section data. */
export interface AppHero {
  eyebrow: string;
  title: string;
  lede: string;
  status: string;
  logoPath?: string;
  meta: string[];
  actions: ProjectAction[];
  visualLabel: string;
  /** Primary hero visuals - supports multiple images (e.g. phone screenshots). */
  visuals: ProductScreenshot[];
  /** Optional contextual note displayed in the hero visual. */
  visualNote?: string;
}

/** Proof statement immediately below the hero. */
export interface AppProof {
  statement: string;
  detail?: string;
}

/** Problem section - why this product exists. */
export interface AppProblem {
  kicker: string;
  titleLine1: string;
  titleLine2?: string;
  lede: string;
  items: ProblemItem[];
  /** Optional concluding statement with markdown bold support. */
  statement?: string;
}

/** Benefits / value props section. */
export interface AppBenefits {
  eyebrow: string;
  title: string;
  description?: string;
  items: BenefitItem[];
}

/** Workflow / solution section - the "how it works" walkthrough. */
export interface AppWorkflow {
  eyebrow: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

/** Product showcase with screenshots. */
export interface AppProduct {
  eyebrow: string;
  title: string;
  description: string;
  screenshots: ProductScreenshot[];
}

/** Architecture section. */
export interface AppArchitecture {
  eyebrow: string;
  title: string;
  description: string;
  /** Path to the architecture diagram image. */
  diagramImage?: string;
  diagramAlt?: string;
}

/** Evidence boundary section. */
export interface AppEvidence {
  eyebrow: string;
  title: string;
  description: string;
  note: {
    title: string;
    body: string;
    evidenced: string[];
    missing: string[];
  };
}

/** Final call-to-action block. */
export interface AppCta {
  kicker: string;
  titleLine1: string;
  titleLine2?: string;
  lede: string;
  primaryAction: ProjectAction;
  secondaryAction?: ProjectAction;
}

/* ------------------------------------------------------------------ */
/*  Root data contract                                                 */
/* ------------------------------------------------------------------ */

/**
 * Complete data contract for an app / product project page.
 *
 * Every field maps 1-to-1 to a section in the template.
 * The template reads from this contract and passes props
 * to the shared project components.
 */
export interface AppProjectData {
  meta: AppMeta;
  hero: AppHero;
  proof: AppProof;
  problem: AppProblem;
  benefits: AppBenefits;
  workflow: AppWorkflow;
  product: AppProduct;
  architecture: AppArchitecture;
  evidence: AppEvidence;
  relations: RelationItem[];
  cta: AppCta;
}
