import { NextRequest, NextResponse } from 'next/server'

async function accessToken(password: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`amy-portfolio:${password}`))
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const password = process.env.PORTFOLIO_PASSWORD
  const authorised = password && request.cookies.get('amy_portfolio_access')?.value === await accessToken(password)
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
