import Link from "next/link"

const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/demo", label: "Demo" },
    { href: "/roadmap", label: "Roadmap" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-zuru-sand-dark/20 bg-zuru-plum-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                <circle cx="20" cy="20" r="20" fill="#FF6B35"/>
                <path d="M12 14L20 10L28 14V22L20 30L12 22V14Z" fill="#F5F0E8"/>
                <path d="M20 10V30M12 14L28 22M28 14L12 22" stroke="#4A2C4A" strokeWidth="1.5"/>
              </svg>
              <span className="text-xl font-bold text-zuru-sand">Zuru</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zuru-sand/80">
              The all-in-one destination management platform empowering African tourism.
            </p>
            <div className="mt-4 space-y-1 text-sm text-zuru-sand/70">
              <p>Bel Air Shopping Centre, Bellairs Dr</p>
              <p>Northriding, Johannesburg, 2169</p>
              <p className="mt-2">
                <a href="tel:+27823166905" className="hover:text-zuru-sunset">+27 82 316 6905</a>
              </p>
              <p>
                <a href="mailto:info@azizes.co.za" className="hover:text-zuru-sunset">info@azizes.co.za</a>
              </p>
            </div>
            <p className="mt-6 text-xs text-zuru-sand/60">
              &copy; {new Date().getFullYear()} Zuru. All rights reserved.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-zuru-sand">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zuru-sand/70 transition-colors hover:text-zuru-sunset"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-zuru-sand">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zuru-sand/70 transition-colors hover:text-zuru-sunset"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-zuru-sand">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zuru-sand/70 transition-colors hover:text-zuru-sunset"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
