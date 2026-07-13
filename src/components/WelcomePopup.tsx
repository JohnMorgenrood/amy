'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { WatermarkOverlay } from '@/components/WatermarkOverlay'
import Link from 'next/link'

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [])

  const handleSelect = () => {
    setIsOpen(false)
  }

  const handleWorkWithAmy = () => {
    handleSelect()
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#0b0b0b] shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[280px]">
            <Image
              src="/assets/portfolio/IMG_20240713_080002_434.jpg"
              alt="Glamour makeup look"
              fill
              className="object-cover"
              priority
            />
            <WatermarkOverlay compact />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[#D4AF37]/80 text-[10px] tracking-[0.35em] uppercase">Welcome</p>
              <h2 className="text-3xl sm:text-4xl text-white font-semibold mt-2">
                Enter the Glamour Suite
              </h2>
              <p className="text-white/70 mt-3 max-w-md">
                Discover signature beauty, bespoke artistry, and curated products crafted by Amy.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[#D4AF37]/30">
                  <Image
                    src="/assets/portfolio/IMG_20240713_075631_238.jpg"
                    alt="Bridal glamour look"
                    fill
                    className="object-cover"
                  />
                  <WatermarkOverlay compact />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">Would you like to work with Amy?</p>
                  <p className="text-white/60 text-sm">Book a session or connect directly for your next project.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleWorkWithAmy}
                className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] px-6 py-3 text-center text-sm font-semibold text-black transition-shadow hover:shadow-[0_12px_30px_rgba(212,175,55,0.35)]"
              >
                Work with Amy
              </button>
              <Link
                href="/shop"
                onClick={handleSelect}
                className="w-full rounded-full border border-[#D4AF37]/40 px-6 py-3 text-center text-sm font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
              >
                Continue Shopping
              </Link>
            </div>
            <p className="text-xs text-white/50">
              Please choose an option to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
