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
  /** Color accent identifier for visual differentiation */
  accent: 'teal' | 'blue' | 'violet';
}

/** Reference application data */
export interface ReferenceApplication {
  id: 'closedroom' | 'aura-finance';
  category: string;
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

/** Navigation item */
export interface NavItem {
  label: string;
  href: string;
}
