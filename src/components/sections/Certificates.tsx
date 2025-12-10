'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ChevronUp, ChevronDown, X, Download, FileText, Lock } from 'lucide-react'

// Certificate data
const certificates = [
  {
    id: 1,
    title: 'ITEC Media Make Up Diploma',
    issuer: 'ITEC International',
    year: '2018',
    file: '/assets/certificates/AMY ITEC-MEDIA MAKE UP DIPLOMA.pdf',
  },
  {
    id: 2,
    title: 'Special Effects Diploma',
    issuer: 'Face to Face',
    year: '2017',
    file: '/assets/certificates/AMY FACEtoFACE-SPECIAL EFFECTS DIPLOMA.pdf',
  },
  {
    id: 3,
    title: 'Prosthetics Certificate',
    issuer: 'Face to Face',
    year: '2017',
    file: '/assets/certificates/AMY FACEtoFACE-PROSTHETICS CERTIF.pdf',
  },
  {
    id: 4,
    title: 'Make Up Artistry Certificate',
    issuer: 'Face to Face',
    year: '2016',
    file: '/assets/certificates/AMY FACEtoFACE-MAKE UP ARTISTRY CERTIF.pdf',
  },
  {
    id: 5,
    title: 'Coverderm Training Certificate',
    issuer: 'Coverderm',
    year: '2019',
    file: '/assets/certificates/AMY COVERDERM TRAINING.pdf',
  },
]

const DOWNLOAD_PASSWORD = '1801'

export function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate through certificates
  useEffect(() => {
    if (!isAutoPlaying || isPasswordModalOpen) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % certificates.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPasswordModalOpen])

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setIsAutoPlaying(false)
    
    if (newDirection === 1) {
      setActiveIndex((prev) => (prev + 1) % certificates.length)
    } else {
      setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
    }
  }

  const openPasswordModal = (file: string) => {
    setSelectedFile(file)
    setIsPasswordModalOpen(true)
    setIsAutoPlaying(false)
    setPassword('')
    setPasswordError(false)
  }

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false)
    setSelectedFile('')
    setPassword('')
    setPasswordError(false)
  }

  const handleDownload = () => {
    if (password === DOWNLOAD_PASSWORD) {
      // Create download link
      const link = document.createElement('a')
      link.href = selectedFile
      link.download = selectedFile.split('/').pop() || 'certificate.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      closePasswordModal()
    } else {
      setPasswordError(true)
      setPassword('')
    }
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
                  onClick={() => openPasswordModal(certificates[activeIndex].file)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="relative w-full h-full border border-gold-500/20 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800 overflow-hidden">
                    {/* Certificate Visual Design */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      {/* Decorative border */}
                      <div className="absolute inset-4 border border-gold-500/20" />
                      <div className="absolute inset-6 border border-gold-500/10" />
                      
                      {/* Certificate Icon */}
                      <div className="mb-4 p-4 bg-gold-500/10 border border-gold-500/30">
                        <FileText className="w-12 h-12 text-gold-400" />
                      </div>
                      
                      {/* Certificate Title */}
                      <h4 className="font-display text-xl text-cream-100 text-center mb-2">
                        {certificates[activeIndex].title}
                      </h4>
                      <p className="text-gold-500/60 text-xs tracking-[0.2em] uppercase">
                        {certificates[activeIndex].issuer}
                      </p>
                      
                      {/* Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                        <span className="font-display text-[120px] text-cream-100 rotate-[-30deg] whitespace-nowrap select-none">
                          AMY MORGENROOD
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-3 px-6 py-3 bg-gold-500/20 border border-gold-500/40">
                        <Download className="w-5 h-5 text-gold-400" />
                        <span className="text-sm tracking-wider text-cream-100">Download PDF</span>
                      </div>
                    </div>
                    
                    {/* Award badge */}
                    <div className="absolute top-4 right-4 p-2 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30">
                      <Award className="w-5 h-5 text-gold-400" />
                    </div>
                    
                    {/* Lock icon */}
                    <div className="absolute bottom-4 right-4 p-2 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20">
                      <Lock className="w-4 h-4 text-gold-500/60" />
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

      {/* Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-sm p-4"
            onClick={closePasswordModal}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 p-3 border border-gold-500/30 text-cream-300 hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
              onClick={closePasswordModal}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-md p-8 bg-dark-900 border border-gold-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lock Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gold-500/10 border border-gold-500/30">
                  <Lock className="w-8 h-8 text-gold-400" />
                </div>
              </div>
              
              <h3 className="font-display text-2xl text-cream-100 text-center mb-2">
                Protected Download
              </h3>
              <p className="text-cream-300/60 text-sm text-center mb-8">
                Enter password to download this certificate
              </p>
              
              {/* Password Input */}
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError(false)
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
                    placeholder="Enter password"
                    className={`w-full px-4 py-3 bg-dark-800/50 border text-cream-100 placeholder-cream-500/40 focus:outline-none focus:border-gold-500/50 transition-colors ${
                      passwordError ? 'border-red-500/50' : 'border-gold-500/20'
                    }`}
                  />
                  {passwordError && (
                    <p className="mt-2 text-red-400 text-xs">
                      Incorrect password. Please try again.
                    </p>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
