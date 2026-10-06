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
      label: 'Connect',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      external: true,
    },
  },

  hero: {
    identity: {
      name: 'Daniele Moltisanti',
      role: 'Principal AI Engineer & AI Strategy Lead',
      specialization: 'Local AI & On-device LLMs · Edge & Local AI Architecture',
      affiliation: 'Sky Italia',
      education: 'Politecnico di Milano',
      location: 'Milan, Italy',
      portraitPath: 'images/profile-photo.jpg',
      portraitAlt: 'Daniele Moltisanti - Principal AI Engineer & AI Strategy Lead',
      bio: 'I experiment with AI systems to understand where local execution creates real value.',
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
    title: 'Build the reusable AI layer once.',
    intro:
      'When Local or Hybrid makes sense, I build reusable infrastructure for reasoning, mobile inference, repeated decisions and private speech.',
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
        layer: 'Local AI runtime control plane',
        status: 'ACTIVE',
        summary: 'Run and manage local AI models behind one stable application-facing API.',
        href: '/korgis',
        logoPath: 'images/local-llm-server/logo.png',
        logoAlt: 'Korgis logo',
        features: [
          { label: 'Multi-model runtime' },
          { label: 'OpenAI API' },
          { label: 'Resource control' },
        ],
        evidence: 'Makes local models reusable infrastructure instead of one-off app integrations.',
      },
      {
        id: 'harnex',
        title: 'Harnex',
        eyebrow: 'ANDROID · ON-DEVICE',
        layer: 'Shared Android local-AI control plane',
        status: 'ACTIVE',
        summary: 'Run local GGUF models once and expose governed on-device inference to multiple apps.',
        href: '/harnex',
        logoPath: 'images/harness/logo.png',
        logoAlt: 'Harnex logo',
        features: [
          { label: 'Shared runtime' },
          { label: 'Governed access' },
          { label: 'Runtime evidence' },
        ],
        evidence: 'Removes repeated model-store, JNI and lifecycle engineering from every Android app.',
      },
      {
        id: 'decisio',
        title: 'Decisio',
        eyebrow: 'DECISIONS · STATEFUL',
        layer: 'Stateful local-LLM decision runtime',
        status: 'EXPERIMENTAL',
        summary: 'Prefill stable context once, send only changing state and return a typed action.',
        href: 'https://github.com/daniele21/decisio',
        external: true,
        logoPath: 'images/decisio/decisio-mark-512.png',
        logoAlt: 'Decisio logo',
        features: [
          { label: 'Context reuse' },
          { label: 'Typed actions' },
          { label: 'Zero-token readout' },
        ],
        evidence: 'Cuts repeated prefill work when the same bounded decision is made over changing state.',
      },
      {
        id: 'local-asr-server',
        title: 'Local ASR',
        eyebrow: 'SPEECH · AUDIO',
        layer: 'Private speech primitive',
        status: 'ACTIVE',
        summary: 'Turn speech into text locally so audio does not have to leave the controlled workflow.',
        href: '/local-asr-server',
        features: [
          { label: 'Whisper ASR' },
          { label: 'Streaming' },
          { label: 'Private audio' },
        ],
        evidence: 'Provides the speech primitive needed by products such as ClosedRoom without cloud transcription.',
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
        whatItTests: 'Desktop uses Korgis; Android uses Harnex. The same privacy workflow tests two local execution layers.',
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
        imagePath: 'images/aura-finance/aura-categories-preview.png',
        colorClass: 'green',
        linkLabel: 'See the test →',
        whatItTests: 'Designed as the mobile proving ground for Harnex-powered transaction extraction and categorisation.',
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
        whatItTests: 'Local ASR + Korgis orchestrated inside one private macOS meeting workflow.',
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
    title: 'Test the assumptions, not just the demo.',
    intro:
      'Experiments turns model, architecture and product questions into reproducible evidence: capability, quality, latency, resources, cost and robustness.',
    systems: [
      {
        id: 'experiments',
        title: 'Experiments',
        tag: 'REPRODUCIBLE EVALUATION',
        question: 'Select a benchmark. Inspect the latest evidence.',
        metrics: [],
        tracks: [
          {
            id: 'model-capability',
            title: 'Model Capability Benchmark',
            question: 'How much model do you actually need for a task?',
            status: 'NO PUBLISHED SNAPSHOT',
          },
          {
            id: 'jev-vs-llm-routing',
            title: 'JEV vs LLM · Routing',
            question: 'How do local models trade routing quality for latency?',
            status: 'PUBLISHED',
            resultUrl:
              'https://raw.githubusercontent.com/daniele21/experiments/feature/clm-autonomous-runner/experiments/jev-vs-llm/results/benchmark_data.json',
            sourceUrl:
              'https://github.com/daniele21/experiments/blob/feature/clm-autonomous-runner/experiments/jev-vs-llm/results/benchmark_data.json',
            resultKind: 'jev-routing',
          },
          {
            id: 'redactguard-local-anonymization',
            title: 'RedactGuard Local Anonymization',
            question: 'How reliable are local models on a real privacy workload?',
            status: 'NO PUBLISHED RUN',
          },
          {
            id: 'vlm-capability',
            title: 'VLM Capability Benchmark',
            question: 'Which visual tasks can realistically move local?',
            status: 'NO PUBLISHED RUN',
          },
          {
            id: 'image-generation',
            title: 'Image Generation Benchmark',
            question: 'How should image models be compared beyond subjective demos?',
            status: 'NO PUBLISHED RUN',
          },
          {
            id: 'diarization',
            title: 'Diarization Benchmark',
            question: 'Which open diarization pipeline best balances speaker accuracy and runtime cost?',
            status: 'NO PUBLISHED RUN',
          },
        ],
        statusNote: 'One repository, multiple reproducible research tracks.',
        statusType: 'verified',
        href: 'https://github.com/daniele21/experiments',
        ctaLabel: 'Open Experiments',
      },
    ],
    closingMessage:
      'Evidence should change the next architecture decision. Otherwise it is just telemetry.',
    handoff: {
      output: 'Evidence changes the next decision',
      leadsTo: 'DECIDE AGAIN',
      detailCta: { label: 'Open Experiments', href: 'https://github.com/daniele21/experiments' },
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
        role: 'Stateful decision runtime for repeated local-LLM decisions',
        description:
          'Reuses stable model context, sends only changing state and returns typed actions for bounded decision loops.',
        technologies: ['Python', 'llama.cpp', 'GGUF', 'State reuse'],
        href: 'https://github.com/daniele21/decisio',
        badge: 'Experimental System',
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
