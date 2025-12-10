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
  { icon: Award, label: 'VTCT Certified', value: 'Yes' },
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
  { year: '2018', event: 'Obtained VTCT International Qualification' },
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
      className="relative py-32 overflow-hidden bg-dark-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl" />
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
            className="inline-block text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            About Me
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Meet </span>
            <span className="gradient-text">Amy</span>
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
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 animated-border rounded-3xl z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop"
                  alt="Amy Morgenrood - Professional Makeup Artist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-8 p-6 rounded-2xl glass border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <item.icon className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{item.value}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Location Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 -left-4 px-4 py-2 rounded-full glass border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-white">Cape Town, SA</span>
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
              <p className="text-gray-300 text-lg leading-relaxed">
                Hello! I'm <span className="text-gold-400 font-medium">Amy Morgenrood</span>, 
                a professional makeup artist based in Cape Town with over{' '}
                <span className="text-gold-400 font-medium">8 years of onset experience</span> 
                in the film and television industry.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Internationally qualified with a <span className="text-white">VTCT certification</span>, 
                I specialize in creating stunning looks for film productions, special effects, 
                beauty editorials, and more. My work has been featured in major productions 
                including <span className="text-gold-400">"The Woman King"</span> starring Viola Davis.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Whether it's transforming actors into characters, creating breathtaking bridal looks, 
                or executing complex SFX makeup, I bring passion, precision, and creativity to every project. 
                I'm proud to be represented by Call a Crew and have an established presence on IMDb.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h4 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-gold-400" />
                Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-gold-500/50 hover:text-gold-400 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <h4 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-400" />
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
                    className="flex items-center gap-4"
                  >
                    <span className="text-gold-400 font-bold text-sm w-12">{item.year}</span>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold-500 to-rose-500" />
                    <span className="text-gray-300 text-sm">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                <Instagram className="w-5 h-5" />
                Follow @amyb_mup
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
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
