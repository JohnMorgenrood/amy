import { NextRequest, NextResponse } from 'next/server'

const encoder = new TextEncoder()

const toHex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('')

async function signatureFor(expires: string, password: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(`amy-portfolio:${expires}`)))
}

async function hasValidSession(token: string | undefined, password: string | undefined) {
  if (!token || !password) return false
  const [expires, suppliedSignature, ...extra] = token.split('.')
  if (!expires || !suppliedSignature || extra.length || !/^\d+$/.test(expires)) return false
  if (Number(expires) <= Date.now()) return false
  return suppliedSignature === await signatureFor(expires, password)
}

export async function middleware(request: NextRequest) {
  const password = process.env.PORTFOLIO_PASSWORD
  const authorised = await hasValidSession(request.cookies.get('amy_portfolio_access')?.value, password)
  if (!authorised) {
    const url = new URL('/portfolio-access', request.url)
    url.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'private, no-store, max-age=0')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex')
  return response
}

export const config = { matcher: ['/portfolio/:path*'] }
