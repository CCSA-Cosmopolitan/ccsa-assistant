"use server"
// Runtime: nodejs

import { db } from "@/lib/db"
import { getServerSession } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const UpdateProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
})

const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
})

export async function updateProfile(values: z.infer<typeof UpdateProfileSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const validatedFields = UpdateProfileSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { name } = validatedFields.data

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    revalidatePath("/settings")
    return { success: "Profile updated successfully!" }
  } catch (error) {
    return { error: "Failed to update profile." }
  }
}

export async function updatePassword(values: z.infer<typeof UpdatePasswordSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const validatedFields = UpdatePasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { currentPassword, newPassword } = validatedFields.data

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || !user.password) {
      return { error: "User not found!" }
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!passwordMatch) {
      return { error: "Current password is incorrect!" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    })

    return { success: "Password updated successfully!" }
  } catch (error) {
    return { error: "Failed to update password." }
  }
}

export async function updateProfileImage(imageUrl: string) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    })

    revalidatePath("/settings")
    return { success: "Profile image updated successfully!" }
  } catch (error) {
    return { error: "Failed to update profile image." }
  }
}

export async function addFundsToWallet(amount: number) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  if (amount <= 0) {
    return { error: "Amount must be greater than zero!" }
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { walletBalance: user.walletBalance + amount },
    })

    revalidatePath("/wallet")
    return { success: `₦${amount} added to your wallet successfully!` }
  } catch (error) {
    return { error: "Failed to add funds to wallet." }
  }
}

export async function updatePaymentGateway(gateway: "paystack" | "stripe") {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { preferredPaymentGateway: gateway },
    })

    return { success: "Payment gateway preference updated successfully!" }
  } catch (error) {
    return { error: "Failed to update payment gateway preference." }
  }
}
