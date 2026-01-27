import { NextResponse } from 'next/server'
import { getCJAccessToken, getCJConfig } from '@/lib/cj'

export async function GET(request: Request) {
  const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

  if (!CJ_API_KEY) {
    return NextResponse.json({ error: 'CJ API key missing' }, { status: 400 })
  }

  try {
    const url = new URL(request.url)
    const trackNumbers = url.searchParams.getAll('trackNumber')

    if (trackNumbers.length === 0) {
      return NextResponse.json({ error: 'Missing trackNumber parameter' }, { status: 400 })
    }

    const accessToken = await getCJAccessToken()
    const query = trackNumbers.map((num) => `trackNumber=${encodeURIComponent(num)}`).join('&')

    const response = await fetch(`${CJ_API_BASE_URL}/logistic/trackInfo?${query}`, {
      headers: {
        'CJ-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`CJ tracking error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch CJ tracking info:', error)
    return NextResponse.json({ error: 'Failed to fetch tracking info.' }, { status: 500 })
  }
}
