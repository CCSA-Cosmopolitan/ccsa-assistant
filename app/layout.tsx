import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
// import {  } from '@clerk/themes'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://farmersassistant.ai"),
  title: {
    default: " CCSA Cosmopolitan Farmer's Assistant AI",
    template: "%s | CCSA Cosmopolitan Farmer's Assistant",
  },
  description:
    "AI-powered assistance for all your farming needs with expertise spanning over 20 PhDs in various agricultural fields.",
  keywords: ["farming", "agriculture", "AI assistant", "crop management", "soil analysis", "precision agriculture"],
  authors: [{ name: "Abdulrahman Dauda Gaya" }],
  creator: "DoudGaya",
  publisher: "CCSA Cosmopolitan University",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ccsaai.cosmopolitan.edu.ng",
    siteName: "Farmer's Assistant AI",
    images: [
      {
        url: "https://https://ai.ccsa.cosmopolitan.edu.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Farmer's Assistant AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CCSA_CUA",
    creator: "@CCSA_CUA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <ClerkProvider appearance={{
              baseTheme: dark,
            }} >
              {children}
          </ClerkProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
