import { experiences } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function AdminExperiencesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experiences</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-card rounded-xl border overflow-hidden">
            <div className="relative h-40">
              <Image src={exp.image || "/placeholder.svg"} alt={exp.name} fill className="object-cover" />
              <Badge className="absolute top-3 left-3">{exp.category}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{exp.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {exp.duration} · {exp.intensity}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold">R{exp.price.toLocaleString()}</span>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
