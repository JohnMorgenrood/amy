'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
  ArrowUp,
  Heart,
  Share2,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react'

const brandImagePath = '/assets/thumbnails/logo-design-for-amy-mup-makeup-brand-elegant-and-m.jpeg'

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Production Makeup', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'Private Makeup', href: '/private-makeup-artist-cape-town' },
  { name: 'Bridal Makeup', href: '/bridal-makeup-artist-cape-town' },
  { name: 'Service Areas', href: '/service-areas' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
]

const serviceLinks = [
  { name: 'Film & TV Makeup', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'SFX & Prosthetics', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'Commercial & Editorial', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'Hair Styling', href: '/film-tv-commercial-makeup-artist-cape-town' },
  { name: 'Private Makeup', href: '/private-makeup-artist-cape-town' },
  { name: 'Bridal Makeup', href: '/bridal-makeup-artist-cape-town' },
]

export function SiteFooter() {
  const [copied, setCopied] = useState(false)
  const siteUrl = 'https://www.amymup.shop'
  const shareText =
    'Take a look at Amy MUP - Cape Town makeup artist for film, bridal, private and production bookings.'
  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${siteUrl}`)}`

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Amy MUP',
          text: shareText,
          url: siteUrl,
        })
        return
      } catch {
        return
      }
    }

    await handleCopyLink()
  }

  return (
    <footer className="relative border-t border-gold-500/10 bg-dark-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="group mb-8 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gold-500/20 bg-dark-900/80 shadow-[0_0_32px_rgba(212,175,55,0.08)]">
                <Image
                  src={brandImagePath}
                  alt="Amy MUP logo"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-xl font-light tracking-[0.1em] text-cream-100">
                  AMY MUP
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold-500/60">
                  Amy Morgenrood
                </span>
              </div>
            </Link>
            <p className="mb-8 text-sm font-light leading-relaxed text-cream-300/70">
              Makeup artist in Cape Town for film, TV, SFX, private appointments, bridal bookings,
              editorial work and commercial productions.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center border border-gold-500/40 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-gold-200 transition-colors duration-300 hover:bg-gold-400 hover:text-dark-950"
            >
              Request Booking
            </Link>
            <div className="mt-6 rounded-[1.5rem] border border-gold-500/10 bg-dark-900/45 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500/75">Share This Site</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-cream-300/70">
                Share the homepage directly, open a WhatsApp share, or copy the link for later.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-500/45 hover:bg-gold-500/8"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share Site
                </button>
                <a
                  href={whatsappShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-500/45 hover:bg-gold-500/8"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-cream-100 transition-colors duration-300 hover:border-gold-500/45 hover:bg-gold-500/8"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-[0.2em] text-gold-500/80">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-cream-300/70 transition-colors duration-300 hover:text-cream-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-[0.2em] text-gold-500/80">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-cream-300/70 transition-colors duration-300 hover:text-cream-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] uppercase tracking-[0.2em] text-gold-500/80">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+27847017012"
                  className="flex items-center gap-3 text-sm font-light text-cream-300/70 transition-colors duration-300 hover:text-cream-100"
                >
                  <Phone className="h-4 w-4" />
                  <span>084 701 7012</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:golearnx@gmail.com"
                  className="flex items-center gap-3 text-sm font-light text-cream-300/70 transition-colors duration-300 hover:text-cream-100"
                >
                  <Mail className="h-4 w-4" />
                  <span>golearnx@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm font-light text-cream-500/50">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    Cape Town
                    <br />
                    Western Cape, South Africa
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
                className="border border-gold-500/20 p-3 transition-all duration-300 hover:border-gold-500/40 hover:bg-gold-500/5"
              >
                <Instagram className="h-4 w-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@amybinspirations7694"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="YouTube"
                className="border border-gold-500/20 p-3 transition-all duration-300 hover:border-gold-500/40 hover:bg-gold-500/5"
              >
                <Youtube className="h-4 w-4 text-cream-500/60 hover:text-cream-100" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-gold-500/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="flex items-center gap-1.5 text-xs tracking-wide text-cream-500/40">
              © {new Date().getFullYear()} Amy Morgenrood. Crafted with
              <Heart className="h-3 w-3 fill-gold-500/60 text-gold-500/60" />
              in Cape Town
            </p>
            <a
              href="https://www.johnsdev.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.18em] text-gold-400/70 underline underline-offset-4 transition-colors duration-300 hover:text-gold-300"
            >
              johnsdev.space
            </a>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="absolute right-8 bottom-8 bg-cream-100 p-3 transition-colors duration-300 hover:bg-gold-400"
      >
        <ArrowUp className="h-4 w-4 text-dark-950" />
      </motion.button>
    </footer>
  )
}
