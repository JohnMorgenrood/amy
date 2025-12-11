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
  { name: 'Shop', href: '/shop', hasMegaMenu: true },
  { name: 'Contact', href: '#contact' },
]

const shopCategories = [
  { 
    name: 'Skincare', 
    href: '/shop?category=skincare',
    description: 'Nourish & Protect',
  },
  { 
    name: 'Face', 
    href: '/shop?category=face',
    description: 'Foundation & Concealer',
  },
  { 
    name: 'Lips', 
    href: '/shop?category=lips',
    description: 'Lipstick & Gloss',
  },
  { 
    name: 'Eyes', 
    href: '/shop?category=eyes',
    description: 'Shadow & Liner',
  },
  { 
    name: 'Tools & Accessories', 
    href: '/shop?category=tools',
    description: 'Brushes & Applicators',
  },
  { 
    name: 'Organic', 
    href: '/shop?category=organic',
    description: 'Clean & Natural',
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showShopMegaMenu, setShowShopMegaMenu] = useState(false)
  const [showMobileShopMenu, setShowMobileShopMenu] = useState(false)

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
              <div className="flex flex-col">
                <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                  AMY MORGENROOD
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60">
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
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setShowShopMegaMenu(true)}
                  onMouseLeave={() => link.hasMegaMenu && setShowShopMegaMenu(false)}
                >
                  <Link
                    href={link.href}
                    className="relative text-xs tracking-[0.15em] uppercase text-cream-500/60 hover:text-cream-100 transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500/50 group-hover:w-full transition-all duration-300" />
                  </Link>
                  
                  {/* Shop Mega Menu */}
                  {link.hasMegaMenu && showShopMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[500px] bg-dark-950/95 backdrop-blur-xl border border-gold-500/10 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-6">
                        <div className="mb-4 pb-4 border-b border-gold-500/10">
                          <h3 className="font-display text-sm font-light tracking-[0.15em] uppercase text-cream-100/80 mb-1">Shop Collection</h3>
                          <p className="text-[10px] text-cream-500/40 tracking-wider uppercase">Premium Beauty</p>
                        </div>
                        <div className="space-y-1">
                          {shopCategories.map((category, idx) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="group flex items-center justify-between px-4 py-3 hover:bg-gold-500/5 border-l-2 border-transparent hover:border-gold-500/50 transition-all duration-300"
                            >
                              <div>
                                <h4 className="text-sm font-light text-cream-100 group-hover:text-gold-400 transition-colors tracking-wide">
                                  {category.name}
                                </h4>
                                <p className="text-[10px] text-cream-500/40 tracking-wider uppercase mt-0.5">
                                  {category.description}
                                </p>
                              </div>
                              <svg className="w-4 h-4 text-cream-500/20 group-hover:text-gold-400/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gold-500/10">
                          <Link
                            href="/shop"
                            className="block text-center py-2.5 bg-cream-100 hover:bg-gold-400 text-dark-950 text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-300"
                          >
                            View All Products
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
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
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href="tel:+27847017012"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 hover:bg-gold-500/5 transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-cream-500/50 hover:text-gold-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-2 px-5 py-2 bg-cream-100 text-dark-950 text-[10px] tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300"
              >
                Book Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
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
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-xl" />
            <nav className="relative min-h-full flex flex-col items-center justify-center gap-6 py-24 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-xs"
                >
                  {link.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={() => setShowMobileShopMenu(!showMobileShopMenu)}
                        className="w-full text-2xl font-display font-light text-cream-100 hover:text-gold-400 transition-colors duration-300 flex items-center justify-between"
                      >
                        <span>{link.name}</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-300 ${showMobileShopMenu ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {showMobileShopMenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-2 pl-4 border-l-2 border-gold-500/20">
                              {shopCategories.map((category) => (
                                <Link
                                  key={category.name}
                                  href={category.href}
                                  onClick={() => {
                                    setIsOpen(false)
                                    setShowMobileShopMenu(false)
                                  }}
                                  className="block py-2 text-base text-cream-300 hover:text-gold-400 transition-colors"
                                >
                                  <div className="font-light">{category.name}</div>
                                  <div className="text-xs text-cream-500/50 mt-0.5">{category.description}</div>
                                </Link>
                              ))}
                              <Link
                                href="/shop"
                                onClick={() => {
                                  setIsOpen(false)
                                  setShowMobileShopMenu(false)
                                }}
                                className="block py-2 mt-3 text-center text-sm text-gold-400 border border-gold-500/30 rounded hover:bg-gold-500/10 transition-colors"
                              >
                                View All Products
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-display font-light text-cream-100 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
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
                >
                  <Instagram className="w-5 h-5 text-cream-100" />
                </a>
                <a
                  href="mailto:bookings@makeupbyamy.com"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-cream-100" />
                </a>
                <a
                  href="tel:+27847017012"
                  className="p-3 border border-gold-500/20 hover:border-gold-500/40 transition-colors duration-300"
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
