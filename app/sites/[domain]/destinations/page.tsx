"use client"

import { useState, useMemo } from "react"
import { useTenant } from "@/lib/tenant/context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, LayoutGrid, Map } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import dynamic from "next/dynamic"

const DestinationsOverviewMap = dynamic(
  () => import("@/components/tenant/destinations-overview-map").then((m) => m.DestinationsOverviewMap),
  { ssr: false, loading: () => <div className="h-[500px] w-full rounded-xl bg-muted animate-pulse" /> }
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DestinationsPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "map">("grid")

  const { data: destinations, isLoading } = useSWR(`/api/tenant/${domain}/destinations`, fetcher)

  const filteredDestinations = useMemo(() => {
    if (!destinations) return []
    if (!searchQuery) return destinations
    const query = searchQuery.toLowerCase()
    return destinations.filter((d: any) =>
      d.name.toLowerCase().includes(query) ||
      d.short_description?.toLowerCase().includes(query)
    )
  }, [destinations, searchQuery])

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920)`, backgroundPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${tenant.primary_color}cc 0%, transparent 60%)` }} />
        <div className="relative z-10 container mx-auto px-4 pb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Destinations</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Explore the incredible places that make {tenant.name} unforgettable
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {!isLoading && destinations?.length > 0 && (
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Search */}
              <div>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing {filteredDestinations.length} of {destinations.length} destinations
                </p>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 border rounded-lg p-1 w-fit bg-muted/30">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                  style={view === "grid" ? { backgroundColor: tenant.primary_color, color: "white" } : {}}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={view === "map" ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                  style={view === "map" ? { backgroundColor: tenant.primary_color, color: "white" } : {}}
                  onClick={() => setView("map")}
                >
                  <Map className="h-4 w-4" />
                  Map
                </Button>
              </div>
            </div>
          )}

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
          ) : view === "map" ? (
            <DestinationsOverviewMap
              destinations={filteredDestinations}
              primaryColor={tenant.primary_color}
            />
          ) : filteredDestinations.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination: any) => (
                <Link key={destination.id} href={`/destinations/${destination.slug}`}>
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
          ) : destinations?.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No destinations match your search.</p>
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
