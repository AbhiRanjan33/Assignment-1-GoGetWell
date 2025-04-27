"use client"

import type React from "react"
import { motion } from "framer-motion"

const TrustedBy: React.FC = () => {
  // Placeholder for hospital/partner logos
  const partners = [
    { name: "Hospital A", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Medical Center B", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Healthcare Group C", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Hospital D", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Medical Network E", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Healthcare Alliance F", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted By Leading Healthcare Providers</h2>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 md:h-16 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustedBy
