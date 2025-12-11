import { Metadata } from 'next'

const categories: Record<string, { title: string; description: string; image: string }> = {
  sfx: {
    title: 'SFX & Prosthetics — Amy Morgenrood',
    description: 'Special effects and prosthetic makeup for film and television by Amy Morgenrood.',
    image: '/assets/portfolio/FB_IMG_1487892884148.jpg',
  },
  beauty: {
    title: 'Beauty & Glam — Amy Morgenrood',
    description: 'Beauty and glam makeup gallery showcasing flawless makeup and editorial looks.',
    image: '/assets/portfolio/IMG_20240713_075631_187.jpg',
  },
  bridal: {
    title: 'Bridal — Amy Morgenrood',
    description: 'Bridal makeup gallery and wedding-day beauty looks by Amy Morgenrood.',
    image: '/assets/portfolio/IMG_20240713_075631_238.jpg',
  },
  film: {
    title: 'Film & TV — Amy Morgenrood',
    description: 'Film and on-set makeup work including character makeup and continuity.',
    image: '/assets/portfolio/1623238044587_20180608_131019.jpg',
  },
  editorial: {
    title: 'Editorial & Fashion — Amy Morgenrood',
    description: 'Editorial and fashion makeup gallery featuring creative looks and high fashion makeup.',
    image: '/assets/portfolio/IMG_20240713_075631_385.jpg',
  }
}

export default function Head({ params }: { params: { category: string } }) {
  const meta = categories[params.category] || {
    title: 'Portfolio — Amy Morgenrood',
    description: 'Portfolio — Makeup work by Amy Morgenrood',
    image: '/og-image.svg'
  }

  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [{ url: meta.image, width: 1200, height: 630, alt: meta.title }]
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [meta.image]
    }
  }

  // @ts-ignore - returning metadata object as head isn't necessary because Next will build metadata from this
  return <></>
}
