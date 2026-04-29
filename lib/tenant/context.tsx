"use client"

import { createContext, useContext, type ReactNode } from "react"

export interface Tenant {
  id: string
  slug: string
  name: string
  logo_url: string | null
  logo_dark_url: string | null
  primary_color: string
  secondary_color: string
  custom_domain: string | null
  subscription_tier: "tembea" | "safari" | "indaba"
  subscription_status: "trialing" | "active" | "past_due" | "canceled" | "paused"
  trial_ends_at: string | null
  max_destinations: number
  max_listings: number
  max_users: number
  max_languages: number
  default_language: string
  timezone: string
  currency: string
  is_demo: boolean
  is_active: boolean
  contact_email?: string | null
  contact_phone?: string | null
}

interface TenantContextType {
  tenant: Tenant | null
  isLoading: boolean
  isMarketingSite: boolean
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
  isMarketingSite: false,
})

export function TenantProvider({
  children,
  tenant,
  isMarketingSite = false,
}: {
  children: ReactNode
  tenant: Tenant | null
  isMarketingSite?: boolean
}) {
  return (
    <TenantContext.Provider value={{ tenant, isLoading: false, isMarketingSite }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return context.tenant as Tenant
}

// Helper to get CSS variables for tenant theming
export function getTenantThemeStyles(tenant: Tenant | null) {
  if (!tenant) return {}
  
  return {
    "--tenant-primary": tenant.primary_color,
    "--tenant-secondary": tenant.secondary_color,
  } as React.CSSProperties
}
