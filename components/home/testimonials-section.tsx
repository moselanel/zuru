"use client"

import { Star, Quote } from "lucide-react"
import { testimonials } from "@/lib/data"
import { useTranslation } from "@/lib/translation-context"

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-foreground/20" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary-foreground/70">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-primary-foreground/90 leading-relaxed">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-12 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/60 mb-6">Trusted by leading travel platforms</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <span className="font-serif text-xl font-bold">TripAdvisor</span>
            <span className="font-serif text-xl font-bold">Booking.com</span>
            <span className="font-serif text-xl font-bold">Expedia</span>
            <span className="font-serif text-xl font-bold">SafariBookings</span>
          </div>
        </div>
      </div>
    </section>
  )
}
