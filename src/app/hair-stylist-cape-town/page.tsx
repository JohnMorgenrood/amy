import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/hair-stylist-cape-town'
const faqs = [
  { question: 'What types of hair styling does Amy offer?', answer: 'Amy offers polished styling, updos, waves, curls, period and character support, set-ready finishing and wig application depending on the brief.' },
  { question: 'Is hair styling available for film productions?', answer: 'Yes. Amy is available for suitable production hair roles, character and period styling support, cast preparation, standby assistance and wig application.' },
  { question: 'Can I book both makeup and hair?', answer: 'Yes. Combined makeup and hair bookings are available when the number of people, timing and complexity can be handled properly by one artist or an agreed team.' },
  { question: 'Does Amy travel for bridal or private hair appointments?', answer: 'Mobile appointments are available across Cape Town and selected Western Cape areas, subject to the date, location, schedule and travel requirements.' },
]

export const metadata: Metadata = {
  title: 'Hair Stylist Cape Town | Film, Editorial, Bridal & Private',
  description: 'Cape Town hair stylist for film productions, editorials, bridal mornings and private appointments. Styling, updos, period hair, set support and wig application.',
  keywords: ['hair stylist cape town', 'film hair stylist cape town', 'editorial hair stylist cape town', 'bridal hair stylist cape town', 'period hair stylist cape town', 'wig application cape town', 'mobile hair stylist cape town'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Hair Stylist Cape Town | Amy Morgenrood', description: 'Hair styling for Cape Town productions, editorials, bridal mornings and private bookings.', url: pageUrl, images: ['https://www.amymup.shop/og-image-logo.jpg'] },
}

export default function HairStylistPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Hair Stylist Cape Town', serviceType: 'Production, editorial, bridal and private hair styling', provider: { '@id': 'https://www.amymup.shop/#person' }, areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'State', name: 'Western Cape' }], url: pageUrl },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] }
  return <><Script id="hair-stylist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceLandingPage
    eyebrow="Production · Editorial · Bridal"
    title="Hair stylist in Cape Town"
    description="Professional hair styling support for film productions, editorials, bridal mornings and private appointments, including polished finishing, period styling and wig application."
    intro="Hair needs to suit the person, the brief and the working environment. Amy offers considered styling for camera, events and private clients, with practical preparation and an honest assessment of what can be achieved within the available time."
    locationNote="Mobile across Cape Town, with wider Western Cape travel available by arrangement."
    primaryCtaHref="/#contact" primaryCtaLabel="Request Hair Styling"
    secondaryCtaHref="/film-tv-commercial-makeup-artist-cape-town" secondaryCtaLabel="Production Hair & Makeup"
    stats={[{ label: 'Services', value: 'Hair + Makeup' }, { label: 'Bookings', value: 'Mobile' }, { label: 'Base', value: 'Cape Town' }]}
    perfectFor={[
      { title: 'Film and television', description: 'Cast preparation, character and period support, set-ready finishing, standby assistance and wig application.' },
      { title: 'Editorials and campaigns', description: 'Polished or creative styling designed around the wardrobe, makeup, art direction and intended frame.' },
      { title: 'Bridal mornings', description: 'Long-wearing bridal styling and updos planned around the dress, veil, accessories and wedding timeline.' },
      { title: 'Private appointments', description: 'Waves, curls, updos and polished finishing for events, functions, dinners, shoots and special occasions.' },
    ]}
    services={[
      { title: 'Styling and updos', description: 'Structured or soft upstyles, curls, waves and polished finishing shaped around the client and occasion.' },
      { title: 'Period and character hair', description: 'Brief-led styling support for characters, historical references and production continuity requirements.' },
      { title: 'On-set hair support', description: 'Preparation, finishing, maintenance and practical assistance around production schedules and camera needs.' },
      { title: 'Wig application', description: 'Careful wig preparation and application for suitable production, character and private creative briefs.' },
    ]}
    strengths={['Combined makeup and hair capability for briefs that benefit from one point of contact.', 'Production-aware approach to schedules, continuity and on-set maintenance.', 'Styling options for polished contemporary, bridal, editorial and period looks.', 'Clear planning around hair length, texture, references, accessories and timing.', 'Mobile service across Cape Town for appropriate bookings.', 'Additional artists can be discussed when the schedule or party size requires a team.']}
    faqs={faqs}
  /></>
}
