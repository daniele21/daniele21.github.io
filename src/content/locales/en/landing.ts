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
      { label: 'Systems', href: '/#infrastructure' },
      { label: 'Products', href: '/#applications' },
      { label: 'Experiments', href: '/experiments' },
      { label: 'About', href: '/about' },
    ],
    cta: {
      label: 'Connect',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      external: true,
    },
  },

  hero: {
    identity: {
      name: 'Daniele Moltisanti',
      role: 'Principal AI Engineer & AI Strategy Lead',
      specialization: 'AI Systems · Product · Architecture · Evaluation',
      affiliation: 'Sky Italia',
      education: 'Politecnico di Milano',
      location: 'Milan, Italy',
      portraitPath: 'images/profile-photo.jpg',
      portraitAlt: 'Daniele Moltisanti - Principal AI Engineer & AI Strategy Lead',
      bio: 'I build AI systems end to end: from problem framing and architecture to product, engineering and evidence.',
      focusBadges: [
        'Local AI & On-device LLMs',
        'Edge & Local AI Architecture',
        'Inference Infrastructure',
      ],
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
      eyebrow: '',
      lead: '',
      title: 'Local AI first ≠',
      titleHighlight: 'Local AI only',
      challenge: 'Does every AI workload really need the cloud?',
      explanation:
        'I experiment with real systems to find what should run <strong>Local</strong>, <strong>Hybrid</strong> or <strong>Cloud</strong>, proving trade-offs with reproducible benchmarks and code.',
      position: '',
      proofLine: '',
      primaryCta: {
        label: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      },
      secondaryCta: {
        label: 'Follow on GitHub',
        href: 'https://github.com/daniele21',
      },
    },
  },

  decisionStage: {
    kicker: '01 DECIDE',
    title: 'When does Local AI actually make sense?',
    intro:
      "I don't start from the model, I start from the workload. What are the privacy requirements and latency constraints? That tells you where the model should run.",
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
    keyMessage: 'Local is an option. Not the only one.',
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
    kicker: '02 BUILD',
    title: 'Making local inference actually usable.',
    intro:
      'When Local or Hybrid makes sense, I build the runtime products need across desktop, mobile, and speech.',
    proofLine: 'Same question across every device: what can realistically run locally?',
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
        id: 'korgis',
        title: 'Korgis',
        eyebrow: 'DESKTOP · SERVER',
        summary: 'Your AI. Local. Ready to use. Runtime control plane for reliable multi-model local AI applications.',
        href: '/korgis',
        logoPath: 'images/local-llm-server/logo.png',
        logoAlt: 'Korgis logo',
        features: [
          { label: 'OpenAI API' },
          { label: 'Multi-model runtime' },
          { label: 'Telemetry' },
        ],
        evidence: 'One local runtime that different apps can reuse.',
        imagePath: 'images/local-llm-server/overview.png',
        imageAlt: 'Korgis overview interface',
      },
      {
        id: 'android-harness',
        title: 'Harnex',
        eyebrow: 'ON-DEVICE · ANDROID',
        summary: 'One shared on-device gateway and runtime across Android applications.',
        href: '/harnex',
        logoPath: 'images/harness/logo.png',
        logoAlt: 'Harnex logo',
        features: [
          { label: 'GGUF runtime' },
          { label: 'Thermal testing' },
          { label: 'Telemetry' },
        ],
        evidence: 'A real phone exposes limits a desktop demo can hide.',
        imagePath: 'images/harness/harness-overview.png',
        imageAlt: 'Harnex overview',
      },
      {
        id: 'decisio',
        title: 'Decisio',
        eyebrow: 'STATEFUL · DECISION RUNTIME',
        summary: 'Reuse stable model context across changing application state and return bounded typed actions.',
        href: '/decisio',
        features: [
          { label: 'State reuse' },
          { label: 'Typed actions' },
          { label: 'Fresh equivalence' },
        ],
        evidence: 'Makes optimization and decision-quality evidence separate, explicit claims.',
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
      "Running a model isn't enough. Products need a runtime they can depend on.",
    handoff: {
      output: 'Runtime layer running',
      leadsTo: 'Products working',
      detailCta: { label: 'See the product tests', href: '#applications' },
    },
  },

  testStage: {
    kicker: '03 TEST',
    title: 'Put it inside a real product.',
    intro:
      'Infrastructure means nothing until it runs in a real product. My apps test privacy, usability, and integration in practice.',
    note: 'Each application tests a distinct workload constraint.',
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
        imagePath: 'images/redact-guard/redactguard-doc-preview.jpg',
        colorClass: 'blue',
        linkLabel: 'See the test →',
        whatItTests: 'Local inference + configurable PII + human review inside a controlled boundary.',
      },
      {
        name: 'Aura Finance',
        tag: 'MOBILE · LOCAL-FIRST FINANCE',
        question: 'Can a useful personal-finance product keep its canonical workspace on the device?',
        description:
          'Deterministic financial rules, local persistence, human-reviewed payment candidates and optional encrypted continuity.',
        href: '/aura-finance',
        logoPath: 'images/aura/logo.png',
        features: [
          { label: 'Deterministic finance' },
          { label: 'Human review' },
          { label: 'Local-first data' },
        ],
        evidence: 'Shows that AI should not replace deterministic product logic unless it earns its place.',
        imagePath: 'images/aura-finance/aura-categories-preview.png',
        colorClass: 'green',
        linkLabel: 'See the product →',
        whatItTests: 'Local ownership, explainable rules and reversible automation without claiming AI categorization that is not implemented.',
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
        imagePath: 'images/closedroom/recording-preview.jpg',
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
    closingMessage: '',
    handoff: {
      output: 'Products working',
      leadsTo: 'Evidence measured',
      detailCta: { label: 'See what I measure', href: '#evidence' },
    },
  },

  measureStage: {
    kicker: '04 MEASURE',
    title: 'What actually works?',
    intro:
      'Capability, reliability, runtime behavior and end-to-end product effectiveness are measured under explicit evidence contracts before they become architecture claims.',
    systems: [
      {
        id: 'experiments',
        title: 'Experiments',
        tag: 'CAPABILITY · SYSTEM · E2E EVALUATION',
        question: 'What actually works for this workload, under this exact model, runtime and product boundary?',
        metrics: [
          { label: 'Tracks', value: '5', note: 'Current experiment tracks in the repository' },
          { label: 'Implemented', value: '3', note: 'Executable / implemented tracks today' },
          { label: 'Execution', value: 'Local + API', note: 'Compared under explicit provider/runtime identity' },
          { label: 'Evidence', value: 'Model + E2E', note: 'Capability and system-level evaluation' },
        ],
        statusNote: 'Experiments is the canonical evidence hub. Numeric benchmark results are published only when the experiment contract and provider terms allow it.',
        statusType: 'authoritative',
        href: '/experiments',
        ctaLabel: 'Explore experiments',
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
      'Working ≠ good enough. Good enough ≠ production ready. Numbers decide, not opinions.',
    handoff: {
      output: 'Evidence changes the next decision',
      leadsTo: 'DECIDE AGAIN',
      detailCta: { label: 'Open Experiments', href: '/experiments' },
    },
  },

  loopClosure: {
    kicker: 'THE LOOP',
    title: 'Evidence changes the next decision.',
    body:
      "What I learn from real hardware and real products feeds back into the next decision. That's the loop.",
    loopSequence: 'DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN',
    payoff: 'That\'s what "Local AI first ≠ Local AI only" looks like in practice.',
    outcomes: [
      { label: 'LOCAL', note: 'The workload runs well enough on local hardware.' },
      { label: 'HYBRID', note: 'Local handles the main flow. Cloud steps in for what local can\'t do.' },
      { label: 'CLOUD', note: 'Local models can\'t meet the requirements yet. Cloud is the right call.' },
    ],
  },

  selectedSystems: {
    kicker: 'SYSTEM ARTIFACTS',
    title: 'Open-weight Systems & Infrastructure',
    description:
      'Core repositories and runtimes built with operational discipline, explicit failure behavior, and clean API contracts.',
    systems: [
      {
        id: 'korgis',
        title: 'Korgis',
        role: 'Reusable inference gateway for desktop, workstation and server',
        description:
          'OpenAI-compatible HTTP/WebSocket API supporting GGUF (llama.cpp) and MLX backends with dynamic model swapping, concurrent queues, and structured telemetry.',
        technologies: ['C++', 'Python', 'MLX', 'OpenAI API'],
        href: '/korgis',
        badge: 'Active System',
      },
      {
        id: 'android-harness',
        title: 'Harnex',
        role: 'On-device inference lab & execution gateway',
        description:
          'Mobile runtime environment profiling memory pressure, thermal degradation, NPU acceleration, and cross-application AIDL boundaries.',
        technologies: ['Kotlin', 'Android NDK', 'llama.cpp', 'AIDL'],
        href: '/harnex',
        badge: 'Lab Prototype',
      },
      {
        id: 'decisio',
        title: 'Decisio',
        role: 'Stateful bounded-decision runtime',
        description:
          'Reusable stable model context, deterministic constraints and direct typed action readout for repeated local decisions.',
        technologies: ['Python', 'llama.cpp', 'GGUF', 'State reuse'],
        href: '/decisio',
        badge: 'Experimental System',
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
    heading: 'Building AI systems. Measuring what works.',
    summary:
      'I build local AI infrastructure and test it inside real products. The goal: understand where running locally actually creates value.',
    highlights: [
      { label: 'Clean Engineering', detail: 'Bounded memory, explicit failure modes, and reproducible environments.' },
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
