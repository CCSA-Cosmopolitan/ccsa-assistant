import nodemailer from "nodemailer"

// Create transporter using Google SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verify?token=${token}`

  await transporter.sendMail({
    from: `"CCSA FarmAI" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Confirm your email address",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16A34A; text-align: center;">CCSA FarmAI</h1>
        <h2>Confirm your email address</h2>
        <p>Thank you for signing up for CCSA FarmAI. Please confirm your email address by clicking the link below.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${confirmLink}" style="background-color: #16A34A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Confirm Email
          </a>
        </div>
        <p>If you didn't sign up for CCSA FarmAI, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`

  await transporter.sendMail({
    from: `"CCSA FarmAI" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16A34A; text-align: center;">CCSA FarmAI</h1>
        <h2>Reset your password</h2>
        <p>We received a request to reset your password. Click the button below to create a new password.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetLink}" style="background-color: #16A34A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  })
}
