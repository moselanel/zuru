import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccommodationListing } from "@/components/accommodation/accommodation-listing"
import { AccommodationHero } from "@/components/accommodation/accommodation-hero"

export const metadata = {
  title: "Accommodation | MTPA",
  description: "Find your perfect stay in Mpumalanga - from luxury lodges to authentic bush camps.",
}

export default function AccommodationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AccommodationHero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <AccommodationListing />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
