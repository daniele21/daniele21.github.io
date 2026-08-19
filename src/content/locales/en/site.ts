import type { SiteMetadata, NavItem } from '../../../types/content';

export const siteMetadata: SiteMetadata = {
  title: 'Daniele Moltisanti — Local AI, On-device AI & AI Infrastructure',
  description:
    'Research, open-source infrastructure and product experiments for product-grade local AI: on-device inference, local LLM runtimes, Android AI, hybrid architectures and evidence from real devices.',
  canonical: 'https://daniele21.github.io/',
  socialTitle: 'Daniele Moltisanti — Product-grade Local AI',
  socialDescription:
    'Local AI, on-device inference and hybrid architectures explored through running software, real devices and public engineering evidence.',
  ogImage: 'https://daniele21.github.io/social-card.svg',
};

export const navigation: NavItem[] = [
  { label: 'Field Guide', href: 'local-ai' },
  { label: 'Lab', href: '#local-ai-lab' },
  {
    label: 'Projects',
    href: '#projects',
    children: [
      {
        label: 'Android Local LLM Harness',
        href: 'android-local-llm-harness',
        logoPath: 'images/harness/logo.svg',
      },
      {
        label: 'Local LLM Server',
        href: 'local-llm-server',
        logoPath: 'images/local-llm-server/logo.svg',
      },
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
    ],
  },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Research', href: '#research' },
];

export const socialLinks = {
  github: 'https://github.com/daniele21',
  linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
  staituned: 'https://staituned.com',
  email: 'danielemoltisanti@gmail.com',
};
