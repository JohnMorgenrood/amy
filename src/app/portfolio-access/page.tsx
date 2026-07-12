'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LockKeyhole, Mail, MessageCircle } from 'lucide-react'

export default function PortfolioAccessPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function unlock(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('')
    try {
      const response = await fetch('/api/portfolio-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to unlock the portfolio.')
      const requested = new URLSearchParams(window.location.search).get('from') || '/portfolio'
      router.replace(requested.startsWith('/portfolio') ? requested : '/portfolio'); router.refresh()
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to unlock the portfolio.') }
    finally { setLoading(false) }
  }

  return <main className="min-h-screen bg-dark-950 px-4 py-24 flex items-center justify-center">
    <section className="w-full max-w-xl rounded-[2rem] border border-gold-500/20 bg-dark-900/70 p-7 sm:p-10 text-center shadow-2xl">
      <LockKeyhole className="mx-auto mb-6 h-12 w-12 text-gold-400" />
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold-500/80">Private portfolio</p>
      <h1 className="font-display text-4xl font-light text-cream-100">Access by request</h1>
      <p className="mx-auto mt-5 max-w-md text-cream-300/70 leading-relaxed">To protect Amy&apos;s original work from impersonation and scams, the full portfolio is password protected. If you are interested in working with Amy, please request access through WhatsApp or the contact form.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a href="https://wa.me/27847017012?text=Hi%20Amy%2C%20I%27d%20like%20to%20request%20access%20to%20your%20portfolio." target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-3"><MessageCircle className="h-4 w-4" /> WhatsApp Amy</a>
        <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/30 px-5 py-3 text-gold-400 hover:bg-gold-500/10"><Mail className="h-4 w-4" /> Use contact form</Link>
      </div>
      <form onSubmit={unlock} className="mt-9 border-t border-gold-500/10 pt-7">
        <label htmlFor="portfolio-password" className="block text-sm text-cream-300/70">Already have Amy&apos;s password?</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="portfolio-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter password" className="min-w-0 flex-1 rounded-full border border-gold-500/20 bg-dark-950 px-5 py-3 text-cream-100 outline-none focus:border-gold-500/60" /><button disabled={loading} className="rounded-full bg-gold-500 px-6 py-3 text-dark-950 disabled:opacity-60">{loading ? 'Checking…' : 'Unlock'}</button></div>
        {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
      </form>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-cream-300/50 hover:text-gold-400"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
    </section>
  </main>
}
