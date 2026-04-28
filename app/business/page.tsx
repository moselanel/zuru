import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Trophy, TreePine } from "lucide-react"

export const metadata = {
  title: "Business Tourism | MTPA",
  description: "Corporate retreats, team building, and business tourism services in Mpumalanga.",
}

export default function BusinessPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/canyon-lodge-deck.jpg" alt="Business Tourism" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Business Tourism</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Where productivity meets paradise. Transform your corporate events in Mpumalanga.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">Corporate Solutions</h2>
                <p className="text-muted-foreground mb-6">
                  From intimate executive retreats to large-scale conferences, Mpumalanga offers unique venues that
                  inspire creativity and foster team bonding in breathtaking natural settings.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Briefcase, title: "Executive Retreats", desc: "Luxury lodges for strategic planning" },
                    { icon: Users, title: "Team Building", desc: "Adventure activities that build bonds" },
                    {
                      icon: Trophy,
                      title: "Incentive Travel",
                      desc: "Reward top performers with unforgettable experiences",
                    },
                    { icon: TreePine, title: "Eco-Conferences", desc: "Sustainable meeting solutions in nature" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image src="/safari-chalet-deck.jpg" alt="Corporate retreat" fill className="object-cover" />
              </div>
            </div>

            <div className="text-center bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl font-bold mb-4">Plan Your Corporate Event</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our dedicated business tourism team will help you create a customised programme for your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/conferences">View Venues</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
