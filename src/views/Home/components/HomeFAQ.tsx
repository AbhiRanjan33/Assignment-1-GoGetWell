"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { Stethoscope, Heart, Activity, Shield, Pill, Thermometer } from "lucide-react"

const faqData = [
  {
    que: "What is gogetwell.ai?",
    ans: "gogetwell.ai is an AI-powered platform that helps healthcare facilitators streamline their operations, from building customized websites to managing patient leads and enhancing communication.",
    category: "General",
    icon: <Stethoscope className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-500" />,
  },
  {
    que: "What is the AI Front Office for Healthcare Agents?",
    ans: "The AI Front Office is a powerful platform that helps me manage my healthcare services more efficiently. It handles patient leads, books appointments, and even builds a professional website—all using AI, so I can focus on delivering care.",
    category: "Features",
    icon: <Activity className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-green-500" />,
  },
  {
    que: "How does the AI Agent assist me in my healthcare business?",
    ans: "The AI Agent works like a virtual assistant, answering patient questions, scheduling consultations, and managing appointments in real time. It helps me automate everyday tasks, saving me time and boosting my productivity.",
    category: "Features",
    icon: <Activity className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-green-500" />,
  },
  {
    que: "Can I customize the website for my healthcare services?",
    ans: "Yes, I can fully customize the website to showcase my services. I get to choose the design, features, and content that best represent my brand, making it easy to attract and engage with patients.",
    category: "Customization",
    icon: <Pill className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-purple-500" />,
  },
  {
    que: "How does this platform support independent healthcare facilitators like me?",
    ans: "The platform is designed specifically for independent facilitators or small teams. It integrates AI to automate my front-office tasks, manage patient leads, and even process payments, making it ideal for gig economy professionals.",
    category: "Benefits",
    icon: <Heart className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-red-500" />,
  },
  {
    que: "How does the platform help me manage patient leads?",
    ans: "The AI system captures, organizes, and prioritizes patient leads for me. It follows up with patients, schedules consultations, and makes sure I never miss an opportunity to provide care.",
    category: "Features",
    icon: <Activity className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-green-500" />,
  },
  {
    que: "Is it easy to integrate the platform with the hospitals I work with?",
    ans: "Yes, the platform easily connects with the hospital systems I collaborate with. It helps me manage billing, communication, and partnerships without any hassle.",
    category: "Integration",
    icon: <Shield className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-500" />,
  },
  {
    que: "Is the platform secure and compliant with healthcare regulations?",
    ans: "Absolutely. The platform is designed with top-level security measures and complies with healthcare regulations, so I know that my patients' data is always protected.",
    category: "Security",
    icon: <Shield className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-500" />,
  },
  {
    que: "How quickly can I get started with the platform?",
    ans: "Setting up the platform is fast and easy. I can create my AI-powered front office and website in no time, and the support team guides me through the entire process.",
    category: "Getting Started",
    icon: <Thermometer className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-orange-500" />,
  },
  {
    que: "What kind of customer support is available if I need help?",
    ans: "I have access to 24/7 customer support, along with tutorials and live demos, to make sure I get the most out of the platform and can resolve any issues quickly.",
    category: "Support",
    icon: <Heart className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-red-500" />,
  },
  {
    que: "How does the platform help me attract more patients?",
    ans: "The platform allows me to create a custom, SEO-optimized website, manage patient communication, and build a strong online reputation, all of which help me attract and retain more patients.",
    category: "Benefits",
    icon: <Heart className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-red-500" />,
  },
]

const categories = ["All", ...new Set(faqData.map((faq) => faq.category))]

const MedicalPattern = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute right-2 sm:right-5 md:right-10 top-1/3 h-40 sm:h-48 md:h-64 w-4 sm:w-6 md:w-8 flex flex-col justify-between opacity-30">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className={`w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}`}></div>
            <div className={`w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-blue-500"}`}></div>
          </div>
        ))}
    </div>
    <div className="absolute left-5 sm:left-10 md:left-20 bottom-5 sm:bottom-10 text-2xl sm:text-3xl md:text-4xl text-blue-500 opacity-20">+</div>
    <div className="absolute right-10 sm:right-20 md:right-40 top-5 sm:top-10 md:top-20 text-xl sm:text-2xl md:text-3xl text-purple-500 opacity-20">+</div>
    <svg className="absolute left-0 top-1/2 w-full h-12 sm:h-16 md:h-20 opacity-10" viewBox="0 0 1200 200">
      <path
        d="M0,100 L100,100 L150,50 L200,150 L250,50 L300,150 L350,100 L1200,100"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
      />
    </svg>
  </div>
)

const FAQItem = ({ question, answer, isOpen, onClick, index, icon }) => {
  const itemRef = useRef(null)

  return (
    <motion.div
      ref={itemRef}
      className="border-b border-indigo-100 last:border-b-0"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
    >
      <motion.button
        onClick={onClick}
        className="w-full py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 flex items-center justify-between text-left transition-all duration-300 hover:bg-indigo-50/50 rounded-lg group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <div className="p-1 sm:p-1.5 md:p-2 bg-blue-50 rounded-full">{icon}</div>
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 pr-4 sm:pr-6 md:pr-8 group-hover:text-blue-500 transition-colors duration-300 break-words">
            {question}
          </h3>
        </div>
        <motion.div
          className="flex-shrink-0 ml-1 sm:ml-2 transition-transform duration-300"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <BiChevronDown className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              className="p-2 sm:p-3 md:p-4 pt-0 text-gray-600 text-xs sm:text-sm md:text-base ml-8 sm:ml-10 md:ml-12 break-words"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const HomeFAQs = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const filteredFAQs = activeCategory === "All" ? faqData : faqData.filter((faq) => faq.category === activeCategory)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
    }
  }

  return (
    <div ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-2 sm:px-4 md:px-6 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden custom-scrollbar-3d">
      <motion.div
        className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl"
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
        className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl"
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

      <MedicalPattern />

      <motion.div className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto relative z-10" style={{ y, opacity, scale }}>
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-2 sm:mb-3 md:mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="p-1 sm:p-2 md:p-3 bg-blue-100 rounded-full">
              <Stethoscope className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-blue-500" />
            </div>
          </motion.div>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 break-words">Healthcare FAQs</h2>
          <motion.div
            className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="mt-3 sm:mt-4 md:mt-6 text-gray-600 max-w-2xl sm:max-w-3xl mx-auto text-sm sm:text-base md:text-lg break-words">
            Find answers to common questions about our AI-powered healthcare platform.
          </p>
        </motion.div>

        <div className="relative mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
          <motion.button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-[-2.5rem] sm:left-[-3rem] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BiChevronLeft className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-blue-500" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto py-1 sm:py-2 px-4 sm:px-6 md:px-8 scrollbar-hide snap-x w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-4rem)]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full mx-1 sm:mx-2 transition-all duration-300 snap-start shadow-sm text-xs sm:text-sm md:text-base ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-[-2.5rem] sm:right-[-3rem] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BiChevronRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-blue-500" />
          </motion.button>
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-2 sm:p-4 md:p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.que}
              answer={faq.ans}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              index={index}
              icon={faq.icon}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomeFAQs