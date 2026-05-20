import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
import { Values } from "@/components/sections/Values";
import { ServicesChapters } from "@/components/sections/ServicesChapters";
import { AiSection } from "@/components/sections/AiSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Projects } from "@/components/sections/Projects";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <VisionMission />
      <Values />
      <ServicesChapters />
      <AiSection />
      <ProcessTimeline />
      <Projects />
      <Clients />
      <Contact />
    </main>
  );
}
