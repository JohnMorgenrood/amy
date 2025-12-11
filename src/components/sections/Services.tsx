'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Film, 
  Palette, 
  Sparkles, 
  Heart,
  Camera,
  Scissors,
  Star,
  Check,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    id: 1,
    icon: Film,
    title: 'Film & TV Makeup',
    description: 'Professional onset makeup for feature films, television series, and documentaries. Expert in continuity, character development, and working under production timelines.',
    features: ['Continuity Management', 'Character Aging', 'Period Looks', 'HD/4K Ready'],
    gradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'SFX & Prosthetics',
    description: 'Specialized in special effects makeup including prosthetics, wounds, aging, creature designs, and character transformations.',
    features: ['Prosthetic Application', 'Wound FX', 'Creature Design', 'Aging Effects'],
    gradient: 'from-red-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    icon: Palette,
    title: 'Beauty & Glam',
    description: 'Flawless beauty makeup for editorial shoots, red carpet events, and special occasions. Creating stunning looks that photograph beautifully.',
    features: ['Editorial Looks', 'Red Carpet Glam', 'Photoshoot Ready', 'Skin Prep'],
    gradient: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    icon: Camera,
    title: 'Airbrush Makeup',
    description: 'Precision airbrush application for flawless, long-lasting coverage. Perfect for film, bridal, and high-definition photography.',
    features: ['Flawless Finish', 'Long-Lasting', 'Waterproof Options', 'Buildable Coverage'],
    gradient: 'from-violet-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    icon: Heart,
    title: 'Bridal Makeup',
    description: 'Make your special day unforgettable with bespoke bridal makeup that enhances your natural beauty and lasts all day.',
    features: ['Bridal Trials', 'Wedding Day Touch-ups', 'Bridal Party', 'Destination Weddings'],
    gradient: 'from-rose-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    icon: Scissors,
    title: 'Hair Styling',
    description: 'Complete hair styling services from everyday glamour to elaborate period pieces and special effects work.',
    features: ['Styling & Updos', 'Period Hair', 'Wig Application', 'Hair Effects'],
    gradient: 'from-gold-400 to-amber-500',
    image: '/assets/thumbnails/hair-and-beauty.jpeg',
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
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
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-500/80 text-xs tracking-[0.3em] uppercase mb-6"
          >
            What I Do
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
            Professional Services
          </h2>
          <p className="text-cream-300/80 text-lg max-w-2xl mx-auto font-light">
            From film sets to wedding venues, I bring expertise and creativity to every project. 
            Each service is tailored to meet your unique vision.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500 overflow-hidden">
                {/* Gradient Background on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeService === service.id ? 0.05 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative w-12 h-12 border border-gold-500/30 flex items-center justify-center mb-8`}
                >
                  <service.icon className="w-5 h-5 text-gold-500/80" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-light text-cream-100 mb-4 group-hover:text-gold-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-cream-300/70 text-sm leading-relaxed mb-8 font-light">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
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
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeService === service.id ? 1 : 0 }}
                  className="inline-flex items-center gap-2 text-gold-400/80 text-xs tracking-[0.15em] uppercase group/link"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </motion.a>

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
          className="text-center mt-20 pt-16 border-t border-gold-500/10"
        >
          <p className="text-cream-300/70 mb-8 text-sm tracking-wide">
            Need something specific? Let's discuss your project requirements.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex items-center gap-3"
          >
            <span>Get Custom Quote</span>
            <ArrowRight className="w-3 h-3" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
