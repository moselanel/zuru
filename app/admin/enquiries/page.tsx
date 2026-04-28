import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MessageSquare, Search, Filter } from "lucide-react"
import Link from "next/link"

const statusColors: Record<string, string> = {
  new: "bg-zuru-sunset text-white",
  contacted: "bg-blue-500 text-white",
  qualified: "bg-green-500 text-white",
  converted: "bg-purple-500 text-white",
  closed: "bg-gray-500 text-white",
}

export default async function EnquiriesPage() {
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

  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: false })

  const newCount = enquiries?.filter(e => e.status === "new").length || 0
  const totalCount = enquiries?.length || 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Enquiries</h1>
          <p className="text-muted-foreground">
            {totalCount} total enquiries &middot; {newCount} new
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Enquiries</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search enquiries..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {enquiries && enquiries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell className="text-muted-foreground">{enquiry.email}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {enquiry.source_page || "Website"}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[enquiry.status] || "bg-gray-500"}>
                        {enquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/enquiries/${enquiry.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No enquiries yet</h3>
              <p className="mt-2 text-muted-foreground">
                When visitors submit enquiries on your portal, they&apos;ll appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
