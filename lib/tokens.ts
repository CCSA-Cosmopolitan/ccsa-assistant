import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"

/**
 * Generates a verification token and stores it in the database
 */
export async function generateVerificationToken(email: string) {
  const token = uuidv4()
  const expires = new Date(Date.now() + 3600 * 1000) // 1 hour

  const existingToken = await db.verificationToken.findFirst({
    where: { identifier: email },
  })

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  return verificationToken
}

/**
 * Generates a password reset token and stores it in the database
 */
export async function generatePasswordResetToken(email: string) {
  const token = uuidv4()
  const expires = new Date(Date.now() + 3600 * 1000) // 1 hour

  const existingToken = await db.passwordResetToken.findFirst({
    where: { email },
  })

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}

/**
 * Verifies a verification token
 */
export async function verifyVerificationToken(token: string) {
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return null
  }

  if (verificationToken.expires < new Date()) {
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    })
    return null
  }

  return verificationToken
}

/**
 * Verifies a password reset token
 */
export async function verifyPasswordResetToken(token: string) {
  const passwordResetToken = await db.passwordResetToken.findUnique({
    where: { token },
  })

  if (!passwordResetToken) {
    return null
  }

  if (passwordResetToken.expires < new Date()) {
    await db.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    })
    return null
  }

  return passwordResetToken
}
