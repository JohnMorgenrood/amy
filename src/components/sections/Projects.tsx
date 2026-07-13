'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { 
  Film, 
  Calendar, 
  Star, 
  ExternalLink,
  Play,
  ChevronLeft,
  ChevronRight,
  Award,
  ClipboardList,
  ArrowRight
} from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Featured Projects (shown in carousel)
const featuredProjects = [
  {
    id: 1,
    title: 'HELP',
    year: '2025',
    type: 'Feature Film',
    role: 'Makeup & Hair Coordinator / Key Makeup & SFX Artist',
    description: 'Blue Ice Africa production - Lead coordinator managing hair and makeup department with special effects expertise.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=900&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 12,
    title: 'The Invisible',
    year: '2026',
    type: 'TV Series',
    role: 'Makeup & Hair / Department Support',
    description: 'South African action-thriller series based on Deon Meyer’s Blood Safari, starring Abbie Cornish, Dougray Scott and Kim Engelbrecht.',
    image: '/assets/Invisible Movie Thumb Nail.jpeg',
    rating: null,
    link: 'https://www.imdb.com/title/tt38682729/',
  },
  {
    id: 2,
    title: 'Alphas',
    year: '2024',
    type: 'Feature Film',
    role: 'Key Makeup & SFX Artist',
    description: 'Moonlighting production - Key artist responsible for principal cast makeup and special effects.',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=900&fit=crop',
    rating: null,
    link: '#',
  },
  {
    id: 3,
    title: 'Recipes for Love and Murder S2',
    year: '2024',
    type: 'TV Series',
    role: 'Makeup & SFX Artist',
    description: 'Both Worlds production - Season 2 of the beloved South African mystery drama series.',
    image: 'https://image.tmdb.org/t/p/w780/nx6G7t3mN6WbMiYx7RFuTpau8Mn.jpg',
    rating: null,
    link: 'https://www.imdb.com/title/tt13406036/',
  },
  {
    id: 4,
    title: 'Shaka iLembe',
    year: '2023-2024',
    type: 'TV Series',
    role: 'Makeup & SFX Artist',
    description: 'Epic Mzansi Magic/Showmax production telling the story of the legendary Zulu king.',
    image: 'https://image.tmdb.org/t/p/w780/unst24GN4ide77Sa0FWrp6mdVGC.jpg',
    rating: null,
    link: 'https://www.imdb.com/title/tt21996218/',
  },
  {
    id: 5,
    title: 'The Woman King',
    year: '2022',
    type: 'Feature Film',
    role: 'Makeup Artist',
    description: 'TriStar Pictures epic historical action drama directed by Gina Prince-Bythewood, starring Viola Davis.',
    image: 'https://image.tmdb.org/t/p/w780/438QXt1E3WJWb3PqNniK0tAE5c1.jpg',
    rating: 76,
    link: 'https://www.imdb.com/title/tt8093700/',
  },
  {
    id: 6,
    title: 'American Monster S7-9',
    year: '2023',
    type: 'TV Series',
    role: 'Hair & Makeup Artist',
    description: 'Trilogy Creative Studios production - Multiple seasons of the true crime documentary series.',
    image: 'https://image.tmdb.org/t/p/w780/h2aFb4tm7ygeiDC7MUCPNeYDSLy.jpg',
    rating: null,
    link: 'https://www.imdb.com/title/tt5765950/',
  },
  {
    id: 7,
    title: 'Black Sails',
    year: '2017',
    type: 'TV Series',
    role: 'Crowd Makeup Daily',
    description: 'Critically acclaimed Starz pirate drama series, prequel to Treasure Island.',
    image: 'https://image.tmdb.org/t/p/w780/mZcSwrDdw6cdOVgXm496DgwrQcQ.jpg',
    rating: 81,
    link: 'https://www.imdb.com/title/tt2375692/',
  },
  {
    id: 8,
    title: 'Tomb Raider',
    year: '2018',
    type: 'Feature Film',
    role: 'Crowd Makeup Daily',
    description: 'Action adventure film starring Alicia Vikander as the iconic Lara Croft.',
    image: 'https://image.tmdb.org/t/p/w780/s4Qn5LF6OwK4rIifmthIDtbqDSs.jpg',
    rating: 51,
    link: 'https://www.imdb.com/title/tt1365519/',
  },
  {
    id: 9,
    title: 'The Dark Tower',
    year: '2017',
    type: 'Feature Film',
    role: 'Crowd Makeup Daily',
    description: 'Fantasy western film based on Stephen King\'s novel series, starring Idris Elba and Matthew McConaughey.',
    image: 'https://image.tmdb.org/t/p/w780/i9GUSgddIqrroubiLsvvMRYyRy0.jpg',
    rating: 42,
    link: 'https://www.imdb.com/title/tt1648190/',
  },
  {
    id: 10,
    title: 'The Kissing Booth',
    year: '2018',
    type: 'Feature Film',
    role: 'Crowd Makeup Daily',
    description: 'Popular Netflix romantic comedy film shot in Cape Town, South Africa.',
    image: 'https://image.tmdb.org/t/p/w780/vcQNnnXgKLacoYF4LNWgkNiDXPd.jpg',
    rating: null,
    link: 'https://www.imdb.com/title/tt3799232/',
  },
  {
    id: 11,
    title: 'Troy: Fall of a City',
    year: '2018',
    type: 'TV Series',
    role: 'Crowd Makeup Daily',
    description: 'BBC/Netflix epic miniseries retelling the story of the Trojan War.',
    image: 'https://image.tmdb.org/t/p/w780/a07wLy4ONfpsjnBqMwhlWTJTcm.jpg',
    rating: 58,
    link: 'https://www.imdb.com/title/tt5765332/',
  },
]

// Additional Credits (shown in grid below)
const additionalCredits = [
  { title: 'This Water - Evelyn Hart', type: 'Music Video', role: 'Head Makeup & Hair Artist' },
  { title: 'Baas se Honne', type: 'Short Film', role: 'Hair & Makeup / SFX Artist' },
  { title: 'Of Kings & Prophets', type: 'TV Series', role: 'Crowd Makeup Daily' },
  { title: 'Blood Drive', type: 'TV Series', role: 'Crowd Makeup Daily' },
  { title: 'PEP Valentines', type: 'Commercial', role: 'Makeup & Hair Artist' },
  { title: 'Pavesini', type: 'Commercial', role: 'Makeup & Hair Artist' },
  { title: 'Corona', type: 'Commercial', role: 'Makeup Artist' },
  { title: 'Castle Double Malt', type: 'Commercial', role: 'Hair & Makeup Assistant' },
  { title: 'Toyota Event', type: 'Event', role: 'Makeup Artist' },
  { title: 'Netflix Rebel Moon', type: 'Event', role: 'Makeup Artist & Body Painter' },
  { title: 'Cape Town Carnival', type: 'Event', role: 'Body Painter' },
  { title: 'Sanlam TVC', type: 'Commercial', role: 'Head Makeup Artist' },
  { title: 'Bread Financial TVC', type: 'Commercial', role: 'Hair & Makeup Assistant' },
  { title: 'BIG JOHN - Chicken Licken', type: 'Commercial', role: 'Assistant' },
]

const credentials = [
  { name: 'IMDb', logo: '/logos/imdb.svg', url: 'https://www.imdb.com/user/p.ne4ljimtpenzih3arb2ubztgzy?ref_=ext_shr_lnk' },
  { name: 'Call a Crew', logo: '/logos/callacrew.svg', url: 'https://www.callacrew.co.za/crew/amy-morgenrood' },
  { name: 'Metacritic', logo: '/logos/metacritic.svg', url: 'https://www.metacritic.com/person/amy-morgenrood' },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-dark-950"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-500/80 text-xs tracking-[0.3em] uppercase mb-6"
          >
            Filmography
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-6">
            Productions & Credits
          </h2>
          <p className="text-cream-300/80 text-lg max-w-[42rem] mx-auto font-light leading-relaxed">
            A selection of productions, series, commercials and screen work that show Amy&apos;s experience on real sets and fast-paced departments.
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '.projects-prev',
              nextEl: '.projects-next',
            }}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.2 },
            }}
            className="projects-swiper !pb-16"
          >
            {featuredProjects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-14 h-14 bg-cream-100/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-cream-100/20"
                      >
                        <Play className="w-5 h-5 text-cream-100 ml-0.5" />
                      </motion.div>
                    </motion.div>

                    {/* Rating Badge */}
                    {project.rating && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20">
                        <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                        <span className="text-xs text-gold-400">{project.rating}</span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20">
                      <span className="text-[10px] tracking-[0.1em] uppercase text-gold-400/80">{project.type}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-cream-500/40 text-xs tracking-wide mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </span>
                      <span className="w-px h-3 bg-gold-500/20" />
                      <span className="flex items-center gap-1.5">
                        <Film className="w-3 h-3" />
                        {project.role}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-light text-cream-100 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-cream-300/70 text-sm font-light mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-400/80 hover:text-gold-400 text-xs tracking-[0.15em] uppercase group/link transition-colors duration-300"
                    >
                      <span>View on IMDb</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="projects-prev absolute left-0 top-1/3 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hidden lg:block"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-cream-100" />
          </button>
          <button
            className="projects-next absolute right-0 top-1/3 -translate-y-1/2 z-20 p-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hidden lg:block"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-cream-100" />
          </button>
        </motion.div>

        {/* Latest Commercial Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[1.75rem] border border-gold-500/15 bg-dark-900/45"
        >
          <div className="grid items-center lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative bg-black">
              <video controls playsInline preload="metadata" controlsList="nodownload" disablePictureInPicture className="aspect-video w-full object-cover" aria-label="Coca-Cola campaign featuring Springbok rugby players">
                <source src="/assets/Coca cola ad.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold-400/80">Latest commercial work</p>
              <h3 className="mt-4 font-display text-3xl font-light leading-tight text-cream-100 sm:text-4xl">Coca-Cola × Springbok talent</h3>
              <p className="mt-5 font-light leading-relaxed text-cream-300/75">
                A standout recent experience was preparing Siya Kolisi and fellow Springbok players for camera on a Coca-Cola campaign. Meeting some of South Africa&apos;s most recognised sporting talent—and helping them look screen-ready on set—was a genuine honour and an unforgettable production day.
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-cream-400/60">
                The project brought together the pace of commercial production, polished on-camera grooming and the calm attention to detail Amy brings to every set.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Credits Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-center font-display text-2xl font-light text-cream-100 mb-2">
            Additional Credits
          </h3>
          <p className="text-center text-cream-500/50 text-sm mb-10">
            Music Videos • Commercials • Short Films • Prosthetics Work
          </p>

          <div className="overflow-hidden rounded-2xl border border-gold-500/10 bg-dark-900/40">
            <table className="w-full table-fixed border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="text-[11px] tracking-[0.2em] uppercase text-cream-500/60">
                  <th className="px-6 py-4 font-normal text-left w-[40%]">Project</th>
                  <th className="px-6 py-4 font-normal text-left w-[20%]">Type</th>
                  <th className="px-6 py-4 font-normal text-left w-[40%]">Role</th>
                </tr>
              </thead>
              <tbody>
                {additionalCredits.map((credit, index) => (
                  <motion.tr
                    key={credit.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="block md:table-row border-t border-gold-500/10"
                  >
                    <td className="block md:table-cell px-6 py-4 text-sm text-cream-100 font-light break-words">
                      <span className="md:hidden block text-[10px] tracking-[0.2em] uppercase text-cream-500/50 mb-1">Project</span>
                      {credit.title}
                    </td>
                    <td className="block md:table-cell px-6 pb-4 md:py-4 text-xs text-gold-400/80 uppercase tracking-[0.15em] break-words">
                      <span className="md:hidden block text-[10px] tracking-[0.2em] uppercase text-cream-500/50 mb-1">Type</span>
                      {credit.type}
                    </td>
                    <td className="block md:table-cell px-6 pb-4 md:py-4 text-xs text-cream-400/70 font-light break-words">
                      <span className="md:hidden block text-[10px] tracking-[0.2em] uppercase text-cream-500/50 mb-1">Role</span>
                      {credit.role}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Coordination & Production Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-dark-900/80 to-dark-950 p-8 sm:p-10"
        >
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-gold-400">
                <ClipboardList className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.22em]">Department Experience</span>
              </div>
              <h3 className="font-display text-3xl font-light text-cream-100">Makeup Coordination &amp; Production Support</h3>
              <p className="mt-4 font-light leading-relaxed text-cream-300/70">
                In addition to working as a makeup and hair artist, Amy has experience assisting film-shoot makeup departments with coordination, continuity, scheduling, artist requirements, product organisation and day-to-day production communication.
              </p>
              <p className="mt-3 font-light leading-relaxed text-cream-300/70">
                Her production experience includes <em>Recipes for Love and Murder – Season 2</em>, <em>Alphas</em>, <em>Strung</em> and <em>Invisible</em>. Her coordination service is specifically for film shoots, including on-set makeup and hair work, department support, assisting coordination and junior coordination opportunities.
              </p>
            </div>
            <Link href="/makeup-department-coordinator-cape-town" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-6 py-3 text-xs uppercase tracking-[0.16em] text-gold-400 transition-colors hover:bg-gold-500/20">
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Credentials Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl p-8 bg-dark-900/50 border border-gold-500/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Award className="w-6 h-6 text-gold-500/80" />
              <div>
                <h4 className="text-xs tracking-[0.15em] uppercase text-cream-100">Industry Profiles</h4>
                <p className="text-xs text-cream-500/50 font-light mt-1">View my professional credentials</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.imdb.com/user/p.ne4ljimtpenzih3arb2ubztgzy?ref_=ext_shr_lnk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#f5c518]/10 border border-[#f5c518]/30 text-[#f5c518] text-xs tracking-[0.1em] uppercase hover:bg-[#f5c518]/20 transition-colors duration-300"
              >
                IMDb
              </a>
              <a
                href="https://www.callacrew.co.za/crew/2839508/amy-morgenrood/bio?bf=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-dark-950/50 border border-gold-500/20 text-cream-100 text-xs tracking-[0.1em] uppercase hover:border-gold-500/40 transition-colors duration-300"
              >
                Call a Crew
              </a>
              <a
                href="https://www.metacritic.com/person/amy-morgenrood"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-dark-950/50 border border-gold-500/20 text-cream-100 text-xs tracking-[0.1em] uppercase hover:border-gold-500/40 transition-colors duration-300 hidden sm:block"
              >
                Metacritic
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
