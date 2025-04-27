"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxBackgroundProps {
  children: React.ReactNode
  intensity?: number
  className?: string
  pattern?: "medical" | "cross" | "stethoscope" | "pill" | "wave" | "mesh" | "none"
  particles?: boolean
  waveBottom?: boolean
}

export default function ParallaxBackground({
  children,
  intensity = 0.2,
  className = "",
  pattern = "medical",
  particles = false,
  waveBottom = false,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${intensity * 100}%`])

  // Pattern class based on the pattern prop
  const getPatternClass = () => {
    switch (pattern) {
      case "medical":
        return "medical-bg"
      case "cross":
        return "medical-cross-pattern"
      case "stethoscope":
        return "stethoscope-pattern"
      case "pill":
        return "pill-pattern"
      case "mesh":
        return "mesh-gradient"
      default:
        return ""
    }
  }

  // Create particles effect
  useEffect(() => {
    if (!particles || !ref.current) return

    const container = ref.current
    const particleCount = 30
    const particlesArray: HTMLDivElement[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size between 5px and 20px
      const size = Math.random() * 15 + 5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random opacity
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`

      // Random animation duration
      const duration = Math.random() * 20 + 10
      particle.style.animation = `float ${duration}s ease-in-out infinite`

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 10}s`

      container.appendChild(particle)
      particlesArray.push(particle)
    }

    // Cleanup
    return () => {
      particlesArray.forEach((particle) => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      })
    }
  }, [particles])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className={`absolute inset-0 ${getPatternClass()}`} />
      </motion.div>

      {waveBottom && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <div className="wave" style={{ height: "100px" }}></div>
        </div>
      )}

      {children}
    </div>
  )
}
