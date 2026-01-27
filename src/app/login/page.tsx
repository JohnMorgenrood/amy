import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/account')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]/80">Member Access</p>
        <h1 className="text-2xl font-semibold text-white mt-4">Sign in to your account</h1>
        <p className="text-white/60 text-sm mt-2">
          Track orders, manage shipping, and update your profile.
        </p>

        <a
          href="/api/auth/signin/google"
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold transition hover:bg-white/90"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.6h5.1c-.2 1.2-1.4 3.6-5.1 3.6-3.1 0-5.6-2.6-5.6-5.8s2.5-5.8 5.6-5.8c1.8 0 3 .7 3.7 1.3l2.5-2.5C16.7 2.5 14.6 1.5 12 1.5 6.8 1.5 2.6 5.7 2.6 10.9S6.8 20.3 12 20.3c6.9 0 8.6-4.9 8.6-7.5 0-.5-.1-.9-.2-1.3H12z"
            />
          </svg>
          Continue with Google
        </a>

        <p className="text-white/40 text-xs mt-6">
          By continuing, you agree to the shop terms.
        </p>

        <Link href="/shop" className="mt-6 inline-block text-[#D4AF37] text-sm hover:underline">
          Back to Shop
        </Link>
      </div>
    </div>
  )
}
