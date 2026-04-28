import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

// Reserved subdomains
const RESERVED_SUBDOMAINS = ["www", "api", "admin", "app", "dashboard", "mail", "email", "support", "help", "docs", "blog", "status"]

// Marketing hosts
const MARKETING_HOSTS = ["zuru.africa", "www.zuru.africa", "localhost", "127.0.0.1"]

function isMarketingHost(host: string): boolean {
  const hostWithoutPort = host.split(":")[0]
  
  // Check exact matches first
  if (MARKETING_HOSTS.includes(hostWithoutPort)) {
    return true
  }
  
  // Check for Vercel preview/deployment URLs (treat as marketing)
  // Handles: .vercel.app, .vercel.run (v0 sandbox), .vercel.dev
  if (
    hostWithoutPort.endsWith(".vercel.app") ||
    hostWithoutPort.endsWith(".vercel.run") ||
    hostWithoutPort.endsWith(".vercel.dev")
  ) {
    return true
  }
  
  return false
}

function getTenantSlug(host: string): string | null {
  const hostWithoutPort = host.split(":")[0]
  
  // Handle localhost development
  if (hostWithoutPort.includes("localhost") || hostWithoutPort === "127.0.0.1") {
    const parts = hostWithoutPort.split(".")
    if (parts.length >= 2 && parts[0] !== "localhost" && parts[0] !== "127") {
      const subdomain = parts[0]
      if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
        return subdomain
      }
    }
    return null
  }

  // Handle production subdomains
  const parts = hostWithoutPort.split(".")
  if (parts.length >= 3) {
    const subdomain = parts[0]
    if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
      return subdomain
    }
  }

  return null
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""
  const pathname = request.nextUrl.pathname

  console.log("[v0] Middleware - host:", host, "pathname:", pathname)

  // Skip rewriting for internal paths
  if (pathname.startsWith("/sites") || pathname.startsWith("/api") || pathname.startsWith("/admin")) {
    console.log("[v0] Middleware - internal path, updating session")
    const response = await updateSession(request)
    return response
  }

  // Determine tenant context
  const isMarketing = isMarketingHost(host)
  const tenantSlug = getTenantSlug(host)

  console.log("[v0] Middleware - isMarketing:", isMarketing, "tenantSlug:", tenantSlug)

  // Marketing site routing - let it pass through normally
  if (isMarketing) {
    console.log("[v0] Middleware - marketing site, updating session")
    const response = await updateSession(request)
    response.headers.set("x-tenant-slug", "")
    response.headers.set("x-is-marketing", "true")
    return response
  }

  // Tenant site routing - rewrite to /_sites/[domain] path
  if (tenantSlug) {
    // First update the session to handle auth cookies
    const sessionResponse = await updateSession(request)
    
    const url = request.nextUrl.clone()
    url.pathname = `/sites/${tenantSlug}${pathname}`
    
    const response = NextResponse.rewrite(url, {
      request,
    })
    
    // Copy cookies from session response
    sessionResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    
    response.headers.set("x-tenant-slug", tenantSlug)
    response.headers.set("x-is-marketing", "false")
    return response
  }

  // No tenant found for non-marketing host - redirect to marketing site
  const url = new URL(request.url)
  url.host = "zuru.africa"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
