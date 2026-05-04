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
    window.gtag?.('event', 'conversion', {
      send_to: 'AW-17034931777/BewQCLKImKUcEMHc8bo_',
    })
  }, [])

  return null
}
