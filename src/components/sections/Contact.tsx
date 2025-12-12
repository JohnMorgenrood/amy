'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Instagram,
  CheckCircle,
  Loader2,
  Sparkles
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '084 701 7012',
    href: 'tel:+27847017012',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'bookings@makeupbyamy.co.za',
    href: 'mailto:bookings@makeupbyamy.co.za',
    color: 'from-gold-500 to-amber-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Cape Town, South Africa',
    href: 'https://maps.google.com/?q=Langeberg+Heights+Cape+Town',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Mon - Sat: 7AM - 7PM',
    href: null,
    color: 'from-violet-500 to-purple-500',
  },
]

const serviceTypes = [
  'Film & TV Production',
  'SFX & Prosthetics',
  'Beauty & Editorial',
  'Bridal & Events',
  'Commercial/TVC',
  'Other',
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Get min date (today) and max date for calendar
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Check if a date is booked
  const isDateBooked = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Booked until December 20th, 2025
    if (year === 2025 && month === 12 && day <= 20) return true

    // Booked December 21st-22nd
    if (year === 2025 && month === 12 && (day === 21 || day === 22)) return true

    // Available December 23rd-24th (not booked)
    if (year === 2025 && month === 12 && (day === 23 || day === 24)) return false

    // Booked December 25th-26th (Christmas)
    if (year === 2025 && month === 12 && (day === 25 || day === 26)) return true

    // Booked December 27th - January 26th
    if (year === 2025 && month === 12 && day >= 27) return true
    if (year === 2026 && month === 1 && day <= 26) return true

    // Available from January 27th onwards
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
      
      if (result.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset after showing success
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
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try emailing directly at rubyroyal1@gmail.com')
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/3 via-transparent to-transparent" />
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
            Get In Touch
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
            Book Your Session
          </h2>
          <p className="text-cream-300/80 text-lg max-w-2xl mx-auto font-light">
            Ready to transform your vision into reality? Let's discuss your project and create something beautiful together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-8 bg-dark-900/50 border border-gold-500/10">
              <h3 className="text-xs tracking-[0.2em] uppercase text-gold-500/80 mb-8">
                Contact Information
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
                        className="flex items-start gap-4 p-4 bg-dark-950/50 border border-gold-500/5 hover:border-gold-500/20 transition-all duration-300 group"
                      >
                        <item.icon className="w-4 h-4 text-gold-500/60 mt-0.5" />
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40">{item.label}</p>
                          <p className="text-cream-100 text-sm font-light group-hover:text-gold-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 bg-dark-950/50 border border-gold-500/5">
                        <item.icon className="w-4 h-4 text-gold-500/60 mt-0.5" />
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40">{item.label}</p>
                          <p className="text-cream-100 text-sm font-light">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gold-500/10">
                <p className="text-[10px] tracking-[0.15em] uppercase text-cream-500/40 mb-4">Follow my work</p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://instagram.com/amyb_mup"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/_amyy_mua"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Quick Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gold-500/5 border border-gold-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-4 h-4 text-gold-500/80" />
                <h4 className="text-xs tracking-[0.15em] uppercase text-cream-100">Quick Response</h4>
              </div>
              <p className="text-sm text-cream-300/70 font-light">
                I typically respond to inquiries within 24 hours. For urgent bookings, 
                please call directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 bg-dark-900/70 border border-gold-500/30">
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
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="Jane Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="jane@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                        placeholder="084 000 0000"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={getMinDate()}
                        onChange={(e) => {
                          const selectedDate = e.target.value
                          if (isDateBooked(selectedDate)) {
                            alert('Sorry, Amy is booked on this date. Available dates:\n\n• Dec 23-24, 2025\n• Jan 27 onwards, 2026\n\nPlease select another date.')
                            setFormData({ ...formData, date: '' })
                          } else {
                            setFormData({ ...formData, date: selectedDate })
                          }
                        }}
                        className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                      />
                      <p className="mt-2 text-xs text-cream-500/50">
                        Available: Dec 23-24 • Booked: Dec 25 - Jan 26
                      </p>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                      Service Type *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-all appearance-none cursor-pointer font-light"
                    >
                      <option value="" className="bg-dark-800">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service} className="bg-dark-800">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                      Tell me about your project *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-800/80 border border-gold-500/30 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:border-gold-500/50 transition-all resize-none font-light"
                      placeholder="Describe your project, event date, number of people, location, and any specific requirements..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-gold-400 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
