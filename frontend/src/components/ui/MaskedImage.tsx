import { motion, useReducedMotion } from 'framer-motion'
import { useColourTap } from './useColourTap'

/**
 * Image revealed by a clip-path wipe when it scrolls into view,
 * with editorial monochrome treatment: colour returns on hover (desktop)
 * or on tap (touch). The source file must be the colour original.
 */
const MaskedImage = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  from = 'bottom',
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  from?: 'bottom' | 'left'
}) => {
  const reduce = useReducedMotion()
  const { bind } = useColourTap<HTMLDivElement>()
  // Every token carries a unit so Framer Motion can interpolate the two shapes
  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'

  return (
    <motion.div
      {...bind}
      className={`ws-photo-hover relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={src}
        alt={alt}
        className={`ws-photo h-full w-full object-cover ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )
}

export default MaskedImage
