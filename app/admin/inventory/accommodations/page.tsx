import { accommodations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function AccommodationsInventoryPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accommodations</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Accommodation
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Property</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Reserve</th>
              <th className="text-left p-4 font-medium">Capacity</th>
              <th className="text-left p-4 font-medium">Price/Night</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {accommodations.map((acc) => (
              <tr key={acc.id} className="hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image src={acc.image || "/placeholder.svg"} alt={acc.name} fill className="object-cover" />
                    </div>
                    <span className="font-medium">{acc.name}</span>
                  </div>
                </td>
                <td className="p-4">{acc.type}</td>
                <td className="p-4 text-sm text-muted-foreground">{acc.reserveName}</td>
                <td className="p-4">{acc.maxCapacity} guests</td>
                <td className="p-4 font-medium">R{acc.pricePerNight.toLocaleString()}</td>
                <td className="p-4">
                  <Badge variant="outline">Active</Badge>
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
