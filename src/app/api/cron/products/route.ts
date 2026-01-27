import { NextResponse } from 'next/server'
import { GET as getProducts } from '@/app/api/products/route'

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const provided = request.headers.get('x-cron-secret') || ''

  if (secret && secret !== provided) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const refreshUrl = new URL('/api/products', url.origin)
  refreshUrl.searchParams.set('refresh', '1')

  const refreshRequest = new Request(refreshUrl.toString(), {
    headers: request.headers
  })

  return getProducts(refreshRequest)
}
