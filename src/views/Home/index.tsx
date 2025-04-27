"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HeroSection from "./components/HeroSection"
import HomeFAQs from "./components/HomeFAQ"
import ContactForm from "./components/ContactForm"
import MainFooter from "./components/MainFooter"
import InfoSection from "./components/InfoSection"
import FeaturesGrid from "./components/FeaturesGrid"
import FeatureCardsSection from "./components/FeatureCardsSection"
import TestimonialSection from "./components/TestimonialSection"
import { Loader } from "lucide-react"
import ScrollProgress from "@/components/ScrollProgress"
import ParallaxBackground from "@/components/ParallaxBackground"
import ParticleBackground from "@/components/3d/ParticleBackground"

const Home: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Parallax effect for scroll
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    let lastScrollTop = 0

    const handleScroll = () => {
      const hcf = document.querySelector(".hcf-profile")
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      if (scrollTop > lastScrollTop && hcf) {
        hcf.classList.add("hcf-profile-fixed")
      } else if (scrollTop < lastScrollTop && hcf) {
        hcf.classList.remove("hcf-profile-fixed")
      }

      lastScrollTop = scrollTop
    }

    const revealElements = document.querySelectorAll(".reveal")
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", revealOnScroll)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#01052f] to-[#1a2a6c] z-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Loader className="w-16 h-16 text-blue-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-3xl font-bold text-white"
            >
              <span className="text-white">go</span>
              <span className="text-blue-400">GetWell.ai</span>
            </motion.h1>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          .hero-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .hero-scrollbar::-webkit-scrollbar-track {
            background: #1E2A44; /* Dark blue track */
            border-radius: 10px;
          }
          .hero-scrollbar::-webkit-scrollbar-thumb {
            background: #4B0082; /* Purple thumb */
            border-radius: 10px;
            border: 2px solid #1E2A44;
          }
          .hero-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6A0DAD; /* Lighter purple on hover */
          }
          .hero-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4B0082 #1E2A44; /* Thumb and track for Firefox */
          }
        `}
      </style>
      <div className="relative overflow-hidden hero-scrollbar">
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Background gradient that moves on scroll */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#01052f]/80 via-[#0c1254]/80 to-[#1a2a6c]/80 -z-10 pointer-events-none"
          style={{ y: backgroundY }}
        />

        {/* Main content */}
        <div className="relative">
          <HeroSection
            scrollToSection={scrollToSection}
            featuresRef={featuresRef}
            contactRef={contactRef}
            aboutRef={aboutRef}
            faqRef={faqRef}
          />

          <ParallaxBackground intensity={0.15} pattern="medical" className="bg-gradient-to-br from-[#eff6ff] to-white">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
              ref={featuresRef}
            >
              <FeatureCardsSection />
            </motion.div>
          </ParallaxBackground>

          <ParallaxBackground intensity={0.2} pattern="cross" className="bg-gradient-to-br from-[#e6f0fa] to-[#ffffff] custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <FeaturesGrid />
            </motion.div>
          </ParallaxBackground>

          <ParallaxBackground intensity={0.25} pattern="stethoscope" className="bg-gradient-to-br from-[#f0f4f8] to-[#ffffff] custom-scrollbar-3d">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
              ref={aboutRef}
            >
              <InfoSection />
            </motion.div>
            <ParticleBackground className="opacity-20 absolute inset-0 z-0" />
          </ParallaxBackground>

          <ParallaxBackground intensity={0.3} pattern="pill" className="bg-gradient-to-br from-[#e0e7ff] to-[#ffffff] custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <TestimonialSection />
            </motion.div>
          </ParallaxBackground>

          <ParallaxBackground intensity={0.35} pattern="mesh" className="bg-gradient-to-br from-[#d1e0ff] to-[#ffffff] custom-scrollbar-3d">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
              ref={faqRef}
            >
              <HomeFAQs />
            </motion.div>
            <ParticleBackground className="opacity-15 absolute inset-0 z-0" />
          </ParallaxBackground>

          <div className="relative bg-gradient-to-br from-[#c0d8ff] to-[#ffffff] custom-scrollbar-3d">
            <ParticleBackground className="opacity-25 absolute inset-0 z-0" />
            <ParallaxBackground intensity={0.4} pattern="none">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
                ref={contactRef}
              >
                <ContactForm />
              </motion.div>
            </ParallaxBackground>
          </div>

          <MainFooter />
        </div>
      </div>
    </>
  )
}

export default Home