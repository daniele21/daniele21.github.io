import type { SiteMetadata, NavItem } from '../../../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti - GenAI, Local AI & AI Architecture',
  description:
    'I help teams decide where AI should run and prove it works across Local, Hybrid and Cloud, based on privacy, control, performance and real product constraints.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Local AI first ≠ Local AI only',
  socialDescription:
    'GenAI systems, Local AI and evidence-led architecture decisions across Local, Hybrid and Cloud.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Where should AI run?', href: '#strategy', icon: 'compass' },
  { label: 'What does it take?', href: '#infrastructure', icon: 'cpu' },
  { label: 'Does it work?', href: '#applications', icon: 'apps' },
  { label: 'Is it good enough?', href: '#evidence', icon: 'chart' },
  { label: 'Who am I?', href: 'about', icon: 'user' },
];

export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
