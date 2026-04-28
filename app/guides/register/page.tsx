import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata = {
  title: "Register as Tour Guide | MTPA",
  description: "Join the MTPA tour guide network.",
}

export default function GuideRegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Tour Guide Registration</h1>
            <p className="text-muted-foreground">Join our network of certified guides.</p>
          </div>

          <form className="bg-card rounded-2xl p-6 md:p-8 border space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+27" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certification">Certification Number</Label>
              <Input id="certification" placeholder="CATHSSETA / FGASA number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties</Label>
              <Textarea id="specialties" placeholder="e.g., Wildlife Safari, Cultural Tours, Hiking..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <Input id="languages" placeholder="e.g., English, Zulu, Afrikaans" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself and your experience..." rows={4} />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I confirm that I hold valid tour guide certification and agree to MTPA's terms and conditions.
              </Label>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Submit Application
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
