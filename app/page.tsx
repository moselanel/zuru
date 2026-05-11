import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { CategorySection } from "@/components/home/category-section"
import { FeaturedReserves } from "@/components/home/featured-reserves"
import { ExperiencesSection } from "@/components/home/experiences-section"
import { CampaignBanner } from "@/components/home/campaign-banner"
import { RegionsSection } from "@/components/home/regions-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedReserves />
        <CampaignBanner />
        <ExperiencesSection />
        <RegionsSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  )
}
