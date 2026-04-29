import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, MessageCircle, Phone } from 'lucide-react'
import { ThankYouLeadEvent } from '@/components/tracking/ThankYouLeadEvent'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for sending a booking enquiry to Amy Morgenrood.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-950 px-4 py-32 sm:px-6 lg:px-8">
      <ThankYouLeadEvent />
      <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent" />

      <section className="relative z-10 mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center border border-gold-500/30 bg-gold-500/5">
          <CheckCircle className="h-8 w-8 text-gold-400" />
        </div>

        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-500/80">
          Enquiry Received
        </p>

        <h1 className="font-display text-4xl font-light text-cream-100 sm:text-5xl lg:text-6xl">
          Thank you for your booking enquiry.
        </h1>

        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-cream-300/75 sm:text-lg">
          Your message has been sent to Amy. She will reply as soon as possible, usually within
          24 hours. For urgent same-week bookings, call or WhatsApp directly.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <a
            href="tel:+27847017012"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-cream-100 px-6 py-3 text-xs uppercase tracking-[0.15em] text-dark-950 transition-colors duration-300 hover:bg-gold-400"
          >
            <Phone className="h-4 w-4" />
            Call Amy
          </a>
          <a
            href="https://wa.me/27847017012"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-gold-500/30 px-6 py-3 text-xs uppercase tracking-[0.15em] text-cream-100 transition-colors duration-300 hover:border-gold-500/60 hover:text-gold-300"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 text-xs uppercase tracking-[0.2em] text-cream-500/60 transition-colors duration-300 hover:text-cream-100"
        >
          Back to home
        </Link>
      </section>
    </main>
  )
}
