import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Accessibility | MTPA",
  description: "Our commitment to accessibility.",
}

export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Accessibility Statement</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground mb-6">
              MTPA is committed to ensuring digital accessibility for people with disabilities. We are continually
              improving the user experience for everyone and applying relevant accessibility standards.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Our Commitment</h2>
            <p className="text-muted-foreground mb-4">
              We aim to conform to WCAG 2.1 Level AA guidelines. Our website is designed to be perceivable, operable,
              understandable, and robust for all users.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Accessibility Features</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Keyboard navigation support throughout the site</li>
              <li>Alternative text for images</li>
              <li>Clear heading structure and semantic markup</li>
              <li>Sufficient color contrast ratios</li>
              <li>Resizable text without loss of functionality</li>
              <li>Screen reader compatible forms and controls</li>
            </ul>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Accessible Reserves & Accommodation</h2>
            <p className="text-muted-foreground mb-4">
              Many of our partner properties offer accessible facilities. Look for the accessibility filter when
              searching for accommodation, or contact us for specific requirements.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Feedback</h2>
            <p className="text-muted-foreground mb-6">
              We welcome your feedback on the accessibility of our website. Please let us know if you encounter any
              barriers.
            </p>

            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
