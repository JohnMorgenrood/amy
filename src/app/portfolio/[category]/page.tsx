'use client'

import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

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
      { src: '/assets/portfolio/20210307_052308.jpg', title: 'Horror Prosthetics' },
      { src: '/assets/portfolio/20210307_052311.jpg', title: 'Horror Makeup' },
      { src: '/assets/portfolio/20210307_055323.jpg', title: 'Creature Design' },
      { src: '/assets/portfolio/20210307_055325.jpg', title: 'Monster Effects' },
      { src: '/assets/portfolio/20210307_055341.jpg', title: 'Horror Character' },
      { src: '/assets/portfolio/20210307_065010.jpg', title: 'Zombie Makeup' },
      { src: '/assets/portfolio/20210307_065013.jpg', title: 'Undead Effects' },
      { src: '/assets/portfolio/20210307_065017.jpg', title: 'Gore Prosthetics' },
      { src: '/assets/portfolio/20210307_065028.jpg', title: 'Horror SFX' },
      { src: '/assets/portfolio/20210307_065052.jpg', title: 'Zombie Design' },
      { src: '/assets/portfolio/20210307_065056.jpg', title: 'Decay Effects' },
      { src: '/assets/portfolio/20210307_065100.jpg', title: 'Creature SFX' },
      { src: '/assets/portfolio/20210307_065107.jpg', title: 'Monster Makeup' },
      { src: '/assets/portfolio/20210307_065121.jpg', title: 'Horror Prosthetic' },
      { src: '/assets/portfolio/20210307_065125.jpg', title: 'Gore Makeup' },
      { src: '/assets/portfolio/20210307_065144.jpg', title: 'Zombie Character' },
      { src: '/assets/portfolio/20210307_084958.jpg', title: 'SFX Creature' },
      { src: '/assets/portfolio/20210307_085000.jpg', title: 'Horror Design' },
      { src: '/assets/portfolio/20210307_085004.jpg', title: 'Monster Character' },
      { src: '/assets/portfolio/20210307_085014.jpg', title: 'Scary Makeup' },
      { src: '/assets/portfolio/20210307_105547.jpg', title: 'Prosthetic Face' },
      { src: '/assets/portfolio/20210307_142325.jpg', title: 'Horror Effect' },
      { src: '/assets/portfolio/20210308_040120.jpg', title: 'Gore Effects' },
      { src: '/assets/portfolio/20210308_040130.jpg', title: 'Blood Effects' },
      { src: '/assets/portfolio/20210308_045616.jpg', title: 'Wound Makeup' },
      { src: '/assets/portfolio/20210308_045620.jpg', title: 'Injury SFX' },
      { src: '/assets/portfolio/20210308_045625.jpg', title: 'Scar Prosthetic' },
      { src: '/assets/portfolio/20210308_050246.jpg', title: 'Horror Character' },
      { src: '/assets/portfolio/20210308_054526.jpg', title: 'Monster Makeup' },
      { src: '/assets/portfolio/20210308_054536.jpg', title: 'Creature Effect' },
      { src: '/assets/portfolio/20210308_054539.jpg', title: 'Beast Makeup' },
      { src: '/assets/portfolio/20210308_054544.jpg', title: 'Horror Prosthetic' },
      { src: '/assets/portfolio/20210308_054552.jpg', title: 'Monster Design' },
      { src: '/assets/portfolio/20210308_054556.jpg', title: 'Scary Character' },
      { src: '/assets/portfolio/20210308_054600.jpg', title: 'Creature Makeup' },
      { src: '/assets/portfolio/20210308_073313.jpg', title: 'Horror SFX' },
      { src: '/assets/portfolio/20210308_073325.jpg', title: 'Zombie Prosthetic' },
      { src: '/assets/portfolio/20210308_073330.jpg', title: 'Gore Character' },
      { src: '/assets/portfolio/20210308_073344.jpg', title: 'Horror Design' },
      { src: '/assets/portfolio/20210308_104547.jpg', title: 'Monster Effect' },
      { src: '/assets/portfolio/20210308_123536.jpg', title: 'Creature Design' },
      { src: '/assets/portfolio/20210311_115742.jpg', title: 'Horror Makeup' },
      { src: '/assets/portfolio/20210311_151409.jpg', title: 'Prosthetic Work' },
      { src: '/assets/portfolio/20210311_151412.jpg', title: 'SFX Application' },
      { src: '/assets/portfolio/20210311_151420.jpg', title: 'Horror Character' },
      { src: '/assets/portfolio/20210311_151506.jpg', title: 'Monster Prosthetic' },
      { src: '/assets/portfolio/20210311_151509.jpg', title: 'Scary Effect' },
      { src: '/assets/portfolio/20210311_151514.jpg', title: 'Gore Design' },
      { src: '/assets/portfolio/20210313_112836.jpg', title: 'Horror Character' },
      { src: '/assets/portfolio/20210313_112838.jpg', title: 'Zombie Makeup' },
      { src: '/assets/portfolio/20210313_112843.jpg', title: 'Monster Effect' },
      { src: '/assets/portfolio/20210313_112849.jpg', title: 'Horror Prosthetic' },
      { src: '/assets/portfolio/20210313_112902.jpg', title: 'Creature SFX' },
      { src: '/assets/portfolio/20210313_112907.jpg', title: 'Scary Makeup' },
      { src: '/assets/portfolio/20210313_113020.jpg', title: 'Gore Effect' },
      { src: '/assets/portfolio/20210313_113023.jpg', title: 'Horror Design' },
      { src: '/assets/portfolio/20210313_113029.jpg', title: 'Monster Character' },
      { src: '/assets/portfolio/20210313_113032.jpg', title: 'Prosthetic Design' },
      { src: '/assets/portfolio/20210313_113034.jpg', title: 'Horror Makeup' },
      { src: '/assets/portfolio/20210314_062910.jpg', title: 'Creature Effect' },
      { src: '/assets/portfolio/20210316_141555.jpg', title: 'SFX Character' },
      { src: '/assets/portfolio/20210316_164709.jpg', title: 'Prosthetic Design' },
      { src: '/assets/portfolio/20210316_164713.jpg', title: 'Horror Prosthetic' },
      { src: '/assets/portfolio/20210316_164716.jpg', title: 'Monster Makeup' },
      { src: '/assets/portfolio/20210316_172232.jpg', title: 'Gore SFX' },
      { src: '/assets/portfolio/20210316_172238.jpg', title: 'Horror Effect' },
      { src: '/assets/portfolio/20210316_185927.jpg', title: 'Zombie Character' },
      { src: '/assets/portfolio/20210316_185930.jpg', title: 'Creature Design' },
      { src: '/assets/portfolio/20210316_185953.jpg', title: 'Horror Makeup' },
      { src: '/assets/portfolio/20210316_185956.jpg', title: 'Monster Prosthetic' },
      { src: '/assets/portfolio/20210316_190000.jpg', title: 'Scary Effect' },
      { src: '/assets/portfolio/20210319_170206.jpg', title: 'Horror Character' },
      { src: '/assets/portfolio/20210319_170217.jpg', title: 'Gore Makeup' },
      { src: '/assets/portfolio/20210319_170221.jpg', title: 'SFX Prosthetic' },
      { src: '/assets/portfolio/20210322_183328.jpg', title: 'Scary Effects' },
      { src: '/assets/portfolio/20210322_183336.jpg', title: 'Horror Design' },
      { src: '/assets/portfolio/20210322_183345.jpg', title: 'Monster Effect' },
      { src: '/assets/portfolio/20210322_183352.jpg', title: 'Creature Makeup' },
      { src: '/assets/portfolio/20210322_210435.jpg', title: 'Prosthetic Character' },
      { src: '/assets/portfolio/20210322_210440.jpg', title: 'Horror SFX' },
      { src: '/assets/portfolio/20210322_210451.jpg', title: 'Zombie Design' },
      { src: '/assets/portfolio/20210322_210456.jpg', title: 'Monster Character' },
      { src: '/assets/portfolio/20210322_210502.jpg', title: 'Gore Prosthetic' },
      { src: '/assets/portfolio/20210322_210506.jpg', title: 'Horror Makeup' },
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
      { src: '/assets/projects/Weddings/professional-wedding-makeup-portfolio-shots-for-an.jpeg', title: 'Wedding Makeup' },
      { src: '/assets/projects/Weddings/professional-wedding-makeup-portfolio-shots-for-an (1).jpeg', title: 'Bridal Beauty' },
      { src: '/assets/projects/Weddings/professional-wedding-makeup-portfolio-shots-for-an (2).jpeg', title: 'Wedding Day Look' },
      { src: '/assets/projects/Weddings/professional-wedding-makeup-portfolio-shots-for-an (3).jpeg', title: 'Classic Bridal Makeup' },
      { src: '/assets/projects/Weddings/more-wedding-makeup-portfolio-shots-for-amy-image-.jpeg', title: 'Soft Bridal Glam' },
      { src: '/assets/projects/Weddings/more-wedding-makeup-portfolio-shots-for-amy-image- (1).jpeg', title: 'Elegant Wedding Makeup' },
      { src: '/assets/projects/Weddings/more-wedding-makeup-portfolio-shots-for-amy-image- (2).jpeg', title: 'Romantic Bridal Look' },
      { src: '/assets/projects/Weddings/additional-professional-wedding-makeup-portfolio-s.jpeg', title: 'Professional Bridal Makeup' },
      { src: '/assets/projects/Weddings/additional-professional-wedding-makeup-portfolio-s (1).jpeg', title: 'Wedding Party Makeup' },
      { src: '/assets/projects/Weddings/additional-professional-wedding-makeup-portfolio-s (2).jpeg', title: 'Bridal Portrait Makeup' },
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

const categorySeoContent: Record<string, {
  intro: string
  bestFor: string[]
  primaryLink: { href: string; label: string }
  secondaryLink?: { href: string; label: string }
  faqs: { question: string; answer: string }[]
}> = {
  sfx: {
    intro:
      'This SFX makeup portfolio shows prosthetic application, wounds, horror effects, creature detail and character makeup for productions, creative shoots and selected private bookings in Cape Town.',
    bestFor: [
      'Film and TV productions needing practical injury, horror or character effects.',
      'Music videos, editorials and campaign concepts with stronger visual transformation.',
      'Clients comparing SFX makeup, prosthetics and special effects work before enquiring.',
    ],
    primaryLink: { href: '/sfx-makeup-artist-cape-town', label: 'Book SFX Makeup' },
    secondaryLink: { href: '/film-tv-commercial-makeup-artist-cape-town', label: 'Production Makeup Services' },
    faqs: [
      {
        question: 'Can Amy create prosthetic and wound effects for shoots?',
        answer:
          'Yes. SFX bookings can include prosthetic application, scars, wounds, blood work, ageing, horror looks and character-focused detail depending on the brief.',
      },
      {
        question: 'Is this portfolio relevant for production teams?',
        answer:
          'Yes. The SFX gallery is useful for producers, directors and creatives looking for Cape Town special effects makeup for film, TV, commercials and creative shoots.',
      },
    ],
  },
  beauty: {
    intro:
      'This beauty makeup portfolio highlights polished skin, soft glam, full glam and camera-ready finishes for private clients, content days, editorials and events in Cape Town.',
    bestFor: [
      'Private clients wanting natural glam, soft glam or elevated event makeup.',
      'Photoshoots and content days where skin needs to look refined on camera.',
      'Agencies and creatives looking for clean beauty makeup with a polished finish.',
    ],
    primaryLink: { href: '/private-makeup-artist-cape-town', label: 'Book Private Makeup' },
    secondaryLink: { href: '/#contact', label: 'Request a Quote' },
    faqs: [
      {
        question: 'Can Amy create both natural and full glam looks?',
        answer:
          'Yes. Beauty bookings can be tailored from soft, natural glam to a more defined full glam finish depending on the event, lighting and outfit.',
      },
      {
        question: 'Is beauty makeup available for photoshoots?',
        answer:
          'Yes. Amy works with clients and creatives who need makeup that photographs well for portraits, content shoots, editorials and campaigns.',
      },
    ],
  },
  bridal: {
    intro:
      'This bridal makeup portfolio shows wedding-day beauty, soft bridal glam and elegant long-wear makeup for Cape Town and Western Cape brides.',
    bestFor: [
      'Brides comparing wedding makeup styles before enquiring about availability.',
      'Bridal parties needing polished, coordinated makeup on the wedding morning.',
      'Cape Town and Western Cape weddings where makeup needs to last and photograph well.',
    ],
    primaryLink: { href: '/bridal-makeup-artist-cape-town', label: 'Book Bridal Makeup' },
    secondaryLink: { href: '/service-areas', label: 'View Service Areas' },
    faqs: [
      {
        question: 'Does Amy offer bridal makeup trials?',
        answer:
          'Yes. Bridal trials can be arranged so the wedding-day look feels settled, flattering and aligned with the dress, venue and photography style.',
      },
      {
        question: 'Can Amy travel for wedding bookings?',
        answer:
          'Yes. Amy is based in Cape Town and can travel for bridal bookings across the city, the Winelands and selected Western Cape locations by arrangement.',
      },
    ],
  },
  film: {
    intro:
      'This film and TV makeup portfolio highlights on-set makeup, character work, production support and camera-ready finishes for Cape Town productions.',
    bestFor: [
      'Production teams needing on-set makeup support for film, TV and commercials.',
      'Agencies and producers reviewing character, continuity and production makeup experience.',
      'Campaigns, branded content and shoots requiring reliable Cape Town makeup support.',
    ],
    primaryLink: { href: '/film-tv-commercial-makeup-artist-cape-town', label: 'Book Production Makeup' },
    secondaryLink: { href: '/sfx-makeup-artist-cape-town', label: 'SFX Makeup Services' },
    faqs: [
      {
        question: 'Does Amy work with production teams?',
        answer:
          'Yes. Amy is available for film, TV, commercials, branded content, music videos and agency-led shoots in Cape Town.',
      },
      {
        question: 'Can film makeup include SFX support?',
        answer:
          'Yes. Depending on the brief, production makeup can include beauty, grooming, character detail, wounds, ageing or prosthetic support.',
      },
    ],
  },
  editorial: {
    intro:
      'This editorial makeup portfolio shows creative beauty, fashion makeup and campaign-ready looks for editorials, agencies, tests and branded shoots in Cape Town.',
    bestFor: [
      'Fashion, beauty and editorial teams looking for creative makeup direction.',
      'Campaigns and branded content needing polished, camera-ready makeup.',
      'Photographers and agencies planning tests, lookbooks, e-commerce or magazine-style shoots.',
    ],
    primaryLink: { href: '/film-tv-commercial-makeup-artist-cape-town', label: 'Book Editorial Makeup' },
    secondaryLink: { href: '/private-makeup-artist-cape-town', label: 'Private Makeup Services' },
    faqs: [
      {
        question: 'Does Amy work on editorial and fashion shoots?',
        answer:
          'Yes. Amy can support editorials, fashion stories, agency tests, campaigns, branded shoots and creative beauty concepts in Cape Town.',
      },
      {
        question: 'Can editorial makeup be adapted for commercial work?',
        answer:
          'Yes. Looks can be refined for campaigns, e-commerce, brand shoots or more expressive editorial concepts depending on the brief.',
      },
    ],
  },
}

const getImageAlt = (imageTitle: string, categoryTitle: string) =>
  `${imageTitle} by Amy Morgenrood, Cape Town ${categoryTitle.toLowerCase()} makeup portfolio`

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const data = portfolioData[category]
  const seoContent = categorySeoContent[category]
  
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

        {seoContent && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="border border-gold-500/10 bg-dark-900/45 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-light text-cream-100">
                {data.title} makeup portfolio in Cape Town
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-cream-300/75">
                {seoContent.intro}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={seoContent.primaryLink.href}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-cream-100 px-6 py-3 text-xs uppercase tracking-[0.15em] text-dark-950 transition-colors duration-300 hover:bg-gold-400"
                >
                  <span>{seoContent.primaryLink.label}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                {seoContent.secondaryLink && (
                  <Link
                    href={seoContent.secondaryLink.href}
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-gold-500/30 px-6 py-3 text-xs uppercase tracking-[0.15em] text-cream-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
                  >
                    <span>{seoContent.secondaryLink.label}</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="border border-gold-500/10 bg-dark-900/45 p-6">
                <h2 className="text-sm uppercase tracking-[0.22em] text-gold-500/80">
                  Useful for
                </h2>
                <ul className="mt-5 space-y-3">
                  {seoContent.bestFor.map((item) => (
                    <li key={item} className="text-sm font-light leading-relaxed text-cream-300/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        )}

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
                alt={getImageAlt(image.title, data.title)}
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

        {seoContent && (
          <section className="mt-16 border-t border-gold-500/10 pt-12">
            <div className="mb-8 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.28em] text-gold-500/70">Portfolio FAQs</span>
              <h2 className="mt-4 font-display text-3xl font-light text-cream-100">
                Questions before booking
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {seoContent.faqs.map((faq) => (
                <div key={faq.question} className="border border-gold-500/10 bg-dark-900/45 p-6">
                  <h3 className="text-base font-medium text-cream-100">{faq.question}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-cream-300/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
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
                alt={getImageAlt(data.images[selectedImage].title, data.title)}
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
