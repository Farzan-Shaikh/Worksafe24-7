import React from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  bgColor: string
  iconColor: string
  hoverBgColor: string
  delay?: number
  inView: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
  hoverBgColor,
  delay = 0,
  inView
}) => {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, backgroundColor: '#fef3f2' }}
    >
      <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className={`w-full h-full ${bgColor} rounded-2xl flex items-center justify-center ${hoverBgColor} transition-colors duration-300`}>
          <Icon className={`w-10 h-10 ${iconColor}`} strokeWidth={2} />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export default FeatureCard
