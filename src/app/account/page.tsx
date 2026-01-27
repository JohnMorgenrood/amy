import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]/70">Account</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Welcome back</h1>
            <p className="text-white/60 text-sm">Manage shipping, orders, and profile details.</p>
          </div>
          <Link
            href="/shop"
            className="rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Profile</h2>
            <div className="text-white/70 text-sm space-y-2">
              <p><span className="text-white/50">Name:</span> {session.user?.name ?? 'Customer'}</p>
              <p><span className="text-white/50">Email:</span> {session.user?.email ?? '—'}</p>
            </div>
            <p className="text-xs text-white/50 mt-4">Profile editing will be enabled soon.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Shipping Address</h2>
            <p className="text-white/60 text-sm">Save multiple addresses and choose a default at checkout.</p>
            <button className="mt-4 rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#F4D03F]">
              Add Address
            </button>
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Orders</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {['Pending', 'Processing', 'Delivered'].map((status) => (
              <div key={status} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-white/70 text-sm">{status}</p>
                <p className="text-2xl text-[#D4AF37] font-semibold mt-2">0</p>
                <p className="text-xs text-white/50 mt-1">Orders will appear here once placed.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/signout"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-[#D4AF37]/40"
            >
              Sign out
            </Link>
            <Link
              href="/checkout"
              className="rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              Go to checkout
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
