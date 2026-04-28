'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Mail, Phone, Youtube } from 'lucide-react'

const brandImagePath = '/assets/thumbnails/logo-design-for-amy-mup-makeup-brand-elegant-and-m.jpeg'
const facebookUrl = 'https://www.facebook.com/share/1CE4F4CZnP/'
const tiktokUrl = 'https://www.tiktok.com/@amyb_mup?_r=1&_t=ZS-95umNruEh0q'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Production', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Services', href: '/#services' },
  { name: 'Bridal', href: '/bridal-makeup-artist-cape-town' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark-950/90 backdrop-blur-md border-b border-gold-500/10 py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold-500/20 bg-dark-900/80 shadow-[0_0_24px_rgba(212,175,55,0.08)]">
                <Image
                  src={brandImagePath}
                  alt="Amy MUP logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                  AMY MUP
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60">
                  Amy Morgenrood
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className="relative text-xs tracking-[0.15em] uppercase text-cream-500/60 hover:text-cream-100 transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500/50 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA & Social */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Instagram"
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="TikTok"
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" aria-hidden="true" fill="currentColor">
                  <path d="M21 8.5c-1.8 0-3.4-.7-4.6-1.8v7.5a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1v2.4a3.2 3.2 0 1 0 2.2 3v-9h2.5c.6 1.6 2.1 2.7 3.9 2.9v2.6z" />
                </svg>
              </motion.a>
              <motion.a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Facebook"
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" aria-hidden="true" fill="currentColor">
                  <path d="M15.1 8.3h2.1V4.8c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5.9v3.9h3.3v7.1h4v-7.1h3.3l.5-3.9h-3.8v-2.5c0-1.1.3-1.9 1.9-1.9z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@amybinspirations7694"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="YouTube"
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <Youtube className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href="tel:+27847017012"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Call Amy"
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-2 px-5 py-2 bg-cream-100 text-dark-950 text-[10px] tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300"
              >
                Check Availability
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="lg:hidden p-2 hover:bg-gold-500/5 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-cream-100" />
              ) : (
                <Menu className="w-5 h-5 text-cream-100" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto bg-dark-950"
          >
            <nav className="relative min-h-full flex flex-col items-center justify-center gap-6 py-24 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-display font-light text-cream-100 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mt-8"
              >
                <a
                  href="https://instagram.com/amyb_mup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-cream-100" />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream-100" aria-hidden="true" fill="currentColor">
                    <path d="M21 8.5c-1.8 0-3.4-.7-4.6-1.8v7.5a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1v2.4a3.2 3.2 0 1 0 2.2 3v-9h2.5c.6 1.6 2.1 2.7 3.9 2.9v2.6z" />
                  </svg>
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream-100" aria-hidden="true" fill="currentColor">
                    <path d="M15.1 8.3h2.1V4.8c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5.9v3.9h3.3v7.1h4v-7.1h3.3l.5-3.9h-3.8v-2.5c0-1.1.3-1.9 1.9-1.9z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@amybinspirations7694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-cream-100" />
                </a>
                <a
                  href="/#contact"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="Contact form"
                >
                  <Mail className="w-5 h-5 text-cream-100" />
                </a>
                <a
                  href="tel:+27847017012"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                  aria-label="Call Amy"
                >
                  <Phone className="w-5 h-5 text-cream-100" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
