import GlowBackground from "@/components/landing/GlowBackground";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GlowBackground />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
