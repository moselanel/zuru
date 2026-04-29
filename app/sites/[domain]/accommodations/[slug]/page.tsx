"use client"

import { useMemo } from "react"
import { useTenant } from "@/lib/tenant/context"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, Calendar, Share2, Bed, Wifi, UtensilsCrossed, Car, Waves, Dumbbell, Wind } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { ImageGallery } from "@/components/tenant/image-gallery"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  restaurant: UtensilsCrossed,
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  spa: Wind,
}

export default function AccommodationDetailPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const slug = params.slug as string

  const { data: accommodations } = useSWR(`/api/tenant/${domain}/accommodations`, fetcher)
  const accommodation = accommodations?.find((a: any) => a.slug === slug)

  // Build gallery images array
  const galleryImages = useMemo(() => {
    if (!accommodation) return []
    const images: string[] = []
    if (accommodation.hero_image_url) images.push(accommodation.hero_image_url)
    if (accommodation.gallery_urls && Array.isArray(accommodation.gallery_urls)) {
      images.push(...accommodation.gallery_urls)
    }
    return images
  }, [accommodation])

  if (!accommodation) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Accommodation not found</h1>
          <Link href={`/accommodations`}>
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Accommodations
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${accommodation.hero_image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link href={`/accommodations`}>
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Accommodations
              </Button>
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-white/20 text-white border-white/30">
                {accommodation.category}
              </Badge>
              <div className="flex items-center gap-1">
                {Array.from({ length: accommodation.star_rating || 0 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {accommodation.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {galleryImages.length > 1 && (
                <ImageGallery images={galleryImages} alt={accommodation.name} />
              )}

              <div>
                <p className="text-xl text-muted-foreground mb-6">
                  {accommodation.short_description}
                </p>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {accommodation.description}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              {accommodation.amenities && accommodation.amenities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-3">
                    {accommodation.amenities.map((amenity: string) => {
                      const IconComponent = amenityIcons[amenity.toLowerCase()] || Wifi
                      return (
                        <Badge key={amenity} variant="secondary" className="gap-2 py-2 px-3">
                          <IconComponent className="h-4 w-4" />
                          {amenity}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-medium">{accommodation.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price From</p>
                      <p className="font-medium text-2xl">
                        {formatPrice(accommodation.price_from, accommodation.price_currency)}
                        <span className="text-sm font-normal text-muted-foreground">/night</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link href={`/contact`} className="block">
                      <Button 
                        className="w-full text-white"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Check Availability
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
