import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Portfolio } from '@/components/sections/Portfolio'
import { About } from '@/components/sections/About'
import { Certificates } from '@/components/sections/Certificates'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

const socialImagePath = '/og-image-brand.jpg'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Portfolio />
      <About />
      <Certificates />
      <Testimonials />
      <Contact />
    </>
  )
}

export const metadata = {
  title: 'Amy Morgenrood | Makeup Artist Cape Town for Film, Private Clients and Bridal',
  description:
    'Cape Town makeup artist Amy Morgenrood offers film and TV makeup, SFX, bridal, beauty, hair styling, commercial and private makeup services across Cape Town and the Western Cape.',
  openGraph: {
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description:
      'Makeup artist in Cape Town for film productions, agencies, bridal bookings, editorials and private appointments.',
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: 'Amy MUP social preview',
      },
    ],
  },
  twitter: {
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description: 'Cape Town makeup artist for film, SFX, bridal, editorial and private bookings.',
    images: [socialImagePath],
  },
}
