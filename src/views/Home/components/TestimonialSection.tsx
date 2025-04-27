"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Shield, Award, Star } from "lucide-react"
import ParallaxElement from "@/components/ParallaxElement"
import RevealOnScroll from "@/components/RevealOnScroll"

// Use the same external avatar URLs as the first code
const healthcareAvatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
]

// Extended testimonials with more entries and additional details
const testimonials = [
  {
    name: "Dr. Anil Mehta",
    role: "Healthcare Facilitator",
    text: "GoGetWell.ai's AI tools have saved me hours daily by automating patient inquiries and scheduling. It's a must-have for any healthcare professional!",
    rating: 5,
    avatar: healthcareAvatars[0],
    company: "Mehta Clinics",
    icon: <Heart className="w-6 h-6 text-red-500" />,
    highlight: "Saved 15+ hours weekly",
  },
  {
    name: "Sneha Patel",
    role: "Hospital Admin",
    text: "The lead generation feature is a game-changer. We've increased our patient intake by 30% since using this platform!",
    rating: 5,
    avatar: healthcareAvatars[1],
    company: "Patel Healthcare",
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    highlight: "30% increase in patients",
  },
  {
    name: "Dr. Ravi Kapoor",
    role: "Medical Director",
    text: "The AI-powered website builder helped us create a professional online presence in minutes. Our patients love the seamless experience.",
    rating: 4.5,
    avatar: healthcareAvatars[2],
    company: "Kapoor Medical Group",
    icon: <Star className="w-6 h-6 text-blue-500" />,
    highlight: "Website built in minutes",
  },
  {
    name: "Priya Sharma",
    role: "Practice Manager",
    text: "24/7 patient support with AI has drastically improved our response times. Our patients feel cared for around the clock.",
    rating: 5,
    avatar: healthcareAvatars[3],
    company: "Sharma Wellness",
    icon: <Shield className="w-6 h-6 text-green-500" />,
    highlight: "24/7 patient support",
  },
  {
    name: "Amit Desai",
    role: "Healthcare Consultant",
    text: "The analytics dashboard provides actionable insights that have helped us boost our revenue significantly. Highly recommend!",
    rating: 4.8,
    avatar: healthcareAvatars[4],
    company: "Desai Solutions",
    icon: <Award className="w-6 h-6 text-purple-500" />,
    highlight: "Revenue increased by 25%",
  },
]

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState([])
  const [cardsPerView, setCardsPerView] = useState(3)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  // Determine how many cards to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update visible testimonials when currentIndex or cardsPerView changes
  useEffect(() => {
    const visibleCards = []
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % testimonials.length
      visibleCards.push(testimonials[index])
    }
    setVisibleTestimonials(visibleCards)
  }, [currentIndex, cardsPerView])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  // Medical-themed background patterns
  const MedicalPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-500 rounded-full"></div>
      <div className="absolute top-40 right-20 w-16 h-16 border-4 border-purple-500 rounded-full"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-green-500 rounded-full"></div>

      {/* DNA Helix Pattern */}
      <div className="absolute right-10 top-1/3 h-64 w-8 flex flex-col justify-between opacity-30 dna-helix">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}`}></div>
              <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-blue-500"}`}></div>
            </div>
          ))}
      </div>

      {/* Plus Symbols (Medical Cross) */}
      <div className="absolute left-20 bottom-10 text-4xl text-blue-500 opacity-20">+</div>
      <div className="absolute right-40 top-20 text-3xl text-purple-500 opacity-20">+</div>
      <div className="absolute left-1/3 top-10 text-2xl text-green-500 opacity-20">+</div>

      {/* Heartbeat Line */}
      <div className="absolute bottom-10 left-0 w-full h-10 heartbeat-line"></div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden custom-scrollbar-section"
      aria-label="Testimonials"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Medical-themed background pattern */}
        <MedicalPattern />
      </div>

      <motion.div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10" style={{ y, opacity, scale }}>
        {/* Header */}
        <RevealOnScroll direction="bottom" className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="p-3 bg-blue-100 rounded-full pulse">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 gradient-text">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            See how goGetWell.ai is transforming healthcare practices worldwide with AI-powered solutions.
          </p>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </RevealOnScroll>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 glow"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-blue-500" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 glow"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-blue-500" />
          </motion.button>

          {/* Testimonial Cards */}
          <div ref={carouselRef} className="overflow-hidden px-4 md:px-10">
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((t, i) => (
                  <ParallaxElement
                    key={`${currentIndex}-${i}`}
                    speed={0.05}
                    direction={i % 2 === 0 ? "up" : "down"}
                    className={`w-full ${cardsPerView === 1 ? "max-w-md" : cardsPerView === 2 ? "sm:w-5/12" : "sm:w-5/12 lg:w-3/10"} mx-auto`}
                  >
                    <motion.div
                      variants={itemVariants}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="h-full">
                        <motion.div
                          className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col frosted-glass"
                          whileHover={{
                            y: -5,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          {/* Highlight Badge */}
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {t.icon}
                              <span className="ml-2">{t.highlight}</span>
                            </span>
                          </div>

                          {/* Testimonial Text */}
                          <div className="flex-grow">
                            <div className="flex mb-4">
                              {Array(Math.floor(t.rating))
                                .fill(0)
                                .map((_, j) => (
                                  <motion.svg
                                    key={j}
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </motion.svg>
                                ))}
                              {t.rating % 1 !== 0 && (
                                <svg
                                  className="w-5 h-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <defs>
                                    <linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="50%" stopColor="currentColor" />
                                      <stop offset="50%" stopColor="#D1D5DB" />
                                    </linearGradient>
                                  </defs>
                                  <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    fill="url(#halfStarGradient)"
                                  />
                                </svg>
                              )}
                              {Array(5 - Math.ceil(t.rating))
                                .fill(0)
                                .map((_, j) => (
                                  <svg
                                    key={`empty-${j}`}
                                    className="w-5 h-5 text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">"{t.text}"</p>
                          </div>

                          {/* User Info */}
                          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                            <motion.div
                              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500"
                              whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                              <img
                                src={t.avatar || "/placeholder.svg"}
                                alt={`${t.name}'s avatar`}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <div>
                              <div className="font-semibold text-gray-900">{t.name}</div>
                              <div className="text-sm text-gray-500">{t.role}</div>
                              <div className="text-sm text-gray-600 font-medium">{t.company}</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </ParallaxElement>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToTestimonial(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                i === currentIndex ||
                (i > currentIndex && i < currentIndex + cardsPerView && i < testimonials.length) ||
                (
                  currentIndex + cardsPerView > testimonials.length &&
                    i >= testimonials.length - cardsPerView &&
                    i >= currentIndex
                )
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default TestimonialSection
