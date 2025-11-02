import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const requestAccessSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = requestAccessSchema.parse(body)

    // Here you can save to database, send email, etc.
    // For now, we'll just log it and return success
    console.log("Early access requested for:", email)

    // TODO: Save to database or send confirmation email
    // You can implement database storage or email sending here

    return NextResponse.json({
      message: "Early access request submitted successfully",
      email,
    })
  } catch (error) {
    console.error("Request access error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}