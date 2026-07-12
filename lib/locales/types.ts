export type Locale = "en" | "ar";

export type NavItem = {
  id: string;
  label: string;
};

export type ValueItem = {
  no: string;
  title: string;
  body: string;
};

export type ServiceItem = {
  no: string;
  title: string;
  body: string;
  bullets?: string[];
  bulletsIntro?: string;
  closing?: string;
  image: string;
};

export type ProcessStage = {
  id: string;
  no: string;
  title: string;
  body: string;
  image: string;
  motionKey: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export type LocaleContent = {
  brand: {
    name: string;
    tagline: string;
    email: string;
    website: string;
    location: string;
    whatsapp: string;
  };
  nav: NavItem[];
  hero: {
    concept: string;
    headline: string;
    supporting: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    scrollCue: string;
    image: string;
  };
  about: {
    label: string;
    title: string;
    titleAccent: string;
    body: string[];
    locationCaption: string;
    stats: { label: string; value: string }[];
    image: string;
  };
  vision: {
    label: string;
    title: string;
    body: string;
    keywords: string[];
    image: string;
  };
  mission: {
    label: string;
    title: string;
    body: string;
    keywords: string[];
    image: string;
  };
  values: {
    label: string;
    title: string;
    items: ValueItem[];
    image: string;
  };
  process: {
    sectionTitle: string;
    sectionHeadline: string;
    sectionIntro: string;
    stages: ProcessStage[];
  };
  services: {
    label: string;
    title: string;
    intro: string;
    items: ServiceItem[];
    cta: string;
  };
  work: {
    label: string;
    title: string;
    intro: string;
  };
  clients: {
    label: string;
    title: string;
    body: string;
  };
  contact: {
    label: string;
    title: string;
    body: string;
    closing: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    items: ContactItem[];
    image: string;
  };
};
