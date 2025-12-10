'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Filter, 
  Search,
  ArrowRight,
  Sparkles,
  Package,
  Truck,
  Shield,
  ChevronDown
} from 'lucide-react'

const categories = [
  'All Products',
  'Makeup Kits',
  'Brushes & Tools',
  'Skincare',
  'SFX Products',
  'Gift Sets',
]

const products = [
  {
    id: 1,
    name: 'Professional Brush Set',
    category: 'Brushes & Tools',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 47,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 2,
    name: 'Airbrush Starter Kit',
    category: 'Makeup Kits',
    price: 2999,
    originalPrice: null,
    rating: 5.0,
    reviews: 23,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    badge: 'New',
    inStock: true,
  },
  {
    id: 3,
    name: 'SFX Prosthetic Kit',
    category: 'SFX Products',
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    badge: 'Pro Choice',
    inStock: true,
  },
  {
    id: 4,
    name: 'Hydrating Primer Set',
    category: 'Skincare',
    price: 599,
    originalPrice: 799,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    badge: null,
    inStock: true,
  },
  {
    id: 5,
    name: 'Bridal Glam Kit',
    category: 'Gift Sets',
    price: 2499,
    originalPrice: null,
    rating: 5.0,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=400&fit=crop',
    badge: 'Limited Edition',
    inStock: true,
  },
  {
    id: 6,
    name: 'Contour & Highlight Palette',
    category: 'Makeup Kits',
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1617220379175-68eb0a5a5c8d?w=400&h=400&fit=crop',
    badge: null,
    inStock: false,
  },
]

const features = [
  { icon: Package, title: 'Pro-Grade Products', description: 'Same products used on film sets' },
  { icon: Truck, title: 'Fast Shipping', description: 'Free delivery over R1000' },
  { icon: Shield, title: 'Quality Guarantee', description: '30-day returns policy' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen pt-24 pb-32 bg-dark-950">
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-gold-500/30 text-gold-500/80 text-xs tracking-[0.2em] uppercase mb-8">
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream-100 mb-8">
              Professional Beauty Shop
            </h1>
            <p className="font-display text-cream-500/60 text-xl max-w-2xl mx-auto mb-10 font-light italic">
              Shop the same professional-grade products I use on film sets and with my clients. 
              Curated collection coming soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-colors duration-300 flex items-center gap-3"
              >
                <span>Notify Me When Available</span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-gold-500/10 bg-dark-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="p-3 border border-gold-500/20">
                  <feature.icon className="w-5 h-5 text-gold-500/80" />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.1em] uppercase text-cream-100">{feature.title}</h3>
                  <p className="font-display text-sm text-cream-500/50 font-light italic mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-900/50 border border-gold-500/10 text-cream-100 placeholder-cream-500/30 focus:outline-none focus:border-gold-500/30 transition-all font-light"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30'
                    : 'bg-transparent text-cream-500/50 hover:text-cream-100 border border-cream-500/10 hover:border-cream-500/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden bg-dark-900/50 border border-gold-500/10 hover:border-gold-500/20 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold-500/90 text-dark-950 text-[10px] tracking-[0.1em] uppercase">
                      {product.badge}
                    </div>
                  )}

                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-dark-950/80 flex items-center justify-center">
                      <span className="px-4 py-2 border border-cream-500/20 text-cream-100 text-xs tracking-[0.1em] uppercase">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <motion.button
                    onClick={() => toggleWishlist(product.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`absolute top-4 right-4 p-2.5 transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? 'bg-gold-500 text-dark-950'
                        : 'bg-dark-950/60 backdrop-blur-sm text-cream-100 border border-cream-500/20 hover:border-gold-500/40'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`}
                    />
                  </motion.button>

                  {/* Quick Add */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <button
                      disabled={!product.inStock}
                      className="w-full py-3 bg-cream-100 text-dark-950 text-xs tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:bg-gold-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gold-500/70 mb-2">{product.category}</p>
                  <h3 className="font-display text-lg font-light text-cream-100 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold-500/60 fill-gold-500/60" />
                      <span className="text-xs text-cream-100">{product.rating}</span>
                    </div>
                    <span className="font-display text-xs text-cream-500/40 italic">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gold-500/10">
                    <span className="font-display text-xl font-light text-cream-100">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="font-display text-sm text-cream-500/40 line-through italic">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 text-cream-500/30 mx-auto mb-6" />
            <h3 className="font-display text-xl font-light text-cream-100 mb-3">
              No products found
            </h3>
            <p className="font-display text-cream-500/50 italic">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-dark-900/50 border border-gold-500/20 text-center"
        >
          <Sparkles className="w-6 h-6 text-gold-500/60 mx-auto mb-6" />
          <h3 className="font-display text-2xl sm:text-3xl font-light text-cream-100 mb-4">
            Be the First to Know
          </h3>
          <p className="font-display text-cream-500/50 max-w-xl mx-auto mb-10 italic">
            Subscribe to get exclusive early access, special discounts, and pro tips 
            when the shop officially launches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 bg-dark-950/50 border border-gold-500/10 text-cream-100 placeholder-cream-500/30 focus:outline-none focus:border-gold-500/30 transition-all font-light"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3 bg-cream-100 text-dark-950 text-xs tracking-[0.15em] uppercase whitespace-nowrap hover:bg-gold-400 transition-colors duration-300"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
