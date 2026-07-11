import { bi, type Bilingual } from "./bilingual";
import { siteImages } from "./assets";

export const brand = {
  name: "Nawa Production",
  shortName: "Nawa",
  nameAr: "Nawa Production",
  tagline: bi("Where Vision Meets Creation", "Where Vision Meets Creation"),
  email: "info@nawaproduction.com",
  website: "nawaproduction.com",
  location: bi("Riyadh, Saudi Arabia", "Riyadh, Saudi Arabia"),
  whatsapp: bi("Available on WhatsApp", "Available on WhatsApp"),
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "process", label: "Process" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact" },
] as const;

export const heroScene = {
  concept: bi("NAWA PRODUCTION", "NAWA PRODUCTION"),
  headline: bi("Where Vision Meets Creation", "Where Vision Meets Creation"),
  supporting: bi(
    "A Saudi-American production house built on relentless craft, discipline, and cinematic ambition. Backed by more than sixteen years of experience across major festivals, international streaming platforms, and leading Saudi brands, Nawa exists to bring stories to life exactly as they were envisioned.",
    "A Saudi-American production house built on relentless craft, discipline, and cinematic ambition. Backed by more than sixteen years of experience across major festivals, international streaming platforms, and leading Saudi brands, Nawa exists to bring stories to life exactly as they were envisioned.",
  ),
  ctaPrimary: {
    label: bi("Start a Project", "Start a Project"),
    href: "#contact",
  },
  ctaSecondary: {
    label: bi("Our Process", "Our Process"),
    href: "#process",
  },
  scrollCue: bi("Scroll", "Scroll"),
  image: siteImages.hero,
};

export type JourneyStage = {
  id: string;
  no: string;
  title: Bilingual;
  body: Bilingual;
  image: string;
  motionKey: string;
};

export const ourProcess = {
  sectionTitle: bi("Our Process", "Our Process"),
  sectionHeadline: bi("From discovery to delivery", "From discovery to delivery"),
  sectionIntro: bi(
    "Five focused stages — one seamless path from first conversation to final frame.",
    "Five focused stages — one seamless path from first conversation to final frame.",
  ),
  stages: [
    {
      id: "discovery",
      no: "01",
      title: bi("Discovery", "Discovery"),
      body: bi(
        "We listen, research, and understand your world before we create in it.",
        "We listen, research, and understand your world before we create in it.",
      ),
      image: siteImages.journey.discovery,
      motionKey: "documentsSlide",
    },
    {
      id: "pre-production",
      no: "02",
      title: bi("Pre Production", "Pre Production"),
      body: bi(
        "Script breakdown, storyboards, shot lists, and production plans, built with obsessive attention to detail to turn the creative brief we receive into an executable plan.",
        "Script breakdown, storyboards, shot lists, and production plans, built with obsessive attention to detail to turn the creative brief we receive into an executable plan.",
      ),
      image: siteImages.journey.preProduction,
      motionKey: "storyboardStrip",
    },
    {
      id: "production",
      no: "03",
      title: bi("Production", "Production"),
      body: bi(
        "Our crews execute with discipline, creativity, and full accountability on set.",
        "Our crews execute with discipline, creativity, and full accountability on set.",
      ),
      image: siteImages.journey.production,
      motionKey: "dollyMove",
    },
    {
      id: "post-production",
      no: "04",
      title: bi("Post Production", "Post Production"),
      body: bi(
        "Color, sound, graphics, and finishing are handled in-house with studio-grade precision.",
        "Color, sound, graphics, and finishing are handled in-house with studio-grade precision.",
      ),
      image: siteImages.journey.postProduction,
      motionKey: "colorGrade",
    },
    {
      id: "delivery",
      no: "05",
      title: bi("Delivery", "Delivery"),
      body: bi(
        "Final assets are delivered on time, on brand, and beyond expectation.",
        "Final assets are delivered on time, on brand, and beyond expectation.",
      ),
      image: siteImages.journey.delivery,
      motionKey: "screenExpand",
    },
  ] satisfies JourneyStage[],
};

/** @deprecated — use ourProcess */
export const productionJourney = ourProcess;

/** @deprecated Legacy — use heroScene */
export const hero = {
  headline: heroScene.headline.en,
  supporting: heroScene.supporting.en,
  ctaPrimary: { label: heroScene.ctaPrimary.label.en, href: heroScene.ctaPrimary.href },
  ctaSecondary: { label: heroScene.ctaSecondary.label.en, href: heroScene.ctaSecondary.href },
};

export const projects = [
  {
    id: "alrajhi",
    title: "Al Rajhi Bank",
    category: "Commercial",
    driveId: "17NudGWhWQQS6BrzPKIXQ9lAbann900aW",
  },
  {
    id: "tanmia",
    title: "Social Development Bank",
    category: "Corporate Film",
    driveId: "1OJ7UHtCykwh5mRHnm-mm_BzesuD5g2yI",
  },
  {
    id: "hena",
    title: "Hena Talga Joak",
    category: "Campaign",
    driveId: "12pwlLcp6eqKcvL7YhEhGaoTCvxq6f_i7",
  },
] as const;

export const about = {
  label: "About",
  title: "About Nawa",
  body: "Nawa Production is a Saudi-American production house built on relentless craft, discipline, and cinematic ambition. Backed by more than sixteen years of experience across major festivals, international streaming platforms, and leading Saudi brands, Nawa exists to bring stories to life exactly as they were envisioned.\n\nNawa is a production company first and always. We do not originate ideas, write scripts, or shape creative concepts — that is the craft of the creative and media agencies we work alongside. Our role begins where theirs ends: taking the script, the concept, and the creative direction handed to us, and turning it into finished film, photography, or content, produced to the highest standard. This is exactly what makes Nawa a trusted execution partner rather than a competitor — an extension of every agency's creative team, never a threat to their client relationships.",
  stats: [
    { label: "Founded", value: "Saudi Arabia" },
    { label: "Experience", value: "16+ Years" },
    { label: "Reach", value: "Global" },
  ],
};

export const vision = {
  title: "Our Vision",
  body: "To become the defining production force in the Middle East, delivering work that doesn't just entertain, but resonates, inspires, and endures. Saudi stories have already claimed their place on the global stage. Our role is to give them their most refined expression, through disciplined execution and real collaboration.",
  keywords: ["resonates", "inspires", "endures"],
};

export const mission = {
  title: "Our Mission",
  body: "To deliver world class productions that blend human craft with cutting-edge technology, empowering brands, artists, and storytellers to reach audiences they never imagined possible.",
  keywords: ["craft", "technology", "storytellers"],
};

export const valuesIntro = {
  label: "Our Values",
  title: "What we stand for",
  body: "Five commitments that shape every collaboration, every brief, and every final cut we deliver.",
};

export const values = [
  {
    no: "01",
    title: "Innovation",
    body: "We embrace the future without abandoning the soul of storytelling.",
  },
  {
    no: "02",
    title: "Excellence",
    body: "Every frame, every second, every detail is held to the highest standard.",
  },
  {
    no: "03",
    title: "Authenticity",
    body: "We tell real stories that reflect the culture, energy, and ambition of Saudi Arabia and the Arab world.",
  },
  {
    no: "04",
    title: "Collaboration",
    body: "We grow with our clients, our talent, and our community.",
  },
  {
    no: "05",
    title: "Impact",
    body: "We measure success not just in views, but in the lasting impression we leave.",
  },
];

export const servicesScene = {
  label: bi("Services", "Services"),
  title: bi("What We Do", "What We Do"),
  intro: bi(
    "From script to final delivery, Nawa executes every stage of production with precision, craft, and discipline:",
    "From script to final delivery, Nawa executes every stage of production with precision, craft, and discipline:",
  ),
  items: [
    {
      no: "01",
      title: bi("Film & Commercial Production", "Film & Commercial Production"),
      body: bi(
        "TV commercials, short films, branded content, and social media campaigns built for today's platforms and tomorrow's audiences. We manage the full production lifecycle: pre-production, shooting, and delivery, with no compromises.",
        "TV commercials, short films, branded content, and social media campaigns built for today's platforms and tomorrow's audiences. We manage the full production lifecycle: pre-production, shooting, and delivery, with no compromises.",
      ),
      image: siteImages.hero,
    },
    {
      no: "02",
      title: bi("Events & Live Production", "Events & Live Production"),
      body: bi(
        "From intimate brand launches to large-scale festival productions, we bring live moments to life with the same cinematic precision we apply to every project.",
        "From intimate brand launches to large-scale festival productions, we bring live moments to life with the same cinematic precision we apply to every project.",
      ),
      image: siteImages.journey.liveProduction,
    },
    {
      no: "03",
      title: bi("Post Production", "Post Production"),
      body: bi(
        "Our dedicated post production department is where raw footage transforms into a finished masterpiece. We offer:",
        "Our dedicated post production department is where raw footage transforms into a finished masterpiece. We offer:",
      ),
      image: siteImages.journey.postProduction,
      bullets: [
        "Professional video editing and color grading",
        "Sound design and audio mixing",
        "Motion graphics and visual effects (VFX)",
        "Subtitling and localization",
        "Delivery across all broadcast and digital formats",
      ],
      closing:
        "Every project that enters our post production suite exits with cinematic quality — polished, powerful, and ready for any screen in the world.",
    },
    {
      no: "04",
      title: bi("AI-Powered Production", "AI-Powered Production"),
      body: bi(
        "Nawa Production is one of the first Saudi production houses to fully integrate Artificial Intelligence into the production pipeline, not as a gimmick, but as a genuine production tool. Specifically, this means we can:",
        "Nawa Production is one of the first Saudi production houses to fully integrate Artificial Intelligence into the production pipeline, not as a gimmick, but as a genuine production tool. Specifically, this means we can:",
      ),
      image: siteImages.journey.aiProduction,
      bullets: [
        "Turn scripts and creative concepts we receive into fully produced AI-generated films and series, using advanced production pipelines",
        "Generate photorealistic characters, environments, and cinematic sequences without traditional set or location limits",
        "Produce advertising campaigns and content variations faster and at a fraction of the cost, built for A/B testing and multi-market rollouts",
      ],
      closing: "AI doesn't replace our craft. It expands what we can produce, and how fast we can produce it.",
    },
  ],
};

export const workScene = {
  label: bi("Our Work", "Our Work"),
  title: bi("Selected Projects", "Selected Projects"),
  intro: bi(
    "Campaigns, films, and branded content we are proud to have brought to life.",
    "Campaigns, films, and branded content we are proud to have brought to life.",
  ),
};

export const contactScene = {
  label: bi("Contact", "Contact"),
  title: bi("Let's Create Together", "Let's Create Together"),
  body: bi(
    "We are based in Riyadh, Saudi Arabia and work with clients across the region and beyond.",
    "We are based in Riyadh, Saudi Arabia and work with clients across the region and beyond.",
  ),
  closing: bi(
    "We don't follow trends. We build them.",
    "We don't follow trends. We build them.",
  ),
  ctaPrimary: {
    label: bi("Start a Project", "Start a Project"),
    href: `mailto:${brand.email}`,
  },
  ctaSecondary: {
    label: bi("View Our Work", "View Our Work"),
    href: "#projects",
  },
  image: siteImages.journey.delivery,
  items: [
    {
      label: bi("Email", "Email"),
      value: brand.email,
      href: `mailto:${brand.email}`,
    },
    {
      label: bi("Website", "Website"),
      value: brand.website,
      href: `https://${brand.website}`,
    },
    {
      label: bi("Location", "Location"),
      value: brand.location,
      href: "",
    },
    {
      label: bi("WhatsApp", "WhatsApp"),
      value: brand.whatsapp,
      href: "",
    },
  ],
};

/** @deprecated — use servicesScene */
export const servicesIntro = {
  title: "What We Do",
  body: "From script to final delivery, Nawa executes every stage of production with precision, craft, and discipline.",
};

export const services = [
  {
    no: "01",
    title: "Film & Commercial Production",
    body: "TV commercials, short films, branded content, and social media campaigns built for today's platforms and tomorrow's audiences. We manage the full production lifecycle: pre-production, shooting, and delivery, with no compromises.",
    image: siteImages.hero,
  },
  {
    no: "02",
    title: "Events & Live Production",
    body: "From intimate brand launches to large-scale festival productions, we bring live moments to life with the same cinematic precision we apply to every project.",
    image: siteImages.journey.liveProduction,
  },
  {
    no: "03",
    title: "Post Production",
    body: "Our dedicated post production department is where raw footage transforms into a finished masterpiece.",
    image: siteImages.journey.postProduction,
    bullets: [
      "Professional video editing and color grading",
      "Sound design and audio mixing",
      "Motion graphics and visual effects (VFX)",
      "Subtitling and localization",
      "Delivery across all broadcast and digital formats",
    ],
    closing:
      "Every project that enters our post production suite exits with cinematic quality — polished, powerful, and ready for any screen in the world.",
  },
  {
    no: "04",
    title: "AI-Powered Production",
    body: "Nawa Production is one of the first Saudi production houses to fully integrate Artificial Intelligence into the production pipeline, not as a gimmick, but as a genuine production tool.",
    image: siteImages.journey.aiProduction,
    bullets: [
      "Turn scripts and creative concepts we receive into fully produced AI-generated films and series, using advanced production pipelines",
      "Generate photorealistic characters, environments, and cinematic sequences without traditional set or location limits",
      "Produce advertising campaigns and content variations faster and at a fraction of the cost, built for A/B testing and multi-market rollouts",
    ],
    closing: "AI doesn't replace our craft. It expands what we can produce, and how fast we can produce it.",
    anchor: "ai",
  },
];

export const ai = {
  title: "AI-Powered Production",
  intro:
    "Nawa Production is one of the first Saudi production houses to fully integrate Artificial Intelligence into the production pipeline, not as a gimmick, but as a genuine production tool.",
  capabilities: [
    "Turn scripts and creative concepts we receive into fully produced AI-generated films and series, using advanced production pipelines",
    "Generate photorealistic characters, environments, and cinematic sequences without traditional set or location limits",
    "Produce advertising campaigns and content variations faster and at a fraction of the cost, built for A/B testing and multi-market rollouts",
  ],
  closing: "AI doesn't replace our craft. It expands what we can produce, and how fast we can produce it.",
};

export const process = [
  {
    no: "01",
    title: "Discovery",
    body: "We listen, research, and understand your world before we create in it.",
  },
  {
    no: "02",
    title: "Pre Production",
    body: "Script breakdown, storyboards, shot lists, and production plans, built with obsessive attention to detail to turn the creative brief we receive into an executable plan.",
  },
  {
    no: "03",
    title: "Production",
    body: "Our crews execute with discipline, creativity, and full accountability on set.",
  },
  {
    no: "04",
    title: "Post Production",
    body: "Color, sound, graphics, and finishing are handled in-house with studio-grade precision.",
  },
  {
    no: "05",
    title: "Delivery",
    body: "Final assets are delivered on time, on brand, and beyond expectation.",
  },
];

export type ClientItem = {
  name: string;
  driveId?: string;
  logo?: string;
  fit?: "cover" | "contain";
};

export const clients = {
  title: "Who We've Worked With",
  body: "Our work has reached audiences through some of the most respected brands and platforms in the region:",
  list: [
    {
      name: "MDL Beast",
      driveId: "1yskdGk7envR_8IyzL0Bu_tlHFQtf9G8r",
    },
    {
      name: "Al Rajhi Bank",
      driveId: "1ItKzG8SJYLf0G-Sg1nRmKikd4rqmnVpb",
      fit: "contain",
    },
    {
      name: "Social Development Bank",
      driveId: "1o_RvCqx5KbBxstl8ljymT5nFwjy6oM4p",
    },
    {
      name: "Domino's Pizza",
    },
    {
      name: "Babyshop",
      driveId: "1yiryQuGQY-aJWmZDYBsLvcnm3qav5I-K",
    },
    {
      name: "Careem",
    },
    {
      name: "Netflix",
    },
    {
      name: "Riyadh Front",
    },
    {
      name: "STC",
    },
    {
      name: "FranchiseME",
    },
    {
      name: "Oska",
    },
    {
      name: "Ghomd",
    },
  ] as ClientItem[],
};

export const contact = {
  title: contactScene.title.en,
  body: contactScene.body.en,
  ctaPrimary: { label: contactScene.ctaPrimary.label.en, href: contactScene.ctaPrimary.href },
  ctaSecondary: { label: contactScene.ctaSecondary.label.en, href: contactScene.ctaSecondary.href },
  items: [
    { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { label: "Location", value: brand.location.en, href: "" },
    { label: "WhatsApp", value: brand.whatsapp.en, href: "" },
  ],
};
