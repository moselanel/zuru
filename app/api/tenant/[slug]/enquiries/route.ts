import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Get tenant by slug
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (tenantError || !tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
  }

  try {
    const body = await request.json()
    const { name, email, phone, message, source_page, travel_dates, guests } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const { data: enquiry, error } = await supabase
      .from("enquiries")
      .insert({
        tenant_id: tenant.id,
        name,
        email,
        phone,
        message,
        source_page,
        travel_dates: travel_dates ? { preferred: travel_dates } : null,
        guests: guests ? parseInt(guests, 10) : null,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("Failed to create enquiry:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: enquiry.id })
  } catch (error) {
    console.error("Failed to parse request:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
