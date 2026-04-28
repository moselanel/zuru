import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExperienceForm } from "@/components/admin/experience-form"

export const metadata = {
  title: "New Experience | Zuru Admin",
}

export default async function NewExperiencePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant:tenants(id)")
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  const tenant = tenantUser.tenant as { id: string }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/experiences">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">New Experience</h1>
          <p className="text-muted-foreground">Add a new tour or activity.</p>
        </div>
      </div>

      <ExperienceForm tenantId={tenant.id} />
    </div>
  )
}
