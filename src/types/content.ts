/**
 * Type definitions for the landing page structured content.
 * All project data, copy, and configuration are typed here
 * to ensure content integrity at build time.
 */

/** Controlled project maturity statuses */
export type ProjectStatus =
  | 'experimental'
  | 'active-development'
  | 'beta'
  | 'reference-ready'
  | 'production-ready';

/** Available site locales */
export type Locale = 'en' | 'it';

/** Infrastructure pillar data */
export interface Pillar {
  id: 'local-llm-server' | 'local-asr-server' | 'android-local-llm-harness';
  label: string;
  name: string;
  role: string;
  problem: string;
  description: string;
  capabilities: string[];
  strategicContribution: string;
  status: ProjectStatus;
  statusLabel: string;
  technologies: string[];
  repositoryUrl: string;
  architectureUrl?: string;
  testUrl?: string;
  pageUrl?: string;
  /** Color accent identifier for visual differentiation */
  accent: 'teal' | 'blue' | 'violet';
}

/** Evidence & Observability platform data */
export interface EvidencePlatform {
  id: 'traffic-monitoring-macos' | 'traffic-monitoring-android';
  platform: 'macOS' | 'Android';
  name: string;
  headline: string;
  description: string;
  principles: string[];
  currentCapabilities: string[];
  currentStatus: ProjectStatus;
  statusLabel: string;
  limitations: string[];
  logoPath: string;
  heroImage: string;
  pageUrl: string;
  repositoryUrl: string;
}

/** Evidence & Observability homepage section copy */
export interface EvidenceSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  principles: { title: string; description: string }[];
  platforms: EvidencePlatform[];
  bottomNote: string;
}

/** Reference application data */
export interface ReferenceApplication {
  id: 'closedroom' | 'redact-guard' | 'aura-finance';
  category: string;
  microLabel?: string;
  provesLine?: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  features: string[];
  validates: string[];
  learning: string;
  status: ProjectStatus;
  statusLabel: string;
  logoPath: string;
  pageUrl?: string;
  productUrl?: string;
  repositoryUrl?: string;
  currentRelationship: string;
  futureRelationship?: string;
}

/** Enablement / future possibility card */
export interface Enablement {
  title: string;
  description: string;
}

/** Guiding principle */
export interface Principle {
  title: string;
  description: string;
}

/** Building in public journey link */
export interface JourneyLink {
  title: string;
  description: string;
  url: string;
  iconType: 'github' | 'linkedin' | 'stai' | 'gauge' | 'book' | 'flask';
}

/** Professional credibility proof point */
export interface CredibilityProof {
  title: string;
  subtitle: string;
  description: string;
  iconType: 'leadership' | 'articles' | 'mentoring' | 'award';
  metric?: string;
  tag?: string;
  accent?: 'indigo' | 'cyan' | 'blue' | 'amber';
}

/** Site metadata for SEO */
export interface SiteMetadata {
  title: string;
  description: string;
  canonical: string;
  socialTitle: string;
  socialDescription: string;
  ogImage: string;
}

/** Sub-navigation item for dropdowns */
export interface NavSubItem {
  label: string;
  description?: string;
  href: string;
  badge?: string;
  icon?: string;
  logoPath?: string;
  isHarnessSvg?: boolean;
  external?: boolean;
}

/** Navigation item */
export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

/** Hero section copy */
export interface HeroContent {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  lede: string;
  ledeDetail: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
}

/** Ecosystem diagram copy */
export interface EcosystemMapContent {
  caption: string;
  hardwareTitle: string;
  hardwareSub: string;
  laptopTitle: string;
  laptopSub: string;
  mobileTitle: string;
  mobileSub: string;
  noCloudTitle: string;
  infraTitle: string;
  infraSub: string;
  llmServerTitle: string;
  llmServerSub: string;
  asrServerTitle: string;
  asrServerSub: string;
  harnessTitle: string;
  harnessSub: string;
  appTitle: string;
  appSub: string;
  closedRoomTitle: string;
  closedRoomSub: string;
  redactGuardTitle: string;
  redactGuardSub: string;
  auraFinanceTitle: string;
  auraFinanceSub: string;
}

/** Vision and Mission section copy */
export interface VisionMissionContent {
  visionKicker: string;
  visionTitlePrefix: string;
  visionTitleHighlight: string;
  missionKicker: string;
  missionTextPrefix: string;
  missionTextHighlight: string;
  missionTextSuffix: string;
  principlesBadges: { titleHighlight: string; textSuffix: string }[];
}

/** Dependency Card item in Why Local-First section */
export interface DependencyCard {
  index: string;
  title: string;
  painLabel: string;
  painText: string;
  riskLabel: string;
  riskText: string;
  solutionLabel: string;
  solutionText: string;
}

/** Why Local-First section copy */
export interface WhyLocalFirstContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitlePrefix: string;
  subtitleHighlight: string;
  subtitleSuffix: string;
  dependencyCards: DependencyCard[];
  summaryBoxTitle: string;
  summaryBoxBody: string;
}

/** Challenge item in Challenges section */
export interface ChallengeItem {
  number: string;
  title: string;
  description: string;
  icon?: string;
  accent?: 'blue' | 'teal' | 'violet' | 'indigo';
  tags?: string[];
}

/** Challenges section copy */
export interface ChallengesContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  introPrefix: string;
  introHighlight: string;
  introSuffix: string;
  items: ChallengeItem[];
}

/** Infrastructure section copy */
export interface InfrastructureSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  architectureLabel: string;
  nodes: { label: string; accent: string }[];
  protocolsText: string;
  outputAppsText: string;
}

/** Applications section copy */
export interface ApplicationsSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  bottomNote: string;
}

/** Credibility section copy */
export interface CredibilitySectionContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  introText: string;
}

/** Journey section copy */
export interface JourneySectionContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitlePrefix: string;
  subtitleHighlight: string;
}

/** Possibilities section copy */
export interface PossibilitiesSectionContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitlePrefix: string;
  subtitleHighlight: string;
}

/** About section copy */
export interface AboutContent {
  kicker: string;
  titlePrefix: string;
  titleHighlight1: string;
  titleMiddle: string;
  titleHighlight2: string;
  titleSuffix: string;
  paragraphs: string[];
  links: {
    linkedin: string;
    github: string;
    stai: string;
    speakingLabel: string;
    speakingSub: string;
  };
  photoAlt: string;
}

/** Collaboration section copy */
export interface CollaborationContent {
  kicker: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  email: string;
  location: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

/** Home Page aggregated section content */
export interface HomeContent {
  hero: HeroContent;
  ecosystemMap: EcosystemMapContent;
  visionMission: VisionMissionContent;
  whyLocalFirst: WhyLocalFirstContent;
  challenges: ChallengesContent;
  possibilities: PossibilitiesSectionContent;
  infrastructure: InfrastructureSectionContent;
  evidence: EvidenceSectionContent;
  applications: ApplicationsSectionContent;
  credibility: CredibilitySectionContent;
  journey: JourneySectionContent;
  about: AboutContent;
  collaboration: CollaborationContent;
}

/** Common UI micro-copy across site components */
export interface CommonContent {
  header: {
    brandName: string;
    brandRole?: string;
    brandAltLight: string;
    brandAltDark: string;
    themeToggleAriaLabel: string;
    menuToggleAriaLabel: string;
    backToPortfolioLabel: string;
  };
  footer: {
    brandName: string;
    brandAltLight: string;
    brandAltDark: string;
    copyrightTemplate: string;
  };
  pillarCard: {
    problemLabel: string;
    solutionLabel: string;
    exploreSummary: string;
    pageBtnLabel: string;
    repoLinkLabel: string;
  };
  applicationCard: {
    provesBadgeLabel: string;
    disclosureSummary: string;
    deepDiveBtnLabel: string;
    repoLinkLabel: string;
  };
  imageZoomModal: {
    zoomInTitle: string;
    zoomOutTitle: string;
    resetTitle: string;
    closeTitle: string;
    openOriginalText: string;
  };
}

/** Comprehensive Root Content Dictionary */
export interface RootContent {
  site: SiteMetadata;
  navigation: NavItem[];
  socialLinks: Record<string, string>;
  home: HomeContent;
  common: CommonContent;
  pillars: Pillar[];
  applications: ReferenceApplication[];
  principles: Principle[];
  journeyLinks: JourneyLink[];
  enablements: Enablement[];
  credibilityProofs: CredibilityProof[];
}

