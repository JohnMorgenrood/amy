import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — Amy Morgenrood | Makeup Portfolio',
  description: 'A collection of Amy Morgenrood’s makeup work across SFX, Film, Bridal, Beauty & Editorial. Explore galleries and view her credits and work.',
  openGraph: {
    title: 'Portfolio — Amy Morgenrood | Makeup Portfolio',
    description: 'Explore Amy Morgenrood’s range of makeup work including SFX, film, bridal, and editorial galleries.',
    images: [{ url: '/assets/portfolio/IMG_20240713_075631_187.jpg', width: 1200, height: 630, alt: 'Portfolio - Amy Morgenrood' }],
  },
  twitter: {
    title: 'Portfolio — Amy Morgenrood | Makeup Portfolio',
    description: 'Explore Amy Morgenrood’s range of makeup work including SFX, film, bridal, and editorial galleries.',
    images: ['/assets/portfolio/IMG_20240713_075631_187.jpg'],
  },
}

export default function Head() {
  return <></>
}
