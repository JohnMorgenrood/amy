import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const pageUrl = 'https://www.amymup.shop/production-credits'
const screenCredits = [
  ['Strung', 'Makeup & Hair Coordinator / Key Makeup & SFX Artist'],
  ['The Invisible', 'Makeup & Hair / Department Support'],
  ['Alphas', 'Key Makeup & SFX Artist'],
  ['Recipes for Love and Murder S2', 'Makeup & SFX Artist'],
  ['Shaka Zulu', 'Makeup & SFX Artist'],
  ['The Woman King', 'Makeup Artist'],
  ['American Monster S7–9', 'Hair & Makeup Artist'],
  ['Black Sails', 'Crowd Makeup Daily'],
  ['Tomb Raider', 'Crowd Makeup Daily'],
  ['The Dark Tower', 'Crowd Makeup Daily'],
  ['The Kissing Booth', 'Crowd Makeup Daily'],
  ['Troy: Fall of a City', 'Crowd Makeup Daily'],
]
const commercialCredits = [
  ['Coca-Cola × Springbok talent', 'Makeup and camera-ready grooming'],
  ['PEP Valentines', 'Makeup & Hair Artist'],
  ['Corona', 'Makeup Artist'],
  ['Sanlam TVC', 'Head Makeup Artist'],
  ['Pavesini', 'Makeup & Hair Artist'],
  ['Castle Double Malt', 'Hair & Makeup Assistant'],
  ['Bread Financial TVC', 'Hair & Makeup Assistant'],
  ['BIG JOHN – Chicken Licken', 'Assistant'],
]
const specialistCredits = [
  ['Netflix Rebel Moon event', 'Makeup Artist & Body Painter'],
  ['Cape Town Carnival', 'Body Painter'],
  ['Baas se Honne', 'Hair & Makeup / SFX Artist'],
  ['This Water – Evelyn Hart', 'Head Makeup & Hair Artist'],
]

export const metadata: Metadata = { title: 'Production Credits | Amy Morgenrood Makeup Artist', description: 'Selected film, television, commercial, SFX, body-painting and makeup department credits for Cape Town makeup artist Amy Morgenrood.', alternates: { canonical: pageUrl }, openGraph: { title: 'Amy Morgenrood Production Credits', description: 'Selected screen, commercial and specialist makeup credits.', url: pageUrl, images: ['/og-image-logo.jpg'] } }

function CreditGroup({ title, credits }: { title: string; credits: string[][] }) {
  return <section><h2 className="font-display text-3xl font-light text-cream-50">{title}</h2><div className="mt-7 divide-y divide-gold-500/10 border-y border-gold-500/10">{credits.map(([project, role]) => <div key={project} className="grid gap-2 py-5 sm:grid-cols-[1fr_1.1fr] sm:gap-8"><h3 className="text-sm font-medium text-cream-100">{project}</h3><p className="text-sm text-cream-300/65">{role}</p></div>)}</div></section>
}

export default function ProductionCreditsPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Amy Morgenrood Production Credits', url: pageUrl, mainEntity: { '@id': 'https://www.amymup.shop/#person' } }
  return <><Script id="production-credits-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="min-h-screen bg-dark-950 pt-24"><header className="mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:py-28"><p className="text-[11px] uppercase tracking-[0.32em] text-gold-400">Film · Television · Commercials</p><h1 className="mt-6 font-display text-5xl font-light leading-tight text-cream-50 sm:text-7xl">Production credits and selected work</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-cream-300/70">Amy Morgenrood’s experience spans makeup and hair coordination, key makeup, SFX, cast and crowd work, commercials, body painting and on-set department support across Cape Town productions.</p></header><div className="mx-auto grid max-w-5xl gap-20 px-6 pb-28 sm:px-10"><CreditGroup title="Film and television" credits={screenCredits} /><CreditGroup title="Commercials and campaigns" credits={commercialCredits} /><CreditGroup title="Specialist and creative work" credits={specialistCredits} /><section className="grid gap-4 border-t border-gold-500/15 pt-12 sm:grid-cols-2"><Link href="/film-tv-commercial-makeup-artist-cape-town" className="border border-gold-500/20 p-6 text-sm uppercase tracking-[0.16em] text-gold-300 hover:border-gold-400">Film & TV services →</Link><Link href="/#contact" className="border border-gold-500/20 p-6 text-sm uppercase tracking-[0.16em] text-gold-300 hover:border-gold-400">Check production availability →</Link></section></div></article></>
}
