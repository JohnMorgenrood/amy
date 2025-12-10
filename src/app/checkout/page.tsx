'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
  product: {
    id: number
    brand: string
    name: string
    price: string
    api_featured_image: string
  }
  quantity: number
}

const MARKUP_AMOUNT = 3 // $3 USD markup per item

// Fallback images
const fallbackImages = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
]

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'South Africa',
    postalCode: '',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('amy-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart', e)
      }
    }
    setLoading(false)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.product.price) || 0
    return sum + price * item.quantity
  }, 0)

  const markup = cartItems.reduce((sum, item) => sum + MARKUP_AMOUNT * item.quantity, 0)
  const total = subtotal + markup

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePayPalCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // TODO: Integrate with PayPal API
    // For now, show a message that PayPal is being set up
    alert('PayPal checkout is being configured. Please contact Amy directly to complete your order.\n\nTotal: $' + total.toFixed(2))
    
    setIsProcessing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full" />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center px-4">
        <svg className="w-20 h-20 text-white/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-white/60 mb-6">Add some products before checking out</p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/shop" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
              
              <form onSubmit={handlePayPalCheckout} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Street address"
                  />
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="South Africa" className="bg-[#1a1a1a]">South Africa</option>
                    <option value="United States" className="bg-[#1a1a1a]">United States</option>
                    <option value="United Kingdom" className="bg-[#1a1a1a]">United Kingdom</option>
                    <option value="Australia" className="bg-[#1a1a1a]">Australia</option>
                    <option value="Canada" className="bg-[#1a1a1a]">Canada</option>
                    <option value="Germany" className="bg-[#1a1a1a]">Germany</option>
                    <option value="France" className="bg-[#1a1a1a]">France</option>
                    <option value="Other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>

                {/* PayPal Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#0070ba] hover:bg-[#003087] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h7.633c2.548 0 4.334.526 5.306 1.562.938 1.002 1.203 2.312.794 3.946-.015.058-.029.115-.046.173-.457 1.94-1.323 3.381-2.574 4.295-1.28.935-2.922 1.409-4.88 1.409H9.42a.768.768 0 0 0-.757.64l-.907 5.52a.639.639 0 0 1-.63.537l-.05-.825z"/>
                        </svg>
                        Pay with PayPal
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-white/40 text-sm mt-4">
                    Secure payment powered by PayPal
                  </p>
                </div>
              </form>
            </div>

            {/* Contact Alternative */}
            <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <p className="text-white/60 mb-2">Prefer to pay another way?</p>
              <p className="text-white">
                Contact Amy directly at{' '}
                <a href="mailto:amy@amymorgenrood.com" className="text-[#D4AF37] hover:underline">
                  amy@amymorgenrood.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
                      <h3 className="text-white font-medium truncate text-sm">{item.product.name}</h3>
                      <p className="text-white/60 text-xs capitalize">{item.product.brand}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-white/60 text-sm">Qty: {item.quantity}</span>
                        <span className="text-[#D4AF37] font-semibold">
                          ${((parseFloat(item.product.price) || 0 + MARKUP_AMOUNT) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Service Fee</span>
                  <span>${markup.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-[#D4AF37]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-white/40">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm">Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
