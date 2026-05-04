'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { 
  Film, 
  Palette, 
  Sparkles, 
  Heart,
  Camera,
  Scissors,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    id: 1,
    icon: Film,
    title: 'Film & TV Makeup',
    description: 'Professional on-set makeup and hair support for feature films, television, streaming, commercials and branded content in Cape Town.',
    features: ['Continuity Support', 'Call Sheet Ready', 'Cast & Crowd Work', 'HD / 4K Friendly'],
    gradient: 'from-amber-500 to-orange-600',
    href: '/film-tv-commercial-makeup-artist-cape-town',
    cta: 'Explore Production Page',
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'SFX & Prosthetics',
    description: 'Special effects work for character transformations, prosthetics, wounds, ageing, horror looks and production-led concepts.',
    features: ['Prosthetic Application', 'Wound FX', 'Aging Effects', 'Character Transformation'],
    gradient: 'from-red-500 to-rose-600',
    href: '/sfx-makeup-artist-cape-town',
    cta: 'Explore SFX Page',
  },
  {
    id: 3,
    icon: Palette,
    title: 'Private Makeup',
    description: 'Simple, polished makeup for private clients in Cape Town including birthdays, dinners, functions, shoots and special occasions.',
    features: ['Natural Glam', 'Soft Glam', 'Photo Ready Finish', 'Mobile Appointments'],
    gradient: 'from-pink-500 to-rose-500',
    href: '/private-makeup-artist-cape-town',
    cta: 'Explore Private Bookings',
  },
  {
    id: 4,
    icon: Camera,
    title: 'Commercial & Editorial',
    description: 'Reliable makeup support for agencies, campaigns, lookbooks, editorials, tests, e-commerce shoots and branded content teams.',
    features: ['Agency Friendly', 'Shoot Day Efficiency', 'Brand Consistency', 'Camera Ready Skin'],
    gradient: 'from-violet-500 to-purple-600',
    href: '/film-tv-commercial-makeup-artist-cape-town',
    cta: 'Explore Production Page',
  },
  {
    id: 5,
    icon: Heart,
    title: 'Bridal Makeup',
    description: 'Wedding makeup designed to last beautifully in person and on camera, from trial sessions through to the full wedding morning.',
    features: ['Bridal Trials', 'Wedding Day Makeup', 'Bridal Party Bookings', 'Long-Wear Finish'],
    gradient: 'from-rose-400 to-pink-500',
    href: '/bridal-makeup-artist-cape-town',
    cta: 'Explore Bridal Page',
  },
  {
    id: 6,
    icon: Scissors,
    title: 'Hair Styling',
    description: 'Hair styling support for productions, editorials, bridal mornings and private appointments, including polished finishing and period styling.',
    features: ['Styling & Updos', 'Period Hair', 'Set Styling Support', 'Wig Application'],
    gradient: 'from-gold-400 to-amber-500',
    href: '/film-tv-commercial-makeup-artist-cape-town',
    cta: 'See Production Services',
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)
  
  useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            What I Do
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-6">
            Makeup Services in Cape Town
          </h2>
          <p className="text-cream-300/80 text-lg max-w-[42rem] mx-auto font-light leading-relaxed">
            Clear service options for productions, agencies, weddings, editorials and private clients. Every booking is built around the job, location and schedule.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative h-full"
            >
              <div className="relative h-full rounded-2xl p-7 sm:p-8 bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500 overflow-hidden">
                {/* Gradient Background on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeService === service.id ? 0.05 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative w-12 h-12 rounded-2xl border border-gold-500/30 flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-5 h-5 text-gold-500/80" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-light text-cream-100 mb-4 group-hover:text-gold-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-cream-300/70 text-sm leading-relaxed mb-7 font-light">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 min-h-[116px]">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: activeService === service.id ? 1 : 0.5,
                        x: activeService === service.id ? 0 : -5
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-xs tracking-wide text-cream-300/70"
                    >
                      <span className="w-1 h-1 bg-gold-500/50" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0.65 }}
                  animate={{ opacity: activeService === service.id ? 1 : 0.65 }}
                >
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-gold-400/80 text-xs tracking-[0.15em] uppercase group/link"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Corner Accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500/5 blur-3xl group-hover:bg-gold-500/10 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 pt-14 border-t border-gold-500/10"
        >
          <p className="text-cream-300/70 mb-8 text-sm tracking-wide">
            Need a day rate, private booking, or production quote? Send the brief and I will reply with the best fit.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex items-center gap-3"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3 h-3" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
