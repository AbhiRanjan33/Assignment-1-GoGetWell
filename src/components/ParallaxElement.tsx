"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function ParallaxElement({
  children,
  speed = 0.2,
  direction = "up",
  className = "",
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const upTransform = useTransform(scrollYProgress, [0, 1], ["0%", `-${speed * 100}%`])
  const downTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const leftTransform = useTransform(scrollYProgress, [0, 1], ["0%", `-${speed * 100}%`])
  const rightTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return upTransform
      case "down":
        return downTransform
      case "left":
        return leftTransform
      case "right":
        return rightTransform
      default:
        return upTransform
    }
  }

  const transform = getTransform()
  const style = direction === "left" || direction === "right" ? { x: transform } : { y: transform }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={style} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
