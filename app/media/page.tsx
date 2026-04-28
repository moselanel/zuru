import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Camera, FileText, Mail } from "lucide-react"

export const metadata = {
  title: "Media Centre | MTPA",
  description: "Press releases, media resources, and press contact information.",
}

export default function MediaPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Media Centre</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Resources for journalists, content creators, and media professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-xl p-6 border">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Press Releases</h3>
              <p className="text-sm text-muted-foreground mb-4">Latest news and announcements from MTPA.</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Releases
              </Button>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Camera className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Image Library</h3>
              <p className="text-sm text-muted-foreground mb-4">High-resolution images for editorial use.</p>
              <Button variant="outline" className="w-full bg-transparent">
                Browse Images
              </Button>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Download className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Brand Assets</h3>
              <p className="text-sm text-muted-foreground mb-4">Logos, guidelines, and brand materials.</p>
              <Button variant="outline" className="w-full bg-transparent">
                Download Kit
              </Button>
            </div>
          </div>

          {/* Featured Images */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Featured Imagery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "/blyde-river-canyon-south-africa-dramatic-green-can.jpg",
                "/lion-pride-resting-african-savanna.jpg",
                "/gods-window-panorama-view-mpumalanga.jpg",
                "/african-elephant-kruger-national-park-safari-wildl.jpg",
              ].map((img) => (
                <div key={img} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt="Mpumalanga"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">Media Enquiries</h2>
              <p className="text-muted-foreground">For press enquiries and interview requests:</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <span className="font-semibold">media@mtpa.co.za</span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
