import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TranslationProvider } from "@/lib/translation-context"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
})

export const metadata: Metadata = {
  title: "Zuru | Discover Africa",
  description:
    "The all-in-one destination management platform for African tourism. Empower your DMC, tourism board, or tour operator with AI-powered tools.",
  keywords: [
    "destination management",
    "tourism platform",
    "DMC software",
    "Africa tourism",
    "tour operator",
    "travel technology",
    "tourism board",
  ],
  icons: {
    icon: [
      { url: "/zuru-mark.svg", type: "image/svg+xml" },
    ],
    apple: "/zuru-mark.svg",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  )
}
