'use client'

import { useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  CheckCircle,
  Loader2,
  Sparkles,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '084 701 7012',
    href: 'tel:+27847017012',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'rubyroyal1@gmail.com',
    href: 'mailto:rubyroyal1@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Cape Town, South Africa',
    href: 'https://maps.google.com/?q=Cape+Town+South+Africa',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Cape Town bookings available by enquiry',
    href: null,
  },
]

const serviceTypes = [
  'Private Makeup Appointment',
  'Film & TV Production',
  'SFX & Prosthetics',
  'Agency / Commercial Booking',
  'Beauty & Editorial',
  'Bridal & Events',
  'Hair Styling',
  'Other',
]

const instaFeed = [
  { src: '/assets/portfolio/IMG_20240713_075631_187.jpg', alt: 'Beauty makeup post' },
  { src: '/assets/portfolio/FB_IMG_1487892884148.jpg', alt: 'SFX makeup post' },
  { src: '/assets/portfolio/IMG_20240713_075631_238.jpg', alt: 'Bridal makeup post' },
  { src: '/assets/portfolio/IMG_20240713_080002_348.jpg', alt: 'Glamour makeup post' },
  { src: '/assets/portfolio/FB_IMG_1487892965084.jpg', alt: 'Special effects makeup post' },
  { src: '/assets/portfolio/IMG_20240713_080002_434.jpg', alt: 'Editorial makeup post' },
]

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  })

  useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: `New Booking Inquiry - ${formData.service}`,
          message: `
Service Type: ${formData.service}
Preferred Date: ${formData.date || 'Not specified'}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
          `,
          from_name: 'Amy Morgenrood Website',
          to_email: 'rubyroyal1@gmail.com',
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error('Form submission failed')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: '',
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try emailing directly at rubyroyal1@gmail.com')
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/3 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-500/80 text-xs tracking-[0.3em] uppercase mb-6"
          >
            Get In Touch
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-6">
            Book Amy
          </h2>
          <p className="text-cream-300/80 text-lg max-w-[42rem] mx-auto font-light leading-relaxed">
            Send a private booking, bridal enquiry, film brief or agency request. The form is
            kept simple so you can get a fast reply.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-[1.75rem] p-8 bg-dark-900/50 border border-gold-500/10">
              <h3 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-8">
                Booking Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 rounded-2xl p-4 bg-dark-950/50 border border-gold-500/5 hover:border-gold-500/20 transition-all duration-300 group"
                      >
                        <item.icon className="w-4 h-4 text-gold-500/60 mt-0.5" />
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40">
                            {item.label}
                          </p>
                          <p className="text-cream-100 text-sm font-light group-hover:text-gold-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl p-4 bg-dark-950/50 border border-gold-500/5">
                        <item.icon className="w-4 h-4 text-gold-500/60 mt-0.5" />
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40">
                            {item.label}
                          </p>
                          <p className="text-cream-100 text-sm font-light">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gold-500/10">
                <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40 mb-4">
                  Follow my work
                </p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://instagram.com/amyb_mup"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" fill="currentColor">
                      <path d="M21 8.5c-1.8 0-3.4-.7-4.6-1.8v7.5a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1v2.4a3.2 3.2 0 1 0 2.2 3v-9h2.5c.6 1.6 2.1 2.7 3.9 2.9v2.6z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/@amybinspirations7694"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </motion.a>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-cream-500/50">
                      Instagram Feed
                    </span>
                    <a
                      href="https://instagram.com/amyb_mup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[0.2em] uppercase text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      @amyb_mup
                    </a>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {instaFeed.map((item, idx) => (
                      <a
                        key={item.src}
                        href="https://instagram.com/amyb_mup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden border border-gold-500/10 hover:border-rose-500/40 transition-colors"
                        aria-label={`Open Instagram post ${idx + 1}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 30vw, 120px"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-[1.5rem] p-6 bg-gold-500/5 border border-gold-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-4 h-4 text-gold-500/80" />
                <h4 className="text-xs tracking-[0.15em] uppercase text-cream-100">Quick Response</h4>
              </div>
              <p className="text-sm text-cream-300/70 font-light">
                Most enquiries are answered within 24 hours. For urgent same-week bookings, call
                or WhatsApp directly.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-[1.75rem] p-8 bg-dark-900/70 border border-gold-500/30">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 border border-gold-500/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-gold-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-light text-cream-100 mb-3">
                    Message Sent
                  </h3>
                  <p className="text-cream-500/60 font-light">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="084 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                      Service Type *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-all appearance-none cursor-pointer font-light"
                    >
                      <option value="" className="bg-dark-800">
                        Select the type of booking
                      </option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service} className="bg-dark-800">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                      Tell me about your project *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3.5 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all resize-none font-light"
                      placeholder="Tell me the location, date, call time or appointment time, number of people, and the kind of makeup support you need."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full rounded-full py-4 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-gold-400 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
