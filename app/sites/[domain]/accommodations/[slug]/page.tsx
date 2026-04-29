"use client"

import { useMemo } from "react"
import { useTenant } from "@/lib/tenant/context"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Share2, 
  Bed, 
  Users,
  Heart,
  Phone,
  Mail,
  Globe,
  Wifi,
  UtensilsCrossed,
  Car,
  Waves,
  Dumbbell,
  Wind,
  Coffee,
  Tv,
  AirVent,
  ShowerHead,
  Mountain,
  TreePine,
  Baby,
  Accessibility,
  Leaf,
  PawPrint,
  Sparkles,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { ImageGallery } from "@/components/tenant/image-gallery"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Comprehensive amenity icons
const amenityIcons: Record<string, { icon: React.ElementType; label: string }> = {
  wifi: { icon: Wifi, label: "Free WiFi" },
  restaurant: { icon: UtensilsCrossed, label: "Restaurant" },
  parking: { icon: Car, label: "Free Parking" },
  pool: { icon: Waves, label: "Swimming Pool" },
  gym: { icon: Dumbbell, label: "Fitness Center" },
  spa: { icon: Wind, label: "Spa & Wellness" },
  bar: { icon: Coffee, label: "Bar/Lounge" },
  tv: { icon: Tv, label: "TV" },
  aircon: { icon: AirVent, label: "Air Conditioning" },
  "air conditioning": { icon: AirVent, label: "Air Conditioning" },
  shower: { icon: ShowerHead, label: "Private Bathroom" },
  view: { icon: Mountain, label: "Scenic Views" },
  garden: { icon: TreePine, label: "Garden" },
  "family friendly": { icon: Baby, label: "Family Friendly" },
  "kid friendly": { icon: Baby, label: "Kid Friendly" },
  accessible: { icon: Accessibility, label: "Wheelchair Accessible" },
  "eco friendly": { icon: Leaf, label: "Eco-Friendly" },
  sustainable: { icon: Leaf, label: "Sustainable" },
  "pet friendly": { icon: PawPrint, label: "Pet Friendly" },
  pets: { icon: PawPrint, label: "Pet Friendly" },
  luxury: { icon: Sparkles, label: "Luxury" },
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

  // Parse amenities
  const amenities = accommodation?.amenities || []
  const roomTypes = accommodation?.room_types || []

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

  // Group amenities into categories
  const specialFeatures = amenities.filter((a: string) => 
    ['family friendly', 'kid friendly', 'accessible', 'eco friendly', 'sustainable', 'pet friendly', 'pets', 'luxury'].includes(a.toLowerCase())
  )
  const regularAmenities = amenities.filter((a: string) => 
    !['family friendly', 'kid friendly', 'accessible', 'eco friendly', 'sustainable', 'pet friendly', 'pets', 'luxury'].includes(a.toLowerCase())
  )

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
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className="bg-white/20 text-white border-white/30">
                {accommodation.category}
              </Badge>
              {accommodation.star_rating && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: accommodation.star_rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {accommodation.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Special Features Banner */}
      {specialFeatures.length > 0 && (
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {specialFeatures.map((feature: string) => {
                const config = amenityIcons[feature.toLowerCase()]
                const IconComponent = config?.icon || CheckCircle2
                return (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <IconComponent className="h-5 w-5" style={{ color: tenant.primary_color }} />
                    <span className="font-medium">{config?.label || feature}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {galleryImages.length > 1 && (
                <ImageGallery images={galleryImages} alt={accommodation.name} />
              )}

              {/* Description */}
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
              {regularAmenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" style={{ color: tenant.primary_color }} />
                      Amenities & Facilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {regularAmenities.map((amenity: string) => {
                        const config = amenityIcons[amenity.toLowerCase()]
                        const IconComponent = config?.icon || CheckCircle2
                        return (
                          <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <IconComponent className="h-5 w-5" style={{ color: tenant.primary_color }} />
                            <span>{config?.label || amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Room Types */}
              {roomTypes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bed className="h-5 w-5" style={{ color: tenant.primary_color }} />
                      Room Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {roomTypes.map((room: any, index: number) => (
                        <div key={index} className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">
                            {typeof room === 'string' ? room : room.name}
                          </h4>
                          {typeof room === 'object' && room.description && (
                            <p className="text-sm text-muted-foreground">{room.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-medium capitalize">{accommodation.category}</p>
                      </div>
                    </div>

                    {accommodation.total_rooms && (
                      <div className="flex items-center gap-3">
                        <Bed className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Rooms</p>
                          <p className="font-medium">{accommodation.total_rooms} rooms</p>
                        </div>
                      </div>
                    )}

                    {accommodation.max_guests && (
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Maximum Guests</p>
                          <p className="font-medium">Up to {accommodation.max_guests} guests</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Price */}
                  <div>
                    <p className="text-sm text-muted-foreground">Price From</p>
                    <p className="font-bold text-3xl" style={{ color: tenant.primary_color }}>
                      {formatPrice(accommodation.price_from, accommodation.price_currency)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      per {accommodation.price_per || 'night'}
                    </p>
                  </div>

                  <Separator />

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link href={`/contact?accommodation=${accommodation.slug}`} className="block">
                      <Button 
                        className="w-full text-white"
                        size="lg"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Check Availability
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

                  {/* Contact */}
                  {(accommodation.contact_phone || accommodation.contact_email || accommodation.website_url) && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Direct Contact</p>
                        {accommodation.contact_phone && (
                          <a 
                            href={`tel:${accommodation.contact_phone}`}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {accommodation.contact_phone}
                          </a>
                        )}
                        {accommodation.contact_email && (
                          <a 
                            href={`mailto:${accommodation.contact_email}`}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            {accommodation.contact_email}
                          </a>
                        )}
                        {accommodation.website_url && (
                          <a 
                            href={accommodation.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            Visit Website
                          </a>
                        )}
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
