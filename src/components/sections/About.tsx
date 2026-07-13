'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { WatermarkOverlay } from '@/components/WatermarkOverlay'
import { Award, Calendar, Film, Star, Instagram } from 'lucide-react'

const achievements = [
  { icon: Film, label: 'Film & TV Credits', value: '50+' },
  { icon: Calendar, label: 'Years Experience', value: '8+' },
  { icon: Award, label: 'ITEC Certified', value: 'Yes' },
  { icon: Star, label: 'Client Rating', value: '5.0' },
]

const skills = [
  'Makeup & Hair',
  'SFX Makeup',
  'Prosthetics Application',
  'Continuity & On-Set Workflow',
  'Period & Character Makeup',
  'Wig & Hair Styling',
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-dark-950"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/3 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-600/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-500/80 text-xs tracking-[0.3em] uppercase mb-6"
          >
            About Me
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100">
            Meet Amy
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div style={{ y }} className="relative">
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                <div className="relative col-span-3 aspect-[3/5] overflow-hidden rounded-[1.5rem] border border-gold-500/20">
                  <Image src="/assets/about/amy-morgenrood-watermarked-hero.png" alt="Amy Morgenrood - Cape Town makeup artist" fill draggable={false} className="object-cover" sizes="(max-width: 1024px) 58vw, 28vw" />
                  <WatermarkOverlay compact />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/45 via-transparent to-transparent" />
                </div>
                <div className="col-span-2 grid gap-3 sm:gap-4">
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-gold-500/15">
                    <Image src="/assets/portfolio/1623238044587_20180608_131019.jpg" alt="Cape Town film production set" fill draggable={false} className="object-cover" sizes="(max-width: 1024px) 36vw, 18vw" />
                    <WatermarkOverlay compact />
                    <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.22em] text-cream-100/80">On set</span>
                  </div>
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-gold-500/15">
                    <Image src="/assets/portfolio/FB_IMG_1487892884148.jpg" alt="Character makeup by Amy Morgenrood" fill draggable={false} className="object-cover" sizes="(max-width: 1024px) 36vw, 18vw" />
                    <WatermarkOverlay compact />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/45 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.22em] text-cream-100/80">Character work</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl border border-gold-500/15 bg-dark-900/75 p-4 sm:p-5">
                {achievements.map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="font-display text-lg font-light text-cream-100 sm:text-xl">{item.value}</div>
                    <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-cream-500/50 sm:text-[9px]">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-5 rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 p-6 sm:p-7">
              <p className="font-script text-cream-100 text-xl leading-relaxed">
                I&apos;m <span className="text-rose-200">Amy Morgenrood</span>, a Cape Town-based
                makeup and hair artist with <span className="text-rose-200">8+ years of on-set
                experience</span> in film and television.
              </p>
              <p className="font-light leading-relaxed text-cream-300/80">
                I&apos;m ITEC certified, specialising in SFX, prosthetics, continuity-led character
                work and camera-ready beauty. Credits include <span className="text-rose-200">The
                Woman King</span>, <span className="text-rose-200">Recipes for Love and Murder
                (S2)</span>, <span className="text-rose-200">King Shaka</span> and <span className="text-rose-200">American Monster (S7–9)</span>.
              </p>
              <p className="font-light leading-relaxed text-cream-300/80">
                Film production is my main focus. I also support film-shoot makeup departments with
                continuity, scheduling and calm day-to-day organisation, and I&apos;m available for
                artist, assistant, standby and assisting coordination roles. Bridal, private and
                beauty makeup remain separate services.
              </p>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-gold-500/15 bg-dark-900/40 p-5 sm:p-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-6">
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-4 py-2 bg-dark-900/50 border border-gold-500/10 text-xs tracking-wide text-cream-300/70 hover:border-gold-500/30 hover:text-cream-100 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                Follow @amyb_mup
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 border border-gold-500/30 text-cream-100 text-xs tracking-[0.15em] uppercase hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
              >
                Let&apos;s Work Together
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
