"use client"

import { useTenant } from "@/lib/tenant/context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DestinationDetailPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const slug = params.slug as string

  const { data: destinations } = useSWR(`/api/tenant/${domain}/destinations`, fetcher)
  const destination = destinations?.find((d: any) => d.slug === slug)

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
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${destination.hero_image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920"})`,
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            {destination.is_featured && (
              <Badge className="bg-white/20 text-white border-white/30">
                Featured Destination
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xl text-muted-foreground mb-8">
              {destination.short_description}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {destination.description}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={`/contact`}>
                <Button 
                  size="lg"
                  style={{ backgroundColor: tenant.primary_color }}
                  className="text-white hover:opacity-90"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Plan Your Visit
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
