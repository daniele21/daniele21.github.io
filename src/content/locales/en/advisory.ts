export const advisoryData = {
  kicker: 'LOCAL AI ADVISORY',
  heading: 'Trying to move an AI workload off the cloud?',
  body:
    'I help teams answer one practical question: what can run locally without sacrificing quality, latency or operability — and what should remain Hybrid or Cloud?',
  areas: [
    {
      title: 'Should this workload run locally?',
      body: 'Evaluate privacy, latency, capability and operational constraints before choosing an execution model.',
      output: 'Local / Hybrid / Cloud recommendation',
    },
    {
      title: 'Will it run on our hardware?',
      body: 'Test the target model and workload against real device, memory, latency and thermal constraints.',
      output: 'Feasibility result against real constraints',
    },
    {
      title: 'How should we architect it?',
      body: 'Define runtime boundaries, model lifecycle, data flows, fallbacks and the role of optional cloud execution.',
      output: 'Runtime and data-boundary architecture',
    },
    {
      title: 'How do we prove it works?',
      body: 'Define the measurements and thresholds needed to validate the architecture on the real workload and hardware.',
      output: 'Metrics, thresholds and evidence plan',
    },
  ],
  fitNote:
    'Best fit: you already have an AI workload and need evidence before committing to Local, Hybrid or Cloud.',
  primaryCta: {
    label: 'Evaluate your workload',
    href: 'mailto:danielemoltisanti@gmail.com?subject=Evaluate%20a%20Local%20AI%20workload',
  },
  secondaryCta: {
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
} as const;
