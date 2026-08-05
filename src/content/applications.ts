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
    tagline: 'Privacy-first meeting intelligence.',
    headline:
      'Record, transcribe and understand meetings without sending the room to the cloud.',
    description:
      'Local-first meeting capture, transcription and insights. No cloud. Your conversations stay in your control.',
    features: ['Transcription', 'Summaries', 'Action Items', 'Search'],
    validates: [
      'End-to-end local audio capture & LLM analysis',
      'Local ASR and LLM Server integration',
      'Installable desktop application packaging & UX',
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
    tagline: 'Privacy-first personal finance.',
    headline:
      'Understand personal finances without handing over the full financial history.',
    description:
      'Local AI for spending insights, forecasting and planning. Your financial data stays private.',
    features: ['Spending Insights', 'Forecasting', 'Budgets', 'Privacy First'],
    validates: [
      'Local-first financial data model',
      'Encrypted optional cloud backup',
      'Future proving ground for Android on-device AI',
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
