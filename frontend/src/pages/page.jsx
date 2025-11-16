import Hero from "@/components/hero";
import ServicesScroll from "@/components/services-scroll";
import HowItWorks from "@/components/how-it-works";
import PricingSection from "@/components/pricing-section";
import HireCTA from "@/components/hire-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesScroll />
      <HowItWorks />
      <PricingSection />
      <HireCTA />
    </>
  );
}
