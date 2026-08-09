export interface TrafficMacTier {
  tierNumber: number;
  title: string;
  subtitle: string;
  status: 'authoritative' | 'preview' | 'experimental';
  statusLabel: string;
  features: string[];
  safeConclusion: string;
}

export interface TrafficMacSurface {
  id: string;
  name: string;
  question: string;
  description: string;
  capabilityLabel: string;
  imagePath: string;
  altText: string;
}

export interface TrafficMacData {
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
  problem: {
    title: string;
    practicalQuestion: string;
    points: { number: string; title: string; description: string }[];
  };
  tiers: {
    title: string;
    subtitle: string;
    items: TrafficMacTier[];
  };
  surfaces: {
    title: string;
    subtitle: string;
    items: TrafficMacSurface[];
  };
  coverage: {
    title: string;
    subtitle: string;
    formula: string[];
    states: { label: string; description: string }[];
    disclaimer: string;
  };
  architecture: {
    title: string;
    subtitle: string;
    simplifiedFlow: string[];
    details: string[];
    imagePath: string;
  };
  privacy: {
    title: string;
    keptVisible: string[];
    notClaimed: string[];
  };
  maturity: {
    title: string;
    matrix: { capability: string; displayStatus: string; note: string }[];
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

export const trafficMonitoringData: TrafficMacData = {
  hero: {
    eyebrow: 'EVIDENCE & OBSERVABILITY · macOS',
    headline: 'Measure what moves. ',
    headlineHighlight: 'Understand where it moves.',
    lede: 'Traffic Monitoring gives Mac users local network history, usage by network, trends and observation coverage - then adds progressively stronger application activity evidence without making packet content the price of observability.',
    primaryCtaLabel: 'See the evidence model',
    primaryCtaHref: '#evidence-tiers',
    secondaryCtaLabel: 'Explore GitHub ↗',
    secondaryCtaHref: 'https://github.com/daniele21/traffic-monitoring',
    statusLabels: ['macOS 14+', 'Core usable today', 'Applications Beta'],
    heroImage: 'images/traffic-monitoring/overview.png',
  },
  mission: {
    statement: 'Make network behavior understandable before trying to make it verifiable.',
    supportingCopy:
      'A trustworthy local-first claim needs measured behavior, explicit coverage and honest limits. Traffic Monitoring starts with useful network analytics and strengthens evidence only when the source supports it.',
    principles: ['Evidence over claims', 'Observe, do not inspect', 'Unknown is valid'],
  },
  problem: {
    title: 'Why it exists',
    practicalQuestion: 'How much data am I actually using when my Mac connects through my phone hotspot?',
    points: [
      {
        number: '01',
        title: 'Counters without network context are hard to act on',
        description:
          'Knowing total bytes downloaded is far less useful than knowing whether those bytes occurred on home Wi-Fi or a constrained mobile hotspot.',
      },
      {
        number: '02',
        title: 'Selected periods without coverage metrics are misleading',
        description:
          'Showing a 7-day usage chart without revealing that the Mac was asleep or the app was closed for 3 of those days creates a false sense of completeness.',
      },
      {
        number: '03',
        title: 'Process names without locality cannot support privacy claims',
        description:
          'Seeing a process name in a list does not prove whether its traffic was loopback, local network, or sent across the public Internet.',
      },
      {
        number: '04',
        title: 'Richer evidence shouldn’t force system extension installation',
        description:
          'Users and open-source contributors should get immediate, non-privileged process activity insights before deciding whether to deploy signed system extension components.',
      },
    ],
  },
  tiers: {
    title: 'Evidence Capability Tiers',
    subtitle:
      'Three deliberately distinct tiers isolate physical interface measurement, non-privileged process previews, and signed flow-level evidence.',
    items: [
      {
        tierNumber: 1,
        title: 'Core Network Evidence',
        subtitle: 'Physical interface counters, network context & history',
        status: 'authoritative',
        statusLabel: 'Current & Authoritative',
        features: [
          '64-bit Darwin kernel physical-interface counters',
          'Network identity & path metadata (Wi-Fi, Hotspot, Ethernet)',
          '5-minute interval aggregation & persistent SwiftData store',
          'Observation coverage percentage & identity quality state',
          'Versioned JSON and CSV aggregate export',
        ],
        safeConclusion:
          'Bytes were observed on a supported physical interface and network context while Traffic Monitoring was observing.',
      },
      {
        tierNumber: 2,
        title: 'App Activity Preview',
        subtitle: 'Non-privileged process network activity summary',
        status: 'preview',
        statusLabel: 'Beta · Non-privileged · Best-effort',
        features: [
          'Samples local nettop process network summary (~15s intervals)',
          'PID resolution to macOS application bundle identifiers',
          'Helper process grouping under parent application owners',
          'Zero paid developer program or system extension required',
          'Separate from exported authoritative evidence',
        ],
        safeConclusion:
          'These applications or processes appear in the current macOS process network summary with these cumulative totals.',
      },
      {
        tierNumber: 3,
        title: 'Advanced Provider',
        subtitle: 'NEFilterDataProvider system extension prototype',
        status: 'experimental',
        statusLabel: 'Experimental Signed Path · Not release-validated',
        features: [
          'Source-application audit-token resolution',
          'Local, External, and Unknown flow classification',
          'Authenticated Mach/XPC aggregate IPC bridge',
          'Byte accounting marked Not Validated',
          'Requires Apple system-extension signing entitlements',
        ],
        safeConclusion:
          'The architecture compiles and packages; controlled signed real-Mac evidence is still required before a locality or audit claim.',
      },
    ],
  },
  surfaces: {
    title: 'Product Surfaces in Action',
    subtitle: 'Organized around the practical questions a user or developer needs to answer.',
    items: [
      {
        id: 'overview',
        name: 'Overview Dashboard',
        question: 'How much data did this Mac use, and how complete was observation?',
        description:
          'A high-level snapshot of total usage, download/upload breakdown, observation coverage, data quality, and top network contexts.',
        capabilityLabel: 'Authoritative Core Evidence',
        imagePath: 'images/traffic-monitoring/overview.png',
        altText: 'Overview Dashboard showing total usage, current network, and observation quality',
      },
      {
        id: 'trends',
        name: 'Trends Analytics',
        question: 'When did traffic happen, and where were the peaks?',
        description:
          'Time-series bandwidth breakdown with peak traffic detection, hourly analysis, and network context isolation.',
        capabilityLabel: 'Authoritative Core Evidence',
        imagePath: 'images/traffic-monitoring/trends.png',
        altText: 'Trends Analytics showing usage charts over time and peak bandwidth detection',
      },
      {
        id: 'networks',
        name: 'Networks Breakdown',
        question: 'Which network contexts accounted for usage?',
        description:
          'Comparative analysis across Wi-Fi networks, mobile hotspots, and Ethernet interfaces with identity classification and evidence quality indicators.',
        capabilityLabel: 'Authoritative Core Evidence',
        imagePath: 'images/traffic-monitoring/networks.png',
        altText: 'Networks surface listing usage breakdown across Wi-Fi SSIDs and hotspots',
      },
      {
        id: 'applications',
        name: 'Applications (Beta)',
        question: 'Which applications show network activity right now?',
        description:
          'Non-privileged nettop process network activity summary aggregated by macOS application bundle, process name, or individual PID.',
        capabilityLabel: 'Beta · Best-effort Preview',
        imagePath: 'images/traffic-monitoring/applications.png',
        altText: 'Applications Beta surface displaying non-privileged process network activity',
      },
      {
        id: 'monitor',
        name: 'Technical Monitor',
        question: 'What are the raw interface counters and last-sample diagnostics?',
        description:
          'Real-time interface counter readings, raw 64-bit Darwin kernel byte statistics, and 2-second delta measurement diagnostics.',
        capabilityLabel: 'Authoritative Core Evidence',
        imagePath: 'images/traffic-monitoring/monitor.png',
        altText: 'Technical Monitor showing raw kernel interface counter readings and deltas',
      },
    ],
  },
  coverage: {
    title: 'Coverage and Uncertainty',
    subtitle: 'Traffic Monitoring keeps usage totals and evidence quality explicitly separate.',
    formula: [
      'Observed usage',
      '+',
      'Observation coverage %',
      '+',
      'Network identity quality',
      '=',
      'Network-level evidence',
    ],
    states: [
      {
        label: 'Identified',
        description: 'Observed network context is identified with no known observation gaps for the interval.',
      },
      {
        label: 'Partially identified',
        description: 'Some time was unobserved or traffic relied on fallback transport metadata.',
      },
      {
        label: 'Unknown network',
        description: 'Traffic was measured but reliable Wi-Fi SSID / network identity was restricted or unavailable.',
      },
      {
        label: 'Tracking degraded',
        description: 'A counter reset, persistence delay, or tracking interruption affected part of the evidence period.',
      },
    ],
    disclaimer:
      'System sleep, app shutdowns, crashes, and unmonitored intervals are never silently filled in as 100% monitored time.',
  },
  architecture: {
    title: 'Architecture & Data Paths',
    subtitle: 'Strict separation isolates platform sources, core tracking, preview aggregation, and SwiftUI presentation.',
    simplifiedFlow: [
      'macOS platform sources (sysctl, NWPathMonitor, CoreWLAN, nettop)',
      '↓',
      'Tracking & Evidence Domain (DeltaCalculator, TrafficTracker actor)',
      '↓',
      'Local Aggregate Persistence (SwiftData 5-minute checkpoint store)',
      '↓',
      'Analytics & App Activity Controllers (UsageAnalyticsAggregator)',
      '↓',
      'SwiftUI Product Surfaces (Overview, Trends, Networks, Applications, Monitor)',
    ],
    details: [
      'Darwin 64-bit sysctl counters query hardware interface statistics directly via NET_RT_IFLIST2.',
      'NWPathMonitor and CoreWLAN detect interface switches, hotspot flags, and Wi-Fi SSIDs.',
      'SwiftData local repository persists 5-minute bucket aggregates and observation coverage checkpoint logs.',
      'NettopProcessSampler parses non-blocking CSV process snapshots every ~15 seconds.',
      'Advanced Provider prototype operates via NEFilterDataProvider system extension over Mach/XPC bridge.',
    ],
    imagePath: 'images/traffic-monitoring/architecture.png',
  },
  privacy: {
    title: 'Privacy & Trust Boundary',
    keptVisible: [
      'All analytics and evidence remain 100% on-device unless explicitly exported.',
      'Core analytics do not persist packet payloads, DNS queries, or browsing content.',
      'App Activity Preview is un-persisted and kept strictly separate from evidence export.',
      'The Advanced Provider path is opt-in, signed, and independently disableable.',
      'Restricted permissions and unknown network states are handled as valid explicit conditions.',
    ],
    notClaimed: [
      'Exact Internet-only usage or carrier-billing parity (LAN/NAS traffic may be included).',
      'Destination URLs or remote server IP identity in core paths.',
      'Complete activity history during periods when Traffic Monitoring was closed or asleep.',
      'Per-app locality or local-only verdicts from App Activity Preview.',
      'Formal privacy audit or compliance verification today.',
    ],
  },
  maturity: {
    title: 'Maturity & Capability Status',
    matrix: [
      {
        capability: 'Physical-interface usage',
        displayStatus: 'Implemented',
        note: '64-bit Darwin counter tracking across Wi-Fi, hotspot, Ethernet',
      },
      {
        capability: 'Historical evidence & export',
        displayStatus: 'Implemented',
        note: '5-minute buckets, coverage tracking, JSON/CSV export',
      },
      {
        capability: 'App Activity Preview',
        displayStatus: 'Beta · Best-effort',
        note: 'Non-privileged nettop process activity summary',
      },
      {
        capability: 'Application grouping',
        displayStatus: 'Best-effort',
        note: 'PID resolution to application bundle & helper process grouping',
      },
      {
        capability: 'Advanced Provider',
        displayStatus: 'Experimental',
        note: 'NEFilterDataProvider prototype passes CI; signed real-Mac validation required',
      },
      {
        capability: 'Per-app locality & bytes',
        displayStatus: 'Not release-validated',
        note: 'No locality verdict until controlled real-Mac reconciliation passes',
      },
      {
        capability: 'Privacy Audit',
        displayStatus: 'Future',
        note: 'Requires validated flow evidence, byte accounting, and assertions',
      },
    ],
  },
  finalCta: {
    kicker: 'TRAFFIC MONITORING FOR macOS',
    headline: 'Understand your network usage. Inspect the evidence behind it.',
    body: 'Explore the implementation, run the ad-hoc development build, or contribute to the signed real-Mac validation path.',
    primaryCtaLabel: 'Explore Traffic Monitoring on GitHub ↗',
    primaryCtaHref: 'https://github.com/daniele21/traffic-monitoring',
    secondaryCtaLabel: 'View Evidence & Observability family',
    secondaryCtaHref: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/#evidence`,
  },
};
