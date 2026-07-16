import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/international-film-production-makeup-support-cape-town'
const faqs = [
  { question: 'Can overseas productions book Amy directly in Cape Town?', answer: 'Yes. Producers, service companies, agencies and makeup departments can enquire directly with dates, locations, cast numbers, creative requirements and the role they need filled.' },
  { question: 'What information should an international producer include?', answer: 'Please include the production type, shoot dates, Cape Town locations, expected cast or talent, makeup and hair brief, working hours and whether you need an artist, assistant, standby or coordination support.' },
  { question: 'Can Amy work within an existing international makeup team?', answer: 'Yes. Amy can support visiting HODs, designers and key artists while working within their creative direction, continuity system and department structure.' },
  { question: 'Is SFX support available?', answer: 'Yes. Amy’s experience includes prosthetic application, wounds, ageing, character detail and other SFX requirements. The exact brief should be discussed before booking.' },
]

export const metadata: Metadata = {
  title: 'Film Production Makeup Support Cape Town | International Crews',
  description: 'Local Cape Town makeup and hair support for international film, TV and commercial productions. On-set artistry, continuity, SFX, standby and department assistance.',
  keywords: ['cape town film production makeup support', 'international production makeup artist cape town', 'local film crew makeup cape town', 'overseas production hair makeup cape town', 'production service makeup artist south africa'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Cape Town Makeup Support for International Productions', description: 'Experienced local makeup, hair, continuity and department support for visiting production teams.', url: pageUrl, images: ['https://www.amymup.shop/og-image-logo.jpg'] },
}

export default function InternationalProductionSupportPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Cape Town Makeup Support for International Film Productions', serviceType: 'Local film production makeup and hair support', provider: { '@id': 'https://www.amymup.shop/#person' }, areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'Country', name: 'South Africa' }], audience: { '@type': 'Audience', audienceType: 'International film, television and commercial production teams' }, url: pageUrl },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] }
  return <><Script id="international-production-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceLandingPage
    eyebrow="Local Crew Support"
    title="Cape Town makeup support for international film productions"
    description="Local makeup, hair, continuity, standby and department support for overseas producers, visiting HODs, service companies and international shoots in Cape Town."
    intro="Cape Town hosts film, television, commercial, fashion and branded productions from around the world. Amy offers local on-set knowledge and practical makeup department support to help visiting creative teams work efficiently while maintaining their approved visual direction."
    locationNote="Based in Cape Town, South Africa, and available to travel nationally or internationally for suitable productions by arrangement."
    primaryCtaHref="/#contact" primaryCtaLabel="Send an International Brief"
    secondaryCtaHref="/film-tv-commercial-makeup-artist-cape-town" secondaryCtaLabel="Production Makeup Services"
    stats={[{ label: 'Base', value: 'Cape Town' }, { label: 'Clients', value: 'Global Crews' }, { label: 'Support', value: 'On Set' }]}
    perfectFor={[
      { title: 'Visiting makeup departments', description: 'Local artist or assistant support for international HODs, designers and key artists working in Cape Town.' },
      { title: 'Production service companies', description: 'A direct route for service producers sourcing reliable local makeup, hair, continuity or standby crew.' },
      { title: 'Commercials and campaigns', description: 'Camera-ready talent preparation and efficient on-set maintenance for international brand and agency shoots.' },
      { title: 'Film and streaming productions', description: 'Department support for scripted work, character requirements, continuity systems, crowd days and location schedules.' },
    ]}
    services={[
      { title: 'Local makeup and hair crew support', description: 'Practical assistance for cast preparation, grooming, hair finishing, touch-ups and department workflows.' },
      { title: 'Continuity and standby assistance', description: 'Reference records, on-set monitoring, resets and communication that support visual consistency during production.' },
      { title: 'SFX and character work', description: 'Prosthetic application, wounds, ageing and character detail where the approved production brief requires it.' },
      { title: 'Film-shoot coordination support', description: 'For film shoots specifically: assistance with schedules, artist requirements, products, call times, paperwork and day-to-day department communication.' },
    ]}
    strengths={['Cape Town based with knowledge of local production rhythms and location work.', 'Available for South African and international production travel subject to dates, logistics and work permissions.', 'Experience on major film and television productions alongside commercial and agency work.', 'Able to support visiting creative leadership without overstating or disrupting assigned roles.', 'Combination of beauty, hair, SFX, character and continuity-aware experience.', 'Clear English communication with producers, coordinators, artists and other departments.', 'Flexible enquiries for artist, assistant, standby, day-player and junior coordination support.']}
    faqs={faqs}
  /></>
}
