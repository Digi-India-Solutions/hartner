import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HomeCategory from "@/components/HomeCategory";  
import ServiceCards from "@/components/ServiceCards";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <TrustSection />
      <ServiceCards />
      <HomeCategory /> 
      <AboutSection /> 
      <ContactSection />
    </div>
  );
}