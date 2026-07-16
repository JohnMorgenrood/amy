import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { StoryContact } from '@/components/blog/StoryContact'

const url = 'https://www.amymup.shop/blog/corona-100-years-of-living-commercial'
export const metadata: Metadata = {
  title: 'Corona 100 Years of Living Commercial | Makeup Story',
  description: 'Behind the scenes of the Corona 100 Years of Living commercial: production makeup, camera-ready detail, continuity and on-set coordination by Cape Town makeup artist Amy Morgenrood.',
  keywords: ['Corona commercial makeup artist', 'commercial makeup artist Cape Town', 'TVC makeup artist South Africa', 'on-set makeup artist Cape Town', 'makeup continuity commercial', 'makeup department coordinator Cape Town'],
  alternates: { canonical: url },
  openGraph: { type: 'article', title: 'Behind the Makeup: Corona 100 Years of Living', description: 'A commercial makeup case study from Amy Morgenrood.', url, videos: [{ url: 'https://www.amymup.shop/assets/Makeup%20blog/Corona%20ad.mp4', type: 'video/mp4' }] },
}

export default function CoronaStoryPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'Behind the Makeup: Corona 100 Years of Living', description: metadata.description, author: { '@id': 'https://www.amymup.shop/#person' }, publisher: { '@id': 'https://www.amymup.shop/#business' }, mainEntityOfPage: url, video: { '@type': 'VideoObject', name: 'Corona 100 Years of Living commercial', description: 'Commercial featuring makeup work by Amy Morgenrood.', contentUrl: 'https://www.amymup.shop/assets/Makeup%20blog/Corona%20ad.mp4' } }
  return <>
    <Script id="corona-story-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
        <Link href="/blog" className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Journal / Commercial</Link>
        <h1 className="mt-7 font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">Behind the makeup: Corona’s “100 Years of Living” commercial</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-cream-300/75">Commercial makeup is often most successful when the audience never stops to notice it. The work lives in believable skin, controlled detail and continuity that lets the human story stay in front.</p>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <video controls playsInline preload="metadata" className="aspect-video w-full bg-black shadow-2xl" aria-label="Corona 100 Years of Living commercial"><source src="/assets/Makeup blog/Corona ad.mp4" type="video/mp4" /></video>
      </div>
      <div className="mx-auto grid max-w-5xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_260px] lg:py-28">
        <div className="space-y-12 text-base leading-8 text-cream-300/75">
          <section><h2 className="font-display text-3xl font-light text-cream-50">Serving the story, not competing with it</h2><p className="mt-5">A story-led beer commercial asks for faces that feel lived-in and authentic. That means reading the creative intention, understanding how wardrobe and lighting shape the frame, and making careful choices about texture, colour and finish. The aim is polish with character—not a look that feels disconnected from the world on screen.</p></section>
          <section><h2 className="font-display text-3xl font-light text-cream-50">The invisible skill: continuity</h2><p className="mt-5">Commercials are assembled from different angles, takes and moments. Makeup must remain coherent through those changes. A dependable on-set artist watches shine, skin finish and small visual shifts, keeps useful references and makes precise adjustments between takes without interrupting the rhythm of production.</p></section>
          <section><h2 className="font-display text-3xl font-light text-cream-50">Why coordination belongs in the creative conversation</h2><p className="mt-5">The best result starts before talent reaches the chair. Timing, call sheets, product planning, hygiene, the number of looks and the demands of the location all affect the day. Amy combines makeup artistry with a coordinator’s awareness: communicating clearly, anticipating what the team will need and protecting both the creative brief and the schedule.</p></section>
          <section><h2 className="font-display text-3xl font-light text-cream-50">What this work demonstrates</h2><p className="mt-5">For producers, agencies and production companies, this project speaks to natural camera-ready makeup, commercial set etiquette, on-set maintenance, continuity awareness and calm collaboration. These are the practical skills that allow a makeup department to become a trusted part of the wider crew.</p></section>
        </div>
        <aside className="border-t border-gold-500/20 pt-6 text-sm leading-7 text-cream-400/65 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Services for production</p><ul className="mt-5 space-y-3"><li>Commercial & TVC makeup</li><li>On-set touch-ups</li><li>Makeup continuity</li><li>Hair and grooming</li><li>Department coordination</li><li>Cape Town production support</li></ul></aside>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10"><StoryContact title="Need a commercial makeup artist who understands the whole set?" /></div>
    </article>
  </>
}
