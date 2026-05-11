import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { DemoSwitcher } from "@/components/demo-switcher"
import { TranslationProvider } from "@/lib/translation-context"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "MTPA | Mpumalanga Tourism & Parks Agency",
  description:
    "Discover the wild beauty of Mpumalanga. Book nature reserves, accommodation, and unforgettable experiences in South Africa's premier eco-tourism destination.",
  keywords: [
    "Mpumalanga",
    "tourism",
    "nature reserves",
    "South Africa",
    "safari",
    "eco-tourism",
    "accommodation",
    "wildlife",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased`}>
        <TranslationProvider>
          {children}
          <DemoSwitcher />
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  )
}
