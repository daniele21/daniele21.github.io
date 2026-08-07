/**
 * Site-wide configuration: metadata, navigation, social links.
 * Centralised here so changes propagate across all components.
 */
import type { SiteMetadata, NavItem } from '../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti - Product-Grade Local AI',
  description:
    'Researching product-grade local AI: when open-weight models and local runtimes can reduce closed-model dependency, protect sensitive data, and give products more control over lifecycle, cost and runtime.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Local-first AI: more control over models, data and runtime',
  socialDescription:
    'Research, experiments and open-source infrastructure for moving suitable AI workloads from closed-only APIs to local-first architectures.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Why local-first', href: '#why-local-first' },
  {
    label: 'Infrastructure',
    href: '#infrastructure',
    children: [
      {
        label: 'Android Local LLM Harness',
        href: 'android-local-llm-harness',
        logoPath: 'images/harness/logo.svg',
      },
    ],
  },
  {
    label: 'Applications',
    href: '#applications',
    children: [
      {
        label: 'ClosedRoom',
        href: 'closedroom',
        logoPath: 'images/closedroom/logo.png',
      },
      {
        label: 'RedactGuard',
        href: 'redact-guard',
        logoPath: 'images/redact-guard/logo.png',
      },
      {
        label: 'Aura Finance',
        href: 'aura-finance',
        logoPath: 'images/aura/logo.png',
      },
    ],
  },
  { label: 'Track record', href: '#credibility' },
  { label: 'Knowledge', href: '#journey' },
  { label: 'About', href: '#about' },
];


export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
