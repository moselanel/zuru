"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"

const featuredPost = {
  slug: "future-of-african-tourism-technology",
  title: "The Future of African Tourism Technology: Trends Shaping 2026 and Beyond",
  excerpt: "From AI-powered trip planning to sustainable travel tracking, discover the technology trends transforming how African destinations connect with global travelers.",
  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",
  author: "Zuru Team",
  date: "April 20, 2026",
  readTime: "8 min read",
  category: "Industry Insights",
}

const posts = [
  {
    slug: "why-african-destinations-need-modern-websites",
    title: "Why African Destinations Need Modern Websites in 2026",
    excerpt: "87% of travelers research online before booking. Here's why outdated websites are costing African destinations millions in lost bookings.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    author: "Zuru Team",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "Digital Strategy",
  },
  {
    slug: "guide-to-destination-marketing-africa",
    title: "The Complete Guide to Destination Marketing in Africa",
    excerpt: "Learn how leading African tourism boards are using digital marketing to attract international visitors and grow sustainable tourism.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800",
    author: "Zuru Team",
    date: "April 10, 2026",
    readTime: "12 min read",
    category: "Marketing",
  },
  {
    slug: "ai-trip-planning-african-tourism",
    title: "How AI Trip Planning is Revolutionizing African Tourism",
    excerpt: "Artificial intelligence is helping travelers discover hidden gems and plan personalized African adventures. Here's how destinations can leverage this technology.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    author: "Zuru Team",
    date: "April 5, 2026",
    readTime: "6 min read",
    category: "Technology",
  },
  {
    slug: "gorilla-trekking-rwanda-conservation-success",
    title: "Rwanda's Gorilla Trekking: A Conservation Success Story",
    excerpt: "How Rwanda transformed mountain gorilla conservation into a world-class tourism experience, and what other destinations can learn from their approach.",
    image: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=800",
    author: "Zuru Team",
    date: "March 28, 2026",
    readTime: "7 min read",
    category: "Case Study",
  },
  {
    slug: "multi-language-tourism-websites",
    title: "Why Your Tourism Website Needs to Speak Multiple Languages",
    excerpt: "Breaking down language barriers is essential for African destinations targeting European, Asian, and Middle Eastern travelers. Here's how to do it right.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    author: "Zuru Team",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "Digital Strategy",
  },
  {
    slug: "sustainable-tourism-africa-guide",
    title: "Building Sustainable Tourism in Africa: A Practical Guide",
    excerpt: "Sustainable tourism isn't just good ethics — it's good business. Learn how to balance growth with conservation and community benefit.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    author: "Zuru Team",
    date: "March 15, 2026",
    readTime: "10 min read",
    category: "Sustainability",
  },
]

const categories = [
  "All",
  "Industry Insights",
  "Digital Strategy",
  "Technology",
  "Marketing",
  "Case Study",
  "Sustainability",
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Zuru Blog
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zuru-sand md:text-5xl">
              Insights for{" "}
              <span className="text-zuru-sunset">African Tourism</span>
            </h1>
            <p className="text-lg text-zuru-sand/80">
              Expert insights, industry trends, and practical guides for destination 
              marketers and tourism professionals across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-zuru-ink/10 bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "ghost"}
                size="sm"
                className={category === "All" 
                  ? "bg-zuru-sunset text-white hover:bg-zuru-sunset/90" 
                  : "text-zuru-ink/70 hover:bg-zuru-ink/5 hover:text-zuru-ink"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="group overflow-hidden border-zuru-ink/10 transition-shadow hover:shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-center p-6 md:p-8">
                    <Badge className="mb-4 w-fit bg-zuru-sunset/10 text-zuru-sunset">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="mb-3 text-2xl font-bold text-zuru-ink group-hover:text-zuru-sunset md:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mb-4 text-zuru-ink/70">{featuredPost.excerpt}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-zuru-ink/50">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="group h-full overflow-hidden border-zuru-ink/10 transition-shadow hover:shadow-lg">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge className="mb-3 bg-zuru-ink/5 text-zuru-ink/70">
                        {post.category}
                      </Badge>
                      <h3 className="mb-2 font-semibold text-zuru-ink group-hover:text-zuru-sunset">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-zuru-ink/70">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-zuru-ink/50">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-zuru-sand">
              Stay Updated
            </h2>
            <p className="mb-6 text-zuru-sand/80">
              Get the latest insights on African tourism technology delivered 
              to your inbox monthly. No spam, just valuable content.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border-0 bg-white/10 px-4 py-3 text-zuru-sand placeholder:text-zuru-sand/50 focus:outline-none focus:ring-2 focus:ring-zuru-sunset sm:w-64"
              />
              <Button className="bg-zuru-sunset text-white hover:bg-zuru-sunset/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
