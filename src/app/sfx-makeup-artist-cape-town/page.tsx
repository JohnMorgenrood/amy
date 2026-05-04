import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/sfx-makeup-artist-cape-town'
const socialImagePath = 'https://www.amymup.shop/og-image-logo.jpg'

const faqs = [
  {
    question: 'Does Amy offer SFX makeup for film and TV productions?',
    answer:
      'Yes. Amy offers SFX makeup for Cape Town film, TV, commercial and creative productions, including wounds, ageing, prosthetic detail and character-led makeup.',
  },
  {
    question: 'Can Amy apply prosthetics and character effects?',
    answer:
      'Yes. Prosthetic application, scars, wounds, creature detail, horror looks and practical character effects can be discussed around the production brief.',
  },
  {
    question: 'Is SFX makeup available for private or event bookings?',
    answer:
      'Selected private, Halloween, themed event and photoshoot SFX bookings may be available depending on the concept, timing and materials required.',
  },
  {
    question: 'What should I send when enquiring about SFX makeup?',
    answer:
      'Send the date, location, call time, reference images, number of people, required effects, shoot duration and whether prosthetics or continuity support are needed.',
  },
]

export const metadata: Metadata = {
  title: 'SFX Makeup Artist Cape Town',
  description:
    'Book Amy Morgenrood for SFX makeup in Cape Town. Prosthetics, wounds, scars, ageing, horror effects, character makeup and production-ready special effects for film, TV and creative shoots.',
  keywords: [
    'sfx makeup artist cape town',
    'special effects makeup cape town',
    'prosthetic makeup artist cape town',
    'horror makeup artist cape town',
    'film sfx makeup south africa',
    'wound makeup artist cape town',
    'character makeup artist cape town',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'SFX Makeup Artist Cape Town',
    description:
      'Cape Town SFX makeup artist for prosthetics, wounds, horror effects, character makeup and production-ready special effects.',
    url: pageUrl,
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: 'Amy Morgenrood SFX makeup artist Cape Town',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SFX Makeup Artist Cape Town',
    description:
      'Cape Town SFX makeup artist for prosthetics, wounds, horror effects, character makeup and production-ready special effects.',
    images: [socialImagePath],
  },
}

export default function SfxMakeupPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'SFX Makeup Artist Cape Town',
        serviceType: 'Special effects and prosthetic makeup services',
        description:
          'SFX makeup, prosthetic application, wounds, scars, ageing, horror effects and character makeup for Cape Town productions, shoots and selected private bookings.',
        provider: {
          '@id': 'https://www.amymup.shop/#person',
        },
        areaServed: [
          { '@type': 'City', name: 'Cape Town' },
          { '@type': 'State', name: 'Western Cape' },
          { '@type': 'Country', name: 'South Africa' },
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
            name: 'SFX Makeup Artist Cape Town',
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="sfx-makeup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="SFX Makeup"
        title="SFX makeup artist in Cape Town"
        description="Amy Morgenrood provides special effects makeup, prosthetic application, wounds, scars, ageing, horror effects and character makeup for productions and creative bookings in Cape Town."
        intro="This page is for producers, directors, photographers and private clients who need practical SFX makeup in Cape Town, from subtle injury detail to stronger character and horror effects."
        locationNote="Based in Cape Town and available for film, TV, commercial, editorial, themed shoot and selected private SFX bookings across the Western Cape."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Request SFX Quote"
        secondaryCtaHref="/portfolio/sfx"
        secondaryCtaLabel="View SFX Portfolio"
        stats={[
          { label: 'Specialty', value: 'SFX' },
          { label: 'Coverage', value: 'Cape Town' },
          { label: 'Work Type', value: 'Production' },
        ]}
        perfectFor={[
          {
            title: 'Film and TV productions',
            description:
              'Practical effects for character detail, injury continuity, ageing, horror scenes and production-led makeup briefs.',
          },
          {
            title: 'Commercial and editorial shoots',
            description:
              'Controlled SFX looks for campaign concepts, branded content, music videos, fashion stories and creative photography.',
          },
          {
            title: 'Horror and character work',
            description:
              'Creature, undead, gore, scars, wounds and transformation looks shaped around the story, lighting and camera distance.',
          },
          {
            title: 'Selected private bookings',
            description:
              'Themed events, Halloween concepts and personal shoots can be quoted when the brief, timing and materials are clear.',
          },
        ]}
        services={[
          {
            title: 'Wounds, scars and injury detail',
            description:
              'Cuts, bruising, blood work, scars and injury effects designed to fit the scene, continuity needs and camera setup.',
          },
          {
            title: 'Prosthetic application',
            description:
              'Application and blending of prosthetic pieces for character work, horror effects, ageing and transformation briefs.',
          },
          {
            title: 'Ageing and character makeup',
            description:
              'Makeup detail for believable character shifts, texture, skin tone changes, tiredness, grime, ageing and story-led looks.',
          },
          {
            title: 'On-set SFX support',
            description:
              'Production-paced application, touch-ups and continuity-minded maintenance for shoot days where effects need to hold.',
          },
        ]}
        strengths={[
          'Clear SFX quoting based on references, call time, location, materials and number of looks.',
          'Practical understanding of how effects need to read on camera, not only in still photos.',
          'A mix of beauty, film makeup and SFX skill, useful when a look needs both polish and impact.',
          'Cape Town based for local productions, agencies, music videos, editorials and creative shoots.',
          'Portfolio-backed experience with prosthetics, wounds, horror characters and creature-style effects.',
          'A direct enquiry path for producers and clients who need fast availability and quote feedback.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
