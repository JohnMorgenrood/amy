'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
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

// Check if today is Friday (day 5)
function isFriday(): boolean {
  return new Date().getDay() === 5
}

// Calculate price - Normal: +30% markup, Fridays: 10% off (back to base price)
// Base price (suggested_cost) is already 10% off retail
// Normal days: Show base price + 30% = suggested_cost * 1.30
// Fridays: Show base price (10% off the inflated price) = suggested_cost
function getRetailPrice(product: BlankaProduct): number {
  const basePrice = parseFloat(product.suggested_cost) || 0
  if (isFriday()) {
    return basePrice // Friday sale price (10% off)
  }
  return basePrice * 1.30 // Normal price (+30%)
}

// Get the "was" price for showing original price on Fridays
function getOriginalPrice(product: BlankaProduct): number {
  const basePrice = parseFloat(product.suggested_cost) || 0
  return basePrice * 1.30 // The inflated normal price
}

// Daily Brand Deals Configuration
const brandDeals = [
  { day: 0, brand: 'Skincare Sunday', color: 'from-purple-500 to-pink-500', emoji: '✨', description: 'All skincare products' },
  { day: 1, brand: 'Makeup Monday', color: 'from-rose-500 to-red-500', emoji: '💄', description: 'Foundation & Face products' },
  { day: 2, brand: 'Tools Tuesday', color: 'from-blue-500 to-cyan-500', emoji: '🖌️', description: 'Brushes & Tools' },
  { day: 3, brand: 'Wellness Wednesday', color: 'from-green-500 to-emerald-500', emoji: '🌿', description: 'Natural & Organic products' },
  { day: 4, brand: 'Lash Thursday', color: 'from-violet-500 to-purple-500', emoji: '👁️', description: 'Eyes & Lashes' },
  { day: 5, brand: 'MAC Friday', color: 'from-[#D4AF37] to-[#F4D03F]', emoji: '💋', description: '10% OFF All MAC Products!' },
  { day: 6, brand: 'Lips Saturday', color: 'from-pink-500 to-rose-500', emoji: '💕', description: 'Lipsticks & Lip products' },
]

function DailyBrandDealsBanner() {
  const today = new Date().getDay()
  const todaysDeal = brandDeals.find(deal => deal.day === today) || brandDeals[5] // Default to MAC Friday
  const isFriday = today === 5

  return (
    <div className={`bg-gradient-to-r ${todaysDeal.color} mt-[72px]`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{todaysDeal.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl">
                {todaysDeal.brand}
                {isFriday && <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">10% OFF</span>}
              </h3>
              <p className="text-white/90 text-sm">{todaysDeal.description}</p>
            </div>
          </div>
          
          {/* Weekly Schedule */}
          <div className="flex items-center gap-1 text-xs">
            {brandDeals.map((deal, index) => (
              <div
                key={deal.day}
                className={`px-2 py-1 rounded ${
                  deal.day === today 
                    ? 'bg-white text-black font-bold' 
                    : 'bg-white/20 text-white/80'
                }`}
                title={deal.brand}
              >
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
              </div>
            ))}
          </div>
        </div>
        
        {/* Shipping Info */}
        <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            R100 Local Shipping (Courier)
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Authentic MAC Products
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            2-5 Business Days
          </span>
        </div>
      </div>
    </div>
  )
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

// Categories for filtering
const categories = [
  { value: '', label: 'All Products' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'face', label: 'Face' },
  { value: 'lips', label: 'Lips' },
  { value: 'eyes', label: 'Eyes' },
  { value: 'tools', label: 'Tools & Accessories' },
  { value: 'organic', label: 'Organic' },
]

// Cart Sidebar Component
function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, total, totalItems } = useCart()

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
                          R{getRetailPrice(item.product).toFixed(2)}
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
                    <span>R100 Local Delivery • 1-3 Business Days</span>
                  </div>
                  <p className="text-white/50 text-xs mt-1 ml-6">Delivery time depends on area and product availability</p>
                </div>
                
                <div className="bg-zinc-900 rounded-xl p-4 shadow-lg shadow-black/50 border border-white/5 space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping (Courier)</span>
                    <span>R100.00</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-bold pt-3 mt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">R{total.toFixed(2)}</span>
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
function ProductModal({ product, isOpen, onClose, onAddToCart }: { 
  product: BlankaProduct | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
}) {
  if (!product) return null

  const fridayDeal = isFriday()
  const retailPrice = getRetailPrice(product)
  const originalPrice = getOriginalPrice(product)

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
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
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
              <div className="relative w-full md:w-1/2 aspect-square flex-shrink-0 bg-gradient-to-br from-white/5 to-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium rounded-full capitalize">
                      {cat.replace('-', ' ')}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h2>
                
                <div className="flex items-center gap-3 mb-6">
                  {fridayDeal && (
                    <span className="text-xl text-white/50 line-through">R{originalPrice.toFixed(2)}</span>
                  )}
                  <span className={`text-3xl font-bold ${fridayDeal ? 'text-green-400' : 'text-[#D4AF37]'}`}>R{retailPrice.toFixed(2)}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${fridayDeal ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black'}`}>
                    {fridayDeal ? '🔥 FRIDAY DEAL!' : '💋 10% OFF Fridays'}
                  </span>
                  {product.available_inventory > 0 && (
                    <span className="text-green-400 text-sm">In Stock</span>
                  )}
                </div>

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

                <button
                  onClick={onAddToCart}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                >
                  Add to Cart - R{retailPrice.toFixed(2)}
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
function ProductCard({ product, onAddToCart, onViewDetails }: { 
  product: BlankaProduct
  onAddToCart: () => void
  onViewDetails: () => void
}) {
  const [imageError, setImageError] = useState(false)
  const fridayDeal = isFriday()

  const retailPrice = getRetailPrice(product)
  const originalPrice = getOriginalPrice(product)

  const fallbackImage = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-white/5 via-pink-500/5 to-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-pink-500/20 hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-white/10 cursor-pointer"
        onClick={onViewDetails}
      >
        <Image
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          unoptimized
          onError={() => setImageError(true)}
        />
        
        {/* Quick View Button - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity">
          <button
            onClick={onViewDetails}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full hover:bg-white/30 transition-colors"
          >
            Quick View
          </button>
        </div>

        {/* Price Badge - Dynamic based on day */}
        <div className={`absolute top-2 right-2 md:top-3 md:right-3 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg ${fridayDeal ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]'}`}>
          <span className="text-white text-[10px] md:text-xs font-bold">{fridayDeal ? '🔥 10% OFF!' : '💋 Fri Deal'}</span>
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
            className="absolute top-2 left-2 md:top-3 md:left-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: product.color_code }}
            title={product.color_name}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-1 border-t border-pink-500/10">
        {/* Category */}
        <div className="mb-1 md:mb-2">
          <span className="text-pink-400 text-[10px] md:text-xs font-medium uppercase tracking-wider line-clamp-1">
            {product.categories[0]?.replace('-', ' ') || 'Beauty'}
          </span>
        </div>
        
        {/* Product Name */}
        <h3 
          className="text-white text-sm md:text-base font-medium line-clamp-2 mb-2 md:mb-3 flex-1 cursor-pointer hover:text-pink-400 transition-colors"
          onClick={onViewDetails}
        >
          {product.name}
        </h3>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            {fridayDeal && (
              <span className="text-xs text-white/50 line-through">R{originalPrice.toFixed(2)}</span>
            )}
            <span className={`text-lg md:text-xl font-bold ${fridayDeal ? 'text-green-400' : 'text-white'}`}>R{retailPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37] hover:bg-[#F4D03F] text-black text-xs md:text-sm font-bold rounded-full transition-colors"
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
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<BlankaProduct | null>(null)
  
  const { addToCart, totalItems } = useCart()

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

  // Check for category in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [])

  // Fetch products from our API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        
        setProducts(data.results || [])
        setFilteredProducts(data.results || [])
        setIsDemo(data.isDemo || false)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory])

  const handleAddToCart = (product: BlankaProduct) => {
    addToCart(product)
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(null), 2000)
    setSelectedProduct(null)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
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
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] right-0 bottom-0 w-full max-w-xs z-50 bg-[#0a0a0a] border-l border-white/10 md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-white/70 hover:text-white transition-colors py-2"
              >
                About Amy
              </Link>
              <Link 
                href="/#portfolio" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-white/70 hover:text-white transition-colors py-2"
              >
                Portfolio
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-white/70 hover:text-white transition-colors py-2"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
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
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
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

      {/* Daily Brand Deals Banner */}
      <DailyBrandDealsBanner />

      {/* Hero Banner */}
      <section className={`relative py-16 md:py-20 px-4 overflow-hidden ${isDemo ? '' : 'mt-[72px]'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/70 text-sm">Clean Beauty • Cruelty-Free • White Label</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Premium <span className="text-[#D4AF37]">Beauty</span> Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-8"
          >
            Curated skincare & makeup by Amy Morgenrood
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* YouTube Reviews Banner */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-500/10 via-[#D4AF37]/10 to-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Watch Product Reviews
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  See Amy test and review beauty brands on YouTube
                </p>
              </div>
            </div>
            <a
              href="https://www.youtube.com/@amybinspirations7694"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Visit Channel
            </a>
          </div>
        </motion.div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-[#D4AF37] text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}

          {/* Results Count */}
          <span className="ml-auto text-white/60 text-sm">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/10 rounded-2xl mb-4" />
                <div className="h-4 bg-white/10 rounded mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
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
