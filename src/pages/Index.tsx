import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DemoSection from "@/components/DemoSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <HeroSection onRunDemo={scrollToDemo} />
        <ProblemSection />
        <SolutionSection />
        <div ref={demoRef}>
          <DemoSection />
        </div>
        <ImpactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
