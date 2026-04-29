"use client"

import { useParams } from "next/navigation"
import { TenantProvider } from "@/lib/tenant/context"
import useSWR from "swr"
import DestinationsPage from "@/app/sites/[domain]/destinations/page"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function PreviewDestinationsPage() {
  const params = useParams()
  const tenant = params.tenant as string

  const { data: tenantData, isLoading, error } = useSWR(`/api/tenant/${tenant}`, fetcher)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading destinations...</p>
        </div>
      </div>
    )
  }

  if (error || !tenantData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Tenant Not Found</h1>
          <p className="text-muted-foreground">Could not load tenant: {tenant}</p>
        </div>
      </div>
    )
  }

  return (
    <TenantProvider tenant={tenantData}>
      <DestinationsPage />
    </TenantProvider>
  )
}
