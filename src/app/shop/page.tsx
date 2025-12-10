'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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

// Calculate markup - we sell at suggested retail price, profit is suggested - cost
function getRetailPrice(product: BlankaProduct): number {
  return parseFloat(product.suggested_cost) || 0
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
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
                      className="flex gap-4 bg-white/5 rounded-xl p-4"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
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
                          ${getRetailPrice(item.product).toFixed(2)}
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
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
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

  const retailPrice = getRetailPrice(product)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-[#1a1a1a] rounded-2xl z-50 overflow-hidden flex flex-col"
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
                  <span className="text-3xl font-bold text-[#D4AF37]">${retailPrice.toFixed(2)}</span>
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
                  Add to Cart - ${retailPrice.toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
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

  const retailPrice = getRetailPrice(product)

  const fallbackImage = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col"
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

        {/* Stock Badge */}
        {product.available_inventory <= 0 && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
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
      <div className="p-3 md:p-4 flex flex-col flex-1">
        {/* Category */}
        <div className="mb-1 md:mb-2">
          <span className="text-[#D4AF37] text-[10px] md:text-xs font-medium uppercase tracking-wider line-clamp-1">
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
          <span className="text-lg md:text-xl font-bold text-white">${retailPrice.toFixed(2)}</span>
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
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<BlankaProduct | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { addToCart, totalItems } = useCart()

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
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-[#D4AF37] text-black px-6 py-3 rounded-full font-medium shadow-lg"
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

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <span className="text-lg md:text-2xl font-bold text-white">Amy&apos;s</span>
              <span className="text-lg md:text-2xl font-bold text-[#D4AF37]">Beauty</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Home
              </Link>
              <Link href="/#services" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Services
              </Link>
              <Link href="/#portfolio" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Portfolio
              </Link>
              <Link href="/shop" className="text-[#D4AF37] text-sm font-medium">
                Shop
              </Link>
              <Link href="/#contact" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Contact
              </Link>
            </nav>

            {/* Right Side - Cart & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-1 pt-4 pb-2">
                  <Link href="/" className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Home
                  </Link>
                  <Link href="/#services" className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Services
                  </Link>
                  <Link href="/#portfolio" className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/shop" className="px-4 py-3 text-[#D4AF37] bg-[#D4AF37]/10 rounded-lg">
                    Shop
                  </Link>
                  <Link href="/#contact" className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Contact
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center">
            <p className="text-amber-200 text-sm">
              🎨 <span className="font-semibold">Demo Mode</span> - Showing sample products. Connect Blanka API for live inventory.
            </p>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative py-16 md:py-20 px-4 overflow-hidden">
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
    </CartProvider>
  )
}
