/**
 * localLlmServer.ts
 * Structured content dictionary for the Local LLM Server deep-dive page.
 */

export interface LocalLlmProblem {
  id: number;
  title: string;
  description: string;
}

export interface LocalLlmPrinciple {
  title: string;
  subtitle: string;
  color: 'blue' | 'teal' | 'violet';
}

export interface LocalLlmSurface {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface LocalLlmBackend {
  backend: string;
  format: string;
  execution: string;
  role: string;
}

export interface LocalLlmData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    keyPills: string[];
    badges: string[];
    imageHero: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  mission: {
    eyebrow: string;
    statement: string;
    lede: string;
    principles: LocalLlmPrinciple[];
  };
  problems: {
    eyebrow: string;
    title: string;
    sub: string;
    items: LocalLlmProblem[];
  };
  runtimeFlow: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: Array<{ step: string; title: string; desc: string }>;
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: Array<{ label: string; detail: string }>;
  };
  surfaces: {
    eyebrow: string;
    title: string;
    sub: string;
    items: LocalLlmSurface[];
    securityNotice: string;
  };
  backends: {
    eyebrow: string;
    title: string;
    sub: string;
    matrix: LocalLlmBackend[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    sub: string;
    image: string;
    details: Array<{ title: string; description: string }>;
  };
  codePreview: {
    eyebrow: string;
    title: string;
    sub: string;
    language: string;
    code: string;
  };
  maturity: {
    eyebrow: string;
    title: string;
    sub: string;
    availableToday: string[];
    importantLimits: string[];
  };
  cta: {
    kicker: string;
    headline: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}

export const localLlmServerData: LocalLlmData = {
  meta: {
    title: 'Local LLM Server - Product-Grade Local AI Infrastructure',
    description:
      'An OpenAI-compatible local inference layer with explicit model lifecycle, multi-model routing, GGUF and Apple Silicon MLX backends, and live operational visibility.',
  },
  hero: {
    eyebrow: 'DESKTOP LOCAL AI INFRASTRUCTURE',
    titleLine1: 'Run local models.',
    titleLine2: 'Ship reliable products.',
    lede:
      'Local LLM Server exposes GGUF and MLX runtimes through an OpenAI-compatible API, with explicit model lifecycle, routing, concurrency and real-time telemetry.',
    keyPills: ['OpenAI-compatible', 'Multi-model runtime', 'GGUF + MLX'],
    badges: ['Active development', 'v0.8.x', 'macOS & Linux'],
    imageHero: 'images/local-llm-server/chat-studio.png',
    primaryCta: { label: 'See the runtime flow', href: '#runtime' },
    secondaryCta: { label: 'Explore GitHub ↗', href: 'https://github.com/daniele21/local-llm-server' },
  },
  mission: {
    eyebrow: 'STRATEGIC ALIGNMENT',
    statement: 'Make local inference reusable, observable and app-ready.',
    lede:
      'Product code should depend on a stable local AI boundary, not on model file paths, engine backend processes or application-specific wrapper scripts.',
    principles: [
      {
        title: 'Explicit',
        subtitle: 'Model identity, configuration and dynamic routing are explicit and reproducible across environments.',
        color: 'blue',
      },
      {
        title: 'Observable',
        subtitle: 'Server health, resident state, token generation timings and logs remain fully inspectable.',
        color: 'teal',
      },
      {
        title: 'Reusable',
        subtitle: 'Multiple desktop applications can depend on the exact same OpenAI-compatible local reasoning layer.',
        color: 'violet',
      },
    ],
  },
  problems: {
    eyebrow: 'THE INFRASTRUCTURE GAP',
    title: 'Why running a local model alone is not enough',
    sub:
      'Executing model weights is straightforward. Turning open-weight models into a stable execution layer for production software requires solving core system engineering problems.',
    items: [
      {
        id: 1,
        title: 'Backend coupling',
        description:
          'Application logic directly inherits inference engine quirks, quantization formats, and binary execution flags.',
      },
      {
        id: 2,
        title: 'Lifecycle ownership',
        description:
          'Models must be resolved, completeness-checked, loaded into VRAM, drained of active requests, and unloaded safely without memory leaks.',
      },
      {
        id: 3,
        title: 'Runtime coordination',
        description:
          'Running multiple resident models simultaneously requires explicit routing, admission control, and hardware resource concurrency limits.',
      },
      {
        id: 4,
        title: 'Opaque operation',
        description:
          'Product teams need request evaluation timings, streaming health indicators, and log tracing beyond raw stdout console output.',
      },
    ],
  },
  runtimeFlow: {
    eyebrow: 'STABLE EXECUTION BOUNDARY',
    title: 'How applications interact with Local LLM Server',
    sub:
      'Applications integrate once using the standardized OpenAI protocol. Models, backend engines, and quantization choices evolve independently behind the runtime boundary.',
    steps: [
      {
        step: '01',
        title: 'Desktop application request',
        desc: 'Product code issues a standard /v1/chat/completions HTTP request.',
      },
      {
        step: '02',
        title: 'OpenAI API compatibility layer',
        desc: 'Request parameters, prompt templates, and streaming flags are parsed and validated.',
      },
      {
        step: '03',
        title: 'Model key & routing lookup',
        desc: 'The server resolves the model key to a configured GGUF or MLX definition.',
      },
      {
        step: '04',
        title: 'Resident runtime lease',
        desc: 'Acquires a concurrency lease on the active model, preventing unsafe unloads.',
      },
      {
        step: '05',
        title: 'Backend engine execution',
        desc: 'Executes inference via in-process llama_cpp/mlx or managed server processes.',
      },
      {
        step: '06',
        title: 'Response & SSE stream',
        desc: 'Delivers structured JSON output or low-latency Server-Sent Events stream to the client.',
      },
    ],
  },
  lifecycle: {
    eyebrow: 'MODEL & RUNTIME LIFECYCLE',
    title: 'Deterministic model lifecycle management',
    sub:
      'Downloaded does not mean resident, and resident does not mean default route. Lifecycle state changes are managed deterministically.',
    steps: [
      {
        label: 'Artifact Resolution',
        detail: 'Discovers models from built-in definitions, user configs, LM Studio caches, or Hugging Face hubs.',
      },
      {
        label: 'Completeness Check',
        detail: 'Validates file existence, SHA-256 integrity checksums, and quantization compatibility before loading.',
      },
      {
        label: 'Engine Initialization',
        detail: 'Allocates Metal/VRAM buffers, context windows, and threads for the target backend.',
      },
      {
        label: 'Resident Lease',
        detail: 'Maintains active client leases to guard against premature model unloads during active inference.',
      },
      {
        label: 'Graceful Drain & Unload',
        detail: 'Drains inflight HTTP requests before releasing memory back to the host system.',
      },
    ],
  },
  surfaces: {
    eyebrow: 'OPERATIONAL EVIDENCE',
    title: 'Korgis: Inspectable runtime console',
    sub:
      'Korgis is the bundled operational web console that makes the runtime server visible, testable, and easier to integrate.',
    items: [
      {
        id: 'chat-studio',
        title: 'Chat Studio',
        description: 'Test prompts, stream responses, configure inference parameters, and inspect structured outputs.',
        image: 'images/local-llm-server/chat-studio.png',
      },
      {
        id: 'models-config',
        title: 'Models & Configuration',
        description: 'Inspect resident model leases, discover local GGUF/MLX registries, and adjust backend context sizes.',
        image: 'images/local-llm-server/models-config.png',
      },
      {
        id: 'server-logs',
        title: 'Telemetry & Server Diagnostics',
        description: 'Follow prompt evaluation latency, generation tok/s throughput, and detailed runtime process logs.',
        image: 'images/local-llm-server/server-logs.png',
      },
      {
        id: 'integration-example',
        title: 'Integration Examples & OpenAPI Contract',
        description: 'Move from inspection to application code with copy-ready OpenAI client SDK code and live Swagger specs.',
        image: 'images/local-llm-server/integration-example.png',
      },
    ],
    securityNotice:
      'Loopback Binding Notice: Local LLM Server binds to 127.0.0.1 by default. Administrative API endpoints are opt-in.',
  },
  backends: {
    eyebrow: 'ENGINE FLEXIBILITY',
    title: 'Multi-backend engine matrix',
    sub:
      'Switch between optimized execution backends based on hardware architecture and model capabilities.',
    matrix: [
      {
        backend: 'llama_cpp',
        format: 'GGUF',
        execution: 'In-process (C++ bindings)',
        role: 'Text generation, structured reasoning & quantized GGUF models',
      },
      {
        backend: 'mlx',
        format: 'MLX',
        execution: 'In-process (Apple Metal)',
        role: 'Ultra-fast Apple Silicon text inference with Metal memory unified architecture',
      },
      {
        backend: 'llama_server',
        format: 'GGUF + Projector',
        execution: 'Managed process',
        role: 'Multimodal and audio-capable GGUF models requiring separate server process',
      },
      {
        backend: 'mlx_vlm_server',
        format: 'MLX VLM',
        execution: 'Managed process',
        role: 'Apple Silicon vision-language model inference via python MLX-VLM package',
      },
    ],
  },
  architecture: {
    eyebrow: 'TECHNICAL SYSTEM ARCHITECTURE',
    title: 'Decoupled system architecture',
    sub:
      'FastAPI boundary, ModelRuntimeManager state coordination, and pluggable backend engine adapters.',
    image: 'images/local-llm-server/architecture.png',
    details: [
      {
        title: 'FastAPI Public Boundary',
        description: 'Handles HTTP CORS, OpenAI API route matching, request validation, and SSE response streaming.',
      },
      {
        title: 'ModelRuntimeManager',
        description: 'Central orchestrator managing built-in and user model registry merges, lease admission, and state.',
      },
      {
        title: 'Process Draining & Bounded Shutdown',
        description: 'Managed child backend server processes are monitored with SIGTERM/SIGKILL bounded timeouts.',
      },
      {
        title: 'Telemetry & Metrics Collection',
        description: 'Tracks prompt evaluation milliseconds, generation speed (tok/s), and active memory footprint.',
      },
    ],
  },
  codePreview: {
    eyebrow: 'DEVELOPER BOUNDARY',
    title: 'Standard OpenAI Python SDK integration',
    sub: 'Point any OpenAI-compatible client library to the local server port.',
    language: 'python',
    code: `from openai import OpenAI

# Connect to Local LLM Server running on localhost
client = OpenAI(
    base_url="http://127.0.0.1:1235/v1",
    api_key="local", # Any non-empty string
)

# Execute streaming chat completion
response = client.chat.completions.create(
    model="nemotron-nano-4b-q8",
    messages=[
        {"role": "user", "content": "Extract decisions and action items in JSON."}
    ],
    stream=True,
)

for chunk in response:
    content = chunk.choices[0].delta.content or ""
    print(content, end="", flush=True)`,
  },
  maturity: {
    eyebrow: 'TRUST BOUNDARY & STATUS',
    title: 'Engineering maturity & operational boundaries',
    sub:
      'Communicating explicit capabilities and operational limits as evidence of sound engineering judgment.',
    availableToday: [
      'Loopback (127.0.0.1) network interface binding by default',
      'CORS headers disabled by default to prevent web browser drive-by requests',
      'Administrative runtime management endpoints disabled unless explicitly flagged',
      'Multi-model resident routing & dynamic model switching',
      'OpenAI-compatible streaming (/v1/chat/completions) & non-streaming endpoints',
      'SHA-256 artifact validation & model completeness verification',
      'Safe runtime lease, request draining, and memory unload behavior',
      'Bundled Korgis Web UI and programmatic Python lifecycle management',
    ],
    importantLimits: [
      'No built-in authentication layer for open or untrusted network deployments',
      'Primary development and validation on macOS (Apple Silicon) and Linux',
      'MLX backends strictly require Apple Silicon hardware with unified memory',
      'Hardware-specific context length tuning required for heavy models',
      'Project status is Active Development (v0.8.x), not production-ready infrastructure',
    ],
  },
  cta: {
    kicker: 'LOCAL LLM SERVER',
    headline: 'Give your product a reliable local reasoning layer.',
    body:
      'Explore the runtime codebase, benchmark against your desktop hardware, and adopt an OpenAI-compatible boundary for your local AI applications.',
    primaryCta: {
      label: 'Explore Local LLM Server on GitHub ↗',
      href: 'https://github.com/daniele21/local-llm-server',
    },
    secondaryCta: {
      label: 'View the local-first ecosystem',
      href: '/#infrastructure',
    },
  },
};
