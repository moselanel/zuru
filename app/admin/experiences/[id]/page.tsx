import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExperienceForm } from "@/components/admin/experience-form"
import { DeleteExperienceButton } from "./delete-button"

export const metadata = {
  title: "Edit Experience | Zuru Admin",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params
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

  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .eq("tenant_id", tenant.id)
    .single()

  if (!experience) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/experiences">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Edit Experience</h1>
            <p className="text-muted-foreground">{experience.name}</p>
          </div>
        </div>
        <DeleteExperienceButton experienceId={experience.id} experienceName={experience.name} />
      </div>

      <ExperienceForm tenantId={tenant.id} experience={experience} />
    </div>
  )
}
