import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/makeup-artist-tv-commercials-cape-town'
const faqs = [
  {
    question: 'What commercial formats does Amy work on?',
    answer:
      'Amy supports TV commercials, branded films, campaign content, social video and stills-led advertising in Cape Town.',
  },
  {
    question: 'Can Amy provide makeup and hair for commercial talent?',
    answer:
      'Yes. Amy can cover suitable combined briefs or coordinate additional trusted artists when talent numbers, timing or specialist requirements call for a team.',
  },
  {
    question: 'Does Amy stay for on-set touch-ups?',
    answer:
      'Yes. Standby maintenance, grooming, shine control, resets and continuity can be included according to the production schedule.',
  },
]
export const metadata: Metadata = {
  title: 'Makeup Artist for TV Commercials Cape Town',
  description:
    'Cape Town TV commercial makeup artist for brands, agencies and production companies. Makeup, grooming, hair, continuity and on-set support by Amy Morgenrood.',
  keywords: [
    'makeup artist tv commercials cape town',
    'TVC makeup artist cape town',
    'advertising makeup artist south africa',
    'commercial makeup artist cape town',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'TV Commercial Makeup Artist Cape Town',
    description:
      'Production-ready makeup, grooming and on-set support for Cape Town TV commercials and branded campaigns.',
    url: pageUrl,
    images: ['/assets/Getting the Spring boks ready for the coca cola ad.jpeg'],
  },
}
export default function TvCommercialMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Makeup Artist for TV Commercials Cape Town',
        serviceType: 'TV commercial makeup, hair and grooming',
        provider: { '@id': 'https://www.amymup.shop/#person' },
        areaServed: { '@type': 'City', name: 'Cape Town' },
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }
  return (
    <>
      <Script
        id="tvc-makeup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Brands · Agencies · Production"
        title="Makeup artist for TV commercials in Cape Town"
        description="Camera-ready makeup, grooming, hair and calm on-set support for TVCs, branded films and advertising campaigns."
        intro="Commercial production needs speed, polish and consistency. Amy works from the creative brief and call sheet to prepare talent efficiently, maintain the look through multiple setups and support the edit with continuity-aware touch-ups."
        locationNote="Cape Town based and available for commercials across South Africa and internationally, with travel and additional crew arranged per production."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Send a Commercial Brief"
        secondaryCtaHref="/blog"
        secondaryCtaLabel="View Commercial Stories"
        stats={[
          { label: 'Format', value: 'TVC + Digital' },
          { label: 'Support', value: 'On Set' },
          { label: 'Base', value: 'Cape Town' },
        ]}
        perfectFor={[
          {
            title: 'TV commercials',
            description:
              'Talent preparation and standby support for broadcast and digital advertising.',
          },
          {
            title: 'Brand campaigns',
            description:
              'Consistent makeup and hair across film, stills and social campaign deliverables.',
          },
          {
            title: 'Athlete and public talent',
            description:
              'Natural grooming and discreet, efficient support for recognised personalities.',
          },
          {
            title: 'Retail and lifestyle advertising',
            description: 'Relatable camera-ready beauty for people-first commercial stories.',
          },
        ]}
        services={[
          {
            title: 'Commercial beauty and grooming',
            description:
              'Brief-led skin, makeup and grooming that remains natural under close camera work.',
          },
          {
            title: 'Hair and finishing',
            description:
              'Combined hair support for suitable briefs, with trusted specialists available when needed.',
          },
          {
            title: 'Standby and continuity',
            description:
              'Touch-ups, shine management, resets and reference-aware maintenance throughout the day.',
          },
          {
            title: 'Team planning',
            description:
              'Crew recommendations and clear coordination for larger casts, tight schedules and specialist requirements.',
          },
        ]}
        strengths={[
          'Commercial work includes Coca-Cola with Springbok talent, Corona and PEP South Africa.',
          'Additional credits include Sanlam TVC, Pavesini, Castle Double Malt and branded campaign work.',
          'Comfortable collaborating with producers, agencies, directors, wardrobe and camera teams.',
          'Production-aware approach to call times, multiple setups, weather and location conditions.',
          'Makeup department coordination experience for briefs that need wider organisational support.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
