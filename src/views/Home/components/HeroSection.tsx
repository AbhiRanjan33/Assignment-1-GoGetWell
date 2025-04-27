"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui"
import HcfSignupPopup from "@/components/shared/Popups/HcfSignupPopup"
import { Volume2, VolumeX, MousePointer } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { MedicalSphere } from "@/components/3d/MedicalModel"
import MagneticButton from "@/components/MagneticButton"
import ParallaxElement from "@/components/ParallaxElement"

interface HeroSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  featuresRef: React.RefObject<HTMLElement>
  contactRef: React.RefObject<HTMLElement>
  aboutRef: React.RefObject<HTMLElement>
  faqRef: React.RefObject<HTMLElement>
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection, featuresRef, contactRef, aboutRef, faqRef }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Parallax effect for hero elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const videoParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // Mouse parallax effect for video container
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const normalizedX = (clientX / windowWidth) * 2 - 1
    const normalizedY = (clientY / windowHeight) * 2 - 1

    setMousePosition({ x: normalizedX * 10, y: normalizedY * 10 })
  }

  // Handle visibility and scroll indicator
  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setShowScrollIndicator(false)
    }, 5000)

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Toggle mute/unmute by manipulating iframe src
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      const newSrc = isMuted
        ? videoRef.current.src.replace("mute=1", "mute=0")
        : videoRef.current.src.replace("mute=0", "mute=1")
      videoRef.current.src = newSrc
    }
  }

  // Open YouTube video in new tab
  const openYouTubeVideo = () => {
    window.open("https://www.youtube.com/watch?v=xQl8i2sO_Ls", "_blank")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Custom Scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #01052f;
        }
        ::-webkit-scrollbar-thumb {
          background: #0c1254;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #1a2a6c;
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
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
          className="absolute top-30 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
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
        <motion.div
          className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.div
        className="relative z-20 flex justify-between items-center py-4 px-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-3xl font-bold">
          <span className="text-white">go</span>
          <span className="text-blue-400">GetWell.ai</span>
        </div>

        <div className="hidden md:flex gap-6">
          <Button
            variant="ghost"
            className="text-white text-lg font-medium hover:bg-white/20 bg-white/5 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md animated-underline"
            onClick={() => scrollToSection(aboutRef)}
          >
            About Us
          </Button>
          <Button
            variant="ghost"
            className="text-white text-lg font-medium hover:bg-white/20 bg-white/5 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md animated-underline"
            onClick={() => scrollToSection(featuresRef)}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="text-white text-lg font-medium hover:bg-white/20 bg-white/5 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md animated-underline"
            onClick={() => scrollToSection(faqRef)}
          >
            FAQ
          </Button>
          <Button
            variant="ghost"
            className="text-white text-lg font-medium hover:bg-white/20 bg-white/5 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md animated-underline"
            onClick={() => scrollToSection(contactRef)}
          >
            Contact Us
          </Button>
        </div>

        <MagneticButton
          className="text-white border-purple-500 bg-transparent hover:bg-purple-600/20 text-lg font-medium rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
          onClick={() => navigate("/sign-in")}
          strength={20}
        >
          Login
        </MagneticButton>
      </motion.div>

      <motion.div className="relative z-10 flex-1 flex items-center mt-8" style={{ y, opacity, scale }}>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Section */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-4 capitalize text-white leading-tight text-3d"
                variants={itemVariants}
              >
                <span className="text-purple-400">AI front office </span> <br />
                for healthcare agents
              </motion.h1>

              <motion.p
                style={{ lineHeight: "1.8" }}
                className="text-lg md:text-xl my-8 font-light text-gray-200"
                variants={itemVariants}
              >
                Create <span className="text-purple-400 font-bold">AI Store</span> in 2 min <br />
                Scale with <span className="font-bold text-purple-400">Digital Marketing</span>
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <HcfSignupPopup
                  popupButtonStatus
                  buttonChildren={
                    <Button
                      block
                      variant="solid"
                      className="rounded-full text-lg py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg glow neon-glow"
                    >
                      Get Started
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  className="rounded-full text-white border-white bg-white/5 hover:bg-white/20 text-lg py-3 px-6 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg liquid-btn"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Contact Us
                </Button>
              </div>

              <motion.div
                className="flex gap-12 mt-12 flex-wrap justify-center lg:justify-start"
                variants={statsVariants}
              >
                <motion.div className="group hover:scale-110 transition-transform duration-300" whileHover={{ y: -5 }}>
                  <h3 className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    2100
                    <span className="text-purple-400 ml-1 group-hover:text-white transition-colors duration-300">
                      +
                    </span>
                  </h3>
                  <p className="text-lg capitalize text-gray-300">qualified doctors</p>
                </motion.div>
                <motion.div className="group hover:scale-110 transition-transform duration-300" whileHover={{ y: -5 }}>
                  <h3 className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    1000
                    <span className="text-purple-400 ml-1 group-hover:text-white transition-colors duration-300">
                      +
                    </span>
                  </h3>
                  <p className="text-lg capitalize text-gray-300">hospitals</p>
                </motion.div>
                <motion.div className="group hover:scale-110 transition-transform duration-300" whileHover={{ y: -5 }}>
                  <h3 className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    800
                    <span className="text-purple-400 ml-1 group-hover:text-white transition-colors duration-300">
                      +
                    </span>
                  </h3>
                  <p className="text-lg capitalize text-gray-300">Treatment Plans</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 3D Model Section */}
            <ParallaxElement speed={0.1} direction="down" className="lg:w-1/2 h-[400px] md:h-[500px]">
              <motion.div
                ref={videoContainerRef}
                className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl card-3d animated-border"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{
                  y: videoParallax,
                  x: mousePosition.x,
                  rotateX: mousePosition.y * 0.1,
                  rotateY: -mousePosition.x * 0.1,
                }}
              >
                <div className="card-3d-content">
                  <Canvas className="absolute inset-0">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <Environment preset="studio" />
                    <MedicalSphere position={[0, 0, -2]} scale={1.5} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
                  </Canvas>

                  {/* Video overlay with parallax effect */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-900/80 to-purple-900/80 frosted-glass">
                    <div className="relative aspect-video w-full max-w-xl">
                      <iframe
                        ref={videoRef}
                        src={`https://www.youtube.com/embed/xQl8i2sO_Ls?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=xQl8i2sO_Ls&controls=0&showinfo=0&rel=0`}
                        title="AI Healthcare Platform Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent cursor-pointer"
                        onClick={openYouTubeVideo}
                      ></div>
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-all duration-300 hover:scale-110 z-10"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ParallaxElement>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <p className="mb-2 text-sm">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <MousePointer className="w-6 h-6" />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default HeroSection