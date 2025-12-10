'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowDown, 
  Play, 
  Sparkles, 
  Star,
  Film,
  Palette,
  Award
} from 'lucide-react'

const stats = [
  { icon: Film, value: '8+', label: 'Years Experience' },
  { icon: Award, value: '50+', label: 'Productions' },
  { icon: Palette, value: '100+', label: 'Happy Clients' },
  { icon: Star, value: '5.0', label: 'Rating' },
]

const floatingImages = [
  { src: '/images/hero-1.jpg', alt: 'Makeup look 1', delay: 0 },
  { src: '/images/hero-2.jpg', alt: 'Makeup look 2', delay: 0.2 },
  { src: '/images/hero-3.jpg', alt: 'Makeup look 3', delay: 0.4 },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent" />
        
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="w-[600px] h-[600px] rounded-full border border-gold-500/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-rose-500/10"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-gold-500/5"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gray-300">Cape Town Based | Available Worldwide</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Transform Your</span>
              <br />
              <span className="gradient-text">Vision Into Art</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Professional makeup artistry for Film, SFX, Beauty & Beyond. 
              Internationally qualified with 8+ years of onset experience 
              creating stunning looks for productions like{' '}
              <span className="text-gold-400">The Woman King</span> and more.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group flex items-center gap-2"
              >
                <span>Book a Consultation</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>View Portfolio</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-gold-400" />
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 animated-border rounded-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop"
                alt="Amy Morgenrood - Professional Makeup Artist"
                fill
                className="object-cover"
                priority
              />
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-8 z-20 glass rounded-2xl px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-500 to-rose-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-dark-900" />
                  </div>
                  <div>
                    <p className="font-medium text-white">VTCT Certified</p>
                    <p className="text-sm text-gray-400">International Qualification</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Small Images */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-10 -left-10 w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold-500/30 shadow-xl shadow-gold-500/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop"
                alt="Makeup work"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden border-2 border-rose-500/30 shadow-xl shadow-rose-500/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop"
                alt="Beauty makeup"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute top-1/3 -right-16 w-24 h-24 rounded-xl overflow-hidden border-2 border-gold-500/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1503236823255-94609f598e71?w=150&h=150&fit=crop"
                alt="SFX makeup"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#portfolio"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
