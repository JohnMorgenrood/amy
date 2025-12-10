import { Hero } from '@/components/sections/Hero'
import { Portfolio } from '@/components/sections/Portfolio'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
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
      <Testimonials />
      <Contact />
    </>
  )
}
