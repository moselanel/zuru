"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const brandingSchema = z.object({
  logo_url: z.string().url().optional().or(z.literal("")),
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color").optional().or(z.literal("")),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color").optional().or(z.literal("")),
  hero_image_url: z.string().url().optional().or(z.literal("")),
  meta_description: z.string().max(160).optional(),
})

type BrandingValues = z.infer<typeof brandingSchema>

interface BrandingSettingsFormProps {
  tenant: {
    id: string
    name: string
    logo_url: string | null
    primary_color: string | null
    secondary_color: string | null
    hero_image_url: string | null
    meta_description: string | null
  }
}

export function BrandingSettingsForm({ tenant }: BrandingSettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BrandingValues>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      logo_url: tenant.logo_url || "",
      primary_color: tenant.primary_color || "#F97316",
      secondary_color: tenant.secondary_color || "#1E1B4B",
      hero_image_url: tenant.hero_image_url || "",
      meta_description: tenant.meta_description || "",
    },
  })

  async function onSubmit(data: BrandingValues) {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("tenants")
        .update({
          logo_url: data.logo_url || null,
          primary_color: data.primary_color || null,
          secondary_color: data.secondary_color || null,
          hero_image_url: data.hero_image_url || null,
          meta_description: data.meta_description || null,
        })
        .eq("id", tenant.id)

      if (error) throw error

      toast.success("Branding updated successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to update branding")
    } finally {
      setIsLoading(false)
    }
  }

  const primaryColor = form.watch("primary_color")
  const secondaryColor = form.watch("secondary_color")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
            <CardDescription>Your organization logo for the portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Recommended: Square image at least 200x200px (PNG or SVG).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("logo_url") && (
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-white p-2">
                  <img
                    src={form.watch("logo_url") || ""}
                    alt="Logo preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Logo preview</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Brand colors for your portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="primary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="#F97316" {...field} />
                      </FormControl>
                      <div
                        className="h-10 w-10 shrink-0 rounded-lg border"
                        style={{ backgroundColor: primaryColor || "#F97316" }}
                      />
                    </div>
                    <FormDescription>Used for buttons and accents.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="#1E1B4B" {...field} />
                      </FormControl>
                      <div
                        className="h-10 w-10 shrink-0 rounded-lg border"
                        style={{ backgroundColor: secondaryColor || "#1E1B4B" }}
                      />
                    </div>
                    <FormDescription>Used for text and headers.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homepage Hero</CardTitle>
            <CardDescription>The main banner image on your portal homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="hero_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Recommended: Landscape image at least 1920x1080px.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("hero_image_url") ? (
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <img
                  src={form.watch("hero_image_url") || ""}
                  alt="Hero preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed bg-muted/50">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No hero image set</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
            <CardDescription>Search engine optimization settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Discover amazing destinations and experiences..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length || 0)}/160 characters. Appears in search results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-zuru-sunset hover:bg-zuru-sunset-dark"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
