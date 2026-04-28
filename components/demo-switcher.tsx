"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DemoSwitcher() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const isAdmin = pathname?.startsWith("/admin")

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 bg-card border-2 border-primary/20 rounded-full py-2 px-3 shadow-xl">
      <span className="text-xs font-medium text-muted-foreground hidden sm:block">Demo:</span>
      <div className="flex items-center gap-1 bg-muted rounded-full p-1">
        <Link href="/">
          <Button variant={!isAdmin ? "default" : "ghost"} size="sm" className="rounded-full h-8 px-3 gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Public</span>
          </Button>
        </Link>
        <Link href="/admin">
          <Button variant={isAdmin ? "default" : "ghost"} size="sm" className="rounded-full h-8 px-3 gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-muted rounded-full transition-colors"
        aria-label="Close demo switcher"
      >
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  )
}
