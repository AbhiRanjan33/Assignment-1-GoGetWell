"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Activity, Globe, MessageSquare, FileText, TrendingUp, Database, Languages, CreditCard, Search, Stethoscope, Microscope, Pill, Thermometer, Heart, Brain } from 'lucide-react'
import { Tilt } from "react-tilt"

const defaultTiltOptions = {
  max: 15,
  scale: 1.05,
  speed: 1000,
  glare: true,
  "max-glare": 0.3,
  perspective: 1000,
}

// Healthcare-themed icons and solutions
const solutions = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Custom AI-Powered Website",
    description:
      "Intelligent, responsive websites tailored to healthcare providers with automated patient interactions.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    medicalIcon: <Stethoscope className="w-10 h-10 absolute -top-2 -right-2 text-blue-200 opacity-30" />
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Enhanced Patient Conversion",
    description: "Smart conversion optimization tools to turn visitors into patients with personalized experiences.",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
    medicalIcon: <Heart className="w-10 h-10 absolute -top-2 -right-2 text-purple-200 opacity-30" />
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Real-Time Query Handling",
    description: "Instant response system for patient inquiries with AI-powered chat support.",
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
    medicalIcon: <Activity className="w-10 h-10 absolute -top-2 -right-2 text-green-200 opacity-30" />
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Medical Report Analysis",
    description: "Advanced AI analysis of medical reports for quick and accurate patient assessments.",
    color: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
    medicalIcon: <Microscope className="w-10 h-10 absolute -top-2 -right-2 text-orange-200 opacity-30" />
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Improved Lead Generation",
    description: "Data-driven lead generation strategies to attract and engage potential patients.",
    color: "bg-pink-500",
    gradient: "from-pink-500 to-pink-600",
    medicalIcon: <Thermometer className="w-10 h-10 absolute -top-2 -right-2 text-pink-200 opacity-30" />
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Comprehensive Healthcare Database",
    description: "Extensive medical information database for accurate patient guidance and support.",
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
    medicalIcon: <Brain className="w-10 h-10 absolute -top-2 -right-2 text-indigo-200 opacity-30" />
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multilingual Support",
    description: "Breaking language barriers with comprehensive multilingual communication tools.",
    color: "bg-red-500",
    gradient: "from-red-500 to-red-600",
    medicalIcon: <Globe className="w-10 h-10 absolute -top-2 -right-2 text-red-200 opacity-30" />
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Seamless Payment Handling",
    description: "Secure and efficient payment processing for medical services globally.",
    color: "bg-teal-500",
    gradient: "from-teal-500 to-teal-600",
    medicalIcon: <Pill className="w-10 h-10 absolute -top-2 -right-2 text-teal-200 opacity-30" />
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Marketing And SEO Support",
    description: "Optimized digital presence with advanced SEO and marketing strategies.",
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-cyan-600",
    medicalIcon: <Activity className="w-10 h-10 absolute -top-2 -right-2 text-cyan-200 opacity-30" />
  },
]

// Medical-themed background patterns
const MedicalPattern = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    {/* DNA Helix Pattern */}
    <div className="absolute right-10 top-1/3 h-64 w-8 flex flex-col justify-between opacity-30">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
          <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
        </div>
      ))}
    </div>
    
    {/* Medical Cross Symbols */}
    <div className="absolute left-20 bottom-10 text-4xl text-blue-500 opacity-20">+</div>
    <div className="absolute right-40 top-20 text-3xl text-purple-500 opacity-20">+</div>
    <div className="absolute left-1/3 top-10 text-2xl text-green-500 opacity-20">+</div>
    
    {/* Heartbeat Line */}
    <svg className="absolute left-0 top-1/2 w-full h-20 opacity-10" viewBox="0 0 1200 200">
      <path
        d="M0,100 L100,100 L150,50 L200,150 L250,50 L300,150 L350,100 L1200,100"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
      />
    </svg>
  </div>
)

const FeatureCard = ({ solution, index }) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const cardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ y, opacity, scale }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt options={defaultTiltOptions} className="h-full">
        <div
          className={`
            bg-white rounded-xl overflow-hidden transform transition-all duration-500
            ${isHovered ? "shadow-2xl" : "shadow-lg"}
            h-full flex flex-col border border-gray-100 relative
          `}
        >
          {solution.medicalIcon}
          <div className="p-6 flex-1">
            <div
              className={`
                inline-flex p-4 rounded-xl text-white mb-5 
                bg-gradient-to-br ${solution.gradient}
                transform transition-all duration-500
                ${isHovered ? "scale-110 shadow-md" : ""}
              `}
            >
              <motion.div
                animate={
                  isHovered
                    ? {
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {solution.icon}
              </motion.div>
            </div>

            <h3
              className={`
              text-xl font-bold mb-3 transition-colors duration-300
              ${isHovered ? "text-blue-500" : "text-gray-900"}
            `}
            >
              {solution.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-base">{solution.description}</p>
          </div>

          <motion.div
            className={`h-1 w-full bg-gradient-to-r ${solution.gradient} transition-all duration-500`}
            animate={{
              height: isHovered ? "0.5rem" : "0.25rem",
            }}
          />
        </div>
      </Tilt>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 -z-10 bg-${solution.color.split("-")[1]}-400 blur-xl rounded-xl`}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FeaturesGrid: React.FC = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <div
      ref={containerRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#eff6ff] to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ y: backgroundY }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ y: backgroundY }}
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Medical-themed background pattern */}
      <MedicalPattern />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <Stethoscope className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
          
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Comprehensive Healthcare Solutions
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Empowering healthcare facilitators with cutting-edge AI tools to streamline operations and enhance patient
            experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <FeatureCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesGrid
