import type { SiteMetadata, NavItem } from '../../../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti - Local AI from Strategy to Systems',
  description:
    'Exploring where AI should run, building local AI infrastructure across desktop and mobile, testing it through real applications, and measuring how it performs in the real world.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Local AI first ≠ Local AI only',
  socialDescription:
    'Strategy, infrastructure, real-world applications and measurement for deciding when Local, Hybrid or Cloud AI makes sense.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Strategy', href: '#strategy' },
  {
    label: 'Architecture',
    href: '#infrastructure',
    children: [
      {
        label: 'Korgis',
        href: 'local-llm-server',
        logoPath: 'images/local-llm-server/logo.png',
      },
      {
        label: 'Android Local LLM Harness',
        href: 'android-local-llm-harness',
        logoPath: 'images/harness/logo.png',
      },
      {
        label: 'Local ASR Server',
        href: 'local-asr-server',
      },
    ],
  },
  {
    label: 'Applications',
    href: '#applications',
    children: [
      {
        label: 'RedactGuard',
        href: 'redact-guard',
        logoPath: 'images/redact-guard/logo.png',
      },
      {
        label: 'Aura',
        href: 'aura-finance',
        logoPath: 'images/aura/logo.png',
      },
      {
        label: 'ClosedRoom',
        href: 'closedroom',
        logoPath: 'images/closedroom/logo.png',
      },
    ],
  },
  {
    label: 'Observability',
    href: '#evidence',
    children: [
      {
        label: 'Performance Lab',
        href: 'performance-lab',
      },
      {
        label: 'Traffic Monitoring (macOS)',
        href: 'traffic-monitoring',
        logoPath: 'images/traffic-monitoring/shield.png',
      },
      {
        label: 'Traffic Monitoring (Android)',
        href: 'traffic-monitoring-android',
        logoPath: 'images/traffic-monitoring-android/shield.png',
      },
    ],
  },
  { label: 'About Me', href: 'about' },
];

export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
