"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const accommodationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  short_description: z.string().max(200, "Short description must be under 200 characters").optional(),
  description: z.string().optional(),
  hero_image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  property_type: z.string().min(1, "Property type is required"),
  star_rating: z.coerce.number().min(1).max(5).optional().nullable(),
  price_from: z.coerce.number().min(0).optional().nullable(),
  price_currency: z.string().default("USD"),
  address: z.string().optional(),
  latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
  longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
})

type AccommodationFormValues = z.infer<typeof accommodationSchema>

const propertyTypes = [
  "Hotel",
  "Lodge",
  "Resort",
  "Safari Camp",
  "Boutique Hotel",
  "Guest House",
  "Bed & Breakfast",
  "Villa",
  "Apartment",
  "Eco Lodge",
  "Tented Camp",
]

interface AccommodationFormProps {
  tenantId: string
  accommodation?: {
    id: string
    name: string
    slug: string
    short_description: string | null
    description: string | null
    hero_image_url: string | null
    property_type: string | null
    star_rating: number | null
    price_from: number | null
    price_currency: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    is_published: boolean
    is_featured: boolean
  }
}

export function AccommodationForm({ tenantId, accommodation }: AccommodationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!accommodation

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: accommodation?.name || "",
      slug: accommodation?.slug || "",
      short_description: accommodation?.short_description || "",
      description: accommodation?.description || "",
      hero_image_url: accommodation?.hero_image_url || "",
      property_type: accommodation?.property_type || "",
      star_rating: accommodation?.star_rating || null,
      price_from: accommodation?.price_from || null,
      price_currency: accommodation?.price_currency || "USD",
      address: accommodation?.address || "",
      latitude: accommodation?.latitude || null,
      longitude: accommodation?.longitude || null,
      is_published: accommodation?.is_published || false,
      is_featured: accommodation?.is_featured || false,
    },
  })

  const watchName = form.watch("name")
  const generateSlug = () => {
    const slug = watchName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
    form.setValue("slug", slug)
  }

  async function onSubmit(data: AccommodationFormValues) {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const accommodationData = {
        tenant_id: tenantId,
        name: data.name,
        slug: data.slug,
        short_description: data.short_description || null,
        description: data.description || null,
        hero_image_url: data.hero_image_url || null,
        property_type: data.property_type,
        star_rating: data.star_rating || null,
        price_from: data.price_from || null,
        price_currency: data.price_currency,
        address: data.address || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        is_published: data.is_published,
        is_featured: data.is_featured,
      }

      if (isEditing) {
        const { error } = await supabase
          .from("accommodations")
          .update(accommodationData)
          .eq("id", accommodation.id)

        if (error) throw error
        toast.success("Accommodation updated successfully")
      } else {
        const { error } = await supabase
          .from("accommodations")
          .insert(accommodationData)

        if (error) throw error
        toast.success("Accommodation created successfully")
      }

      router.push("/admin/accommodations")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core details about this property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Serengeti Safari Lodge" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="e.g. serengeti-safari-lodge" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={generateSlug}>
                          Generate
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="property_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="star_rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Star Rating</FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val ? parseInt(val) : null)}
                          defaultValue={field.value?.toString() || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {"★".repeat(rating)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief summary..." className="resize-none" rows={2} {...field} />
                      </FormControl>
                      <FormDescription>{(field.value?.length || 0)}/200 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detailed description..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("hero_image_url") && (
                  <div className="relative aspect-video overflow-hidden rounded-lg border">
                    <img src={form.watch("hero_image_url") || ""} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price_from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price From (per night)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="ZAR">ZAR</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="RWF">RWF</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Full address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="-33.9249" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="18.4241" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <FormDescription>Visible on your portal.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured</FormLabel>
                        <FormDescription>Show on homepage.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-zuru-sunset hover:bg-zuru-sunset-dark"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
