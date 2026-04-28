import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReservesListing } from "@/components/reserves/reserves-listing"
import { ReservesHero } from "@/components/reserves/reserves-hero"

export const metadata = {
  title: "Nature Reserves | MTPA",
  description:
    "Explore Mpumalanga's world-class nature reserves, from the iconic Blyde River Canyon to Big Five safari destinations.",
}

export default function ReservesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <ReservesHero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ReservesListing />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
