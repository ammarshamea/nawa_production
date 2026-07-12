import { siteImages } from "@/lib/assets";
import type { LocaleContent } from "./types";

export const en: LocaleContent = {
  brand: {
    name: "Nawa Production",
    tagline: "Where Vision Meets Creation",
    email: "info@nawaproduction.com",
    website: "nawaproduction.com",
    location: "Riyadh, Saudi Arabia",
    whatsapp: "Available on WhatsApp",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    concept: "NAWA PRODUCTION",
    headline: "Where Vision Meets Creation",
    supporting:
      "A Saudi-American production house built on relentless craft, discipline, and cinematic ambition. Backed by more than sixteen years of experience across major festivals, international streaming platforms, and leading Saudi brands, Nawa exists to bring stories to life exactly as they were envisioned.",
    ctaPrimary: { label: "Start a Project", href: "#contact" },
    ctaSecondary: { label: "Our Process", href: "#process" },
    scrollCue: "Scroll",
    image: siteImages.hero,
  },
  about: {
    label: "About Nawa",
    title: "About",
    titleAccent: "Nawa",
    body: [
      "Nawa Production is a Saudi-American production house built on relentless craft, discipline, and cinematic ambition. Backed by more than sixteen years of experience across major festivals, international streaming platforms, and leading Saudi brands, Nawa exists to bring stories to life exactly as they were envisioned.",
      "Nawa is a production company first and always. We do not originate ideas, write scripts, or shape creative concepts, that is the craft of the creative and media agencies we work alongside. Our role begins where theirs ends: taking the script, the concept, and the creative direction handed to us, and turning it into finished film, photography, or content, produced to the highest standard. This is exactly what makes Nawa a trusted execution partner rather than a competitor, an extension of every agency's creative team, never a threat to their client relationships.",
    ],
    locationCaption: "Riyadh — Saudi Arabia",
    stats: [
      { label: "Founded", value: "Saudi Arabia" },
      { label: "Experience", value: "16+ Years" },
      { label: "Reach", value: "Global" },
    ],
    image: siteImages.story.about,
  },
  vision: {
    label: "Vision",
    title: "Our Vision",
    body: "To become the defining production force in the Middle East, delivering work that doesn't just entertain, but resonates, inspires, and endures. Saudi stories have already claimed their place on the global stage. Our role is to give them their most refined expression, through disciplined execution and real collaboration.",
    keywords: ["resonates", "inspires", "endures"],
    image: siteImages.story.vision,
  },
  mission: {
    label: "Mission",
    title: "Our Mission",
    body: "To deliver world class productions that blend human craft with cutting-edge technology, empowering brands, artists, storytellers to reach audiences they never imagined possible.",
    keywords: ["craft", "technology", "storytellers"],
    image: siteImages.story.mission,
  },
  values: {
    label: "Our Values",
    title: "",
    items: [
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
    ],
    image: siteImages.story.values,
  },
  process: {
    sectionTitle: "Our Process",
    sectionHeadline: "",
    sectionIntro: "",
    stages: [
      {
        id: "pre-production",
        no: "01",
        title: "Pre Production",
        body: "Script breakdown, storyboards, shot lists, and production plans, built with obsessive attention to detail to turn the creative brief we receive into an executable plan.",
        image: siteImages.journey.preProduction,
        motionKey: "storyboardStrip",
      },
      {
        id: "production",
        no: "02",
        title: "Production",
        body: "Our crews execute with discipline, creativity, and full accountability on set.",
        image: siteImages.journey.production,
        motionKey: "dollyMove",
      },
      {
        id: "post-production",
        no: "03",
        title: "Post Production",
        body: "Color, sound, graphics, and finishing are handled in-house with studio-grade precision.",
        image: siteImages.journey.postProduction,
        motionKey: "colorGrade",
      },
      {
        id: "delivery",
        no: "04",
        title: "Delivery",
        body: "Final assets are delivered on time, on brand, and beyond expectation.",
        image: siteImages.journey.delivery,
        motionKey: "screenExpand",
      },
    ],
  },
  services: {
    label: "Services",
    title: "What We Do",
    intro:
      "From script to final delivery, Nawa executes every stage of production with precision, craft, and discipline:",
    items: [
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
        body: "Our dedicated post production department is where raw footage transforms into a finished masterpiece. We offer:",
        bullets: [
          "Professional video editing and color grading",
          "Sound design and audio mixing",
          "Motion graphics and visual effects (VFX)",
          "Subtitling and localization",
          "Delivery across all broadcast and digital formats",
        ],
        closing:
          "Every project that enters our post production suite exits with cinematic quality polished, powerful, and ready for any screen in the world.",
        image: siteImages.journey.postProduction,
      },
      {
        no: "04",
        title: "AI-Powered Production",
        body: "Nawa Production is one of the first Saudi production houses to fully integrate Artificial Intelligence into the production pipeline, not as a gimmick, but as a genuine production tool.",
        bulletsIntro: "Specifically, this means we can:",
        bullets: [
          "Turn scripts and creative concepts we receive into fully produced AI-generated films and series, using advanced production pipelines",
          "Generate photorealistic characters, environments, and cinematic sequences without traditional set or location limits",
          "Produce advertising campaigns and content variations faster and at a fraction of the cost, built for A/B testing and multi-market rollouts",
        ],
        closing:
          "AI doesn't replace our craft. It expands what we can produce, and how fast we can produce it.",
        image: siteImages.journey.aiProduction,
      },
    ],
    cta: "Start a Project",
  },
  work: {
    label: "Our Work",
    title: "Selected Projects",
    intro: "Campaigns, films, and branded content we are proud to have brought to life.",
  },
  clients: {
    label: "Our Clients",
    title: "Who We've Worked With",
    body: "Our work has reached audiences through some of the most respected brands and platforms in the region:",
  },
  contact: {
    label: "Contact",
    title: "Let's Create Together",
    body: "We are based in Riyadh, Saudi Arabia and work with clients across the region and beyond.",
    closing: "We don't follow trends. We build them.",
    ctaPrimary: { label: "Start a Project", href: "mailto:info@nawaproduction.com" },
    ctaSecondary: { label: "View Our Work", href: "#projects" },
    items: [
      { label: "Email", value: "info@nawaproduction.com", href: "mailto:info@nawaproduction.com" },
      { label: "Website", value: "nawaproduction.com", href: "https://nawaproduction.com" },
      { label: "Location", value: "Riyadh, Saudi Arabia", href: "" },
      { label: "WhatsApp", value: "Available on WhatsApp", href: "" },
    ],
    image: siteImages.journey.delivery,
  },
};
