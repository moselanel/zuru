import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil } from "lucide-react"

export default function RatesPage() {
  const ratePlans = [
    { name: "Peak Season", period: "Jun 15 - Oct 15", modifier: "+25%", status: "active" },
    { name: "Shoulder Season", period: "Apr - Jun 14, Oct 16 - Nov", modifier: "+10%", status: "active" },
    { name: "Off-Peak", period: "Dec - Mar", modifier: "Base", status: "active" },
    { name: "Festive Season", period: "Dec 15 - Jan 5", modifier: "+40%", status: "active" },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Rate Plans</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Rate Plan
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {ratePlans.map((plan) => (
          <div key={plan.name} className="bg-card rounded-xl border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>
              <Badge variant="outline">{plan.status}</Badge>
            </div>
            <p className="text-2xl font-bold text-primary mb-4">{plan.modifier}</p>
            <Button variant="outline" size="sm">
              <Pencil className="h-3 w-3 mr-2" /> Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
