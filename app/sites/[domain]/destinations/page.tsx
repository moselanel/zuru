"use client"

import { useTenant } from "@/lib/tenant/context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DestinationsPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string

  const { data: destinations, isLoading } = useSWR(`/api/tenant/${domain}/destinations`, fetcher)

  const basePath = `/sites/${domain}`

  return (
    <div className="bg-background">
      {/* Hero */}
      <section 
        className="py-20"
        style={{ background: `linear-gradient(to right, ${tenant.primary_color}, ${tenant.secondary_color || tenant.primary_color})` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Destinations</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore the incredible places that make {tenant.name} unforgettable
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : destinations?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination: any) => (
                <Link key={destination.id} href={`${basePath}/destinations/${destination.slug}`}>
                  <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.hero_image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {destination.is_featured && (
                        <Badge 
                          className="absolute top-3 left-3 text-white"
                          style={{ backgroundColor: tenant.primary_color }}
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {destination.short_description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No destinations available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
