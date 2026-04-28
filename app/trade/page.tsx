import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, Users, Globe, Award, Download, Mail } from "lucide-react"

export const metadata = {
  title: "Travel Trade | MTPA",
  description: "Resources and partnerships for travel agents and tour operators.",
}

export default function TradePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/blyde-river-canyon-three-rondavels-viewpoint.jpg"
              alt="Travel Trade"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Travel Trade Portal</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Partner with MTPA to bring the magic of Mpumalanga to travellers worldwide.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: FileText,
                  title: "Product Information",
                  desc: "Access detailed info on all MTPA products and services",
                },
                { icon: Users, title: "Agent Rates", desc: "Competitive commission structures for trade partners" },
                {
                  icon: Globe,
                  title: "Marketing Support",
                  desc: "Co-marketing opportunities and promotional materials",
                },
                { icon: Award, title: "FAM Trips", desc: "Familiarisation trips for registered agents" },
                { icon: Download, title: "Resources", desc: "Downloadable brochures, images, and itineraries" },
                { icon: Mail, title: "Trade Desk", desc: "Dedicated support for booking enquiries" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card rounded-xl p-6 border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-foreground text-background rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">Become a Trade Partner</h2>
              <p className="text-background/80 mb-6 max-w-2xl mx-auto">
                Register as an MTPA trade partner to access exclusive rates, resources, and support.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Register Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
