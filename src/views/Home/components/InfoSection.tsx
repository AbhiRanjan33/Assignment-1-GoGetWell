"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Stethoscope, Heart, Activity, Shield, Globe, Brain } from "lucide-react"
import aboutUs from "@/assets/images/about_us.gif"
import mission from "@/assets/images/our_mission.gif"
import challenges from "@/assets/images/challenges_solve.gif"

interface SectionProps {
  img: any
  icon1: React.ReactNode
  icon2: React.ReactNode
  title: string
  content1: string
  content2: string
  icontitle1: string
  iconp1: string
  icontitle2: string
  iconp2: string
  status: "left" | "right"
  index: number
  medicalIcon: React.ReactNode
}

const Section: React.FC<SectionProps> = ({
  status,
  img,
  icon1,
  icon2,
  title,
  content1,
  content2,
  icontitle1,
  iconp1,
  icontitle2,
  iconp2,
  index,
  medicalIcon,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [status === "left" ? -50 : 50, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
        delay: index * 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      ref={sectionRef}
      className={`flex flex-col lg:flex-row gap-8 items-center mb-24 md:mb-32 ${index === 0 ? "mt-12" : ""}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image Section */}
      <motion.div
        className={`w-full lg:w-1/2 flex items-center justify-center ${status === "right" ? "order-last lg:order-first" : "order-first lg:order-last"}`}
        style={{ x, opacity, scale }}
        variants={itemVariants}
        whileHover="hover"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: [0, 1, 0, -1, 0],
            transition: { duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
          }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

          {/* Healthcare-themed image with medical icon overlay */}
          <div className="relative">
            <img
              src={img || "/placeholder.svg"}
              alt={title}
              className="relative w-full object-cover rounded-xl max-w-[400px] sm:max-w-[450px] md:max-w-[500px] shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-lg">{medicalIcon}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className={`w-full lg:w-1/2 ${status === "right" ? "order-first lg:order-last" : "order-last lg:order-first"}`}
        variants={containerVariants}
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
            {title}
            <span className="text-blue-500">{medicalIcon}</span>
          </h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="space-y-4">
          <motion.p className="text-gray-600 leading-relaxed text-base md:text-lg" variants={itemVariants}>
            {content1}
          </motion.p>

          <motion.p className="text-gray-600 leading-relaxed text-base md:text-lg" variants={itemVariants}>
            {content2}
          </motion.p>
        </div>

        {/* Feature Points */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8" variants={containerVariants}>
          <motion.div
            className="flex items-start gap-3 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="flex-shrink-0">
              <motion.div
                className="p-3 bg-blue-100 rounded-lg"
                whileHover={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{ duration: 1 }}
              >
                {icon1}
              </motion.div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{icontitle1}</h4>
              <p className="text-sm text-gray-600">{iconp1}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="flex-shrink-0">
              <motion.div
                className="p-3 bg-blue-100 rounded-lg"
                whileHover={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{ duration: 1 }}
              >
                {icon2}
              </motion.div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{icontitle2}</h4>
              <p className="text-sm text-gray-600">{iconp2}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const InfoSection: React.FC = () => {
  const sections = [
    {
      img: aboutUs,
      icon1: <Stethoscope className="w-6 h-6 text-blue-500" />,
      icon2: <Heart className="w-6 h-6 text-blue-500" />,
      title: "About Us",
      content1:
        "We are a pioneering AI-driven platform focused on revolutionizing the medical tourism industry. By addressing inefficiencies and disorganization, we empower healthcare facilitators to modernize their operations, attract more patients, and deliver seamless, personalized care across borders.",
      content2:
        "Our cutting-edge solutions are designed to streamline processes and enhance the overall patient experience.",
      icontitle1: "Modern Healthcare Solutions",
      iconp1: "Leveraging AI technology for healthcare",
      icontitle2: "Patient-Centric Care",
      iconp2: "Personalized healthcare experiences",
      status: "left",
      medicalIcon: <Stethoscope className="w-6 h-6" />,
    },
    {
      img: mission,
      icon1: <Shield className="w-6 h-6 text-blue-500" />,
      icon2: <Activity className="w-6 h-6 text-blue-500" />,
      title: "Our Mission",
      content1:
        "Our mission is to simplify the complex medical tourism process by leveraging advanced AI tools that optimize healthcare facilitators operations, maximize revenue opportunities, and provide patients with personalized and stress-free treatment journeys.",
      content2:
        "We strive to become the leading platform for healthcare tourism management and digital transformation.",
      icontitle1: "AI-Powered Healthcare",
      iconp1: "Optimizing operations with advanced technology",
      icontitle2: "Growth-Focused Solutions",
      iconp2: "Maximizing revenue and opportunities",
      status: "right",
      medicalIcon: <Heart className="w-6 h-6" />,
    },
    {
      img: challenges,
      icon1: <Brain className="w-6 h-6 text-blue-500" />,
      icon2: <Globe className="w-6 h-6 text-blue-500" />,
      title: "The Challenges We Solve",
      content1:
        "Medical tourism, especially in India, is plagued by disorganization and inefficiency. Facilitators often rely on outdated methods, leading to delayed bookings, inadequate patient support, and missed growth opportunities.",
      content2:
        "Our platform addresses these pain points by streamlining lead management and improving operational efficiency for facilitators and hospitals alike.",
      icontitle1: "Efficient Medical Operations",
      iconp1: "Streamlined booking and management",
      icontitle2: "Enhanced Patient Support",
      iconp2: "Improved patient communication",
      status: "left",
      medicalIcon: <Activity className="w-6 h-6" />,
    },
  ]

  // Medical-themed background patterns
  const MedicalPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      {/* DNA Helix Pattern */}
      <div className="absolute right-10 top-1/3 h-64 w-8 flex flex-col justify-between opacity-30">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}`}></div>
              <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-blue-500"}`}></div>
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

  return (
    <div className="scroll-smooth max-w-[1538px] mx-auto relative py-16">
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Medical-themed background pattern */}
      <MedicalPattern />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 flex flex-col gap-y-24 sm:gap-y-28 md:gap-y-32 relative z-10">
        {sections.map((section, index) => (
          <Section key={index} {...section} index={index} />
        ))}
      </div>
    </div>
  )
}

export default InfoSection