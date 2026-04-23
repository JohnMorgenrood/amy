import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/film-tv-commercial-makeup-artist-cape-town'
const socialImagePath = 'https://www.amymup.shop/og-image-brand.jpg'

const faqs = [
  {
    question: 'Does Amy work on TV ads, branded content, and commercials?',
    answer:
      'Yes. Amy is available for TV commercials, branded content, campaign shoots, social ads, music videos and production-led commercial work in Cape Town.',
  },
  {
    question: 'Can Amy support film and TV productions on set?',
    answer:
      'Yes. On-set support can include cast prep, continuity-aware touch-ups, crowd work, day-player support, character looks and production-paced makeup changes.',
  },
  {
    question: 'Is hair support available as part of production bookings?',
    answer:
      'Yes. Depending on the brief, Amy can assist with grooming, styling support and polished finishing that fits the production schedule.',
  },
  {
    question: 'Which areas does Amy cover for production work?',
    answer:
      'Amy is based in Cape Town and can travel across the city, surrounding suburbs and the wider Western Cape by arrangement.',
  },
]

export const metadata: Metadata = {
  title: 'Film, TV and Commercial Makeup Artist Cape Town',
  description:
    'Book Amy Morgenrood for film, TV ads, commercials, branded content and on-set makeup in Cape Town. Production-ready makeup, hair support, continuity-aware service and SFX capability.',
  keywords: [
    'film makeup artist cape town',
    'tv makeup artist cape town',
    'commercial makeup artist cape town',
    'tv ads makeup artist cape town',
    'makeup artist for commercials cape town',
    'on set makeup artist cape town',
    'production makeup artist cape town',
    'film hair and makeup cape town',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Film, TV and Commercial Makeup Artist Cape Town',
    description:
      'Cape Town production makeup artist for film, TV commercials, campaigns, agencies, branded content and on-set support.',
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
    title: 'Film, TV and Commercial Makeup Artist Cape Town',
    description:
      'Cape Town production makeup artist for film, TV commercials, campaigns, agencies, branded content and on-set support.',
    images: [socialImagePath],
  },
}

export default function FilmTvCommercialPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Film, TV and Commercial Makeup Artist Cape Town',
        serviceType: 'Film, TV and commercial makeup services',
        description:
          'Production makeup, on-set support, continuity-aware touch-ups, hair support and SFX capability for film, TV ads, commercials and branded shoots in Cape Town.',
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
            name: 'Film, TV and Commercial Makeup Artist Cape Town',
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="film-tv-commercial-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Production Makeup"
        title="Film, TV and commercial makeup artist in Cape Town"
        description="Amy Morgenrood provides professional makeup support for film productions, TV ads, commercials, branded content, campaigns and agency shoots across Cape Town."
        intro="If you need a Cape Town makeup artist for a TV commercial, film production, branded shoot or agency campaign, this page gives a clear view of the kind of on-set support Amy offers and how to enquire quickly."
        locationNote="Based in Cape Town and available for productions, TVCs, campaign shoots, agency work, editorials and location work across the Western Cape."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request Production Quote"
        secondaryCtaHref="/portfolio/film"
        secondaryCtaLabel="View Film Portfolio"
        stats={[
          { label: 'Primary Focus', value: 'Film + TV' },
          { label: 'Coverage', value: 'Cape Town' },
          { label: 'Booking Type', value: 'Production' },
        ]}
        perfectFor={[
          {
            title: 'TV ads and commercials',
            description:
              'Clean, camera-ready makeup for cast, featured talent and presenters across fast-paced commercial shoot days.',
          },
          {
            title: 'Film and TV productions',
            description:
              'On-set support for scripted productions, continuity-aware touch-ups, day players and changing call sheets.',
          },
          {
            title: 'Branded content and campaigns',
            description:
              'Polished looks that sit well under close camera work while still matching the brand direction and creative brief.',
          },
          {
            title: 'Agencies and production teams',
            description:
              'A straightforward booking process for producers and coordinators who need reliability, speed and clear communication.',
          },
        ]}
        services={[
          {
            title: 'On-set cast makeup',
            description:
              'Prep, touch-ups, skin balancing, continuity support and practical day-long makeup maintenance for featured talent and cast.',
          },
          {
            title: 'Commercial grooming and beauty makeup',
            description:
              'Refined makeup for beauty ads, product launches, fashion campaigns, branded content and clean editorial-commercial crossover work.',
          },
          {
            title: 'Hair styling support',
            description:
              'Light styling, polished finishing and brief-led hair support where the production needs a makeup artist who can assist beyond skin work.',
          },
          {
            title: 'SFX and character detail',
            description:
              'Where required, Amy can incorporate wounds, ageing, prosthetic application and character-focused detail into production work.',
          },
        ]}
        strengths={[
          'Comfortable working to production schedules, call times and changing on-set demands.',
          'Clear communication for producers, coordinators, agencies and creative teams.',
          'Strong mix of beauty polish, practical set-readiness and SFX capability when needed.',
          'Cape Town based, making local travel and location work easier to arrange.',
          'Suitable for TV commercials, music videos, editorials, branded campaigns and film work.',
          'Easy booking path for both direct clients and production teams who need a quote quickly.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
