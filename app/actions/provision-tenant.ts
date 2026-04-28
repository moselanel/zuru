"use server"

import { createClient, createServiceClient } from "@/lib/supabase/server"
import { generateTenantSlug, isValidTenantSlug } from "@/lib/tenant/utils"

interface ProvisionTenantInput {
  email: string
  password: string
  firstName: string
  lastName: string
  organizationName: string
  plan?: "tembea" | "safari" | "indaba"
}

interface ProvisionTenantResult {
  success: boolean
  tenantSlug?: string
  error?: string
}

export async function provisionTenant(
  input: ProvisionTenantInput
): Promise<ProvisionTenantResult> {
  console.log("[v0] provisionTenant called for:", input.email, input.organizationName)
  
  const supabase = await createClient()
  const serviceClient = createServiceClient() // Bypasses RLS for admin operations

  const { email, password, firstName, lastName, organizationName, plan = "tembea" } = input

  // Generate and validate slug
  let slug = generateTenantSlug(organizationName)
  
  if (!isValidTenantSlug(slug)) {
    slug = generateTenantSlug(organizationName + "-" + Date.now().toString(36))
  }

  // Check if slug already exists
  const { data: existingTenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existingTenant) {
    slug = `${slug}-${Date.now().toString(36)}`
  }

  // Get plan limits
  const { data: planData } = await supabase
    .from("plans")
    .select("*")
    .eq("id", plan)
    .single()

  // Create user account
  console.log("[v0] Creating user account...")
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://zuru.africa"}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  console.log("[v0] Auth signup result - user:", authData?.user?.id, "error:", authError?.message)

  if (authError || !authData.user) {
    console.log("[v0] Auth signup failed:", authError?.message)
    return {
      success: false,
      error: authError?.message || "Failed to create user account",
    }
  }

  // Create tenant using service role client (bypasses RLS)
  console.log("[v0] Creating tenant with slug:", slug)
  const { data: tenant, error: tenantError } = await serviceClient
    .from("tenants")
    .insert({
      slug,
      name: organizationName,
      subscription_tier: plan,
      subscription_status: "trialing",
      max_destinations: planData?.max_destinations || 1,
      max_listings: planData?.max_listings || 50,
      max_users: planData?.max_users || 2,
      max_languages: planData?.max_languages || 3,
      created_by: authData.user.id,
    })
    .select()
    .single()

  console.log("[v0] Tenant creation result - tenant:", tenant?.id, "error:", tenantError?.message)

  if (tenantError || !tenant) {
    console.log("[v0] Tenant creation failed:", tenantError?.message)
    return {
      success: false,
      error: tenantError?.message || "Failed to create organization",
    }
  }

  // Link user to tenant as owner (using service client to bypass RLS)
  console.log("[v0] Linking user to tenant...")
  const { error: linkError } = await serviceClient
    .from("tenant_users")
    .insert({
      tenant_id: tenant.id,
      user_id: authData.user.id,
      role: "owner",
      can_manage_content: true,
      can_manage_leads: true,
      can_manage_team: true,
      can_manage_billing: true,
      can_manage_settings: true,
      created_by: authData.user.id,
    })

  if (linkError) {
    console.log("[v0] Link user failed:", linkError.message)
    return {
      success: false,
      error: linkError.message || "Failed to link user to organization",
    }
  }

  console.log("[v0] Provisioning complete - slug:", slug)
  return {
    success: true,
    tenantSlug: slug,
  }
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  if (!isValidTenantSlug(slug)) {
    return false
  }

  const supabase = await createClient()
  
  const { data } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .single()

  return !data
}
