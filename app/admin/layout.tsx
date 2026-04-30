import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata = {
  title: "Admin Dashboard | Zuru",
  description: "Zuru Administration Portal",
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  if (!user.email_confirmed_at) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email ?? "")}`)
  }

  // Get user's tenant
  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select(`
      role,
      tenant:tenants(
        id,
        name,
        slug,
        logo_url,
        subscription_tier,
        subscription_status
      )
    `)
    .eq("user_id", user.id)
    .single()

  // If no tenant, redirect to signup
  if (!tenantUser?.tenant) {
    redirect("/signup")
  }

  const tenant = tenantUser.tenant as {
    id: string
    name: string
    slug: string
    logo_url: string | null
    subscription_tier: string
    subscription_status: string
  }
  const userRole = tenantUser.role

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar tenant={tenant} userRole={userRole} />
      <div className="lg:pl-64">
        <AdminHeader tenant={tenant} user={user} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
