import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"
      walletBalance: number
      emailVerified?: Date | null
      country?: string
      preferredPaymentGateway?: string
    } & DefaultSession["user"]
  }

  interface JWT {
    role?: "USER" | "ADMIN"
    walletBalance?: number
    emailVerified?: Date | null
  }
}
