"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTenant } from "@/lib/tenant/context"

export function TenantHeader() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Base path for all tenant links
  const basePath = `/sites/${domain}`

  const navItems = [
    { label: "Home", href: basePath },
    { label: "Destinations", href: `${basePath}/destinations` },
    { label: "Experiences", href: `${basePath}/experiences` },
    { label: "Accommodations", href: `${basePath}/accommodations` },
    { label: "Contact", href: `${basePath}/contact` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={basePath} className="flex items-center gap-2">
            {tenant.logo_url ? (
              <img src={tenant.logo_url} alt={tenant.name} className="h-8 w-auto" />
            ) : (
              <span 
                className="text-xl font-semibold"
                style={{ color: tenant.primary_color }}
              >
                {tenant.name}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              style={{ 
                backgroundColor: tenant.primary_color,
                color: '#ffffff'
              }}
              className="hover:opacity-90"
            >
              <Link href={`${basePath}/contact`}>Plan Your Trip</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                style={{ 
                  backgroundColor: tenant.primary_color,
                  color: '#ffffff'
                }}
                className="w-full hover:opacity-90"
              >
                <Link href={`${basePath}/contact`}>Plan Your Trip</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
