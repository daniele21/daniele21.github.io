/**
 * Types for the world-class /about editorial personal page data schema.
 */

export interface AboutStat {
  label: string;
  metric: string;
  detail: string;
  tag: string;
}

export interface NowFocusItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  status: string;
}

export interface NarrativeChapter {
  number: string;
  kicker: string;
  title: string;
  timeframe: string;
  paragraphs: string[];
  pullQuote?: string;
  keyTakeaway?: string;
  tags?: string[];
}

export interface ManifestoPrinciple {
  number: string;
  kicker: string;
  quote: string;
  title: string;
  description: string;
  takeaway: string;
  icon: string;
}

export interface ToolkitCategory {
  title: string;
  kicker: string;
  icon: string;
  items: {
    name: string;
    description: string;
    badge?: string;
  }[];
}

export interface CareerRole {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  badge?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface DivulgationHighlight {
  title: string;
  topic: string;
  readTime: string;
  url: string;
  summary: string;
  badge?: string;
  keyInsight?: string;
}

export interface RecognitionItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  badge: string;
  url?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  badge?: string;
}

export interface AboutProfile {
  name: string;
  headline: string;
  subheadline: string;
  tagline: string;
  location: string;
  locationStatus: string;
  affiliation: string;
  affiliationRole: string;
  portraitPath: string;
  portraitAlt: string;
  leadParagraph: string;
  badges: string[];
  stats: AboutStat[];
  socialLinks: {
    linkedin: string;
    github: string;
    staituned: string;
    email: string;
  };
}

export interface AboutContent {
  metaTitle: string;
  metaDescription: string;
  profile: AboutProfile;
  now: {
    kicker: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    items: NowFocusItem[];
  };
  story: {
    kicker: string;
    title: string;
    subtitle: string;
    chapters: NarrativeChapter[];
  };
  manifesto: {
    kicker: string;
    title: string;
    subtitle: string;
    principles: ManifestoPrinciple[];
  };
  toolkit: {
    kicker: string;
    title: string;
    subtitle: string;
    categories: ToolkitCategory[];
  };
  experience: {
    kicker: string;
    title: string;
    subtitle: string;
    roles: CareerRole[];
  };
  divulgation: {
    kicker: string;
    title: string;
    subtitle: string;
    staiTunedSummary: string;
    staiTunedMetrics: { label: string; value: string }[];
    featuredArticles: DivulgationHighlight[];
    mentorshipSummary: string;
  };
  recognition: {
    kicker: string;
    title: string;
    subtitle: string;
    awards: RecognitionItem[];
    education: EducationItem[];
  };
  cta: {
    kicker: string;
    title: string;
    description: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
  };
}
