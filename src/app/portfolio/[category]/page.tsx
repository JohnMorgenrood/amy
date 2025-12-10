'use client'

import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Portfolio data organized by category
const portfolioData: Record<string, {
  title: string
  description: string
  images: { src: string; title: string }[]
}> = {
  sfx: {
    title: 'SFX & Prosthetics',
    description: 'Special effects makeup, prosthetics, wounds, scars, and character transformations for film and television.',
    images: [
      { src: '/assets/portfolio/FB_IMG_1487892884148.jpg', title: 'Prosthetic Application' },
      { src: '/assets/portfolio/FB_IMG_1487892910615.jpg', title: 'Character Makeup' },
      { src: '/assets/portfolio/FB_IMG_1487892965084.jpg', title: 'SFX Wounds' },
      { src: '/assets/portfolio/FB_IMG_1487893882973.jpg', title: 'Prosthetic Work' },
      { src: '/assets/portfolio/1623237985505_FB_IMG_1487893847090.jpg', title: 'Special Effects' },
      { src: '/assets/portfolio/unnamed (2).jpg', title: 'SFX Makeup' },
      { src: '/assets/portfolio/unnamed (5).jpg', title: 'Character Design' },
      { src: '/assets/portfolio/unnamed (6).jpg', title: 'Prosthetics' },
    ],
  },
  beauty: {
    title: 'Beauty & Glam',
    description: 'Glamour makeup, flawless skin, contouring, and stunning beauty looks for any occasion.',
    images: [
      { src: '/assets/portfolio/IMG_20240713_075631_187.jpg', title: 'Glamour Look' },
      { src: '/assets/portfolio/IMG_20240713_080002_348.jpg', title: 'Beauty Makeup' },
      { src: '/assets/portfolio/IMG_20240713_080002_394.jpg', title: 'Flawless Finish' },
      { src: '/assets/portfolio/IMG_20240713_080002_434.jpg', title: 'Glam Beauty' },
      { src: '/assets/portfolio/Screenshot_20250211_092255_Instagram.jpg', title: 'Natural Glam' },
      { src: '/assets/portfolio/Screenshot_20250211_092342_Instagram.jpg', title: 'Evening Look' },
      { src: '/assets/portfolio/Screenshot_20250225_110539_Instagram.jpg', title: 'Soft Glam' },
      { src: '/assets/portfolio/Screenshot_20250305_183739_Instagram.jpg', title: 'Beauty Editorial' },
      { src: '/assets/portfolio/unnamed.jpg', title: 'Classic Beauty' },
      { src: '/assets/portfolio/IMG-20240607-WA0011.jpg', title: 'Stunning Look' },
    ],
  },
  bridal: {
    title: 'Bridal',
    description: 'Timeless bridal beauty, wedding day makeup, and special occasion looks for your most important day.',
    images: [
      { src: '/assets/portfolio/IMG_20240713_075631_238.jpg', title: 'Bridal Beauty' },
      { src: '/assets/portfolio/20210614_152856.jpg', title: 'Wedding Day' },
      { src: '/assets/portfolio/20210614_152927.jpg', title: 'Bridal Glam' },
      { src: '/assets/portfolio/20210614_153211.jpg', title: 'Classic Bride' },
      { src: '/assets/portfolio/Screenshot_20240319_063245_Instagram.jpg', title: 'Soft Bridal' },
      { src: '/assets/portfolio/2017-02-24 01.57.28.jpg', title: 'Romantic Look' },
    ],
  },
  film: {
    title: 'Film & TV',
    description: 'Behind the scenes on major film and television productions, character makeup, and continuity work.',
    images: [
      { src: '/assets/portfolio/1623238044587_20180608_131019.jpg', title: 'On Set' },
      { src: '/assets/portfolio/images.jpeg-3.jpg', title: 'Film Production' },
      { src: '/assets/portfolio/images.jpeg-13.jpg', title: 'Character Work' },
      { src: '/assets/portfolio/images.jpeg-14.jpg', title: 'TV Series' },
      { src: '/assets/portfolio/images.jpeg-15.jpg', title: 'Production Still' },
      { src: '/assets/portfolio/images.jpeg-16.jpg', title: 'Film Makeup' },
      { src: '/assets/portfolio/images.jpeg-18.jpg', title: 'Set Work' },
      { src: '/assets/portfolio/Screenshot_20250211_092306_Instagram.jpg', title: 'Behind the Scenes' },
    ],
  },
  editorial: {
    title: 'Editorial & Fashion',
    description: 'High fashion editorial work, magazine shoots, creative concepts, and avant-garde looks.',
    images: [
      { src: '/assets/portfolio/IMG_20240713_075631_385.jpg', title: 'Editorial Look' },
      { src: '/assets/portfolio/IMG_20240713_075631_461.jpg', title: 'Fashion Shoot' },
      { src: '/assets/portfolio/Screenshot_20250211_092335_Instagram.jpg', title: 'Creative Concept' },
      { src: '/assets/portfolio/IMG_20240713_080002_348.jpg', title: 'High Fashion' },
      { src: '/assets/portfolio/IMG_20240713_080002_394.jpg', title: 'Editorial Beauty' },
      { src: '/assets/portfolio/IMG_20240713_080002_434.jpg', title: 'Magazine Look' },
      { src: '/assets/portfolio/Screenshot_20250225_110539_Instagram.jpg', title: 'Fashion Editorial' },
      { src: '/assets/portfolio/Screenshot_20250305_183739_Instagram.jpg', title: 'Creative Makeup' },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const data = portfolioData[category]
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!data) {
    return (
      <main className="min-h-screen bg-dark-950 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-cream-100 mb-4">Category Not Found</h1>
          <Link href="/portfolio" className="text-gold-500 hover:text-gold-400">
            Back to Portfolio
          </Link>
        </div>
      </main>
    )
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % data.images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + data.images.length) % data.images.length)
    }
  }

  return (
    <main className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gold-500/80 hover:text-gold-400 text-sm tracking-wide mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-4">
            {data.title}
          </h1>
          <p className="text-cream-300/70 text-lg max-w-2xl font-light">
            {data.description}
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden border border-gold-500/10 hover:border-gold-500/30 cursor-pointer transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-cream-100 text-sm font-light">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-2 text-cream-100 hover:text-gold-400 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-dark-900/80 border border-gold-500/20 text-cream-100 hover:border-gold-500/40 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-dark-900/80 border border-gold-500/20 text-cream-100 hover:border-gold-500/40 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={data.images[selectedImage].src}
                alt={data.images[selectedImage].title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-cream-100 font-light">{data.images[selectedImage].title}</p>
                <p className="text-cream-500/60 text-sm mt-1">
                  {selectedImage + 1} / {data.images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
