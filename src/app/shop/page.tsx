'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Types
interface Product {
  id: number
  brand: string
  name: string
  price: string
  price_sign: string | null
  currency: string | null
  image_link: string
  product_link: string
  website_link: string
  description: string
  rating: number | null
  category: string | null
  product_type: string
  tag_list: string[]
  created_at: string
  updated_at: string
  product_api_url: string
  api_featured_image: string
  product_colors: Array<{
    hex_value: string
    colour_name: string
  }>
}

interface CartItem {
  product: Product
  quantity: number
}

// Cart Context
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  markup: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const MARKUP_AMOUNT = 3 // $3 USD markup per item

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amy-cart')
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
    localStorage.setItem('amy-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product) => {
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
    const price = parseFloat(item.product.price) || 0
    return sum + price * item.quantity
  }, 0)

  const markup = items.reduce((sum, item) => sum + MARKUP_AMOUNT * item.quantity, 0)
  
  const total = subtotal + markup

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      markup,
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

// Filter Constants
const productTypes = [
  'lipstick', 'foundation', 'mascara', 'eyeshadow', 'eyeliner',
  'blush', 'bronzer', 'nail_polish', 'lip_liner'
]

const brands = [
  'maybelline', 'nyx', "l'oreal", 'revlon', 'covergirl',
  'milani', 'e.l.f.', 'wet n wild', 'physicians formula'
]

// Fallback images for when API images fail
const fallbackImages = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
]

// Cart Sidebar Component
function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, markup, total, totalItems } = useCart()

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
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.api_featured_image?.startsWith('//') 
                            ? `https:${item.product.api_featured_image}` 
                            : item.product.api_featured_image || fallbackImages[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.product.name}</h3>
                        <p className="text-white/60 text-sm capitalize">{item.product.brand}</p>
                        <p className="text-[#D4AF37] font-semibold mt-1">
                          ${((parseFloat(item.product.price) || 0) + MARKUP_AMOUNT).toFixed(2)}
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
                    <span>Service Fee</span>
                    <span>${markup.toFixed(2)}</span>
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

// Product Card Component
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getImageUrl = () => {
    if (imageError) {
      return fallbackImages[product.id % fallbackImages.length]
    }
    // Try api_featured_image first (usually more reliable)
    if (product.api_featured_image) {
      const img = product.api_featured_image
      return img.startsWith('//') ? `https:${img}` : img
    }
    // Fallback to image_link
    if (product.image_link) {
      const img = product.image_link
      return img.startsWith('//') ? `https:${img}` : img
    }
    return fallbackImages[product.id % fallbackImages.length]
  }

  const price = parseFloat(product.price) || 0
  const finalPrice = price + MARKUP_AMOUNT

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
        <Image
          src={getImageUrl()}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
          onError={() => setImageError(true)}
        />
        
        {/* Quick Add Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={onAddToCart}
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rating Badge */}
        {product.rating && product.rating > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-xs font-medium">{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[#D4AF37] text-xs font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="text-white font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Colors */}
        {product.product_colors && product.product_colors.length > 0 && (
          <div className="flex gap-1 mb-3 flex-wrap">
            {product.product_colors.slice(0, 6).map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: color.hex_value }}
                title={color.colour_name}
              />
            ))}
            {product.product_colors.length > 6 && (
              <span className="text-white/40 text-xs">+{product.product_colors.length - 6}</span>
            )}
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">${finalPrice.toFixed(2)}</span>
            {price > 0 && (
              <span className="text-white/40 text-sm line-through ml-2">${price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="p-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37] rounded-full transition-colors group/btn"
          >
            <svg className="w-5 h-5 text-[#D4AF37] group-hover/btn:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Shop Page
function ShopContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  
  const { addToCart, totalItems } = useCart()

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await response.json()
        
        // Filter products that have valid data and price
        const validProducts = data.filter(p => 
          p.name && 
          p.brand && 
          parseFloat(p.price) > 0 &&
          (p.image_link || p.api_featured_image)
        ).slice(0, 100) // Limit to 100 products for performance
        
        setProducts(validProducts)
        setFilteredProducts(validProducts)
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
        p.brand.toLowerCase().includes(query) ||
        p.product_type.toLowerCase().includes(query)
      )
    }

    if (selectedType) {
      filtered = filtered.filter(p => p.product_type === selectedType)
    }

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase())
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedType, selectedBrand])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(null), 2000)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('')
    setSelectedBrand('')
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
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-medium shadow-lg"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Amy&apos;s</span>
            <span className="text-2xl font-bold text-[#D4AF37]">Beauty Shop</span>
          </Link>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Professional <span className="text-[#D4AF37]">Makeup</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 mb-8"
          >
            Curated beauty products recommended by Amy Morgenrood
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search products, brands..."
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

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* Product Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="">All Types</option>
            {productTypes.map(type => (
              <option key={type} value={type} className="bg-[#1a1a1a]">
                {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand} className="bg-[#1a1a1a]">
                {brand.replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {(searchQuery || selectedType || selectedBrand) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}

          {/* Results Count */}
          <span className="ml-auto text-white/60">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
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
