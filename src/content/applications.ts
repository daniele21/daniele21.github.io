/**
 * Reference application data.
 * These validate the infrastructure pillars against real product constraints.
 */
import type { ReferenceApplication } from '../types/content';

export const applications: ReferenceApplication[] = [
  {
    id: 'closedroom',
    category: 'PRIVATE MEETING INTELLIGENCE',
    name: 'ClosedRoom',
    tagline: 'Privacy-first <strong>meeting intelligence</strong>.',
    headline:
      'Record, transcribe and analyze meetings <em>without sending audio to the cloud.</em>',
    description:
      'Local-first meeting capture, Whisper transcription and structured insights. <strong>Your conversations stay 100% on-device.</strong>',
    features: ['Transcription', 'Summaries', 'Action Items', 'Search'],
    validates: [
      'End-to-end <strong>local audio capture & LLM analysis</strong>',
      'Integration between <em>Local ASR</em> and <em>Local LLM Server</em>',
      'Installable <strong>desktop app packaging & user experience</strong>',
    ],
    learning:
      'ClosedRoom forces the infrastructure to work as a product, not only as two independent servers.',
    status: 'active-development',
    statusLabel: 'ACTIVE',
    logoPath: '/images/closedroom/logo.png',
    repositoryUrl: 'https://github.com/daniele21/local-asr-server',
    currentRelationship:
      'Meeting audio → Local ASR Server → Transcript → Local LLM Server → Summary and actions',
  },
  {
    id: 'aura-finance',
    category: 'LOCAL-FIRST PERSONAL FINANCE',
    name: 'Aura Finance',
    tagline: 'Privacy-first <strong>personal finance</strong>.',
    headline:
      'Gain deep spending insights <em>without exposing your financial history.</em>',
    description:
      'Local AI for transaction categorization, forecasting and budget planning. <strong>Your financial data never leaves your device.</strong>',
    features: ['Spending Insights', 'Forecasting', 'Budgets', 'Privacy First'],
    validates: [
      '<strong>Local-first financial data model</strong> & local reasoning',
      'Zero-knowledge <em>encrypted optional cloud sync</em>',
      'Proving ground for <em>Android on-device AI</em> integration',
    ],
    learning:
      'Aura Finance tests whether privacy-first choices can remain understandable and useful in an everyday consumer product.',
    status: 'experimental',
    statusLabel: 'IN PROGRESS',
    logoPath: '/images/aura/logo.png',
    repositoryUrl: 'https://github.com/daniele21/personal-budget',
    currentRelationship: 'Local-first financial data and optional encrypted backup',
    futureRelationship:
      'On-device classification and summarization through the Android harness',
  },
];
