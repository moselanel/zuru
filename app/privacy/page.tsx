import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Privacy Policy | MTPA",
  description: "Privacy policy for Mpumalanga Tourism & Parks Agency.",
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when you create an account, make a booking, or
              contact us for support. This may include your name, email address, phone number, and payment information.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to process bookings, send confirmations, provide customer support, and
              improve our services. We may also use your information to send promotional communications with your
              consent.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We share your information with accommodation providers and experience operators to fulfill your bookings.
              We do not sell your personal information to third parties.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, or destruction.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Under POPIA (Protection of Personal Information Act), you have the right to access, correct, or delete
              your personal information. Contact us at privacy@mtpa.co.za to exercise these rights.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related enquiries, please contact our Information Officer at privacy@mtpa.co.za.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
