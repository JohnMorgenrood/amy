import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | Makeup Products & Tools',
  description: 'Shop professional makeup products, tools, and beauty essentials curated by Amy Morgenrood. High-quality products used by professionals.',
  openGraph: {
    title: 'Shop | Amy Morgenrood Makeup Artist',
    description: 'Shop professional makeup products and tools curated by Amy Morgenrood.',
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
