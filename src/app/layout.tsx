import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingElements } from '@/components/effects/FloatingElements'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://makeupbyamy.co.za'),
  title: {
    default: 'Amy Morgenrood | Professional Makeup Artist Cape Town | Film, SFX & Beauty',
    template: '%s | Amy Morgenrood Makeup Artist'
  },
  description: 'Award-winning professional makeup artist in Cape Town with 8+ years onset experience. Specializing in Film, SFX, Beauty, Airbrush, Hair Styling for TVCs, Music Videos & Productions. Featured in The Woman King, Alphas & more.',
  keywords: [
    'makeup artist cape town',
    'SFX makeup artist',
    'film makeup artist south africa',
    'beauty makeup cape town',
    'airbrush makeup',
    'hair styling cape town',
    'wedding makeup artist',
    'commercial makeup artist',
    'onset makeup artist',
    'Amy Morgenrood',
    'professional makeup artist',
    'TVC makeup',
    'music video makeup',
    'prosthetic makeup',
    'special effects makeup cape town',
    'bridal makeup cape town',
    'editorial makeup artist',
    'fashion makeup artist',
    'VTCT qualified makeup artist'
  ],
  authors: [{ name: 'Amy Morgenrood' }],
  creator: 'Amy Morgenrood',
  publisher: 'Makeup by Amy',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://makeupbyamy.co.za',
    siteName: 'Amy Morgenrood - Professional Makeup Artist',
    title: 'Amy Morgenrood | Professional Makeup Artist Cape Town',
    description: 'Award-winning makeup artist with 8+ years onset experience. Film, SFX, Beauty, Airbrush & Hair Styling in Cape Town.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amy Morgenrood - Professional Makeup Artist Cape Town',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amy Morgenrood | Professional Makeup Artist Cape Town',
    description: 'Award-winning makeup artist with 8+ years onset experience. Film, SFX, Beauty, Airbrush & Hair Styling.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://makeupbyamy.co.za',
  },
  category: 'Beauty & Personal Care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="geo.region" content="ZA-WC" />
        <meta name="geo.placename" content="Cape Town" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://makeupbyamy.co.za',
              name: 'Amy Morgenrood - Professional Makeup Artist',
              alternateName: 'Makeup by Amy',
              description: 'Professional makeup artist in Cape Town with 8+ years onset experience specializing in Film, SFX, Beauty, Airbrush, and Hair Styling.',
              url: 'https://makeupbyamy.co.za',
              telephone: '+27847017012',
              email: 'bookings@makeupbyamy.co.za',
              image: 'https://makeupbyamy.co.za/og-image.jpg',
              logo: 'https://makeupbyamy.co.za/logo.png',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '11 Tennessee St, Langeberg Heights',
                addressLocality: 'Cape Town',
                addressRegion: 'Western Cape',
                postalCode: '7570',
                addressCountry: 'ZA'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -33.8818,
                longitude: 18.6024
              },
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '07:00',
                closes: '19:00'
              },
              sameAs: [
                'https://www.instagram.com/amyb_mup/',
                'https://www.instagram.com/_amyy_mua/',
                'https://www.imdb.com/name/nm12345678/',
                'https://www.callacrew.co.za/crew/amy-morgenrood'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Makeup Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Film & TV Makeup',
                      description: 'Professional onset makeup for film and television productions'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'SFX Makeup',
                      description: 'Special effects and prosthetic makeup'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Beauty & Bridal Makeup',
                      description: 'Professional beauty and bridal makeup services'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Airbrush Makeup',
                      description: 'Flawless airbrush makeup application'
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="bg-dark-900 text-white antialiased">
        <FloatingElements />
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
