import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    console.log('CJ webhook received:', JSON.stringify(payload))

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('CJ webhook error:', error)
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
