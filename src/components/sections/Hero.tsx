'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Play } from 'lucide-react'

const heroGallery = [
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1600&auto=format&fit=crop',
    alt: 'Beauty and glam makeup artistry',
    title: 'Beauty & Editorial',
    subtitle: 'Camera-ready finishes with refined skin work and modern glow.',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1600&auto=format&fit=crop',
    alt: 'Makeup artist applying beauty makeup',
    title: 'Film & TV Makeup',
    subtitle: 'On-set continuity with production-ready precision.',
  },
  {
    src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1600&auto=format&fit=crop',
    alt: 'Special effects makeup close-up',
    title: 'SFX & Prosthetics',
    subtitle: 'Transformations, wounds, and character FX for screen.',
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bridal makeup portrait',
    title: 'Bridal Artistry',
    subtitle: 'Soft, elegant looks that last from ceremony to camera.',
  },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeImage, setActiveImage] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

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

  // Hero gallery rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroGallery.length)
    }, 3500)
    return () => clearInterval(interval)
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content - 7 columns */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm mb-6"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span className="text-xs tracking-wide text-gold-400">Cape Town • Available Worldwide</span>
            </motion.div>

            {/* Main Heading with SEO H1 */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] mb-4">
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

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-cream-300/80 font-light max-w-xl mx-auto lg:mx-0 mb-5 leading-relaxed"
            >
              Clean, camera-ready makeup for film, TV, and private clients — polished and on-brand.
            </motion.p>

            {/* Service Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
            >
              {['Film & TV', 'SFX', 'Beauty & Bridal'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/50 border border-gold-500/15 text-xs text-cream-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Slide-Synced Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroGallery[activeImage].title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex flex-col gap-2"
                >
                  <span className="text-xs tracking-[0.25em] uppercase text-rose-400">{heroGallery[activeImage].title}</span>
                  <span className="text-sm text-cream-300/80 font-light max-w-xl">
                    {heroGallery[activeImage].subtitle}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
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

          </motion.article>

          {/* Image Gallery - Desktop */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 relative hidden lg:block"
            aria-label="Portfolio preview images"
          >
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
              {/* Stacked Card Layers */}
              <div className="absolute inset-0 rounded-3xl border border-gold-500/10 bg-dark-900/40 translate-x-3 translate-y-3 rotate-[1deg]" />
              <div className="absolute inset-0 rounded-3xl border border-rose-500/10 bg-dark-900/30 -translate-x-3 -translate-y-3 -rotate-[1deg]" />

              <div className="absolute inset-0 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent z-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={heroGallery[activeImage].src}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 z-[1]"
                >
                  <Image
                    src={heroGallery[activeImage].src}
                    alt={heroGallery[activeImage].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent z-10" />

              {/* Animated Progress Bar */}
              <div className="absolute top-5 left-5 right-5 z-20 h-[3px] bg-cream-100/10 rounded-full overflow-hidden">
                <motion.div
                  key={activeImage}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.4, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-gold-400 via-rose-400 to-gold-400"
                />
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {heroGallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImage === index ? 'w-6 bg-rose-400' : 'w-3 bg-cream-100/40'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
              {heroGallery.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden border transition-all duration-300 ${
                    activeImage === index
                      ? 'border-rose-400 shadow-[0_0_20px_rgba(224,141,151,0.25)]'
                      : 'border-gold-500/20 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent" />
                </button>
              ))}
            </div>
          </motion.aside>
        </div>

        {/* Image Gallery - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 lg:hidden"
          aria-label="Portfolio preview images"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/15 bg-dark-900/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroGallery[activeImage].src}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={heroGallery[activeImage].src}
                  alt={heroGallery[activeImage].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/10 to-transparent" />
          </div>
          <div className="mt-3 h-[3px] bg-cream-100/10 rounded-full overflow-hidden">
            <motion.div
              key={activeImage}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.4, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-gold-400 via-rose-400 to-gold-400"
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {heroGallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === index ? 'w-6 bg-rose-400' : 'w-3 bg-cream-100/40'
                }`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
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
