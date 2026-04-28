"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { regions } from "@/lib/data"
import { useTranslation } from "@/lib/translation-context"

const regionImages = ["/panorama-route.jpg", "/lowveld-region.jpg", "/highveld-region.jpg", "/barberton-valley.jpg"]

export function RegionsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("regions.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("regions.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <Link
              key={region.id}
              href={`/explore?region=${region.id}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src={regionImages[index] || "/placeholder.svg"}
                alt={region.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-bold text-white mb-1">{region.name}</h3>
                <p className="text-white/70 text-sm mb-3">
                  {region.reserves} {t("regions.attractions")}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                  {t("regions.explore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
