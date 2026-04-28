import { reserves } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function AdminReservesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Nature Reserves</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Reserve
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Reserve</th>
              <th className="text-left p-4 font-medium">Region</th>
              <th className="text-left p-4 font-medium">Rating</th>
              <th className="text-left p-4 font-medium">Price From</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reserves.map((reserve) => (
              <tr key={reserve.id} className="hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={reserve.image || "/placeholder.svg"}
                        alt={reserve.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-medium">{reserve.name}</span>
                      <p className="text-sm text-muted-foreground">{reserve.location}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{reserve.region}</td>
                <td className="p-4">
                  {reserve.rating} ({reserve.reviewCount})
                </td>
                <td className="p-4 font-medium">R{reserve.priceFrom.toLocaleString()}</td>
                <td className="p-4">
                  <Badge variant={reserve.featured ? "default" : "outline"}>
                    {reserve.featured ? "Featured" : "Active"}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
