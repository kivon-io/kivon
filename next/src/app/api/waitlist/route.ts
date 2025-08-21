import { WaitlistAdminEmail } from "@/components/emails/waitlist"
import { APP_NAME } from "@/lib/shared/constants"
import { render } from "@react-email/render"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const emailHtml = render(
      WaitlistAdminEmail({
        email,
        timestamp: new Date().toLocaleString(),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
        userAgent: request.headers.get("user-agent") || undefined,
      })
    )

    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${process.env.SEND_EMAIL_ADDRESS}>`,
      to: [process.env.TO_EMAIL_ADDRESS!],
      subject: "🎉 New Waitlist Signup - Kivon",
      html: await emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
