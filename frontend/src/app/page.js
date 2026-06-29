import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
// import PropertyDetails from "@/components/PropertyDetails";
// import PropertySection from "@/components/PropertySection";
// import PropertyTabs from "@/components/PropertyTabs";
import LeistungenSection from "@/components/LeistungenSection";
import ServiceCards from "@/components/ServiceCards";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <TrustSection />
      <ServiceCards />
      <LeistungenSection />
      {/* <PropertySection /> */}
      <AboutSection />
      {/* <PropertyTabs /> */}
      {/* <PropertyDetails /> */}
      <ContactSection />
    </div>
  );
}