import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogStorySlider } from '@/components/blog/BlogStorySlider'

export const metadata: Metadata = {
  title: 'Makeup Artist Journal | Commercial & Editorial Work',
  description: 'Behind the scenes with Cape Town makeup artist Amy Morgenrood: commercial makeup, fashion shoots, body painting, continuity and production coordination.',
  alternates: { canonical: 'https://www.amymup.shop/blog' },
  openGraph: { title: 'The Makeup Chair: Stories from Set', description: 'Commercial, fashion and body-painting stories from Cape Town makeup artist Amy Morgenrood.', url: 'https://www.amymup.shop/blog', images: ['/assets/Makeup blog/hunter kennedy 1.jpeg'] },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold-400">The makeup chair · Stories from set</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">Craft, character and the work behind the frame.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-cream-300/70">Selected commercial and editorial work by Cape Town makeup artist Amy Morgenrood—shared through the practical decisions, collaboration and small details that make an image work.</p>
      </header>
      <section aria-label="Featured makeup stories"><BlogStorySlider /></section>
      <section className="mx-auto grid max-w-7xl gap-px bg-gold-500/15 px-6 py-24 sm:px-10 md:grid-cols-2 lg:px-16">
        <Link href="/blog/corona-100-years-of-living-commercial" className="group bg-dark-900 p-8 sm:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">01 · Commercial</span>
          <h2 className="mt-5 font-display text-3xl font-light text-cream-50 group-hover:text-gold-300">Corona: 100 Years of Living</h2>
          <p className="mt-4 leading-7 text-cream-300/65">Screen-ready restraint, continuity and production thinking for a story-led commercial.</p>
        </Link>
        <Link href="/blog/coca-cola-springbok-rugby-commercial-makeup" className="group bg-dark-900 p-8 sm:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">02 · Sports commercial</span>
          <h2 className="mt-5 font-display text-3xl font-light text-cream-50 group-hover:text-gold-300">Coca-Cola × Springbok Talent</h2>
          <p className="mt-4 leading-7 text-cream-300/65">Camera-ready grooming for Siya Kolisi and fellow Springbok players on a commercial set.</p>
        </Link>
        <Link href="/blog/pep-south-africa-valentines-commercial-makeup-hair" className="group bg-dark-900 p-8 sm:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">03 · Retail campaign</span>
          <h2 className="mt-5 font-display text-3xl font-light text-cream-50 group-hover:text-gold-300">PEP South Africa: Valentines</h2>
          <p className="mt-4 leading-7 text-cream-300/65">Relatable commercial beauty and coordinated hair for a warm, people-first retail campaign.</p>
        </Link>
        <Link href="/blog/hunter-kennedy-fashion-shoot-body-painting" className="group bg-dark-900 p-8 sm:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">04 · Fashion & body art</span>
          <h2 className="mt-5 font-display text-3xl font-light text-cream-50 group-hover:text-gold-300">The Hunter Kennedy Shoot</h2>
          <p className="mt-4 leading-7 text-cream-300/65">A hand-painted logo becomes part of the styling, made to read clearly on camera.</p>
        </Link>
        <Link href="/blog/actor-headshot-portfolio-shoot-makeup-cape-town" className="group bg-dark-900 p-8 sm:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">05 · Actor portfolios</span>
          <h2 className="mt-5 font-display text-3xl font-light text-cream-50 group-hover:text-gold-300">Makeup for the Casting Frame</h2>
          <p className="mt-4 leading-7 text-cream-300/65">Natural makeup and hair that keeps an actor recognisable while giving every portrait a polished, professional finish.</p>
        </Link>
      </section>
    </div>
  )
}
