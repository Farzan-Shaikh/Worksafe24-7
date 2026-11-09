import React from 'react'
import { motion } from 'framer-motion'
import LazyImage from './LazyImage'

interface StepCardProps {
  stepNumber: string
  title: string
  
  imageSrc: string
  delay?: number
  inView: boolean
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  imageSrc,
  delay = 0,
  inView
}) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Badge */}
      <div className="mb-6">
        <span className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-full text-sm">
          {stepNumber}
        </span>
      </div>

      {/* Phone Mockup */}
      <motion.div
        className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl mb-6 w-full max-w-[280px]"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Phone Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" />
        
        {/* Phone Screen */}
        <div className="bg-white rounded-[2rem] overflow-hidden h-[500px] relative">
          <LazyImage 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-fill"
          />
        </div>
      </motion.div>

      {/* Title & Description */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
    </motion.div>
  )
}

export default StepCard
