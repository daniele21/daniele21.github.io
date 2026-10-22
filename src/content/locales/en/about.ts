import type { AboutContent } from '../../../types/about';

/**
 * Public-facing claims are grounded in the supplied CV and published work.
 * Project summaries describe the problems being explored, not audited results,
 * production deployment or unverified benchmark performance.
 */
export const aboutData: AboutContent = {
  metaTitle: 'About Daniele Moltisanti | AI Strategy, Engineering & Product Building',
  metaDescription:
    'Principal Data Scientist and AI Strategy Lead. I connect enterprise AI delivery with hands-on local AI systems and evidence-led product experiments.',
  profile: {
    name: 'Daniele Moltisanti',
    headline: 'Principal Data Scientist & AI Strategy Lead',
    affiliation: 'Sky Italia',
    location: 'Milan, Italy',
    portraitPath: 'images/profile-photo.jpg',
    portraitAlt: 'Portrait of Daniele Moltisanti',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/daniele-moltisanti/',
      github: 'https://github.com/daniele21',
      staituned: 'https://staituned.com',
    },
  },
  hero: {
    eyebrow: 'AI strategy · Hands-on engineering · Product thinking',
    titleLead: 'I lead AI at enterprise scale.',
    titleClose: 'I build it to understand what actually works.',
    lead:
      'I connect AI strategy with hands-on engineering, turning complex problems into working systems. Independently, I build and test AI infrastructure and applications to learn when Local, Hybrid or Cloud creates real value.',
  },
  story: {
    kicker: '01 / THE PERSON BEHIND THE WORK',
    title: 'Why I keep building',
    paragraphs: [
      'My background is in computer engineering at Politecnico di Milano. I started by working on machine learning, natural language processing and computer vision. Over time, the interesting question became less about what a model can do in isolation and more about what it takes to make AI useful in the real world.',
      'At Sky Italia, I have led cross-functional data science teams and AI initiatives across the journey from experimentation to deployment. That experience taught me to balance technical quality with business outcomes, governance, cost and adoption.',
      'Outside my enterprise work, I build local AI systems and applications myself. It is how I test assumptions, discover engineering constraints and stay close to the product experience, rather than treating architecture as a purely theoretical exercise.',
    ],
    emphasis:
      'I care about the full journey: choosing the right problem, making sound technical decisions, building the system and measuring whether it actually helps.',
  },
  impact: {
    kicker: '02 / ENTERPRISE EXPERIENCE',
    title: 'From promising prototypes to measurable outcomes',
    intro:
      'My professional work combines team leadership, AI strategy and delivery. These examples are from my career track record, not estimates from personal experiments.',
    metrics: [
      {
        value: '6',
        label: 'AI projects advanced',
        context: 'From PoC experimentation toward MVP, production and adoption at Sky Italia.',
      },
      {
        value: '70%',
        label: 'Processing-time reduction',
        context: 'Reported for an NLP / GenAI operational use case.',
      },
      {
        value: '150+',
        label: 'ML projects reviewed',
        context: 'Hands-on project reviews through coaching with ProfessionAI.',
      },
    ],
  },
  projects: {
    kicker: '03 / INDEPENDENT WORK',
    title: 'What I build to learn',
    intro:
      'I work across the stack: reusable inference infrastructure, device-level integration and applications that put privacy, quality and usability to the test. Each project is an experiment with real constraints, not a claim that every approach is production-ready.',
    items: [
      {
        name: 'Korgis',
        category: 'Infrastructure',
        purpose: 'Local inference infrastructure',
        description:
          'Exploring how to serve and manage open-weight models locally, with reusable interfaces for applications that need direct control of inference.',
        href: '/korgis',
      },
      {
        name: 'Harnex',
        category: 'Infrastructure',
        purpose: 'Android local AI harness',
        description:
          'Building a reusable integration layer to run and evaluate language models on Android devices, with attention to resource constraints and app workflows.',
        href: '/harnex',
      },
      {
        name: 'Local ASR',
        category: 'Infrastructure',
        purpose: 'Private speech infrastructure',
        description:
          'Exploring speech transcription components that can support on-device applications without requiring cloud processing.',
        href: '/local-asr-server',
      },
      {
        name: 'RedactGuard',
        category: 'Application',
        purpose: 'Sensitive-document review',
        description:
          'Putting local AI to work on identifying and reviewing personal information in documents, where privacy and human verification matter.',
        href: '/redact-guard',
      },
      {
        name: 'ClosedRoom',
        category: 'Application',
        purpose: 'Private meeting intelligence',
        description:
          'Building a Mac meeting workflow around local recording, transcription and analysis, with privacy as an architectural requirement.',
        href: '/closedroom',
      },
      {
        name: 'Aura Finance',
        category: 'Application',
        purpose: 'Personal finance workflows',
        description:
          'Exploring how private, device-controlled AI can support the understanding and organization of personal financial information.',
        href: '/aura-finance',
      },
    ],
  },
  principles: {
    kicker: '04 / HOW I THINK',
    title: 'The principles behind the experiments',
    intro:
      'My goal is not to prove that one architecture always wins. It is to make better decisions with the evidence available.',
    items: [
      {
        title: 'Start with the workload',
        description:
          'Privacy, latency, reliability, cost and model capability determine whether Local, Hybrid or Cloud is the right fit. Local-first is not local-only.',
      },
      {
        title: 'Measure on real systems',
        description:
          'Benchmarks, evaluations and failure cases matter more than a compelling demo. Good decisions require tests in the environment where the product will run.',
      },
      {
        title: 'Build for people, not just models',
        description:
          'A useful AI product needs clear workflows, recoverable failures, thoughtful human review and an experience people can trust.',
      },
    ],
  },
  beyond: {
    kicker: '05 / BEYOND THE CODE',
    title: 'Writing, reviewing and sharing what I learn',
    items: [
      {
        title: 'stAI tuned',
        description:
          'An independent initiative to make AI concepts, engineering trade-offs and emerging technologies accessible. More than 80 articles published across stAI tuned and partner channels.',
        href: 'https://staituned.com',
        linkLabel: 'Read stAI tuned',
      },
      {
        title: 'Teaching & mentorship',
        description:
          'I have reviewed more than 150 machine learning projects, coached learners with ProfessionAI and created practical PyTorch courses with DeepLearningItalia.',
      },
      {
        title: 'Nova 111 & engineering roots',
        description:
          'Selected for the 2022 Nova 111 List, including the Entertainment, Media & Communications category. I earned my MSc in Computer Science and Engineering at Politecnico di Milano.',
      },
    ],
  },
  direction: {
    kicker: '06 / WHERE I AM HEADING',
    title: 'From AI systems to products people can rely on',
    description:
      'I want to keep connecting technology, strategy and product building: identifying meaningful problems, making clear architectural choices and building solutions people actually use. Local AI is a valuable part of that exploration, not its limit.',
  },
  cta: {
    title: 'Let’s exchange ideas and evidence',
    description:
      'I share what I build, what I measure and the trade-offs I discover on GitHub and LinkedIn.',
    primaryActionLabel: 'Connect on LinkedIn ↗',
    primaryActionHref: 'https://www.linkedin.com/in/daniele-moltisanti/',
    secondaryActionLabel: 'Explore GitHub ↗',
    secondaryActionHref: 'https://github.com/daniele21',
  },
};
