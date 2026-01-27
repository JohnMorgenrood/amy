import { NextResponse } from 'next/server'
import { getCJAccessToken, getCJConfig } from '@/lib/cj'

type OrderItem = {
  sku?: string
  quantity: number
  vid?: string
}

type ShippingAddress = {
  address_1: string
  address_2?: string
  city: string
  company?: string
  country: string
  first_name: string
  last_name: string
  postcode: string
  state: string
  phone?: string
}

type IncomingOrderRequest = {
  order_id?: string
  orderNumber?: string
  shipping_address?: ShippingAddress
  line_items?: OrderItem[]
  products?: OrderItem[]
  logisticName?: string
}

const DEFAULT_LOGISTIC_NAME = 'CJPacket'

function toCJCreatePayload(body: IncomingOrderRequest) {
  const orderNumber = body.orderNumber || body.order_id || `AMY-${Date.now()}`
  const shipping = body.shipping_address

  if (!shipping) {
    throw new Error('Missing shipping address')
  }

  const products: OrderItem[] = Array.isArray(body.products)
    ? body.products
    : Array.isArray(body.line_items)
      ? body.line_items
      : []

  if (products.length === 0) {
    throw new Error('Missing line items')
  }

  const shippingCustomerName = `${shipping.first_name} ${shipping.last_name}`.trim()
  const shippingAddress = [shipping.address_1, shipping.address_2].filter(Boolean).join(', ')
  const shippingCountryCode = String(shipping.country || '').toUpperCase()
  const shippingCountry = shippingCountryCode
  const shippingProvince = shipping.state || shipping.city || 'N/A'
  const shippingCity = shipping.city
  const shippingZip = shipping.postcode
  const shippingPhone = shipping.phone

  return {
    orderNumber,
    shippingCountryCode,
    shippingCountry,
    shippingProvince,
    shippingCity,
    shippingCustomerName,
    shippingAddress,
    shippingZip,
    shippingPhone,
    logisticName: body.logisticName || DEFAULT_LOGISTIC_NAME,
    fromCountryCode: (process.env.CJ_START_COUNTRY || 'CN').toUpperCase(),
    products: products.map((item) => ({
      quantity: item.quantity,
      ...(item.vid ? { vid: item.vid } : {}),
      ...(item.sku ? { sku: item.sku } : {})
    }))
  }
}

export async function POST(request: Request) {
  const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

  try {
    const body: IncomingOrderRequest = await request.json()

    if (!CJ_API_KEY) {
      return NextResponse.json({
        cjOrderId: `DEMO-${Date.now()}`,
        orderNumber: body.orderNumber || body.order_id || `AMY-${Date.now()}`,
        status: 'PROCESSING',
        isDemo: true,
        message: 'Demo mode - order not placed. Configure CJ_API_KEY to enable real orders.'
      }, { status: 201 })
    }

    const payload = toCJCreatePayload(body)
    const accessToken = await getCJAccessToken()

    const response = await fetch(`${CJ_API_BASE_URL}/shopping/order/createOrderV3`, {
      method: 'POST',
      headers: {
        'CJ-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`CJ create order error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return NextResponse.json({ ...data, isDemo: false }, { status: 201 })
  } catch (error) {
    console.error('Failed to create CJ order:', error)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again or contact support.' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

  if (!CJ_API_KEY) {
    return NextResponse.json({ error: 'CJ API key missing' }, { status: 400 })
  }

  try {
    const url = new URL(request.url)
    const orderId = url.searchParams.get('orderId')
    const accessToken = await getCJAccessToken()

    const endpoint = orderId
      ? `${CJ_API_BASE_URL}/shopping/order/getOrderDetail?orderId=${encodeURIComponent(orderId)}`
      : `${CJ_API_BASE_URL}/shopping/order/list?${url.searchParams.toString()}`

    const response = await fetch(endpoint, {
      headers: {
        'CJ-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`CJ order query error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to query CJ orders:', error)
    return NextResponse.json(
      { error: 'Failed to query orders.' },
      { status: 500 }
    )
  }
}
