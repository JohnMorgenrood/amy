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

// Featured Projects (shown in carousel)
const featuredProjects = [
  {
    id: 1,
    title: 'HELP',
    year: '2025',
    type: 'Feature Film',
    role: 'Makeup & Hair Coordinator / Key Makeup & SFX Artist',
    description: 'Blue Ice Africa production - Lead coordinator managing hair and makeup department with special effects expertise.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 2,
    title: 'Alphas',
    year: '2024',
    type: 'Feature Film',
    role: 'Key Makeup & SFX Artist',
    description: 'Moonlighting production - Key artist responsible for principal cast makeup and special effects.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 3,
    title: 'Recipes for Love and Murder S2',
    year: '2024',
    type: 'Feature Film',
    role: 'Makeup & SFX Artist',
    description: 'Both Worlds production - Season 2 of the beloved South African mystery drama series.',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop',
    rating: null,
    link: 'https://www.imdb.com/title/tt13406036/',
  },
  {
    id: 4,
    title: 'King Shaka',
    year: '2024',
    type: 'Feature Film',
    role: 'Makeup & SFX Artist',
    description: 'Film Afrika epic production telling the story of the legendary Zulu king.',
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 5,
    title: 'The Woman King',
    year: '2022',
    type: 'Feature Film',
    role: 'Makeup Artist',
    description: 'TriStar Pictures epic historical action drama directed by Gina Prince-Bythewood, starring Viola Davis.',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=450&fit=crop',
    rating: 76,
    link: 'https://www.imdb.com/title/tt8093700/',
  },
  {
    id: 6,
    title: 'American Monster S7-9',
    year: '2023',
    type: 'TV Series',
    role: 'Hair & Makeup Artist',
    description: 'Trilogy Creative Studios production - Multiple seasons of the true crime documentary series.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=450&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 7,
    title: 'Black Sails',
    year: '2017',
    type: 'TV Series',
    role: 'Crowd Makeup Daily',
    description: 'Critically acclaimed Starz pirate drama series, prequel to Treasure Island.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
    rating: 81,
    link: 'https://www.imdb.com/title/tt2375692/',
  },
  {
    id: 8,
    title: 'Tomb Raider',
    year: '2018',
    type: 'Feature Film',
    role: 'Crowd Makeup Daily',
    description: 'Action adventure film starring Alicia Vikander as the iconic Lara Croft.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    rating: 51,
    link: 'https://www.imdb.com/title/tt1365519/',
  },
]

// Additional Credits (shown in grid below)
const additionalCredits = [
  { title: 'This Water - Evelyn Hart', type: 'Music Video', role: 'Head Makeup & Hair Artist' },
  { title: 'Baas se Honne', type: 'Short Film', role: 'Hair & Makeup / SFX Artist' },
  { title: 'The Dark Tower', type: 'Feature Film', role: 'Crowd Makeup Daily' },
  { title: 'The Kissing Booth', type: 'Feature Film', role: 'Crowd Makeup Daily' },
  { title: 'Troy: Fall of a City', type: 'TV Series', role: 'Crowd Makeup Daily' },
  { title: 'Of Kings & Prophets', type: 'TV Series', role: 'Crowd Makeup Daily' },
  { title: 'Blood Drive', type: 'TV Series', role: 'Crowd Makeup Daily' },
  { title: 'PEP Valentines', type: 'Commercial', role: 'Makeup & Hair Artist' },
  { title: 'Pavesini', type: 'Commercial', role: 'Makeup & Hair Artist' },
  { title: 'Corona', type: 'Commercial', role: 'Makeup Artist' },
  { title: 'Castle Double Malt', type: 'Commercial', role: 'Hair & Makeup Assistant' },
  { title: 'Toyota Event', type: 'Event', role: 'Makeup Artist' },
  { title: 'Netflix Rebel Moon', type: 'Event', role: 'Makeup Artist & Body Painter' },
  { title: 'Cape Town Carnival', type: 'Event', role: 'Body Painter' },
  { title: 'Sanlam TVC', type: 'Commercial', role: 'Head Makeup Artist' },
  { title: 'Bread Financial TVC', type: 'Commercial', role: 'Hair & Makeup Assistant' },
  { title: 'BIG JOHN - Chicken Licken', type: 'Commercial', role: 'Assistant' },
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
            {featuredProjects.map((project, index) => (
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

        {/* Additional Credits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-center font-display text-2xl font-light text-cream-100 mb-2">
            Additional Credits
          </h3>
          <p className="text-center text-cream-500/50 text-sm mb-10">
            Music Videos • Commercials • Short Films • Prosthetics Work
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalCredits.map((credit, index) => (
              <motion.div
                key={credit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-dark-900/30 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="text-cream-100 text-sm font-light group-hover:text-gold-400 transition-colors duration-300">
                      {credit.title}
                    </h4>
                    <p className="text-cream-500/50 text-xs mt-1">{credit.role}</p>
                  </div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-gold-500/60 px-2 py-0.5 bg-gold-500/10 shrink-0">
                    {credit.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
