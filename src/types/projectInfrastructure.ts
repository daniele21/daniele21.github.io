/**
 * projectInfrastructure.ts
 *
 * Type contract for infrastructure / architecture project pages.
 * Used by the _template-infrastructure page and by every concrete
 * infrastructure project (Harnex, Korgis, Local ASR Server, etc.).
 *
 * The contract enforces a consistent section sequence:
 *   Hero → Proof → Why → Problems → Architecture → Runtime → Evidence → Status → Relations → CTA
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

/** A numbered/colored problem card. */
export interface ProblemItem {
  id: number;
  title: string;
  description: string;
  color?: 'blue' | 'teal' | 'violet';
}

/** A design principle displayed as a strip card. */
export interface PrincipleItem {
  title: string;
  subtitle: string;
  color?: 'blue' | 'teal' | 'violet';
}

/** A roadmap phase displayed in the status section. */
export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
  active?: boolean;
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
export interface InfrastructureMeta {
  title: string;
  description: string;
}

/** Hero section data: the first visible block on the page. */
export interface InfrastructureHero {
  eyebrow: string;
  title: string;
  lede: string;
  status: string;
  logoPath?: string;
  meta: string[];
  actions: ProjectAction[];
  visualLabel: string;
  /** Path to the main hero image (relative to public/). */
  imageHero: string;
  /** Optional caption left/right below the hero image. */
  imageCaptionLeft?: string;
  imageCaptionRight?: string;
}

/** Proof statement immediately below the hero. */
export interface InfrastructureProof {
  statement: string;
  detail?: string;
}

/** "Why it exists" — design principles section. */
export interface InfrastructureWhy {
  eyebrow: string;
  title: string;
  description: string;
  principles: PrincipleItem[];
}

/** Problems the project solves. */
export interface InfrastructureProblems {
  eyebrow: string;
  title: string;
  description: string;
  items: ProblemItem[];
}

/** Architecture deep-dive section. */
export interface InfrastructureArchitecture {
  eyebrow: string;
  title: string;
  description: string;
  /** Path to the architecture diagram image. */
  diagramImage?: string;
  diagramAlt?: string;
}

/** Runtime / code preview section. */
export interface InfrastructureRuntime {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional inline code snippet. */
  codePreview?: {
    language: string;
    title: string;
    code: string;
  };
}

/** Evidence boundary section. */
export interface InfrastructureEvidence {
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

/** Status / roadmap / next-decision section. */
export interface InfrastructureStatus {
  eyebrow: string;
  title: string;
  description: string;
  /** Use either a roadmap OR a decision band, depending on the project. */
  roadmap?: RoadmapPhase[];
  decision?: {
    title: string;
    body: string;
    signals: string[];
  };
}

/** Final call-to-action block. */
export interface InfrastructureCta {
  badge: string;
  title: string;
  description: string;
  primaryAction: ProjectAction;
  secondaryAction?: ProjectAction;
}

/* ------------------------------------------------------------------ */
/*  Root data contract                                                 */
/* ------------------------------------------------------------------ */

/**
 * Complete data contract for an infrastructure project page.
 *
 * Every field maps 1-to-1 to a section in the template.
 * The template reads from this contract and passes props
 * to the shared project components.
 */
export interface InfrastructureProjectData {
  meta: InfrastructureMeta;
  hero: InfrastructureHero;
  proof: InfrastructureProof;
  why: InfrastructureWhy;
  problems: InfrastructureProblems;
  architecture: InfrastructureArchitecture;
  runtime: InfrastructureRuntime;
  evidence: InfrastructureEvidence;
  status: InfrastructureStatus;
  relations: RelationItem[];
  cta: InfrastructureCta;
}
