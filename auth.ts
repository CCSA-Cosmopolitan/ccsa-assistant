import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs"
import { getServerSession as getNextAuthServerSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email)

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          walletBalance: user.walletBalance,
          emailVerified: user.emailVerified,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN"
      }

      if (token.walletBalance !== undefined && session.user) {
        session.user.walletBalance = token.walletBalance as number
      }

      if (token.emailVerified !== undefined && session.user) {
        session.user.emailVerified = token.emailVerified as Date | null
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      })

      if (!existingUser) return token

      token.role = existingUser.role
      token.walletBalance = existingUser.walletBalance
      token.emailVerified = existingUser.emailVerified

      return token
    },
  },
  debug: process.env.NODE_ENV === "development",
}

// For client components
export const auth = NextAuth(authOptions)

// For server components
export const getServerSession = () => getNextAuthServerSession(authOptions)

// For API routes
export default auth
