"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar } from "@/components/ui"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Healthcare Facilitator",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "GoGetWell.AI has completely transformed how I manage my healthcare facilitation business. The AI-powered website and patient management tools have saved me countless hours and helped me grow my client base by 40% in just three months.",
  },
  {
    name: "Rajesh Mehta",
    role: "Medical Tourism Specialist",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As someone who connects international patients with Indian hospitals, I needed a solution that could handle multiple languages and time zones. This platform does it all seamlessly, and the AI assistant handles patient queries 24/7.",
  },
  {
    name: "Dr. Emily Chen",
    role: "Independent Practitioner",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The customizable website templates are beautiful and professional. I was able to create my online presence in just a day, and the integrated booking system has significantly reduced no-shows. Highly recommended!",
  },
  {
    name: "Michael Rodriguez",
    role: "Hospital Partnership Manager",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The platform's ability to integrate with our hospital systems has streamlined our partnership with independent facilitators. The analytics and reporting features provide valuable insights that help us optimize our services.",
  },
]

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Hear from healthcare facilitators who have transformed their practice with our platform
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-8 left-8 text-primary opacity-20">
                <Quote className="w-20 h-20" />
              </div>

              <div className="relative z-10">
                <p className="text-xl text-gray-700 mb-8 italic">"{testimonials[currentIndex].content}"</p>

                <div className="flex items-center">
                  <Avatar
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    size={60}
                    className="mr-4 border-2 border-primary"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
