import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { StoryContact } from '@/components/blog/StoryContact'

const url = 'https://www.amymup.shop/blog/hunter-kennedy-fashion-shoot-body-painting'
export const metadata: Metadata = {
  title: 'Hunter Kennedy Fashion Shoot | Logo Body Painting',
  description: 'Behind the Hunter Kennedy fashion shoot and its hand-painted logo body art by Cape Town makeup artist Amy Morgenrood—precision, skin preparation and camera-ready finishing.',
  keywords: ['body painting artist Cape Town', 'logo body painting South Africa', 'fashion makeup artist Cape Town', 'editorial makeup artist Cape Town', 'creative makeup artist Cape Town', 'makeup artist fashion shoot'],
  alternates: { canonical: url },
  openGraph: { type: 'article', title: 'Hunter Kennedy Fashion Shoot: Logo Body Painting', description: 'How branded body art was made camera-ready for a fashion image.', url, images: [{ url: '/assets/Makeup blog/hunter kennedy 1.jpeg', alt: 'Hunter Kennedy fashion shoot logo body painting' }] },
}

export default function HunterKennedyStoryPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'The Hunter Kennedy Fashion Shoot: Logo Body Painting', description: metadata.description, image: ['https://www.amymup.shop/assets/Makeup%20blog/hunter%20kennedy%201.jpeg', 'https://www.amymup.shop/assets/Makeup%20blog/hunter%20kennedy%202.jpeg'], author: { '@id': 'https://www.amymup.shop/#person' }, publisher: { '@id': 'https://www.amymup.shop/#business' }, mainEntityOfPage: url }
  return <>
    <Script id="hunter-story-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
        <Link href="/blog" className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Journal / Fashion & body art</Link>
        <h1 className="mt-7 max-w-4xl font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">The Hunter Kennedy fashion shoot: a logo painted on skin</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-cream-300/75">A recognisable mark, a moving canvas and a camera waiting for every edge to be right. This body-painting detail turned branding into part of the fashion image itself.</p>
      </header>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-2">
        {[1, 2].map((number) => <div key={number} className="relative min-h-[520px] overflow-hidden bg-dark-800 sm:min-h-[700px]"><Image src={`/assets/Makeup blog/hunter kennedy ${number}.jpeg`} alt={number === 1 ? 'Hunter Kennedy model with a hand-painted logo on the back' : 'Detailed logo body painting created for the Hunter Kennedy fashion shoot'} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority={number === 1} /></div>)}
      </div>
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-20 text-base leading-8 text-cream-300/75 sm:px-10 lg:py-28">
        <section><h2 className="font-display text-3xl font-light text-cream-50">When the body becomes part of the graphic design</h2><p className="mt-5">Painting a logo on a model’s back is not simply a matter of copying a shape. The design has to account for anatomy, posture and the lens. Curves can distort a line; movement changes spacing; lighting can expose uneven texture. The artist has to translate a flat identity into a mark that still reads cleanly on a three-dimensional surface.</p></section>
        <section><h2 className="font-display text-3xl font-light text-cream-50">Preparation makes precision possible</h2><p className="mt-5">The finish begins with properly prepared skin and a clear understanding of the final framing. Placement is mapped against the body and checked from the camera’s point of view. Controlled layers help build opacity while keeping the edges crisp, and the completed paint is balanced for the lighting rather than judged only from the makeup chair.</p></section>
        <blockquote className="border-l border-gold-400 pl-7 font-display text-2xl font-light leading-10 text-cream-100">The strongest creative makeup does two jobs at once: it catches the eye and supports the idea behind the image.</blockquote>
        <section><h2 className="font-display text-3xl font-light text-cream-50">Creative work still depends on set discipline</h2><p className="mt-5">Fashion sets move quickly. A body-painting artist needs to protect the design through posing and wardrobe changes, watch for transfer, make efficient repairs and stay aligned with the photographer, stylist and creative director. Precision matters, but so do communication and an instinct for when the image is ready.</p></section>
        <section><h2 className="font-display text-3xl font-light text-cream-50">For campaigns, editorials and branded content</h2><p className="mt-5">This shoot shows the value of a makeup artist who can move beyond conventional beauty into graphic, concept-led work. Amy is available in Cape Town for logo body painting, fashion and editorial makeup, campaign beauty, branded content, lookbooks and on-set makeup support.</p></section>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10"><StoryContact title="Have a body-painting or fashion concept in mind?" /></div>
    </article>
  </>
}
