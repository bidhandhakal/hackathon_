import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ServicesScroll from '@/components/services-scroll'
import HowItWorks from '@/components/how-it-works'
import PricingSection from '@/components/pricing-section'
import HireCTA from '@/components/hire-cta'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Quickkam - Find Skilled Workers Near You',
  description: 'A location-based platform connecting Nepali clients with nearby skilled workers for fast, reliable physical services.',
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesScroll />
      <HowItWorks />
      <PricingSection />
      <HireCTA />
      <Footer />
    </main>
  )
}
