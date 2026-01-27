'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './layout/Navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Don't show main navbar on shop and checkout pages
  if (pathname === '/shop' || pathname === '/checkout') {
    return null
  }
  
  return <Navbar />
}
