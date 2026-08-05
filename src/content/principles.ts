/**
 * Guiding principles and future enablement areas.
 */
import type { Principle, Enablement, JourneyLink } from '../types/content';

export const principles: Principle[] = [
  { title: 'Local by default', description: 'Compute happens on your device, by default.' },
  { title: 'Privacy by architecture', description: 'Privacy is designed in, not bolted on.' },
  { title: 'Observable and measurable', description: 'We instrument, benchmark and share results.' },
  { title: 'Reusable across applications', description: 'Build once. Use everywhere. Composability first.' },
  { title: 'Evidence over claims', description: 'We ship, test and publish evidence.' },
];

export const enablements: Enablement[] = [
  { title: 'Meeting intelligence', description: 'Private, local summaries and insights from audio.' },
  { title: 'Personal finance', description: 'Local analysis, forecasting and transaction planning.' },
  { title: 'Document analysis', description: 'Understand and extract data without default cloud exposure.' },
  { title: 'Professional assistants', description: 'Domain-aware copilots that keep workflows private.' },
  { title: 'Personal knowledge', description: 'Your notes, your models, your complete control.' },
  { title: 'Offline productivity', description: 'Work anywhere without compromising sensitive privacy.' },
  { title: 'Sensitive-data workflows', description: 'Handle confidential data safely without leaving the device.' },
  { title: 'Mobile AI applications', description: 'Powerful experiences on-device, completely offline-first.' },
];

export const journeyLinks: JourneyLink[] = [
  {
    title: 'GitHub',
    description: 'Source code, issues and roadmaps',
    url: 'https://github.com/daniele21?tab=repositories',
    iconType: 'github',
  },
  {
    title: 'LinkedIn',
    description: 'Architecture notes and milestones',
    url: 'https://www.linkedin.com/in/daniele-moltisanti/',
    iconType: 'linkedin',
  },
  {
    title: 'stAI tuned',
    description: 'Model evals, tuning and experiments',
    url: 'https://staituned.com',
    iconType: 'stai',
  },
  {
    title: 'Benchmarks',
    description: 'Device evidence, latency and memory',
    url: 'https://github.com/daniele21/android-local-llm-harness',
    iconType: 'gauge',
  },
  {
    title: 'Architecture notes',
    description: 'Design docs and decision records',
    url: 'https://github.com/daniele21/local-llm-server',
    iconType: 'book',
  },
  {
    title: 'Experiments',
    description: 'Prototypes and research logs',
    url: 'https://staituned.com',
    iconType: 'flask',
  },
];
