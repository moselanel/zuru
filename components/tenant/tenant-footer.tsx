"use client"

import Link from "next/link"
import { useTenant } from "@/lib/tenant/context"

export function TenantFooter() {
  const tenant = useTenant()
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: tenant.primary_color }}
            >
              {tenant.name}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Discover extraordinary experiences and unforgettable adventures with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/accommodations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {tenant.contact_email && (
                <li>
                  <a href={`mailto:${tenant.contact_email}`} className="hover:text-foreground transition-colors">
                    {tenant.contact_email}
                  </a>
                </li>
              )}
              {tenant.contact_phone && (
                <li>
                  <a href={`tel:${tenant.contact_phone}`} className="hover:text-foreground transition-colors">
                    {tenant.contact_phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {tenant.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <a 
              href="https://zuru.africa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              style={{ color: tenant.primary_color }}
            >
              Zuru
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
