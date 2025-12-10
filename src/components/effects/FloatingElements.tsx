'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingElements() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-gold-500/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-rose-500/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-gold-500/10 to-rose-500/10 blur-3xl"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
          }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          className="absolute rounded-full bg-gradient-to-r from-gold-400 to-rose-400"
        />
      ))}

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise opacity-50" />
    </div>
  )
}
