import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { StoryContact } from '@/components/blog/StoryContact'

const url = 'https://www.amymup.shop/blog/coca-cola-springbok-rugby-commercial-makeup'

export const metadata: Metadata = {
  title: 'Coca-Cola Springbok Commercial | Makeup & Grooming',
  description: 'Amy Morgenrood prepared Siya Kolisi and fellow Springbok rugby players for camera on a Coca-Cola campaign, providing polished commercial makeup and on-set grooming.',
  keywords: [
    'Springbok commercial makeup artist',
    'Siya Kolisi makeup artist',
    'rugby commercial makeup artist South Africa',
    'men’s grooming artist Cape Town',
    'sports advertising makeup artist',
    'commercial makeup artist Cape Town',
    'TVC makeup artist South Africa',
    'on-set grooming Cape Town',
  ],
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    title: 'Coca-Cola × Springbok Talent: Commercial Makeup and Grooming',
    description: 'Behind the scenes as Amy Morgenrood prepared Siya Kolisi and fellow Springbok players for camera.',
    url,
    images: [{ url: '/assets/Getting the Spring boks ready for the coca cola ad.jpeg', alt: 'Amy Morgenrood preparing Springbok rugby players for a Coca-Cola commercial' }],
    videos: [{ url: 'https://www.amymup.shop/assets/Coca%20cola%20ad.mp4', type: 'video/mp4' }],
  },
}

export default function CocaColaSpringbokStoryPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Coca-Cola × Springbok Talent: Commercial Makeup and Grooming',
    description: metadata.description,
    image: [
      'https://www.amymup.shop/assets/Getting%20the%20Spring%20boks%20ready%20for%20the%20coca%20cola%20ad.jpeg',
      'https://www.amymup.shop/assets/Kolisi%20%26%20Amy%20Morgenrood.jpeg',
    ],
    author: { '@id': 'https://www.amymup.shop/#person' },
    publisher: { '@id': 'https://www.amymup.shop/#business' },
    mainEntityOfPage: url,
    video: {
      '@type': 'VideoObject',
      name: 'Coca-Cola commercial featuring Springbok rugby players',
      description: 'Coca-Cola campaign for which Amy Morgenrood prepared Springbok talent for camera.',
      contentUrl: 'https://www.amymup.shop/assets/Coca%20cola%20ad.mp4',
    },
  }

  return <>
    <Script id="coca-cola-springbok-story-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
        <Link href="/blog" className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Journal / Commercial & sport</Link>
        <h1 className="mt-7 max-w-4xl font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">Getting the Springboks camera-ready for Coca-Cola</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-cream-300/75">Preparing Siya Kolisi and fellow Springbok players for a commercial was an unforgettable production day—and a sharp example of how considered grooming helps sporting talent look polished without losing their natural character.</p>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <video controls playsInline preload="metadata" controlsList="nodownload" className="aspect-video w-full bg-black shadow-2xl" aria-label="Coca-Cola commercial featuring Springbok rugby players">
          <source src="/assets/Coca cola ad.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-6 py-20 text-base leading-8 text-cream-300/75 sm:px-10 lg:py-28">
        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Famous faces, natural finish</h2>
          <p className="mt-5">Sports personalities need to look recognisably themselves on screen. Commercial grooming is therefore less about transformation and more about control: well-prepared skin, an even camera-ready finish, managed shine and detail that remains convincing in close-up. The result should feel effortless, even when the work behind it is exact.</p>
        </section>
        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Working with athlete talent</h2>
          <p className="mt-5">A comfortable chair experience matters when talent is moving between wardrobe, lighting, rehearsals and camera. Amy’s approach is efficient and personable, with clear communication and respect for the production schedule. That calm rhythm helps the makeup and grooming process become part of the day rather than a delay in it.</p>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <figure className="relative min-h-[520px] overflow-hidden bg-dark-800">
            <Image src="/assets/Kolisi & Amy Morgenrood.jpeg" alt="Makeup artist Amy Morgenrood with Springbok captain Siya Kolisi" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-6 pb-5 pt-20 text-[10px] uppercase tracking-[0.22em] text-cream-100">Amy with Siya Kolisi</figcaption>
          </figure>
          <figure className="relative min-h-[520px] overflow-hidden bg-dark-800">
            <Image src="/assets/Getting the Spring boks ready for the coca cola ad.jpeg" alt="Amy Morgenrood preparing Springbok rugby players for the Coca-Cola campaign" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-6 pb-5 pt-20 text-[10px] uppercase tracking-[0.22em] text-cream-100">Behind the scenes · Camera-ready preparation</figcaption>
          </figure>
        </div>

        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Continuity at commercial pace</h2>
          <p className="mt-5">Lights, movement and repeated takes can quickly change the way skin reads on camera. On-set maintenance means watching the monitor and the person: checking shine, perspiration, grooming and consistency while making fast, unobtrusive corrections. Every touch-up serves the edit as well as the individual shot.</p>
        </section>
        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">A memorable South African production</h2>
          <p className="mt-5">Meeting and preparing some of South Africa’s most recognised rugby talent was a genuine honour for Amy. For production companies and agencies, the work also demonstrates the essentials behind dependable commercial makeup: natural men’s grooming, discretion with high-profile talent, continuity awareness and collaboration under time pressure.</p>
        </section>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <StoryContact title="Booking grooming and makeup for a sports campaign?" />
      </div>
    </article>
  </>
}
