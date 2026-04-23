'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'

const serviceHighlights = [
  'Film & TV',
  'Private Bookings',
  'Bridal',
  'SFX',
  'Editorial',
]

const detailCards = [
  {
    label: 'Based In',
    value: 'Cape Town, Western Cape',
  },
  {
    label: 'Bookings',
    value: 'Private, bridal, production and agency work',
  },
  {
    label: 'Focus',
    value: 'Clean beauty, continuity, soft glamour and screen-ready makeup',
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <motion.div style={{ opacity: fade }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-dark-900/50 px-4 py-2 mb-6">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[10px] tracking-[0.26em] uppercase text-cream-100/90">
                  Cape Town Makeup Artist
                </span>
              </div>

              <h1 className="font-display max-w-[10ch] text-5xl sm:text-6xl lg:text-[5.25rem] font-light leading-[0.94] tracking-[-0.03em] text-cream-100">
                Refined makeup
                <span className="block text-gold-300/95">for modern beauty, bridal and screen.</span>
              </h1>

              <p className="mt-6 max-w-[38rem] text-base sm:text-lg text-cream-300/82 font-light leading-relaxed">
                Amy Morgenrood creates polished, camera-ready makeup and hair for private clients,
                productions, agencies, editorials, weddings and events across Cape Town.
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
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full px-7 py-3.5 bg-cream-100 text-dark-950 text-[11px] tracking-[0.22em] uppercase hover:bg-gold-400 transition-colors duration-300"
                >
                  Request Booking
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#portfolio"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full px-7 py-3.5 border border-gold-500/30 text-cream-100 text-[11px] tracking-[0.22em] uppercase hover:bg-gold-500/8 transition-colors duration-300"
                >
                  View Portfolio
                </motion.a>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-4">
                {detailCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                    className="h-full rounded-2xl border border-gold-500/10 bg-dark-900/45 p-4 sm:p-5"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold-400/75 mb-2">
                      {card.label}
                    </p>
                    <p className="text-sm text-cream-200/82 font-light leading-relaxed">
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
            <div className="relative max-w-[620px] mx-auto">
              <motion.div
                style={{ y: imageY }}
                className="relative grid grid-cols-[1fr_auto] gap-4 items-end"
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

                <div className="hidden sm:flex flex-col gap-4 w-[170px]">
                  <div className="rounded-2xl border border-gold-500/15 bg-dark-900/70 backdrop-blur-sm p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold-400/75 mb-2">
                      Signature Style
                    </p>
                    <p className="text-sm text-cream-200/82 font-light leading-relaxed">
                      Soft skin, elegant structure and makeup that stays beautiful on camera.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-rose-500/15 bg-dark-900/70 backdrop-blur-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <p className="text-[10px] tracking-[0.2em] uppercase text-rose-300/90">
                        Amy Morgenrood
                      </p>
                    </div>
                    <p className="text-sm text-cream-200/82 font-light leading-relaxed">
                      Makeup and hair artist for private clients, productions and bridal bookings.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="sm:absolute sm:-left-10 sm:bottom-10 mt-5 sm:mt-0 max-w-[260px] rounded-2xl border border-gold-500/15 bg-dark-950/82 backdrop-blur-md p-5"
              >
                <p className="text-[10px] tracking-[0.22em] uppercase text-gold-400/80 mb-3">
                  Beauty That Fits The Brief
                </p>
                <p className="text-sm text-cream-200/82 font-light leading-relaxed">
                  Calm, clean and efficient service for bridal mornings, set days, editorial shoots
                  and private appointments.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream-500 hover:text-gold-300 transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Explore Services</span>
          <div className="w-6 h-10 border border-cream-100/25 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-gold-400"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
