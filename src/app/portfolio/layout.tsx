import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
  description:
    "Explore Amy Morgenrood's Cape Town makeup portfolio across SFX, prosthetics, film, bridal, beauty and editorial makeup.",
  alternates: {
    canonical: 'https://www.amymup.shop/portfolio',
  },
  openGraph: {
    title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
    description:
      "Explore Amy Morgenrood's Cape Town makeup work including SFX, film, bridal, beauty and editorial galleries.",
    url: 'https://www.amymup.shop/portfolio',
    images: [
      {
        url: 'https://www.amymup.shop/og-image-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Amy Morgenrood Cape Town makeup portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Amy Morgenrood | Cape Town Makeup Artist',
    description:
      "Explore Amy Morgenrood's Cape Town makeup work including SFX, film, bridal, beauty and editorial galleries.",
    images: ['https://www.amymup.shop/og-image-logo.jpg'],
  },
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children
}
