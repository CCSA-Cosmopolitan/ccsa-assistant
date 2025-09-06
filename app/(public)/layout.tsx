import PublicNavigation from "@/components/PublicNavigation"
import type React from "react"




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