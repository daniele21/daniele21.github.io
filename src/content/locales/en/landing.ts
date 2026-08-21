/**
 * Canonical landing page content dictionary.
 * Reconciled against 08 (Strategy), 09 (Copy & UX), and current verified evidence.
 */
import type { LandingPageData } from '../../../types/landing';

export const landingData: LandingPageData = {
  header: {
    brandName: 'Daniele Moltisanti',
    links: [
      { label: 'The path', href: '/#strategy' },
      { label: 'Systems', href: '/#infrastructure' },
      { label: 'Evidence', href: '/#evidence' },
      { label: 'Notes', href: '/insights' },
      { label: 'About', href: '/about' },
    ],
    cta: {
      label: 'Follow research',
      href: 'https://www.linkedin.com/in/daniele-moltisanti/',
      external: true,
    },
  },

  hero: {
    identity: {
      name: 'Daniele Moltisanti',
      role: 'AI Systems Engineer · Applied Research',
      portraitPath: 'images/profile-photo.jpg',
      portraitAlt: 'Daniele Moltisanti portrait',
      bio: 'I build applied AI systems to understand where local execution creates real value.',
    },
    mission: {
      eyebrow: "WHAT I'M EXPLORING",
      lead: 'Run AI where it makes sense.',
      title: 'Local AI first ≠',
      titleHighlight: 'Local AI only',
      challenge: 'How far can AI move from the cloud to systems we control?',
      explanation:
        'Some workloads benefit from staying local: sensitive data stays closer, dependencies shrink, and you gain more control over how the system runs. Others still belong in the cloud.',
      position: 'Find the boundary with evidence, not ideology.',
      proofLine:
        'I do that by deciding where AI should run, building the infrastructure that makes local execution possible, testing it inside real products, and measuring how well it actually performs.',
      primaryCta: {
        label: 'Explore the method',
        href: '#strategy',
      },
      secondaryCta: {
        label: 'Read field notes',
        href: 'insights',
      },
    },
  },

  decisionStage: {
    kicker: '01 — STRATEGY & DECISION',
    title: 'Where should AI\nactually run?',
    intro:
      'I start with the workload—not the model—to decide whether Local, Hybrid or Cloud best fits its privacy, control and operating constraints.',
    drivers: [
      {
        icon: '◇',
        title: 'Privacy',
        text: 'Does sensitive data need to leave the environment?',
      },
      {
        icon: '▣',
        title: 'Control',
        text: 'Do we need ownership of models, runtimes, configuration and execution path?',
      },
      {
        icon: '↗',
        title: 'Dependency',
        text: 'How exposed are we to vendors, API changes, pricing and external availability?',
      },
      {
        icon: '⌕',
        title: 'Operational fit',
        text: 'What do latency, connectivity, reliability and scale actually require?',
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
      output: 'A placement decision and clear constraints.',
      leadsTo: 'If Local or Hybrid earns a role, those requirements become the brief for the execution layer.',
      detailCta: { label: 'Explore the strategy plane', href: '/local-ai-strategy' },
    },
  },

  buildStage: {
    kicker: '02 — ARCHITECTURE & INFRASTRUCTURE',
    title: 'How do we make\nLocal AI usable?',
    intro:
      'I turn that decision into reusable runtimes: model lifecycle, stable APIs and telemetry across servers, desktops and Android devices.',
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
        summary: 'A reusable OpenAI-compatible gateway for local inference.',
        href: '/local-llm-server',
        imagePath: 'images/local-llm-server/overview.png',
        imageAlt: 'Local LLM Server overview interface',
      },
      {
        id: 'android-harness',
        title: 'Android Local LLM Harness',
        eyebrow: 'ON-DEVICE · ANDROID',
        summary: 'A real-device lab for memory, thermal and runtime constraints.',
        href: '/android-local-llm-harness',
        imagePath: 'images/harness/harness-overview.png',
        imageAlt: 'Android Local LLM Harness overview',
      },
      {
        id: 'local-asr-server',
        title: 'Local ASR Server',
        eyebrow: 'SPEECH · AUDIO',
        summary: 'A private speech-to-text primitive for local workflows.',
        href: '/local-asr-server',
      },
    ],
    closingMessage:
      'Running a model is just the starting point. The architecture layer turns raw weights into dependable, app-ready runtime boundaries.',
    handoff: {
      output: 'Execution layers that products can actually use.',
      leadsTo: 'Infrastructure creates potential value. Real products reveal whether that potential survives real workflows.',
      detailCta: { label: 'Explore architecture & infrastructure', href: '/local-ai-infrastructure' },
    },
  },

  testStage: {
    kicker: '03 — APPLICATIONS AS PROVING GROUNDS',
    title: 'What happens in\na real product?',
    intro:
      'I put the infrastructure inside real products to expose value, friction and failure modes that benchmarks miss.',
    note: 'Each application is an empirical test bed.',
    applications: [
      {
        name: 'RedactGuard',
        question: 'Can sensitive document processing stay local?',
        description:
          'Local LLM inference for sensitive documents — configurable PII detection, human-in-the-loop review, and controlled privacy-preserving export.',
        href: 'redact-guard',
        logoPath: 'images/redact-guard/logo.png',
        imagePath: 'images/redact-guard/redactguard-review.jpg',
        colorClass: 'red',
        linkLabel: 'View project →',
        whatItTests: 'Local LLM inference on structured documents with zero cloud transmission.',
      },
      {
        name: 'Aura Finance',
        question: 'Can financial transactions be understood on-device?',
        description:
          'On-device transaction intelligence — semantic merchant recognition and categorization on mobile without transmitting personal financial ledgers.',
        href: 'aura-finance',
        logoPath: 'images/aura/logo.png',
        imagePath: 'images/aura-finance/aura-payment-detection.png',
        colorClass: 'purple',
        linkLabel: 'View project →',
        whatItTests: 'On-device semantic extraction coupled with deterministic financial math.',
      },
      {
        name: 'ClosedRoom',
        question: 'Can meeting intelligence stay inside the room?',
        description:
          'Local recording, ASR, speaker context, and project memory on macOS — keeping external frontier models strictly opt-in.',
        href: 'closedroom',
        logoPath: 'images/closedroom/logo.png',
        imagePath: 'images/closedroom/meeting-analysis.jpg',
        colorClass: 'blue',
        linkLabel: 'View project →',
        whatItTests: 'Multi-primitive orchestration (Audio + ASR + LLM) within a local trust boundary.',
      },
    ],
    nextCard: {
      name: 'Your Next Workload',
      description: 'Test your application requirements with the same empirical local-first methodology.',
      linkLabel: 'Discuss an architecture →',
    },
    closingMessage: 'The value of this layer is turning architectural capability into verifiable product evidence.',
    handoff: {
      output: 'Real value, friction and failure cases.',
      leadsTo: 'A useful demo is still not performance evidence. The next plane measures how the system behaves.',
      detailCta: { label: 'Explore the use-case plane', href: '/local-ai-use-cases' },
    },
  },

  measureStage: {
    kicker: '04 — OBSERVABILITY & MEASUREMENT',
    title: 'How does it perform\nin the real world?',
    intro:
      'Then I measure quality, latency, throughput, resources and reliability on the actual workload and hardware.',
    criteria: [
      { icon: '▥', title: 'Is it fast enough?', text: 'Time to first token (TTFT), inter-token latency, and token throughput.' },
      { icon: '▧', title: 'Does it fit?', text: 'RAM/VRAM footprint, storage, CPU/GPU utilization, and memory pressure.' },
      { icon: '♨', title: 'Can hardware sustain it?', text: 'Thermal throttling, battery drain, and long-session stability.' },
      { icon: '◇', title: 'Is it reliable?', text: 'Completion rates, retry behavior, format adherence, and failure modes.' },
      { icon: '◎', title: 'Is the claim observable?', text: 'Network boundary verification and explicit limitation reporting.' },
    ],
    closingMessage:
      'Working ≠ performing well. Performing well ≠ production ready. Evidence is what allows the next architecture decision.',
    handoff: {
      output: 'Evidence tied to the workload, device and method.',
      leadsTo: 'The evidence returns to Strategy and can change the next decision to Local, Hybrid, or Cloud.',
      detailCta: { label: 'Explore performance & observability', href: '/local-ai-performance' },
    },
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
        href: 'local-llm-server',
        badge: 'Active System',
      },
      {
        id: 'android-harness',
        title: 'Android Local LLM Harness',
        role: 'On-device inference lab & execution gateway',
        description:
          'Mobile runtime environment profiling memory pressure, thermal degradation, NPU acceleration, and cross-application AIDL boundaries.',
        technologies: ['Kotlin', 'Android NDK', 'llama.cpp', 'AIDL'],
        href: 'android-local-llm-harness',
        badge: 'Lab Prototype',
      },
      {
        id: 'traffic-monitoring',
        title: 'Traffic Monitoring Platform',
        role: 'Observability & network boundary validation',
        description:
          'Non-intrusive network traffic analysis proving whether applications maintain declared local-first boundaries without inspecting private payloads.',
        technologies: ['macOS Network Extension', 'Android VpnService', 'eBPF'],
        href: 'traffic-monitoring',
        badge: 'Evidence System',
      },
    ],
  },

  fieldNotes: {
    kicker: 'DATED FIELD NOTES',
    title: 'Research Thinking & Field Notes',
    description:
      'Empirical observations, architectural trade-offs, and practical lessons from building and evaluating local AI systems.',
    notes: [
      {
        id: 'note-01',
        date: '2026-08',
        title: 'The Local AI First Principle: Why Defaulting to Cloud is a Risk',
        excerpt:
          'Examining why unexamined cloud dependencies introduce privacy, reliability, and vendor risks—and how to establish workload boundaries.',
        readTime: '6 min read',
        href: 'insights',
      },
      {
        id: 'note-02',
        date: '2026-07',
        title: 'Profiling 70B Models on Apple Silicon: Memory, Quantization, and Latency',
        excerpt:
          'Comparative benchmarks of 4-bit and 8-bit quantized models on unified memory architectures under sustained production workloads.',
        readTime: '8 min read',
        href: 'insights',
      },
      {
        id: 'note-03',
        date: '2026-06',
        title: 'On-Device AI in Production: The Reality of Thermal Budgets and Battery Life',
        excerpt:
          'What happens when mobile LLMs run outside synthetic benchmarks: real battery drain, background scheduling, and OS lifecycle management.',
        readTime: '5 min read',
        href: 'insights',
      },
    ],
  },

  aboutSignal: {
    kicker: 'ABOUT & TRACK RECORD',
    heading: 'Applied AI systems engineering with verifiable discipline.',
    summary:
      'I am an AI and software product engineer focused on private compute, on-device intelligence, and dependable system boundaries. My work combines strategic judgment with hands-on systems architecture.',
    highlights: [
      { label: 'Engineering Standards', detail: 'Bounded memory, explicit failure modes, and reproducible environments.' },
      { label: 'Ecosystem Focus', detail: 'Apple Silicon MLX, Android NPU/NDK, open-weight GGUF architectures.' },
      { label: 'Open Research', detail: 'Transparent benchmarks, published methodologies, and open-source artifacts.' },
      { label: 'Advisory & Strategy', detail: 'Helping teams decide between Local, Hybrid, and Cloud architectures.' },
    ],
    linkedinUrl: 'https://www.linkedin.com/in/daniele-moltisanti/',
    githubUrl: 'https://github.com/daniele21',
  },

  finalCta: {
    kicker: 'THE LOOP',
    title: 'Evidence changes the next decision.',
    body: 'What we learn from real hardware, real products, and measured behavior feeds back into the next architecture choice.',
    loopSequence: 'DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN',
    payoff: "That's what Local AI first ≠ Local AI only means in practice.",
    consultation: {
      heading: 'Facing the same decisions?',
      body: 'I work with technical leaders and engineering teams evaluating what should run Local, Hybrid, or Cloud.',
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
