import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  service?: string
  date?: string
  message?: string
}

const resendApiKey = process.env.RESEND_API_KEY
const resendFromEmail = process.env.RESEND_FROM_EMAIL
const contactEmail = process.env.CONTACT_EMAIL

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  if (!resendApiKey || !resendFromEmail || !contactEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured yet.' },
      { status: 500 }
    )
  }

  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = payload.name?.trim()
  const email = payload.email?.trim()
  const phone = payload.phone?.trim()
  const service = payload.service?.trim()
  const date = payload.date?.trim()
  const message = payload.message?.trim()

  if (!name || !email || !service || !message) {
    return NextResponse.json(
      { error: 'Please complete all required fields.' },
      { status: 400 }
    )
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const resend = new Resend(resendApiKey)
  const subject = `New Booking Inquiry - ${service}`

  const details = [
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone || 'Not provided' },
    { label: 'Service Type', value: service },
    { label: 'Preferred Date', value: date || 'Not specified' },
  ]

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New Booking Inquiry</h2>
      <p style="margin: 0 0 20px;">You received a new enquiry from the Amy MUP website.</p>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tbody>
          ${details
            .map(
              (detail) => `
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; width: 140px; vertical-align: top;">
                    ${detail.label}
                  </td>
                  <td style="padding: 8px 0;">${detail.value}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
      <h3 style="margin: 0 0 8px;">Message</h3>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `

  const text = [
    'New Booking Inquiry',
    '',
    ...details.map((detail) => `${detail.label}: ${detail.value}`),
    '',
    'Message:',
    message,
  ].join('\n')

  try {
    await resend.emails.send({
      from: resendFromEmail,
      to: contactEmail,
      replyTo: email,
      subject,
      html,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend contact form error:', error)

    return NextResponse.json(
      { error: 'Unable to send your message right now.' },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
