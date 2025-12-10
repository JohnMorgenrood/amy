'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Award, ChevronUp, ChevronDown, X, ZoomIn } from 'lucide-react'

// Certificate data - add your certificates here
const certificates = [
  {
    id: 1,
    title: 'VTCT Level 3 Diploma in Theatrical, Special Effects & Media Makeup',
    issuer: 'VTCT International',
    year: '2018',
    image: '/assets/certificates/certificate-1.jpg',
  },
  {
    id: 2,
    title: 'Professional Makeup Artistry',
    issuer: 'Makeup Training Institution',
    year: '2017',
    image: '/assets/certificates/certificate-2.jpg',
  },
  {
    id: 3,
    title: 'Special Effects & Prosthetics',
    issuer: 'SFX Academy',
    year: '2019',
    image: '/assets/certificates/certificate-3.jpg',
  },
  {
    id: 4,
    title: 'Airbrush Makeup Certification',
    issuer: 'Airbrush Academy',
    year: '2020',
    image: '/assets/certificates/certificate-4.jpg',
  },
  // Add more certificates as needed
]

export function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate through certificates
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % certificates.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isLightboxOpen])

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setIsAutoPlaying(false)
    
    if (newDirection === 1) {
      setActiveIndex((prev) => (prev + 1) % certificates.length)
    } else {
      setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
    }
  }

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setIsLightboxOpen(true)
    setIsAutoPlaying(false)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxImage('')
  }

  // Variants for the 3D card stack effect
  const cardVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 300 : -300,
      scale: 0.8,
      opacity: 0,
      rotateX: direction > 0 ? 45 : -45,
    }),
    center: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -300 : 300,
      scale: 0.8,
      opacity: 0,
      rotateX: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  }

  return (
    <section id="certificates" className="relative py-32 overflow-hidden bg-dark-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold-500/3 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-gold-600/3 blur-[120px]" />
      </div>

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
            Qualifications
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-4">
            Certifications
          </h2>
          <p className="text-cream-300/60 font-light max-w-xl mx-auto">
            Internationally recognized qualifications and professional certifications
          </p>
        </motion.div>

        {/* 3D Card Stack Slider */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Certificate Card Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md"
            style={{ perspective: '1200px' }}
          >
            {/* Stacked cards behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[2, 1].map((offset) => (
                <div
                  key={offset}
                  className="absolute w-full aspect-[4/3] border border-gold-500/10 bg-dark-900/50"
                  style={{
                    transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05})`,
                    zIndex: -offset,
                  }}
                />
              ))}
            </div>

            {/* Main animated card */}
            <div className="relative w-full aspect-[4/3]" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => openLightbox(certificates[activeIndex].image)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="relative w-full h-full border border-gold-500/20 bg-dark-900 overflow-hidden">
                    <Image
                      src={certificates[activeIndex].image}
                      alt={certificates[activeIndex].title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-cream-100">
                        <ZoomIn className="w-6 h-6" />
                        <span className="text-sm tracking-wider">View Certificate</span>
                      </div>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60" />
                    
                    {/* Award badge */}
                    <div className="absolute top-4 right-4 p-2 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30">
                      <Award className="w-5 h-5 text-gold-400" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows - Vertical */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-3 border border-gold-500/30 text-cream-300 hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(1)}
                className="p-3 border border-gold-500/30 text-cream-300 hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Certificate Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left lg:max-w-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-gold-500/60 text-xs tracking-[0.2em] uppercase mb-3">
                  {certificates[activeIndex].year} • {certificates[activeIndex].issuer}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-cream-100 mb-4">
                  {certificates[activeIndex].title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots - vertical style */}
            <div className="flex lg:flex-col items-center justify-center lg:items-start gap-3 mt-8">
              {certificates.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1)
                    setActiveIndex(idx)
                    setIsAutoPlaying(false)
                  }}
                  className="group flex items-center gap-3"
                >
                  <motion.div
                    className={`h-1 transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'w-8 bg-gold-500' 
                        : 'w-3 bg-cream-500/30 group-hover:bg-cream-500/50'
                    }`}
                  />
                  <span className={`hidden lg:block text-xs tracking-wider transition-colors duration-300 ${
                    idx === activeIndex ? 'text-gold-400' : 'text-cream-500/40 group-hover:text-cream-500/60'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 p-3 border border-gold-500/30 text-cream-300 hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Certificate"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
