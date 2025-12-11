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
    <footer className="relative bg-dark-950 border-t border-gold-500/10">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group flex flex-col gap-1 mb-8">
              <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                AMY MORGENROOD
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60">
                Makeup Artist
              </span>
            </Link>
            <p className="text-cream-300/70 text-sm leading-relaxed mb-8 font-light">
              Professional makeup artist with 8+ years on-set experience. 
              Internationally qualified (ITEC) specializing in Film, SFX, 
              Beauty, Airbrush & Hair Styling.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
              <motion.a
                href="mailto:bookings@makeupbyamy.co.za"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
              <motion.a
                href="tel:+27847017012"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream-300/70 hover:text-cream-100 transition-colors duration-300 text-sm font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream-300/70 hover:text-cream-100 transition-colors duration-300 text-sm font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+27847017012"
                  className="flex items-center gap-3 text-cream-300/70 hover:text-cream-100 transition-colors duration-300 text-sm font-light group"
                >
                  <Phone className="w-4 h-4" />
                  <span>084 701 7012</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:bookings@makeupbyamy.co.za"
                  className="flex items-center gap-3 text-cream-300/70 hover:text-cream-100 transition-colors duration-300 text-sm font-light group"
                >
                  <Mail className="w-4 h-4" />
                  <span>bookings@makeupbyamy.co.za</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-cream-500/50 text-sm font-light">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    11 Tennessee St, Langeberg Heights<br />
                    Cape Town, 7570
                  </span>
                </div>
              </li>
            </ul>
            
            {/* IMDb Badge */}
            <div className="mt-8 p-4 bg-dark-900/50 border border-gold-500/10">
              <p className="text-[9px] tracking-[0.15em] uppercase text-cream-500/40 mb-2">Featured On</p>
              <a
                href="https://www.imdb.com/name/nm12345678/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/80 hover:text-gold-400 text-xs tracking-wide transition-colors duration-300"
              >
                View IMDb Profile →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gold-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-500/40 text-xs tracking-wide flex items-center gap-1.5 font-light">
              © {new Date().getFullYear()} Amy Morgenrood. Crafted with 
              <Heart className="w-3 h-3 text-gold-500/60 fill-gold-500/60" /> 
              in Cape Town
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-cream-500/40 hover:text-cream-500/70 text-xs tracking-wide transition-colors duration-300 font-light"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="absolute right-8 bottom-8 p-3 bg-cream-100 hover:bg-gold-400 transition-colors duration-300"
      >
        <ArrowUp className="w-4 h-4 text-dark-950" />
      </motion.button>
    </footer>
  )
}
