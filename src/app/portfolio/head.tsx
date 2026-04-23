import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
  description:
    'Explore Amy Morgenrood’s portfolio across SFX, film, bridal, beauty and editorial makeup in Cape Town.',
  openGraph: {
    title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
    description:
      'Explore Amy Morgenrood’s range of work including SFX, film, bridal and editorial galleries.',
    images: [
      {
        url: '/assets/portfolio/IMG_20240713_075631_187.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Amy Morgenrood',
      },
    ],
  },
  twitter: {
    title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
    description:
      'Explore Amy Morgenrood’s range of work including SFX, film, bridal and editorial galleries.',
    images: ['/assets/portfolio/IMG_20240713_075631_187.jpg'],
  },
}

export default function Head() {
  return <></>
}
