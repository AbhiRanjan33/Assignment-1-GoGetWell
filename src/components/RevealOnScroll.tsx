"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface RevealOnScrollProps {
  children: ReactNode
  direction?: "left" | "right" | "bottom"
  delay?: number
  className?: string
}

export default function RevealOnScroll({
  children,
  direction = "bottom",
  delay = 0,
  className = "",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active")
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div ref={ref} className={`reveal from-${direction} ${className}`}>
      {children}
    </div>
  )
}
