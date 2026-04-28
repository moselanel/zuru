import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import { accommodations, experiences } from "@/lib/data"

export const metadata = {
  title: "My Wishlist | MTPA",
  description: "Your saved favorites.",
}

export default function WishlistPage() {
  const savedAccommodations = accommodations.slice(0, 2)
  const savedExperiences = experiences.slice(0, 2)

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">Places and experiences you've saved for later.</p>
            </div>
            <Link href="/account">
              <Button variant="outline">Back to Account</Button>
            </Link>
          </div>

          {/* Saved Accommodations */}
          <section className="mb-12">
            <h2 className="font-semibold text-lg mb-4">Saved Accommodation ({savedAccommodations.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedAccommodations.map((acc) => (
                <div key={acc.id} className="bg-card rounded-2xl overflow-hidden border group">
                  <div className="relative h-48">
                    <Image src={acc.image || "/placeholder.svg"} alt={acc.name} fill className="object-cover" />
                    <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{acc.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{acc.reserveName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium text-sm">{acc.rating}</span>
                      </div>
                      <p className="font-semibold">
                        R{acc.pricePerNight.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">/night</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Saved Experiences */}
          <section>
            <h2 className="font-semibold text-lg mb-4">Saved Experiences ({savedExperiences.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedExperiences.map((exp) => (
                <div key={exp.id} className="bg-card rounded-2xl overflow-hidden border group">
                  <div className="relative h-48">
                    <Image src={exp.image || "/placeholder.svg"} alt={exp.name} fill className="object-cover" />
                    <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{exp.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {exp.duration} · {exp.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium text-sm">{exp.rating}</span>
                      </div>
                      <p className="font-semibold">
                        R{exp.price.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">/person</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {savedAccommodations.length === 0 && savedExperiences.length === 0 && (
            <div className="text-center py-16">
              <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-serif text-xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Start exploring and save your favorites!</p>
              <Button asChild>
                <Link href="/accommodation">Browse Accommodation</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
