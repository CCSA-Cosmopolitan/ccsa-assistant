"use server"
// Runtime: nodejs

import { db } from "@/lib/db"
import { getServerSession } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const CreateUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["USER", "ADMIN"]),
})

const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["USER", "ADMIN"]),
})

export async function getUsers() {
  const session = await getServerSession()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        walletBalance: true,
        createdAt: true,
        prompts: {
          select: {
            id: true,
          },
        },
      },
    })

    return {
      users: users.map((user) => ({
        ...user,
        promptsUsed: user.prompts.length,
        prompts: undefined,
      })),
    }
  } catch (error) {
    return { error: "Failed to fetch users." }
  }
}

export async function createUser(values: z.infer<typeof CreateUserSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const validatedFields = CreateUserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { name, email, password, role } = validatedFields.data

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Email already in use!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    revalidatePath("/admin/users")
    return { success: "User created successfully!" }
  } catch (error) {
    return { error: "Failed to create user." }
  }
}

export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const validatedFields = UpdateUserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { id, name, email, role } = validatedFields.data

  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return { error: "User not found!" }
    }

    // Check if email is being changed and if it's already in use
    if (email !== existingUser.email) {
      const emailInUse = await db.user.findUnique({
        where: { email },
      })

      if (emailInUse) {
        return { error: "Email already in use!" }
      }
    }

    await db.user.update({
      where: { id },
      data: { name, email, role },
    })

    revalidatePath("/admin/users")
    return { success: "User updated successfully!" }
  } catch (error) {
    return { error: "Failed to update user." }
  }
}

export async function deleteUser(id: string) {
  const session = await getServerSession()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const user = await db.user.findUnique({
      where: { id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    // Prevent admin from deleting themselves
    if (id === session.user.id) {
      return { error: "You cannot delete your own account!" }
    }

    await db.user.delete({
      where: { id },
    })

    revalidatePath("/admin/users")
    return { success: "User deleted successfully!" }
  } catch (error) {
    return { error: "Failed to delete user." }
  }
}
