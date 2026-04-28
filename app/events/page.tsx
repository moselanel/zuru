import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EventsHero } from "@/components/events/events-hero"
import { EventsListing } from "@/components/events/events-listing"

export const metadata = {
  title: "Events | MTPA",
  description: "Discover upcoming events, festivals, and activities across Mpumalanga.",
}

export default function EventsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <EventsHero />
        <EventsListing />
      </main>
      <SiteFooter />
    </>
  )
}
