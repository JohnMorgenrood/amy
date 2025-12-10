'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { 
  Film, 
  Calendar, 
  Star, 
  ExternalLink,
  Play,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const projects = [
  {
    id: 1,
    title: 'The Woman King',
    year: '2022',
    type: 'Feature Film',
    role: 'Hair & Makeup Artist',
    description: 'Epic historical action drama directed by Gina Prince-Bythewood, starring Viola Davis.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
    rating: 76,
    link: 'https://www.imdb.com/title/tt8093700/',
  },
  {
    id: 2,
    title: 'Alphas',
    year: '2024',
    type: 'TV Series',
    role: 'Key Makeup Artist',
    description: 'Action-packed series requiring diverse character looks and continuity management.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
    rating: null,
    link: 'https://www.imdb.com/name/nm12345678/',
  },
  {
    id: 3,
    title: 'Help',
    year: '2026',
    type: 'Feature Film',
    role: 'Makeup Department',
    description: 'Upcoming production showcasing versatile makeup artistry across various scenes.',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 4,
    title: 'Music Video Collection',
    year: '2023-2024',
    type: 'Music Videos',
    role: 'Lead Makeup Artist',
    description: 'Various high-profile music video productions for South African artists.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 5,
    title: 'TVC Campaign',
    year: '2024',
    type: 'Commercial',
    role: 'Beauty Makeup Artist',
    description: 'National television commercial campaigns for major South African brands.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
]

const credentials = [
  { name: 'IMDb', logo: '/logos/imdb.svg', url: 'https://www.imdb.com/name/nm12345678/' },
  { name: 'Call a Crew', logo: '/logos/callacrew.svg', url: 'https://www.callacrew.co.za/crew/amy-morgenrood' },
  { name: 'Metacritic', logo: '/logos/metacritic.svg', url: 'https://www.metacritic.com/person/amy-morgenrood' },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-dark-950"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
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
            Filmography
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
            Movies & Productions
          </h2>
          <p className="text-cream-300/80 text-lg max-w-2xl mx-auto font-light">
            Featured in major film and television productions, bringing characters to life 
            through the art of makeup.
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '.projects-prev',
              nextEl: '.projects-next',
            }}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.2 },
            }}
            className="projects-swiper !pb-16"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-14 h-14 bg-cream-100/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-cream-100/20"
                      >
                        <Play className="w-5 h-5 text-cream-100 ml-0.5" />
                      </motion.div>
                    </motion.div>

                    {/* Rating Badge */}
                    {project.rating && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20">
                        <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                        <span className="text-xs text-gold-400">{project.rating}</span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20">
                      <span className="text-[10px] tracking-[0.1em] uppercase text-gold-400/80">{project.type}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-cream-500/40 text-xs tracking-wide mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </span>
                      <span className="w-px h-3 bg-gold-500/20" />
                      <span className="flex items-center gap-1.5">
                        <Film className="w-3 h-3" />
                        {project.role}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-light text-cream-100 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-cream-300/70 text-sm font-light mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-400/80 hover:text-gold-400 text-xs tracking-[0.15em] uppercase group/link transition-colors duration-300"
                    >
                      <span>View on IMDb</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="projects-prev absolute left-0 top-1/3 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hidden lg:block">
            <ChevronLeft className="w-5 h-5 text-cream-100" />
          </button>
          <button className="projects-next absolute right-0 top-1/3 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hidden lg:block">
            <ChevronRight className="w-5 h-5 text-cream-100" />
          </button>
        </motion.div>

        {/* Credentials Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-8 bg-dark-900/50 border border-gold-500/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Award className="w-6 h-6 text-gold-500/80" />
              <div>
                <h4 className="text-xs tracking-[0.15em] uppercase text-cream-100">Industry Profiles</h4>
                <p className="text-xs text-cream-500/50 font-light mt-1">View my professional credentials</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.imdb.com/name/nm12345678/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#f5c518]/10 border border-[#f5c518]/30 text-[#f5c518] text-xs tracking-[0.1em] uppercase hover:bg-[#f5c518]/20 transition-colors duration-300"
              >
                IMDb
              </a>
              <a
                href="https://www.callacrew.co.za/crew/amy-morgenrood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-dark-950/50 border border-gold-500/20 text-cream-100 text-xs tracking-[0.1em] uppercase hover:border-gold-500/40 transition-colors duration-300"
              >
                Call a Crew
              </a>
              <a
                href="https://www.metacritic.com/person/amy-morgenrood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-dark-950/50 border border-gold-500/20 text-cream-100 text-xs tracking-[0.1em] uppercase hover:border-gold-500/40 transition-colors duration-300 hidden sm:block"
              >
                Metacritic
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
