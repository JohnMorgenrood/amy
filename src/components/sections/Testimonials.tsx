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
    id: 3,
    name: 'Annelie Botha',
    role: 'Bride',
    company: 'Wedding Client',
    content:
      'Amy made the whole morning easy. My makeup still looked beautiful hours later and felt like me, just more polished and photo-ready.',
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
    <section className="relative py-32 overflow-hidden bg-dark-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Testimonials
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
            What Clients Say
          </h2>
          <p className="text-cream-300/80 text-lg max-w-2xl mx-auto font-light">
            Feedback from production teams, private clients and bridal bookings who have worked
            with Amy in Cape Town.
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
                  className="h-full p-8 bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500"
                >
                  <Quote className="w-8 h-8 text-gold-500/20 mb-8" />

                  <p className="text-cream-200/80 leading-relaxed mb-8 font-light italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-gold-500/60 fill-gold-500/60" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-gold-500/10">
                    <div className="relative w-12 h-12 overflow-hidden border border-gold-500/20 bg-gold-500/10 flex items-center justify-center">
                      <span className="text-gold-400 text-xl font-light">
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
