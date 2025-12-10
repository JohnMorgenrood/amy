import { NextResponse } from 'next/server'

// Blanka API configuration
const BLANKA_API_URL = 'https://api.blankabrand.com/api/v1/orders/'
const BLANKA_API_KEY = process.env.BLANKA_API_KEY || ''

export interface BlankaOrderItem {
  sku: string
  quantity: number
}

export interface BlankaShippingAddress {
  address_1: string
  address_2?: string
  city: string
  company?: string
  country: string
  first_name: string
  last_name: string
  postcode: string
  state: string
  phone: string
}

export interface BlankaOrderRequest {
  order_id: string
  shipping_address: BlankaShippingAddress
  line_items: BlankaOrderItem[]
}

export interface BlankaOrderResponse {
  id: string
  order_id: string
  status: 'PAYMENT_REQUIRED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'
  tracking_code: string | null
  line_items: BlankaOrderItem[]
  shipping_address: BlankaShippingAddress
}

export async function POST(request: Request) {
  try {
    const body: BlankaOrderRequest = await request.json()

    // Validate required fields
    if (!body.order_id || !body.shipping_address || !body.line_items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: order_id, shipping_address, line_items' },
        { status: 400 }
      )
    }

    // If no API key, return demo response
    if (!BLANKA_API_KEY) {
      return NextResponse.json({
        id: `DEMO-${Date.now()}`,
        order_id: body.order_id,
        status: 'PROCESSING',
        tracking_code: null,
        line_items: body.line_items,
        shipping_address: body.shipping_address,
        isDemo: true,
        message: 'Demo mode - order not actually placed. Configure BLANKA_API_KEY to enable real orders.'
      }, { status: 201 })
    }

    // Create real order with Blanka
    const response = await fetch(BLANKA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': BLANKA_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Blanka API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data: BlankaOrderResponse = await response.json()
    
    return NextResponse.json({
      ...data,
      isDemo: false
    }, { status: 201 })

  } catch (error) {
    console.error('Failed to create Blanka order:', error)
    
    return NextResponse.json(
      { error: 'Failed to create order. Please try again or contact support.' },
      { status: 500 }
    )
  }
}
