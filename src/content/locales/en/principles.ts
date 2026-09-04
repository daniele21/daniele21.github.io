import type { Principle, Enablement, JourneyLink } from '../../../types/content';

export const principles: Principle[] = [
  { title: '<strong>Local</strong> by default', description: 'Compute happens on your device, by default.' },
  { title: '<strong>Privacy</strong> by architecture', description: 'Privacy is designed in, not bolted on.' },
  { title: '<strong>Observable</strong> & measurable', description: 'We instrument, benchmark and share results.' },
  { title: '<strong>Reusable</strong> across apps', description: 'Build once. Use everywhere. Composability first.' },
  { title: '<strong>Evidence</strong> over claims', description: 'We ship, test and publish evidence.' },
];

export const enablements: Enablement[] = [
  { title: 'Meeting intelligence', description: 'Private, local summaries & <em>action items</em> from audio.' },
  { title: 'Personal finance', description: 'Local transaction analysis, <em>budget forecasting</em> & planning.' },
  { title: 'Document analysis', description: 'Query confidential documents without <em>cloud exposure</em>.' },
  { title: 'Professional assistants', description: 'Domain-aware copilots that keep <em>workflows private</em>.' },
  { title: 'Personal knowledge', description: 'Your notes, custom models, and <em>data sovereignty</em>.' },
  { title: 'Offline productivity', description: 'Work anywhere without <em>sacrificing privacy</em>.' },
  { title: 'Sensitive-data workflows', description: 'Process <em>confidential data</em> safely on local hardware.' },
  { title: 'Mobile AI applications', description: 'Powerful on-device experiences, <em>completely offline-first</em>.' },
];

export const journeyLinks: JourneyLink[] = [
  {
    title: 'GitHub',
    description: 'The code and technical implementation: repositories, roadmaps, and open tools.',
    url: 'https://github.com/daniele21?tab=repositories',
    iconType: 'github',
  },
  {
    title: 'LinkedIn',
    description: 'Ideas, architecture trade-offs, experiments, and engineering lessons in public.',
    url: 'https://www.linkedin.com/in/daniele-moltisanti/',
    iconType: 'linkedin',
  },
];
