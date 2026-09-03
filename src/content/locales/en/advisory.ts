export const advisoryData = {
  kicker: '',
  heading: 'Have an AI workload to figure out?',
  body:
    'I help teams decide what should run Local, Hybrid or Cloud - and validate the decision on real systems.',
  fitNote:
    'Best if you already have an AI feature or workload in mind and need clear technical direction.',
  primaryCta: {
    label: 'Evaluate my workload',
    href: 'mailto:danielemoltisanti@gmail.com?subject=AI%20workload%20evaluation',
  },
  secondaryCta: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
  areas: [
    {
      id: 'decide',
      title: 'Where should it run?',
      body: 'I evaluate <strong>privacy</strong>, <strong>latency</strong>, <strong>system control</strong>, model capability and scale to recommend the right <strong>Local, Hybrid or Cloud</strong> boundary.',
      output: 'Architecture recommendation & feasibility',
    },
    {
      id: 'validate',
      title: 'Will it actually work?',
      body: 'I test the workload on <strong>real hardware</strong> and inspect performance, resource use, quality and network behavior to find the limits before they become product problems.',
      output: 'Performance, hardware & privacy validation',
    },
    {
      id: 'build',
      title: 'How should the system work?',
      body: 'I design the <strong>GenAI and runtime architecture</strong>: model execution, memory, APIs, quantization and the boundary between local infrastructure and optional cloud services.',
      output: 'Runtime architecture & implementation direction',
    },
  ],
} as const;
