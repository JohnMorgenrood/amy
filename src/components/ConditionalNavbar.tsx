'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './layout/Navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Don't show main navbar on shop page
  if (pathname === '/shop') {
    return null
  }
  
  return <Navbar />
}
