"use client"

import { TenantProvider, type Tenant } from "@/lib/tenant/context"
import { TenantHeader } from "@/components/tenant/tenant-header"
import { TenantFooter } from "@/components/tenant/tenant-footer"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TenantSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const domain = params.domain as string
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTenant() {
      try {
        const res = await fetch(`/api/tenant/${domain}`)
        if (res.ok) {
          const data = await res.json()
          setTenant(data)
        }
      } catch (error) {
        console.error("Failed to fetch tenant:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTenant()
  }, [domain])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-foreground">Site Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The requested destination site could not be found.
        </p>
      </div>
    )
  }

  return (
    <TenantProvider tenant={tenant}>
      <div className="flex min-h-screen flex-col">
        <TenantHeader />
        <main className="flex-1">{children}</main>
        <TenantFooter />
      </div>
    </TenantProvider>
  )
}
