'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function ThankYouLeadEvent() {
  useEffect(() => {
    window.gtag?.('event', 'generate_lead', {
      event_category: 'booking',
      event_label: 'thank_you_page',
      value: 0,
      currency: 'ZAR',
    })
  }, [])

  return null
}
