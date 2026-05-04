import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const categories: Record<string, { title: string; description: string; image: string }> = {
  sfx: {
    title: 'SFX Makeup Portfolio Cape Town',
    description:
      'SFX and prosthetic makeup portfolio by Amy Morgenrood, featuring wounds, horror effects, character makeup and production-ready special effects in Cape Town.',
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  },
  beauty: {
    title: 'Beauty Makeup Portfolio Cape Town',
    description:
      'Beauty and glam makeup portfolio by Cape Town makeup artist Amy Morgenrood, including soft glam, editorial beauty and camera-ready skin work.',
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  },
  bridal: {
    title: 'Bridal Makeup Portfolio Cape Town',
    description:
      'Bridal makeup portfolio by Amy Morgenrood, showcasing wedding makeup, bridal beauty and long-wear looks for Cape Town and Western Cape brides.',
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  },
  film: {
    title: 'Film and TV Makeup Portfolio Cape Town',
    description:
      'Film and TV makeup portfolio by Amy Morgenrood, featuring on-set makeup, character work and production experience in Cape Town.',
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  },
  editorial: {
    title: 'Editorial Makeup Portfolio Cape Town',
    description:
      'Editorial and fashion makeup portfolio by Cape Town makeup artist Amy Morgenrood, including creative beauty, fashion and campaign-ready looks.',
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  },
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const meta = categories[params.category] || {
    title: 'Makeup Portfolio Cape Town',
    description: "Portfolio work by Cape Town makeup artist Amy Morgenrood.",
    image: 'https://www.amymup.shop/og-image-logo.jpg',
  }
  const url = `https://www.amymup.shop/portfolio/${params.category}`

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      images: [{ url: meta.image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  }
}

export default function PortfolioCategoryLayout({ children }: { children: ReactNode }) {
  return children
}
