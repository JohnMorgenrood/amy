'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Search,
  ArrowRight,
  Sparkles,
  Package,
  Truck,
  Shield,
  ExternalLink,
  Loader2,
  Filter,
  X,
  ChevronDown
} from 'lucide-react'

// API Product type
interface Product {
  id: number
  brand: string | null
  name: string
  price: string | null
  price_sign: string | null
  currency: string | null
  image_link: string
  product_link: string
  website_link: string
  description: string | null
  rating: number | null
  category: string | null
  product_type: string
  tag_list: string[]
  product_colors: { hex_value: string; colour_name: string }[]
}

// Product types from the API
const productTypes = [
  { value: '', label: 'All Products' },
  { value: 'lipstick', label: 'Lipstick' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'eyeshadow', label: 'Eyeshadow' },
  { value: 'mascara', label: 'Mascara' },
  { value: 'eyeliner', label: 'Eyeliner' },
  { value: 'blush', label: 'Blush' },
  { value: 'bronzer', label: 'Bronzer' },
  { value: 'nail_polish', label: 'Nail Polish' },
  { value: 'lip_liner', label: 'Lip Liner' },
  { value: 'eyebrow', label: 'Eyebrow' },
]

// Popular brands
const brands = [
  { value: '', label: 'All Brands' },
  { value: 'maybelline', label: 'Maybelline' },
  { value: 'nyx', label: 'NYX' },
  { value: 'e.l.f.', label: 'E.L.F.' },
  { value: 'revlon', label: 'Revlon' },
  { value: "l'oreal", label: "L'Oreal" },
  { value: 'covergirl', label: 'CoverGirl' },
  { value: 'milani', label: 'Milani' },
  { value: 'clinique', label: 'Clinique' },
  { value: 'fenty', label: 'Fenty' },
  { value: 'glossier', label: 'Glossier' },
]

// Tags for filtering
const tags = [
  { value: '', label: 'All' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'cruelty free', label: 'Cruelty Free' },
  { value: 'Natural', label: 'Natural' },
  { value: 'Organic', label: 'Organic' },
  { value: 'Gluten Free', label: 'Gluten Free' },
]

const features = [
  { icon: Package, title: 'Pro-Grade Products', description: 'Curated professional makeup' },
  { icon: Truck, title: 'Direct Links', description: 'Shop from official stores' },
  { icon: Shield, title: 'Quality Brands', description: 'Trusted beauty brands' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [productType, setProductType] = useState('')
  const [brand, setBrand] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  // Fetch products from the Makeup API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let url = 'https://makeup-api.herokuapp.com/api/v1/products.json?'
        const params = new URLSearchParams()
        
        if (productType) params.append('product_type', productType)
        if (brand) params.append('brand', brand)
        if (selectedTag) params.append('product_tags', selectedTag)
        
        const response = await fetch(url + params.toString())
        
        if (!response.ok) throw new Error('Failed to fetch products')
        
        const data: Product[] = await response.json()
        
        // Filter out products without images and limit results
        const validProducts = data
          .filter(p => p.image_link && p.name)
          .slice(0, 50) // Limit to 50 products for performance
        
        setProducts(validProducts)
      } catch (err) {
        setError('Unable to load products. Please try again.')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [productType, brand, selectedTag])

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: string | null, sign: string | null) => {
    if (!price) return 'Price N/A'
    const priceNum = parseFloat(price)
    // Convert to ZAR (approximate conversion)
    const zarPrice = priceNum * 18
    return `R${zarPrice.toFixed(0)}`
  }

  const handleImageError = (productId: number) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const getProductImage = (product: Product) => {
    if (imageErrors.has(product.id)) {
      // Return a fallback placeholder
      return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
    }
    // Fix common URL issues with the API images
    let imageUrl = product.image_link
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = 'https:' + imageUrl
    }
    return imageUrl || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  }

  return (
    <div className="min-h-screen pt-24 pb-32 bg-dark-950">
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-gold-500/30 text-gold-500/80 text-xs tracking-[0.2em] uppercase mb-8">
              <Sparkles className="w-3 h-3" />
              Amy's Picks
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-6">
              Professional Beauty Shop
            </h1>
            <p className="font-display text-cream-300/80 text-lg sm:text-xl max-w-2xl mx-auto font-light italic">
              Discover professional-grade makeup products curated for beauty enthusiasts. 
              Shop from trusted brands used by industry professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-gold-500/10 bg-dark-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="p-3 border border-gold-500/20 rounded-lg">
                  <feature.icon className="w-5 h-5 text-gold-500/80" />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-cream-100">{feature.title}</h3>
                  <p className="font-display text-sm text-cream-300/70 font-light italic mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-6 mb-10">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500/40" />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-900/50 border border-gold-500/10 rounded-lg text-cream-100 placeholder-cream-500/30 focus:outline-none focus:border-gold-500/30 transition-all font-light"
              />
            </div>

            {/* Filter Toggle Button */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                showFilters 
                  ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' 
                  : 'bg-dark-900/50 text-cream-300 border-gold-500/10 hover:border-gold-500/30'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-dark-900/30 border border-gold-500/10 rounded-xl space-y-6">
                  {/* Product Type */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-cream-400 mb-3">Product Type</label>
                    <div className="flex flex-wrap gap-2">
                      {productTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setProductType(type.value)}
                          className={`px-4 py-2 text-xs rounded-full transition-all ${
                            productType === type.value
                              ? 'bg-gold-500 text-dark-900'
                              : 'bg-dark-800 text-cream-300 hover:bg-dark-700'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-cream-400 mb-3">Brand</label>
                    <div className="flex flex-wrap gap-2">
                      {brands.map((b) => (
                        <button
                          key={b.value}
                          onClick={() => setBrand(b.value)}
                          className={`px-4 py-2 text-xs rounded-full transition-all ${
                            brand === b.value
                              ? 'bg-gold-500 text-dark-900'
                              : 'bg-dark-800 text-cream-300 hover:bg-dark-700'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-cream-400 mb-3">Features</label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag.value}
                          onClick={() => setSelectedTag(tag.value)}
                          className={`px-4 py-2 text-xs rounded-full transition-all ${
                            selectedTag === tag.value
                              ? 'bg-gold-500 text-dark-900'
                              : 'bg-dark-800 text-cream-300 hover:bg-dark-700'
                          }`}
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(productType || brand || selectedTag) && (
                    <button
                      onClick={() => {
                        setProductType('')
                        setBrand('')
                        setSelectedTag('')
                      }}
                      className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Display */}
          {(productType || brand || selectedTag) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-cream-500">Active filters:</span>
              {productType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-400 text-xs rounded-full">
                  {productTypes.find(t => t.value === productType)?.label}
                  <button onClick={() => setProductType('')} className="hover:text-gold-200">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {brand && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-400 text-xs rounded-full">
                  {brands.find(b => b.value === brand)?.label}
                  <button onClick={() => setBrand('')} className="hover:text-gold-200">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-400 text-xs rounded-full">
                  {tags.find(t => t.value === selectedTag)?.label}
                  <button onClick={() => setSelectedTag('')} className="hover:text-gold-200">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <p className="text-sm text-cream-500 mb-8">
            Showing {filteredProducts.length} products
          </p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin mb-4" />
            <p className="text-cream-400 font-light">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 text-cream-500/30 mx-auto mb-6" />
            <h3 className="font-display text-xl font-light text-cream-100 mb-3">
              {error}
            </h3>
            <button
              onClick={() => window.location.reload()}
              className="text-gold-400 hover:text-gold-300 text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-dark-900/50 border border-gold-500/10 rounded-xl hover:border-gold-500/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-square bg-white/5">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      onError={() => handleImageError(product.id)}
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Tags */}
                    {product.tag_list.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {product.tag_list.slice(0, 2).map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gold-500/90 text-dark-950 text-[9px] tracking-wider uppercase rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <motion.button
                      onClick={() => toggleWishlist(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                        wishlist.includes(product.id)
                          ? 'bg-gold-500 text-dark-950'
                          : 'bg-dark-950/60 backdrop-blur-sm text-cream-100 hover:bg-dark-800'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`}
                      />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Brand */}
                    {product.brand && (
                      <p className="text-[10px] tracking-[0.15em] uppercase text-gold-500/70 mb-1">
                        {product.brand}
                      </p>
                    )}
                    
                    {/* Name */}
                    <h3 className="font-display text-sm font-light text-cream-100 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-gold-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                        <span className="text-xs text-cream-300">{product.rating.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Colors */}
                    {product.product_colors.length > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        {product.product_colors.slice(0, 6).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color.hex_value || '#888' }}
                            title={color.colour_name}
                          />
                        ))}
                        {product.product_colors.length > 6 && (
                          <span className="text-[10px] text-cream-500">+{product.product_colors.length - 6}</span>
                        )}
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gold-500/10">
                      <span className="font-display text-lg font-light text-cream-100">
                        {formatPrice(product.price, product.price_sign)}
                      </span>
                      
                      <motion.a
                        href={product.product_link || product.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500 text-dark-900 text-xs font-medium rounded-full hover:bg-gold-400 transition-colors"
                      >
                        Shop
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 text-cream-500/30 mx-auto mb-6" />
            <h3 className="font-display text-xl font-light text-cream-100 mb-3">
              No products found
            </h3>
            <p className="font-display text-cream-500/50 italic mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setProductType('')
                setBrand('')
                setSelectedTag('')
              }}
              className="text-gold-400 hover:text-gold-300 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 sm:p-12 bg-gradient-to-br from-dark-900/80 to-dark-800/50 border border-gold-500/20 rounded-2xl text-center"
        >
          <Sparkles className="w-6 h-6 text-gold-500/60 mx-auto mb-6" />
          <h3 className="font-display text-2xl sm:text-3xl font-light text-cream-100 mb-4">
            Get Pro Makeup Tips
          </h3>
          <p className="font-display text-cream-300/70 max-w-xl mx-auto mb-8 italic">
            Subscribe to receive exclusive makeup tutorials, product recommendations, 
            and industry tips from a professional makeup artist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 bg-dark-950/50 border border-gold-500/10 rounded-lg text-cream-100 placeholder-cream-500/30 focus:outline-none focus:border-gold-500/30 transition-all font-light"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3 bg-gold-500 text-dark-900 font-medium text-sm rounded-lg whitespace-nowrap hover:bg-gold-400 transition-colors duration-300"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
