import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/makeup-artist-northern-suburbs-cape-town'
const socialImagePath = 'https://www.amymup.shop/og-image-logo.jpg'

const faqs = [
  {
    question: 'Does Amy offer makeup in Cape Town Northern Suburbs?',
    answer:
      'Yes. Amy is based in Cape Town and can support selected bookings in Northern Suburbs areas such as Durbanville, Bellville and Brackenfell by arrangement.',
  },
  {
    question: 'What kinds of bookings are available in the Northern Suburbs?',
    answer:
      'Private makeup, bridal prep, event makeup, photoshoots and selected production calls can be discussed depending on timing and location.',
  },
  {
    question: 'Can Amy travel to a home, hotel or venue?',
    answer:
      'Yes. Mobile bookings can be discussed around the date, address, number of people and the time needed for setup and makeup.',
  },
  {
    question: 'How should I enquire for a Northern Suburbs booking?',
    answer:
      'Send your suburb, date, preferred time, service type, number of people and any reference images or style notes.',
  },
]

export const metadata: Metadata = {
  title: 'Makeup Artist Northern Suburbs Cape Town',
  description:
    'Book Amy Morgenrood for makeup in Cape Town Northern Suburbs. Private makeup, bridal prep, events, photoshoots and selected production bookings in Durbanville, Bellville, Brackenfell and nearby areas.',
  keywords: [
    'makeup artist northern suburbs cape town',
    'makeup artist durbanville',
    'makeup artist bellville',
    'makeup artist brackenfell',
    'mobile makeup artist northern suburbs',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Makeup Artist Northern Suburbs Cape Town',
    description:
      'Private, bridal, event and photoshoot makeup in Durbanville, Bellville, Brackenfell and nearby Cape Town Northern Suburbs.',
    url: pageUrl,
    images: [{ url: socialImagePath, width: 1200, height: 630, alt: 'Makeup artist Northern Suburbs Cape Town' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makeup Artist Northern Suburbs Cape Town',
    description:
      'Private, bridal, event and photoshoot makeup in Durbanville, Bellville, Brackenfell and nearby Cape Town Northern Suburbs.',
    images: [socialImagePath],
  },
}

export default function NorthernSuburbsMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Makeup Artist Northern Suburbs Cape Town',
        serviceType: 'Mobile makeup services',
        description:
          'Private makeup, bridal prep, event makeup, photoshoot makeup and selected production support in Cape Town Northern Suburbs.',
        provider: { '@id': 'https://www.amymup.shop/#person' },
        areaServed: [
          { '@type': 'Place', name: 'Northern Suburbs Cape Town' },
          { '@type': 'City', name: 'Durbanville' },
          { '@type': 'City', name: 'Bellville' },
          { '@type': 'City', name: 'Brackenfell' },
        ],
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amymup.shop/' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://www.amymup.shop/service-areas' },
          { '@type': 'ListItem', position: 3, name: 'Makeup Artist Northern Suburbs Cape Town', item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="northern-suburbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Northern Suburbs"
        title="Makeup artist in Cape Town Northern Suburbs"
        description="Amy Morgenrood offers private makeup, bridal prep, event makeup, photoshoot-ready looks and selected production support in Cape Town Northern Suburbs."
        intro="This page is for clients searching for a makeup artist near Durbanville, Bellville, Brackenfell and nearby Northern Suburbs areas who need a clear way to enquire."
        locationNote="Available for selected Northern Suburbs bookings, including Durbanville, Bellville, Brackenfell and nearby Cape Town areas by enquiry."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request Booking"
        secondaryCtaHref="/private-makeup-artist-cape-town"
        secondaryCtaLabel="View Private Makeup"
        stats={[
          { label: 'Area', value: 'Northern' },
          { label: 'Booking', value: 'Private' },
          { label: 'Travel', value: 'By Quote' },
        ]}
        perfectFor={[
          {
            title: 'Private appointments',
            description:
              'Makeup for dinners, birthdays, celebrations, functions and personal glam sessions in nearby suburbs.',
          },
          {
            title: 'Bridal preparation',
            description:
              'Wedding morning makeup and trial discussions for brides getting ready in Northern Suburbs locations.',
          },
          {
            title: 'Photoshoots and content',
            description:
              'Camera-ready makeup for personal branding, portraits, content days and creative shoots.',
          },
          {
            title: 'Selected production calls',
            description:
              'Commercial or production-related makeup can be discussed where location and schedule are a fit.',
          },
        ]}
        services={[
          {
            title: 'Private makeup',
            description:
              'Soft glam, natural glam or fuller event makeup tailored to the occasion, outfit, lighting and client preference.',
          },
          {
            title: 'Bridal and event makeup',
            description:
              'Long-wear makeup for brides, bridal parties, events and special occasions in nearby areas.',
          },
          {
            title: 'Photoshoot-ready makeup',
            description:
              'Polished finishes that photograph well for portraits, campaigns, content shoots and personal branding.',
          },
          {
            title: 'Mobile booking support',
            description:
              'Travel can be quoted around suburb, call time, number of people and the setup needed on the day.',
          },
        ]}
        strengths={[
          'Targets local searches for a makeup artist in Cape Town Northern Suburbs.',
          'Useful for Durbanville, Bellville, Brackenfell and nearby private or bridal bookings.',
          'Clear enquiry process for suburb, date, timing, service type and number of people.',
          'Connects local clients to private, bridal, service area and portfolio pages.',
          'Flexible enough for private clients, brides, content shoots and selected productions.',
          'Mobile-friendly booking language without overpromising travel availability.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
