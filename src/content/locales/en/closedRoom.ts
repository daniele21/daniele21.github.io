import type { AppProjectData } from '../../../types/projectApp';

export const closedRoomData: AppProjectData = {
  meta: {
    title: 'ClosedRoom — Private meeting intelligence for macOS',
    description:
      'Record, transcribe, identify speakers, extract decisions and actions, and build project memory with Local AI as the default boundary.',
  },
  hero: {
    eyebrow: 'PRODUCT · LOCAL-FIRST MEETING INTELLIGENCE',
    title: 'ClosedRoom',
    lede:
      'Turn meetings into operational memory. Record, transcribe and understand conversations on your Mac, then carry decisions, actions, risks and context across the project.',
    status: 'Active development · macOS',
    logoPath: 'images/closedroom/logo.png',
    meta: [
      'Local-first by default',
      'Speaker-aware transcripts',
      'Cross-meeting project memory',
    ],
    actions: [
      { label: 'See the workflow ↓', href: '#workflow' },
      {
        label: 'GitHub ↗',
        href: 'https://github.com/daniele21/closedroom',
        variant: 'secondary',
      },
    ],
    visualLabel: 'ClosedRoom Today and meeting intelligence workspaces',
    visuals: [
      {
        image: 'images/closedroom/home.jpg',
        alt: 'ClosedRoom Today workspace with meetings and reusable project context',
        caption: 'Today · meetings become reusable context',
      },
      {
        image: 'images/closedroom/meeting-analysis.jpg',
        alt: 'ClosedRoom meeting intelligence workspace with structured analysis',
        caption: 'Meeting intelligence · transcript, speakers and structured outputs',
      },
    ],
    visualNote: 'Record → Transcribe → Understand → Remember',
  },
  proof: {
    statement:
      'A meeting can become useful operational memory while the default trust boundary stays on the user’s Mac.',
    detail:
      'ClosedRoom keeps capture, transcription, structured intelligence and project memory local by default; cloud providers remain explicit choices, never silent fallbacks.',
  },
  problem: {
    kicker: 'THE PROBLEM',
    titleLine1: 'Meetings create knowledge.',
    titleLine2: 'Most tools leave it fragmented.',
    lede:
      'The useful output is rarely the transcript itself. Teams need to recover what changed, what was decided, who owns what, which risks remain open and how the project evolved across several conversations.',
    items: [
      {
        id: 1,
        title: 'Transcripts are not operational memory',
        description:
          'Long transcripts preserve words, but decisions, commitments, risks and open questions still have to be recovered manually.',
        color: 'blue',
      },
      {
        id: 2,
        title: 'Meetings stay isolated',
        description:
          'One meeting can explain one call. It does not automatically preserve the project state across a sequence of conversations.',
        color: 'teal',
      },
      {
        id: 3,
        title: 'Cloud often becomes the default boundary',
        description:
          'Sensitive audio and transcripts can leave the machine before the user receives any useful intelligence or project context.',
        color: 'violet',
      },
    ],
    statement:
      'ClosedRoom is designed around **meeting → intelligence → memory**, not around accumulating another archive of transcripts.',
  },
  benefits: {
    eyebrow: 'WHY CLOSEDROOM IS DIFFERENT',
    title: 'Private by default. Useful beyond the transcript.',
    description:
      'The product focuses on three outcomes that matter in real meeting workflows.',
    items: [
      {
        icon: '⌁',
        title: 'Private by default',
        description:
          'Sensitive meeting data stays on the Mac in the default path. External providers are explicit choices rather than hidden dependencies.',
      },
      {
        icon: '◎',
        title: 'Intelligence, not just transcripts',
        description:
          'ClosedRoom turns conversations into speaker-aware transcripts, actions, decisions, risks, questions and editable notes.',
      },
      {
        icon: '↻',
        title: 'Memory across meetings',
        description:
          'Outputs become reusable project context so commitments, risks and decisions do not disappear inside isolated meeting files.',
      },
    ],
  },
  workflow: {
    eyebrow: 'HOW IT WORKS',
    title: 'Record → Transcribe → Understand → Remember',
    description:
      'The user mental model stays simple even though capture, inference, enrichment and persistence remain separate engineering stages underneath.',
    steps: [
      {
        step: 1,
        title: 'Record',
        description:
          'Capture microphone and system audio locally and persist recoverable meeting artifacts before expensive inference begins.',
      },
      {
        step: 2,
        title: 'Transcribe',
        description:
          'Run the local ASR path as a persisted, observable job. Speaker diarization remains a separate enrichment instead of a prerequisite.',
      },
      {
        step: 3,
        title: 'Understand',
        description:
          'Turn the transcript into speaker-aware summaries, actions, decisions, risks, open questions and editable meeting notes.',
      },
      {
        step: 4,
        title: 'Remember',
        description:
          'Reuse meeting outputs inside Today and Project views so current status and historical context survive beyond a single call.',
      },
    ],
  },
  product: {
    eyebrow: 'THE PRODUCT',
    title: 'From live capture to cross-meeting project memory.',
    description:
      'The product surfaces the whole operational path instead of treating transcription as the final destination.',
    screenshots: [
      {
        image: 'images/closedroom/recording.jpg',
        alt: 'ClosedRoom recording setup',
        caption: 'Recording · focused setup before capture',
      },
      {
        image: 'images/closedroom/recording-active.jpg',
        alt: 'ClosedRoom active local recording',
        caption: 'Capture · the meeting is persisted before inference',
      },
      {
        image: 'images/closedroom/meeting-analysis.jpg',
        alt: 'ClosedRoom meeting intelligence workspace',
        caption: 'Meeting intelligence · transcript, speakers and structured outputs',
      },
      {
        image: 'images/closedroom/deep-dive-actions.jpg',
        alt: 'ClosedRoom deep-dive action items',
        caption: 'Actions · operational detail extracted from the conversation',
      },
      {
        image: 'images/closedroom/project-analysis.jpg',
        alt: 'ClosedRoom cross-meeting project analysis',
        caption: 'Project memory · status, decisions, risks and updates across meetings',
      },
      {
        image: 'images/closedroom/project-details.jpg',
        alt: 'ClosedRoom project detail workspace',
        caption: 'Project detail · reusable context instead of isolated transcripts',
      },
    ],
  },
  architecture: {
    eyebrow: 'ARCHITECTURE',
    title: 'ClosedRoom owns the meeting product. Korgis owns reusable Local AI runtime infrastructure.',
    description:
      'The macOS app and loopback FastAPI boundary coordinate recording, jobs, persistence, ASR, diarization and meeting state. Korgis provides the reusable LLM/VLM execution boundary underneath the product workflow.',
    diagramImage: 'images/closedroom/closedroom-local-first-architecture.svg',
    diagramAlt:
      'ClosedRoom local-first architecture showing the macOS product boundary, local ASR and diarization, Korgis runtime, persistence and optional cloud providers outside the default trust boundary',
  },
  evidence: {
    eyebrow: 'EVIDENCE & LIMITS',
    title: 'Local-first is an explicit system boundary, not a blanket quality claim.',
    description:
      'ClosedRoom already implements the core meeting-intelligence workflow and makes provider boundaries visible. Model quality, hardware behavior and broader privacy guarantees remain separate evidence questions.',
    note: {
      title: 'The product workflow and trust boundary are implemented; model and hardware claims stay scoped.',
      body:
        'ClosedRoom persists meeting artifacts locally, supports local ASR and diarization paths, produces structured meeting intelligence, preserves user edits and carries outputs into project memory. Optional Speechmatics and Gemini paths are explicit opt-ins and can move selected meeting data outside the local boundary.',
      evidenced: [
        'Local meeting capture with recoverable persisted artifacts before expensive inference',
        'Local transcription paths plus local FluidAudio diarization on supported Macs',
        'Structured summaries, actions, decisions, risks, questions and editable notes',
        'Cross-meeting Today and Project memory built from persisted meeting outputs',
        'Explicit provider selection with no silent cloud fallback in the default workflow',
        'Optional enrichment can degrade or abstain without invalidating a usable transcript',
      ],
      missing: [
        'Public downloadable GitHub Release for the macOS application',
        'Independent end-to-end privacy certification',
        'Representative latency, memory and thermal benchmark across supported Macs',
        'Guarantees of perfect transcription, speaker identity or meeting understanding',
      ],
    },
  },
  relations: [
    {
      stage: 'BUILD · INFRASTRUCTURE',
      title: 'Korgis',
      href: '/korgis',
      note: 'Reusable Local AI runtime and execution boundary',
    },
    {
      stage: 'PRODUCT · MEETING INTELLIGENCE',
      title: 'ClosedRoom',
      current: true,
      note: 'Sensitive workflow proving ground and operational memory product',
    },
    {
      stage: 'MEASURE · EVIDENCE',
      title: 'Performance Lab',
      href: '/performance-lab',
      note: 'Representative runtime and hardware viability evidence',
    },
  ],
  cta: {
    kicker: 'CLOSEDROOM · MACOS',
    titleLine1: 'Turn meetings into',
    titleLine2: 'operational memory.',
    lede:
      'Explore the source-built macOS project, its Local AI boundaries and the engineering decisions behind the full meeting-to-memory workflow.',
    primaryAction: {
      label: 'Explore ClosedRoom ↗',
      href: 'https://github.com/daniele21/closedroom',
    },
    secondaryAction: {
      label: 'Explore Korgis ↗',
      href: '/korgis',
    },
  },
};
