'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackLeadClick } from '@/components/tracking/TrackedContactLink'

export function Hero() {
  return (
    <section id="home" aria-label="Amy Morgenrood - Cape Town production makeup artist" className="relative min-h-screen overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(190,151,99,0.10),transparent_34%)]" />
      <div className="absolute inset-0 noise opacity-30" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-2xl">
          <p className="mb-8 text-[10px] uppercase tracking-[0.38em] text-gold-400/80">Cape Town · Film · Television · Commercial</p>
          <h1 className="font-display text-5xl font-light leading-[1.03] text-cream-100 sm:text-6xl lg:text-[5rem]">
            Makeup crafted
            <span className="block italic text-gold-300/90">for the screen.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-8 text-cream-300/70 sm:text-lg">
            Amy Morgenrood is a Cape Town makeup and hair artist specialising in film, television, SFX, continuity and camera-ready beauty—with practical makeup department support for film shoots.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a href="/#contact" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => trackLeadClick({ action: 'quote_click', label: 'homepage_hero_quote' })} className="inline-flex min-h-12 items-center gap-3 bg-cream-100 px-7 py-3.5 text-[10px] uppercase tracking-[0.24em] text-dark-950 transition-colors hover:bg-gold-400">
              Discuss a production <ArrowRight className="h-4 w-4" />
            </motion.a>
            <Link href="/film-tv-commercial-makeup-artist-cape-town" className="inline-flex min-h-12 items-center border border-cream-100/20 px-7 py-3.5 text-[10px] uppercase tracking-[0.24em] text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-300">
              Production experience
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-5 border-t border-cream-100/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-cream-400/55">
            <span>8+ years on set</span><span className="h-1 w-1 rounded-full bg-gold-400/60" /><span>ITEC certified</span><span className="h-1 w-1 rounded-full bg-gold-400/60" /><span>Cape Town</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.12 }} className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-5 -top-5 h-24 w-24 border-l border-t border-gold-400/35" />
          <div className="absolute -bottom-5 -right-5 h-24 w-24 border-b border-r border-gold-400/35" />
          <div className="relative aspect-[4/5] overflow-hidden bg-dark-900">
            <Image src="/assets/about/amy-morgenrood-watermarked-hero.png" alt="Amy Morgenrood, Cape Town production makeup and hair artist" fill priority draggable={false} onContextMenu={event => event.preventDefault()} className="select-none object-cover" sizes="(max-width: 1024px) 92vw, 44vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
          </div>
          <p className="mt-6 text-right font-display text-lg font-light tracking-[0.08em] text-cream-200/75">Amy Morgenrood</p>
        </motion.div>
      </div>
    </section>
  )
}
