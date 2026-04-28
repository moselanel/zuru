import Link from "next/link"
import { Building, Compass, CreditCard } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Accommodations",
            desc: "Manage rooms, chalets, and lodges",
            icon: Building,
            href: "/admin/inventory/accommodations",
            count: 6,
          },
          {
            title: "Experiences",
            desc: "Manage activities and tours",
            icon: Compass,
            href: "/admin/inventory/experiences",
            count: 6,
          },
          {
            title: "Rate Plans",
            desc: "Manage pricing and seasons",
            icon: CreditCard,
            href: "/admin/inventory/rates",
            count: 4,
          },
        ].map(({ title, desc, icon: Icon, href, count }) => (
          <Link
            key={title}
            href={href}
            className="bg-card rounded-xl border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <Icon className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-semibold text-lg mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{desc}</p>
            <p className="text-2xl font-bold">{count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
