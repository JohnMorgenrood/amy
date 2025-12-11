import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Makeup by Amy | Premium Beauty Products',
  description: 'Shop premium clean and cruelty-free beauty products curated by Amy Morgenrood. Browse skincare, makeup, and tools with international dropshipping support.',
  openGraph: {
    title: 'Shop — Makeup by Amy | Premium Beauty Products',
    description: 'Shop premium clean and cruelty-free beauty products curated by Amy Morgenrood. Browse skincare, makeup, and tools.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Shop Makeup by Amy' }],
  },
  twitter: {
    title: 'Shop — Makeup by Amy | Premium Beauty Products',
    description: 'Shop premium clean and cruelty-free beauty products curated by Amy Morgenrood.',
    images: ['/og-image.svg'],
  },
}

export default function Head() {
  return <></>
}
