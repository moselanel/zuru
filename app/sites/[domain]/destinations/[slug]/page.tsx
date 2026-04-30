"use client"

import { useMemo } from "react"
import { useTenant } from "@/lib/tenant/context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  MapPin, 
  Share2, 
  Sun, 
  Cloud, 
  Calendar,
  Sparkles,
  CheckCircle2,
  Compass,
  Heart,
  Map
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { ImageGallery } from "@/components/tenant/image-gallery"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DestinationDetailPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const slug = params.slug as string

  const { data: destinations } = useSWR(`/api/tenant/${domain}/destinations`, fetcher)
  const destination = destinations?.find((d: any) => d.slug === slug)

  // Build gallery images array
  const galleryImages = useMemo(() => {
    if (!destination) return []
    const images: string[] = []
    if (destination.hero_image_url) images.push(destination.hero_image_url)
    if (destination.gallery && Array.isArray(destination.gallery)) {
      images.push(...destination.gallery)
    }
    return images
  }, [destination])

  // Parse highlights and location from jsonb fields
  const highlights = destination?.highlights || []
  const location = destination?.location || {}

  if (!destination) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Destination not found</h1>
          <Link href={`/destinations`}>
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
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
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${destination.hero_image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920"})`,
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link href={`/destinations`}>
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Destinations
              </Button>
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {location.region && (
                <Badge className="bg-white/20 text-white border-white/30">
                  <MapPin className="mr-1 h-3 w-3" />
                  {location.region}
                </Badge>
              )}
              {destination.is_featured && (
                <Badge className="bg-yellow-500/80 text-white border-yellow-400/30">
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {galleryImages.length > 1 && (
                <ImageGallery images={galleryImages} alt={destination.name} />
              )}

              {/* Description */}
              <div>
                <p className="text-xl text-muted-foreground mb-6">
                  {destination.short_description}
                </p>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {destination.description}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" style={{ color: tenant.primary_color }} />
                      Destination Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: tenant.primary_color }} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Travel Info */}
                  <div className="space-y-4">
                    {destination.best_time_to_visit && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Best Time to Visit</p>
                          <p className="font-medium">{destination.best_time_to_visit}</p>
                        </div>
                      </div>
                    )}

                    {destination.climate && (
                      <div className="flex items-start gap-3">
                        <Sun className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Climate</p>
                          <p className="font-medium">{destination.climate}</p>
                        </div>
                      </div>
                    )}

                    {location.region && (
                      <div className="flex items-start gap-3">
                        <Compass className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{location.region}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link href={`/contact?destination=${destination.slug}`} className="block">
                      <Button 
                        className="w-full text-white"
                        size="lg"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Plan Your Visit
                      </Button>
                    </Link>
                    <Link href={`/experiences`} className="block">
                      <Button variant="outline" className="w-full">
                        <Compass className="mr-2 h-4 w-4" />
                        Browse Experiences
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Save to Wishlist
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  {/* Map Preview (if coordinates available) */}
                  {location.lat && location.lng && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Location</p>
                        <a
                          href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer border">
                            <div className="text-center">
                              <Map className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">View on Map</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
