"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation Name</Label>
              <Input id="orgName" defaultValue="Mpumalanga Tourism & Parks Agency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" defaultValue="info@mtpa.co.za" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" defaultValue="+27 13 759 5300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="1 Hall Street, Nelspruit, Mpumalanga, 1200" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            {[
              { label: "New booking notifications", desc: "Receive alerts for new reservations" },
              { label: "Check-in reminders", desc: "Daily summary of expected arrivals" },
              { label: "Payment alerts", desc: "Notifications for failed or pending payments" },
              { label: "Review notifications", desc: "Alerts when guests leave reviews" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
            <Button>Save Preferences</Button>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            {[
              { name: "Stripe", desc: "Payment processing", status: "Connected" },
              { name: "SendGrid", desc: "Email notifications", status: "Connected" },
              { name: "Google Analytics", desc: "Website analytics", status: "Not connected" },
            ].map((int) => (
              <div key={int.name} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{int.name}</p>
                  <p className="text-sm text-muted-foreground">{int.desc}</p>
                </div>
                <Button variant={int.status === "Connected" ? "outline" : "default"} size="sm">
                  {int.status === "Connected" ? "Configure" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
