'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { ExternalLink, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const portfolioItems = [
  {
    id: 1,
    title: 'Glamour Editorial',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop',
    likes: 234,
  },
  {
    id: 2,
    title: 'SFX Prosthetics',
    category: 'SFX',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=800&fit=crop',
    likes: 456,
  },
  {
    id: 3,
    title: 'Bridal Beauty',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop',
    likes: 312,
  },
  {
    id: 4,
    title: 'Film Production',
    category: 'Film',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=800&fit=crop',
    likes: 567,
  },
  {
    id: 5,
    title: 'Music Video',
    category: 'TVC',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&h=800&fit=crop',
    likes: 289,
  },
  {
    id: 6,
    title: 'Fashion Editorial',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1560577812-93b22e6d0f2e?w=600&h=800&fit=crop',
    likes: 423,
  },
  {
    id: 7,
    title: 'Character Makeup',
    category: 'Film',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=800&fit=crop',
    likes: 378,
  },
  {
    id: 8,
    title: 'Airbrush Perfection',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop',
    likes: 445,
  },
]

const categories = ['All', 'Beauty', 'SFX', 'Film', 'Bridal', 'Editorial', 'TVC']

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      
      <motion.div style={{ opacity }} className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-gold-400 text-sm font-medium uppercase tracking-[0.2em] mb-4"
            >
              Portfolio
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Featured </span>
              <span className="gradient-text">Work</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A curated selection of my best makeup artistry spanning film, television, 
              beauty editorials, and special effects.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-gold-500 to-rose-500 text-dark-900'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative px-4"
        >
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '.portfolio-prev',
              nextEl: '.portfolio-next',
            }}
            className="portfolio-swiper !overflow-visible"
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {filteredItems.map((item, index) => (
              <SwiperSlide key={item.id} className="!w-[300px] sm:!w-[350px]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Category Badge */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 1 : 0.7,
                        y: hoveredItem === item.id ? 0 : 5
                      }}
                      className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium w-fit mb-3"
                    >
                      {item.category}
                    </motion.span>
                    
                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {item.likes}
                      </span>
                    </div>
                    
                    {/* Hover Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 1 : 0,
                        y: hoveredItem === item.id ? 0 : 20
                      }}
                      className="flex items-center gap-3 mt-4"
                    >
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-dark-900 text-sm font-medium hover:bg-gold-400 transition-colors">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  </div>

                  {/* Border Glow on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    className="absolute inset-0 rounded-2xl border-2 border-gold-500/50 pointer-events-none"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="portfolio-prev absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-white/10 hover:border-gold-500/50 transition-all">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="portfolio-next absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-white/10 hover:border-gold-500/50 transition-all">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/amyb_mup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors group"
          >
            <span>See more on Instagram</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
