'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'Zanele Dlamini',
    role: 'Production Manager',
    company: 'Cape Town Studios',
    content:
      'Amy kept our department calm, organised and camera-ready throughout a demanding shoot. Her continuity and speed made a real difference on set.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pieter van Rooyen',
    role: 'Director',
    company: 'Independent Films SA',
    content:
      'Working with Amy on our SFX scenes was excellent. She understood the brief quickly and delivered makeup that looked strong on camera and held up through the day.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Thabo Mokoena',
    role: 'Music Artist',
    company: 'Sony Music Africa',
    content:
      'Amy understood the visual direction right away and translated it into a clean, strong look that worked perfectly for video and stills.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lindiwe Nkosi',
    role: 'Lead Actress',
    company: 'Feature Film',
    content:
      'Amy is efficient, warm and very steady under pressure. Long shoot days felt easier because the makeup always looked right and touch-ups were never a scramble.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-dark-950 py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-block text-xs uppercase tracking-[0.3em] text-gold-500/80"
          >
            Testimonials
          </motion.span>
          <h2 className="mb-8 font-display text-4xl font-light text-cream-100 sm:text-5xl lg:text-6xl">
            What Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-cream-300/80">
            Feedback from production teams, directors, performers and commercial creatives who
            have worked with Amy in Cape Town.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
            }}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full border border-gold-500/10 bg-dark-900/50 p-8 transition-all duration-500 hover:border-gold-500/20"
                >
                  <Quote className="mb-8 h-8 w-8 text-gold-500/20" />

                  <p className="mb-8 font-light italic leading-relaxed text-cream-200/80">
                    "{testimonial.content}"
                  </p>

                  <div className="mb-8 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold-500/60 text-gold-500/60" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 border-t border-gold-500/10 pt-6">
                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden border border-gold-500/20 bg-gold-500/10">
                      <span className="text-xl font-light text-gold-400">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-light text-cream-100">{testimonial.name}</h4>
                      <p className="text-xs tracking-wide text-cream-500/50">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
