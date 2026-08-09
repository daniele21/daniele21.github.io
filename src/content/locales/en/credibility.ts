import type { CredibilityProof } from '../../../types/content';

export const credibilityIntro = {
  quote:
    'My local-first work is independent, but it builds on years spent designing, evaluating, and scaling AI systems in complex organisations.',
};

export const credibilityProofs: CredibilityProof[] = [
  {
    title: 'AI Technical Leadership',
    subtitle: 'Prototype → production',
    description:
      'Experience leading AI initiatives in complex organisations, turning experiments into adopted, governed, and scaled systems.',
    iconType: 'leadership',
    metric: 'Enterprise',
    tag: 'Scale & Governance',
  },
  {
    title: 'Articles Published',
    subtitle: 'Research & insights',
    description:
      'Long-form research, model evaluations, and practical LLM insights shared with the technical community through stAI tuned.',
    iconType: 'articles',
    metric: '80+',
    tag: 'Research & Insights',
  },
  {
    title: 'AI Projects Reviewed',
    subtitle: 'Technical mentoring',
    description:
      'Hands-on feedback, architecture guidance, and mentoring for emerging AI engineers and technical teams.',
    iconType: 'mentoring',
    metric: '150+',
    tag: 'Engineering Mentorship',
  },
  {
    title: 'Nova Talent',
    subtitle: 'Recognition',
    description:
      'Selected by Nova Talent among emerging Italian talent driving innovation and technology leadership.',
    iconType: 'award',
    metric: 'Top Nova 111',
    tag: 'Award & Recognition',
  },
];
