'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const stories = [
  {
    type: 'video' as const,
    eyebrow: 'Commercial makeup · On-set craft',
    title: 'Corona: 100 Years of Living',
    description: 'A closer look at the makeup discipline and production awareness behind a cinematic beer commercial.',
    href: '/blog/corona-100-years-of-living-commercial',
  },
  {
    type: 'image' as const,
    image: '/assets/Makeup blog/hunter kennedy 1.jpeg',
    alt: 'Hunter Kennedy fashion shoot with hand-painted logo body art',
    eyebrow: 'Fashion editorial · Body painting',
    title: 'The Hunter Kennedy Fashion Shoot',
    description: 'Turning a logo into precise, camera-ready body art while supporting the pace of a fashion set.',
    href: '/blog/hunter-kennedy-fashion-shoot-body-painting',
  },
  {
    type: 'image' as const,
    image: '/assets/Makeup blog/hunter kennedy 2.jpeg',
    alt: 'Close view of logo body painting for the Hunter Kennedy fashion shoot',
    eyebrow: 'Behind the work · Branded detail',
    title: 'Paint Made for the Frame',
    description: 'Clean edges, skin-safe application and a finish designed to hold its shape under editorial lighting.',
    href: '/blog/hunter-kennedy-fashion-shoot-body-painting',
  },
]

export function BlogStorySlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      loop
      className="blog-story-slider"
    >
      {stories.map((story, index) => (
        <SwiperSlide key={`${story.title}-${index}`}>
          <article className="relative min-h-[620px] overflow-hidden bg-dark-800 md:min-h-[680px]">
            {story.type === 'video' ? (
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="Corona 100 Years of Living commercial">
                <source src="/assets/Makeup blog/Corona ad.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image src={story.image} alt={story.alt} fill priority={index === 1} sizes="100vw" className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-gold-300">{story.eyebrow}</p>
              <h2 className="max-w-3xl font-display text-4xl font-light leading-tight text-cream-50 sm:text-6xl">{story.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-cream-200/80">{story.description}</p>
              <Link href={story.href} className="mt-8 inline-flex items-center gap-3 border-b border-gold-400 pb-2 text-xs uppercase tracking-[0.2em] text-cream-100 transition-colors hover:text-gold-300">
                Read the story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
