import type { SiteMetadata, NavItem } from '../../../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti — Product-grade Local AI',
  description:
    'Exploring what it takes to make Local AI product-ready by building reusable infrastructure, measuring it on real hardware and testing it in real products.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Daniele Moltisanti — Product-grade Local AI',
  socialDescription:
    'Build the infrastructure. Measure it on real hardware. Apply it to real products. Publish what survives.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Approach', href: '#approach' },
  { label: 'Work', href: '#work' },
  { label: 'Questions', href: '#findings' },
  { label: 'Field Guide', href: 'local-ai' },
  { label: 'Writing', href: '#writing' },
];

export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
