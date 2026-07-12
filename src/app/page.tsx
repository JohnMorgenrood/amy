import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Portfolio } from '@/components/sections/Portfolio'
import { About } from '@/components/sections/About'
import { Certificates } from '@/components/sections/Certificates'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

const socialImagePath = '/og-image-logo.jpg'

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
    'Cape Town makeup and hair artist Amy Morgenrood offers film and TV makeup, SFX, continuity, standby and department coordination support, plus bridal and private bookings.',
  openGraph: {
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description:
      'Cape Town makeup artist for film productions, continuity, standby and makeup department support, agencies, bridal bookings and private appointments.',
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: 'Amy MUP logo',
      },
    ],
  },
  twitter: {
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description: 'Cape Town makeup artist for film, SFX, bridal, editorial and private bookings.',
    images: [socialImagePath],
  },
}
