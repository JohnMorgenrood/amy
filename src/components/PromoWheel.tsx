'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Prize {
  id: number
  label: string
  color: string
  textColor: string
  value: string
  description: string
}

const prizes: Prize[] = [
  { id: 1, label: '10% OFF', color: '#D4AF37', textColor: '#000', value: 'SAVE10', description: '10% off your order' },
  { id: 2, label: 'FREE SHIP', color: '#1a1a1a', textColor: '#D4AF37', value: 'FREESHIP', description: 'Free shipping on any order' },
  { id: 3, label: '15% OFF', color: '#F4D03F', textColor: '#000', value: 'SAVE15', description: '15% off your order' },
  { id: 4, label: 'TRY AGAIN', color: '#2a2a2a', textColor: '#fff', value: '', description: 'Better luck next time!' },
  { id: 5, label: '20% OFF', color: '#D4AF37', textColor: '#000', value: 'SAVE20', description: '20% off your order' },
  { id: 6, label: '$5 OFF', color: '#1a1a1a', textColor: '#D4AF37', value: 'FIVE', description: '$5 off orders over $25' },
  { id: 7, label: 'FREE GIFT', color: '#F4D03F', textColor: '#000', value: 'FREEGIFT', description: 'Free beauty sample with order' },
  { id: 8, label: 'TRY AGAIN', color: '#2a2a2a', textColor: '#fff', value: '', description: 'Better luck next time!' },
]

// Weighted probabilities (index corresponds to prize)
const probabilities = [25, 15, 15, 15, 5, 10, 5, 10] // Must sum to 100

function getWeightedPrize(): number {
  const random = Math.random() * 100
  let sum = 0
  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i]
    if (random <= sum) return i
  }
  return 0
}

export default function PromoWheel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [hasSpun, setHasSpun] = useState(false)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)

  // Check if user has already spun today
  useEffect(() => {
    const lastSpin = localStorage.getItem('amy-wheel-spin')
    if (lastSpin) {
      const lastSpinDate = new Date(lastSpin)
      const now = new Date()
      // Allow one spin per day
      if (lastSpinDate.toDateString() === now.toDateString()) {
        setHasSpun(true)
      }
    }

    // Show teaser after 3 seconds
    const timer = setTimeout(() => {
      if (!hasSpun) {
        setShowTeaser(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasSpun])

  const spinWheel = () => {
    if (isSpinning || !emailSubmitted) return

    setIsSpinning(true)
    setShowResult(false)

    // Get weighted random prize
    const prizeIndex = getWeightedPrize()
    const prize = prizes[prizeIndex]

    // Calculate rotation to land on prize
    // Each segment is 360/8 = 45 degrees
    // We need to account for the pointer being at the top
    const segmentAngle = 360 / prizes.length
    const prizeAngle = prizeIndex * segmentAngle + segmentAngle / 2
    // Rotate multiple times + land on prize (inverted because wheel spins clockwise)
    const spins = 5 // Number of full rotations
    const finalRotation = rotation + (360 * spins) + (360 - prizeAngle) + 22.5

    setRotation(finalRotation)

    // Show result after spin completes
    setTimeout(() => {
      setIsSpinning(false)
      setWonPrize(prize)
      setShowResult(true)
      setHasSpun(true)
      localStorage.setItem('amy-wheel-spin', new Date().toISOString())
      
      // Save prize code if won
      if (prize.value) {
        localStorage.setItem('amy-promo-code', prize.value)
      }
    }, 4000)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setEmailSubmitted(true)
      // In production, you'd send this to your email list
      localStorage.setItem('amy-wheel-email', email)
    }
  }

  const copyCode = () => {
    if (wonPrize?.value) {
      navigator.clipboard.writeText(wonPrize.value)
    }
  }

  return (
    <>
      {/* Floating Teaser Button */}
      <AnimatePresence>
        {showTeaser && !isOpen && !hasSpun && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => { setIsOpen(true); setShowTeaser(false); }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold py-3 px-4 rounded-r-xl shadow-lg shadow-[#D4AF37]/30 flex items-center gap-2 hover:pl-6 transition-all"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-2xl"
            >
              🎁
            </motion.span>
            <span className="text-sm">Spin & Win!</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !showResult && setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-2xl z-[60] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              {!isSpinning && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Header */}
              <div className="text-center pt-6 pb-4 px-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-4xl mb-2"
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Spin to Win!</h2>
                <p className="text-white/60 text-sm">Try your luck for exclusive discounts</p>
              </div>

              {/* Wheel Section */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-y-auto">
                {!showResult ? (
                  <>
                    {/* Wheel */}
                    <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6">
                      {/* Pointer */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#D4AF37] drop-shadow-lg" />
                      </div>

                      {/* Wheel Circle */}
                      <motion.div
                        animate={{ rotate: rotation }}
                        transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="w-full h-full rounded-full border-4 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20 overflow-hidden relative"
                        style={{
                          background: `conic-gradient(
                            ${prizes.map((p, i) => `${p.color} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')}
                          )`
                        }}
                      >
                        {/* Prize Labels */}
                        {prizes.map((prize, i) => {
                          const angle = i * 45 + 22.5
                          return (
                            <div
                              key={prize.id}
                              className="absolute top-1/2 left-1/2 origin-left"
                              style={{
                                transform: `rotate(${angle}deg) translateX(20px)`,
                                width: '50%',
                              }}
                            >
                              <span
                                className="text-[10px] md:text-xs font-bold whitespace-nowrap"
                                style={{ color: prize.textColor }}
                              >
                                {prize.label}
                              </span>
                            </div>
                          )
                        })}

                        {/* Center Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#0a0a0a] border-4 border-[#D4AF37] flex items-center justify-center">
                          <span className="text-[#D4AF37] text-xs font-bold">AMY&apos;S</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Email Form or Spin Button */}
                    {!emailSubmitted ? (
                      <form onSubmit={handleEmailSubmit} className="w-full max-w-xs space-y-3">
                        <p className="text-white/70 text-sm text-center mb-2">
                          Enter your email to spin!
                        </p>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors text-center"
                        />
                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                        >
                          Continue
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={spinWheel}
                        disabled={isSpinning || hasSpun}
                        className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSpinning ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                              ⭐
                            </motion.span>
                            Spinning...
                          </span>
                        ) : hasSpun ? (
                          'Come back tomorrow!'
                        ) : (
                          '🎰 SPIN NOW!'
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  /* Result Screen */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    {wonPrize?.value ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', bounce: 0.5 }}
                          className="text-6xl mb-4"
                        >
                          🎊
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-2">Congratulations!</h3>
                        <p className="text-white/70 mb-6">You won: {wonPrize.description}</p>
                        
                        <div className="bg-white/10 rounded-xl p-4 mb-6">
                          <p className="text-white/60 text-sm mb-2">Your promo code:</p>
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-2xl font-mono font-bold text-[#D4AF37] tracking-wider">
                              {wonPrize.value}
                            </span>
                            <button
                              onClick={copyCode}
                              className="p-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                        >
                          Start Shopping →
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-6xl mb-4">😅</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Almost!</h3>
                        <p className="text-white/70 mb-6">Better luck next time. Come back tomorrow for another spin!</p>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 text-center">
                <p className="text-white/40 text-xs">
                  One spin per day. Codes valid for 7 days.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
