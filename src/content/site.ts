/**
 * Site-wide configuration: metadata, navigation, social links.
 * Centralised here so changes propagate across all components.
 */
import type { SiteMetadata, NavItem } from '../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti - Building Privacy-First AI Products',
  description:
    'I build reusable local AI and data-protection foundations across desktop and mobile, validated through privacy-first products like ClosedRoom, RedactGuard, and Aura Finance.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Building the infrastructure for privacy-first AI products',
  socialDescription:
    'Local inference, private speech recognition, document anonymization, and Android on-device AI, validated through real applications.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Vision', href: '#vision' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Applications', href: '#applications' },
  { label: 'Principles', href: '#principles' },
  { label: 'Evidence', href: '#credibility' },
  { label: 'Knowledge', href: '#journey' },
  { label: 'About', href: '#about' },
];


export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
