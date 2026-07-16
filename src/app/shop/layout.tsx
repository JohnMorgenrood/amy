import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Amy Morgenrood | Cape Town Makeup Artist',
  description: 'Amy Morgenrood is a Cape Town makeup artist for film, television, SFX, private and commercial bookings.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
