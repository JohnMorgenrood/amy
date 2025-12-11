import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout — Makeup by Amy',
  description: 'Complete your order on Makeup by Amy. Secure checkout powered by PayPal and the Blanka dropshipping integration.',
  openGraph: {
    title: 'Checkout — Makeup by Amy',
    description: 'Complete your order on Makeup by Amy. Secure checkout powered by PayPal and the Blanka dropshipping integration.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Checkout - Makeup by Amy' }],
  },
  twitter: {
    title: 'Checkout — Makeup by Amy',
    description: 'Complete your order on Makeup by Amy.',
    images: ['/og-image.svg'],
  },
}

export default function Head() {
  return <></>
}
