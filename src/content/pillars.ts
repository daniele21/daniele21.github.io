/**
 * Infrastructure pillar data.
 * Order: Local LLM → Local ASR → Android Harness (desktop reasoning → speech → mobile).
 */
import type { Pillar } from '../types/content';

export const pillars: Pillar[] = [
  {
    id: 'local-llm-server',
    label: 'DESKTOP REASONING',
    name: 'Local LLM Server',
    role: 'High-performance <strong>local inference server</strong> with model lifecycle, dynamic routing and telemetry.',
    problem:
      'Local applications should not need to couple product logic to <em>inference backend complexities</em>, model formats or runtime processes.',
    description:
      'Provides an <strong>OpenAI-compatible API</strong> across local backends such as <em>GGUF</em> and <em>Apple Silicon MLX</em>, managing resident runtimes, configuration and telemetry.',
    capabilities: [
      '<strong>OpenAI-compatible</strong> local API',
      '<strong>GGUF</strong> and <em>Apple Silicon (MLX)</em> backends',
      '<strong>Runtime model switching</strong> & multi-residency',
      'Web UI, logs and <em>real-time telemetry</em>',
    ],
    strategicContribution:
      'It separates product experience from inference complexity, allowing multiple applications to reuse the same local reasoning layer.',
    status: 'active-development',
    statusLabel: 'ACTIVE',
    technologies: ['Rust', 'gRPC', 'Quantization', 'Tooling'],
    repositoryUrl: 'https://github.com/daniele21/local-llm-server',
    accent: 'teal',
  },
  {
    id: 'local-asr-server',
    label: 'PRIVATE SPEECH',
    name: 'Local ASR Server',
    role: 'Privacy-first <strong>speech recognition server</strong> optimized for sub-second latency and accuracy.',
    problem:
      'Meeting audio is <em>highly sensitive</em>, yet speech products routinely offload raw recordings to remote cloud infrastructure.',
    description:
      'Handles <strong>microphone & system audio capture</strong>, local session storage, and <em>Whisper transcription</em> on Apple Silicon with zero cloud calls.',
    capabilities: [
      '<strong>Microphone & system-audio</strong> capture',
      'Local <strong>Whisper transcription</strong> with VAD',
      '<strong>OpenAI-compatible</strong> audio endpoint',
      'Structured <em>session storage & diarization</em>',
    ],
    strategicContribution:
      'It creates a private speech-to-text foundation that can feed local reasoning workflows without making remote transcription the default.',
    status: 'active-development',
    statusLabel: 'ACTIVE',
    technologies: ['Whisper', 'VAD', 'Streaming', 'Diarization'],
    repositoryUrl: 'https://github.com/daniele21/local-asr-server',
    accent: 'blue',
  },
  {
    id: 'android-local-llm-harness',
    label: 'ON-DEVICE MOBILE AI',
    name: 'Android Local LLM Harness',
    role: 'On-device <strong>LLM runtime harness</strong> for Android apps with strict resource control.',
    problem:
      'Running LLMs on Android demands <em>rigorous resource management</em>: model integrity, memory bounds, prompt cancellation and telemetry.',
    description:
      'Reusable runtime for embedding <strong>GGUF models</strong> in native <em>Kotlin</em> and <em>Capacitor</em> Android applications with lifecycle control and diagnostics.',
    capabilities: [
      '<strong>GGUF import</strong> & cryptographic integrity check',
      'Managed <strong>model and context lifecycle</strong>',
      'Real-time <strong>streaming & cancellation</strong>',
      'Device <em>memory, thermal & latency benchmarks</em>',
    ],
    strategicContribution:
      'It extends the privacy-first stack from desktop to mobile and aims to reduce the repeated engineering required to add local models to Android products.',
    status: 'experimental',
    statusLabel: 'IN PROGRESS',
    technologies: ['Kotlin', 'ML Runtime', 'Memory', 'Offline'],
    repositoryUrl: 'https://github.com/daniele21/android-local-llm-harness',
    pageUrl: '/android-local-llm-harness',
    accent: 'violet',
  },
];
