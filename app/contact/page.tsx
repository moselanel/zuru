import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | MTPA",
  description: "Get in touch with Mpumalanga Tourism & Parks Agency.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help you plan your perfect Mpumalanga experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form className="bg-card rounded-2xl p-6 md:p-8 border space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={6} />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border">
                <h2 className="font-semibold mb-4">Head Office</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">1 Hall Street, Nelspruit, Mpumalanga, 1200</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">+27 13 759 5300</span>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">info@mtpa.co.za</span>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">Mon-Fri: 08:00 - 16:30</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6">
                <h2 className="font-semibold mb-2">24/7 Booking Support</h2>
                <p className="text-sm text-muted-foreground mb-3">For urgent booking enquiries:</p>
                <p className="font-semibold text-primary">+27 13 759 5301</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
