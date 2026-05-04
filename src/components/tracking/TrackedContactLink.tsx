'use client'

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

type LeadAction = 'phone_call_click' | 'whatsapp_click' | 'quote_click'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type TrackingPayload = {
  action: LeadAction
  label: string
}

type TrackedContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  TrackingPayload & {
    children: ReactNode
  }

export function trackLeadClick({ action, label }: TrackingPayload) {
  window.gtag?.('event', action, {
    event_category: 'lead',
    event_label: label,
    link_location: label,
    transport_type: 'beacon',
  })
}

export function TrackedContactLink({
  action,
  label,
  children,
  onClick,
  ...props
}: TrackedContactLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackLeadClick({ action, label })
    onClick?.(event)
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  )
}
