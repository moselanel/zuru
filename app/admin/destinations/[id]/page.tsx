import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DestinationForm } from "@/components/admin/destination-form"
import { DeleteDestinationButton } from "./delete-button"

export const metadata = {
  title: "Edit Destination | Zuru Admin",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditDestinationPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant:tenants(id, name)")
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  const tenant = tenantUser.tenant as { id: string; name: string }

  // Get the destination
  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id)
    .eq("tenant_id", tenant.id)
    .single()

  if (!destination) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/destinations">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Edit Destination</h1>
            <p className="text-muted-foreground">{destination.name}</p>
          </div>
        </div>
        <DeleteDestinationButton destinationId={destination.id} destinationName={destination.name} />
      </div>

      <DestinationForm tenantId={tenant.id} destination={destination} />
    </div>
  )
}
