'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Award, MapPin, Calendar, Film, Star, Instagram } from 'lucide-react'

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
  'Film & Television',
  'Beauty & Bridal',
  'Private Makeup',
  'Period & Character Makeup',
  'Wig & Hair Styling',
  'Body Painting',
]

const timeline = [
  { year: '2016', event: 'Started professional makeup career' },
  { year: '2018', event: 'Obtained ITEC International Qualification' },
  { year: '2020', event: 'Joined Call a Crew roster' },
  { year: '2022', event: 'Worked on "The Woman King"' },
  { year: '2024', event: '50+ productions completed' },
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

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div style={{ y }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gold-500/20">
                <Image
                  src="/assets/about/amy-morgenrood-watermarked-hero.png"
                  alt="Amy Morgenrood - Cape Town makeup artist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-8 rounded-2xl p-8 bg-dark-900/95 backdrop-blur-sm border border-gold-500/20"
              >
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-display text-xl font-light text-cream-100">
                        {item.value}
                      </div>
                      <div className="text-[10px] tracking-[0.15em] uppercase text-cream-500/50 mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 -left-4 rounded-full px-5 py-2.5 bg-dark-900/95 backdrop-blur-sm border border-gold-500/20"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gold-500/80" />
                  <span className="text-xs tracking-wider text-cream-100">Cape Town, SA</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 p-6 sm:p-7">
              <p className="font-script text-cream-100 text-xl leading-relaxed">
                I&apos;m <span className="text-rose-200">Amy Morgenrood</span>, a Cape Town-based
                makeup and hair artist with
                <span className="text-rose-200"> 8+ years on-set experience</span> in film and
                television.
              </p>
              <p className="font-script text-cream-100/90 text-lg leading-relaxed">
                I&apos;m <span className="text-cream-100">ITEC certified</span> and specialize in
                SFX, prosthetics, continuity-driven character work, and camera-ready beauty.
              </p>
              <p className="font-script text-cream-100/90 text-lg leading-relaxed">
                Selected credits include <span className="text-rose-200">The Woman King</span>,
                <span className="text-rose-200"> Recipes for Love and Murder (S2)</span>,
                <span className="text-rose-200"> King Shaka</span>, and
                <span className="text-rose-200"> American Monster (S7-9)</span>.
              </p>
              <p className="font-light text-cream-300/80">
                My strongest focus is production work for film, television, commercials and
                branded content. Through recent film shoots, I have also developed a real passion
                for makeup department coordination and the organisation that supports a successful
                film set—from continuity records, schedules and artist requirements to product
                preparation and day-to-day production communication.
              </p>
              <p className="font-light text-cream-300/80">
                My coordination and department-support work is specifically for film shoots, where
                I combine practical on-set makeup and hair experience with calm organisation. I&apos;m
                available for film makeup artist, assistant, standby and junior or assisting
                coordination roles. Bridal, private and beauty makeup are separate services and do
                not include production coordination.
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-gold-500/15 bg-dark-900/40 p-5 sm:p-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-3">
                Best Fit For
              </h4>
              <p className="text-sm font-light leading-relaxed text-cream-300/75">
                Production companies, agencies, coordinators and brands looking for a Cape Town
                makeup artist who can handle TV commercials, on-set work, campaign shoots,
                continuity-aware makeup and practical film-department coordination support without
                overcomplicating the booking process.
              </p>
            </div>

            <div className="mt-9">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-5">
                Selected Credits
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-cream-400/80 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  Blue Ice Africa - &quot;HELP&quot;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  Moonlighting - &quot;Alphas&quot;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  Film Afrika - &quot;King Shaka&quot;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  TriStar - &quot;The Woman King&quot;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  &quot;Recipes for Love and Murder&quot; S2
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  &quot;American Monster&quot; S7-9
                </li>
              </ul>
            </div>

            <div className="mt-10">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-6">
                Expertise
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

            <div className="mt-10">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-6">Journey</h4>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6"
                  >
                    <span className="text-gold-400/80 text-xs tracking-wider w-12">{item.year}</span>
                    <span className="w-px h-4 bg-gold-500/30" />
                    <span className="text-cream-500/60 text-sm font-light">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
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
