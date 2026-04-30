"use client"

import { useEffect, useRef } from "react"

interface Destination {
  id: string
  slug: string
  name: string
  short_description?: string
  hero_image_url?: string
  location?: { lat?: number; lng?: number; region?: string }
}

interface DestinationsOverviewMapProps {
  destinations: Destination[]
  primaryColor?: string
}

export function DestinationsOverviewMap({
  destinations,
  primaryColor = "#FF6B35",
}: DestinationsOverviewMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const router = useRouter()
  const params = useParams()

  const mappable = destinations.filter(
    (d) => d.location?.lat != null && d.location?.lng != null
  )

  useEffect(() => {
    if (!containerRef.current || mapRef.current || mappable.length === 0) return

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      const bounds: [number, number][] = []

      mappable.forEach((destination) => {
        const lat = destination.location!.lat!
        const lng = destination.location!.lng!

        bounds.push([lat, lng])

        const pinIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 32px; height: 32px;
              background: ${primaryColor};
              border: 3px solid white;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              cursor: pointer;
            "></div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -36],
        })

        const popupContent = `
          <div style="min-width: 180px; font-family: inherit;">
            ${destination.hero_image_url
              ? `<img src="${destination.hero_image_url}" alt="${destination.name}"
                  style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px 6px 0 0; display: block; margin: -10px -10px 8px -10px; width: calc(100% + 20px);" />`
              : ""
            }
            <strong style="font-size: 14px;">${destination.name}</strong>
            ${destination.short_description
              ? `<p style="font-size: 12px; color: #666; margin: 4px 0 8px;">${destination.short_description.slice(0, 80)}${destination.short_description.length > 80 ? "…" : ""}</p>`
              : ""
            }
            <a href="/destinations/${destination.slug}"
              style="display: inline-block; padding: 4px 10px; background: ${primaryColor}; color: white; border-radius: 4px; font-size: 12px; text-decoration: none; font-weight: 500;">
              View destination →
            </a>
          </div>
        `

        L.marker([lat, lng], { icon: pinIcon })
          .addTo(map)
          .bindPopup(popupContent, { maxWidth: 220 })
      })

      if (bounds.length === 1) {
        map.setView(bounds[0], 9)
      } else if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [48, 48] })
      }

      mapRef.current = map
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [mappable.length, primaryColor])

  if (mappable.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
        No coordinates available for these destinations.
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-[500px] w-full rounded-xl overflow-hidden border border-border shadow-sm"
    />
  )
}
