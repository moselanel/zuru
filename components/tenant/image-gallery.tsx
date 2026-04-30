"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxIndex, goPrev, goNext])

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <>
        <div
          className={cn("relative overflow-hidden rounded-xl cursor-pointer group", className)}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} onNavigate={setLightboxIndex} alt={alt} />
      </>
    )
  }

  const extraCount = images.length - 5

  return (
    <>
      {/* Mosaic Grid */}
      <div className={cn("rounded-xl overflow-hidden", className)}>
        {/* 2 images: side by side */}
        {images.length === 2 && (
          <div className="grid grid-cols-2 grid-rows-1 gap-1 h-72">
            {images.map((img, i) => (
              <MosaicCell key={i} src={img} alt={`${alt} ${i + 1}`} onClick={() => openLightbox(i)} />
            ))}
          </div>
        )}

        {/* 3–4 images: large left + stacked right */}
        {images.length >= 3 && images.length <= 4 && (
          <div className="grid grid-cols-3 grid-rows-2 gap-1 h-80">
            <MosaicCell src={images[0]} alt={`${alt} 1`} onClick={() => openLightbox(0)} className="col-span-2 row-span-2" />
            <div className="row-span-2 grid grid-rows-2 gap-1">
              {images.slice(1, 3).map((img, i) => (
                <MosaicCell key={i} src={img} alt={`${alt} ${i + 2}`} onClick={() => openLightbox(i + 1)} />
              ))}
            </div>
          </div>
        )}

        {/* 5+ images: large left + 2x2 grid right */}
        {images.length >= 5 && (
          <div className="grid grid-cols-3 grid-rows-2 gap-1 h-80">
            <MosaicCell src={images[0]} alt={`${alt} 1`} onClick={() => openLightbox(0)} className="col-span-2 row-span-2" />
            <div className="row-span-2 grid grid-rows-2 gap-1">
              <div className="grid grid-cols-2 gap-1">
                {images.slice(1, 3).map((img, i) => (
                  <MosaicCell key={i} src={img} alt={`${alt} ${i + 2}`} onClick={() => openLightbox(i + 1)} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <MosaicCell src={images[3]} alt={`${alt} 4`} onClick={() => openLightbox(3)} />
                <div
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(4)}
                >
                  <img src={images[4]} alt={`${alt} 5`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {extraCount > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                      <span className="text-2xl font-bold">+{extraCount + 1}</span>
                      <span className="text-xs mt-1">more photos</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* "View all photos" button */}
        <button
          onClick={() => openLightbox(0)}
          className="flex items-center gap-2 mt-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Images className="h-4 w-4" />
          View all {images.length} photos
        </button>
      </div>

      <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} onNavigate={setLightboxIndex} alt={alt} />
    </>
  )
}

function MosaicCell({
  src, alt, onClick, className,
}: { src: string; alt: string; onClick: () => void; className?: string }) {
  return (
    <div
      className={cn("relative overflow-hidden cursor-pointer group h-full", className)}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
    </div>
  )
}

function Lightbox({
  images, index, onClose, onPrev, onNext, onNavigate, alt,
}: {
  images: string[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onNavigate: (i: number) => void
  alt: string
}) {
  if (index === null) return null

  return (
    <Dialog open={index !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 bg-black border-none gap-0" showCloseButton={false}>
        <div className="relative flex items-center justify-center min-h-[70vh]">
          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-20 text-white hover:bg-white/20 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Counter */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
            {index + 1} / {images.length}
          </div>

          {/* Main image */}
          <img
            src={images[index]}
            alt={`${alt} — photo ${index + 1}`}
            className="max-h-[80vh] max-w-full object-contain select-none"
            draggable={false}
          />

          {/* Prev */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full h-11 w-11"
            onClick={onPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Next */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full h-11 w-11"
            onClick={onNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto p-3 bg-black/80">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={cn(
                  "relative h-14 w-20 flex-shrink-0 rounded overflow-hidden transition-all",
                  i === index ? "ring-2 ring-white" : "opacity-50 hover:opacity-80"
                )}
              >
                <img src={img} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
