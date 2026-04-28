import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Languages, Award, MapPin, Calendar, Phone, Mail, CheckCircle, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const guides = [
  {
    slug: "themba-mkhize",
    name: "Themba Mkhize",
    specialty: "Wildlife Safari",
    languages: ["English", "Zulu", "Swati"],
    rating: 4.9,
    reviews: 234,
    image: "/guide-themba.jpg",
    location: "Kruger National Park Area",
    experience: "15 years",
    bio: "Born and raised near Kruger, Themba has an unmatched knowledge of wildlife behavior and tracking.",
    fullBio:
      "Themba grew up in a village bordering the Kruger National Park, where he developed a deep connection with the African bush from an early age. His grandfather was a traditional tracker, and Themba learned the ancient art of reading animal signs before he could read books. After completing his FGASA Field Guide certification, he spent years guiding at some of South Africa's most prestigious private reserves before returning to share his homeland with visitors from around the world. His intimate knowledge of animal behavior and ability to track the Big Five on foot makes every safari an unforgettable adventure.",
    certifications: ["FGASA Level 3", "Trails Guide Certification", "First Aid Level 2", "Dangerous Game Specialist"],
    tours: ["Big Five Safari", "Walking Safari", "Night Game Drive", "Bird Watching Safari"],
    gallery: [
      "/lion-pride-resting-african-savanna.jpg",
      "/leopard-in-tree-kruger-park.jpg",
      "/african-elephant-kruger-national-park-safari-wildl.jpg",
    ],
  },
  {
    slug: "lindiwe-dlamini",
    name: "Lindiwe Dlamini",
    specialty: "Cultural Tours",
    languages: ["English", "Swati", "Tsonga"],
    rating: 4.8,
    reviews: 189,
    image: "/guide-lindiwe.jpg",
    location: "Panorama Route",
    experience: "12 years",
    bio: "Lindiwe shares the rich cultural heritage of Mpumalanga through storytelling and community visits.",
    fullBio:
      "Lindiwe is a cultural ambassador for the Swati and Tsonga communities of Mpumalanga. With a degree in Anthropology and deep roots in her community, she bridges the gap between traditional African culture and modern tourism. Her tours take visitors beyond the surface, into homesteads, craft centers, and sacred sites where they can experience authentic African hospitality. Lindiwe's warm personality and encyclopedic knowledge of local customs, music, and cuisine have earned her a loyal following among travelers seeking meaningful cultural connections.",
    certifications: ["Cultural Tourism Certificate", "Heritage Guide License", "Community Tourism Specialist"],
    tours: ["Village Homestead Visit", "Traditional Cooking Class", "Craft & Art Tour", "Cultural Festival Experience"],
    gallery: ["/cultural-village.jpg", "/traditional-dance.jpg", "/ancient-rock-formations-barberton.jpg"],
  },
  {
    slug: "johan-van-der-berg",
    name: "Johan van der Berg",
    specialty: "Adventure & Hiking",
    languages: ["English", "Afrikaans"],
    rating: 4.9,
    reviews: 312,
    image: "/guide-johan.jpg",
    location: "Blyde River Canyon",
    experience: "18 years",
    bio: "An expert mountaineer and naturalist, Johan leads unforgettable hikes through Mpumalanga's dramatic landscapes.",
    fullBio:
      "Johan has been exploring the mountains and forests of Mpumalanga since childhood, when his father first took him hiking in the Blyde River Canyon. After studying Geology at university, he combined his passion for adventure with his scientific knowledge to become one of the region's most sought-after hiking guides. He has pioneered several new trails and knows every cliff, waterfall, and hidden viewpoint in the area. Whether it's a gentle walk to God's Window or a challenging multi-day trek, Johan ensures guests experience the raw beauty of Mpumalanga safely and sustainably.",
    certifications: [
      "Mountain Leader Certificate",
      "Wilderness First Responder",
      "Rock Climbing Instructor",
      "Geology Guide",
    ],
    tours: ["Blyde Canyon Full Day Hike", "Three Rondavels Trek", "Waterfall Trail", "Multi-Day Wilderness Adventure"],
    gallery: [
      "/blyde-river-canyon-south-africa-dramatic-green-can.jpg",
      "/gods-window-panorama-view-mpumalanga.jpg",
      "/bourkes-luck-potholes-rock-formations.jpg",
    ],
  },
  {
    slug: "nomsa-nkosi",
    name: "Nomsa Nkosi",
    specialty: "Bird Watching",
    languages: ["English", "Zulu", "Ndebele"],
    rating: 4.7,
    reviews: 156,
    image: "/guide-nomsa.jpg",
    location: "Lowveld Region",
    experience: "10 years",
    bio: "A passionate ornithologist, Nomsa has documented over 400 bird species across the region.",
    fullBio:
      "Nomsa's fascination with birds began when she was a young girl watching weavers build their intricate nests near her family home. This childhood curiosity blossomed into a lifelong passion that led her to study Ornithology and become one of Mpumalanga's most knowledgeable birding guides. She has contributed to several bird atlasing projects and her patient, expert guidance has helped countless birders tick rare species off their lists. From the elusive Pel's Fishing Owl to colorful sunbirds and majestic raptors, Nomsa knows where to find them all.",
    certifications: ["FGASA Birding Specialist", "BirdLife SA Guide", "Environmental Education Certificate"],
    tours: ["Dawn Chorus Walk", "Raptor Route", "Lowveld Birding Safari", "Photography Birding Tour"],
    gallery: ["/lowveld-region.jpg", "/safari-wildlife.jpg", "/sunrise-safari.jpg"],
  },
  {
    slug: "pieter-botha",
    name: "Pieter Botha",
    specialty: "Photography Safari",
    languages: ["English", "Afrikaans", "German"],
    rating: 4.9,
    reviews: 278,
    image: "/guide-pieter.jpg",
    location: "Greater Kruger Area",
    experience: "20 years",
    bio: "Award-winning wildlife photographer who helps guests capture stunning images of African wildlife.",
    fullBio:
      "Pieter has spent two decades perfecting the art of wildlife photography in the African bush. His work has been featured in National Geographic, BBC Wildlife, and numerous international publications. But his true passion is teaching others to see and capture the beauty of the wild. Pieter's photography safaris are designed for all skill levels, from smartphone snappers to professional photographers. He knows the best spots, the perfect light, and the animal behavior that leads to that once-in-a-lifetime shot. His patience and technical expertise have helped thousands of guests create lasting memories.",
    certifications: [
      "FGASA Level 2",
      "Professional Photography Certificate",
      "Adobe Certified Expert",
      "Drone Pilot License",
    ],
    tours: ["Golden Hour Safari", "Big Cat Photography", "Landscape & Wildlife Workshop", "Night Photography Special"],
    gallery: [
      "/leopard-in-tree-kruger-park.jpg",
      "/giraffe-silhouette-sunset-africa.jpg",
      "/zebra-herd-african-plains.jpg",
    ],
  },
  {
    slug: "thandi-mokoena",
    name: "Thandi Mokoena",
    specialty: "Historical Tours",
    languages: ["English", "Sotho", "Zulu"],
    rating: 4.8,
    reviews: 198,
    image: "/guide-thandi.jpg",
    location: "Barberton & Pilgrim's Rest",
    experience: "14 years",
    bio: "Thandi brings history to life with tours of gold rush towns and ancient geological sites.",
    fullBio:
      "Thandi is a historian and storyteller who specializes in the fascinating gold rush era of Mpumalanga. Her tours of Pilgrim's Rest and Barberton transport visitors back to the 1870s, when fortune seekers from around the world descended on these hills in search of gold. But her expertise goes even further back - to the ancient geological formations of the Barberton Greenstone Belt, some of the oldest rocks on Earth. Thandi weaves together tales of geological time, human ambition, and cultural heritage into tours that are as educational as they are entertaining.",
    certifications: ["Heritage Guide License", "Museum Studies Certificate", "Geological Tourism Specialist"],
    tours: [
      "Pilgrim's Rest Walking Tour",
      "Barberton Gold History",
      "Ancient Earth Geology Tour",
      "Mining Heritage Experience",
    ],
    gallery: ["/ancient-rock-formations-barberton.jpg", "/barberton-valley.jpg", "/highveld-region.jpg"],
  },
]

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return { title: "Guide Not Found" }
  return {
    title: `${guide.name} - ${guide.specialty} | MTPA Tour Guides`,
    description: guide.bio,
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Guides
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="bg-card rounded-2xl border p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden mx-auto md:mx-0">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="font-serif text-3xl font-bold mb-2">{guide.name}</h1>
                    <p className="text-primary font-semibold text-lg mb-2">{guide.specialty}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {guide.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {guide.experience} experience
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="font-bold text-lg">{guide.rating}</span>
                        <span className="text-muted-foreground">({guide.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl border p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold mb-4">About {guide.name.split(" ")[0]}</h2>
                <p className="text-muted-foreground leading-relaxed">{guide.fullBio}</p>
              </div>

              {/* Photo Gallery */}
              <div className="bg-card rounded-2xl border p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold mb-4">Tour Gallery</h2>
                <div className="grid grid-cols-3 gap-4">
                  {guide.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${guide.name} tour photo ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tours Offered */}
              <div className="bg-card rounded-2xl border p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold mb-4">Tours Offered</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {guide.tours.map((tour) => (
                    <div key={tour} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{tour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-card rounded-2xl border p-6 sticky top-24">
                <h3 className="font-serif text-lg font-bold mb-4">Book This Guide</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Languages className="h-5 w-5" />
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                </div>
                <Button className="w-full mb-3" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Request Booking
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Certifications */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-serif text-lg font-bold mb-4">Certifications</h3>
                <div className="space-y-2">
                  {guide.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
