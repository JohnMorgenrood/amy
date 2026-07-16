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
  title: 'Amy Morgenrood | Film & Commercial Makeup Artist Cape Town',
  description:
    'Cape Town makeup and hair artist Amy Morgenrood for film, television, commercials, SFX, continuity, standby and makeup department coordination.',
  openGraph: {
    title: 'Amy Morgenrood | Cape Town Makeup Artist',
    description:
      'Cape Town makeup artist for film productions, commercials, continuity, standby, SFX and makeup department support.',
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
    description: 'Cape Town makeup artist for film, television, commercials, SFX, editorial and production support.',
    images: [socialImagePath],
  },
}
