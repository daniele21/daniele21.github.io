/** Focused, evidence-led content schema for the public About page. */
export interface AboutMetric {
  value: string;
  label: string;
  context: string;
}

export interface AboutProject {
  name: string;
  category: 'Infrastructure' | 'Application';
  purpose: string;
  description: string;
  href: string;
}

export interface AboutPrinciple {
  title: string;
  description: string;
}

export interface AboutHighlight {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface AboutContent {
  metaTitle: string;
  metaDescription: string;
  profile: {
    name: string;
    headline: string;
    affiliation: string;
    location: string;
    portraitPath: string;
    portraitAlt: string;
    socialLinks: {
      linkedin: string;
      github: string;
      staituned: string;
    };
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleClose: string;
    lead: string;
  };
  story: {
    kicker: string;
    title: string;
    paragraphs: string[];
    emphasis: string;
  };
  impact: {
    kicker: string;
    title: string;
    intro: string;
    metrics: AboutMetric[];
  };
  projects: {
    kicker: string;
    title: string;
    intro: string;
    items: AboutProject[];
  };
  principles: {
    kicker: string;
    title: string;
    intro: string;
    items: AboutPrinciple[];
  };
  beyond: {
    kicker: string;
    title: string;
    items: AboutHighlight[];
  };
  direction: {
    kicker: string;
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
  };
}
