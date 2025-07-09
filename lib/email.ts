import nodemailer from "nodemailer"

// ------- transporter (singleton) -------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

/**
 * Low-level helper that sends an email via nodemailer
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  if (!process.env.GMAIL_USER) {
    throw new Error("GMAIL_USER env var not set")
  }

  await transporter.sendMail({
    from: `"OC Exchange" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

/**
 * Sends a one-time-password (OTP) to the given recipient.
 */
export async function sendOTPEmail(to: string, otp: string) {
  const html = `
    <h2>Your OC Exchange verification code</h2>
    <p style="font-size:1.25rem;letter-spacing:2px;"><strong>${otp}</strong></p>
    <p>This code is valid for 10&nbsp;minutes. If you did not request it, please ignore this message.</p>
  `
  await sendEmail({ to, subject: "Your OC Exchange verification code", html })
}

/**
 * Sends a friendly welcome email after successful signup.
 */
export async function sendWelcomeEmail(to: string, name: string) {
  const html = `
    <h1>Welcome to OC Exchange${name ? `, ${name}` : ""}!</h1>
    <p>We're excited to have you on board. Start exploring the markets and trade securely with us.</p>
    <p>If you have any questions, just reply to this email — we’re here to help.</p>
  `
  await sendEmail({ to, subject: "Welcome to OC Exchange!", html })
}
