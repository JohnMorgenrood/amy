'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  ArrowUp,
  Heart
} from 'lucide-react'

const footerLinks = {
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Film & TV Makeup', href: '#services' },
    { name: 'SFX & Prosthetics', href: '#services' },
    { name: 'Beauty & Glam', href: '#services' },
    { name: 'Airbrush Makeup', href: '#services' },
    { name: 'Bridal', href: '#services' },
    { name: 'Hair Styling', href: '#services' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-800 border-t border-white/5">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Sparkles className="w-8 h-8 text-gold-500" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold gradient-text">
                  AMY MORGENROOD
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                  Makeup Artist
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional makeup artist with 8+ years onset experience. 
              Internationally qualified (VTCT) specializing in Film, SFX, 
              Beauty, Airbrush & Hair Styling.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/50 transition-all"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-rose-400" />
              </motion.a>
              <motion.a
                href="mailto:bookings@makeupbyamy.co.za"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 transition-all"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-gold-400" />
              </motion.a>
              <motion.a
                href="tel:+27847017012"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 transition-all"
              >
                <Phone className="w-5 h-5 text-gray-400 hover:text-gold-400" />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+27847017012"
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>084 701 7012</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:bookings@makeupbyamy.co.za"
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>bookings@makeupbyamy.co.za</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    11 Tennessee St, Langeberg Heights<br />
                    Cape Town, 7570
                  </span>
                </div>
              </li>
            </ul>
            
            {/* IMDb Badge */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Featured On</p>
              <a
                href="https://www.imdb.com/name/nm12345678/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 font-medium text-sm"
              >
                View IMDb Profile →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} Amy Morgenrood. Crafted with 
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> 
              in Cape Town
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-8 bottom-8 p-3 rounded-full bg-gradient-to-r from-gold-500 to-rose-500 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-all"
      >
        <ArrowUp className="w-5 h-5 text-dark-900" />
      </motion.button>
    </footer>
  )
}
