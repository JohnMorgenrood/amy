# Contact Form Setup

The contact form now sends through **Resend** using a server-side Next.js route.

## Required Environment Variables

Add these variables locally in `.env.local` and in your Vercel project settings:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_EMAIL=
```

## What Each Variable Does

- `RESEND_API_KEY`
  Your Resend API key.
- `RESEND_FROM_EMAIL`
  The verified sender address in Resend, for example `bookings@yourdomain.com`.
- `CONTACT_EMAIL`
  The inbox that should receive contact form enquiries.

## Recommended Setup

Example:

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Amy MUP <hello@amymup.shop>
CONTACT_EMAIL=your-private-recipient-inbox
```

## Vercel Setup

1. Open your Vercel project.
2. Go to `Settings` > `Environment Variables`.
3. Add:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_EMAIL`
4. Redeploy the project.

## How It Works

- The form submits to `src/app/api/contact/route.ts`
- The API route sends the email through Resend
- The visitor's email is added as the `reply-to` address so you can respond directly

## Testing

1. Fill in the contact form on the site.
2. Submit a test enquiry.
3. Confirm the message arrives in the `CONTACT_EMAIL` inbox.
4. Use reply in your mail client and make sure it replies to the sender's email.

## Troubleshooting

If the form fails:

- Check that all three environment variables are set in Vercel
- Confirm the `RESEND_FROM_EMAIL` address is verified in Resend
- Redeploy after adding or changing env vars
- Check the Vercel function logs for `/api/contact`
