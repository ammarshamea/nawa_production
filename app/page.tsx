import { HeroCinematic } from "@/components/cinematic/HeroCinematic";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
import { Values } from "@/components/sections/Values";
import { ProductionJourney } from "@/components/cinematic/ProductionJourney";
import { ServicesCinematic } from "@/components/cinematic/ServicesCinematic";
import { WorkSection } from "@/components/cinematic/WorkSection";
import { Clients } from "@/components/sections/Clients";
import { ContactStudio } from "@/components/cinematic/ContactStudio";

export default function Page() {
  return (
    <main className="relative">
      <HeroCinematic />
      <About />
      <VisionMission />
      <Values />
      <ProductionJourney />
      <ServicesCinematic />
      <WorkSection />
      <Clients />
      <ContactStudio />
    </main>
  );
}
