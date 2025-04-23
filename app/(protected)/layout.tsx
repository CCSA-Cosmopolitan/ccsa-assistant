import type React from "react"
import { getServerSession } from "@/auth"
import { redirect } from "next/navigation"
import { ProtectedLayoutWrapper } from "@/components/protected-layout-wrapper"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/")}`)
  }

  // If email not verified, redirect to login
  if (!session.user.emailVerified) {
    return redirect("/login")
  }

  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>
}
