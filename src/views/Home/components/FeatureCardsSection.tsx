"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui"
import { FaGlobe, FaChartLine, FaUsers, FaComments, FaHeadset, FaRobot } from "react-icons/fa"
import HcfSignupPopup from "@/components/shared/Popups/HcfSignupPopup"

const FeatureCardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect for cards
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  const featureCards = [
    {
      icon: <FaGlobe className="w-6 h-6 text-blue-600" />,
      title: "AI-Powered Website",
      description: "Build an intelligent digital presence with automated patient interactions.",
      delay: 0,
    },
    {
      icon: <FaRobot className="w-6 h-6 text-blue-600" />,
      title: "Scale Your Business",
      description: "Grow your operations with AI-driven tools.",
      delay: 0.1,
    },
    {
      icon: <FaComments className="w-6 h-6 text-blue-600" />,
      title: "Patient Conversion",
      description: "Enhance communication for seamless conversions.",
      delay: 0.2,
    },
    {
      icon: <FaChartLine className="w-6 h-6 text-blue-600" />,
      title: "Boost Revenue",
      description: "Maximize earnings with smart analytics.",
      delay: 0.3,
    },
    {
      icon: <FaUsers className="w-6 h-6 text-blue-600" />,
      title: "Lead Generation",
      description: "Convert visitors into loyal clients effortlessly.",
      delay: 0.4,
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-blue-600" />,
      title: "24/7 Patient Support",
      description: "Offer round-the-clock assistance with AI.",
      delay: 0.5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#01052f] via-[#0c1254] to-white relative overflow-hidden"
      aria-label="Feature Highlights"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        {/* Visual Element */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto text-blue-600"
              role="img"
              aria-label="Star Icon"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Heading and Subheading */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white md:text-gray-900 mb-4"
            style={{ lineHeight: 1.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Transform Your Healthcare Practice
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 md:text-gray-600 max-w-2xl mx-auto">
            Leverage AI to create a powerful online presence, automate patient interactions, and grow your business
            effortlessly.
          </p>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
              custom={card.delay}
              variants={itemVariants}
              whileHover="hover"
              tabIndex={0}
              aria-label={`Feature: ${card.title}`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="bg-blue-50 p-3 rounded-lg flex-shrink-0"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {card.icon}
                </motion.div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{card.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HcfSignupPopup
            popupButtonStatus
            buttonChildren={
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="solid"
                  className="rounded-full text-lg py-3 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Join the waiting list"
                >
                  Join The Waiting List
                </Button>
              </motion.div>
            }
          />
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureCardsSection
