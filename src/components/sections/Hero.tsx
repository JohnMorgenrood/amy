'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowDown, 
  Play, 
  Sparkles, 
  Star,
  Film,
  Palette,
  Award,
  MapPin,
  CheckCircle2,
  Camera
} from 'lucide-react'

// SEO-rich service keywords that rotate
const services = [
  'Film & TV Makeup',
  'Special Effects',
  'Prosthetic Makeup',
  'Beauty & Bridal',
  'Airbrush Makeup',
  'Hair Styling',
]

// Notable productions for credibility
const featuredProductions = [
  'The Woman King',
  'Black Sails',
  'Tomb Raider',
  'The Kissing Booth',
  'Shaka iLembe',
]

const stats = [
  { value: '8+', label: 'Years Experience', description: 'Professional onset work' },
  { value: '50+', label: 'Productions', description: 'Film, TV & commercials' },
  { value: '100+', label: 'Happy Clients', description: 'Worldwide' },
  { value: '5.0', label: 'Rating', description: 'Google reviews' },
]

// Floating particles for modern aesthetic
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 5,
}))

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Rotate services for SEO and visual interest
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Amy Morgenrood - Professional Makeup Artist in Cape Town"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video/Image Background with Overlay */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold-600/5 via-transparent to-transparent" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Animated Glow Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px]"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-600/5 blur-[100px]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content - 7 columns */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Location Badge - SEO rich */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm mb-8"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span className="text-xs tracking-wide text-gold-400">Cape Town, South Africa</span>
              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs text-amber-400">Currently on Set</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="text-xs text-cream-400">Accepting Inquiries</span>
            </motion.div>

            {/* Main Heading with SEO H1 */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] mb-6">
                <span className="block text-cream-100">Amy Morgenrood</span>
                <span className="block mt-2">
                  <span className="relative inline-block">
                    <span className="gradient-text font-medium">Professional Makeup Artist</span>
                    <motion.span
                      className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-600"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                </span>
              </h1>
            </motion.header>

            {/* Rotating Services - SEO keywords */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6 overflow-hidden"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-cream-400">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Specializing in</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentServiceIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-medium text-gold-400"
                  >
                    {services[currentServiceIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description - SEO rich content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-cream-300/80 font-light max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              <strong className="text-cream-200 font-medium">ITEC-certified makeup artist</strong> with{' '}
              <strong className="text-cream-200 font-medium">8+ years of professional on-set experience</strong>.
              Creating stunning looks for major film productions, television series, commercials, 
              and private clients across South Africa and internationally.
            </motion.p>

            {/* Featured Productions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8"
            >
              <span className="text-xs text-cream-500 mr-2">As seen in:</span>
              {featuredProductions.slice(0, 3).map((production, index) => (
                <span
                  key={production}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/50 border border-gold-500/10 text-xs text-cream-300"
                >
                  <Film className="w-3 h-3 mr-1.5 text-gold-500/70" />
                  {production}
                </span>
              ))}
              <span className="text-xs text-cream-500">+{featuredProductions.length - 3} more</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-medium rounded-full overflow-hidden shadow-lg shadow-gold-500/25 transition-shadow hover:shadow-xl hover:shadow-gold-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Consultation
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 rounded-full border border-gold-500/30 text-cream-200 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all"
              >
                <Play className="w-4 h-4 text-gold-500" />
                <span>View Portfolio</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-cream-400"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ITEC Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Insured Professional
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                Currently on Set
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Accepting Inquiries Worldwide
              </span>
            </motion.div>
          </motion.article>

          {/* Image Gallery - 5 columns */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 relative hidden lg:block"
            aria-label="Portfolio preview images"
          >
            {/* Main Hero Image with Glassmorphism Card */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateY: mousePosition.x * 0.1,
                rotateX: mousePosition.y * -0.1,
              }}
              transition={{ 
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { type: 'spring', stiffness: 50, damping: 30 },
                rotateX: { type: 'spring', stiffness: 50, damping: 30 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
            >
              {/* Glass Border */}
              <div className="absolute inset-0 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent z-10 pointer-events-none" />
              
              {/* Image */}
              <Image
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=750&fit=crop"
                alt="Amy Morgenrood - Professional Film and SFX Makeup Artist Cape Town South Africa"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent z-10" />

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 left-6 right-6 z-20"
              >
                <div className="bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-gold-500/20 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                      <Award className="w-5 h-5 text-dark-900" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cream-100">ITEC International</p>
                      <p className="text-xs text-cream-500">Certified Makeup Artist</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.slice(0, 3).map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-xl font-display text-cream-100">{stat.value}</p>
                        <p className="text-[10px] uppercase tracking-wider text-cream-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Accent Images */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                x: mousePosition.x * 0.3,
              }}
              transition={{ 
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                x: { type: 'spring', stiffness: 50, damping: 30 },
              }}
              className="absolute -top-8 -left-8 w-28 h-36 rounded-2xl overflow-hidden border-2 border-dark-800 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=250&fit=crop"
                alt="Bridal and beauty makeup artistry Cape Town"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -12, 0],
                x: mousePosition.x * -0.2,
              }}
              transition={{ 
                y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                x: { type: 'spring', stiffness: 50, damping: 30 },
              }}
              className="absolute -bottom-4 -right-4 w-32 h-40 rounded-2xl overflow-hidden border-2 border-dark-800 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=250&fit=crop"
                alt="SFX special effects makeup for film and television"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Camera Icon Floating Badge */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30"
            >
              <Camera className="w-5 h-5 text-dark-900" />
            </motion.div>
          </motion.aside>
        </div>

        {/* Stats Bar - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="hidden md:block mt-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent rounded-2xl" />
            <div className="relative grid grid-cols-4 gap-8 p-8 rounded-2xl border border-gold-500/10 bg-dark-900/50 backdrop-blur-sm">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-display font-light text-cream-100 mb-1">{stat.value}</p>
                  <p className="text-sm text-gold-500 font-medium mb-0.5">{stat.label}</p>
                  <p className="text-xs text-cream-500">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#portfolio"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream-500 hover:text-gold-400 transition-colors group"
          aria-label="Scroll to view portfolio"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] group-hover:text-gold-400">Explore Work</span>
          <div className="w-6 h-10 rounded-full border border-cream-500/30 group-hover:border-gold-500/50 flex items-start justify-center p-2 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-gold-500"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
