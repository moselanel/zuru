import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { accommodations } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Bed, Bath, Heart, Share2, ChevronLeft } from "lucide-react"

export async function generateStaticParams() {
  return accommodations.map((acc) => ({ slug: acc.slug }))
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const accommodation = accommodations.find((a) => a.slug === slug)

  if (!accommodation) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-20">
        {/* Back button */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/accommodation"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Accommodation
          </Link>
        </div>

        {/* Gallery */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={accommodation.image || "/placeholder.svg"}
                alt={accommodation.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {accommodation.gallery.slice(0, 4).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${accommodation.name} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {accommodation.type}
                  </Badge>
                  <h1 className="font-serif text-3xl font-bold mb-2">{accommodation.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{accommodation.reserveName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium text-foreground">{accommodation.rating}</span>
                      <span>({accommodation.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-6 py-6 border-y mb-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {accommodation.capacity}-{accommodation.maxCapacity} guests
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {accommodation.bedrooms} bedroom{accommodation.bedrooms > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {accommodation.bathrooms} bathroom{accommodation.bathrooms > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-3">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">{accommodation.description}</p>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {accommodation.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <div>
              <div className="bg-card rounded-2xl border p-6 sticky top-24">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold">R{accommodation.pricePerNight.toLocaleString()}</span>
                  <span className="text-muted-foreground">/ night</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Check-in</label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Check-out</label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guests</label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm">
                      {Array.from({ length: accommodation.maxCapacity }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} guest{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Reserve
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-3">You won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
