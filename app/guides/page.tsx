import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GuidesHero } from "@/components/guides/guides-hero"
import { GuidesListing } from "@/components/guides/guides-listing"

export const metadata = {
  title: "Tour Guides | MTPA",
  description: "Connect with certified local tour guides for authentic Mpumalanga experiences.",
}

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <GuidesHero />
        <GuidesListing />
      </main>
      <SiteFooter />
    </>
  )
}
