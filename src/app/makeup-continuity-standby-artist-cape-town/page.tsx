import type { Metadata } from 'next'
import Script from 'next/script'
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage'

const pageUrl = 'https://www.amymup.shop/makeup-continuity-standby-artist-cape-town'
const faqs = [
  { question: 'What does makeup continuity support include?', answer: 'Continuity support can include reference photographs, written look notes, product records, scene-aware checks, resets and communication about changes that affect a cast member’s makeup or hair.' },
  { question: 'Is Amy available for standby work on set?', answer: 'Yes. Amy is available in Cape Town for suitable standby, assistant and on-set makeup and hair roles, subject to dates, production requirements and the agreed scope.' },
  { question: 'Can Amy assist a department rather than lead it?', answer: 'Yes. Amy can work under an HOD, key artist or coordinator and support established department systems, schedules and continuity processes.' },
  { question: 'Does Amy work on commercials as well as long-form productions?', answer: 'Yes. Enquiries are welcome for film, television, commercials, branded content, music videos and other camera-led productions in Cape Town and the Western Cape.' },
]

export const metadata: Metadata = {
  title: 'Makeup Continuity & Standby Artist Cape Town',
  description: 'Cape Town makeup continuity and standby support for film, television and commercials. Reference photographs, look notes, resets, touch-ups and department assistance from Amy Morgenrood.',
  keywords: ['makeup continuity artist cape town', 'standby makeup artist cape town', 'film makeup continuity cape town', 'on set makeup standby cape town', 'makeup department assistant cape town'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Makeup Continuity & Standby Artist Cape Town', description: 'Continuity-aware makeup, hair and standby support for Cape Town screen productions.', url: pageUrl, images: ['https://www.amymup.shop/og-image-logo.jpg'] },
}

export default function ContinuityStandbyPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Makeup Continuity and Standby Artist Cape Town', serviceType: 'Makeup continuity and on-set standby support', provider: { '@id': 'https://www.amymup.shop/#person' }, areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'State', name: 'Western Cape' }], url: pageUrl },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] }
  return <><Script id="continuity-standby-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ServiceLandingPage
    eyebrow="Continuity & Standby"
    title="Makeup continuity and standby artist in Cape Town"
    description="Amy Morgenrood provides continuity-aware makeup, hair and standby support for film, television, commercials and camera-led productions in Cape Town."
    intro="Reliable continuity depends on more than taking photographs. It requires careful observations, consistent records, communication with the department and practical checks throughout the shooting day. Amy can assist established teams with both the creative work and the behind-the-scenes organisation needed to maintain a look."
    locationNote="Cape Town based and available across the city and wider Western Cape by arrangement."
    primaryCtaHref="/#contact" primaryCtaLabel="Check Standby Availability"
    secondaryCtaHref="/makeup-department-coordinator-cape-town" secondaryCtaLabel="Coordination Support"
    stats={[{ label: 'Support', value: 'Continuity' }, { label: 'Working Area', value: 'Cape Town' }, { label: 'Environment', value: 'On Set' }]}
    perfectFor={[
      { title: 'Scripted film and television', description: 'Scene-aware continuity assistance, cast checks, resets and reference records across changing shooting orders.' },
      { title: 'Commercial and branded shoots', description: 'Efficient touch-ups and visual consistency for close camera work, multiple setups and fast production days.' },
      { title: 'HODs and key artists', description: 'Practical assistance that follows the department’s established workflow, reporting lines and creative direction.' },
      { title: 'Day-player and standby cover', description: 'Additional makeup and hair capacity when departments need reliable support for specific cast, crowd or shoot days.' },
    ]}
    services={[
      { title: 'Continuity photographs and notes', description: 'Clear reference images, product details and written observations that help preserve character looks between scenes and shoot days.' },
      { title: 'On-set checks and touch-ups', description: 'Monitoring makeup and hair, managing shine, making appropriate resets and responding to changes during filming.' },
      { title: 'Cast and character preparation', description: 'Supporting call-time preparation and helping ensure performers are ready according to the approved look and schedule.' },
      { title: 'Department organisation', description: 'Assistance with products, workstations, continuity materials and day-to-day communication around department needs.' },
    ]}
    strengths={['Practical on-set makeup and hair experience alongside organisational support.', 'Comfortable assisting HODs, key artists and coordinators within an established department.', 'Continuity-aware approach to reference photography, notes, products and resets.', 'Experience with film, television, SFX, character work and camera-ready beauty.', 'Clear communication around call times, changing requirements and working priorities.', 'Available for assistant, standby, day-player and department-support enquiries.']}
    faqs={faqs}
  /></>
}
