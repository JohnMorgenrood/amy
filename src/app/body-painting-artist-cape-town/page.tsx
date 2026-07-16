import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/body-painting-artist-cape-town'
const faqs = [
  {
    question: 'What body-painting briefs can Amy support?',
    answer:
      'Amy is available for branded body art, editorial concepts, events, character work and production-led body painting. The design, coverage, talent numbers and schedule determine the team and preparation required.',
  },
  {
    question: 'Can Amy paint a logo or graphic on skin?',
    answer:
      'Yes. Branded designs can be mapped to the body and refined for the intended camera angle, lighting and movement, as shown in Amy’s Hunter Kennedy fashion-shoot work.',
  },
  {
    question: 'Can additional body painters be arranged?',
    answer:
      'Yes. For large designs, multiple performers or short preparation windows, Amy can coordinate suitable artists from her trusted Cape Town network.',
  },
]

export const metadata: Metadata = {
  title: 'Body Painting Artist Cape Town | Film & Commercial',
  description:
    'Cape Town body-painting artist for film, commercials, fashion, branded body art, events and character concepts. Precise camera-ready work by Amy Morgenrood.',
  keywords: [
    'body painting artist cape town',
    'body painter cape town',
    'commercial body painting south africa',
    'logo body painting cape town',
    'film body painter south africa',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Body Painting Artist Cape Town | Amy Morgenrood',
    description:
      'Body painting and branded body art for Cape Town productions, campaigns, editorials and events.',
    url: pageUrl,
    images: ['/assets/Makeup blog/hunter kennedy 1.jpeg'],
  },
}

export default function BodyPaintingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Body Painting Artist Cape Town',
        serviceType: 'Body painting and branded body art',
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
        id="body-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Film · Fashion · Branded Art"
        title="Body painting artist in Cape Town"
        description="Precise, camera-aware body painting for productions, campaigns, fashion editorials, events and branded visual concepts."
        intro="Body painting turns skin into part of the art direction. Amy plans placement, opacity, movement and camera angles so graphic details remain clear on a three-dimensional body and can be maintained efficiently through the shoot."
        locationNote="Cape Town based and available across South Africa and internationally, with team scaling and travel arranged per production."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Send a Body-Painting Brief"
        secondaryCtaHref="/blog/hunter-kennedy-fashion-shoot-body-painting"
        secondaryCtaLabel="View the Hunter Kennedy Story"
        stats={[
          { label: 'Focus', value: 'Camera Ready' },
          { label: 'Briefs', value: 'Creative + Brand' },
          { label: 'Base', value: 'Cape Town' },
        ]}
        perfectFor={[
          {
            title: 'Branded body art',
            description:
              'Logos and graphic marks translated from flat artwork onto the contours of the body.',
          },
          {
            title: 'Film and character work',
            description:
              'Body colour, markings and concept-led applications designed around story, costume and continuity.',
          },
          {
            title: 'Fashion and editorial',
            description:
              'Creative paint treatments developed with photographers, stylists and art directors.',
          },
          {
            title: 'Events and campaigns',
            description:
              'High-impact body art for launches, live activations, campaign content and performers.',
          },
        ]}
        services={[
          {
            title: 'Design translation and placement',
            description:
              'Planning the scale, position and camera-facing read of graphics before application begins.',
          },
          {
            title: 'Skin preparation and application',
            description:
              'Professional preparation and controlled layering for even colour, clean edges and talent comfort.',
          },
          {
            title: 'On-set maintenance',
            description:
              'Efficient repairs and continuity-aware touch-ups through movement, wardrobe and repeated takes.',
          },
          {
            title: 'Team coordination',
            description:
              'Additional trusted artists can be arranged when coverage, talent numbers or timing require a larger team.',
          },
        ]}
        strengths={[
          'Experience with branded body art, fashion imagery and production-led creative makeup.',
          'Body-painting credits include Netflix Rebel Moon event work and Cape Town Carnival.',
          'Strong crossover between body painting, SFX, beauty makeup and character work.',
          'Clear communication around references, modesty, skin sensitivities, timing and removal.',
          'Trusted artist network for larger-scale or specialist body-painting briefs.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
