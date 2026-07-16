import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/commercial-editorial-makeup-artist-cape-town'
const faqs = [
  { question: 'Does Amy work with agencies and production companies?', answer: 'Yes. Amy is available for agency bookings, commercial productions, branded content, campaigns, lookbooks and editorial shoots in Cape Town.' },
  { question: 'Can makeup be adapted for high-resolution camera work?', answer: 'Yes. Product choice, skin preparation and finishing are adapted to the camera format, lenses, lighting, creative direction and expected shooting conditions.' },
  { question: 'Is Amy available for e-commerce and content days?', answer: 'Yes. Amy can support efficient e-commerce shoots, campaign content days and multiple-look schedules where consistency and fast changes matter.' },
  { question: 'Can hair styling be included?', answer: 'Yes. Makeup and hair support can be discussed together depending on the brief, talent numbers, schedule and complexity of the required looks.' },
]

export const metadata: Metadata = {
  title: 'Commercial & Editorial Makeup Artist Cape Town',
  description: 'Commercial and editorial makeup artist in Cape Town for agencies, campaigns, lookbooks, e-commerce, branded content and camera-ready beauty shoots.',
  keywords: ['commercial makeup artist cape town', 'editorial makeup artist cape town', 'agency makeup artist cape town', 'campaign makeup artist cape town', 'ecommerce makeup artist cape town', 'makeup artist branded content cape town'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Commercial & Editorial Makeup Artist Cape Town', description: 'Camera-ready makeup support for Cape Town agencies, brands, campaigns, editorials and e-commerce shoots.', url: pageUrl, images: ['https://www.amymup.shop/og-image-logo.jpg'] },
}

export default function CommercialEditorialPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Commercial and Editorial Makeup Artist Cape Town', serviceType: 'Commercial and editorial makeup services', provider: { '@id': 'https://www.amymup.shop/#person' }, areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'State', name: 'Western Cape' }], url: pageUrl },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] }
  return <><Script id="commercial-editorial-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceLandingPage
    eyebrow="Agencies · Brands · Editorials"
    title="Commercial and editorial makeup artist in Cape Town"
    description="Reliable, camera-ready makeup for agencies, campaigns, editorials, lookbooks, e-commerce shoots and branded content teams across Cape Town."
    intro="Commercial and editorial sets need polish without slowing down the day. Amy works from the creative brief, lighting and camera requirements to deliver consistent skin, efficient changes and makeup that holds up through close camera work."
    locationNote="Cape Town based and available for studio and location shoots across the Western Cape by arrangement."
    primaryCtaHref="/#contact" primaryCtaLabel="Send a Commercial Brief"
    secondaryCtaHref="/film-tv-commercial-makeup-artist-cape-town" secondaryCtaLabel="View Production Services"
    stats={[{ label: 'Clients', value: 'Agencies' }, { label: 'Focus', value: 'Camera Ready' }, { label: 'Location', value: 'Cape Town' }]}
    perfectFor={[
      { title: 'Advertising campaigns', description: 'Brief-led makeup for commercial stills, TVCs, launch campaigns and branded visual content.' },
      { title: 'Editorials and lookbooks', description: 'Beauty, fashion and concept-led looks developed to complement styling, lighting and art direction.' },
      { title: 'E-commerce shoots', description: 'Consistent, efficient grooming and makeup for product-led shoots, multiple models and busy shot lists.' },
      { title: 'Content and test days', description: 'Polished skin and adaptable looks for portfolios, agency tests, social campaigns and creator content.' },
    ]}
    services={[
      { title: 'Camera-ready beauty makeup', description: 'Skin preparation and refined makeup designed to read naturally in person and remain polished under modern high-resolution cinema and stills cameras.' },
      { title: 'Brand and campaign consistency', description: 'Repeatable makeup choices that stay aligned across talent, setups, deliverables and consecutive shoot days.' },
      { title: 'Editorial and creative looks', description: 'From clean beauty to more directional concepts, developed in collaboration with the wider creative team.' },
      { title: 'On-set maintenance', description: 'Touch-ups, shine control, quick changes and continuity-aware support throughout the working day.' },
    ]}
    strengths={['Comfortable working with producers, agencies, photographers and creative directors.', 'Efficient preparation and touch-ups around commercial shot lists and schedules.', 'Strong balance of natural polish, beauty makeup and character-led detail.', 'Hair styling support can be included where the brief and schedule allow.', 'Clear communication before the shoot about talent, timings, references and kit needs.', 'Available for studio, location, campaign, e-commerce and branded content work.']}
    faqs={faqs}
  /></>
}
