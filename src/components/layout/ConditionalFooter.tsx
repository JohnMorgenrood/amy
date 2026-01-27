'use client'

import { usePathname } from 'next/navigation'
import { ShopFooter, SiteFooter } from '@/components/layout/Footer'

const SHOP_PATHS = ['/shop', '/checkout']

export function ConditionalFooter() {
  const pathname = usePathname() || ''
  const isShop = SHOP_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  return isShop ? <ShopFooter /> : <SiteFooter />
}
