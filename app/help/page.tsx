import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, MapPin, Phone, FileText } from "lucide-react"

export const metadata = {
  title: "Booking Help | MTPA",
  description: "Get help with your MTPA bookings.",
}

export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Booking Help</h1>
            <p className="text-muted-foreground">Find help with reservations, payments, and more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: Calendar,
                title: "Manage Booking",
                desc: "View, modify, or cancel your reservation",
                href: "/account",
              },
              { icon: CreditCard, title: "Payment Issues", desc: "Help with payments and refunds", href: "/contact" },
              {
                icon: MapPin,
                title: "Find Your Booking",
                desc: "Look up booking with confirmation number",
                href: "/account",
              },
              { icon: FileText, title: "FAQs", desc: "Common questions answered", href: "/faqs" },
            ].map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="bg-card rounded-xl p-6 border hover:border-primary/30 hover:shadow-lg transition-all flex gap-4"
              >
                <Icon className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-foreground text-background rounded-2xl p-8 text-center">
            <Phone className="h-10 w-10 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">Need Immediate Help?</h2>
            <p className="text-background/80 mb-4">Our support team is available 24/7.</p>
            <p className="text-2xl font-bold mb-4">+27 13 759 5301</p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/contact">Send a Message</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
