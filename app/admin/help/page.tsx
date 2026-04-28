import Link from "next/link"
import { Book, MessageCircle, Video, Mail } from "lucide-react"

export default function AdminHelpPage() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { icon: Book, title: "Documentation", desc: "User guides and how-to articles", href: "#" },
          { icon: Video, title: "Video Tutorials", desc: "Step-by-step video guides", href: "#" },
          { icon: MessageCircle, title: "Live Chat", desc: "Chat with our support team", href: "#" },
          { icon: Mail, title: "Email Support", desc: "support@mtpa.co.za", href: "mailto:support@mtpa.co.za" },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link
            key={title}
            href={href}
            className="bg-card rounded-xl border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <Icon className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-semibold text-lg mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-primary/5 rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-2">Need immediate assistance?</h2>
        <p className="text-muted-foreground mb-4">
          Our technical support team is available Monday to Friday, 8am - 6pm SAST.
        </p>
        <p className="font-bold text-lg">+27 13 759 5302</p>
      </div>
    </div>
  )
}
