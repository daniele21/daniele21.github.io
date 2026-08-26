/**
 * Canonical landing page content dictionary.
 * Reconciled against 08 (Strategy), 09 (Copy & UX), and current verified evidence.
 */
import type { LandingPageData } from '../../../types/landing';

export const landingData: LandingPageData = {
  header: {
    brandName: 'Daniele Moltisanti',
    links: [
      { label: 'Method', href: '/#strategy' },
      { label: 'Projects', href: '/#infrastructure' },
      { label: 'About', href: '/about' },
    ],
    cta: {
      label: 'Follow my work',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      external: true,
    },
  },

  hero: {
    identity: {
      name: 'Daniele Moltisanti',
      role: 'Principal AI Engineer',
      specialization: 'Local AI · AI Strategy',
      affiliation: 'Sky Italia',
      education: 'Politecnico di Milano',
      location: 'Milan, Italy',
      portraitPath: 'images/profile-photo.jpg',
      portraitAlt: 'Daniele Moltisanti - Principal AI Engineer',
      bio: 'I build AI systems to understand where local execution creates real value.',
      focusBadges: ['Local & On-device AI', 'Efficient Inference', 'Privacy-first Systems'],
      socials: [
        {
          platform: 'linkedin',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/daniele-moltisanti/',
        },
        {
          platform: 'github',
          label: 'GitHub',
          href: 'https://github.com/daniele21',
        },
      ],
    },
    mission: {
      eyebrow: "WHAT I'M EXPLORING",
      lead: '',
      title: 'Local AI first ≠',
      titleHighlight: 'Local AI only',
      challenge: 'Does this workload really need the cloud?',
      explanation:
        'I build and test real AI systems to find where Local, Hybrid or Cloud actually makes sense.',
      position: 'Find the boundary with evidence, not ideology.',
      proofLine:
        'DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN',
      primaryCta: {
        label: 'Explore the method',
        href: '#strategy',
      },
      secondaryCta: {
        label: 'About my work',
        href: '/about',
      },
    },
  },

  decisionStage: {
    kicker: '01 - DECIDE',
    title: 'When does Local AI actually make sense?',
    intro:
      'I start from the workload, not the model. Privacy, control, latency and capability tell us whether Local, Hybrid or Cloud is the better fit.',
    drivers: [
      {
        icon: '🔒',
        title: 'Sensitive Data',
        text: 'Does private data need to stay within controlled boundaries?',
      },
      {
        icon: '⚡',
        title: 'Offline / Latency',
        text: 'Must execution continue without network dependence or cloud latency?',
      },
      {
        icon: '⚙️',
        title: 'Control & Ownership',
        text: 'Do we need direct ownership of model weights, lifecycle, and prompts?',
      },
      {
        icon: '🌐',
        title: 'Capability & Scale',
        text: 'Does the workload require frontier reasoning or elastic compute?',
      },
    ],
    keyMessage: 'Local is one option. Hybrid and Cloud remain part of the decision.',
    framework: {
      title: 'Decision Framework',
      flowTitle: 'Workload Requirements',
      flowSubtitle: 'Evaluate data sensitivity, latency, and operational bounds',
      footer: 'Decide based on privacy boundaries, control, and verifiable constraints.',
    },
    comparison: {
      title: 'Workload Trade-off Matrix',
      columns: ['Local', 'Hybrid', 'Cloud'] as const,
      rows: [
        {
          label: 'Data Privacy',
          values: ['Full boundary', 'Partitioned', 'External VPC'],
          scores: [3, 2, 1],
        },
        {
          label: 'Offline & Latency',
          values: ['Zero network', 'Fallback', 'Network-bound'],
          scores: [3, 2, 1],
        },
        {
          label: 'Runtime Control',
          values: ['Full ownership', 'Shared', 'Provider API'],
          scores: [3, 2, 1],
        },
        {
          label: 'Frontier Models',
          values: ['Hardware bound', 'Dynamic route', 'Frontier scale'],
          scores: [1, 3, 3],
        },
        {
          label: 'Elastic Scale',
          values: ['Fixed compute', 'Tiered', 'Unlimited'],
          scores: [1, 2, 3],
        },
        {
          label: 'Operations',
          values: ['Self-managed', 'Shared', 'Provider-managed'],
          scores: [1, 2, 3],
        },
      ],
      footer: 'Find the boundary with evidence, not ideology.',
    },
    tradeoffs: {
      title: 'Trade-off Guide',
      questions: [
        { icon: '▤', text: 'Where does the primary data reside?' },
        { icon: '♙', text: 'Who must have access to model weights and prompts?' },
        { icon: '◷', text: 'Where must latency and availability be guaranteed?' },
        { icon: '⚙', text: 'What maintenance overhead can the team sustain?' },
        { icon: '△', text: 'What is the failure behavior when offline or disconnected?' },
      ],
      footer: 'Make trade-offs explicit. Revisit as model capabilities evolve.',
    },
    handoff: {
      output: 'LOCAL / HYBRID / CLOUD decided',
      leadsTo: 'Runtime layer running',
      detailCta: { label: 'Explore the execution layer', href: '#infrastructure' },
    },
  },

  buildStage: {
    kicker: '02 - BUILD',
    title: 'Make local execution usable.',
    intro:
      'If Local or Hybrid earns a role, I build the runtime layer products need to actually use it - across desktop, mobile and speech.',
    proofLine: 'One execution layer. Different environments. Same question: what can realistically stay local?',
    ecosystemImage: 'images/ecosystem.png',
    ecosystemAlt: 'Connected Local AI architecture across desktop, Android, local server and cloud fallback',
    areas: [
      {
        icon: '▱',
        title: 'Desktop / Mac',
        text: 'Inference gateway with multi-model lifecycle, GGUF/MLX runtimes, and OpenAI-compatible API.',
      },
      {
        icon: '▯',
        title: 'Android Device',
        text: 'On-device inference lab profiling memory pressure, thermals, and cross-app AIDL boundaries.',
      },
      {
        icon: '⌁',
        title: 'Speech Primitive',
        text: 'Private Whisper ASR for real-time transcription without sending audio to cloud services.',
      },
    ],
    projects: [
      {
        id: 'local-llm-server',
        title: 'Local LLM Server',
        eyebrow: 'DESKTOP · SERVER',
        summary: 'Gives apps one stable way to run local models on a desktop or server.',
        href: '/local-llm-server',
        logoPath: 'images/local-llm-server/logo.svg',
        logoAlt: 'Local LLM Server logo',
        features: [
          { label: 'OpenAI API' },
          { label: 'Multi-model runtime' },
          { label: 'Telemetry' },
        ],
        evidence: 'One local runtime that different apps can reuse.',
        imagePath: 'images/local-llm-server/overview.png',
        imageAlt: 'Local LLM Server overview interface',
      },
      {
        id: 'android-harness',
        title: 'Android Local LLM Harness',
        eyebrow: 'ON-DEVICE · ANDROID',
        summary: 'Shows what a local model can actually handle on a real phone.',
        href: '/android-local-llm-harness',
        logoPath: 'images/harness/logo.svg',
        logoAlt: 'Android Local LLM Harness logo',
        features: [
          { label: 'GGUF runtime' },
          { label: 'Thermal testing' },
          { label: 'Telemetry' },
        ],
        evidence: 'A real phone exposes limits a desktop demo can hide.',
        imagePath: 'images/harness/harness-overview.png',
        imageAlt: 'Android Local LLM Harness overview',
      },
      {
        id: 'local-asr-server',
        title: 'Local ASR Server',
        eyebrow: 'SPEECH · AUDIO',
        summary: 'Lets a product turn speech into text without sending audio to a cloud service.',
        href: '/local-asr-server',
        features: [
          { label: 'Whisper ASR' },
          { label: 'Real-time stream' },
          { label: 'Zero telemetry' },
        ],
        evidence: 'Speech-to-text that stays inside the local workflow.',
      },
    ],
    closingMessage:
      'Running a model is just the starting point. The architecture layer turns raw weights into dependable, app-ready runtime boundaries.',
    handoff: {
      output: 'Runtime layer running',
      leadsTo: 'Products working',
      detailCta: { label: 'See the product tests', href: '#applications' },
    },
  },

  testStage: {
    kicker: '03 - TEST',
    title: 'Put it inside a real product.',
    intro:
      'Infrastructure only matters if it survives a real workflow. I use my products as proving grounds for privacy, usability and integration constraints.',
    note: 'Each application is an empirical proving ground.',
    applications: [
      {
        name: 'RedactGuard',
        tag: 'WEB & DESKTOP · PII REDACTION',
        question: 'Can sensitive document processing stay local?',
        description:
          'Local LLM inference on structured documents with zero cloud transmission.',
        href: '/redact-guard',
        logoPath: 'images/redact-guard/logo.png',
        features: [
          { label: 'PII redaction' },
          { label: 'Human review' },
          { label: 'Privacy boundary' },
        ],
        evidence: 'Shows where privacy adds control and where it adds operational work.',
        imagePath: 'images/redact-guard/redactguard-review.jpg',
        colorClass: 'blue',
        linkLabel: 'See the test →',
        whatItTests: 'Local inference + configurable PII + human review inside a controlled boundary.',
      },
      {
        name: 'Aura Finance',
        tag: 'MOBILE · ON-DEVICE PARSING',
        question: 'Can personal transactions be categorized on-device?',
        description:
          'On-device semantic extraction coupled with deterministic financial math.',
        href: '/aura-finance',
        logoPath: 'images/aura/logo.png',
        features: [
          { label: 'On-device parsing' },
          { label: 'Deterministic math' },
          { label: 'Zero telemetry' },
        ],
        evidence: 'Shows what on-device understanding can handle in a daily mobile workflow.',
        imagePath: 'images/aura-finance/aura-payment-detection.png',
        colorClass: 'green',
        linkLabel: 'See the test →',
        whatItTests: 'Small local model handling recurring semantic tasks without cloud exposure.',
      },
      {
        name: 'ClosedRoom',
        tag: 'MACOS · MEETING INTELLIGENCE',
        question: 'Can meeting intelligence stay inside the room?',
        description:
          'Multi-primitive orchestration (Audio + ASR + LLM) within a local trust boundary.',
        href: '/closedroom',
        logoPath: 'images/closedroom/logo.png',
        features: [
          { label: 'Local audio ASR' },
          { label: 'Speaker context' },
          { label: 'Opt-in cloud' },
        ],
        evidence: 'Shows how far a full meeting workflow can stay local by default.',
        imagePath: 'images/closedroom/meeting-analysis.jpg',
        colorClass: 'purple',
        linkLabel: 'See the test →',
        whatItTests: 'Multi-primitive orchestration on macOS with external models strictly opt-in.',
      },
    ],
    nextCard: {
      name: 'Your Next Workload',
      description: 'Test your application requirements with the same empirical local-first methodology.',
      linkLabel: 'Discuss an architecture →',
    },
    closingMessage: 'The value of this layer is turning architectural capability into verifiable product evidence.',
    handoff: {
      output: 'Products working',
      leadsTo: 'Evidence measured',
      detailCta: { label: 'See what I measure', href: '#evidence' },
    },
  },

  measureStage: {
    kicker: '04 - MEASURE',
    title: 'Is it actually good enough?',
    intro:
      "Running locally isn't the goal. I measure whether it performs well enough - and use the evidence to change the architecture.",
    systems: [
      {
        id: 'performance-lab',
        title: 'Performance Lab',
        tag: 'OPTIMIZATION & BENCHMARKS',
        question: 'Which configuration is good enough for this workload on this device?',
        metrics: [
          { label: 'TTFT', value: '820', unit: 'ms', note: 'Time to first token' },
          { label: 'Decode', value: '18.6', unit: 'tok/s', note: 'Generation speed' },
          { label: 'Prefill', value: '72.4', unit: 'tok/s', note: 'Prompt processing' },
          { label: 'Peak RAM', value: '3.4', unit: 'GB', note: 'Memory footprint' },
        ],
        benchmarkProfiles: [
          {
            id: 'samsung-a56', device: 'Samsung Galaxy A56', platform: 'Android', deviceKind: 'mobile',
            model: 'Qwen 3.5 2B', quantization: 'Q4_K_M', context: '4K context',
            metrics: [
              { label: 'TTFT', value: '820', unit: 'ms', note: 'Time to first token' },
              { label: 'Decode', value: '18.6', unit: 'tok/s', note: 'Generation speed' },
              { label: 'Prefill', value: '72.4', unit: 'tok/s', note: 'Prompt processing' },
              { label: 'Peak RAM', value: '3.4', unit: 'GB', note: 'Memory footprint' },
            ],
          },
          {
            id: 'mac-pro-m3', device: 'Mac Pro M3', platform: 'macOS', deviceKind: 'desktop',
            model: 'Qwen 3.5 2B', quantization: 'Q4_K_M', context: '4K context',
            metrics: [
              { label: 'TTFT', value: '240', unit: 'ms', note: 'Time to first token' },
              { label: 'Decode', value: '54.8', unit: 'tok/s', note: 'Generation speed' },
              { label: 'Prefill', value: '214', unit: 'tok/s', note: 'Prompt processing' },
              { label: 'Peak RAM', value: '3.1', unit: 'GB', note: 'Memory footprint' },
            ],
          },
        ],
        statusNote: 'Illustrative benchmark values for the current UI. Replace after the validated device runs.',
        statusType: 'planned',
        href: '/performance-lab',
        ctaLabel: 'Open benchmark lab',
      },
      {
        id: 'traffic-monitoring',
        title: 'Traffic Monitoring',
        tag: 'PROCESS-LEVEL OBSERVABILITY',
        question: 'Did local AI processes stay on-device without reaching the internet?',
        metrics: [
          { label: 'Processes observed', value: '3', note: 'LLM · ASR · app' },
          { label: 'Local traffic', value: '100%', note: 'Loopback + LAN' },
          { label: 'Internet egress', value: '0 B', note: 'No outbound payload' },
          { label: 'External endpoints', value: '0', note: 'None contacted' },
        ],
        statusNote: 'Process-level capture confirms that AI traffic remained on local interfaces during the observed run.',
        statusType: 'verified',
        href: '/traffic-monitoring',
        ctaLabel: 'See network evidence',
      },
    ],
    closingMessage:
      'Working ≠ performing well. Performing well ≠ production ready. Evidence is what allows the next architecture decision.',
    handoff: {
      output: 'Evidence changes the next decision',
      leadsTo: 'DECIDE AGAIN',
      detailCta: { label: 'Open full benchmark lab', href: '/performance-lab' },
    },
  },

  loopClosure: {
    kicker: 'THE LOOP',
    title: 'Evidence changes the next decision.',
    body:
      'What I learn from real hardware, real products and measured behavior feeds directly back into the next architecture choice.',
    loopSequence: 'DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN',
    payoff: "That's what Local AI first ≠ Local AI only means in practice.",
    outcomes: [
      { label: 'LOCAL', note: 'Workload reaches target thresholds within controlled compute.' },
      { label: 'HYBRID', note: 'Local execution handles primary path; cloud fallback handles frontier edge cases.' },
      { label: 'CLOUD', note: 'Open-weight local models cannot yet meet required latency, scale, or quality.' },
    ],
  },

  selectedSystems: {
    kicker: 'SYSTEM ARTIFACTS',
    title: 'Open-weight Systems & Infrastructure',
    description:
      'Core repositories and runtimes built with operational discipline, explicit failure behavior, and clean API contracts.',
    systems: [
      {
        id: 'local-llm-server',
        title: 'Local LLM Server',
        role: 'Reusable inference gateway for desktop, workstation and server',
        description:
          'OpenAI-compatible HTTP/WebSocket API supporting GGUF (llama.cpp) and MLX backends with dynamic model swapping, concurrent queues, and structured telemetry.',
        technologies: ['C++', 'Python', 'MLX', 'OpenAI API'],
        href: '/local-llm-server',
        badge: 'Active System',
      },
      {
        id: 'android-harness',
        title: 'Android Local LLM Harness',
        role: 'On-device inference lab & execution gateway',
        description:
          'Mobile runtime environment profiling memory pressure, thermal degradation, NPU acceleration, and cross-application AIDL boundaries.',
        technologies: ['Kotlin', 'Android NDK', 'llama.cpp', 'AIDL'],
        href: '/android-local-llm-harness',
        badge: 'Lab Prototype',
      },
      {
        id: 'traffic-monitoring',
        title: 'Traffic Monitoring Platform',
        role: 'Observability & network boundary validation',
        description:
          'Non-intrusive network traffic analysis proving whether applications maintain declared local-first boundaries without inspecting private payloads.',
        technologies: ['macOS Network Extension', 'Android VpnService', 'eBPF'],
        href: '/traffic-monitoring',
        badge: 'Evidence System',
      },
    ],
  },

  fieldNotes: {
    kicker: 'FIELD NOTES',
    title: 'Research Thinking & Field Notes',
    description:
      'Empirical observations, architectural trade-offs, and practical lessons from building and evaluating local AI systems.',
    notes: [
      {
        id: 'note-01',
        date: '2026-08',
        title: 'The Local AI First Principle: Why Defaulting to Cloud is a Risk',
        excerpt:
          'Examining why unexamined cloud dependencies introduce privacy, reliability, and vendor risks-and how to establish workload boundaries.',
        readTime: '6 min read',
        href: '/insights',
      },
      {
        id: 'note-02',
        date: '2026-07',
        title: 'Profiling 70B Models on Apple Silicon: Memory, Quantization, and Latency',
        excerpt:
          'Comparative benchmarks of 4-bit and 8-bit quantized models on unified memory architectures under sustained production workloads.',
        readTime: '8 min read',
        href: '/insights',
      },
      {
        id: 'note-03',
        date: '2026-06',
        title: 'On-Device AI in Production: The Reality of Thermal Budgets and Battery Life',
        excerpt:
          'What happens when mobile LLMs run outside synthetic benchmarks: real battery drain, background scheduling, and OS lifecycle management.',
        readTime: '5 min read',
        href: '/insights',
      },
    ],
  },

  aboutSignal: {
    kicker: 'ABOUT & TRACK RECORD',
    heading: 'Applied AI systems engineering with verifiable discipline.',
    summary:
      'I build AI systems to understand where local execution creates real value. My focus spans inference infrastructure, on-device intelligence, and empirical evaluation.',
    highlights: [
      { label: 'Engineering Standards', detail: 'Bounded memory, explicit failure modes, and reproducible environments.' },
      { label: 'Ecosystem Focus', detail: 'Apple Silicon MLX, Android NPU/NDK, open-weight GGUF architectures.' },
    ],
    linkedinUrl: 'https://www.linkedin.com/in/daniele-moltisanti/',
    githubUrl: 'https://github.com/daniele21',
  },

  finalCta: {
    consultation: {
      heading: 'Facing the same decisions?',
      body: 'I work with technical leaders, CTOs, and engineering teams deciding what should run Local, Hybrid, or Cloud.',
      primaryCta: {
        label: 'Discuss an AI architecture',
        href: 'mailto:danielemoltisanti@gmail.com?subject=AI%20Architecture%20conversation',
      },
      secondaryCta: {
        label: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/daniele-moltisanti/',
        external: true,
      },
    },
  },
};
