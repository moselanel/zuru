import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccommodationForm } from "@/components/admin/accommodation-form"
import { DeleteAccommodationButton } from "./delete-button"

export const metadata = {
  title: "Edit Accommodation | Zuru Admin",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditAccommodationPage({ params }: PageProps) {
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

  const { data: accommodation } = await supabase
    .from("accommodations")
    .select("*")
    .eq("id", id)
    .eq("tenant_id", tenant.id)
    .single()

  if (!accommodation) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/accommodations">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Edit Accommodation</h1>
            <p className="text-muted-foreground">{accommodation.name}</p>
          </div>
        </div>
        <DeleteAccommodationButton accommodationId={accommodation.id} accommodationName={accommodation.name} />
      </div>

      <AccommodationForm tenantId={tenant.id} accommodation={accommodation} />
    </div>
  )
}
