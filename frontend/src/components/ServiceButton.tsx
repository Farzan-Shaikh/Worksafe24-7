import React from 'react'
import { motion } from 'framer-motion'

interface ServiceButtonProps {
  label: string
  color: string
  index: number
  inView: boolean
  onClick?: () => void
}

const ServiceButton: React.FC<ServiceButtonProps> = ({
  label,
  color,
  index,
  inView,
  onClick
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <motion.button
      className={`${color} backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xl sm:text-xl md:text-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      aria-label={`${label} service - Click to download app from Google Play Store`}
      tabIndex={0}
    >
      {label}
    </motion.button>
  )
}

export default ServiceButton
