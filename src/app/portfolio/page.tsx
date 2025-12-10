'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'sfx',
    title: 'SFX & Prosthetics',
    description: 'Special effects makeup, prosthetics, wounds, and character transformations',
    image: '/assets/portfolio/FB_IMG_1487892884148.jpg',
    count: 8,
  },
  {
    id: 'beauty',
    title: 'Beauty & Glam',
    description: 'Glamour makeup, editorial beauty, and flawless looks',
    image: '/assets/portfolio/IMG_20240713_075631_187.jpg',
    count: 10,
  },
  {
    id: 'bridal',
    title: 'Bridal',
    description: 'Wedding day beauty, bridal parties, and special occasions',
    image: '/assets/portfolio/IMG_20240713_075631_238.jpg',
    count: 6,
  },
  {
    id: 'film',
    title: 'Film & TV',
    description: 'On-set work, character makeup, and production stills',
    image: '/assets/portfolio/1623238044587_20180608_131019.jpg',
    count: 12,
  },
  {
    id: 'editorial',
    title: 'Editorial & Fashion',
    description: 'High fashion, magazine shoots, and creative concepts',
    image: '/assets/portfolio/IMG_20240713_075631_385.jpg',
    count: 8,
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-dark-950 pt-24 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-gold-500/80 hover:text-gold-400 text-sm tracking-wide mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-4">
            Portfolio
          </h1>
          <p className="text-cream-300/70 text-lg max-w-2xl font-light">
            Explore my work across different categories. Each collection showcases 
            my expertise and passion for the art of makeup.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${category.id}`}>
                <div className="group relative aspect-[4/5] overflow-hidden border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gold-500/80 mb-2 block">
                      {category.count} Images
                    </span>
                    <h3 className="font-display text-2xl font-light text-cream-100 mb-2 group-hover:text-gold-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-cream-300/60 text-sm font-light line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-gold-500/80 text-xs tracking-wide group-hover:text-gold-400 transition-colors">
                      <span>View Gallery</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
