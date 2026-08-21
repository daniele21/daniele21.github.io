/**
 * Canonical Type Definitions for the Landing Page.
 * Enforces structured schema across hero, method stages, evidence, and CTAs.
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeaderContent {
  brandName: string;
  links: NavLink[];
  cta: NavLink;
}

export interface HeroIdentity {
  name: string;
  role: string;
  portraitPath: string;
  portraitAlt: string;
  bio: string;
}

export interface HeroMission {
  eyebrow: string;
  lead: string;
  title: string;
  titleHighlight: string;
  challenge: string;
  explanation: string;
  position: string;
  proofLine: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

export interface HeroContent {
  identity: HeroIdentity;
  mission: HeroMission;
}

export interface MethodDriver {
  icon: string;
  title: string;
  text: string;
}

export interface MethodStageHandoff {
  output: string;
  leadsTo: string;
  detailCta: NavLink;
}

export interface ComparisonRow {
  label: string;
  values: [string, string, string];
  classes: [string, string, string];
}

export interface DecisionStageContent {
  kicker: string;
  title: string;
  intro: string;
  drivers: MethodDriver[];
  keyMessage: string;
  framework: {
    title: string;
    flowTitle: string;
    flowSubtitle: string;
    footer: string;
  };
  comparison: {
    title: string;
    columns: readonly ['Local', 'Hybrid', 'Cloud'];
    rows: ComparisonRow[];
    footer: string;
  };
  tradeoffs: {
    title: string;
    questions: { icon: string; text: string }[];
    footer: string;
  };
  handoff: MethodStageHandoff;
}

export interface BuildArea {
  icon: string;
  title: string;
  text: string;
}

export interface BuildProject {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  href: string;
  imagePath?: string;
  imageAlt?: string;
}

export interface BuildStageContent {
  kicker: string;
  title: string;
  intro: string;
  proofLine: string;
  ecosystemImage: string;
  ecosystemAlt: string;
  areas: BuildArea[];
  projects: BuildProject[];
  closingMessage: string;
  handoff: MethodStageHandoff;
}

export interface ApplicationCard {
  name: string;
  question: string;
  description: string;
  href: string;
  logoPath: string;
  imagePath: string;
  colorClass: string;
  linkLabel: string;
  whatItTests: string;
}

export interface TestStageContent {
  kicker: string;
  title: string;
  intro: string;
  note: string;
  applications: ApplicationCard[];
  nextCard: {
    name: string;
    description: string;
    linkLabel: string;
  };
  closingMessage: string;
  handoff: MethodStageHandoff;
}

export interface EvidenceMetricItem {
  label: string;
  value: string;
  unit?: string;
  statusClass?: 'positive' | 'neutral' | 'warn';
}

export interface EvidenceRunRecord {
  id: string;
  device: string;
  model: string;
  quantization: string;
  runtime: string;
  workload: string;
  metrics: EvidenceMetricItem[];
  limitation: string;
  sourceLabel: string;
  sourceHref: string;
}

export interface MeasureStageContent {
  kicker: string;
  title: string;
  intro: string;
  criteria: { icon: string; title: string; text: string }[];
  closingMessage: string;
  handoff: MethodStageHandoff;
}

export interface SelectedSystemItem {
  id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  href: string;
  badge: string;
}

export interface FieldNoteItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  href: string;
}

export interface AboutSignalContent {
  kicker: string;
  heading: string;
  summary: string;
  highlights: { label: string; detail: string }[];
  linkedinUrl: string;
  githubUrl: string;
}

export interface FinalCtaContent {
  kicker: string;
  title: string;
  body: string;
  loopSequence: string;
  payoff: string;
  consultation: {
    heading: string;
    body: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
  };
}

export interface LandingPageData {
  header: HeaderContent;
  hero: HeroContent;
  decisionStage: DecisionStageContent;
  buildStage: BuildStageContent;
  testStage: TestStageContent;
  measureStage: MeasureStageContent;
  selectedSystems: {
    kicker: string;
    title: string;
    description: string;
    systems: SelectedSystemItem[];
  };
  fieldNotes: {
    kicker: string;
    title: string;
    description: string;
    notes: FieldNoteItem[];
  };
  aboutSignal: AboutSignalContent;
  finalCta: FinalCtaContent;
}
