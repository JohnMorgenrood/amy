import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, ArrowRight, Check, ClipboardList, Film, MessageCircle } from 'lucide-react'

const pageUrl = 'https://www.amymup.shop/makeup-department-coordinator-cape-town'
const areas = [
  'Makeup and hair department scheduling',
  'Daily call sheets and artist call times',
  'Cast and character makeup requirements',
  'Makeup continuity records and reference photographs',
  'Product, consumable and kit organisation',
  'Artist bookings and availability',
  'Department paperwork and production communication',
  'Purchase lists and petty-cash records',
  'Trailer, workstation and set organisation',
  'Liaising with production, costume and other departments',
  'Supporting HODs, key artists and department coordinators',
  'On-set makeup, hair and standby assistance',
]

const productions = ['Recipes for Love and Murder – Season 2', 'Alphas', 'Strung', 'Invisible']

export const metadata: Metadata = {
  title: 'Makeup Department Coordinator Cape Town | Amy Morgenrood',
  description: 'Cape Town film-shoot makeup department coordination support from Amy Morgenrood. Scheduling, continuity, artist requirements, kits, paperwork and on-set makeup and hair support.',
  keywords: ['makeup department coordinator cape town', 'makeup coordinator cape town', 'hair and makeup coordinator cape town', 'makeup department production support', 'makeup continuity cape town', 'film makeup assistant cape town'],
  alternates: { canonical: pageUrl },
  openGraph: { title: 'Film Makeup Department Coordination Support Cape Town', description: 'Coordination, continuity, scheduling and practical makeup department support specifically for Cape Town film shoots.', url: pageUrl, images: [{ url: 'https://www.amymup.shop/og-image-logo.jpg', width: 1200, height: 630, alt: 'Amy MUP' }] },
}

export default function MakeupCoordinatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Makeup Department Coordination and Production Support Cape Town',
    serviceType: 'Film-shoot makeup and hair department coordination support',
    provider: { '@id': 'https://www.amymup.shop/#person' },
    areaServed: [{ '@type': 'City', name: 'Cape Town' }, { '@type': 'State', name: 'Western Cape' }],
    description: 'Makeup department scheduling, continuity, artist and product organisation, production communication and practical on-set support.',
    url: pageUrl,
  }

  return <>
    <Script id="makeup-coordination-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main className="min-h-screen bg-dark-950 pb-24 pt-28 text-cream-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-gold-500/80 hover:text-gold-400"><ArrowLeft className="h-4 w-4" /> Back to productions</Link>
        <section className="py-16">
          <p className="text-xs uppercase tracking-[0.28em] text-gold-500/80">Cape Town Film &amp; Television</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-light leading-tight sm:text-6xl">Makeup Department Coordination &amp; Production Support</h1>
          <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-cream-300/75">Alongside my work as a makeup and hair artist, I have gained experience assisting with the coordination, organisation and day-to-day management of makeup departments specifically on film shoots.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3">Discuss a production <ArrowRight className="h-4 w-4" /></Link>
            <a href="https://wa.me/27847017012?text=Hi%20Amy%2C%20I%27d%20like%20to%20discuss%20makeup%20department%20support%20for%20a%20production." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 px-6 py-3 text-gold-400 hover:bg-gold-500/10"><MessageCircle className="h-4 w-4" /> WhatsApp Amy</a>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gold-500/15 bg-dark-900/60 p-7 sm:p-9"><ClipboardList className="h-7 w-7 text-gold-400" /><h2 className="mt-5 font-display text-3xl font-light">Practical and organisational experience</h2><p className="mt-5 font-light leading-relaxed text-cream-300/70">My coordination experience includes helping to manage schedules, artist requirements, continuity information, call times, kit and product organisation, production communication and the practical needs of the makeup and hair team.</p></div>
          <div className="rounded-2xl border border-gold-500/15 bg-dark-900/60 p-7 sm:p-9"><Film className="h-7 w-7 text-gold-400" /><h2 className="mt-5 font-display text-3xl font-light">Understanding both sides of set</h2><p className="mt-5 font-light leading-relaxed text-cream-300/70">Because I also work practically as an on-set artist, I understand both sides of the department: the creative work required in the chair and the organisation needed behind the scenes to keep the department running efficiently.</p></div>
        </section>

        <section className="mt-16"><p className="text-xs uppercase tracking-[0.25em] text-gold-500/80">Relevant Credits</p><h2 className="mt-4 font-display text-4xl font-light">Coordination &amp; Department Support Experience</h2><p className="mt-5 max-w-4xl font-light leading-relaxed text-cream-300/70">My production experience includes coordination, assisting and department-support responsibilities on productions such as:</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{productions.map(title => <div key={title} className="rounded-xl border border-gold-500/15 bg-dark-900/50 p-5 text-cream-100">{title}</div>)}</div><p className="mt-7 max-w-4xl font-light leading-relaxed text-cream-300/70">My exact responsibilities have varied between productions and have included assisting coordinators and senior artists, supporting department organisation, communicating production requirements, helping manage continuity and ensuring that artists, performers and required materials are prepared for the working day.</p></section>

        <section className="mt-16 rounded-2xl border border-gold-500/15 bg-dark-900/50 p-7 sm:p-10"><p className="text-xs uppercase tracking-[0.25em] text-gold-500/80">Production Services</p><h2 className="mt-4 font-display text-4xl font-light">Areas I Can Assist With</h2><div className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-2">{areas.map(area => <div key={area} className="flex gap-3 border-b border-gold-500/10 pb-4 text-cream-300/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /><span>{area}</span></div>)}</div></section>

        <section className="mt-16 text-center"><h2 className="font-display text-4xl font-light">Available for Cape Town film shoots</h2><p className="mx-auto mt-5 max-w-3xl font-light leading-relaxed text-cream-300/70">I am available on film shoots for makeup artist, hair artist, assistant, standby and department-support positions, as well as junior or assisting coordination roles. Coordination is not offered as part of bridal, private or beauty bookings.</p><Link href="/#contact" className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3">Enquire about film availability <ArrowRight className="h-4 w-4" /></Link></section>
      </div>
    </main>
  </>
}
