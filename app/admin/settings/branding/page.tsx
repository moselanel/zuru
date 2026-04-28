import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandingSettingsForm } from "./form"

export const metadata = {
  title: "Branding Settings | Zuru Admin",
}

export default async function BrandingSettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select(`
      role,
      tenant:tenants(*)
    `)
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  
  const tenant = tenantUser.tenant as {
    id: string
    name: string
    logo_url: string | null
    primary_color: string | null
    secondary_color: string | null
    hero_image_url: string | null
    meta_description: string | null
  }

  const isOwnerOrAdmin = tenantUser.role === "owner" || tenantUser.role === "admin"
  if (!isOwnerOrAdmin) redirect("/admin/settings")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/settings">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Branding</h1>
          <p className="text-muted-foreground">Customize the look and feel of your portal.</p>
        </div>
      </div>

      <BrandingSettingsForm tenant={tenant} />
    </div>
  )
}
