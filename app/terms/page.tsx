import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Terms of Service | MTPA",
  description: "Terms of service for Mpumalanga Tourism & Parks Agency.",
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using the MTPA website and services, you agree to be bound by these Terms of Service and
              all applicable laws and regulations.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">2. Booking and Reservations</h2>
            <p className="text-muted-foreground mb-4">
              All bookings are subject to availability and confirmation. Prices are quoted in South African Rand (ZAR)
              and include VAT where applicable. A booking is only confirmed once payment has been received and a
              confirmation email has been sent.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">3. Cancellation Policy</h2>
            <p className="text-muted-foreground mb-4">
              Cancellation policies vary by property and experience. Please review the specific cancellation terms for
              your booking. Generally, cancellations made more than 7 days before arrival are eligible for a full
              refund.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              You are responsible for providing accurate information when making bookings. You agree to comply with all
              rules and regulations of the reserves and accommodations you visit.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              MTPA acts as an intermediary between guests and service providers. While we strive to ensure accuracy, we
              are not liable for any inaccuracies in property descriptions or services provided by third parties.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">6. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the
              exclusive jurisdiction of South African courts.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
