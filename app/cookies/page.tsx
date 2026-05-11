import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Cookie Policy | MTPA",
  description: "Cookie policy for Mpumalanga Tourism & Parks Agency.",
}

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files stored on your device when you visit a website. They help us provide you with
              a better experience by remembering your preferences and understanding how you use our site.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Cookies We Use</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Essential Cookies:</strong> Required for the website to function properly, including session
              management and security features.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can
              improve our services.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Preference Cookies:</strong> Remember your settings and preferences for a better experience.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control and delete cookies through your browser settings. Note that disabling cookies may affect
              the functionality of our website.
            </p>

            <h2 className="font-serif text-xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at privacy@mtpa.co.za.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
