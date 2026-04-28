"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Star,
  Clock,
  Zap,
  Users,
  Calendar,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { experiences } from "@/lib/data"

type Experience = (typeof experiences)[0]

export function ExperienceDetail({ experience }: { experience: Experience }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [participants, setParticipants] = useState(2)
  const [selectedDate, setSelectedDate] = useState("")

  const allImages = [experience.image, ...experience.gallery]

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % allImages.length)
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + allImages.length) % allImages.length)

  const totalPrice = experience.price * participants

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/experiences" className="text-muted-foreground hover:text-foreground">
              Experiences
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{experience.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[450px]">
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={allImages[0] || "/placeholder.svg"}
                alt={experience.name}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {allImages.slice(1, 5).map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => {
                    setCurrentImageIndex(index + 1)
                    setShowGallery(true)
                  }}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${experience.name} ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setShowGallery(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <img
            src={allImages[currentImageIndex] || "/placeholder.svg"}
            alt={`${experience.name} ${currentImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <Badge variant="outline" className="mb-3">
                      {experience.category}
                    </Badge>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{experience.name}</h1>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{experience.rating}</span>
                    <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    {experience.intensity}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Max {experience.maxParticipants} people
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">About This Experience</h2>
                <p className="text-muted-foreground leading-relaxed">{experience.longDescription}</p>
              </div>

              {/* What's Included */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    {"What's Included"}
                  </h3>
                  <ul className="space-y-2">
                    {experience.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive" />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {experience.excludes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <X className="h-4 w-4 text-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Important Information
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {experience.minAge > 0 && <li>• Minimum age: {experience.minAge} years</li>}
                  <li>• Please arrive 15 minutes before start time</li>
                  <li>• Wear comfortable clothing and closed shoes</li>
                  <li>• Bring sunscreen, hat, and camera</li>
                  <li>• Free cancellation up to 24 hours before</li>
                </ul>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold">Guest Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 fill-accent text-accent" />
                    <span className="text-2xl font-bold">{experience.rating}</span>
                    <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-muted" />
                        <div>
                          <p className="font-medium">Happy Traveler</p>
                          <p className="text-sm text-muted-foreground">November 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Absolutely incredible experience! Our guide was knowledgeable and made the whole trip
                        unforgettable. Highly recommend to anyone visiting Mpumalanga.
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Load More Reviews
                </Button>
              </div>
            </div>

            {/* Right Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <p className="text-3xl font-bold text-primary">R{experience.price.toLocaleString()}</p>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Number of Participants</label>
                    <div className="flex items-center justify-between border rounded-lg p-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                        disabled={participants <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold">{participants}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setParticipants(Math.min(experience.maxParticipants, participants + 1))}
                        disabled={participants >= experience.maxParticipants}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Max {experience.maxParticipants} participants</p>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      R{experience.price.toLocaleString()} x {participants} {participants === 1 ? "person" : "people"}
                    </span>
                    <span>R{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>R{Math.round(totalPrice * 0.05).toLocaleString()}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>R{(totalPrice + Math.round(totalPrice * 0.05)).toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mb-3" size="lg">
                  Book Now
                </Button>

                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Add to Trip
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Free cancellation up to 24 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
