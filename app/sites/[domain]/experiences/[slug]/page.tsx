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
  Clock,
  Calendar,
  Share2,
  Gauge,
  Users,
  CheckCircle2,
  XCircle,
  Backpack,
  AlertTriangle,
  Sparkles,
  Heart
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { ImageGallery } from "@/components/tenant/image-gallery"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Difficulty color mapping
const difficultyConfig: Record<string, { color: string; label: string; description: string }> = {
  easy: { color: "bg-green-100 text-green-800", label: "Easy", description: "Suitable for all fitness levels" },
  moderate: { color: "bg-yellow-100 text-yellow-800", label: "Moderate", description: "Some physical activity required" },
  challenging: { color: "bg-orange-100 text-orange-800", label: "Challenging", description: "Good fitness level recommended" },
  extreme: { color: "bg-red-100 text-red-800", label: "Extreme", description: "High fitness level required" },
}

export default function ExperienceDetailPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const slug = params.slug as string

  const { data: experiences } = useSWR(`/api/tenant/${domain}/experiences`, fetcher)
  const experience = experiences?.find((e: any) => e.slug === slug)

  // Build gallery images array
  const galleryImages = useMemo(() => {
    if (!experience) return []
    const images: string[] = []
    if (experience.hero_image_url) images.push(experience.hero_image_url)
    if (experience.gallery && Array.isArray(experience.gallery)) {
      images.push(...experience.gallery)
    }
    return images
  }, [experience])

  // Parse JSON arrays safely
  const highlights = experience?.highlights || []
  const included = experience?.included || []
  const excluded = experience?.excluded || []
  const requirements = experience?.requirements || []
  const whatToBring = experience?.what_to_bring || []

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

  const difficultyInfo = experience.difficulty ? difficultyConfig[experience.difficulty] : null

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${experience.hero_image_url || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920"})`,
            backgroundPosition: 'center 30%',
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
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-white/20 text-white border-white/30">
                {experience.category}
              </Badge>
              {difficultyInfo && (
                <Badge className={difficultyInfo.color}>
                  {difficultyInfo.label}
                </Badge>
              )}
            </div>
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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {galleryImages.length > 1 && (
                <ImageGallery images={galleryImages} alt={experience.name} />
              )}

              {/* Description */}
              <div>
                <p className="text-xl text-muted-foreground mb-6">
                  {experience.short_description}
                </p>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {experience.description}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" style={{ color: tenant.primary_color }} />
                      Experience Highlights
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

              {/* What's Included / Excluded */}
              {(included.length > 0 || excluded.length > 0) && (
                <div className="grid gap-6 md:grid-cols-2">
                  {included.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="h-5 w-5" />
                          What&apos;s Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {included.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {excluded.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-700">
                          <XCircle className="h-5 w-5" />
                          Not Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {excluded.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <XCircle className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Requirements & What to Bring */}
              {(requirements.length > 0 || whatToBring.length > 0) && (
                <div className="grid gap-6 md:grid-cols-2">
                  {requirements.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-700">
                          <AlertTriangle className="h-5 w-5" />
                          Requirements &amp; Restrictions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {requirements.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <AlertTriangle className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {whatToBring.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Backpack className="h-5 w-5" style={{ color: tenant.primary_color }} />
                          What to Bring
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {whatToBring.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: tenant.primary_color }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{experience.duration}</p>
                      </div>
                    </div>

                    {(experience.group_size_min || experience.group_size_max) && (
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Group Size</p>
                          <p className="font-medium">
                            {experience.group_size_min && experience.group_size_max
                              ? `${experience.group_size_min}–${experience.group_size_max} people`
                              : experience.group_size_max
                              ? `Up to ${experience.group_size_max} people`
                              : `From ${experience.group_size_min} people`}
                          </p>
                        </div>
                      </div>
                    )}

                    {difficultyInfo && (
                      <div className="flex items-center gap-3">
                        <Gauge className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Difficulty</p>
                          <p className="font-medium">{difficultyInfo.label}</p>
                          <p className="text-xs text-muted-foreground">{difficultyInfo.description}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Price */}
                  <div>
                    <p className="text-sm text-muted-foreground">Price From</p>
                    <p className="font-bold text-3xl" style={{ color: tenant.primary_color }}>
                      {formatPrice(experience.price_from, experience.price_currency)}
                    </p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <Separator />

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link href={`/contact?experience=${experience.slug}`} className="block">
                      <Button 
                        className="w-full text-white"
                        size="lg"
                        style={{ backgroundColor: tenant.primary_color }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book This Experience
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
