export const advisoryData = {
  kicker: 'LOCAL AI ADVISORY',
  heading: 'Need to decide where AI should run?',
  body:
    'I help technical leaders evaluate Local, Hybrid and Cloud architectures using the same workload-first, evidence-led approach I apply to my own systems.',
  areas: [
    {
      title: 'Architecture decision',
      body: 'Decide which parts of a workload should stay local, route through a hybrid path, or remain in the cloud.',
    },
    {
      title: 'Local AI feasibility',
      body: 'Evaluate whether target models, devices, latency and privacy constraints make local execution genuinely viable.',
    },
    {
      title: 'System design review',
      body: 'Review runtime boundaries, model lifecycle, data flows, failure behavior and observability before implementation hardens.',
    },
    {
      title: 'Performance & validation',
      body: 'Define what to measure on real workloads and hardware so architecture decisions are backed by evidence rather than demos.',
    },
  ],
  fitNote:
    'Best fit: teams evaluating privacy, latency, control, device constraints or cloud dependence in an AI workload.',
  primaryCta: {
    label: 'Discuss your architecture',
    href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20architecture%20advisory',
  },
  secondaryCta: {
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
} as const;
