export interface RoadmapItem {
  code: string;
  name: string;
  status: 'implemented' | 'pass-emulator' | 'field-pending' | 'planned' | 'exploratory';
  statusLabel: string;
  description: string;
}

export interface TrafficAndroidData {
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    lede: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    statusLabels: string[];
    heroImage: string;
  };
  mission: {
    statement: string;
    supportingCopy: string;
    principles: string[];
  };
  difference: {
    title: string;
    subtitle: string;
    questions: {
      question: string;
      answer: string;
      details: string[];
    }[];
  };
  surfaces: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      question: string;
      description: string;
      badge: string;
      imagePath?: string;
    }[];
  };
  evidenceModel: {
    title: string;
    subtitle: string;
    coverageFormula: string[];
    coverageExplanation: string;
    healthStates: {
      state: 'Good' | 'Limited' | 'Degraded';
      rule: string;
      description: string;
    }[];
  };
  architecture: {
    title: string;
    subtitle: string;
    tiers: {
      tierNumber: number;
      name: string;
      components: string[];
      description: string;
    }[];
    imagePath: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    mRoadmap: RoadmapItem[];
    eRoadmap: RoadmapItem[];
  };
  harnessRelationship: {
    title: string;
    subtitle: string;
    description: string;
    harnessBox: { title: string; text: string };
    trafficBox: { title: string; text: string };
  };
  privacy: {
    title: string;
    keptVisible: string[];
    notClaimed: string[];
  };
  maturity: {
    title: string;
    implemented: string[];
    fieldValidationRequired: string[];
    planned: string[];
  };
  finalCta: {
    kicker: string;
    headline: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
}

export const trafficMonitoringAndroidData: TrafficAndroidData = {
  hero: {
    eyebrow: 'EVIDENCE-FIRST NETWORK OBSERVABILITY · Android',
    headline: 'Know your network usage - ',
    headlineHighlight: 'and the evidence behind it.',
    lede: 'Traffic Monitoring measures how much data an Android device used, when and on which network, while preserving attribution confidence, continuity gaps and explicit Unattributed usage.',
    primaryCtaLabel: 'See how evidence works',
    primaryCtaHref: '#evidence-model',
    secondaryCtaLabel: 'Explore GitHub ↗',
    secondaryCtaHref: 'https://github.com/daniele21/traffic-monitoring-android',
    statusLabels: ['Android', 'E1 implemented', 'Field validation pending'],
    heroImage: 'images/traffic-monitoring-android/overview.png',
  },
  mission: {
    statement: 'Measure before claiming. Preserve uncertainty. Make results auditable.',
    supportingCopy:
      'Android network observability should not rely on opaque cloud meters or unverified background assumptions. When attribution context is ambiguous, evidence must stay explicitly Unattributed.',
    principles: ['Deterministic attribution', 'Evidence with provenance', 'User-controlled export'],
  },
  difference: {
    title: 'What Makes It Different',
    subtitle: 'Traffic Monitoring separates usage totals from attribution provenance and technical diagnostics.',
    questions: [
      {
        question: 'What happened?',
        answer: 'How much data did this Android device use, when, and on which Wi-Fi / hotspot / mobile network?',
        details: ['Total bytes used, download vs upload breakdown', 'Timeframe filtering (Today, 7d, 30d, This month, Custom)', 'Per-network ranking & peak detection'],
      },
      {
        question: 'How do we know?',
        answer: 'How much of that usage is supported by trustworthy evidence, and where did measurement continuity break down?',
        details: [
          'Deterministic attributed vs unattributed intervals',
          'Evidence Coverage percentage calculation',
          'Measurement Health states (Good, Limited, Degraded)',
          'Continuity gap tracking & discarded interval logs',
        ],
      },
    ],
  },
  surfaces: {
    title: 'Product UX Surfaces',
    subtitle: 'A clean, restrained UX boundary separating usage, evidence provenance, and lower-level diagnostics.',
    items: [
      {
        name: 'Overview',
        question: 'What is my device network status and top-line usage?',
        description: 'Current network state, total bytes used, download/upload breakdown, usage trend, peak traffic, top networks, and compact Evidence summary card.',
        badge: 'Usage UX',
      },
      {
        name: 'Networks',
        question: 'Which networks account for usage?',
        description: 'Ranked list of network contexts with human-readable network names, transport type (Wi-Fi, Hotspot, Cellular), byte percentage, and explicit Unattributed traffic.',
        badge: 'Usage UX',
      },
      {
        name: 'Evidence',
        question: 'How trustworthy is the attribution data?',
        description: 'Human-readable provenance screen displaying Evidence Coverage %, Measurement Health status with explicit reasons, attributed vs unattributed breakdown, continuity gaps, and discarded interval summaries.',
        badge: 'Provenance UX',
      },
      {
        name: 'Monitor',
        question: 'How did Android measure the network?',
        description: 'Technical diagnostics console surfacing raw ConnectivityManager callbacks, TrafficStats counter snapshots, attribution intervals, recovery logs, and engineering ZIP export.',
        badge: 'Diagnostics UX',
      },
    ],
  },
  evidenceModel: {
    title: 'Evidence Coverage v1 & Measurement Health',
    subtitle: 'Coverage measures attribution ratio; Health measures measurement continuity and integrity.',
    coverageFormula: [
      'accountedBytes',
      '=',
      'attributedBytes',
      '+',
      'unattributedBytes',
      '\\\\',
      'Evidence Coverage %',
      '=',
      'attributedBytes / accountedBytes',
    ],
    coverageExplanation:
      'If there is no accountable usage in the selected period, the app explicitly displays "Not enough data" rather than manufacturing 100% coverage.',
    healthStates: [
      {
        state: 'Good',
        rule: 'Coverage ≥ 95% and zero discarded evidence intervals',
        description: 'Measurement was continuous with verified network identity and clean counter deltas.',
      },
      {
        state: 'Limited',
        rule: 'Incomplete coverage or some discarded evidence intervals',
        description: 'Some unmonitored gaps occurred or minor counter wrap-arounds required discarding.',
      },
      {
        state: 'Degraded',
        rule: 'Coverage < 80%, a gap ≥ 30 minutes, or ≥ 3 discarded intervals',
        description: 'Significant gaps or background interruptions degraded overall attribution confidence.',
      },
    ],
  },
  architecture: {
    title: '4-Tier Local-First Architecture',
    subtitle: 'Decoupled data pipeline from system callbacks down to user analytics and ZIP export.',
    tiers: [
      {
        tierNumber: 1,
        name: 'Android Platform Signals',
        components: ['ConnectivityManager', 'InProcessNetworkMonitor', 'PendingIntentNetworkMonitor', 'TrafficStats', 'WorkManager recovery'],
        description: 'Captures interface transitions, device RX/TX counter statistics, process lifecycle events, and coarse safety-net recovery.',
      },
      {
        tierNumber: 2,
        name: 'Raw Evidence & Attribution Engine',
        components: ['CurrentNetworkReader', 'ValidationDatabase (Room)', 'AttributionEngine'],
        description: 'Normalizes network metadata, persists raw un-summarized observations, and computes interval confidence (attributed, unattributed, discarded).',
      },
      {
        tierNumber: 3,
        name: 'Derived Product State',
        components: ['UsageDatabase', 'UsageBucketAllocator (5m)', 'EvidenceSummary Evaluator'],
        description: 'Allocates accepted attribution intervals into fixed 5-minute time windows and deterministically evaluates Evidence Coverage % and Health.',
      },
      {
        tierNumber: 4,
        name: 'User Experience & Export Pipeline',
        components: ['ProductScreen (Overview/Networks)', 'EvidenceScreen', 'ObservabilityDashboardScreen', 'ValidationExporter (ZIP)'],
        description: 'Renders Jetpack Compose UI surfaces and packages engineering diagnostic ZIPs or future Evidence Packs.',
      },
    ],
    imagePath: 'images/traffic-monitoring-android/architecture.jpg',
  },
  roadmap: {
    title: 'Two Parallel Development Tracks',
    subtitle: 'Separate roadmaps track Android system measurement reliability (M) and evidence product capability (E).',
    mRoadmap: [
      {
        code: 'M1A',
        name: 'Persistence & Export',
        status: 'pass-emulator',
        statusLabel: 'PASS on emulator',
        description: 'Room persistence and engineering validation ZIP export pipeline.',
      },
      {
        code: 'M1B',
        name: 'Counters & In-Process Evidence',
        status: 'pass-emulator',
        statusLabel: 'PASS on emulator',
        description: 'TrafficStats byte delta reader & live in-process callbacks.',
      },
      {
        code: 'M1C',
        name: 'PendingIntent Background Monitoring',
        status: 'field-pending',
        statusLabel: 'Implemented · Field validation pending',
        description: 'Manifest BroadcastReceiver & PendingIntent background network availability.',
      },
      {
        code: 'M1E',
        name: '48–72h Field Protocol',
        status: 'field-pending',
        statusLabel: 'Ready · Physical run pending',
        description: 'Standard-mode physical device run across sleep, doze, and network transitions.',
      },
      {
        code: 'M5',
        name: 'Multi-OEM Device Matrix',
        status: 'field-pending',
        statusLabel: 'Implemented · OEM matrix pending',
        description: 'Validation across AOSP/Pixel, Samsung, and aggressive-background OEM devices.',
      },
    ],
    eRoadmap: [
      {
        code: 'E0',
        name: 'Positioning & Semantics',
        status: 'implemented',
        statusLabel: 'Documented',
        description: 'Evidence-first positioning, scope, and truthfulness contract.',
      },
      {
        code: 'E1',
        name: 'Coverage & Health',
        status: 'implemented',
        statusLabel: 'Implemented · UX ready',
        description: 'Evidence Coverage v1 %, Measurement Health evaluation, and explicit Unattributed state.',
      },
      {
        code: 'E2',
        name: 'Human-Readable Evidence Pack',
        status: 'planned',
        statusLabel: 'Next milestone',
        description: 'Human-readable Evidence Timeline & verifiable portable Evidence Pack.',
      },
      {
        code: 'E3',
        name: 'Experiment Mode',
        status: 'planned',
        statusLabel: 'Planned',
        description: 'Bounded evaluation runs for testing local software network behavior claims.',
      },
      {
        code: 'E4',
        name: 'Deterministic Assertions',
        status: 'planned',
        statusLabel: 'Planned',
        description: 'Truthful test outcomes: PASS, FAIL, or INCONCLUSIVE based on evidence threshold.',
      },
    ],
  },
  harnessRelationship: {
    title: 'Relationship to Android Local LLM Harness',
    subtitle: 'Complementary local-first pillars sharing an engineering philosophy without a hard dependency.',
    description:
      'Harness explores reusable on-device AI inference execution on Android. Traffic Monitoring explores how Android can document network conditions and attribution uncertainty around local software. Neither project requires the other to remain useful.',
    harnessBox: {
      title: 'Android Local LLM Harness',
      text: 'On-device LLM inference runtime, GGUF/llama.cpp execution, and memory/thermal profiling.',
    },
    trafficBox: {
      title: 'Traffic Monitoring Android',
      text: 'Device network usage measurement, attribution confidence, Evidence Coverage, and diagnostic export.',
    },
  },
  privacy: {
    title: 'Privacy Boundary & Invariants',
    keptVisible: [
      'Operates 100% on-device without cloud dependencies.',
      'Records NO packet contents, payloads, or message text.',
      'Records NO DNS queries, URLs, or browsing history.',
      'Requires NO local VPN traffic interception for v1.',
      'Uses event-driven PendingIntent callbacks rather than a forced permanent Foreground Service.',
    ],
    notClaimed: [
      'Does not claim 100% background reliability across all Android OEM custom ROMs prior to M5 field runs.',
      'Does not claim per-app network locality attribution in v1.',
      'Does not transform missing evidence into a PASS privacy verdict.',
    ],
  },
  maturity: {
    title: 'Current Project Maturity',
    implemented: [
      'Persistence & export pipeline (M1A)',
      'Counters & in-process evidence engine (M1B)',
      'Deterministic attribution & 5-minute bucket store (M3)',
      'Product UX (Overview, Networks, Evidence, Monitor) (M4)',
      'Evidence Coverage v1 & Measurement Health (E1)',
    ],
    fieldValidationRequired: [
      'PendingIntent background behavior when process absent (M1C)',
      '48–72h Standard-mode physical device run (M1E)',
      'Deterministic attribution replay acceptance (M2)',
      'Multi-OEM device matrix validation (M5)',
    ],
    planned: [
      'Human-readable Evidence Timeline & Evidence Pack (E2)',
      'Experiment Mode for bounded hypothesis runs (E3)',
      'Deterministic Assertions (PASS / FAIL / INCONCLUSIVE) (E4)',
    ],
  },
  finalCta: {
    kicker: 'TRAFFIC MONITORING FOR ANDROID',
    headline: 'Measure the usage. Preserve how you know.',
    body: 'Explore the implementation, run the emulator debug script, or contribute physical device evidence across Android and OEM conditions.',
    primaryCtaLabel: 'Explore Traffic Monitoring Android on GitHub ↗',
    primaryCtaHref: 'https://github.com/daniele21/traffic-monitoring-android',
    secondaryCtaLabel: 'View Evidence & Observability family',
    secondaryCtaHref: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/#evidence`,
  },
};
