import { NextResponse } from 'next/server'

const FALLBACK_RATES = {
  USD: 1,
  ZAR: 19.0,
  GBP: 0.79
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const base = searchParams.get('base') || 'USD'

  try {
    const url = new URL('https://api.exchangerate.host/latest')
    url.searchParams.set('base', base)
    url.searchParams.set('symbols', 'USD,ZAR,GBP')

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`FX API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      base,
      rates: {
        USD: data?.rates?.USD ?? FALLBACK_RATES.USD,
        ZAR: data?.rates?.ZAR ?? FALLBACK_RATES.ZAR,
        GBP: data?.rates?.GBP ?? FALLBACK_RATES.GBP
      },
      source: 'exchangerate.host'
    })
  } catch (error) {
    console.error('FX rate fetch failed:', error)
    return NextResponse.json({
      base,
      rates: FALLBACK_RATES,
      source: 'fallback'
    })
  }
}
