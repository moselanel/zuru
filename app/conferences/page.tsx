import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, Wifi, Car, Coffee, Presentation, Phone } from "lucide-react"

export const metadata = {
  title: "Conference Venues | MTPA",
  description: "World-class conference and meeting facilities in Mpumalanga's stunning natural settings.",
}

const venues = [
  {
    name: "Canyon Conference Centre",
    location: "Blyde River Canyon",
    capacity: 500,
    image: "/canyon-lodge.jpg",
    features: ["Main Hall (500 pax)", "4 Breakaway Rooms", "Outdoor Deck", "Full Catering"],
  },
  {
    name: "Safari Lodge Boardroom",
    location: "Kruger Gate Reserve",
    capacity: 50,
    image: "/safari-chalet.jpg",
    features: ["Executive Boardroom", "Private Dining", "Team Building Activities", "Accommodation"],
  },
  {
    name: "Loskop Dam Events Centre",
    location: "Loskop Dam",
    capacity: 200,
    image: "/loskop-dam-south-africa-scenic-lake-view-mountains.jpg",
    features: ["Lakeside Venue", "Water Activities", "Braai Facilities", "Camping Options"],
  },
]

export default function ConferencesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/canyon-lodge.jpg" alt="Conference Venues" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Conference Venues</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Host your next meeting or event in nature's boardroom.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {venues.map((venue) => (
                <div key={venue.name} className="bg-card rounded-2xl overflow-hidden border shadow-sm">
                  <div className="relative h-48">
                    <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-1">{venue.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{venue.location}</p>
                    <p className="text-sm font-medium text-primary mb-4">Up to {venue.capacity} guests</p>
                    <ul className="space-y-2 mb-4">
                      {venue.features.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Request Quote</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-center">All Venues Include</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { icon: Wifi, label: "High-Speed WiFi" },
                  { icon: Presentation, label: "AV Equipment" },
                  { icon: Coffee, label: "Catering" },
                  { icon: Car, label: "Parking" },
                  { icon: Users, label: "Event Support" },
                  { icon: Phone, label: "24/7 Assistance" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
