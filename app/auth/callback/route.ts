import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  console.log("[v0] Auth callback hit - origin:", origin, "code:", !!code)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log("[v0] Exchange code result - user:", data?.user?.id, "session:", !!data?.session, "error:", error?.message)
    
    if (!error && data.user) {
      // Check if user has a tenant
      const { data: tenantUser, error: tenantError } = await supabase
        .from("tenant_users")
        .select("tenant_id")
        .eq("user_id", data.user.id)
        .single()

      console.log("[v0] Tenant lookup - tenantUser:", tenantUser, "error:", tenantError?.message)

      if (tenantUser) {
        console.log("[v0] Redirecting to /admin")
        return NextResponse.redirect(`${origin}/admin`)
      }
      
      console.log("[v0] No tenant, redirecting to:", next)
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    console.log("[v0] Auth exchange failed, redirecting to error")
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}
