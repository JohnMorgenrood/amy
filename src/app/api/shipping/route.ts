import { NextResponse } from 'next/server'
import { getCJAccessToken, getCJConfig } from '@/lib/cj'

type ShippingItem = {
  sku: string
  quantity: number
}

type FreightOption = {
  logisticName?: string
  logisticPrice?: number
  totalPostageFee?: number
  logisticAging?: string
}

export async function POST(request: Request) {
  const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

  if (!CJ_API_KEY) {
    return NextResponse.json({
      shippingUsd: 0,
      options: [],
      error: 'CJ API key missing'
    }, { status: 400 })
  }

  try {
    const body = await request.json()
    const endCountryCode = String(body?.countryCode || 'US').toUpperCase()
    const items: ShippingItem[] = Array.isArray(body?.items) ? body.items : []

    if (items.length === 0) {
      return NextResponse.json({ shippingUsd: 0, options: [] })
    }

    const accessToken = await getCJAccessToken()

    const products: Array<{ quantity: number; vid: string }> = []

    for (const item of items) {
      if (!item?.sku || !item?.quantity) continue

      const variantResponse = await fetch(`${CJ_API_BASE_URL}/product/variant/query?productSku=${encodeURIComponent(item.sku)}`, {
        headers: {
          'CJ-Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      })

      if (!variantResponse.ok) continue

      const variantData = await variantResponse.json()
      const vid = variantData?.data?.[0]?.vid
      if (!vid) continue

      products.push({ quantity: item.quantity, vid })
    }

    if (products.length === 0) {
      return NextResponse.json({ shippingUsd: 0, options: [], error: 'No valid variants' })
    }

    const startCountryCode = (process.env.CJ_START_COUNTRY || 'CN').toUpperCase()

    const freightResponse = await fetch(`${CJ_API_BASE_URL}/logistic/freightCalculate`, {
      method: 'POST',
      headers: {
        'CJ-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startCountryCode,
        endCountryCode,
        products
      })
    })

    if (!freightResponse.ok) {
      throw new Error(`CJ freight error: ${freightResponse.status}`)
    }

    const freightData = await freightResponse.json()
    const options: FreightOption[] = Array.isArray(freightData?.data) ? freightData.data : []

    const best = options.reduce((min, option) => {
      const price = Number(option.totalPostageFee ?? option.logisticPrice ?? 0)
      if (!min) return price
      return price > 0 ? Math.min(min, price) : min
    }, 0 as number)

    return NextResponse.json({
      shippingUsd: best || 0,
      options
    })
  } catch (error) {
    console.error('Shipping quote failed:', error)
    return NextResponse.json({ shippingUsd: 0, options: [], error: 'Shipping quote failed' })
  }
}
