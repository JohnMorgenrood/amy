'use client'

import { useEffect } from 'react'

const attributionStorageKey = 'amy_lead_attribution'
const trackedParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const

export type LeadAttribution = {
  landingPage?: string
  currentPage?: string
  referrer?: string
  capturedAt?: string
  submittedAt?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
}

export function AttributionCapture() {
  useEffect(() => {
    captureLeadAttribution()
  }, [])

  return null
}

export function captureLeadAttribution() {
  const currentUrl = window.location.href
  const params = new URLSearchParams(window.location.search)
  const existing = getStoredAttribution()
  const updates: LeadAttribution = {}

  for (const param of trackedParams) {
    const value = params.get(param)
    if (value) {
      updates[param] = value
    }
  }

  const hasNewAttribution = Object.keys(updates).length > 0
  const nextAttribution: LeadAttribution = {
    ...existing,
    ...updates,
    landingPage: hasNewAttribution ? currentUrl : existing?.landingPage || currentUrl,
    currentPage: currentUrl,
    referrer: hasNewAttribution ? document.referrer || undefined : existing?.referrer || document.referrer || undefined,
    capturedAt: hasNewAttribution ? new Date().toISOString() : existing?.capturedAt || new Date().toISOString(),
  }

  if (hasNewAttribution || !existing?.landingPage) {
    window.localStorage.setItem(attributionStorageKey, JSON.stringify(nextAttribution))
  }
}

export function getLeadAttributionForSubmit(): LeadAttribution {
  return {
    ...getStoredAttribution(),
    currentPage: window.location.href,
    submittedAt: new Date().toISOString(),
  }
}

function getStoredAttribution(): LeadAttribution | null {
  try {
    const storedValue = window.localStorage.getItem(attributionStorageKey)
    return storedValue ? JSON.parse(storedValue) : null
  } catch {
    return null
  }
}
