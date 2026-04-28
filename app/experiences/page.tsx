import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ExperiencesListing } from "@/components/experiences/experiences-listing"
import { ExperiencesHero } from "@/components/experiences/experiences-hero"

export const metadata = {
  title: "Things To Do | MTPA",
  description: "Discover unforgettable experiences in Mpumalanga - from sunrise safaris to cultural encounters.",
}

export default function ExperiencesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ExperiencesHero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ExperiencesListing />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
