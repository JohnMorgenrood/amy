import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/bridal-makeup-artist-cape-town'
const socialImagePath = 'https://www.amymup.shop/og-image-logo.jpg'

const faqs = [
  {
    question: 'Does Amy offer bridal trials?',
    answer:
      'Yes. Bridal trials can be arranged so the final wedding-day look feels settled, flattering and suited to the dress, timing and photography style.',
  },
  {
    question: 'Can Amy do makeup for the bridal party as well?',
    answer:
      'Yes. Bridal bookings can include bridesmaids, mothers and other members of the wedding party depending on timing and the size of the booking.',
  },
  {
    question: 'Is bridal makeup suitable for photography and long wear?',
    answer:
      'Yes. The application is designed to look beautiful in person and hold up well for photos, video and the length of the day.',
  },
  {
    question: 'Does Amy travel for wedding bookings in the Western Cape?',
    answer:
      'Yes. Amy is based in Cape Town and can travel for weddings in surrounding suburbs, the Winelands and other Western Cape locations by arrangement.',
  },
]

export const metadata: Metadata = {
  title: 'Bridal Makeup Artist Cape Town',
  description:
    'Book Amy Morgenrood for bridal makeup in Cape Town. Wedding makeup trials, bridal party bookings, long-wear finishes and elegant camera-ready looks across Cape Town and the Western Cape.',
  keywords: [
    'bridal makeup artist cape town',
    'wedding makeup artist cape town',
    'bridal makeup cape town',
    'wedding makeup western cape',
    'bridal makeup stellenbosch',
    'bridal makeup somerset west',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Bridal Makeup Artist Cape Town',
    description:
      'Elegant wedding makeup in Cape Town for brides, bridal trials and bridal party bookings.',
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
    title: 'Bridal Makeup Artist Cape Town',
    description:
      'Elegant wedding makeup in Cape Town for brides, bridal trials and bridal party bookings.',
    images: [socialImagePath],
  },
}

export default function BridalMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Bridal Makeup Artist Cape Town',
        serviceType: 'Bridal and wedding makeup services',
        description:
          'Bridal makeup services in Cape Town for weddings, bridal trials, bridal parties and Western Cape venue bookings.',
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
            name: 'Bridal Makeup Artist Cape Town',
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="bridal-makeup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Bridal Makeup"
        title="Bridal makeup artist in Cape Town"
        description="Amy Morgenrood offers elegant bridal makeup in Cape Town for weddings, bridal trials and wedding mornings across the city and the wider Western Cape."
        intro="For brides planning a wedding in Cape Town or the wider Western Cape, this page gives a clear view of Amy's bridal style, trial options, wedding-day support and the easiest way to enquire."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request Bridal Quote"
        secondaryCtaHref="/portfolio/bridal"
        secondaryCtaLabel="View Bridal Portfolio"
        stats={[
          { label: 'Booking Type', value: 'Bridal' },
          { label: 'Coverage', value: 'Cape Town + WC' },
          { label: 'Finish', value: 'Long Wear' },
        ]}
        perfectFor={[
          {
            title: 'Wedding day makeup',
            description:
              'Beautiful, polished bridal looks that feel elevated in person and photograph with softness and structure.',
          },
          {
            title: 'Bridal trials',
            description:
              'A chance to refine the look in advance so the wedding morning feels settled, efficient and stress-free.',
          },
          {
            title: 'Bridal parties',
            description:
              'Coordinated but individual makeup for bridesmaids, mothers and other people included in the booking.',
          },
          {
            title: 'Destination and venue weddings',
            description:
              'Travel-friendly support for Cape Town venues, Winelands weddings and surrounding Western Cape locations.',
          },
        ]}
        services={[
          {
            title: 'Bride makeup application',
            description:
              'A tailored look built around the dress, lighting, weather, photography style and how you want to feel on the day.',
          },
          {
            title: 'Trial sessions',
            description:
              'A dedicated appointment to test, refine and settle the bridal direction well before the wedding date.',
          },
          {
            title: 'Bridal party makeup',
            description:
              'Makeup for the wider wedding party with timing structured around the run sheet of the morning.',
          },
          {
            title: 'Hair styling support',
            description:
              'Where needed, hair styling can be included or discussed as part of the quote for a smoother prep process.',
          },
        ]}
        strengths={[
          'A style that balances elegance, photography-readiness and long wear.',
          'Calm booking support for wedding mornings that already have enough moving parts.',
          'Looks tailored to skin, dress, venue, light and the overall wedding mood.',
          'Helpful for Cape Town brides planning from the city, the Winelands or further afield.',
          'A clear enquiry path so brides can quickly ask about date availability and pricing.',
          'A strong fit for brides looking for a wedding makeup artist in Cape Town with a soft, refined finish.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
