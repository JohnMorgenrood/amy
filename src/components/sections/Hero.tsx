'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, MapPin, Sparkles, Clapperboard, Clock3, ShieldCheck } from 'lucide-react'

const serviceHighlights = [
  'TV Ads & Commercials',
  'Film & TV',
  'On-Set Continuity',
  'SFX',
  'Bridal & Private',
]

const detailCards = [
  {
    label: 'Based In',
    value: 'Cape Town, Western Cape',
  },
  {
    label: 'Production Focus',
    value: 'TV commercials, film, branded content, agency shoots and production support',
  },
  {
    label: 'Working Style',
    value: 'Efficient on set, continuity-aware and polished on camera',
  },
]

const productionSignals = [
  {
    icon: Clapperboard,
    title: 'Commercial-ready',
    text: 'Built for TVCs, campaigns and fast-moving production days.',
  },
  {
    icon: Clock3,
    title: 'Efficient on set',
    text: 'Clear prep, touch-ups and practical support around call times.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted credits',
    text: 'Film, TV and agency-facing experience with real production teams.',
  },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Amy Morgenrood - Cape Town makeup artist"
      className="relative min-h-screen overflow-hidden bg-dark-950"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,168,124,0.14),_transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(201,107,119,0.12),_transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(8,8,8,0.95)_0%,_rgba(15,11,10,0.92)_48%,_rgba(8,8,8,1)_100%)]" />
        <div className="absolute inset-0 noise opacity-60" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pt-24 pb-14 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <motion.div style={{ opacity: fade }} className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-dark-900/50 px-4 py-2">
                <MapPin className="h-3.5 w-3.5 text-gold-400" />
                <span className="text-[10px] uppercase tracking-[0.26em] text-cream-100/90">
                  Cape Town Production Makeup Artist
                </span>
              </div>

              <h1 className="font-display max-w-[11ch] text-5xl font-light leading-[0.94] tracking-[-0.03em] text-cream-100 sm:text-6xl lg:text-[5.25rem]">
                Makeup for
                <span className="block text-gold-300/95">TV ads, commercials and film in Cape Town.</span>
              </h1>

              <p className="mt-6 max-w-[38rem] text-base font-light leading-relaxed text-cream-300/82 sm:text-lg">
                Amy Morgenrood provides polished, production-ready makeup and hair for commercials,
                film, TV, branded content and agency shoots, while still offering bridal and
                private bookings across Cape Town.
              </p>

              <p className="mt-4 max-w-[38rem] text-sm font-light leading-relaxed text-cream-400/72 sm:text-base">
                If you are searching for a makeup artist in Cape Town for a TV commercial, film
                production, private appointment or bridal booking, this site is built to make the
                fit clear quickly.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {serviceHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-cream-100/10 bg-dark-900/45 px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-cream-300/80"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  href="/#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-cream-100 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-dark-950 transition-colors duration-300 hover:bg-gold-400"
                >
                  Request Production Quote
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <Link
                  href="/film-tv-commercial-makeup-artist-cape-town"
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold-500/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-cream-100 transition-colors duration-300 hover:bg-gold-500/8"
                >
                  View Production Page
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {detailCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                    className="h-full rounded-2xl border border-gold-500/10 bg-dark-900/45 p-4 sm:p-5"
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gold-400/75">
                      {card.label}
                    </p>
                    <p className="text-sm font-light leading-relaxed text-cream-200/82">
                      {card.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto max-w-[620px]">
              <motion.div
                style={{ y: imageY }}
                className="relative grid grid-cols-[1fr_auto] items-end gap-4"
              >
                <div className="relative">
                  <div className="absolute -inset-5 border border-gold-500/10" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cream-100/10 bg-dark-900">
                    <Image
                      src="/assets/about/Amys portfolio Image Film Makeup Artist in Cape Town.jpg"
                      alt="Amy Morgenrood portrait"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 46vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="hidden w-[170px] flex-col gap-4 sm:flex">
                  <div className="rounded-2xl border border-gold-500/15 bg-dark-900/70 p-4 backdrop-blur-sm">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gold-400/75">
                      Production Fit
                    </p>
                    <p className="text-sm font-light leading-relaxed text-cream-200/82">
                      Screen-ready makeup that stays refined under close camera work and fast set changes.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-rose-500/15 bg-dark-900/70 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-rose-300" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-rose-300/90">
                        Amy Morgenrood
                      </p>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-cream-200/82">
                      Makeup and hair artist for productions, TV ads, bridal bookings and private clients.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-5 max-w-[260px] rounded-2xl border border-gold-500/15 bg-dark-950/82 p-5 backdrop-blur-md sm:absolute sm:-left-10 sm:bottom-10 sm:mt-0"
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-gold-400/80">
                  Built For The Brief
                </p>
                <p className="text-sm font-light leading-relaxed text-cream-200/82">
                  Calm, clean and efficient support for commercial shoots, set days, bridal mornings
                  and private appointments.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-gold-500/10 bg-dark-950/65 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-3 lg:px-8">
          {productionSignals.map((signal) => (
            <div
              key={signal.title}
              className="flex items-start gap-4 rounded-2xl border border-gold-500/10 bg-dark-900/35 px-4 py-4"
            >
              <div className="rounded-full border border-gold-500/25 p-2.5">
                <signal.icon className="h-4 w-4 text-gold-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400/80">{signal.title}</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cream-300/75">{signal.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream-500 transition-colors hover:text-gold-300"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Explore Services</span>
          <div className="flex h-10 w-6 items-start justify-center border border-cream-100/25 p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-gold-400"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
