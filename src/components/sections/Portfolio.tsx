'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { ExternalLink, Eye, Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const portfolioItems = [
  {
    id: 1,
    title: 'Beauty Makeup',
    category: 'Beauty',
    image: '/assets/portfolio/IMG_20240713_075631_187.jpg',
    likes: 234,
  },
  {
    id: 2,
    title: 'SFX Prosthetics',
    category: 'SFX',
    image: '/assets/portfolio/FB_IMG_1487892884148.jpg',
    likes: 456,
  },
  {
    id: 3,
    title: 'Bridal Beauty',
    category: 'Bridal',
    image: '/assets/portfolio/IMG_20240713_075631_238.jpg',
    likes: 312,
  },
  {
    id: 4,
    title: 'Film Production',
    category: 'Film',
    image: '/assets/portfolio/1623238044587_20180608_131019.jpg',
    likes: 567,
  },
  {
    id: 5,
    title: 'Editorial Look',
    category: 'Editorial',
    image: '/assets/portfolio/IMG_20240713_075631_385.jpg',
    likes: 289,
  },
  {
    id: 6,
    title: 'Fashion Editorial',
    category: 'Editorial',
    image: '/assets/portfolio/IMG_20240713_075631_461.jpg',
    likes: 423,
  },
  {
    id: 7,
    title: 'Character Makeup',
    category: 'Film',
    image: '/assets/portfolio/FB_IMG_1487892910615.jpg',
    likes: 378,
  },
  {
    id: 8,
    title: 'Glamour Look',
    category: 'Beauty',
    image: '/assets/portfolio/IMG_20240713_080002_348.jpg',
    likes: 445,
  },
  {
    id: 9,
    title: 'Special Effects',
    category: 'SFX',
    image: '/assets/portfolio/FB_IMG_1487892965084.jpg',
    likes: 389,
  },
  {
    id: 10,
    title: 'Beauty Editorial',
    category: 'Beauty',
    image: '/assets/portfolio/IMG_20240713_080002_394.jpg',
    likes: 512,
  },
  {
    id: 11,
    title: 'Creative Look',
    category: 'Editorial',
    image: '/assets/portfolio/IMG_20240713_080002_434.jpg',
    likes: 367,
  },
  {
    id: 12,
    title: 'Film Set',
    category: 'Film',
    image: '/assets/portfolio/FB_IMG_1487893882973.jpg',
    likes: 298,
  },
  {
    id: 13,
    title: 'Prosthetics Work',
    category: 'SFX',
    image: '/assets/portfolio/1623237985505_FB_IMG_1487893847090.jpg',
    likes: 534,
  },
  {
    id: 14,
    title: 'Natural Beauty',
    category: 'Beauty',
    image: '/assets/portfolio/Screenshot_20250211_092255_Instagram.jpg',
    likes: 421,
  },
  {
    id: 15,
    title: 'On Set',
    category: 'Film',
    image: '/assets/portfolio/Screenshot_20250211_092306_Instagram.jpg',
    likes: 356,
  },
  {
    id: 16,
    title: 'Creative Makeup',
    category: 'Editorial',
    image: '/assets/portfolio/Screenshot_20250211_092335_Instagram.jpg',
    likes: 478,
  },
]

const categories = [
  { name: 'All', slug: '' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'SFX', slug: 'sfx' },
  { name: 'Film', slug: 'film' },
  { name: 'Bridal', slug: 'bridal' },
  { name: 'Editorial', slug: 'editorial' },
]

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
  
  const getCategorySlug = (categoryName: string) => {
    const cat = categories.find(c => c.name === categoryName)
    return cat?.slug || categoryName.toLowerCase()
  }

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      
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
              className="inline-block text-gold-500/80 text-xs tracking-[0.3em] uppercase mb-6"
            >
              Portfolio
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
              Featured Work
            </h2>
            <p className="text-cream-300/80 text-lg max-w-2xl mx-auto font-light">
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
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
                  activeCategory === category.name
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30'
                    : 'bg-transparent text-cream-500/50 hover:text-cream-100 border border-cream-500/10 hover:border-cream-500/20'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
          
          {/* View Category Link */}
          {activeCategory !== 'All' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <Link
                href={`/portfolio/${getCategorySlug(activeCategory)}`}
                className="inline-flex items-center gap-2 text-gold-500/80 hover:text-gold-400 text-sm transition-colors"
              >
                <span>View all {activeCategory} work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
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
                  className="group relative aspect-[3/4] overflow-hidden cursor-pointer border border-gold-500/10 hover:border-gold-500/30 transition-colors duration-500"
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Category Badge */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 1 : 0.6,
                        y: hoveredItem === item.id ? 0 : 5
                      }}
                      className="inline-block text-gold-400/80 text-[10px] tracking-[0.2em] uppercase w-fit mb-3"
                    >
                      {item.category}
                    </motion.span>
                    
                    {/* Title */}
                    <h3 className="font-display text-xl font-light text-cream-100 mb-2">
                      {item.title}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-cream-500/40 text-xs tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3 h-3" />
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
                      className="flex items-center gap-3 mt-6 pt-4 border-t border-gold-500/10"
                    >
                      <button className="flex items-center gap-2 px-5 py-2 bg-cream-100 text-dark-950 text-[10px] tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      <button className="p-2.5 border border-cream-500/20 hover:border-gold-500/40 transition-colors duration-300">
                        <ExternalLink className="w-3 h-3 text-cream-100" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="portfolio-prev absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
            <ChevronLeft className="w-5 h-5 text-cream-100" />
          </button>
          <button className="portfolio-next absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
            <ChevronRight className="w-5 h-5 text-cream-100" />
          </button>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 space-y-6"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 transition-all duration-300 text-xs tracking-[0.2em] uppercase"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <div className="block">
            <a
              href="https://instagram.com/amyb_mup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-cream-500/50 hover:text-gold-400 transition-colors duration-300 group text-xs tracking-[0.2em] uppercase"
            >
              <span>Follow on Instagram</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
