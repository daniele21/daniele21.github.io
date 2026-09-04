import type { AboutContent } from '../../../types/about';

export const aboutData: AboutContent = {
  metaTitle: 'About Daniele Moltisanti - Principal AI Engineer & AI Strategy Lead',
  metaDescription:
    'Principal AI Engineer & AI Strategy Lead specializing in Local AI & On-device LLMs, Edge & Local AI Architecture, and founder of stAI tuned.',

  profile: {
    name: 'Daniele Moltisanti',
    headline: 'Principal AI Engineer & AI Strategy Lead · Local AI & On-device LLMs',
    subheadline: 'Data Scientist Manager at Sky Italia · Founder & Author at stAI tuned',
    tagline: 'Bridging experimental AI research, enterprise scale, and privacy-first on-device compute.',
    location: 'Milan, Italy',
    locationStatus: 'Available for technical strategy & AI Advisory',
    affiliation: 'Sky Italia',
    affiliationRole: 'Data Scientist Manager / Principal AI Engineer',
    portraitPath: 'images/profile-photo.jpg',
    portraitAlt: 'Daniele Moltisanti portrait',
    leadParagraph:
      'I am an AI technical leader, systems engineer, and writer based in Milan. Over the last decade, I have operated at the intersection of deep engineering and executive AI strategy: turning cutting-edge machine learning into governed enterprise platforms reaching millions of users, while independently researching how far open-weight AI can run on devices we actually control.',
    badges: [
      'Enterprise AI Leadership',
      'Local & On-Device AI',
      'AI Strategy & Governance',
      'Founder @ stAI tuned',
      'Top Nova 111 Talent',
      'Politecnico di Milano',
    ],
    stats: [
      {
        metric: 'Enterprise',
        label: 'Production Scale',
        detail: 'Leading AI systems serving millions of subscribers with high SLAs',
        tag: 'Scale & Governance',
      },
      {
        metric: '80+',
        label: 'Technical Deep Dives',
        detail: 'In-depth analyses on LLM architectures, RAG, and agents on stAI tuned',
        tag: 'Editorial & Research',
      },
      {
        metric: '150+',
        label: 'Projects Mentored',
        detail: 'Hands-on architectural reviews and guidance for emerging engineers',
        tag: 'Mentorship',
      },
      {
        metric: 'Top 111',
        label: 'Nova Talent Award',
        detail: 'Selected among top under-35 Italian leaders driving tech innovation',
        tag: 'Recognition',
      },
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
      github: 'https://github.com/daniele21',
      staituned: 'https://staituned.com',
      email: 'danielemoltisanti@gmail.com',
    },
  },

  now: {
    kicker: 'CURRENT FOCUS · NOW',
    title: 'What I’m Building & Researching Now',
    subtitle: 'A real-time snapshot of my active technical investigations, benchmark targets, and writing.',
    lastUpdated: 'August 2026',
    items: [
      {
        id: 'mlx-inference',
        tag: 'Apple Silicon MLX',
        title: 'Unified Memory Latency & Quantization Limits',
        description:
          'Benchmarking 70B parameter models on M-series unified memory to determine the exact boundary where quantized open-weight inference matches frontier API responsiveness under sustained load.',
        status: 'Active Benchmarking',
      },
      {
        id: 'android-npu',
        tag: 'On-Device AI',
        title: 'Android NPU Acceleration & Cross-App IPC',
        description:
          'Prototyping system-level AIDL inference services on Android to enable lightweight local models to serve multiple applications without redundant RAM consumption.',
        status: 'Prototype Stage',
      },
      {
        id: 'mcp-protocols',
        tag: 'Agentic Architectures',
        title: 'Model Context Protocol (MCP) in Local Environments',
        description:
          'Designing composable agent workflows where local models interact securely with private file systems and developer databases via standardized protocols without data leakage.',
        status: 'Architectural Design',
      },
      {
        id: 'stai-tuned-series',
        tag: 'Technical Writing',
        title: 'Zero-Hype Guide to Inference Economics & TCO',
        description:
          'Authoring a comprehensive comparative guide on stAI tuned detailing when self-hosted and on-device inference becomes more cost-effective than frontier API calls.',
        status: 'Publishing Soon',
      },
    ],
  },

  story: {
    kicker: 'THE JOURNEY',
    title: 'From Theory to Scale, and Back to the Device',
    subtitle: 'How a Decade in Computer Engineering, Enterprise AI, and Open Research Shaped My Worldview.',
    chapters: [
      {
        number: '01',
        kicker: 'THE FOUNDATION',
        title: 'Rigorous Computer Engineering & Academic Research',
        timeframe: 'Politecnico di Milano · IIT',
        paragraphs: [
          'My journey in AI started in computer engineering at the Politecnico di Milano, focusing on data science, deep learning, and statistical modeling. Early on, I was fascinated not just by theoretical mathematical bounds, but by how software executes on actual silicon.',
          'During my research collaborations at the Istituto Italiano di Tecnologia (IIT) and academic publications (including computer vision workshops at CVPR), I learned the value of empirical verification: algorithms are only as good as their reproducibility and real-world behavior under noise and physical constraints.',
        ],
        pullQuote: 'Algorithms are only as good as their reproducibility under physical and operational constraints.',
        keyTakeaway: 'Built a foundational respect for empirical metrics, systems performance, and computational boundaries.',
        tags: ['Politecnico di Milano', 'IIT', 'Computer Vision', 'C++', 'Statistical Modeling'],
      },
      {
        number: '02',
        kicker: 'ENTERPRISE SCALE',
        title: 'Leading AI & Data Science in Production',
        timeframe: 'Sky Italia · 2022 - Present',
        paragraphs: [
          'At Sky Italia, I stepped into the role of Data Scientist Manager and Principal AI Engineer. Here, the challenge was entirely different from a research lab: delivering AI systems that operate with five-nines reliability for millions of active users.',
          'Leading cross-functional teams of data scientists and engineers taught me the art of enterprise AI governance. It is not about chasing every new model release; it is about establishing strict latency budgets, managing compute cost curves (TCO), ensuring data compliance, and building resilient fallbacks when external APIs fail.',
        ],
        pullQuote: 'In enterprise production, governance, latency budgets, and deterministic fallbacks matter far more than model hype.',
        keyTakeaway: 'Mastered the bridge between executive AI strategy, MLOps rigor, and large-scale subscriber impact.',
        tags: ['Sky Italia', 'AI Leadership', 'Enterprise Scale', 'MLOps', 'Governance', 'TCO Optimization'],
      },
      {
        number: '03',
        kicker: 'ZERO-HYPE DIVULGATION',
        title: 'Founding stAI tuned & Mentoring Builders',
        timeframe: 'stAI tuned · 2023 - Present',
        paragraphs: [
          'As the generative AI boom accelerated, I noticed a widening chasm between social media hype and engineering reality. Founders and developers were overwhelmed by marketing promises while lacking actionable architectural mental models.',
          'I founded stAI tuned as an independent publication committed to zero hype, clear diagrams, and actionable code. Over 80+ in-depth analyses, I’ve broken down everything from RAG vector indexing and MCP protocols to LLM quantization. Concurrently, mentoring over 150 emerging engineers has kept my explanations grounded in real developer struggles.',
        ],
        pullQuote: 'stAI tuned was built on a simple promise: explain complex AI architectures with clarity, precision, and zero hype.',
        keyTakeaway: 'Established a recognized voice in the European AI ecosystem with Gold Impact Writer distinction.',
        tags: ['stAI tuned', '80+ Articles', '150+ Mentees', 'LLM Architectures', 'MCP', 'Gold Writer'],
      },
      {
        number: '04',
        kicker: 'THE LOCAL-FIRST ODYSSEY',
        title: 'Questioning the Unexamined Cloud Default',
        timeframe: 'Independent Applied AI Stack · 2024 - Present',
        paragraphs: [
          'Over the last two years, I noticed an unexamined assumption taking hold across the industry: the belief that all AI workloads must live in centralized hyperscaler clouds.',
          'I began building an independent, open-weight Local AI stack across macOS and Android (Korgis / Local LLM Server, Android Local LLM Harness, Local ASR, RedactGuard, ClosedRoom, Aura Finance, and Traffic Monitoring). The goal is not to eliminate the cloud, but to prove where private, on-device compute creates genuine privacy and operational superiority.',
        ],
        pullQuote: 'Local AI first ≠ Local AI only. Find the boundary with evidence, not ideology.',
        keyTakeaway: 'Proving that open-weight local execution is a viable architectural tier for modern products.',
        tags: ['Korgis (Local LLM Server)', 'Android Local LLM Harness', 'Apple Silicon MLX', 'llama.cpp', 'Private AI'],
      },
    ],
  },

  manifesto: {
    kicker: 'ARCHITECTURAL MANIFESTO',
    title: 'Core Beliefs & Operating Principles',
    subtitle: 'The non-negotiable mental models that govern how I design systems, evaluate models, and advise teams.',
    principles: [
      {
        number: '01',
        icon: '⚖️',
        kicker: 'STRATEGY',
        title: 'Local AI First ≠ Local AI Only',
        quote: 'Defaulting to the cloud without question is dangerous. Insisting on local execution for everything is equally foolish.',
        description:
          'Every AI architecture choice is a trade-off among privacy, latency, runtime ownership, cost, and raw reasoning capacity. The objective is to find the boundary empirically: assigning tasks to Local, Hybrid, or Cloud based on verifiable workload requirements.',
        takeaway: 'Workload placement must be an active engineering decision backed by data.',
      },
      {
        number: '02',
        icon: '🛡️',
        kicker: 'SYSTEMS',
        title: 'Bounded Memory & Deterministic Failure',
        quote: 'A system that crashes on out-of-memory errors is not an AI product; it is an unfinished prototype.',
        description:
          'Real devices run multiple apps, experience thermal constraints, and lose connectivity. Production AI software must have strictly bounded RAM budgets, explicit queue lifecycles, and deterministic fallback behaviors when a model fails or degrades.',
        takeaway: 'Operational stability always trumps synthetic benchmark peaks.',
      },
      {
        number: '03',
        icon: '🔒',
        kicker: 'PRIVACY',
        title: 'Architectural Data Boundaries',
        quote: 'True privacy is an architectural invariant, not a paragraph in a terms-of-service document.',
        description:
          'If sensitive data never leaves the user’s local memory boundary, the attack surface shrinks to near zero. By designing models as localized transformation primitives, we eliminate compliance friction and guarantee true data sovereignty.',
        takeaway: 'Enforce security through hardware and network topology, not legal promises.',
      },
      {
        number: '04',
        icon: '🔬',
        kicker: 'EVALUATION',
        title: 'Empirical Verification Over Leaderboards',
        quote: 'Public leaderboards measure marketing readiness. In-situ benchmarks measure production viability.',
        description:
          'A model scoring high on MMLU might suffer from terrible time-to-first-token, erratic JSON schema compliance, or extreme thermal throttling on mobile hardware. Systems must be tested against real domain inputs on actual deployment targets.',
        takeaway: 'Test on your hardware, with your data, under your operational constraints.',
      },
    ],
  },

  toolkit: {
    kicker: 'SYSTEMS & HARDWARE BENCH',
    title: 'My Technical Toolkit & Testbed',
    subtitle: 'The languages, runtimes, hardware, and protocols I use daily to build and benchmark AI systems.',
    categories: [
      {
        title: 'Hardware Testbed',
        kicker: 'COMPUTE & DEVICES',
        icon: '💻',
        items: [
          { name: 'Apple Silicon (M-Series)', description: 'High-bandwidth unified memory for 7B–70B model execution via MLX and Metal.', badge: 'Primary Lab' },
          { name: 'Android Snapdragon / Tensor NPU', description: 'Real-world mobile devices profiling thermal budgets, RAM pressure, and battery life.', badge: 'Mobile Lab' },
          { name: 'Private Linux Workstations', description: 'Dedicated on-premise compute for GGUF compilation, containerized testing, and eBPF observability.', badge: 'Server' },
        ],
      },
      {
        title: 'Inference Runtimes & Kernels',
        kicker: 'EXECUTION LAYERS',
        icon: '⚙️',
        items: [
          { name: 'Apple MLX & Metal Performance Shaders', description: 'Native C++/Python framework exploiting Apple unified memory architecture.', badge: 'Core' },
          { name: 'llama.cpp & GGUF Quantization', description: 'Quantized CPU/GPU inference with explicit memory mapping and bounded queues.', badge: 'Core' },
          { name: 'Whisper.cpp & Local ASR', description: 'Zero-latency streaming speech recognition without network egress.', badge: 'Speech' },
          { name: 'Android NDK / NNAPI / AIDL', description: 'Low-level C++ native libraries interfaced with Android system IPC.', badge: 'Mobile' },
        ],
      },
      {
        title: 'Languages & Architecture',
        kicker: 'SOFTWARE FOUNDATIONS',
        icon: '🛠️',
        items: [
          { name: 'Python (PyTorch, FastAI, FastAPI)', description: 'Data science, experimentation, evaluation frameworks, and API layers.', badge: 'Backend' },
          { name: 'C++ & Modern Systems Programming', description: 'High-performance runtime wrappers, inference gateways, and custom bindings.', badge: 'Systems' },
          { name: 'Kotlin & Android System Services', description: 'On-device Android inference harness and background service architectures.', badge: 'Mobile' },
          { name: 'TypeScript & Modern Web', description: 'Clean, accessible interfaces, state management, and developer tools.', badge: 'Frontend' },
        ],
      },
      {
        title: 'Protocols, Agents & Observability',
        kicker: 'INTEGRATION & TELEMETRY',
        icon: '🌐',
        items: [
          { name: 'Model Context Protocol (MCP)', description: 'Standardized open protocol connecting local models to tools and databases.', badge: 'Agents' },
          { name: 'macOS Network Extensions & eBPF', description: 'Non-intrusive traffic inspection validating zero-cloud leakage claims.', badge: 'Security' },
          { name: 'OpenAI API Protocol Spec', description: 'Standardized HTTP/WebSocket gateway for plug-and-play local model replacement.', badge: 'APIs' },
          { name: 'Docker & Containerization', description: 'Reproducible, isolated runtime builds for local and hybrid server deployments.', badge: 'DevOps' },
        ],
      },
    ],
  },

  experience: {
    kicker: 'CAREER & LEADERSHIP',
    title: 'Experience & Enterprise Track Record',
    subtitle: 'A track record of leading large-scale AI initiatives, conducting open research, and founding tech platforms.',
    roles: [
      {
        company: 'Sky Italia',
        companyUrl: 'https://www.sky.it',
        role: 'Data Scientist Manager / Principal AI Engineer & AI Lead Strategy',
        period: '2022 - Present',
        location: 'Milan, Italy',
        badge: 'Enterprise Leadership',
        description:
          'Directing enterprise AI and data science initiatives across subscriber platforms, content intelligence, and generative AI platforms serving millions of active users.',
        responsibilities: [
          'Architecting and scaling production AI systems with high availability SLAs, latency budgets, and rigorous governance.',
          'Defining the company-wide Generative AI roadmap, model evaluation standards, and LLM adoption strategies.',
          'Leading, mentoring, and growing a multidisciplinary team of senior data scientists and machine learning engineers.',
          'Balancing enterprise cloud economics (TCO), proprietary data protection, and executive alignment across product & engineering.',
        ],
        technologies: ['Generative AI', 'LLMs', 'MLOps', 'PyTorch', 'Cloud Architecture', 'Governance', 'Recommender Systems'],
      },
      {
        company: 'Independent Local AI Stack',
        companyUrl: 'https://github.com/daniele21',
        role: 'AI Systems Architect & Open-Weight Researcher',
        period: '2024 - Present',
        location: 'Milan, Italy',
        badge: 'Systems Research',
        description:
          'Architected and built a comprehensive open-weight Local AI ecosystem spanning reusable inference servers, mobile harnesses, reference applications, and network observability.',
        responsibilities: [
          'Engineered Korgis / Local LLM Server (C++, Python, MLX, llama.cpp) providing multi-model lifecycle management and OpenAI API compatibility.',
          'Created Android Local LLM Harness for on-device profiling, thermal tracking, and cross-application AIDL boundaries.',
          'Shipped empirical proving grounds: RedactGuard (PII redaction), ClosedRoom (meeting intelligence), and Aura Finance.',
          'Developed non-intrusive traffic monitoring to empirically verify local-first privacy claims without inspecting private payloads.',
        ],
        technologies: ['C++', 'Python', 'Apple Silicon (MLX)', 'Android NDK', 'llama.cpp', 'Whisper ASR', 'Network Extensions'],
      },
      {
        company: 'stAI tuned',
        companyUrl: 'https://staituned.com',
        role: 'Founder & Managing Director',
        period: '2023 - Present',
        location: 'Milan, Italy',
        badge: 'Editorial & Education',
        description:
          'Founded an independent technical platform delivering deep architectural breakdowns, practical AI roadmaps, and no-hype guides for technical leaders and builders.',
        responsibilities: [
          'Authored 80+ in-depth technical analyses covering LLM architectures, RAG optimization, Model Context Protocol (MCP), and agent workflows.',
          'Awarded Gold Impact Writer status for actionable, high-clarity engineering guides.',
          'Conducted technical masterclasses, workshops, and architecture reviews for engineering teams.',
        ],
        technologies: ['LLM Systems', 'RAG', 'Agent Protocols (MCP)', 'Quantization', 'Evaluation Frameworks'],
      },
      {
        company: 'Academic & Research Foundations',
        role: 'Researcher & Computer Engineer',
        period: 'Prior to 2022',
        location: 'Milan / Genoa, Italy',
        badge: 'Academic Foundations',
        description:
          'Rooted in computer engineering education and applied computer vision/AI research at top Italian institutions.',
        responsibilities: [
          'Conducted research at Istituto Italiano di Tecnologia (IIT) on assistive technologies and computer vision.',
          'Contributed to academic publications and peer-reviewed conference workshops (e.g. CVPR).',
          'Completed MSc in Computer Engineering / Data Science & Engineering at Politecnico di Milano.',
        ],
        technologies: ['Computer Vision', 'Deep Learning', 'Statistical Modeling', 'C++', 'Python'],
      },
    ],
  },

  divulgation: {
    kicker: 'WRITING & MENTORSHIP',
    title: 'Sharing Knowledge With Zero Hype',
    subtitle: 'Authoring deep-dive architectural analyses on stAI tuned and mentoring the next generation of engineers.',
    staiTunedSummary:
      'Through stAI tuned, I publish long-form architectural breakdowns designed for practitioners who care about how systems actually work under the hood. No marketing fluff, no buzzwords - just clear mental models, system diagrams, and reproducible implementations.',
    staiTunedMetrics: [
      { value: '80+', label: 'Articles Published' },
      { value: 'Gold', label: 'Impact Writer' },
      { value: '150+', label: 'AI Projects Mentored' },
    ],
    featuredArticles: [
      {
        title: 'The Local AI First Principle: Why Defaulting to Cloud is a Risk',
        topic: 'AI Strategy & Privacy',
        readTime: '6 min read',
        url: 'https://staituned.com',
        summary:
          'Examining why unexamined cloud dependencies introduce privacy, reliability, and vendor risks - and how to establish workload boundaries.',
        badge: 'Strategy',
        keyInsight: 'Cloud-first creates silent operational fragility. Local-first establishes true architectural sovereignty.',
      },
      {
        title: 'Profiling 70B Models on Apple Silicon: Memory, Quantization, and Latency',
        topic: 'Hardware & MLX',
        readTime: '8 min read',
        url: 'https://staituned.com',
        summary:
          'Comparative benchmarks of 4-bit and 8-bit quantized models on unified memory architectures under sustained production workloads.',
        badge: 'Inference',
        keyInsight: 'Unified memory on M-series chips makes 70B local inference competitive with cloud APIs for batch workloads.',
      },
      {
        title: 'Model Context Protocol (MCP) in Practice: Building Interoperable Agent Workflows',
        topic: 'Agentic Systems',
        readTime: '7 min read',
        url: 'https://staituned.com',
        summary:
          'How open protocol standards transform how LLMs interact with local databases, tools, and developer environments without data leakage.',
        badge: 'Agents',
        keyInsight: 'Standardized protocols like MCP decouple the reasoning model from proprietary tool implementations.',
      },
    ],
    mentorshipSummary:
      'Beyond writing, I have conducted architecture reviews and 1-on-1 mentorship for over 150 emerging engineers and startup founders, helping them navigate the transition from hobbyist experimentation to robust production AI.',
  },

  recognition: {
    kicker: 'HONORS & EDUCATION',
    title: 'Recognition & Academic Engineering',
    subtitle: 'Industry honors and formal engineering foundations from premier Italian institutions.',
    awards: [
      {
        year: '2022',
        title: 'Nova 111 List - Top Under-35 Talent',
        organization: 'Nova Talent (in partnership with Bocconi University)',
        description:
          'Selected among the 111 most talented young professionals in Italy in the Entertainment, Media & Communication category for leadership in technology, data science, and AI innovation.',
        badge: 'Top 111 Talent',
        url: 'https://www.novatalent.com',
      },
      {
        year: '2023 - 2026',
        title: 'Gold Impact Writer Distinction',
        organization: 'stAI tuned',
        description:
          'Recognized for consistent high-clarity, high-impact contributions to technical AI education, agent architectures, and local inference engineering.',
        badge: 'Gold Writer',
      },
    ],
    education: [
      {
        degree: 'MSc in Computer Science & Engineering',
        institution: 'Politecnico di Milano',
        location: 'Milan, Italy',
        period: 'Graduate Engineering',
        details: 'Rigorous engineering foundations with specialization in Machine Learning, Statistical Modeling, and Distributed Systems Architecture.',
        badge: 'MSc Degree',
      },
    ],
  },

  cta: {
    kicker: 'COLLABORATION & ADVISORY',
    title: 'Facing decisions on where your AI workloads should run?',
    description:
      'I work with CTOs, technical founders, and engineering teams evaluating Local vs Hybrid vs Cloud trade-offs, designing private AI architectures, or establishing enterprise AI governance.',
    primaryActionLabel: 'Discuss an AI architecture →',
    primaryActionHref: 'mailto:danielemoltisanti@gmail.com?subject=AI%20Architecture%20conversation',
    secondaryActionLabel: 'Connect on LinkedIn ↗',
    secondaryActionHref: 'https://www.linkedin.com/in/daniele-moltisanti/',
  },
};
