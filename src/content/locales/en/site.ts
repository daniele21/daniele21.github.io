import type { SiteMetadata, NavItem } from '../../../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti - AI Systems, Product, Architecture & Evaluation',
  description:
    'I build AI systems end to end: from problem framing and architecture to reusable infrastructure, real products and reproducible evidence.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'AI systems from problem to evidence',
  socialDescription:
    'Strategy, product, architecture, engineering and evaluation across Local, Hybrid and Cloud AI systems.',
  ogImage: 'https://daniele21.github.io/social-card.png',
};

export const navigation: NavItem[] = [
  { label: 'Method', href: '#strategy', icon: 'compass' },
  { label: 'Systems', href: '#infrastructure', icon: 'cpu' },
  { label: 'Products', href: '#applications', icon: 'apps' },
  { label: 'Experiments', href: 'experiments', icon: 'chart' },
  { label: 'About', href: 'about', icon: 'user' },
];

export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
