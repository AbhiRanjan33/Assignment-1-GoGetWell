"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Heart, Activity, Stethoscope, Shield } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Healthcare-themed footer pattern
  const MedicalFooterPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
      {/* Heartbeat Line */}
      <svg className="absolute left-0 bottom-0 w-full h-20 opacity-20" viewBox="0 0 1200 200">
        <path
          d="M0,100 L100,100 L150,50 L200,150 L250,50 L300,150 L350,100 L1200,100"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
      </svg>
      
      {/* Medical Cross Symbols */}
      <div className="absolute left-20 top-10 text-4xl text-white opacity-10">+</div>
      <div className="absolute right-40 top-20 text-3xl text-white opacity-10">+</div>
      <div className="absolute left-1/3 bottom-10 text-2xl text-white opacity-10">+</div>
      
      {/* DNA Helix Pattern */}
      <div className="absolute right-10 top-1/3 h-64 w-8 flex flex-col justify-between opacity-10">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className={`w-2 h-2 rounded-full bg-white`}></div>
            <div className={`w-2 h-2 rounded-full bg-white`}></div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-[#01052f] to-[#0c1254] text-white relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Healthcare-themed pattern */}
        <MedicalFooterPattern />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Logo and Healthcare Icon */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-white/10 rounded-full">
              <Stethoscope className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">
              <span className="text-white">go</span>
              <span className="text-blue-400">GetWell.ai</span>
            </h3>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              About Us
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              AI-powered front office solutions for healthcare agents and facilitators, transforming medical tourism with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://x.com/gogetwellai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/gogetwellai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to="/" className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  About Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Features
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-green-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to="/blog" className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Healthcare Blog
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to="/faq" className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  FAQ
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  to="/support"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Patient Support
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Privacy Policy
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-blue-500">Email:</span>
                <a
                  href="mailto:hello@gogetwell.ai"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base"
                >
                  hello@gogetwell.ai
                </a>
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-blue-500">Phone:</span>
                <a
                  href="tel:+919811396858"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-base"
                >
                  +91 9811396858
                </a>
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-blue-500">Address:</span>
                <span className="text-gray-300 text-base">New Delhi, India</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Healthcare Certification Badge */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white/10 rounded-lg p-4 inline-flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-white">Healthcare Data Protection Certified</div>
              <div className="text-gray-300">HIPAA Compliant & Secure</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-gradient-to-r from-blue-500 to-purple-500 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">© {currentYear} GoGetWell.AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-blue-500 text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-500 text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default MainFooter
