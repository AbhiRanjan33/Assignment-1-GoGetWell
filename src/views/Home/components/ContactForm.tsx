"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button, Notification, toast } from "@/components/ui"
import { BiPhone, BiSend, BiUser } from "react-icons/bi"
import { BsLinkedin, BsTwitter } from "react-icons/bs"
import { CgMail } from "react-icons/cg"
import { Link } from "react-router-dom"
import { Stethoscope, Heart, Activity, Shield, Pill, Thermometer } from 'lucide-react'

const ContactForm = () => {
  const [formState, setFormState] = useState<{
    fullname: string
    email: string
    message: string
    subject: string
  }>({
    fullname: "",
    email: "",
    message: "",
    subject: "General Inquiry",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focused, setFocused] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const subjectOptions = [
    "General Inquiry",
    "Patient Referral",
    "Website Setup",
    "AI Integration",
    "Technical Support",
    "Partnership Opportunity"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitting(false)
      toast.push(
        <Notification title={"Success"} type={"success"}>
          Your message has been sent successfully!
        </Notification>,
      )
      setFormState({
        fullname: "",
        email: "",
        message: "",
        subject: "General Inquiry",
      })
    } catch (err) {
      setIsSubmitting(false)
      toast.push(
        <Notification title={"Error sending message"} type={"danger"}>
          Please try again later.
        </Notification>,
      )
    }
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const MedicalPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute right-10 top-1/3 h-64 w-8 flex flex-col justify-between opacity-30">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
          </div>
        ))}
      </div>
      <div className="absolute left-20 bottom-10 text-4xl text-blue-500 opacity-20">+</div>
      <div className="absolute right-40 top-20 text-3xl text-purple-500 opacity-20">+</div>
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

  const contactIcons = [
    { icon: <Stethoscope className="w-6 h-6 text-blue-500" />, label: "24/7 Support" },
    { icon: <Heart className="w-6 h-6 text-red-500" />, label: "Patient Care" },
    { icon: <Shield className="w-6 h-6 text-green-500" />, label: "Data Security" },
    { icon: <Activity className="w-6 h-6 text-purple-500" />, label: "Healthcare Analytics" },
  ]

  return (
    <div
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden custom-scrollbar-3d"
    >
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

      <MedicalPattern />

      <motion.div
        className="max-w-7xl mx-auto"
        style={{ y, opacity, scale }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
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
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's get in touch!</h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-gray-600 text-lg leading-relaxed">
              Got questions about GoGetWell.AI? Our healthcare specialists are here to help. Contact us for quick and friendly support.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {contactIcons.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="bg-blue-50 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-purple-100 p-4 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <BiPhone className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <a
                    href="tel:+919811396858"
                    className="text-gray-900 hover:text-blue-500 transition-colors duration-300 text-lg"
                  >
                    +91 9811396858
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-purple-100 p-4 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <CgMail className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <a
                    href="mailto:hello@gogetwell.ai"
                    className="text-gray-900 hover:text-blue-500 transition-colors duration-300 text-lg"
                  >
                    hello@gogetwell.ai
                  </a>
                </div>
              </motion.div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link
                    to="https://x.com/gogetwellai"
                    target="_blank"
                    className="bg-purple-100 p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 inline-block"
                  >
                    <BsTwitter className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link
                    to="https://www.linkedin.com/company/gogetwellai/"
                    target="_blank"
                    className="bg-purple-100 p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 inline-block"
                  >
                    <BsLinkedin className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-3 -right-3 p-2 bg-blue-500 rounded-full shadow-lg">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-3 -left-3 p-2 bg-purple-500 rounded-full shadow-lg">
              <Thermometer className="w-5 h-5 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focused === "fullname" || formState.fullname ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <BiUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formState.fullname}
                  onChange={handleChange}
                  onFocus={() => setFocused("fullname")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focused === "email" || formState.email ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <CgMail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focused === "subject" || formState.subject ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <Activity className="w-5 h-5" />
                </div>
                <select
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none"
                >
                  {subjectOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  rows={5}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Submit</span>
                  <BiSend className="w-5 h-5 transition-colors duration-300" style={{ color: "inherit" }} />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactForm