import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ExperienceDetail } from "@/components/experiences/experience-detail"
import { experiences } from "@/lib/data"

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = experiences.find((e) => e.slug === slug)
  if (!experience) return { title: "Experience Not Found" }

  return {
    title: `${experience.name} | MTPA`,
    description: experience.description,
  }
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = experiences.find((e) => e.slug === slug)

  if (!experience) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <ExperienceDetail experience={experience} />
      </main>
      <SiteFooter />
    </>
  )
}
