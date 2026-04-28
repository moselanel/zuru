import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata = {
  title: "Checkout | MTPA",
  description: "Complete your booking with Mpumalanga Tourism & Parks Agency.",
}

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 pb-16 bg-muted/30 min-h-screen">
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  )
}
