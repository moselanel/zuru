"use client"

import { MapPin } from "lucide-react"
import { useTranslation } from "@/lib/translation-context"

export function ReservesHero() {
  const { t } = useTranslation()

  return (
    <section className="relative -mt-20 pt-20 h-80 md:h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/blyde-river-canyon-south-africa-dramatic-green-can.jpg"
          alt="Mpumalanga Nature Reserves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-2 text-white/80 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Mpumalanga, South Africa</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">{t("reserves.hero.title")}</h1>
        <p className="text-white/80 max-w-2xl mx-auto">{t("reserves.hero.subtitle")}</p>
      </div>
    </section>
  )
}
