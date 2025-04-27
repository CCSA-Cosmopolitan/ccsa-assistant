import type React from "react"
import PublicNavigation from "@/components/PublicNavigation"




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <div>
        <PublicNavigation />
          {children}
        </div>
  )
}