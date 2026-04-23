import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Dancing_Script } from 'next/font/google'
import './globals.css'
import { ConditionalNavbar } from '@/components/ConditionalNavbar'
import { ConditionalFooter } from '@/components/layout/ConditionalFooter'
import { FloatingElements } from '@/components/effects/FloatingElements'
import { ImageProtection } from '@/components/ImageProtection'

const brandImagePath = '/assets/thumbnails/logo-design-for-amy-mup-makeup-brand-elegant-and-m.jpeg'
const socialImagePath = '/og-image-brand.jpg'

// Modern sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Contemporary display for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.amymup.shop'),
  title: {
    default: 'Amy Morgenrood | Cape Town Makeup Artist for Film, Private Clients and Bridal',
    template: '%s | Amy Morgenrood - Cape Town Makeup Artist'
  },
  description: 'Amy Morgenrood is a Cape Town makeup artist offering film and TV makeup, SFX and prosthetics, bridal makeup, beauty makeup, hair styling, commercial bookings and private appointments across Cape Town and the Western Cape.',
  keywords: [
    'makeup artist cape town',
    'cape town makeup artist',
    'private makeup artist cape town',
    'makeup artist for private clients cape town',
    'makeup agencies cape town',
    'film makeup agency cape town',
    'SFX makeup artist south africa',
    'film makeup artist cape town',
    'film hair and makeup cape town',
    'makeup artist for productions cape town',
    'commercial makeup artist cape town',
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
  publisher: 'Amy Morgenrood',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://www.amymup.shop',
    siteName: 'Amy Morgenrood - Cape Town Makeup Artist',
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description: 'Cape Town makeup artist for film, TV, SFX, bridal, editorials, agencies and private bookings.',
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: 'Amy MUP social preview',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description: 'Cape Town makeup artist for film, SFX, bridal, editorial and private bookings.',
    images: [socialImagePath],
  },
  icons: {
    icon: [{ url: brandImagePath, type: 'image/jpeg' }],
    shortcut: [brandImagePath],
    apple: [{ url: brandImagePath, type: 'image/jpeg' }],
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
    google: 'bRiXFAAgSJZtJHLd1jC2hC_nnCfRPqiHlztXk7gLE4M',
  },
  alternates: {
    canonical: 'https://www.amymup.shop',
  },
  category: 'Professional Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="icon" href={brandImagePath} type="image/jpeg" />
        <link rel="apple-touch-icon" href={brandImagePath} />
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
                  '@id': 'https://www.amymup.shop/#business',
                  name: 'Amy Morgenrood - Cape Town Makeup Artist',
                  alternateName: 'Amy Morgenrood Makeup Artist',
                  description: 'Cape Town makeup artist offering film and TV makeup, SFX, prosthetics, bridal makeup, beauty makeup, private appointments and hair styling.',
                  url: 'https://www.amymup.shop',
                  telephone: '+27847017012',
                  email: 'golearnx@gmail.com',
                  image: `https://www.amymup.shop${socialImagePath}`,
                  logo: `https://www.amymup.shop${brandImagePath}`,
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
                    'https://www.callacrew.co.za/crew/2839508/amy-morgenrood/bio?bf=1'
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Cape Town Makeup Services',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Film & TV Makeup',
                          description: 'On-set makeup and hair services for film, TV, streaming and commercial productions'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'SFX Makeup',
                          description: 'Special effects, prosthetic application, wounds and character transformation'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Private, Bridal & Event Makeup',
                          description: 'Professional makeup for weddings, private clients, photo shoots and events'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Commercial & Editorial Makeup',
                          description: 'Makeup for campaigns, editorials, e-commerce, agency tests and branded content'
                        }
                      }
                    ]
                  }
                },
                {
                  '@type': 'Person',
                  '@id': 'https://www.amymup.shop/#person',
                  name: 'Amy Morgenrood',
                  givenName: 'Amy',
                  familyName: 'Morgenrood',
                  jobTitle: 'Makeup Artist',
                  description: 'Cape Town makeup artist specializing in film, SFX, prosthetics, private makeup, bridal and beauty makeup.',
                  url: 'https://www.amymup.shop',
                  image: `https://www.amymup.shop${socialImagePath}`,
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
                    'Private Makeup',
                    'Commercial Makeup',
                    'Beauty Makeup',
                    'Airbrush Makeup',
                    'Hair Styling'
                  ],
                  sameAs: [
                    'https://www.instagram.com/amyb_mup/',
                    'https://www.instagram.com/_amyy_mua/'
                  ]
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.amymup.shop/#website',
                  url: 'https://www.amymup.shop',
                  name: 'Amy Morgenrood - Cape Town Makeup Artist',
                  description: 'Portfolio and booking website for Amy Morgenrood, makeup artist in Cape Town',
                  publisher: { '@id': 'https://www.amymup.shop/#person' }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-dark-900 text-white antialiased">
        <ImageProtection />
        <FloatingElements />
        <ConditionalNavbar />
        <main className="relative">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  )
}
