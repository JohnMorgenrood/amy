import { Hero } from '@/components/sections/Hero'
import { Portfolio } from '@/components/sections/Portfolio'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Certificates } from '@/components/sections/Certificates'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <Projects />
      <About />
      <Certificates />
      <Testimonials />
      <Contact />
    </>
  )
}

export const metadata = {
  title: 'Makeup by Amy — Amy Morgenrood | Makeup Artist Cape Town',
  description: 'Book Amy Morgenrood - ITEC-certified professional makeup artist in Cape Town. Specializing in Film, SFX, Bridal, and Beauty Makeup. Book now for productions, weddings, TVCs.',
  openGraph: {
    title: 'Makeup by Amy — Amy Morgenrood | Makeup Artist Cape Town',
    description: 'Book Amy Morgenrood - Professional makeup artist in Cape Town. Film, SFX, Bridal, and Beauty Makeup services available.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Amy Morgenrood - Makeup by Amy' }],
  },
  twitter: {
    title: 'Makeup by Amy — Amy Morgenrood | Makeup Artist Cape Town',
    description: 'Book Amy Morgenrood - ITEC-certified professional makeup artist in Cape Town. Film, SFX, Bridal, and Beauty Makeup services available.',
    images: ['/og-image.svg'],
  }
}
