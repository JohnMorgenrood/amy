'use client'

import { useState, useEffect, useMemo, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PromoWheel from '@/components/PromoWheel'

// Types for Blanka Products
interface BlankaProduct {
  id: number
  name: string
  sku: string
  branded_box_available: boolean
  available_inventory: number
  suggested_cost: string
  cost: string
  weight: number
  color_code: string
  color_name: string
  product_type: string
  image: string
  categories: string[]
  is_expiring: boolean
  description: string
  product_notes: string | null
  benefits: string
  application: string
  ingredients: string
  expires_at: string | null
  product_base: string | null
  videoUrls?: string[]
}

interface CartItem {
  product: BlankaProduct
  quantity: number
}

// Cart Context
interface CartContextType {
  items: CartItem[]
  addToCart: (product: BlankaProduct) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CurrencyCode = 'USD' | 'ZAR' | 'GBP'

const DEFAULT_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  ZAR: 19.0,
  GBP: 0.79
}

// Calculate price - 3% markup on USD base
function getRetailPrice(product: BlankaProduct): number {
  const basePrice = parseFloat(product.suggested_cost) || 0
  return basePrice * 1.03
}

const EU_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
])

type ShippingRegion = 'US' | 'GB' | 'EU' | 'ZA' | 'CA' | 'AU' | 'NZ' | 'OTHER'

const SHIPPING_RATES_USD: Record<ShippingRegion, number> = {
  US: 8.95,
  GB: 9.95,
  EU: 10.95,
  ZA: 12.95,
  CA: 10.95,
  AU: 12.95,
  NZ: 12.95,
  OTHER: 14.95
}

function getShippingRegion(countryCode: string): ShippingRegion {
  const code = countryCode.toUpperCase()
  if (code === 'US') return 'US'
  if (code === 'GB') return 'GB'
  if (code === 'ZA') return 'ZA'
  if (code === 'CA') return 'CA'
  if (code === 'AU') return 'AU'
  if (code === 'NZ') return 'NZ'
  if (code === 'EU' || EU_COUNTRIES.has(code)) return 'EU'
  return 'OTHER'
}

function getShippingUsd(countryCode: string) {
  const region = getShippingRegion(countryCode)
  return SHIPPING_RATES_USD[region] ?? SHIPPING_RATES_USD.OTHER
}


function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amy-blanka-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amy-blanka-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: BlankaProduct) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = items.reduce((sum, item) => {
    const price = getRetailPrice(item.product)
    return sum + price * item.quantity
  }, 0)
  
  const total = subtotal // Add shipping later

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

const shopCarouselSlides = [
  {
    src: '/assets/portfolio/IMG_20240713_075631_187.jpg',
    alt: 'Luxury beauty look with flawless skin',
    title: 'Luxe Complexion',
    subtitle: 'Refined, radiant, camera-ready finish.'
  },
  {
    src: '/assets/portfolio/IMG_20240713_080002_434.jpg',
    alt: 'Elegant editorial makeup look',
    title: 'Editorial Elegance',
    subtitle: 'Polished detail for timeless beauty.'
  },
  {
    src: '/assets/portfolio/IMG_20240713_075631_238.jpg',
    alt: 'Soft bridal glamour makeup look',
    title: 'Bridal Glamour',
    subtitle: 'Soft-focus glow with a couture touch.'
  },
]

const fallbackProductImages = [
  '/assets/portfolio/IMG_20240713_075631_187.jpg',
  '/assets/portfolio/IMG_20240713_075631_238.jpg',
  '/assets/portfolio/IMG_20240713_080002_348.jpg',
  '/assets/portfolio/IMG_20240713_080002_394.jpg',
  '/assets/portfolio/IMG_20240713_080002_434.jpg',
  '/assets/portfolio/FB_IMG_1487892884148.jpg',
  '/assets/portfolio/FB_IMG_1487892965084.jpg',
]

// Cart Sidebar Component
function CartSidebar({
  isOpen,
  onClose,
  currency,
  rates,
  shipCountry,
  onShipCountryChange,
  shippingUsd,
  shippingLoading
}: {
  isOpen: boolean
  onClose: () => void
  currency: CurrencyCode
  rates: Record<CurrencyCode, number>
  shipCountry: string
  onShipCountryChange: (value: string) => void
  shippingUsd: number | null
  shippingLoading: boolean
}) {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, total, totalItems } = useCart()

  const formatCurrency = (amountUsd: number) => {
    const rate = rates[currency] ?? 1
    const value = amountUsd * rate
    const locale = currency === 'ZAR' ? 'en-ZA' : currency === 'GBP' ? 'en-GB' : 'en-US'
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  }

  const resolvedShippingUsd = typeof shippingUsd === 'number'
    ? shippingUsd
    : getShippingUsd(shipCountry)
  const totalWithShippingUsd = total + resolvedShippingUsd

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black z-[60] shadow-[-20px_0_60px_rgba(212,175,55,0.15)] flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-black to-zinc-900">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/60 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-white/60">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-[#D4AF37] hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 bg-zinc-900/80 rounded-xl p-4 shadow-lg shadow-black/50 border border-white/5 hover:border-pink-500/20 transition-all"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 shadow-md">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.product.name}</h3>
                        <p className="text-[#D4AF37] font-semibold mt-1">
                          {formatCurrency(getRetailPrice(item.product))}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          >
                            -
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4 bg-gradient-to-t from-zinc-900 to-black">
                {/* Shipping Info */}
                <div className="bg-zinc-900 rounded-xl p-4 mb-3 shadow-lg shadow-black/50 border border-white/5">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>
                      {shippingLoading
                        ? 'Calculating live shipping…'
                        : `Standard shipping from ${formatCurrency(resolvedShippingUsd)} • 1-3 Business Days`}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-1 ml-6">Delivery time depends on area and product availability</p>
                </div>
                
                <div className="bg-zinc-900 rounded-xl p-4 shadow-lg shadow-black/50 border border-white/5 space-y-3 text-sm">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Ship to</span>
                    <select
                      value={shipCountry}
                      onChange={(e) => onShipCountryChange(e.target.value)}
                      className="bg-black/60 border border-white/10 text-white/80 text-xs px-2 py-1 rounded"
                    >
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="EU">Europe</option>
                      <option value="ZA">South Africa</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping (Standard)</span>
                    <span>{shippingLoading ? '—' : formatCurrency(resolvedShippingUsd)}</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-bold pt-3 mt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">{formatCurrency(totalWithShippingUsd)}</span>
                  </div>
                </div>
                
                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold text-center rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                >
                  Proceed to Checkout
                </Link>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Product Detail Modal
function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  currency,
  rates
}: {
  product: BlankaProduct | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
  currency: CurrencyCode
  rates: Record<CurrencyCode, number>
}) {
  if (!product) return null

  const retailPrice = getRetailPrice(product)
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'payments' | 'video'>('details')
  const videoUrls = Array.isArray(product.videoUrls)
    ? product.videoUrls.filter((url) => typeof url === 'string' && url.startsWith('http'))
    : []
  const showVideoTab = videoUrls.length > 0

  const formatCurrency = (amountUsd: number) => {
    const rate = rates[currency] ?? 1
    const value = amountUsd * rate
    const locale = currency === 'ZAR' ? 'en-ZA' : currency === 'GBP' ? 'en-GB' : 'en-US'
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  }

  const fallbackImage = fallbackProductImages[product.id % fallbackProductImages.length]
  const displayImage = product.image || fallbackImage

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[60] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b0b0b] rounded-2xl overflow-hidden flex flex-col pointer-events-auto border border-[#D4AF37]/20 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row overflow-y-auto">
              {/* Image */}
              <div className="relative w-full md:w-1/2 aspect-square flex-shrink-0 bg-[#0f0f0f]">
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {showVideoTab && (
                  <div className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-[#F8E7B4] border border-[#D4AF37]/40">
                    Video Available
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-medium rounded-full capitalize border border-[#D4AF37]/30">
                      {cat.replace('-', ' ')}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h2>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-[#D4AF37]">{formatCurrency(retailPrice)}</span>
                  {product.available_inventory > 0 && (
                    <span className="text-green-400 text-sm">In Stock</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { key: 'details', label: 'Details' },
                    { key: 'shipping', label: 'Shipping' },
                    { key: 'payments', label: 'Payments' },
                    ...(showVideoTab ? [{ key: 'video', label: 'Video' }] : [])
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as 'details' | 'shipping' | 'payments' | 'video')}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                        activeTab === tab.key
                          ? 'bg-[#D4AF37]/20 text-[#F8E7B4] border-[#D4AF37]/60'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'details' && (
                  <div>
                    <div className="prose prose-invert prose-sm mb-6">
                      <p className="text-white/70" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>

                    {product.benefits && (
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-2">Benefits</h3>
                        <div className="text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: product.benefits }} />
                      </div>
                    )}

                    {product.application && (
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-2">How to Use</h3>
                        <div className="text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: product.application }} />
                      </div>
                    )}

                    {product.ingredients && (
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-2">Ingredients</h3>
                        <div className="text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: product.ingredients }} />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-sm text-white/70">
                    <p>Shipping is calculated at checkout based on destination and real-time carrier availability.</p>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-white font-semibold mb-2">Estimated delivery windows</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Express lines: 5–10 business days</li>
                        <li>Standard lines: 8–15 business days</li>
                        <li>Economy lines: 12–25 business days</li>
                      </ul>
                    </div>
                    <p className="text-xs text-white/50">Actual times vary by country and courier availability.</p>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-4 text-sm text-white/70">
                    <p>We accept secure card and wallet payments.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                        <span key={method} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/80">
                          {method}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/50">All payments are encrypted and processed securely.</p>
                  </div>
                )}

                {activeTab === 'video' && showVideoTab && (
                  <div className="space-y-4">
                    {videoUrls.map((url) => (
                      <div key={url} className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        <video
                          src={url}
                          controls
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={onAddToCart}
                  className="w-full py-4 bg-[#F7C6D9] hover:bg-[#F3B3CC] text-[#2b0f1f] font-bold rounded-xl transition-colors"
                >
                  Add to Cart - {formatCurrency(retailPrice)}
                </button>
              </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Product Card Component
function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  currency,
  rates
}: {
  product: BlankaProduct
  onAddToCart: () => void
  onViewDetails: () => void
  currency: CurrencyCode
  rates: Record<CurrencyCode, number>
}) {
  const [imageError, setImageError] = useState(false)
  const retailPrice = getRetailPrice(product)

  const formatCurrency = (amountUsd: number) => {
    const rate = rates[currency] ?? 1
    const value = amountUsd * rate
    const locale = currency === 'ZAR' ? 'en-ZA' : currency === 'GBP' ? 'en-GB' : 'en-US'
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  }

  const fallbackImage = fallbackProductImages[product.id % fallbackProductImages.length]
  const displayImage = imageError || !product.image ? fallbackImage : product.image

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#0b0b0b] rounded-2xl overflow-hidden border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:shadow-[0_12px_40px_rgba(212,175,55,0.12)] transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-[#0f0f0f] cursor-pointer"
        onClick={onViewDetails}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          unoptimized
          onError={() => setImageError(true)}
        />

        {product.videoUrls && product.videoUrls.length > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-[#F8E7B4] border border-[#D4AF37]/40">
            Video
          </div>
        )}
        
        {/* Quick View Button - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity">
          <button
            onClick={onViewDetails}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm text-[#F8E7B4] text-xs font-medium rounded-full border border-[#D4AF37]/40 hover:bg-black/90 transition-colors"
          >
            Quick View
          </button>
        </div>

        {/* Stock Badge */}
        {product.available_inventory <= 0 && (
          <div className="absolute top-10 right-2 md:top-11 md:right-3 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-white text-[10px] md:text-xs font-medium">Low Stock</span>
          </div>
        )}

        {/* Color Swatch */}
        {product.color_code && (
          <div 
            className="absolute top-2 left-2 md:top-3 md:left-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-[#D4AF37]/60 shadow-lg"
            style={{ backgroundColor: product.color_code }}
            title={product.color_name}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-1 border-t border-white/10">
        {/* Category */}
        <div className="mb-1 md:mb-2">
          <span className="text-[#D4AF37]/80 text-[10px] md:text-xs font-medium uppercase tracking-wider line-clamp-1">
            {product.categories[0]?.replace('-', ' ') || 'Beauty'}
          </span>
        </div>
        
        {/* Product Name */}
        <h3 
          className="text-white text-sm md:text-base font-medium line-clamp-2 mb-2 md:mb-3 flex-1 cursor-pointer hover:text-[#D4AF37] transition-colors"
          onClick={onViewDetails}
        >
          {product.name}
        </h3>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-[#D4AF37]">{formatCurrency(retailPrice)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#F7C6D9] hover:bg-[#F3B3CC] text-[#2b0f1f] text-xs md:text-sm font-bold rounded-full transition-colors shadow-[0_8px_20px_rgba(247,198,217,0.35)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Shop Page
function ShopContent() {
  const [products, setProducts] = useState<BlankaProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<BlankaProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<BlankaProduct | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [currency, setCurrency] = useState<CurrencyCode>('USD')
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_RATES)
  const [shipCountry, setShipCountry] = useState('US')
  const [shippingUsd, setShippingUsd] = useState<number | null>(null)
  const [shippingLoading, setShippingLoading] = useState(false)
  
  const { addToCart, totalItems, items } = useCart()

  const formatCurrency = (amountUsd: number) => {
    const rate = rates[currency] ?? 1
    const value = amountUsd * rate
    const locale = currency === 'ZAR' ? 'en-ZA' : currency === 'GBP' ? 'en-GB' : 'en-US'
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  }

  // Handle browser back button for modals - closes modal instead of navigating away
  useEffect(() => {
    const handlePopState = () => {
      // If product modal is open, close it
      if (selectedProduct) {
        setSelectedProduct(null)
        return
      }
      // If cart is open, close it
      if (isCartOpen) {
        setIsCartOpen(false)
        return
      }
      // If mobile menu is open, close it
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        return
      }
    }

    // Add history entry when modal/cart opens
    if (selectedProduct || isCartOpen || isMobileMenuOpen) {
      window.history.pushState({ modal: true }, '', window.location.href)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [selectedProduct, isCartOpen, isMobileMenuOpen])

  // Always default to all products
  useEffect(() => {
    setSelectedCategory('')
  }, [])

  useEffect(() => {
    const savedCurrency = localStorage.getItem('shop-currency') as CurrencyCode | null
    if (savedCurrency) {
      setCurrency(savedCurrency)
    }
    const savedShipCountry = localStorage.getItem('shop-ship-country')
    if (savedShipCountry) {
      setShipCountry(savedShipCountry)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('shop-currency', currency)
  }, [currency])

  useEffect(() => {
    localStorage.setItem('shop-ship-country', shipCountry)
  }, [shipCountry])

  useEffect(() => {
    const fetchShipping = async () => {
      if (items.length === 0) {
        setShippingUsd(0)
        return
      }

      try {
        setShippingLoading(true)
        const response = await fetch('/api/shipping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countryCode: shipCountry,
            items: items.map((item) => ({ sku: item.product.sku, quantity: item.quantity }))
          })
        })

        const data = await response.json()
        const quote = typeof data?.shippingUsd === 'number' ? data.shippingUsd : null
        setShippingUsd(quote)
      } catch (error) {
        console.error('Shipping quote failed:', error)
        setShippingUsd(null)
      } finally {
        setShippingLoading(false)
      }
    }

    fetchShipping()
  }, [items, shipCountry])

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/fx?base=USD')
        if (!response.ok) throw new Error('Failed to fetch FX rates')
        const data = await response.json()
        if (data?.rates) {
          setRates({
            USD: data.rates.USD ?? DEFAULT_RATES.USD,
            ZAR: data.rates.ZAR ?? DEFAULT_RATES.ZAR,
            GBP: data.rates.GBP ?? DEFAULT_RATES.GBP
          })
        }
      } catch (error) {
        console.error('FX rate fetch failed:', error)
      }
    }

    fetchRates()
  }, [])

  const fetchProducts = async (query?: string) => {
    try {
      setLoading(true)
      setError(null)
      const params = query ? `?q=${encodeURIComponent(query)}` : ''
      const response = await fetch(`/api/products${params}`)
      if (!response.ok) {
        console.error('Products API error:', response.status)
        setProducts([])
        setFilteredProducts([])
        setIsDemo(false)
        return
      }

      const data = await response.json()

      const results = data.results || []
      setProducts(results)
      setFilteredProducts(results)
      setIsDemo(data.isDemo || false)
      if (data?.error) {
        setError(data.error)
      }
    } catch (err) {
      setError('Products are syncing. Please check back shortly.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products from our API route
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      fetchProducts()
      return
    }

    if (searchQuery.trim().length < 2) {
      return
    }

    const handle = window.setTimeout(() => {
      fetchProducts(searchQuery.trim())
    }, 400)

    return () => window.clearTimeout(handle)
  }, [searchQuery])

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>()
    products.forEach((product) => {
      product.categories.forEach((category) => {
        counts.set(category, (counts.get(category) || 0) + 1)
      })
    })

    const categories = Array.from(counts.entries())
      .filter(([category]) => Boolean(category))
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => ({
        value: category,
        label: category.replace(/[-_]/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())
      }))

    return categories
  }, [products])

  const mainCategoryOptions = useMemo(() => {
    return [{ value: '', label: 'All Products' }, ...categoryOptions.slice(0, 6)]
  }, [categoryOptions])

  const extraCategoryOptions = useMemo(() => {
    return categoryOptions.slice(6)
  }, [categoryOptions])

  const cheapestProducts = useMemo(() => {
    const priced = products
      .filter((product) => product.available_inventory > 0)
      .slice()
      .sort((a, b) => getRetailPrice(a) - getRetailPrice(b))
    return priced.slice(0, 5)
  }, [products])

  const carouselItems = useMemo(() => {
    if (cheapestProducts.length > 0) {
      return cheapestProducts.map((product, index) => ({
        image: product.image || fallbackProductImages[index % fallbackProductImages.length],
        alt: product.name,
        title: product.name,
        subtitle: `From ${formatCurrency(getRetailPrice(product))}`
      }))
    }

    return shopCarouselSlides.map((slide) => ({
      image: slide.src,
      alt: slide.alt,
      title: slide.title,
      subtitle: slide.subtitle
    }))
  }, [cheapestProducts, currency, rates])

  // Filter products
  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.categories.some(c => c.toLowerCase().includes(query))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => 
        p.categories.includes(selectedCategory)
      )
    }

    const minValue = minPrice ? Number(minPrice) : null
    const maxValue = maxPrice ? Number(maxPrice) : null

    if (minValue !== null && !Number.isNaN(minValue)) {
      filtered = filtered.filter((p) => getRetailPrice(p) >= minValue)
    }

    if (maxValue !== null && !Number.isNaN(maxValue)) {
      filtered = filtered.filter((p) => getRetailPrice(p) <= maxValue)
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice])

  useEffect(() => {
    const interval = setInterval(() => {
      const length = Math.max(carouselItems.length, 1)
      setActiveSlide((prev) => (prev + 1) % length)
    }, 5000)

    return () => clearInterval(interval)
  }, [carouselItems.length])

  useEffect(() => {
    if (activeSlide >= carouselItems.length && carouselItems.length > 0) {
      setActiveSlide(0)
    }
  }, [activeSlide, carouselItems.length])

  const handleAddToCart = (product: BlankaProduct) => {
    addToCart(product)
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(null), 2000)
    setSelectedProduct(null)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Shop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-white">Amy's</span>
              <span className="text-xl md:text-2xl font-bold text-[#D4AF37]">Beauty Shop</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
                About Amy
              </Link>
              <Link href="/#portfolio" className="text-sm text-white/70 hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/#contact" className="text-sm text-white/70 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>

            {/* Mobile & Cart Buttons */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 mr-2">
                {(['USD', 'ZAR', 'GBP'] as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setCurrency(code)}
                    className={`px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase border transition-colors ${
                      currency === code
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-black/60 text-white/70 border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[70] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-[73px] right-0 bottom-0 w-full max-w-xs z-[80] bg-[#0a0a0a] border-l border-white/10 md:hidden"
            >
              <nav className="flex flex-col p-6 gap-4">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white/80 hover:text-white transition-colors py-2"
                >
                  Shop Home
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white/70 hover:text-white transition-colors py-2"
                >
                  My Account
                </Link>
                <Link
                  href="/shop#filters"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white/70 hover:text-white transition-colors py-2"
                >
                  Filters
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsCartOpen(true)
                  }}
                  className="text-left text-lg text-white/70 hover:text-white transition-colors py-2"
                >
                  View Cart
                </button>
                <Link
                  href="/checkout"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white/70 hover:text-white transition-colors py-2"
                >
                  Checkout
                </Link>
              </nav>
              <div className="px-6 pb-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Currency</p>
                <div className="flex items-center gap-2">
                  {(['USD', 'ZAR', 'GBP'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => setCurrency(code)}
                      className={`px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase border transition-colors ${
                        currency === code
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                          : 'bg-black/60 text-white/70 border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] bg-[#D4AF37] text-black px-6 py-3 rounded-full font-medium shadow-lg"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        currency={currency}
        rates={rates}
        shipCountry={shipCountry}
        onShipCountryChange={setShipCountry}
        shippingUsd={shippingUsd}
        shippingLoading={shippingLoading}
      />

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
        currency={currency}
        rates={rates}
      />

      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30 mt-[72px]">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center">
            <p className="text-amber-200 text-sm">
              🎨 <span className="font-semibold">Demo Mode</span>
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      <section className={`px-4 pt-10 pb-6 ${isDemo ? '' : 'mt-[72px]'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-black/60 border border-[#D4AF37]/30 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/70 transition-colors"
            />
            <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Classy Carousel */}
      <section className="w-full max-w-[380px] mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-black/60 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselItems[activeSlide]?.image || shopCarouselSlides[0].src}
                    alt={carouselItems[activeSlide]?.alt || shopCarouselSlides[0].alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute left-0 bottom-0 p-6 sm:p-8 text-left max-w-xl">
              <p className="text-[#D4AF37]/80 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
                Signature Looks
              </p>
              <h3 className="text-white text-2xl sm:text-3xl font-semibold mt-2">
                {carouselItems[activeSlide]?.title || shopCarouselSlides[0].title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base mt-2">
                {carouselItems[activeSlide]?.subtitle || shopCarouselSlides[0].subtitle}
              </p>
            </div>

            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full border transition-all ${
                    index === activeSlide
                      ? 'bg-[#D4AF37] border-[#D4AF37]'
                      : 'bg-white/20 border-white/30 hover:border-[#D4AF37]/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>


      {/* Filters */}
      <section id="filters" className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Price</span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-20 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <span className="text-white/30">—</span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-20 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>
              {[
                { label: 'Under $10', min: '', max: '10' },
                { label: '$10-$25', min: '10', max: '25' },
                { label: '$25-$50', min: '25', max: '50' },
                { label: '$50+', min: '50', max: '' }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setMinPrice(preset.min)
                    setMaxPrice(preset.max)
                  }}
                  className="px-3 py-2 rounded-full text-xs font-semibold bg-black/60 text-white/70 border border-white/10 hover:border-[#D4AF37]/40 hover:text-white transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {(searchQuery || selectedCategory || minPrice || maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
              <span className="text-white/60 text-sm">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pr-10 whitespace-nowrap">
              {mainCategoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                    selectedCategory === cat.value
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-black/60 text-white/70 border border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              {extraCategoryOptions.length > 0 && (
                <select
                  value={extraCategoryOptions.some((cat) => cat.value === selectedCategory) ? selectedCategory : ''}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-black/60 text-white/70 border border-white/10 hover:border-[#D4AF37]/40 shrink-0"
                >
                  <option value="">More Categories</option>
                  {extraCategoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-black">
                      {cat.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#050505] to-transparent" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/5 rounded-2xl mb-4" />
                <div className="h-4 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#F4D03F] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-white/60 mb-4">No products found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="text-[#D4AF37] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onViewDetails={() => setSelectedProduct(product)}
                  currency={currency}
                  rates={rates}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Floating Cart Button (Mobile) */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 md:hidden w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center z-40"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-black text-[#D4AF37] text-sm font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </motion.button>
      )}
    </div>
  )
}

// Export with CartProvider
export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
      <PromoWheel />
    </CartProvider>
  )
}
