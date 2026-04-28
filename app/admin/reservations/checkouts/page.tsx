import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogOut, CheckCircle } from "lucide-react"

export default function CheckoutsPage() {
  const checkouts = [
    {
      id: "RES-2026-002",
      guest: "Hans Weber",
      accommodation: "Honeymoon Treehouse Suite",
      time: "10:00",
      status: "pending",
      balance: 0,
    },
    {
      id: "RES-2026-004",
      guest: "Maria Santos",
      accommodation: "Riverside Bush Camp",
      time: "11:00",
      status: "pending",
      balance: 450,
    },
    {
      id: "RES-2026-006",
      guest: "David Kim",
      accommodation: "Waterfront Cottage",
      time: "10:00",
      status: "completed",
      balance: 0,
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Today's Check-outs</h1>
          <p className="text-muted-foreground">{new Date().toLocaleDateString("en-ZA", { dateStyle: "full" })}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-9 w-64" />
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="divide-y">
          {checkouts.map((checkout) => (
            <div key={checkout.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${checkout.status === "completed" ? "bg-green-100" : "bg-muted"}`}
                >
                  {checkout.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{checkout.guest}</p>
                  <p className="text-sm text-muted-foreground">{checkout.accommodation}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{checkout.id}</p>
                  <p className="text-sm text-muted-foreground">Due: {checkout.time}</p>
                  {checkout.balance > 0 && (
                    <p className="text-sm text-red-600 font-medium">Balance: R{checkout.balance}</p>
                  )}
                </div>
                <Badge variant={checkout.status === "completed" ? "default" : "outline"}>
                  {checkout.status === "completed" ? "Completed" : "Pending"}
                </Badge>
                {checkout.status !== "completed" && <Button size="sm">Process</Button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
