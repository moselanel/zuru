"use client"

import { useEffect, useRef } from "react"

interface DestinationPinMapProps {
  lat: number
  lng: number
  name: string
  primaryColor?: string
  className?: string
}

export function DestinationPinMap({
  lat,
  lng,
  name,
  primaryColor = "#FF6B35",
  className = "h-48 w-full rounded-lg overflow-hidden",
}: DestinationPinMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([lat, lng], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Custom colored pin using divIcon
      const pinIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 28px; height: 28px;
            background: ${primaryColor};
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -32],
      })

      L.marker([lat, lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(`<strong>${name}</strong>`, { closeButton: false })
        .openPopup()

      mapRef.current = map
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [lat, lng, name, primaryColor])

  return <div ref={containerRef} className={className} />
}
