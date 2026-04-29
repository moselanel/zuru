"use client"

import { useTenant } from "@/lib/tenant/context"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, ArrowRight, Compass, Bed, Calendar } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function TenantHomePage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string

  const { data: destinations } = useSWR(`/api/tenant/${domain}/destinations`, fetcher)
  const { data: experiences } = useSWR(`/api/tenant/${domain}/experiences`, fetcher)
  const { data: accommodations } = useSWR(`/api/tenant/${domain}/accommodations`, fetcher)

  const featuredDestinations = destinations?.slice(0, 3) || []
  const featuredExperiences = experiences?.slice(0, 3) || []
  const featuredAccommodations = accommodations?.slice(0, 3) || []

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: featuredDestinations[0]?.hero_image_url
              ? `url(${featuredDestinations[0].hero_image_url})`
              : `url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${tenant.primary_color}44, ${tenant.primary_color}88)` }} />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Welcome to {tenant.name}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Discover Unforgettable Experiences
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            Explore breathtaking destinations, immersive experiences, and world-class accommodations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/destinations`}>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                <Compass className="mr-2 h-5 w-5" />
                Explore Destinations
              </Button>
            </Link>
            <Link href={`/contact`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {featuredDestinations.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Featured Destinations</h2>
                <p className="text-muted-foreground mt-2">Discover our most popular places to visit</p>
              </div>
              <Link href={`/destinations`}>
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredDestinations.map((destination: any) => (
                <Link key={destination.id} href={`/destinations/${destination.slug}`}>
                  <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.hero_image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {destination.is_featured && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {destination.short_description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Experiences */}
      {featuredExperiences.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Experiences</h2>
                <p className="text-muted-foreground mt-2">Unforgettable activities and adventures</p>
              </div>
              <Link href={`/experiences`}>
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredExperiences.map((experience: any) => (
                <Link key={experience.id} href={`/experiences/${experience.slug}`}>
                  <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={experience.hero_image_url || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"}
                        alt={experience.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3" style={{ backgroundColor: tenant.primary_color }}>
                        {experience.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {experience.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {experience.short_description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {experience.duration}
                        </span>
                        <span className="font-medium text-foreground">
                          From {formatPrice(experience.price_from, experience.price_currency)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Accommodations */}
      {featuredAccommodations.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Where to Stay</h2>
                <p className="text-muted-foreground mt-2">Hand-picked accommodations for every traveler</p>
              </div>
              <Link href={`/accommodations`}>
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredAccommodations.map((accommodation: any) => (
                <Link key={accommodation.id} href={`/accommodations/${accommodation.slug}`}>
                  <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={accommodation.hero_image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"}
                        alt={accommodation.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3 bg-background text-foreground">
                        {accommodation.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: accommodation.star_rating || 0 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {accommodation.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {accommodation.short_description}
                      </p>
                      <p className="mt-3 font-medium text-foreground">
                        From {formatPrice(accommodation.price_from, accommodation.price_currency)}/night
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: tenant.primary_color }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect trip. Get in touch with our travel experts today.
          </p>
          <Link href={`/contact`}>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
              <Calendar className="mr-2 h-5 w-5" />
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
