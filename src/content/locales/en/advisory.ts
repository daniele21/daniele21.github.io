export const advisoryData = {
  kicker: '',
  heading: 'How I can help you ?',
  body:
    'Thinking about moving an AI workload off the cloud? Here is what I do:',
  fitNote:
    'Best if you already have an AI feature in mind and need clear technical direction.',
  primaryCta: {
    label: 'Get in touch',
    href: 'mailto:danielemoltisanti@gmail.com?subject=Local%20AI%20Advisory',
  },
  secondaryCta: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
  areas: [
    {
      id: 'strategy',
      title: 'Where should this model run?',
      body: 'I evaluate your <strong>privacy needs</strong>, <strong>latency limits</strong>, and <strong>compute costs</strong> to give you a clear <strong>Local, Hybrid, or Cloud</strong> recommendation before you spend weeks building.',
      output: 'Placement recommendation & feasibility report',
    },
    {
      id: 'hardware',
      title: 'Will it run fast on your devices?',
      body: 'I test target models directly on your <strong>real hardware</strong> (Apple Silicon, Android, servers) measuring <strong>generation speed</strong>, <strong>RAM limits</strong>, and <strong>thermals</strong>.',
      output: 'Hardware benchmark report & RAM sizing',
    },
    {
      id: 'runtime',
      title: 'How to build the local engine?',
      body: 'I design the inference runtime: <strong>model loading</strong>, <strong>memory management</strong>, <strong>quantization (GGUF/MLX)</strong>, and <strong>automatic fallback to cloud</strong>.',
      output: 'Runtime architecture & API design',
    },
    {
      id: 'privacy',
      title: 'How to prove data stays private?',
      body: 'I capture network traffic at the process level to mathematically verify <strong>zero outbound data</strong> and give you <strong>audit-ready privacy proof</strong>.',
      output: 'Network capture proof & zero-egress audit',
    },
  ],
} as const;
