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
      { label: 'Notes', href: '/insights' },
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
        label: 'Read my thinking',
        href: '/insights',
      },
    },
  },

  decisionStage: {
    kicker: '01 -DECIDE · STRATEGY',
    title: 'Where should this workload run?',
    intro:
      'Before choosing models or runtimes, start with the workload. What do we gain by keeping data and execution under our control, and what do we give up?',
    drivers: [
      {
        icon: '🔒',
        title: 'Privacy & Boundary',
        text: 'Does sensitive data really need to leave the controlled environment?',
      },
      {
        icon: '⚙️',
        title: 'Control & Ownership',
        text: 'Do we need ownership over model weights, lifecycle, prompt privacy and execution?',
      },
      {
        icon: '🛡️',
        title: 'Vendor Dependency',
        text: 'How exposed is the system to provider pricing, API breaks, rate limits and outages?',
      },
      {
        icon: '⚡',
        title: 'Operational Fit',
        text: 'What do latency, connectivity, offline capabilities and hardware bounds require?',
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
      title: 'Local vs Hybrid vs Cloud',
      columns: ['Local', 'Hybrid', 'Cloud'] as const,
      rows: [
        {
          label: 'Data boundary',
          values: ['On-prem / Device', 'Partitioned', 'Third-party VPC'],
          classes: ['good', 'good', 'warn'],
        },
        {
          label: 'Runtime ownership',
          values: ['Complete', 'Shared', 'Provider managed'],
          classes: ['good', 'good', 'neutral'],
        },
        {
          label: 'Offline capability',
          values: ['Native', 'Partial', 'None'],
          classes: ['good', 'warn', 'bad'],
        },
        {
          label: 'Frontier reasoning',
          values: ['Hardware bounded', 'Dynamic routing', 'Full scale'],
          classes: ['warn', 'good', 'good'],
        },
        {
          label: 'Operational cost',
          values: ['Capex / Fixed', 'Balanced', 'Opex / Per-token'],
          classes: ['neutral', 'good', 'neutral'],
        },
      ],
      footer: 'No universal winner. The right architecture matches the specific workload constraints.',
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
      output: 'We have a direction. Now we need to make it real.',
      leadsTo: 'If Local or Hybrid earns a role, now we need to make it real with dependable infrastructure.',
      detailCta: { label: 'See how I decide', href: '/local-ai-strategy' },
    },
  },

  buildStage: {
    kicker: '02 -BUILD · EXECUTION',
    title: 'Can we actually run it locally?',
    intro:
      'This is where strategy becomes engineering. I build the infrastructure needed to make local execution reusable, observable and manageable.',
    proofLine: 'Different environments. Same question: what can realistically stay local?',
    ecosystemImage: 'images/ecosystem.png',
    ecosystemAlt: 'Connected Local AI architecture across desktop, Android, local server and cloud fallback',
    areas: [
      {
        icon: '▱',
        title: 'Local infrastructure',
        text: 'OpenAI-compatible inference servers, multi-model lifecycle, streaming, and telemetry on macOS, Linux, and private servers.',
      },
      {
        icon: '▯',
        title: 'On-device execution',
        text: 'Real LLM inference under memory, thermal, battery, and mobile lifecycle constraints on Android devices.',
      },
      {
        icon: '⌁',
        title: 'Local speech & audio',
        text: 'Private ASR (Whisper) as a reusable local primitive for real-time transcription and voice workflows.',
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
      output: "It runs. Now let's put it inside a real product.",
      leadsTo: 'Reusable infrastructure must survive a real product workflow.',
      detailCta: { label: 'See what I built', href: '/local-ai-infrastructure' },
    },
  },

  testStage: {
    kicker: '03 -TEST · APPLICATIONS',
    title: 'What happens in a real product?',
    intro:
      'A runtime demo or synthetic benchmark cannot expose every product constraint. I use real applications as proving grounds for the infrastructure.',
    note: 'Each application is an empirical proving ground.',
    applications: [
      {
        name: 'RedactGuard',
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
        colorClass: 'red',
        linkLabel: 'See the test →',
        whatItTests: 'Local inference + configurable PII + human review inside a controlled boundary.',
      },
      {
        name: 'Aura Finance',
        question: 'Can personal transactions be categorized without leaving the device?',
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
        colorClass: 'purple',
        linkLabel: 'See the test →',
        whatItTests: 'Small local model handling recurring semantic tasks without cloud exposure.',
      },
      {
        name: 'ClosedRoom',
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
        colorClass: 'blue',
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
      output: "It works. Now let's see if it works well enough.",
      leadsTo: 'A useful workflow must still meet real performance and resource constraints.',
      detailCta: { label: 'See the product tests', href: '/local-ai-use-cases' },
    },
  },

  measureStage: {
    kicker: '04 -MEASURE · EVIDENCE',
    title: 'Is it actually good enough?',
    intro:
      "'It runs' is a very low bar. We need to measure quality, latency, resources and observed behavior to know if local execution is actually viable.",
    criteria: [
      { icon: '⚡', title: 'Task Quality & Latency', text: 'TTFT, throughput, token generation latency and format adherence.' },
      { icon: '💾', title: 'Memory & Footprint', text: 'RAM / VRAM allocation, storage budget and memory pressure.' },
      { icon: '♨️', title: 'Hardware & Thermals', text: 'Thermal throttling, power draw and sustained mobile behavior.' },
      { icon: '🛡️', title: 'Reliability & Errors', text: 'Request completion rate, retry budgets and failure recovery.' },
      { icon: '📡', title: 'Boundary Observability', text: 'Network egress verification and declared vs observed traffic.' },
    ],
    closingMessage:
      'Working ≠ performing well. Performing well ≠ production ready. Evidence is what allows the next architecture decision.',
    handoff: {
      output: 'Evidence changes the next decision.',
      leadsTo: 'What we learn from real hardware, real products and measured behavior feeds back into the next architecture choice.',
      detailCta: { label: 'See what I measure', href: '/local-ai-performance' },
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
