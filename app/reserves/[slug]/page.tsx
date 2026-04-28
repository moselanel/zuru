import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReserveDetail } from "@/components/reserves/reserve-detail"
import { reserves } from "@/lib/data"

export async function generateStaticParams() {
  return reserves.map((reserve) => ({
    slug: reserve.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reserve = reserves.find((r) => r.slug === slug)
  if (!reserve) return { title: "Reserve Not Found" }

  return {
    title: `${reserve.name} | MTPA`,
    description: reserve.description,
  }
}

export default async function ReserveDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reserve = reserves.find((r) => r.slug === slug)

  if (!reserve) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <ReserveDetail reserve={reserve} />
      </main>
      <SiteFooter />
    </>
  )
}
