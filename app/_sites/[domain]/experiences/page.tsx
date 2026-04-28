"use client"

import { useTenant } from "@/lib/tenant/context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ExperiencesPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string

  const { data: experiences, isLoading } = useSWR(`/api/tenant/${domain}/experiences`, fetcher)

  return (
    <div className="bg-background">
      {/* Hero */}
      <section 
        className="py-20"
        style={{ background: `linear-gradient(to right, ${tenant.primary_color}, ${tenant.secondary_color || tenant.primary_color})` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experiences</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Unforgettable activities and adventures await
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
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
          ) : experiences?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experiences.map((experience: any) => (
                <Link key={experience.id} href={`/experiences/${experience.slug}`}>
                  <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={experience.hero_image_url || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"}
                        alt={experience.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge 
                        className="absolute top-3 left-3 text-white"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        {experience.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {experience.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {experience.short_description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {experience.duration}
                        </span>
                        <span className="font-semibold text-foreground">
                          From {experience.price_currency} {experience.price_from?.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No experiences available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
