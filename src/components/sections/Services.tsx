'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { 
  Film, 
  Palette, 
  Sparkles, 
  ClipboardList,
  Camera,
  Scissors,
  ArrowRight
} from 'lucide-react'
import { trackLeadClick } from '@/components/tracking/TrackedContactLink'

const services = [
  {
    id: 1,
    icon: Film,
    title: 'Film & TV Makeup',
    description: 'Professional on-set makeup and hair support for feature films, television, streaming, commercials and branded content in Cape Town.',
    features: ['Continuity Support', 'Call Sheet Ready', 'Cast & Crowd Work', 'High-Resolution Camera Ready'],
    gradient: 'from-amber-500 to-orange-600',
    href: '/film-tv-commercial-makeup-artist-cape-town',
    cta: 'Explore Production Page',
  },
  {
    id: 2,
    icon: ClipboardList,
    title: 'Makeup Coordination',
    description: 'Organised makeup department support for productions, connecting the creative brief, crew, schedule, continuity and daily set requirements.',
    features: ['Crew & Schedule Support', 'Department Planning', 'Continuity Workflow', 'Production Communication'],
    gradient: 'from-blue-500 to-cyan-600',
    href: '/makeup-department-coordinator-cape-town',
    cta: 'Explore Coordination',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'SFX & Prosthetics',
    description: 'Special effects work for character transformations, prosthetics, wounds, ageing, horror looks and production-led concepts.',
    features: ['Prosthetic Application', 'Wound FX', 'Aging Effects', 'Character Transformation'],
    gradient: 'from-red-500 to-rose-600',
    href: '/sfx-makeup-artist-cape-town',
    cta: 'Explore SFX Page',
  },
  {
    id: 4,
    icon: Camera,
    title: 'Commercial & Editorial',
    description: 'Reliable makeup support for agencies, campaigns, lookbooks, editorials, tests, e-commerce shoots and branded content teams.',
    features: ['Agency Friendly', 'Shoot Day Efficiency', 'Brand Consistency', 'Camera Ready Skin'],
    gradient: 'from-violet-500 to-purple-600',
    href: '/commercial-editorial-makeup-artist-cape-town',
    cta: 'Explore Commercial Page',
  },
  {
    id: 5,
    icon: Scissors,
    title: 'Hair Styling',
    description: 'Hair styling support for productions, commercials, editorials and actor portfolios, including polished finishing, period styling and wig application.',
    features: ['Styling & Updos', 'Period Hair', 'Set Styling Support', 'Wig Application'],
    gradient: 'from-gold-400 to-amber-500',
    href: '/hair-stylist-cape-town',
    cta: 'Explore Hair Styling',
  },
  {
    id: 6,
    icon: Palette,
    title: 'Private Makeup',
    description: 'Simple, polished makeup for private clients in Cape Town including birthdays, dinners, functions, shoots and special occasions.',
    features: ['Natural Glam', 'Soft Glam', 'Photo Ready Finish', 'Mobile Appointments'],
    gradient: 'from-pink-500 to-rose-500',
    href: '/private-makeup-artist-cape-town',
    cta: 'Explore Private Bookings',
  },
]

const specialistServices = [
  { title: 'TV Commercial Makeup', href: '/makeup-artist-tv-commercials-cape-town' },
  { title: 'Production Hair & Makeup Teams', href: '/production-hair-makeup-team-cape-town' },
  { title: 'Period & Character Makeup', href: '/period-character-makeup-artist-cape-town' },
  { title: 'Body Painting', href: '/body-painting-artist-cape-town' },
  { title: 'Actor Headshot Makeup', href: '/actor-headshot-makeup-cape-town' },
  { title: 'Wardrobe, Hair & Makeup Support', href: '/wardrobe-hair-makeup-production-support-cape-town' },
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
            Production & Creative Expertise
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-6">
            More than makeup in the chair
          </h2>
          <p className="text-cream-300/80 text-lg max-w-[42rem] mx-auto font-light leading-relaxed">
            Specialist artistry and dependable department support for film, television, commercials, campaigns and private clients. Every booking is shaped around the creative brief, crew and schedule.
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
              <Link
                href={service.href}
                aria-label={`${service.title}: ${service.cta}`}
                className="relative block h-full overflow-hidden rounded-2xl border border-gold-500/10 bg-dark-900/50 p-7 transition-all duration-500 hover:border-gold-500/30 focus-visible:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/30 sm:p-8"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeService === service.id ? 0.05 : 0 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent"
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
                  <span className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold-400/80">
                    <span>{service.cta}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </motion.div>

                {/* Corner Accent */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 bg-gold-500/5 blur-3xl group-hover:bg-gold-500/10 transition-all duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-gold-500/10 pt-10">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.28em] text-gold-400/80">Specialist production services</p>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-gold-500/10 sm:grid-cols-2 lg:grid-cols-3">
            {specialistServices.map((service) => (
              <Link key={service.href} href={service.href} className="group flex items-center justify-between bg-dark-900/90 px-5 py-5 text-sm text-cream-200 transition-colors hover:bg-gold-500/10 hover:text-gold-300">
                <span>{service.title}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
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
            onClick={() => trackLeadClick({ action: 'quote_click', label: 'services_bottom_quote' })}
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
