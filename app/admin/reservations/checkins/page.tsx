import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, Clock } from "lucide-react"

export default function CheckinsPage() {
  const checkins = [
    {
      id: "RES-2026-001",
      guest: "Sarah Mitchell",
      accommodation: "Canyon Lodge & Spa",
      time: "14:00",
      status: "expected",
    },
    { id: "RES-2026-003", guest: "Chen Wei", accommodation: "Family Safari Chalet", time: "15:00", status: "expected" },
    {
      id: "RES-2026-007",
      guest: "James Wilson",
      accommodation: "Luxury Safari Tent",
      time: "14:00",
      status: "arrived",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Today's Check-ins</h1>
          <p className="text-muted-foreground">{new Date().toLocaleDateString("en-ZA", { dateStyle: "full" })}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-9 w-64" />
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="divide-y">
          {checkins.map((checkin) => (
            <div key={checkin.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${checkin.status === "arrived" ? "bg-green-100" : "bg-orange-100"}`}
                >
                  {checkin.status === "arrived" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{checkin.guest}</p>
                  <p className="text-sm text-muted-foreground">{checkin.accommodation}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{checkin.id}</p>
                  <p className="text-sm text-muted-foreground">Expected: {checkin.time}</p>
                </div>
                <Badge variant={checkin.status === "arrived" ? "default" : "outline"}>
                  {checkin.status === "arrived" ? "Checked In" : "Expected"}
                </Badge>
                {checkin.status !== "arrived" && <Button size="sm">Check In</Button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
