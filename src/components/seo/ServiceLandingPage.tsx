import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { TrackedContactLink } from '@/components/tracking/TrackedContactLink'

type LandingItem = {
  title: string
  description: string
}

type FaqItem = {
  question: string
  answer: string
}

type StatItem = {
  label: string
  value: string
}

type ServiceLandingPageProps = {
  eyebrow: string
  title: string
  description: string
  intro: string
  locationNote?: string
  primaryCtaHref: string
  primaryCtaLabel: string
  secondaryCtaHref: string
  secondaryCtaLabel: string
  stats: StatItem[]
  perfectFor: LandingItem[]
  services: LandingItem[]
  strengths: string[]
  faqs: FaqItem[]
}

export function ServiceLandingPage({
  eyebrow,
  title,
  description,
  intro,
  locationNote = 'Available across Cape Town and the Western Cape by enquiry.',
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  stats,
  perfectFor,
  services,
  strengths,
  faqs,
}: ServiceLandingPageProps) {
  return (
    <div className="bg-dark-950">
      <section className="relative overflow-hidden border-b border-gold-500/10 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_35%),linear-gradient(180deg,rgba(8,8,8,0.98),rgba(8,8,8,1))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
          <div>
            <span className="mb-6 inline-block text-xs uppercase tracking-[0.3em] text-gold-500/80">
              {eyebrow}
            </span>
            <h1 className="max-w-4xl font-display text-4xl font-light leading-tight text-cream-100 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-cream-300/80">
              {description}
            </p>
            <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed text-cream-400/70">
              {intro}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <TrackedContactLink
                href={primaryCtaHref}
                action="quote_click"
                label={`${eyebrow.toLowerCase().replace(/\s+/g, '_')}_hero_quote`}
                className="btn-primary inline-flex items-center gap-3"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="h-3 w-3" />
              </TrackedContactLink>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-gold-500/30 px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                <span>{secondaryCtaLabel}</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gold-500/15 bg-dark-900/60 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-gold-400/80">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.2em]">Cape Town Booking Focus</p>
            </div>
            <p className="mt-5 text-sm font-light leading-relaxed text-cream-300/75">
              {locationNote}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gold-500/10 bg-dark-950/70 p-4">
                  <p className="text-2xl font-light text-cream-100">{stat.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-cream-500/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Best Fit</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              A strong fit for clear briefs and smooth bookings
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {perfectFor.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6">
                <h3 className="font-display text-xl font-light text-cream-100">{item.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Services</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Clear deliverables for faster booking decisions
            </h2>
            <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-cream-300/75">
              Each service is described in practical terms so clients, coordinators and couples can
              quickly understand what support Amy provides on the day.
            </p>
          </div>
          <div className="grid gap-5">
            {services.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6">
                <h3 className="font-display text-xl font-light text-cream-100">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream-300/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Why Amy</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Dependable, polished, and easy to brief
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <div
                key={strength}
                className="flex items-start gap-4 rounded-[1.5rem] border border-gold-500/10 bg-dark-900/45 p-5"
              >
                <div className="mt-0.5 rounded-full border border-gold-500/25 p-2">
                  <Check className="h-3.5 w-3.5 text-gold-400" />
                </div>
                <p className="text-sm font-light leading-relaxed text-cream-300/80">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">FAQs</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Helpful before you enquire
            </h2>
          </div>
          <div className="grid gap-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6">
                <h3 className="text-base font-medium text-cream-100">{faq.question}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream-300/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gold-500/20 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(18,18,18,0.95))] p-8 text-center sm:p-10">
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border border-gold-500/20 px-4 py-2">
              <MapPin className="h-4 w-4 text-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300/80">
                Cape Town and surrounding areas
              </span>
            </div>
            <h2 className="font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Ready to book Amy for your next job?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-cream-300/75">
              Send the date, location, call time, number of people, and the kind of makeup support
              you need. The clearer the brief, the faster the quote.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <TrackedContactLink
                href={primaryCtaHref}
                action="quote_click"
                label={`${eyebrow.toLowerCase().replace(/\s+/g, '_')}_bottom_quote`}
                className="btn-primary inline-flex items-center gap-3"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="h-3 w-3" />
              </TrackedContactLink>
              <TrackedContactLink
                href="tel:+27847017012"
                action="phone_call_click"
                label={`${eyebrow.toLowerCase().replace(/\s+/g, '_')}_bottom_phone`}
                className="inline-flex items-center justify-center rounded-full border border-gold-500/30 px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                Call 084 701 7012
              </TrackedContactLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
