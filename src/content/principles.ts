/**
 * Guiding principles and future enablement areas.
 */
import type { Principle, Enablement, JourneyLink } from '../types/content';

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
    description: 'Source code, issues & <em>architecture roadmaps</em>',
    url: 'https://github.com/daniele21?tab=repositories',
    iconType: 'github',
  },
  {
    title: 'LinkedIn',
    description: 'Technical writing & <em>milestone updates</em>',
    url: 'https://www.linkedin.com/in/daniele-moltisanti/',
    iconType: 'linkedin',
  },
  {
    title: 'stAI tuned',
    description: 'Model evals, fine-tuning & <em>LLM research</em>',
    url: 'https://staituned.com',
    iconType: 'stai',
  },
  {
    title: 'Benchmarks',
    description: 'Device metrics, <em>latency & memory profiles</em>',
    url: 'https://github.com/daniele21/android-local-llm-harness',
    iconType: 'gauge',
  },
  {
    title: 'Architecture notes',
    description: 'Design docs & <em>architectural decision records</em>',
    url: 'https://github.com/daniele21/local-llm-server',
    iconType: 'book',
  },
  {
    title: 'Experiments',
    description: 'Prototypes, benchmarks & <em>exploratory logs</em>',
    url: 'https://staituned.com',
    iconType: 'flask',
  },
];
