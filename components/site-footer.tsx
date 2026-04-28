"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MTPALogo } from "@/components/mtpa-logo"
import { useTranslation } from "@/lib/translation-context"

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function SiteFooter() {
  const { t } = useTranslation()

  const footerLinks = {
    explore: [
      { nameKey: "nav.natureReserves", href: "/reserves" },
      { nameKey: "nav.accommodation", href: "/accommodation" },
      { nameKey: "nav.thingsToDo", href: "/experiences" },
      { nameKey: "nav.events", href: "/events" },
      { nameKey: "nav.planTrip", href: "/explore" },
    ],
    business: [
      { nameKey: "nav.conferenceVenues", href: "/conferences" },
      { nameKey: "nav.businessTourism", href: "/business" },
      { nameKey: "nav.travelTrade", href: "/trade" },
      { nameKey: "footer.mediaCenter", href: "/media" },
    ],
    support: [
      { nameKey: "footer.contactUs", href: "/contact" },
      { nameKey: "footer.faqs", href: "/faqs" },
      { nameKey: "footer.helpCenter", href: "/help" },
      { name: "Tour Guide Registration", href: "/guides/register" },
    ],
    legal: [
      { nameKey: "footer.privacy", href: "/privacy" },
      { nameKey: "footer.terms", href: "/terms" },
      { nameKey: "footer.cookies", href: "/cookies" },
      { nameKey: "footer.accessibility", href: "/accessibility" },
    ],
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold">{t("footer.newsletter")}</h3>
              <p className="text-background/70 mt-1">{t("footer.newsletterDesc")}</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 w-full md:w-72"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">{t("footer.subscribe")}</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-4">
              <MTPALogo variant="white" size="md" />
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">{t("footer.description")}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.explore")}</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.business")}</h4>
            <ul className="space-y-2">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.nameKey ? t(link.nameKey) : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.contactUs")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Nelspruit, Mpumalanga, South Africa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+27 13 759 5300</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@mtpa.co.za</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/50 hover:text-background/70 transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
