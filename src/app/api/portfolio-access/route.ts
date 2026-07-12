import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const attempts = new Map<string, { count: number; resetAt: number }>()
const tokenFor = (value: string) => createHash('sha256').update(`amy-portfolio:${value}`).digest('hex')
const SESSION_LENGTH_SECONDS = 60 * 60 * 24 * 7

const json = (body: object, init?: ResponseInit) => {
  const response = NextResponse.json(body, init)
  response.headers.set('Cache-Control', 'private, no-store, max-age=0')
  return response
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const previous = attempts.get(ip)
  const attempt = !previous || previous.resetAt <= now ? { count: 0, resetAt: now + 900_000 } : previous
  if (attempt.count >= 8) return json({ error: 'Too many attempts. Please wait 15 minutes or contact Amy.' }, { status: 429 })

  let submitted = ''
  try {
    const body = await request.json()
    submitted = typeof body.password === 'string' ? body.password : ''
  } catch { return json({ error: 'Invalid request.' }, { status: 400 }) }

  const configured = process.env.PORTFOLIO_PASSWORD
  const valid = configured && submitted && timingSafeEqual(Buffer.from(tokenFor(submitted)), Buffer.from(tokenFor(configured)))
  if (!valid) {
    attempt.count += 1
    attempts.set(ip, attempt)
    return json({ error: configured ? 'That password is not correct.' : 'Portfolio access is by request only. Please contact Amy.' }, { status: 401 })
  }

  attempts.delete(ip)
  const expires = Date.now() + SESSION_LENGTH_SECONDS * 1000
  const signature = createHmac('sha256', configured).update(`amy-portfolio:${expires}`).digest('hex')
  const response = json({ ok: true })
  response.cookies.set('amy_portfolio_access', `${expires}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_LENGTH_SECONDS,
  })
  return response
}
