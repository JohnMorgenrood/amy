import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/private-makeup-artist-cape-town'
const socialImagePath = 'https://www.amymup.shop/og-image-brand.jpg'

const faqs = [
  {
    question: 'Does Amy offer mobile private makeup appointments in Cape Town?',
    answer:
      'Yes. Amy offers private makeup bookings in Cape Town for events, birthdays, dinners, content shoots and special occasions, subject to availability and travel.',
  },
  {
    question: 'What kind of private makeup looks can Amy do?',
    answer:
      'Private bookings can include natural glam, soft glam, full glam, polished event makeup and makeup designed to photograph beautifully.',
  },
  {
    question: 'Can I book hair styling with private makeup?',
    answer:
      'Yes, depending on the brief. Hair support can be discussed when you enquire so the quote reflects the full booking requirements.',
  },
  {
    question: 'Which areas around Cape Town does Amy cover?',
    answer:
      'Amy is based in Cape Town and can travel to surrounding suburbs and nearby areas in the Western Cape by arrangement.',
  },
]

export const metadata: Metadata = {
  title: 'Private Makeup Artist Cape Town',
  description:
    'Book Amy Morgenrood for private makeup appointments in Cape Town. Natural glam, soft glam, special occasion makeup, photoshoot-ready finishes and mobile bookings by enquiry.',
  keywords: [
    'private makeup artist cape town',
    'mobile makeup artist cape town',
    'makeup artist for private clients cape town',
    'special occasion makeup cape town',
    'soft glam makeup cape town',
    'natural glam makeup cape town',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Private Makeup Artist Cape Town',
    description:
      'Private makeup appointments in Cape Town for events, shoots, dinners and special occasions.',
    url: pageUrl,
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: 'Amy MUP social preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Makeup Artist Cape Town',
    description:
      'Private makeup appointments in Cape Town for events, shoots, dinners and special occasions.',
    images: [socialImagePath],
  },
}

export default function PrivateMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Private Makeup Artist Cape Town',
        serviceType: 'Private makeup appointments',
        description:
          'Private makeup services in Cape Town for events, celebrations, dinners, photoshoots and personal bookings, with mobile appointments by enquiry.',
        provider: {
          '@id': 'https://www.amymup.shop/#person',
        },
        areaServed: [
          { '@type': 'City', name: 'Cape Town' },
          { '@type': 'State', name: 'Western Cape' },
        ],
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
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
            name: 'Private Makeup Artist Cape Town',
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="private-makeup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Private Bookings"
        title="Private makeup artist in Cape Town"
        description="Amy Morgenrood offers polished private makeup appointments in Cape Town for birthdays, events, evenings out, photoshoots and personal bookings."
        intro="Whether you are booking for an event, dinner, celebration, photoshoot or personal glam session, this page explains the kinds of private makeup appointments Amy offers in Cape Town and how to enquire."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Book Private Makeup"
        secondaryCtaHref="/portfolio/beauty"
        secondaryCtaLabel="View Beauty Portfolio"
        stats={[
          { label: 'Booking Type', value: 'Private' },
          { label: 'Looks', value: 'Soft to Full' },
          { label: 'Service Area', value: 'Cape Town' },
        ]}
        perfectFor={[
          {
            title: 'Special occasions',
            description:
              'Event-ready makeup for birthdays, celebrations, date nights, matric dances, dinners and memorable personal bookings.',
          },
          {
            title: 'Photoshoots and content days',
            description:
              'Looks designed to read beautifully on camera while still feeling flattering and wearable in person.',
          },
          {
            title: 'Mobile glam appointments',
            description:
              'Simple booking support for clients who want Amy to travel to them where location and timing allow.',
          },
          {
            title: 'Natural to elevated glam',
            description:
              'From soft enhancement to more defined glam, the finish is adjusted around the person, lighting and occasion.',
          },
        ]}
        services={[
          {
            title: 'Soft glam and natural glam',
            description:
              'Balanced, polished makeup that enhances features without feeling too heavy or overworked.',
          },
          {
            title: 'Full glam event makeup',
            description:
              'More defined finishes for evening events, photoshoots, celebrations and occasions where a stronger look is right.',
          },
          {
            title: 'Camera-ready skin and finishing',
            description:
              'Product and application choices focused on longevity, flattering texture and strong performance in photos and video.',
          },
          {
            title: 'Optional hair support',
            description:
              'Hair styling can be discussed on enquiry when the booking needs a complete, ready-to-go finish.',
          },
        ]}
        strengths={[
          'A calm, easy client experience that feels personal rather than overcomplicated.',
          'Looks tailored to the person, event, lighting and outfit instead of a one-size-fits-all formula.',
          'Mobile-friendly approach for Cape Town bookings where travel makes sense.',
          'Strong crossover between beauty polish and camera-ready practical makeup.',
          'Fast booking path for clients who just need clear answers and a quote.',
          'A strong option for clients who want a private makeup artist in Cape Town with a polished, flexible approach.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
