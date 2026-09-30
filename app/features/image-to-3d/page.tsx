import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { SingleVsMultiSection } from "@/components/landing/SingleVsMultiSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { SharpEdgesSection } from "@/components/landing/SharpEdgesSection";
import { WorkflowsSection } from "@/components/landing/WorkflowsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ExploreFeaturesSection } from "@/components/landing/ExploreFeaturesSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Free Image to 3D Model — Convert Photo to 3D in a Minute | Studio3D",
  description:
    "Convert any image to a 3D model with Studio3D AI. Turn photos into textured 3D models for free. Export GLB, FBX, OBJ, STL for Blender, Unity, Unreal & 3D printing.",
};

export default function ImageTo3DLandingPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-[#00ffa3] selection:text-[#050508] relative overflow-x-hidden transition-colors">
      <Navbar />
      <main>
        <HeroSection />
        <LogoStrip />
        <HowItWorksSection />
        <SingleVsMultiSection />
        <WhyChooseSection />
        <SharpEdgesSection />
        <WorkflowsSection />
        <TestimonialsSection />
        <FAQSection />
        <ExploreFeaturesSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
