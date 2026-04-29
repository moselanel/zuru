"use client"

import { useTenant } from "@/lib/tenant/context"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, DollarSign, Calendar, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ExperienceDetailPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const slug = params.slug as string

  const { data: experiences } = useSWR(`/api/tenant/${domain}/experiences`, fetcher)
  const experience = experiences?.find((e: any) => e.slug === slug)

  if (!experience) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Experience not found</h1>
          <Link href={`/experiences`}>
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experiences
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
            backgroundImage: `url(${experience.hero_image_url || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link href={`/experiences`}>
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Experiences
              </Button>
            </Link>
            <Badge className="mb-3 bg-white/20 text-white border-white/30">
              {experience.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {experience.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xl text-muted-foreground mb-8">
                {experience.short_description}
              </p>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {experience.description}
                </p>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{experience.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Price From</p>
                        <p className="font-medium text-lg">
                          {formatPrice(experience.price_from, experience.price_currency)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link href={`/contact`} className="block">
                      <Button 
                        className="w-full text-white"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book This Experience
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
