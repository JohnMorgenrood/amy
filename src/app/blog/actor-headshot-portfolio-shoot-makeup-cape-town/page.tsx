import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { StoryContact } from '@/components/blog/StoryContact'

const url = 'https://www.amymup.shop/blog/actor-headshot-portfolio-shoot-makeup-cape-town'
const imageUrl = 'https://www.amymup.shop/assets/Makeup%20blog/Still%20Shoot.jpeg'

export const metadata: Metadata = {
  title: 'Actor Headshot & Portfolio Shoot Makeup Cape Town',
  description: 'Professional makeup and hair for actor headshots, actress portfolios, casting photographs and agency still shoots in Cape Town by makeup artist Amy Morgenrood.',
  keywords: [
    'actor headshot makeup Cape Town',
    'actress portfolio makeup Cape Town',
    'acting portfolio makeup artist',
    'casting headshot makeup Cape Town',
    'actor portfolio photoshoot makeup',
    'headshot hair and makeup Cape Town',
    'agency test shoot makeup artist',
    'professional portrait makeup Cape Town',
    'still shoot makeup artist Cape Town',
  ],
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    title: 'Actor Headshot & Portfolio Shoot Makeup in Cape Town',
    description: 'Why natural, camera-aware makeup and hair matter for casting photographs and professional acting portfolios.',
    url,
    images: [{ url: imageUrl, alt: 'Cape Town actor portfolio shoot with natural makeup and styled curly hair' }],
  },
}

export default function ActorPortfolioMakeupStoryPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Actor Headshot and Portfolio Shoot Makeup in Cape Town',
        description: metadata.description,
        image: imageUrl,
        author: { '@id': 'https://www.amymup.shop/#person' },
        publisher: { '@id': 'https://www.amymup.shop/#business' },
        mainEntityOfPage: url,
      },
      {
        '@type': 'Service',
        name: 'Actor Headshot and Portfolio Shoot Makeup Cape Town',
        serviceType: 'Makeup and hair for actor portfolios, headshots and casting photographs',
        provider: { '@id': 'https://www.amymup.shop/#person' },
        areaServed: { '@type': 'City', name: 'Cape Town' },
        url,
      },
    ],
  }

  return <>
    <Script id="actor-portfolio-story-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-dark-950 pt-24">
      <header className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
        <Link href="/blog" className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Journal / Actor portfolios</Link>
        <h1 className="mt-7 max-w-4xl font-display text-5xl font-light leading-[1.04] text-cream-50 sm:text-7xl">Makeup for actor headshots and portfolio shoots in Cape Town</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-cream-300/75">A strong acting portfolio should look polished without disguising the person a casting director expects to meet. The makeup and hair need to hold up in high-resolution stills while leaving room for expression, personality and range.</p>
      </header>

      <figure className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-dark-800 sm:aspect-square lg:aspect-[1.25/1]">
          <Image src="/assets/Makeup blog/Still Shoot.jpeg" alt="Actor headshot and portfolio still shoot featuring natural makeup and styled curly hair in Cape Town" fill priority sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" />
        </div>
        <figcaption className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-cream-400/60">Still-shoot makeup and hair · Natural, expressive and camera-ready</figcaption>
      </figure>

      <div className="mx-auto max-w-4xl space-y-12 px-6 py-20 text-base leading-8 text-cream-300/75 sm:px-10 lg:py-28">
        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">A headshot must still look like you</h2>
          <p className="mt-5">Casting photographs are different from beauty editorials. Their job is to present an honest, professional version of the actor. Skin can be refined, tone balanced and features defined, but the final image should remain recognisable. Amy approaches actor and actress portfolio makeup with restraint, making choices that support the face rather than creating a character the client cannot reproduce in the casting room.</p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Makeup that works across expressions</h2>
          <p className="mt-5">A useful portfolio rarely contains only one expression. Smiles, direct eye contact, movement and quieter moments all reveal something different. Makeup must stay balanced across the full sequence—without harsh lines, distracting texture or shine that changes from frame to frame. Careful preparation and light-handed finishing allow the photographer to capture genuine range.</p>
        </section>

        <blockquote className="border-l border-gold-400 pl-7 font-display text-2xl font-light leading-10 text-cream-100">The goal is not to make an actor look like somebody else. It is to help the camera see their strongest, most truthful self.</blockquote>

        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Hair is part of the casting picture</h2>
          <p className="mt-5">Hair shape affects the silhouette of every headshot. For this still shoot, defined curls add movement and personality while remaining polished across multiple poses. When makeup and hair are planned together, the complete look can stay coherent through close portraits, three-quarter frames and more relaxed portfolio images.</p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Who should book portfolio-shoot makeup?</h2>
          <p className="mt-5">Professional preparation is valuable for actors updating casting profiles, actresses creating new agency portfolios, performers entering the Cape Town film industry, presenters refreshing publicity photographs and creatives planning personal-branding portraits. Amy can work with the photographer’s lighting plan and the intended use of the images to create an appropriate finish.</p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-light text-cream-50">Planning an actor headshot session in Cape Town</h2>
          <p className="mt-5">A good brief includes the photographer, location, wardrobe changes, number of looks and whether hair support is required. Share current photographs and agency guidance before the shoot so the makeup can be tailored to the person and the portfolio goal. Amy is available for actor headshots, casting portfolios, agency tests, professional portraits and private still shoots across Cape Town by arrangement.</p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-gold-500/15 pt-10" aria-label="Related makeup services">
          <Link href="/private-makeup-artist-cape-town" className="text-xs uppercase tracking-[0.16em] text-gold-300 hover:text-cream-100">Private makeup services →</Link>
          <Link href="/commercial-editorial-makeup-artist-cape-town" className="text-xs uppercase tracking-[0.16em] text-gold-300 hover:text-cream-100">Editorial and agency shoots →</Link>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10"><StoryContact title="Updating your acting portfolio or casting headshots?" /></div>
    </article>
  </>
}
