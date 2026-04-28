"use client"

import Link from "next/link"
import { Clock, Zap, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { experiences } from "@/lib/data"
import { useTranslation } from "@/lib/translation-context"

export function ExperiencesSection() {
  const { t } = useTranslation()
  const featuredExperiences = experiences.filter((e) => e.featured).slice(0, 4)

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-3">
              {t("nav.thingsToDo")}
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{t("experiences.title")}</h2>
            <p className="text-muted-foreground max-w-xl">{t("experiences.subtitle")}</p>
          </div>
          <Link href="/experiences">
            <Button variant="outline" className="gap-2 bg-transparent">
              {t("experiences.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperiences.map((experience) => (
            <Link
              key={experience.id}
              href={`/experiences/${experience.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                  {experience.category}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {experience.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{experience.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    {experience.intensity}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{experience.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({experience.reviewCount} {t("common.reviews")})
                    </span>
                  </div>
                  <span className="font-semibold text-primary">R{experience.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
