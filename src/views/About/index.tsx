import React from 'react'
import { motion } from 'framer-motion'

const index = () => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#01052f] via-[#0c1254] to-[#1a2a6c] relative overflow-hidden px-4 sm:px-6">
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
          className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
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
          className="absolute top-20 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
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
          className="absolute bottom-10 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
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

      {/* Main Content */}
      <motion.div
        className="relative z-10 p-6 sm:p-8 md:p-12 bg-gradient-to-r from-blue-900/80 to-purple-900/80 frosted-glass rounded-lg shadow-2xl text-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-3d break-words"
          variants={itemVariants}
        >
          <span className="text-purple-400">About</span> Page
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-200 font-light break-words"
          variants={itemVariants}
        >
          This is the shared route for both{' '}
          <span className="text-purple-400 font-semibold">authorized</span> and{' '}
          <span className="text-purple-400 font-semibold">unauthorized</span> users.
        </motion.p>
      </motion.div>
    </div>
  )
}

export default index