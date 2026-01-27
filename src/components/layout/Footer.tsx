'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Mail, 
  Phone,
  MapPin,
  Youtube,
  ArrowUp,
  Heart
} from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Shop Home', href: '/shop' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Shipping & Returns', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Work with Amy', href: '/' },
  ],
  shopSite: [
    { name: 'Shop Home', href: '/shop' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Shipping & Returns', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ],
  services: [
    { name: 'Film & TV Makeup', href: '/#services' },
    { name: 'SFX & Prosthetics', href: '/#services' },
    { name: 'Beauty & Glam', href: '/#services' },
    { name: 'Airbrush Makeup', href: '/#services' },
    { name: 'Bridal', href: '/#services' },
    { name: 'Hair Styling', href: '/#services' },
  ]
}

export function ShopFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-950 border-t border-gold-500/10">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/shop" className="group flex flex-col gap-1 mb-6">
              <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                AMY'S MAKEUP STORE
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60">
                Curated Beauty Shop
              </span>
            </Link>
            <p className="text-cream-300/70 text-sm leading-relaxed mb-6 font-light">
              Shop curated makeup, skincare, and tools with premium delivery and secure checkout.
            </p>
            <div className="text-cream-300/70 text-sm font-light">
              Need help? Email us at{' '}
              <a href="mailto:rubyroyal1@gmail.com" className="text-[#D4AF37] hover:underline">
                rubyroyal1@gmail.com
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
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

          {/* Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">
              Social
            </h4>
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
                href="https://www.youtube.com/@amybinspirations7694"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Youtube className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
              <motion.a
                href="mailto:rubyroyal1@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gold-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-500/40 text-xs tracking-wide flex items-center gap-1.5 font-light">
              © {new Date().getFullYear()} Amy's Makeup Store. Crafted with 
              <Heart className="w-3 h-3 text-gold-500/60 fill-gold-500/60" /> 
              in Cape Town
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.johnsdev.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/70 hover:text-gold-300 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 font-light underline underline-offset-4"
              >
                https://www.johnsdev.space/
              </a>
              <Link
                href="/terms"
                className="text-cream-500/40 hover:text-cream-500/70 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-cream-500/40 hover:text-cream-500/70 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Privacy
              </Link>
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

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-950 border-t border-gold-500/10">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="group flex flex-col gap-1 mb-8">
              <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                AMY MORGENROOD
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60">
                Makeup Artist
              </span>
            </Link>
            <p className="text-cream-300/70 text-sm leading-relaxed mb-8 font-light">
              Professional makeup artist with 8+ years on-set experience. Internationally qualified (ITEC)
              specializing in Film, SFX, Beauty, Airbrush & Hair Styling.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-4 py-2.5 border border-gold-500/40 text-gold-200 hover:text-dark-950 hover:bg-gold-400 transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase"
              >
                Book a Session
              </Link>
              <span className="text-cream-500/50 text-xs tracking-wide font-light">
                Response time: within 24 hours
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">Navigation</h4>
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

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">Services</h4>
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

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shopSite.map((link) => (
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

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-6">Get In Touch</h4>
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
                  href="mailto:rubyroyal1@gmail.com"
                  className="flex items-center gap-3 text-cream-300/70 hover:text-cream-100 transition-colors duration-300 text-sm font-light group"
                >
                  <Mail className="w-4 h-4" />
                  <span>rubyroyal1@gmail.com</span>
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

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                href="https://instagram.com/amyb_mup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Instagram"
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@amybinspirations7694"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="YouTube"
                className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
              >
                <Youtube className="w-4 h-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gold-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-500/40 text-xs tracking-wide flex items-center gap-1.5 font-light">
              © {new Date().getFullYear()} Amy Morgenrood. Crafted with
              <Heart className="w-3 h-3 text-gold-500/60 fill-gold-500/60" />
              in Cape Town
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.johnsdev.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/70 hover:text-gold-300 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 font-light underline underline-offset-4"
              >
                https://www.johnsdev.space/
              </a>
              <Link
                href="/terms"
                className="text-cream-500/40 hover:text-cream-500/70 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-cream-500/40 hover:text-cream-500/70 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>

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
