"use client"

import { useTranslation } from "@/lib/translation-context"

export function ExperiencesHero() {
  const { t } = useTranslation()

  return (
    <section className="relative h-80 md:h-96 -mt-20 pt-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/experiences-hero.jpg" alt="Safari experience" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">{t("experiences.hero.title")}</h1>
        <p className="text-white/80 max-w-2xl mx-auto">{t("experiences.hero.subtitle")}</p>
      </div>
    </section>
  )
}
