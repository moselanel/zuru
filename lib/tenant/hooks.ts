"use client"

import useSWR from "swr"
import { useTenant } from "./context"

interface Destination {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  hero_image_url: string | null
  is_featured: boolean
  is_published: boolean
}

interface Experience {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  hero_image_url: string | null
  category: string | null
  duration: string | null
  price_from: number | null
  price_currency: string
  is_featured: boolean
  is_published: boolean
}

interface Accommodation {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  hero_image_url: string | null
  category: string | null
  star_rating: number | null
  price_from: number | null
  price_currency: string
  is_featured: boolean
  is_published: boolean
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useTenantData() {
  const { tenant } = useTenant()

  const { data: destinations, error: destError, isLoading: destLoading } = useSWR<Destination[]>(
    tenant ? `/api/tenant/${tenant.slug}/destinations` : null,
    fetcher
  )

  const { data: experiences, error: expError, isLoading: expLoading } = useSWR<Experience[]>(
    tenant ? `/api/tenant/${tenant.slug}/experiences` : null,
    fetcher
  )

  const { data: accommodations, error: accError, isLoading: accLoading } = useSWR<Accommodation[]>(
    tenant ? `/api/tenant/${tenant.slug}/accommodations` : null,
    fetcher
  )

  return {
    destinations,
    experiences,
    accommodations,
    isLoading: destLoading || expLoading || accLoading,
    error: destError || expError || accError,
  }
}

export function useDestinations() {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Destination[]>(
    tenant ? `/api/tenant/${tenant.slug}/destinations` : null,
    fetcher
  )

  return { destinations: data, error, isLoading }
}

export function useDestination(slug: string) {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Destination>(
    tenant && slug ? `/api/tenant/${tenant.slug}/destinations/${slug}` : null,
    fetcher
  )

  return { destination: data, error, isLoading }
}

export function useExperiences() {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Experience[]>(
    tenant ? `/api/tenant/${tenant.slug}/experiences` : null,
    fetcher
  )

  return { experiences: data, error, isLoading }
}

export function useExperience(slug: string) {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Experience>(
    tenant && slug ? `/api/tenant/${tenant.slug}/experiences/${slug}` : null,
    fetcher
  )

  return { experience: data, error, isLoading }
}

export function useAccommodations() {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Accommodation[]>(
    tenant ? `/api/tenant/${tenant.slug}/accommodations` : null,
    fetcher
  )

  return { accommodations: data, error, isLoading }
}

export function useAccommodation(slug: string) {
  const { tenant } = useTenant()

  const { data, error, isLoading } = useSWR<Accommodation>(
    tenant && slug ? `/api/tenant/${tenant.slug}/accommodations/${slug}` : null,
    fetcher
  )

  return { accommodation: data, error, isLoading }
}
