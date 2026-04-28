import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { regions } from "@/lib/data"
import { MapPin, Clock, Car, Plane } from "lucide-react"

export const metadata = {
  title: "Plan Your Trip | MTPA",
  description: "Everything you need to plan your perfect Mpumalanga adventure.",
}

export default function ExplorePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/gods-window-panorama-view-mpumalanga.jpg"
              alt="Explore Mpumalanga"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Plan Your Trip</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">Your complete guide to exploring Mpumalanga.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Getting Here */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl font-bold mb-6">Getting Here</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border flex gap-4">
                  <Plane className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">By Air</h3>
                    <p className="text-sm text-muted-foreground">
                      Kruger Mpumalanga International Airport (MQP) is the main gateway, with daily flights from
                      Johannesburg. OR Tambo (JNB) is 4 hours by road.
                    </p>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 border flex gap-4">
                  <Car className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">By Road</h3>
                    <p className="text-sm text-muted-foreground">
                      Well-maintained roads connect Mpumalanga to Gauteng (N4, N12) and other provinces. Rental cars
                      available at all major airports.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regions */}
            <div className="mb-16">
              <h2 className="font-serif text-2xl font-bold mb-6">Explore by Region</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {regions.map((region) => (
                  <Link key={region.id} href={`/reserves?region=${region.id}`} className="group">
                    <div className="bg-card rounded-xl p-6 border hover:border-primary/30 hover:shadow-lg transition-all">
                      <MapPin className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{region.name}</h3>
                      <p className="text-sm text-muted-foreground">{region.reserves} reserves</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Best Time */}
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Best Time to Visit
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">May - September (Dry Season)</h3>
                  <p className="text-sm text-muted-foreground">
                    Best for wildlife viewing. Cooler temperatures, less vegetation means animals gather at waterholes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">October - April (Wet Season)</h3>
                  <p className="text-sm text-muted-foreground">
                    Lush landscapes, bird watching paradise. Baby animals and dramatic afternoon thunderstorms.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Year-Round</h3>
                  <p className="text-sm text-muted-foreground">
                    The Panorama Route and cultural experiences are excellent throughout the year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
