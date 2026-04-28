import { createClient } from "@/lib/supabase/server"
import type { Tenant } from "./context"

// Reserved subdomains that should not be used for tenants
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "app",
  "dashboard",
  "mail",
  "email",
  "support",
  "help",
  "docs",
  "blog",
  "status",
]

// Main marketing domains (no subdomain = marketing site)
const MARKETING_HOSTS = [
  "zuru.africa",
  "www.zuru.africa",
  "localhost:3000",
  "127.0.0.1:3000",
]

export function isMarketingHost(host: string): boolean {
  // Remove port for comparison
  const hostWithoutPort = host.split(":")[0]
  return MARKETING_HOSTS.some(
    (h) => h === host || h === hostWithoutPort || h.split(":")[0] === hostWithoutPort
  )
}

export function getTenantSlugFromHost(host: string): string | null {
  // Check if this is a marketing site host
  if (isMarketingHost(host)) {
    return null
  }

  // Remove port if present
  const hostWithoutPort = host.split(":")[0]

  // Check for custom domain first
  // This would be handled separately via database lookup

  // Check for subdomain pattern: {tenant}.zuru.africa
  const parts = hostWithoutPort.split(".")
  
  // Handle localhost development: {tenant}.localhost
  if (hostWithoutPort.includes("localhost")) {
    const localParts = hostWithoutPort.split(".")
    if (localParts.length >= 2 && localParts[0] !== "localhost") {
      const subdomain = localParts[0]
      if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
        return subdomain
      }
    }
    return null
  }

  // Handle production: {tenant}.zuru.africa
  if (parts.length >= 3) {
    const subdomain = parts[0]
    if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
      return subdomain
    }
  }

  return null
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return null
  }

  return data as Tenant
}

export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("custom_domain", domain)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return null
  }

  return data as Tenant
}

export async function resolveTenant(host: string): Promise<{
  tenant: Tenant | null
  isMarketingSite: boolean
}> {
  // Check if marketing site
  if (isMarketingHost(host)) {
    return { tenant: null, isMarketingSite: true }
  }

  // Try to get tenant from subdomain
  const slug = getTenantSlugFromHost(host)
  if (slug) {
    const tenant = await getTenantBySlug(slug)
    return { tenant, isMarketingSite: false }
  }

  // Try custom domain lookup
  const hostWithoutPort = host.split(":")[0]
  const tenant = await getTenantByDomain(hostWithoutPort)
  
  return { tenant, isMarketingSite: false }
}

export function generateTenantSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50)
}

export function isValidTenantSlug(slug: string): boolean {
  if (RESERVED_SUBDOMAINS.includes(slug)) {
    return false
  }
  
  // Must be alphanumeric with hyphens, 3-50 chars
  const slugRegex = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/
  return slugRegex.test(slug)
}
