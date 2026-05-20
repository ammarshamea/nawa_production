export const brand = {
  name: "Nawa Production",
  shortName: "Nawa",
  tagline: "Stories That Move Cultures",
  email: "info@nawaproduction.com",
  website: "nawaproduction.com",
  location: "Riyadh, Saudi Arabia",
  whatsapp: "Available on WhatsApp",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

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

export const hero = {
  headline: "Stories That Move Cultures",
  supporting:
    "A Saudi production house crafting original content, commercial campaigns, and live experiences that leave a lasting impact.",
  ctaPrimary: { label: "Explore", href: "#services" },
  ctaSecondary: { label: "Let's Talk", href: "#contact" },
};

export const about = {
  title: "About Nawa",
  body: "Nawa Production is a Saudi Production house built on a foundation of lived storytelling, bold vision, and relentless craft. Founded by a producer with over six years of experience spanning major festivals, international streaming platforms, and iconic Saudi brands — Nawa exists to shape the next chapter of Arabic content.",
};

export const vision = {
  title: "Our Vision",
  body: "To become the defining production force in the Arab world—crafting work that not only entertains, but also resonates, inspires, and endures.\n\nWe believe Saudi stories have already claimed their place on the global stage, and we are here to shape their most refined expression through meaningful collaboration.",
  keywords: ["resonates", "inspires", "endures"],
};

export const mission = {
  title: "Our Mission",
  body: "To deliver world-class productions that blend human creativity with cutting-edge technology — empowering brands, artists, and storytellers to reach audiences they never imagined possible.",
  keywords: ["creativity", "technology", "storytellers"],
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

export const servicesIntro = {
  title: "What We Do",
  body: "From concept to final delivery, Nawa handles every stage of production with precision and creativity.",
};

export const services = [
  {
    no: "01",
    title: "Film & Commercial Production",
    body: "TV commercials, short films, branded content, and social media campaigns engineered for today's platforms and tomorrow's audiences. We manage the full production lifecycle — pre-production, shooting, and delivery — with no compromise.",
    image: "/assets/photos/hero-production-set.png",
  },
  {
    no: "02",
    title: "Creative Development",
    body: "Great productions begin with great ideas. Our creative team works alongside clients to develop concepts, scripts, and visual strategies that are bold, culturally resonant, and commercially powerful.",
    image: "/assets/photos/creative-vision-eye.png",
  },
  {
    no: "03",
    title: "Events & Live Production",
    body: "From intimate brand launches to large-scale festival productions, we bring live moments to life with the same cinematic precision we apply to every project.",
    image: "/assets/photos/events-live-stage.png",
  },
  {
    no: "04",
    title: "Post Production",
    body: "Our dedicated post production department is where raw footage transforms into a finished masterpiece.",
    image: "/assets/photos/about-saudi-horizon.png",
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
    no: "05",
    title: "AI-Powered Production",
    body: "Nawa stands at the frontier of a new creative era. One of the first Saudi production companies to integrate Artificial Intelligence as a full creative tool — not just a support system.",
    image: "/assets/photos/ai-frontier-stage.png",
    anchor: "ai",
  },
];

export const ai = {
  title: "AI-Powered Production",
  intro:
    "Nawa Production stands at the frontier of a new creative era. We are one of the first Saudi production companies to integrate Artificial Intelligence as a full creative tool — not just a support system.",
  capabilities: [
    "Develop and produce complete AI-generated series and feature films — from script to screen using advanced AI pipelines.",
    "Generate photorealistic characters, environments, and cinematic sequences without traditional set limitations.",
    "Create AI-powered advertising campaigns that cut production time and costs dramatically.",
    "Produce unlimited content variations for A/B testing and multi-market campaigns.",
    "Bring ideas to life that were previously impossible due to budget or logistical constraints.",
  ],
  closing:
    "AI doesn't replace our creativity — it amplifies it. At Nawa, human vision and machine intelligence work together.",
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
    body: "Concepts, scripts, storyboards, and production plans are crafted with obsessive attention to detail.",
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

export const clients = {
  title: "Who We've Worked With",
  body: "Our work has reached audiences through some of the most respected brands and platforms in the region:",
  list: [
    "Social Development Bank",
    "Greenwich",
    "Alrajhi Bank",
    "Babyshop",
    "Barns",
    "MDL Beast",
  ],
};

export const stats = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "M+", label: "Audience Reached" },
  { value: 20, suffix: "+", label: "Industry Awards" },
];

export const contact = {
  title: "Let's Create Together",
  body: "We are based in Riyadh, Saudi Arabia and work with clients across the region and beyond.",
  ctaPrimary: { label: "Start a Project", href: `mailto:${brand.email}` },
  ctaSecondary: { label: "View Our Work", href: "#projects" },
  items: [
    { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { label: "Location", value: brand.location, href: "" },
    { label: "WhatsApp", value: brand.whatsapp, href: "" },
  ],
};
