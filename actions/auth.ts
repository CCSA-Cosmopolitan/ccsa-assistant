"use server"
// Runtime: nodejs

import type * as z from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import {
  generateVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  verifyVerificationToken,
} from "@/lib/tokens"
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  // Check if email is verified
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    // Send verification email
    await sendVerificationEmail(existingUser.email, verificationToken.token)

    return {
      emailVerification: true,
      message: "Email verification link sent. Please check your email.",
    }
  }

  try {
    // Manual authentication check since we can't use signIn directly in server actions
    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) {
      return { error: "Invalid credentials!" }
    }

    // Return success - client side will handle the redirect
    return { success: "Login successful!", redirect: callbackUrl || DEFAULT_LOGIN_REDIRECT }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // Generate verification token
  const verificationToken = await generateVerificationToken(email)

  // Send verification email
  await sendVerificationEmail(email, verificationToken.token)

  return {
    success: "Verification email sent! Please check your inbox.",
  }
}

export const verifyEmail = async (token: string) => {
  const verificationToken = await verifyVerificationToken(token)

  if (!verificationToken) {
    return { error: "Invalid or expired token!" }
  }

  const user = await getUserByEmail(verificationToken.identifier)

  if (!user) {
    return { error: "User not found!" }
  }

  // Update user's emailVerified field
  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  })

  // Delete the verification token
  await db.verificationToken.delete({
    where: { id: verificationToken.id },
  })

  return { success: "Email verified successfully!" }
}

export const forgotPassword = async (email: string) => {
  const user = await getUserByEmail(email)

  if (!user) {
    // Don't reveal that the email doesn't exist for security
    return { success: "If your email is registered, you will receive a password reset link." }
  }

  // Generate password reset token
  const passwordResetToken = await generatePasswordResetToken(email)

  // Send password reset email
  await sendPasswordResetEmail(email, passwordResetToken.token)

  return { success: "Password reset email sent. Please check your inbox." }
}

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>, token: string) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { password } = validatedFields.data

  const passwordResetToken = await verifyPasswordResetToken(token)

  if (!passwordResetToken) {
    return { error: "Invalid or expired token!" }
  }

  const user = await getUserByEmail(passwordResetToken.email)

  if (!user) {
    return { error: "User not found!" }
  }

  // Update user's password
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  })

  // Delete the password reset token
  await db.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  })

  return { success: "Password reset successfully!" }
}

export const resendVerificationEmail = async (email: string) => {
  const user = await getUserByEmail(email)

  if (!user) {
    return { error: "User not found!" }
  }

  if (user.emailVerified) {
    return { error: "Email already verified!" }
  }

  // Generate verification token
  const verificationToken = await generateVerificationToken(email)

  // Send verification email
  await sendVerificationEmail(email, verificationToken.token)

  return { success: "Verification email sent!" }
}

export const logout = async () => {
  // The actual logout will be handled on the client side with signOut() from next-auth/react
  return { success: true }
}
