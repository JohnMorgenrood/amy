import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowRight, MapPin } from 'lucide-react'

const areas = [
  {
    name: 'Cape Town CBD',
    description: 'Production bookings, hotels, events, private makeup and central location work.',
  },
  {
    name: 'Durbanville',
    description: 'Private bookings, bridal preparation and nearby suburban appointments.',
  },
  {
    name: 'Bellville and Brackenfell',
    description: 'Accessible for private clients, bridal mornings and selected production calls.',
  },
  {
    name: 'Stellenbosch',
    description: 'Popular for bridal bookings, venue weddings and surrounding Winelands shoots.',
  },
  {
    name: 'Somerset West',
    description: 'Wedding bookings, events and selected creative or commercial shoots.',
  },
  {
    name: 'Sea Point and Atlantic Seaboard',
    description: 'Well suited to campaigns, editorials, hotels, events and client-ready glam.',
  },
  {
    name: 'Southern Suburbs',
    description: 'Convenient for private appointments, events and production-related calls.',
  },
  {
    name: 'Wider Western Cape',
    description: 'Travel can be arranged for the right booking, location and schedule.',
  },
]

export const metadata: Metadata = {
  title: 'Cape Town Makeup Artist Service Areas',
  description:
    'Amy Morgenrood offers makeup services across Cape Town, Durbanville, Bellville, Brackenfell, Stellenbosch, Somerset West, Sea Point, the Southern Suburbs and the wider Western Cape by enquiry.',
  keywords: [
    'makeup artist durbanville',
    'makeup artist bellville',
    'makeup artist brackenfell',
    'makeup artist stellenbosch',
    'makeup artist somerset west',
    'makeup artist sea point',
    'mobile makeup artist western cape',
  ],
  alternates: {
    canonical: 'https://www.amymup.shop/service-areas',
  },
  openGraph: {
    title: 'Cape Town Makeup Artist Service Areas',
    description:
      'Makeup services across Cape Town, the Winelands, nearby suburbs and the wider Western Cape by enquiry.',
    url: 'https://www.amymup.shop/service-areas',
  },
}

export default function ServiceAreasPage() {
  const pageUrl = 'https://www.amymup.shop/service-areas'
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Cape Town Makeup Artist Service Areas',
        description:
          'Service areas for Amy Morgenrood across Cape Town, nearby suburbs and the Western Cape.',
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#areas`,
        itemListElement: areas.map((area, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: area.name,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.amymup.shop/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Service Areas',
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-dark-950">
      <Script
        id="service-areas-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative overflow-hidden border-b border-gold-500/10 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_35%),linear-gradient(180deg,rgba(8,8,8,0.98),rgba(8,8,8,1))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500/80">
            Service Areas
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-light leading-tight text-cream-100 sm:text-5xl lg:text-6xl">
            Makeup services across Cape Town and nearby areas
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-cream-300/80">
            Amy works across Cape Town for film, TV, commercials, bridal bookings, private
            appointments, editorials and events. Travel beyond central areas is available by
            enquiry.
          </p>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Coverage</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Areas Amy regularly supports
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-cream-300/75">
              Coverage depends on the booking type, schedule and travel involved, but these are the
              areas Amy most commonly supports for production, bridal and private makeup work.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {areas.map((area) => (
              <div key={area.name} className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6">
                <div className="flex items-center gap-3 text-gold-400/80">
                  <MapPin className="h-4 w-4" />
                  <h3 className="font-display text-xl font-light text-cream-100">{area.name}</h3>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold-500/10 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Popular Services</span>
            <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Explore the type of booking you need
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-cream-300/75">
              If you already know the kind of makeup support you need, these pages make it easier
              to jump straight to the most relevant service.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/film-tv-commercial-makeup-artist-cape-town"
              className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6 transition-colors duration-300 hover:border-gold-500/25"
            >
              <h3 className="font-display text-xl font-light text-cream-100">
                Production Makeup
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                For film, TV commercials, branded content, editorials and agency-facing shoots in Cape Town.
              </p>
            </Link>
            <Link
              href="/private-makeup-artist-cape-town"
              className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6 transition-colors duration-300 hover:border-gold-500/25"
            >
              <h3 className="font-display text-xl font-light text-cream-100">Private Makeup</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                For events, celebrations, dinners, personal bookings and polished mobile glam appointments.
              </p>
            </Link>
            <Link
              href="/bridal-makeup-artist-cape-town"
              className="rounded-[1.75rem] border border-gold-500/10 bg-dark-900/45 p-6 transition-colors duration-300 hover:border-gold-500/25"
            >
              <h3 className="font-display text-xl font-light text-cream-100">Bridal Makeup</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                For wedding mornings, bridal trials, bridal parties and Western Cape venue bookings.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gold-500/20 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(18,18,18,0.95))] p-8 text-center sm:p-10">
            <h2 className="font-display text-3xl font-light text-cream-100 sm:text-4xl">
              Need Amy in your area?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-cream-300/75">
              Send the suburb, venue, date and type of booking. Amy can confirm whether travel is
              suitable and quote accordingly.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/#contact" className="btn-primary inline-flex items-center gap-3">
                <span>Request Booking</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/film-tv-commercial-makeup-artist-cape-town"
                className="inline-flex items-center justify-center rounded-full border border-gold-500/30 px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                View Production Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
