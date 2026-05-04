import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/wedding-makeup-artist-stellenbosch'
const socialImagePath = 'https://www.amymup.shop/og-image-logo.jpg'

const faqs = [
  {
    question: 'Does Amy travel to Stellenbosch for wedding makeup?',
    answer:
      'Yes. Amy can travel to Stellenbosch for bridal makeup, bridal party bookings and venue wedding mornings by arrangement.',
  },
  {
    question: 'Can Amy do bridal trials before a Stellenbosch wedding?',
    answer:
      'Yes. Bridal trials can be arranged before the wedding date so the final look is settled around the dress, venue, lighting and photography style.',
  },
  {
    question: 'Can bridesmaids and mothers be included?',
    answer:
      'Yes. Wedding bookings can include the bride, bridesmaids, mothers and selected wedding party members depending on timing and group size.',
  },
  {
    question: 'What should I send for a Stellenbosch wedding quote?',
    answer:
      'Send the wedding date, venue, getting-ready location, number of people, ceremony time, trial needs and whether hair support should be discussed.',
  },
]

export const metadata: Metadata = {
  title: 'Wedding Makeup Artist Stellenbosch',
  description:
    'Book Amy Morgenrood for wedding makeup in Stellenbosch. Bridal makeup, trials, bridal party bookings and elegant long-wear looks for Stellenbosch and nearby Winelands venues.',
  keywords: [
    'wedding makeup artist stellenbosch',
    'bridal makeup stellenbosch',
    'makeup artist stellenbosch wedding',
    'stellenbosch bridal makeup artist',
    'winelands wedding makeup',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Wedding Makeup Artist Stellenbosch',
    description:
      'Bridal and wedding makeup for Stellenbosch venues, wedding mornings, trials and bridal party bookings.',
    url: pageUrl,
    images: [{ url: socialImagePath, width: 1200, height: 630, alt: 'Wedding makeup artist Stellenbosch' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Makeup Artist Stellenbosch',
    description:
      'Bridal and wedding makeup for Stellenbosch venues, wedding mornings, trials and bridal party bookings.',
    images: [socialImagePath],
  },
}

export default function StellenboschWeddingMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Wedding Makeup Artist Stellenbosch',
        serviceType: 'Wedding and bridal makeup services',
        description:
          'Wedding makeup, bridal trials and bridal party makeup for Stellenbosch and nearby Winelands wedding venues.',
        provider: { '@id': 'https://www.amymup.shop/#person' },
        areaServed: [
          { '@type': 'City', name: 'Stellenbosch' },
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
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amymup.shop/' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://www.amymup.shop/service-areas' },
          { '@type': 'ListItem', position: 3, name: 'Wedding Makeup Artist Stellenbosch', item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="stellenbosch-wedding-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Stellenbosch Weddings"
        title="Wedding makeup artist in Stellenbosch"
        description="Amy Morgenrood offers bridal and wedding makeup for Stellenbosch venues, Winelands wedding mornings, bridal trials and bridal party bookings."
        intro="This page is for brides planning a Stellenbosch wedding who need polished, long-wear makeup that photographs beautifully and feels calm on the wedding morning."
        locationNote="Available for Stellenbosch weddings, nearby Winelands venues and Cape Town based bridal trials by enquiry."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request Wedding Quote"
        secondaryCtaHref="/portfolio/bridal"
        secondaryCtaLabel="View Bridal Portfolio"
        stats={[
          { label: 'Area', value: 'Stellenbosch' },
          { label: 'Booking', value: 'Wedding' },
          { label: 'Finish', value: 'Long Wear' },
        ]}
        perfectFor={[
          {
            title: 'Stellenbosch venue weddings',
            description:
              'Makeup support for wedding mornings at estates, hotels, guest houses and private venues around Stellenbosch.',
          },
          {
            title: 'Bridal trials',
            description:
              'A trial appointment helps refine the look before the wedding so the final makeup feels settled and personal.',
          },
          {
            title: 'Bridal parties',
            description:
              'Bridesmaids, mothers and selected wedding party members can be included with timing planned around the morning schedule.',
          },
          {
            title: 'Camera-ready bridal beauty',
            description:
              'Elegant makeup designed to last through the day and read softly in photography, video and natural light.',
          },
        ]}
        services={[
          {
            title: 'Bride makeup application',
            description:
              'A tailored bridal look shaped around skin, dress, venue light, photography style and the mood of the wedding.',
          },
          {
            title: 'Trial sessions',
            description:
              'A dedicated session to test tone, coverage, lashes, longevity and the overall bridal direction.',
          },
          {
            title: 'Bridal party makeup',
            description:
              'Coordinated makeup for bridesmaids and family members, with each face kept flattering and individual.',
          },
          {
            title: 'Travel by arrangement',
            description:
              'Travel to Stellenbosch can be quoted around location, call time, group size and the wedding-day run sheet.',
          },
        ]}
        strengths={[
          'Useful for brides searching specifically for a wedding makeup artist in Stellenbosch.',
          'Calm, polished support for wedding mornings where timing and communication matter.',
          'Looks designed to feel elegant in person and photograph well across the full day.',
          'Clear quote process around venue, call time, number of people and trial requirements.',
          'Strong fit for Stellenbosch, nearby Winelands venues and Western Cape weddings.',
          'Easy path from bridal portfolio to enquiry for date availability and pricing.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
