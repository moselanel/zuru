import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // For now, log the contact submission
    // In production, integrate with an email service like Resend, SendGrid, or Postmark
    console.log("[v0] Contact form submission:", {
      to: "info@azizes.co.za",
      from: email,
      name,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Zuru Contact <noreply@zuru.africa>',
    //   to: 'info@azizes.co.za',
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    )
  }
}
