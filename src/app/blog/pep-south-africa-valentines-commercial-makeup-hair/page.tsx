import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { StoryContact } from '@/components/blog/StoryContact'

const url = 'https://www.amymup.shop/blog/pep-south-africa-valentines-commercial-makeup-hair'

export const metadata: Metadata = {
  title: 'PEP South Africa Valentines Commercial | Makeup & Hair',
  description: 'Behind Amy Morgenrood’s makeup and hair work for the PEP South Africa Valentines commercial: relatable retail beauty, campaign consistency and camera-ready finishing.',
  keywords: ['PEP South Africa commercial makeup artist', 'retail campaign makeup artist Cape Town', 'commercial hair and makeup Cape Town', 'advertising makeup artist South Africa', 'TVC makeup and hair artist', 'brand campaign makeup artist Cape Town'],
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    title: 'PEP South Africa Valentines: Commercial Makeup & Hair',
    description: 'A behind-the-scenes look at Amy Morgenrood’s makeup and hair work for a warm retail campaign.',
    url,
    videos: [{ url: 'https://www.amymup.shop/assets/portfolio/pep_southafrica_20250204_2.mp4', type: 'video/mp4' }],
  },
}

export default function PepValentinesStoryPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'PEP South Africa Valentines: Commercial Makeup and Hair',
    description: metadata.description,
    author: { '@id': 'https://www.amymup.shop/#person' },
    publisher: { '@id': 'https://www.amymup.shop/#business' },
    mainEntityOfPage: url,
    video: { '@type': 'VideoObject', name: 'PEP South Africa Valentines commercial', description: 'PEP Valentines commercial featuring makeup and hair work by Amy Morgenrood.', contentUrl: 'https://www.amymup.shop/assets/portfolio/pep_southafrica_20250204_2.mp4' },
  }

  return <>
    <Script id="pep-valentines-story-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
        <Link href="/blog" className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Journal / Retail campaign</Link>
        <h1 className="mt-7 max-w-4xl font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">PEP South Africa Valentines: beauty made to feel real</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-cream-300/75">For the PEP Valentines commercial, Amy worked as Makeup & Hair Artist—helping create an inviting, camera-ready finish suited to a warm retail story and a recognisably South African audience.</p>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <video controls playsInline preload="metadata" controlsList="nodownload" className="aspect-video w-full bg-black shadow-2xl" aria-label="PEP South Africa Valentines commercial">
          <source src="/assets/portfolio/pep_southafrica_20250204_2.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-6 py-20 text-base leading-8 text-cream-300/75 sm:px-10 lg:py-28">
        <section><h2 className="font-display text-3xl font-light text-cream-50">Commercial beauty that stays approachable</h2><p className="mt-5">Retail advertising works best when the people on screen feel relatable. Makeup needs enough polish to hold up under professional lighting without pushing the talent away from their natural character. Skin preparation, considered colour and a controlled finish all help create beauty that feels fresh, friendly and believable.</p></section>
        <section><h2 className="font-display text-3xl font-light text-cream-50">One visual language across makeup and hair</h2><p className="mt-5">Handling both makeup and hair allows the complete look to support one creative direction. Texture, shape, wardrobe and the energy of the campaign can be considered together, while practical decisions are made around timing and on-set maintenance. That cohesion is especially useful on content days where the production needs an efficient, consistent result.</p></section>
        <blockquote className="border-l border-gold-400 pl-7 font-display text-2xl font-light leading-10 text-cream-100">For a people-first campaign, polish should strengthen personality—not cover it.</blockquote>
        <section><h2 className="font-display text-3xl font-light text-cream-50">Continuity through a busy shot list</h2><p className="mt-5">Commercial scenes may be filmed out of sequence or repeated from several angles. Makeup and hair must remain consistent enough for the edit while responding to movement, heat and time under lights. Amy’s on-set work includes careful observation, efficient touch-ups and practical continuity awareness throughout the shooting day.</p></section>
        <section><h2 className="font-display text-3xl font-light text-cream-50">Makeup and hair for South African brands</h2><p className="mt-5">The PEP Valentines commercial demonstrates Amy’s ability to deliver accessible campaign beauty alongside dependable production support. She is available in Cape Town for TV commercials, retail advertising, e-commerce, branded content, campaign stills and coordinated makeup-and-hair briefs.</p></section>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10"><StoryContact title="Creating a retail or lifestyle campaign in Cape Town?" /></div>
    </article>
  </>
}
