import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/bridal-makeup-artist-winelands'
const socialImagePath = 'https://www.amymup.shop/og-image-logo.jpg'

const faqs = [
  {
    question: 'Does Amy offer bridal makeup in the Cape Winelands?',
    answer:
      'Yes. Amy can travel for selected Winelands bridal bookings, venue weddings and wedding mornings by arrangement.',
  },
  {
    question: 'Which Winelands areas can be discussed?',
    answer:
      'Bookings around Stellenbosch, Franschhoek, Paarl and nearby Western Cape venue areas can be discussed depending on the date, timing and travel.',
  },
  {
    question: 'Can a bridal party be included?',
    answer:
      'Yes. Bridal party makeup can be quoted around the number of people, ceremony time and the getting-ready schedule.',
  },
  {
    question: 'Is the makeup suitable for outdoor venue photography?',
    answer:
      'Yes. Bridal makeup is planned around longevity, natural light, photography and the practical timing of the wedding day.',
  },
]

export const metadata: Metadata = {
  title: 'Bridal Makeup Artist Winelands',
  description:
    'Book Amy Morgenrood for bridal makeup in the Cape Winelands. Wedding makeup, trials, bridal party bookings and long-wear looks for Stellenbosch, Franschhoek, Paarl and nearby venues.',
  keywords: [
    'bridal makeup artist winelands',
    'wedding makeup winelands',
    'bridal makeup franschhoek',
    'bridal makeup paarl',
    'winelands makeup artist',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Bridal Makeup Artist Winelands',
    description:
      'Elegant bridal makeup for Cape Winelands weddings, venue mornings, bridal trials and bridal parties.',
    url: pageUrl,
    images: [{ url: socialImagePath, width: 1200, height: 630, alt: 'Bridal makeup artist Winelands' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridal Makeup Artist Winelands',
    description:
      'Elegant bridal makeup for Cape Winelands weddings, venue mornings, bridal trials and bridal parties.',
    images: [socialImagePath],
  },
}

export default function WinelandsBridalMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Bridal Makeup Artist Winelands',
        serviceType: 'Bridal makeup services',
        description:
          'Bridal makeup, trials and bridal party makeup for Cape Winelands weddings and Western Cape venue bookings.',
        provider: { '@id': 'https://www.amymup.shop/#person' },
        areaServed: [
          { '@type': 'Place', name: 'Cape Winelands' },
          { '@type': 'City', name: 'Stellenbosch' },
          { '@type': 'City', name: 'Franschhoek' },
          { '@type': 'City', name: 'Paarl' },
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
          { '@type': 'ListItem', position: 3, name: 'Bridal Makeup Artist Winelands', item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="winelands-bridal-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Winelands Bridal"
        title="Bridal makeup artist for Cape Winelands weddings"
        description="Amy Morgenrood offers bridal makeup for Cape Winelands weddings, including trials, wedding-day makeup, bridal parties and long-wear camera-ready finishes."
        intro="This page helps brides planning a Winelands wedding understand Amy's bridal makeup support, travel considerations and the easiest way to request a quote."
        locationNote="Available for selected Cape Winelands wedding bookings, including Stellenbosch, Franschhoek, Paarl and surrounding venue areas by enquiry."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request Bridal Quote"
        secondaryCtaHref="/bridal-makeup-artist-cape-town"
        secondaryCtaLabel="View Bridal Services"
        stats={[
          { label: 'Region', value: 'Winelands' },
          { label: 'Service', value: 'Bridal' },
          { label: 'Travel', value: 'By Quote' },
        ]}
        perfectFor={[
          {
            title: 'Venue weddings',
            description:
              'Bridal makeup for Winelands estates, hotels, guest houses and outdoor venue mornings.',
          },
          {
            title: 'Destination-style weddings',
            description:
              'Support for brides planning from Cape Town, elsewhere in South Africa or abroad.',
          },
          {
            title: 'Bridal parties',
            description:
              'Coordinated makeup for bridesmaids, mothers and wedding party members where timing allows.',
          },
          {
            title: 'Photography-led beauty',
            description:
              'Looks designed for natural light, outdoor photos, close portraits and long wedding-day wear.',
          },
        ]}
        services={[
          {
            title: 'Bridal makeup',
            description:
              'A refined bridal look built around the dress, venue, photography style, weather and how the bride wants to feel.',
          },
          {
            title: 'Trial appointments',
            description:
              'A chance to refine coverage, skin finish, eye detail, lashes and longevity before the wedding date.',
          },
          {
            title: 'Wedding party makeup',
            description:
              'Makeup for bridesmaids, mothers and selected guests with a smooth plan around the run sheet.',
          },
          {
            title: 'Travel planning',
            description:
              'Quotes can account for venue distance, early call times, parking/access and the size of the booking.',
          },
        ]}
        strengths={[
          'Targets brides searching for a bridal makeup artist in the Winelands specifically.',
          'Clear travel-aware quote process for venues outside central Cape Town.',
          'Bridal looks balanced for real life, photography, video and outdoor venue light.',
          'Helpful for Stellenbosch, Franschhoek, Paarl and nearby Western Cape venue bookings.',
          'Simple enquiry path for dates, venue details, trial needs and bridal party size.',
          'Direct link back to the main bridal service page and bridal portfolio.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
