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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
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
  }

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent" />
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
            className="inline-block text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Book Your </span>
            <span className="gradient-text">Session</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
            <div className="p-8 rounded-3xl glass border border-white/10">
              <h3 className="font-display text-2xl font-bold text-white mb-6">
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
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{item.label}</p>
                          <p className="text-white font-medium group-hover:text-gold-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{item.label}</p>
                          <p className="text-white font-medium">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Follow my work</p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://instagram.com/amyb_mup"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/_amyy_mua"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white"
                  >
                    <Instagram className="w-5 h-5" />
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
              className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/20 to-rose-500/20 border border-gold-500/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h4 className="font-medium text-white">Quick Response</h4>
              </div>
              <p className="text-sm text-gray-300">
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
            <div className="p-8 rounded-3xl glass border border-white/10">
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
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                        placeholder="jane@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                        placeholder="084 000 0000"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service Type *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all appearance-none cursor-pointer"
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tell me about your project *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all resize-none"
                      placeholder="Describe your project, event date, number of people, location, and any specific requirements..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-rose-500 text-dark-900 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
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
