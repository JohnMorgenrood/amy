import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'
const pageUrl = 'https://www.amymup.shop/wardrobe-hair-makeup-production-support-cape-town'
const faqs = [
  {
    question: 'Does Amy offer wardrobe support?',
    answer:
      'Yes. Amy can support combined wardrobe, hair and makeup briefs within the agreed scope and can bring in trusted wardrobe or styling specialists when the production requires deeper or larger-scale support.',
  },
  {
    question: 'Is this a substitute for a costume department?',
    answer:
      'No. Scripted productions with extensive costume design, builds or large cast requirements should have an appropriately staffed costume department. Amy’s service is scoped honestly around the project.',
  },
  {
    question: 'Can one contact coordinate the preparation team?',
    answer:
      'Yes. For suitable briefs, Amy can help align wardrobe, hair and makeup references, schedules and responsibilities through one coordinated production contact.',
  },
]
export const metadata: Metadata = {
  title: 'Wardrobe, Hair & Makeup Production Support Cape Town',
  description:
    'Coordinated wardrobe, hair and makeup production support in Cape Town, with trusted specialist collaborators for commercials, editorial shoots and screen projects.',
  keywords: [
    'wardrobe hair makeup cape town',
    'production styling support cape town',
    'wardrobe and makeup team south africa',
    'talent preparation team cape town',
  ],
  alternates: { canonical: pageUrl },
}
export default function WardrobeSupportPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Wardrobe, Hair and Makeup Production Support Cape Town',
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
        id="wardrobe-production-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceLandingPage
        eyebrow="Wardrobe · Hair · Makeup"
        title="Wardrobe, hair and makeup production support in Cape Town"
        description="Coordinated talent preparation for commercials, editorials, content shoots and suitable screen projects, with trusted specialists brought in when the brief requires them."
        intro="Wardrobe, hair and makeup are read together in the frame. Amy can support combined briefs and help connect these disciplines around one visual direction, while bringing in experienced wardrobe, hair or makeup collaborators when the scale or specialist detail requires a broader team."
        locationNote="Cape Town based and available for South African and international productions, with travel, scope and crew confirmed per brief."
        primaryCtaHref="/#contact"
        primaryCtaLabel="Discuss Production Support"
        secondaryCtaHref="/production-hair-makeup-team-cape-town"
        secondaryCtaLabel="Explore Team Support"
        stats={[
          { label: 'Approach', value: 'Coordinated' },
          { label: 'Crew', value: 'Specialist' },
          { label: 'Base', value: 'Cape Town' },
        ]}
        perfectFor={[
          {
            title: 'Commercial productions',
            description:
              'Aligned styling and talent preparation for TVCs, branded films and campaign stills.',
          },
          {
            title: 'Editorial and portfolio shoots',
            description: 'Wardrobe, hair and makeup choices developed around one visual direction.',
          },
          {
            title: 'Lean content teams',
            description:
              'Practical coordination for suitable briefs that need clear ownership without an oversized structure.',
          },
          {
            title: 'Visiting productions',
            description:
              'Local artist and stylist connections for teams producing work in Cape Town.',
          },
        ]}
        services={[
          {
            title: 'Brief and reference alignment',
            description:
              'Bringing wardrobe, hair and makeup references into one practical preparation plan.',
          },
          {
            title: 'Talent preparation scheduling',
            description:
              'Sequencing fittings, grooming, makeup and hair around call times and camera readiness.',
          },
          {
            title: 'Specialist collaborator sourcing',
            description:
              'Trusted professionals recommended when costume depth, complex hair or additional makeup support is required.',
          },
          {
            title: 'Shoot-day coordination',
            description:
              'Clear communication around changes, resets, continuity and ownership of preparation tasks.',
          },
        ]}
        strengths={[
          'Amy has confirmed her capability to support wardrobe alongside hair and makeup.',
          'Honest scoping ensures specialist costume work is assigned to appropriately experienced collaborators.',
          'One coordinated point of contact can simplify lean commercial and editorial briefs.',
          'Production makeup, hair, continuity and department coordination experience.',
          'Trusted Cape Town creative network for scaling the right team.',
        ]}
        faqs={faqs}
      />
    </>
  )
}
