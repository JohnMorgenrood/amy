import type { Metadata } from 'next'
import { Outfit, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingElements } from '@/components/effects/FloatingElements'

// Elegant sans-serif for body text - modern and clean
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// Luxurious serif for headings - elegant and sophisticated
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://makeupbyamy.co.za'),
  title: {
    default: 'Amy Morgenrood | Professional Makeup Artist Cape Town | Film, SFX & Bridal',
    template: '%s | Amy Morgenrood - Cape Town Makeup Artist'
  },
  description: 'Amy Morgenrood is an ITEC-certified professional makeup artist in Cape Town with 8+ years onset experience. Specializing in Film, SFX, Prosthetics, Bridal, Airbrush & Hair Styling. Credits include The Woman King, Black Sails, Tomb Raider. Book now for film productions, weddings, TVCs & events.',
  keywords: [
    'makeup artist cape town',
    'cape town makeup artist',
    'SFX makeup artist south africa',
    'film makeup artist cape town',
    'beauty makeup cape town',
    'airbrush makeup cape town',
    'hair styling cape town',
    'wedding makeup artist cape town',
    'bridal makeup cape town',
    'commercial makeup artist south africa',
    'onset makeup artist',
    'Amy Morgenrood',
    'Amy Morgenrood makeup',
    'professional makeup artist south africa',
    'TVC makeup artist',
    'music video makeup artist',
    'prosthetic makeup artist',
    'special effects makeup cape town',
    'sfx makeup cape town',
    'bridal makeup western cape',
    'editorial makeup artist cape town',
    'fashion makeup artist south africa',
    'ITEC qualified makeup artist',
    'ITEC certified makeup artist cape town',
    'the woman king makeup artist',
    'film industry makeup cape town',
    'movie makeup artist south africa',
    'tv makeup artist cape town',
    'best makeup artist cape town'
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
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
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
              '@graph': [
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://makeupbyamy.co.za/#business',
                  name: 'Amy Morgenrood - Professional Makeup Artist',
                  alternateName: 'Makeup by Amy',
                  description: 'ITEC-certified professional makeup artist in Cape Town with 8+ years onset experience specializing in Film, SFX, Prosthetics, Beauty, Airbrush, and Hair Styling.',
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
                  areaServed: [
                    { '@type': 'City', name: 'Cape Town' },
                    { '@type': 'State', name: 'Western Cape' },
                    { '@type': 'Country', name: 'South Africa' }
                  ],
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
                },
                {
                  '@type': 'Person',
                  '@id': 'https://makeupbyamy.co.za/#person',
                  name: 'Amy Morgenrood',
                  givenName: 'Amy',
                  familyName: 'Morgenrood',
                  jobTitle: 'Professional Makeup Artist',
                  description: 'ITEC-certified makeup artist specializing in film, SFX, prosthetics, bridal and beauty makeup with 8+ years of professional experience.',
                  url: 'https://makeupbyamy.co.za',
                  image: 'https://makeupbyamy.co.za/og-image.jpg',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Cape Town',
                    addressRegion: 'Western Cape',
                    addressCountry: 'South Africa'
                  },
                  alumniOf: {
                    '@type': 'Organization',
                    name: 'ITEC International'
                  },
                  hasCredential: [
                    {
                      '@type': 'EducationalOccupationalCredential',
                      credentialCategory: 'certificate',
                      name: 'ITEC Media Makeup Certification',
                      recognizedBy: {
                        '@type': 'Organization',
                        name: 'ITEC International'
                      }
                    }
                  ],
                  knowsAbout: [
                    'Film Makeup',
                    'Television Makeup',
                    'Special Effects Makeup',
                    'Prosthetic Makeup',
                    'Bridal Makeup',
                    'Beauty Makeup',
                    'Airbrush Makeup',
                    'Hair Styling'
                  ],
                  sameAs: [
                    'https://www.instagram.com/amyb_mup/',
                    'https://www.instagram.com/_amyy_mua/',
                    'https://www.imdb.com/name/nm12345678/'
                  ]
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://makeupbyamy.co.za/#website',
                  url: 'https://makeupbyamy.co.za',
                  name: 'Amy Morgenrood - Professional Makeup Artist Cape Town',
                  description: 'Portfolio and booking website for Amy Morgenrood, professional makeup artist in Cape Town',
                  publisher: { '@id': 'https://makeupbyamy.co.za/#person' }
                }
              ]
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
