/**
 * closedRoom.ts
 * Structured data configuration for ClosedRoom page matching prototype.
 */

export interface ClosedRoomProblem {
  id: string;
  title: string;
  description: string;
  color: 'blue' | 'teal' | 'violet';
}

export interface ClosedRoomFlowStep {
  step: number;
  title: string;
  description: string;
}

export interface ClosedRoomValue {
  id: string;
  title: string;
  description: string;
  color: 'teal' | 'blue' | 'violet' | 'amber';
  quote?: string;
  featured?: boolean;
}

export interface ClosedRoomScenario {
  tag: string;
  title: string;
  description: string;
  shots: Array<{
    image: string;
    label: string;
    alt: string;
  }>;
  reverse?: boolean;
}

export interface ClosedRoomTechPoint {
  title: string;
  description: string;
}

export interface ClosedRoomData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    pills: string[];
    imageHome: string;
    imageAnalysis: string;
    visualNote: string;
  };
  problem: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    items: ClosedRoomProblem[];
    statement: string;
  };
  solution: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    steps: ClosedRoomFlowStep[];
  };
  values: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    items: ClosedRoomValue[];
  };
  product: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    scenarios: ClosedRoomScenario[];
  };
  flow: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    image: string;
  };
  architecture: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    image: string;
    points: ClosedRoomTechPoint[];
  };
  trust: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    local: {
      title: string;
      description: string;
      stack: string;
    };
    cloud: {
      title: string;
      description: string;
      tagline: string;
    };
  };
  cta: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    githubUrl: string;
  };
}

export const closedRoomData: ClosedRoomData = {
  meta: {
    title: 'ClosedRoom , Local-first Meeting Intelligence',
    description: 'Record, transcribe, identify speakers, analyze, and remember meetings locally on macOS.',
  },
  hero: {
    eyebrow: 'Local-first meeting intelligence for macOS',
    titleLine1: 'Remember the work.',
    titleLine2: 'Not just the transcript.',
    lede: '**ClosedRoom** records, transcribes, identifies speakers, analyzes, and remembers meetings locally , so decisions, actions, risks, and project context do not disappear after the call.',
    pills: [
      '**Local-first** by default',
      '**Speaker-aware** transcripts',
      '**Project memory**, not isolated notes',
    ],
    imageHome: 'images/closedroom/home.jpg',
    imageAnalysis: 'images/closedroom/meeting-analysis.jpg',
    visualNote: 'Meeting → actions → decisions → project memory',
  },
  problem: {
    kicker: 'Why ClosedRoom exists',
    titleLine1: 'Meetings create knowledge.',
    titleLine2: 'Most tools leave it fragmented.',
    lede: 'Raw transcripts are useful, but they are rarely the final thing people need. The value lives in what was decided, who committed to what, what changed, and what still needs attention.',
    items: [
      {
        id: '01',
        title: 'Context disappears',
        description: 'Decisions, risks and commitments get buried inside long transcripts, notes and chat history.',
        color: 'blue',
      },
      {
        id: '02',
        title: 'Meetings stay isolated',
        description: 'A transcript explains one call. It does not automatically show how a project changed across several meetings.',
        color: 'teal',
      },
      {
        id: '03',
        title: 'Cloud becomes the default boundary',
        description: 'Many meeting assistants require sensitive audio and transcript data to leave the machine before intelligence becomes useful.',
        color: 'violet',
      },
    ],
    statement: 'ClosedRoom turns meetings into a **local operational memory** instead of another pile of transcripts.',
  },
  solution: {
    kicker: 'The product idea',
    titleLine1: 'Capture first.',
    titleLine2: 'Build intelligence after.',
    lede: 'ClosedRoom preserves the meeting locally, then adds ASR, speaker diarization, visual evidence, and structured analysis as separate layers.',
    steps: [
      { step: 1, title: 'Configure', description: 'Choose diarization, visual intelligence and provider options.' },
      { step: 2, title: 'Record', description: 'Save microphone, system audio and recoverable artifacts locally.' },
      { step: 3, title: 'Transcribe', description: 'Run local MLX / Nemotron ASR and persist timestamped text.' },
      { step: 4, title: 'Enrich', description: 'Add speaker clusters, visual evidence and audio intelligence.' },
      { step: 5, title: 'Analyze', description: 'Extract summaries, actions, decisions, risks and project updates.' },
      { step: 6, title: 'Remember', description: 'Reuse the output across Today, Meeting and Project workspaces.' },
    ],
  },
  values: {
    kicker: 'What matters',
    titleLine1: 'Useful intelligence with',
    titleLine2: 'explicit boundaries.',
    items: [
      {
        id: '01',
        title: 'Local-first control',
        description: 'Audio, transcripts, prompts, analysis outputs, diarization and visual artifacts stay on the Mac by default.',
        color: 'teal',
        quote: 'The local machine is the default trust boundary.',
        featured: true,
      },
      {
        id: '02',
        title: 'Intelligence over transcription',
        description: 'ClosedRoom is designed to surface actions, decisions, risks, minutes and project updates , not just text.',
        color: 'blue',
      },
      {
        id: '03',
        title: 'Human-reviewable attribution',
        description: 'Speaker clusters remain stable. Visual evidence can suggest names only when confidence rules are satisfied.',
        color: 'violet',
      },
      {
        id: '04',
        title: 'Fail-soft enrichment',
        description: 'Optional diarization or visual intelligence can fail without invalidating a usable transcript.',
        color: 'amber',
      },
    ],
  },
  product: {
    kicker: 'Product proof',
    titleLine1: 'From a live meeting to',
    titleLine2: 'something you can act on.',
    scenarios: [
      {
        tag: 'RECORD → TRANSCRIBE',
        title: 'Preserve the meeting before inference starts.',
        description: 'ClosedRoom records microphone and system audio locally, then runs transcription asynchronously. The meeting exists as a recoverable artifact before expensive processing begins.',
        shots: [
          {
            image: 'images/closedroom/recording.jpg',
            label: 'Configure the recording',
            alt: 'ClosedRoom recording setup',
          },
          {
            image: 'images/closedroom/recording-active.jpg',
            label: 'Capture locally',
            alt: 'ClosedRoom active recording',
          },
        ],
      },
      {
        tag: 'TRANSCRIPT → INTELLIGENCE',
        title: 'See what matters without rereading everything.',
        description: 'The Meeting workspace connects audio, transcript, speaker context and structured outputs , including actions, decisions, risks and deeper analysis.',
        reverse: true,
        shots: [
          {
            image: 'images/closedroom/meeting-analysis.jpg',
            label: 'Meeting intelligence',
            alt: 'ClosedRoom meeting analysis',
          },
          {
            image: 'images/closedroom/deep-dive-actions.jpg',
            label: 'Actions in detail',
            alt: 'ClosedRoom deep-dive actions',
          },
        ],
      },
      {
        tag: 'MEETING → PROJECT MEMORY',
        title: 'Carry context across multiple conversations.',
        description: 'Project views reuse meeting-level intelligence so the product can show current status, open actions, decisions, risks and recent changes without starting from zero after every call.',
        shots: [
          {
            image: 'images/closedroom/project-analysis.jpg',
            label: 'Cross-meeting project view',
            alt: 'ClosedRoom project analysis',
          },
          {
            image: 'images/closedroom/project-details.jpg',
            label: 'Operational project detail',
            alt: 'ClosedRoom project details',
          },
        ],
      },
    ],
  },
  flow: {
    kicker: 'End-to-end flow',
    titleLine1: 'The complete pipeline,',
    titleLine2: 'without hiding the boundaries.',
    image: 'images/closedroom/end-to-end-flow.png',
  },
  architecture: {
    kicker: 'Architecture',
    titleLine1: 'Local-first is a',
    titleLine2: 'system design choice.',
    lede: 'The UI talks to one local FastAPI boundary. Recording, jobs, ASR, diarization, local model runtimes, persistence and diagnostics are coordinated behind that boundary.',
    image: 'images/closedroom/architecture.png',
    points: [
      {
        title: 'Product surface',
        description: 'React/TypeScript runs in the browser or native WKWebView shell.',
      },
      {
        title: 'Local orchestration',
        description: 'FastAPI + AppServices coordinate recording, transcription, analysis, runtime and workspace state.',
      },
      {
        title: 'Replaceable execution',
        description: 'MLX/Nemotron, FluidAudio, Qwen3-VL and local-llm-server remain isolated behind explicit service boundaries.',
      },
    ],
  },
  trust: {
    kicker: 'Privacy boundary',
    titleLine1: 'Local by default.',
    titleLine2: 'Cloud only when chosen.',
    local: {
      title: 'Default local path',
      description: 'Audio, transcripts, diarization artifacts, visual observations, local prompts, analysis results and project state remain on the Mac.',
      stack: 'MLX / Nemotron · FluidAudio · Qwen3-VL · local-llm-server',
    },
    cloud: {
      title: 'Explicit opt-in path',
      description: 'Speechmatics and Gemini sit outside the default trust boundary and are used only when the user intentionally selects those providers.',
      tagline: 'No hidden cloud dependency in the default workflow.',
    },
  },
  cta: {
    kicker: 'ClosedRoom',
    titleLine1: 'Turn meetings into',
    titleLine2: 'operational memory.',
    lede: 'A local-first macOS workspace for recording, transcription, speaker context, structured analysis, and project memory.',
    githubUrl: 'https://github.com/daniele21/local-asr-server/tree/speaker_detection',
  },
};
