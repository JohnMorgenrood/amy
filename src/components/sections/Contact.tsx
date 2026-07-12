'use client'

import { useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Send,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  Loader2,
  Sparkles,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from 'lucide-react'
import { trackLeadClick } from '@/components/tracking/TrackedContactLink'
import { getLeadAttributionForSubmit } from '@/components/tracking/AttributionCapture'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '084 701 7012',
    href: 'tel:+27847017012',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message Amy directly',
    href: 'https://wa.me/27847017012',
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

const facebookUrl = 'https://www.facebook.com/share/1CE4F4CZnP/'
const tiktokUrl = 'https://www.tiktok.com/@amyb_mup?_r=1&_t=ZS-95umNruEh0q'

const serviceTypes = [
  'Private Makeup Appointment',
  'Film & TV Production',
  'Makeup Department Coordination / Production Support',
  'Continuity / Standby Makeup Support',
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

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Contact() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
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

  const today = new Date()
  const todayKey = getDateKey(today)
  const calendarDays = getCalendarDays(visibleMonth)
  const selectedDateLabel = formData.date ? formatSelectedDate(formData.date) : 'No date selected yet'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          message: formData.message,
          attribution: getLeadAttributionForSubmit(),
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Form submission failed')
      }

      setIsSubmitting(false)
      router.push('/thank-you')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try calling or sending a WhatsApp message instead.')
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
                        onClick={() => {
                          if (item.href?.startsWith('tel:')) {
                            trackLeadClick({ action: 'phone_call_click', label: 'contact_info_phone' })
                          }
                          if (item.href?.includes('wa.me/27847017012')) {
                            trackLeadClick({ action: 'whatsapp_click', label: 'contact_info_whatsapp' })
                          }
                        }}
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
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full p-3 border border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5 text-cream-100 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" fill="currentColor">
                      <path d="M15.1 8.3h2.1V4.8c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5.9v3.9h3.3v7.1h4v-7.1h3.3l.5-3.9h-3.8v-2.5c0-1.1.3-1.9 1.9-1.9z" />
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
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="rounded-[1.5rem] border border-gold-500/10 bg-dark-950/35 p-5">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-4 w-4 text-gold-500/80" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gold-500/75">
                          Booking Flow
                        </p>
                        <p className="text-sm font-light text-cream-300/75">
                          Pick the service, choose a date, then add the brief. The form will take care of the rest.
                        </p>
                      </div>
                    </div>
                  </div>

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

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80 mb-3">
                        Service Type *
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {serviceTypes.map((service) => {
                          const isActive = formData.service === service

                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => setFormData({ ...formData, service })}
                              className={`rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                                isActive
                                  ? 'border-gold-500/50 bg-gold-500/10 text-cream-100'
                                  : 'border-gold-500/10 bg-dark-800/70 text-cream-300/75 hover:border-gold-500/30 hover:bg-dark-800'
                              }`}
                            >
                              <span className="block text-sm font-light leading-relaxed">{service}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-cream-300/80">
                          Preferred Date
                        </label>
                        <span className="text-xs font-light text-gold-400/75">{selectedDateLabel}</span>
                      </div>
                      <div className="rounded-[1.5rem] border border-gold-500/20 bg-dark-800/75 p-4 sm:p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleMonth(
                                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
                              )
                            }
                            aria-label="Show previous month"
                            className="rounded-full border border-gold-500/20 p-2 text-cream-200 transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-400"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <p className="text-sm uppercase tracking-[0.18em] text-cream-100">
                            {visibleMonth.toLocaleDateString('en-ZA', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleMonth(
                                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
                              )
                            }
                            aria-label="Show next month"
                            className="rounded-full border border-gold-500/20 p-2 text-cream-200 transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-400"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mb-3 grid grid-cols-7 gap-2">
                          {weekdayLabels.map((label) => (
                            <span
                              key={label}
                              className="text-center text-[10px] uppercase tracking-[0.15em] text-cream-500/50"
                            >
                              {label}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {calendarDays.map((day, index) => {
                            if (!day) {
                              return <div key={`empty-${index}`} className="aspect-square" />
                            }

                            const isPast = day.key < todayKey
                            const isSelected = formData.date === day.key
                            const isToday = day.key === todayKey

                            return (
                              <button
                                key={day.key}
                                type="button"
                                disabled={isPast}
                                onClick={() => setFormData({ ...formData, date: day.key })}
                                aria-label={`Select ${day.label}`}
                                className={`aspect-square rounded-2xl border text-sm transition-all duration-300 ${
                                  isSelected
                                    ? 'border-gold-500/60 bg-gold-500/15 text-cream-100'
                                    : isPast
                                      ? 'cursor-not-allowed border-gold-500/5 bg-dark-950/30 text-cream-500/20'
                                      : isToday
                                        ? 'border-rose-400/40 bg-rose-400/10 text-cream-100 hover:border-gold-500/40 hover:text-gold-300'
                                        : 'border-gold-500/10 bg-dark-950/30 text-cream-300/80 hover:border-gold-500/35 hover:text-gold-300'
                                }`}
                              >
                                {day.day}
                              </button>
                            )
                          })}
                        </div>
                      </div>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function getDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getCalendarDays(visibleMonth: Date) {
  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days: Array<{ day: number; key: string; label: string } | null> = []

  for (let i = 0; i < startOffset; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const current = new Date(year, month, day)
    days.push({
      day,
      key: getDateKey(current),
      label: current.toLocaleDateString('en-ZA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    })
  }

  while (days.length % 7 !== 0) {
    days.push(null)
  }

  return days
}

function formatSelectedDate(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue
  }

  return parsedDate.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
