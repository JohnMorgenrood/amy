import { NextResponse } from 'next/server'
import { getCJAccessToken, getCJConfig } from '@/lib/cj'

export async function GET() {
  const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

  if (!CJ_API_KEY) {
    return NextResponse.json({ ok: false, step: 'config', error: 'CJ_API_KEY missing' }, { status: 400 })
  }

  try {
    const accessToken = await getCJAccessToken()

    const url = new URL(`${CJ_API_BASE_URL}/product/listV2`)
    url.searchParams.set('page', '1')
    url.searchParams.set('size', '1')
    url.searchParams.set('keyWord', 'makeup')

    const response = await fetch(url.toString(), {
      headers: {
        'CJ-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const body = await response.json().catch(() => ({}))

    return NextResponse.json({
      ok: response.ok,
      step: 'listV2',
      status: response.status,
      message: body?.message || null,
      result: body?.result ?? null,
      code: body?.code ?? null
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      step: 'auth',
      error: (error as Error).message
    }, { status: 500 })
  }
}
