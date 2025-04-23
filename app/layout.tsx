import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Farming",
    "Agriculture",
    "FarmAI",
    "Artificial Intelligence",
    "AI in Agriculture",
    "AI in Farming",
    "AI for Farmers",
    "AI for Agriculture",
    "AI for Crop Analysis",
    "AI for Soil Analysis",
    "AI for Farm Management",
    "AI for Nigerian Agriculture",
    "AI for Nigerian Farming",
    "AI",
    "Machine Learning",
    "Crop Analysis",
    "Soil Analysis",
    "Farm Management",
    "Nigerian Farming",
  ],
  authors: [
    {
      name: "CCSA FarmAI",
      url: "https://ccsa.cosmopolitan.edu.ng",
    },
  ],
  creator: "CCSA FarmAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@ccsafarmai",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'