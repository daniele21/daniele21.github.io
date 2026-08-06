/**
 * Reference application data.
 * These validate the infrastructure pillars against real product constraints.
 */
import type { ReferenceApplication } from '../types/content';

export const applications: ReferenceApplication[] = [
  {
    id: 'closedroom',
    category: 'PRIVATE CONVERSATIONS',
    name: 'ClosedRoom',
    tagline: 'Privacy-first <strong>meeting intelligence</strong>.',
    headline:
      'Record, transcribe and analyze meetings <em>without sending audio to the cloud.</em>',
    description:
      'Local-first meeting capture, Whisper transcription and structured insights. <strong>Your conversations stay 100% on-device.</strong>',
    features: ['Transcription', 'Summaries', 'Action Items', 'Search'],
    validates: [
      'Local <strong>ASR & private speech recognition</strong>',
      'Local <strong>LLM analysis & structured insights</strong>',
      'Installable <strong>desktop app packaging & offline workflows</strong>',
    ],
    learning:
      'ClosedRoom demonstrates that sensitive voice conversations can be recorded, transcribed, and synthesized entirely on-device without cloud dependencies.',
    status: 'active-development',
    statusLabel: 'ACTIVE',
    logoPath: '/images/closedroom/logo.png',
    repositoryUrl: 'https://github.com/daniele21/local-asr-server',
    currentRelationship:
      'Meeting audio → Local ASR Server → Transcript → Local LLM Server → Summary and actions',
  },
  {
    id: 'redact-guard',
    category: 'SENSITIVE DOCUMENTS',
    name: 'RedactGuard',
    tagline: 'Local <strong>document anonymization & PII protection</strong>.',
    headline:
      'Detect personal information, review redactions, and export safer documents <em>entirely locally.</em>',
    description:
      'A local document-anonymisation workflow that detects PII via local LLMs, provides human-in-the-loop review, and selectively redacts sensitive data. <strong>Data minimisation built into the architecture.</strong>',
    features: ['Doc Intelligence', 'PII Detection', 'Human Review', 'Selective Redaction', 'Safe Export'],
    validates: [
      'Local <strong>document intelligence & PII detection</strong>',
      'Human review & <strong>selective AI redaction</strong>',
      'Data minimisation & <strong>safe document portability</strong>',
    ],
    learning:
      'RedactGuard demonstrates that privacy-first AI goes beyond offline processing: it gives users explicit control and data minimisation before sharing documents.',
    status: 'active-development',
    statusLabel: 'ACTIVE',
    logoPath: '/images/redact-guard/logo.png',
    repositoryUrl: 'https://github.com/daniele21/redact-guard',
    currentRelationship:
      'PDF → Docling Markdown → Local LLM PII Detection → User Review → Selective Redaction → Anonymized Export',
  },
  {
    id: 'aura-finance',
    category: 'PERSONAL FINANCIAL DATA',
    name: 'Aura Finance',
    tagline: 'Privacy-first <strong>personal finance</strong>.',
    headline:
      'Gain deep spending insights <em>without exposing your financial history.</em>',
    description:
      'Local AI for transaction categorization, forecasting and budget planning. <strong>Your financial data never leaves your device.</strong>',
    features: ['Spending Insights', 'Forecasting', 'Budgets', 'Privacy First'],
    validates: [
      '<strong>Privacy-first product design</strong> & local data model',
      'Mobile UX & <em>local storage sovereignty</em>',
      'Proving ground for <em>Android on-device AI integration</em>',
    ],
    learning:
      'Aura Finance demonstrates data sovereignty, keeping financial records strictly under the user’s control with optional encrypted sync.',
    status: 'experimental',
    statusLabel: 'IN PROGRESS',
    logoPath: '/images/aura/logo.png',
    repositoryUrl: 'https://github.com/daniele21/personal-budget',
    currentRelationship: 'Local-first financial data and optional encrypted backup',
    futureRelationship:
      'On-device classification and summarization through the Android harness',
  },
];
