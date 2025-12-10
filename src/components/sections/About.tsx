'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
  Award, 
  MapPin, 
  Calendar, 
  Heart,
  Film,
  Star,
  CheckCircle,
  Instagram
} from 'lucide-react'

const achievements = [
  { icon: Film, label: 'Productions', value: '50+' },
  { icon: Calendar, label: 'Years Experience', value: '8+' },
  { icon: Award, label: 'ITEC Certified', value: 'Yes' },
  { icon: Star, label: 'Client Rating', value: '5.0' },
]

const skills = [
  'Film & Television Makeup',
  'Special Effects (SFX)',
  'Prosthetics Application',
  'Beauty & Glamour',
  'Airbrush Techniques',
  'Hair Styling',
  'Period & Character Makeup',
  'Bridal & Events',
  'Continuity Management',
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
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-dark-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/3 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-600/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div style={{ y }} className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden border border-gold-500/20">
                <Image
                  src="/assets/about/Amy Morgenrood.jpg"
                  alt="Amy Morgenrood - Professional Makeup Artist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-8 p-8 bg-dark-900/95 backdrop-blur-sm border border-gold-500/20"
              >
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-display text-xl font-light text-cream-100">{item.value}</div>
                      <div className="text-[10px] tracking-[0.15em] uppercase text-cream-500/50 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Location Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 -left-4 px-5 py-2.5 bg-dark-900/95 backdrop-blur-sm border border-gold-500/20"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gold-500/80" />
                  <span className="text-xs tracking-wider text-cream-100">Cape Town, SA</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="text-cream-200/90 text-lg leading-relaxed font-light">
                Hello! I'm <span className="text-gold-400">Amy Morgenrood</span>, 
                a professional makeup artist based in Cape Town with over{' '}
                <span className="text-gold-400">8 years of onset experience</span> 
                in the film and television industry.
              </p>
              <p className="text-cream-300/75 leading-relaxed font-light">
                Internationally qualified with a <span className="text-cream-100">ITEC certification</span>, 
                I specialize in creating stunning looks for film productions, special effects, 
                beauty editorials, and more. My work has been featured in major productions 
                including <span className="text-gold-400">"The Woman King"</span> starring Viola Davis.
              </p>
              <p className="text-cream-300/75 leading-relaxed font-light">
                Whether it's transforming actors into characters, creating breathtaking bridal looks, 
                or executing complex SFX makeup, I bring passion, precision, and creativity to every project. 
                I'm proud to be represented by Call a Crew and have an established presence on IMDb.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12">
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

            {/* Timeline */}
            <div className="mt-12">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-6">
                Journey
              </h4>
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

            {/* CTA */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                Follow @amyb_mup
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 border border-gold-500/30 text-cream-100 text-xs tracking-[0.15em] uppercase hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300"
              >
                Let's Work Together
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
