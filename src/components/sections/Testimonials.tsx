'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Production Manager',
    company: 'Cape Town Studios',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: "Amy's professionalism and talent are unmatched. She transformed our entire cast for a period piece and maintained perfect continuity throughout the 3-month shoot.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Peters',
    role: 'Director',
    company: 'Independent Films SA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Working with Amy on our SFX sequences was incredible. Her prosthetic work is phenomenal and she brings such creativity to every project.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa van der Berg',
    role: 'Bride',
    company: 'Wedding Client',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: "Amy made me feel like the most beautiful bride. She listened to exactly what I wanted and created a look that was even better than I imagined. Lasted all day!",
    rating: 5,
  },
  {
    id: 4,
    name: 'Thabo Mokoena',
    role: 'Music Artist',
    company: 'Sony Music Africa',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: "Amy did the makeup for my latest music video and absolutely killed it. She understood the concept instantly and created looks that perfectly matched the aesthetic.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Emma Smith',
    role: 'Lead Actress',
    company: 'Feature Film',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    content: 'Having Amy on set was a dream. She made the long shoot days so much easier with her efficiency and the makeup always looked flawless on camera.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden bg-dark-800">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
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
            Testimonials
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Client </span>
            <span className="gradient-text">Love</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working with me.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
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
                  className="h-full p-8 rounded-3xl glass border border-white/10 hover:border-gold-500/30 transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-gold-500/30 mb-6" />

                  {/* Content */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">
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
