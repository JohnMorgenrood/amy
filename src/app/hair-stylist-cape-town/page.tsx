import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/hair-stylist-cape-town'
const faqs = [
  { question: 'What types of hair styling does Amy offer?', answer: 'Amy offers polished styling, updos, waves, curls, period and character support, set-ready finishing and wig application depending on the brief.' },
  { question: 'Is hair styling available for film productions?', answer: 'Yes. Amy is available for suitable production hair roles, character and period styling support, cast preparation, standby assistance and wig application.' },
  { question: 'Can I book both makeup and hair?', answer: 'Yes. Combined makeup and hair bookings are available when the number of people, timing and complexity can be handled properly by one artist or an agreed team.' },
  { question: 'Can Amy arrange additional or specialist hair and makeup artists?', answer: 'Yes. Amy has built trusted working relationships with highly skilled Cape Town hair and makeup artists. When a brief calls for another speciality, more hands or a larger talent schedule, she can recommend and coordinate suitable collaborators so the team is matched to the production and works to one clear standard.' },
  { question: 'Does Amy travel for production or private hair bookings?', answer: 'Yes. Mobile and location bookings are available across Cape Town and selected Western Cape areas, subject to the date, call time, location, schedule and travel requirements.' },
]

export const metadata: Metadata = {
  title: 'Hair Stylist Cape Town | Film, Commercial & Editorial',
  description: 'Cape Town hair stylist and trusted hair and makeup team support for film, television, commercials, editorials, campaigns and actor portfolio shoots.',
  keywords: ['hair stylist cape town', 'film hair stylist cape town', 'editorial hair stylist cape town', 'commercial hair stylist cape town', 'campaign hair stylist cape town', 'period hair stylist cape town', 'wig application cape town', 'mobile hair stylist cape town', 'hair and makeup team cape town', 'production hair crew cape town'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Hair Stylist Cape Town | Amy Morgenrood', description: 'Hair styling and trusted team support for Cape Town productions, commercials, editorials and portfolio shoots.', url: pageUrl, images: ['https://www.amymup.shop/og-image-logo.jpg'] },
}

export default function HairStylistPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Hair Stylist Cape Town', serviceType: 'Film, television, commercial, editorial and portfolio hair styling', provider: { '@id': 'https://www.amymup.shop/#person' }, areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'State', name: 'Western Cape' }], url: pageUrl },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] }
  return <><Script id="hair-stylist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceLandingPage
    eyebrow="Production · Commercial · Editorial"
    title="Hair stylist in Cape Town"
    description="Professional hair styling support for film, television, commercials, editorials and portfolio shoots, including polished finishing, period styling, on-set maintenance and wig application."
    intro="Hair needs to suit the person, the brief and the working environment. Amy offers considered styling for camera, events and private clients, backed by a trusted professional network. When a project needs a different specialist skill, a larger team or simultaneous talent preparation, she can bring together the right hair and makeup collaborators while keeping communication, creative direction and quality consistent."
    locationNote="Mobile across Cape Town, with wider Western Cape travel available by arrangement."
    primaryCtaHref="/#contact" primaryCtaLabel="Request Hair Styling"
    secondaryCtaHref="/film-tv-commercial-makeup-artist-cape-town" secondaryCtaLabel="Production Hair & Makeup"
    stats={[{ label: 'Services', value: 'Hair + Makeup' }, { label: 'Bookings', value: 'Mobile' }, { label: 'Base', value: 'Cape Town' }]}
    perfectFor={[
      { title: 'Film and television', description: 'Cast preparation, character and period support, set-ready finishing, standby assistance and wig application.' },
      { title: 'Editorials and campaigns', description: 'Polished or creative styling designed around the wardrobe, makeup, art direction and intended frame.' },
      { title: 'Actor portfolios and still shoots', description: 'Natural, polished hair shaped to support headshots, casting portfolios, agency tests and professional portrait sessions.' },
      { title: 'Private appointments', description: 'Waves, curls, updos and polished finishing for events, functions, dinners, shoots and special occasions.' },
    ]}
    services={[
      { title: 'Styling and updos', description: 'Structured or soft upstyles, curls, waves and polished finishing shaped around the client and occasion.' },
      { title: 'Period and character hair', description: 'Brief-led styling support for characters, historical references and production continuity requirements.' },
      { title: 'On-set hair support', description: 'Preparation, finishing, maintenance and practical assistance around production schedules and camera needs.' },
      { title: 'Wig application', description: 'Careful wig preparation and application for suitable production, character and private creative briefs.' },
      { title: 'Collaborative hair and makeup teams', description: 'Access to trusted Cape Town artists for specialist techniques, larger cast or client numbers, parallel preparation and briefs that benefit from a carefully selected team.' },
    ]}
    strengths={['Combined makeup and hair capability for briefs that benefit from one point of contact.', 'Production-aware approach to schedules, continuity and on-set maintenance.', 'Styling options for polished contemporary, commercial, editorial and period looks.', 'Clear planning around hair length, texture, references, accessories and timing.', 'Mobile service across Cape Town for appropriate bookings.', 'Trusted relationships with highly skilled hair and makeup professionals allow Amy to scale a team or bring in the right specialist for the brief.', 'One coordinated point of contact helps keep references, timings, responsibilities and finish consistent across the team.']}
    faqs={faqs}
  /></>
}
