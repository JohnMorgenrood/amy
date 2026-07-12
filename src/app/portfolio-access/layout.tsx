import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Private Portfolio Access | Makeup by Amy',
  description: 'Request access to Amy Morgenrood’s private makeup portfolio.',
  robots: { index: false, follow: false, noarchive: true, noimageindex: true },
}

export default function PortfolioAccessLayout({ children }: { children: ReactNode }) {
  return children
}
