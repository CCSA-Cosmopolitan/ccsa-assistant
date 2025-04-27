import type React from "react"
import PublicNavigation from "@/components/PublicNavigation"
import { redirect } from "next/navigation"
import { getServerSession } from "@/auth"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


    const session = await getServerSession()
  
    if (session?.user) {
      redirect("/dashboard")
    }
  
    if (session?.user.role === "ADMIN") {
      redirect("/admin/dashboard")
    }

  return (
        <div>
        <PublicNavigation />
          {children}
        </div>
  )
}