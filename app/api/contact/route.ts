import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendContactFormEmail, sendContactConfirmationEmail } from "@/lib/mail"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const { name, email, subject, message } = validatedData

    // Send email to support team
    await sendContactFormEmail({
      name,
      email,
      subject: subject || "Contact Form Submission",
      message,
    })

    // Send confirmation email to user
    await sendContactConfirmationEmail({
      name,
      email,
    })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}