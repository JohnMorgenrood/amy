import Link from 'next/link'

export function StoryContact({ title = 'Planning a shoot in Cape Town?' }: { title?: string }) {
  return (
    <aside className="border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-rose-500/5 p-8 sm:p-12">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Work with Amy</p>
      <h2 className="mt-4 font-display text-3xl font-light text-cream-50 sm:text-4xl">{title}</h2>
      <p className="mt-5 max-w-2xl leading-7 text-cream-300/75">Book Amy Morgenrood for commercial and editorial makeup, body painting, on-set maintenance, continuity or makeup department coordination in Cape Town and the Western Cape.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/#contact" className="bg-cream-100 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-dark-950 transition-colors hover:bg-gold-400">Send a brief</Link>
        <Link href="/commercial-editorial-makeup-artist-cape-town" className="border border-gold-500/30 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-cream-100 transition-colors hover:border-gold-400">Explore services</Link>
      </div>
    </aside>
  )
}
