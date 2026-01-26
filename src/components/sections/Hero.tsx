'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Play } from 'lucide-react'

const heroGallery = [
  {
    src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
    alt: 'Makeup brushes and tools',
    title: 'Beauty & Editorial',
    subtitle: 'Camera-ready finishes with refined skin work and modern glow.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
    alt: 'Makeup palette and brushes',
    title: 'Film & TV Makeup',
    subtitle: 'On-set continuity with production-ready precision.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1600&auto=format&fit=crop',
    alt: 'Makeup brushes and palettes on a desk',
    title: 'SFX & Prosthetics',
    subtitle: 'Transformations, wounds, and character FX for screen.',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1600&auto=format&fit=crop',
    alt: 'Makeup products flat lay',
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
      className="relative min-h-screen overflow-hidden"
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Media-first Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotateY: mousePosition.x * 0.08,
                rotateX: mousePosition.y * -0.08,
              }}
              transition={{
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { type: 'spring', stiffness: 50, damping: 30 },
                rotateX: { type: 'spring', stiffness: 50, damping: 30 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden"
            >
              {/* Fanned Image Stack */}
              <div className="absolute inset-0 z-[1]">
                {heroGallery.map((image, index) => {
                  const isActive = index === activeImage
                  const offset = ((index - activeImage + heroGallery.length) % heroGallery.length)
                  const zIndex = heroGallery.length - offset
                  const rotate = isActive ? 0 : 10 + offset * 6
                  const x = isActive ? 0 : 16 + offset * 14
                  const y = isActive ? 0 : 10 + offset * 8

                  return (
                    <motion.div
                      key={image.src}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        rotate,
                        x,
                        y,
                        scale: isActive ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      style={{ zIndex }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-0 shadow-[0_30px_80px_rgba(0,0,0,0.45)]" />
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={isActive}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </motion.div>
                  )
                })}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-dark-950/30 to-transparent z-10" />

              <div className="absolute top-4 left-4 right-4 z-20 h-[3px] bg-cream-100/10 rounded-full overflow-hidden">
                <motion.div
                  key={activeImage}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.4, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-gold-400 via-rose-400 to-gold-400"
                />
              </div>

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/70 border border-rose-500/20 backdrop-blur-md w-fit mb-4"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-cream-100">Cape Town • Worldwide</span>
                </motion.div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-cream-100">
                  Amy Morgenrood
                </h1>
                <p className="text-sm sm:text-base text-cream-300/90 mt-2 max-w-xl">
                  Professional makeup artist for film, TV, and luxury bridal.
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroGallery[activeImage].title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="mt-4"
                  >
                    <span className="text-[10px] tracking-[0.25em] uppercase text-rose-300">
                      {heroGallery[activeImage].title}
                    </span>
                    <p className="text-sm text-cream-300/80 mt-1">
                      {heroGallery[activeImage].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-6 py-3 bg-gradient-to-r from-gold-500 to-rose-500 text-dark-900 text-xs tracking-[0.15em] uppercase rounded-full overflow-hidden"
                  >
                    Book Consultation
                  </motion.a>
                  <motion.a
                    href="#portfolio"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full border border-cream-100/30 text-cream-100 text-xs tracking-[0.15em] uppercase hover:bg-cream-100/10 transition-all"
                  >
                    <Play className="w-4 h-4 text-cream-100" />
                    View Work
                  </motion.a>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
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
          </motion.div>

          {/* Supporting Copy (Desktop only) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="p-8 bg-dark-900/60 border border-gold-500/10 rounded-3xl backdrop-blur-md">
              <h2 className="font-display text-3xl font-light text-cream-100 mb-4">
                Elevated makeup for cinematic storytelling.
              </h2>
              <p className="text-cream-300/80 font-light mb-6">
                Specializing in film, SFX, and bridal artistry with continuity-driven precision.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Film & TV', 'SFX', 'Beauty', 'Bridal'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/60 border border-rose-500/15 text-xs text-cream-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-500/30 text-cream-100 text-xs tracking-[0.15em] uppercase hover:bg-rose-500/10 transition-all"
              >
                Start a Project
              </motion.a>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#portfolio"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream-500 hover:text-rose-400 transition-colors group"
          aria-label="Scroll to view portfolio"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] group-hover:text-rose-400">Explore Work</span>
          <div className="w-6 h-10 rounded-full border border-cream-500/30 group-hover:border-rose-500/50 flex items-start justify-center p-2 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-rose-400"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
