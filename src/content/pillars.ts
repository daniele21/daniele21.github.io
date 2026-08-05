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
    role: 'High-performance local inference server with model lifecycle, routing and telemetry.',
    problem:
      'Local applications should not need to couple their product logic to every inference backend, model format or runtime process.',
    description:
      'Provides an OpenAI-compatible API across local backends such as GGUF and MLX, managing model lifecycle, resident runtimes and telemetry.',
    capabilities: [
      'OpenAI-compatible local API',
      'GGUF and Apple Silicon backends',
      'Runtime model switching',
      'Multiple resident models',
      'Web UI, logs and telemetry',
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
    role: 'Privacy-first speech recognition server optimized for accuracy and latency.',
    problem:
      'Meeting and voice data is highly sensitive, yet speech products often require sending recordings to remote infrastructure.',
    description:
      'Handles microphone and system audio capture, local session storage and Whisper transcription on Apple Silicon.',
    capabilities: [
      'Microphone and system-audio capture',
      'Local Whisper transcription',
      'Structured session storage',
      'OpenAI-compatible transcription endpoint',
      'Reusable desktop integration',
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
    role: 'On-device LLM runtime harness for Android apps with tight resource control.',
    problem:
      'Running an LLM on Android requires more than native bindings: applications need model integrity, lifecycle, memory handling, cancellation, telemetry and device evidence.',
    description:
      'Reusable runtime for embedding GGUF models in native and Capacitor Android applications with explicit lifecycle and diagnostics.',
    capabilities: [
      'GGUF import and integrity verification',
      'Model and context lifecycle',
      'Streaming and cancellation',
      'Memory and thermal observations',
      'Health checks and performance benchmarks',
    ],
    strategicContribution:
      'It extends the privacy-first stack from desktop to mobile and aims to reduce the repeated engineering required to add local models to Android products.',
    status: 'experimental',
    statusLabel: 'IN PROGRESS',
    technologies: ['Kotlin', 'ML Runtime', 'Memory', 'Offline'],
    repositoryUrl: 'https://github.com/daniele21/android-local-llm-harness',
    accent: 'violet',
  },
];
