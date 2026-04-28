"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, User, Globe, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { MTPALogo } from "@/components/mtpa-logo"
import { useTranslation } from "@/lib/translation-context"
import type { Language } from "@/lib/translations"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t, languageNames } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = {
    leisure: [
      { name: t("nav.natureReserves"), href: "/reserves" },
      { name: t("nav.accommodation"), href: "/accommodation" },
      { name: t("nav.thingsToDo"), href: "/experiences" },
      { name: t("nav.events"), href: "/events" },
    ],
    business: [
      { name: t("nav.conferenceVenues"), href: "/conferences" },
      { name: t("nav.businessTourism"), href: "/business" },
      { name: t("nav.travelTrade"), href: "/trade" },
    ],
  }

  const availableLanguages: Language[] = ["en", "zu", "ss", "de", "st"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MTPALogo variant={isScrolled ? "default" : "white"} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-1 ${isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}`}
                >
                  {t("nav.explore")}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {navigation.leisure.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-1 ${isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}`}
                >
                  {t("nav.business")}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {navigation.business.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/guides">
              <Button variant="ghost" className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}>
                {t("nav.tourGuides")}
              </Button>
            </Link>

            <Link href="/discover">
              <Button variant="ghost" className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}>
                Discover Map
              </Button>
            </Link>

            <Link href="/itinerary">
              <Button variant="ghost" className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}>
                AI Trip Planner
              </Button>
            </Link>

            <Link href="/explore">
              <Button variant="ghost" className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}>
                {t("nav.planTrip")}
              </Button>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("nav.search")}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t("nav.language")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {availableLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="flex items-center justify-between"
                  >
                    {languageNames[lang]}
                    {language === lang && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t("nav.account")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">{t("nav.signIn")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">{t("nav.createAccount")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">{t("nav.myBookings")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/wishlist">{t("nav.wishlist")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden ${isScrolled ? "text-foreground" : "text-white hover:bg-white/10"}`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("nav.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">{t("nav.explore")}</h3>
                    <div className="flex flex-col gap-2">
                      {navigation.leisure.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">{t("nav.business")}</h3>
                    <div className="flex flex-col gap-2">
                      {navigation.business.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/guides" className="text-lg font-medium hover:text-primary transition-colors">
                        {t("nav.tourGuides")}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/discover" className="text-lg font-medium hover:text-primary transition-colors">
                        Discover Map
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/itinerary" className="text-lg font-medium hover:text-primary transition-colors">
                        AI Trip Planner
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/explore" className="text-lg font-medium hover:text-primary transition-colors">
                        {t("nav.planTrip")}
                      </Link>
                    </SheetClose>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">{t("nav.language")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableLanguages.map((lang) => (
                        <Button
                          key={lang}
                          variant={language === lang ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLanguage(lang)}
                        >
                          {languageNames[lang]}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <SheetClose asChild>
                      <Button className="w-full" asChild>
                        <Link href="/login">{t("nav.signIn")}</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
