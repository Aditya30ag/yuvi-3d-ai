import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { EnginesSection } from "./EnginesSection";
import { UseCasesSection } from "./UseCasesSection";
import { FAQSection } from "./FAQSection";
import { FinalCTASection } from "./FinalCTASection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg-base text-text-primary transition-colors">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <EnginesSection />
        <UseCasesSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
