import { Hero } from "@/components/home/Hero";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { WhyLevantirSection } from "@/components/home/WhyLevantirSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <SolutionsSection />
      <MethodologySection />
      <EcosystemSection />
      <SpecialtiesSection />
      <WhyLevantirSection />
      <InsightsSection />
      <FinalCTA />
    </>
  );
}