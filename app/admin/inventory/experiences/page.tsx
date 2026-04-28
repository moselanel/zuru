import { experiences } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function ExperiencesInventoryPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experiences</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Experience</th>
              <th className="text-left p-4 font-medium">Category</th>
              <th className="text-left p-4 font-medium">Duration</th>
              <th className="text-left p-4 font-medium">Max Pax</th>
              <th className="text-left p-4 font-medium">Price</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image src={exp.image || "/placeholder.svg"} alt={exp.name} fill className="object-cover" />
                    </div>
                    <span className="font-medium">{exp.name}</span>
                  </div>
                </td>
                <td className="p-4">{exp.category}</td>
                <td className="p-4 text-sm text-muted-foreground">{exp.duration}</td>
                <td className="p-4">{exp.maxParticipants}</td>
                <td className="p-4 font-medium">R{exp.price.toLocaleString()}</td>
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
