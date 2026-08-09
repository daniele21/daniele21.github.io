import type { EvidenceSectionContent } from '../../../types/content';

export const evidenceData: EvidenceSectionContent = {
  kicker: 'EVIDENCE & OBSERVABILITY',
  title: 'Local-first should be observable, not just claimed.',
  subtitle:
    'Traffic Monitoring measures network behavior and the quality of the evidence behind it, locally and without storing packet content. The macOS and Android implementations share the same principles while respecting different platform constraints.',
  principles: [
    {
      title: 'Measure before claiming',
      description:
        'Usage and attribution claims require continuous local counters and verified metadata, not static privacy assertions.',
    },
    {
      title: 'Preserve uncertainty',
      description:
        'Observation gaps, unverified metadata, and unattributed intervals remain explicit rather than forcing a false verdict.',
    },
    {
      title: 'Keep evidence local',
      description:
        'Analytics, history, and raw diagnostic logs remain on-device unless explicitly exported by the user.',
    },
  ],
  platforms: [
    {
      id: 'traffic-monitoring-macos',
      platform: 'macOS',
      name: 'Traffic Monitoring for macOS',
      headline: 'Understand how your Mac uses the network.',
      description:
        'Local history, network context, observation coverage and a best-effort application activity preview, with richer signed flow evidence kept behind an explicit experimental boundary.',
      principles: [
        'Physical-interface counters',
        'Observation coverage tracking',
        'Non-privileged nettop preview',
      ],
      currentCapabilities: [
        'Authoritative 64-bit Darwin interface counters across Wi-Fi, hotspot, and Ethernet',
        'Today, 7 days, 30 days, This month, and Custom timeframes with coverage breakdown',
        'App Activity Preview (Beta) without paid developer program or system extension',
      ],
      currentStatus: 'beta',
      statusLabel: 'Core usable today · Applications Beta best-effort · Advanced Provider experimental',
      limitations: [
        'App Activity Preview cannot establish LAN vs Internet locality',
        'Signed Advanced Provider requires Apple entitlements and real-Mac validation',
      ],
      logoPath: 'images/traffic-monitoring/shield.png',
      heroImage: 'images/traffic-monitoring/overview.png',
      pageUrl: 'traffic-monitoring',
      repositoryUrl: 'https://github.com/daniele21/traffic-monitoring',
    },
    {
      id: 'traffic-monitoring-android',
      platform: 'Android',
      name: 'Traffic Monitoring for Android',
      headline: 'Know your network usage - and the evidence behind it.',
      description:
        'Deterministic usage attribution, explicit Unattributed traffic, Evidence Coverage and Measurement Health, with real-device and multi-OEM reliability validation still in progress.',
      principles: [
        'Deterministic interval attribution',
        'Evidence Coverage v1 & Measurement Health',
        'Explicit unattributed & discarded states',
      ],
      currentCapabilities: [
        'Usage history allocated into fixed 5-minute time windows',
        'Evidence Coverage % and separate Measurement Health (Good, Limited, Degraded)',
        'Engineering validation ZIP export for auditable replay',
      ],
      currentStatus: 'active-development',
      statusLabel: 'Product UX implemented · E1 implemented · Field validation pending',
      limitations: [
        'Multi-OEM and background PendingIntent reliability awaiting physical field runs',
        'Experiment Mode (E3) and Assertions (E4) planned in future milestones',
      ],
      logoPath: 'images/traffic-monitoring-android/shield.png',
      heroImage: 'images/traffic-monitoring-android/overview.png',
      pageUrl: 'traffic-monitoring-android',
      repositoryUrl: 'https://github.com/daniele21/traffic-monitoring-android',
    },
  ],
  bottomNote:
    'Infrastructure provides the execution path. Traffic Monitoring makes observed network behavior and uncertainty visible. Reference applications test whether the complete approach creates useful products.',
};
