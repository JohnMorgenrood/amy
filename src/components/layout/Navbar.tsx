'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Instagram, Mail, Phone } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Shop', href: '/shop' },
  { name: 'Contact', href: '#contact' },
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
          scrolled ? 'glass py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Sparkles className="w-8 h-8 text-gold-500" />
                <div className="absolute inset-0 blur-lg bg-gold-500/30 group-hover:bg-gold-500/50 transition-all" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wide gradient-text">
                  AMY MORGENROOD
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                  Makeup Artist
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
                >
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 group-hover:w-full transition-all duration-300" />
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-rose-400 transition-colors" />
              </motion.a>
              <motion.a
                href="tel:+27847017012"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <Phone className="w-5 h-5 text-gray-400 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm"
              >
                Book Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
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
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" />
            <nav className="relative h-full flex flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-display font-bold text-white hover:text-gold-400 transition-colors"
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
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-rose-400" />
                </a>
                <a
                  href="mailto:bookings@makeupbyamy.co.za"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-6 h-6 text-gold-400" />
                </a>
                <a
                  href="tel:+27847017012"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-6 h-6 text-gold-400" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
