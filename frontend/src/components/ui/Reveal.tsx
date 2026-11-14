import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical travel in px. Kept small: content should settle, not fly in. */
  y?: number
  as?: 'div' | 'li' | 'span'
  once?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Scroll-triggered fade + rise. Disabled for users who prefer reduced motion. */
const Reveal = ({ children, className, delay = 0, y = 24, as = 'div', once = true }: RevealProps) => {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

export default Reveal

/** Splits a heading into lines that slide up from a mask, one after another. */
export const MaskedLines = ({
  lines,
  className,
  delay = 0,
  animateOnMount = false,
}: {
  lines: string[]
  className?: string
  delay?: number
  animateOnMount?: boolean
}) => {
  const reduce = useReducedMotion()
  // The observer sits on the (always visible) wrapper; the masked lines follow via variants.
  // Observing the translated lines themselves fails, because they start clipped by their mask.
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  const line = {
    hidden: { y: '105%' },
    show: (i: number) => ({ y: '0%', transition: { duration: 1.1, delay: delay + i * 0.09, ease: EASE } }),
  }

  return (
    <motion.span className={`block ${className ?? ''}`} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((text, i) => (
        <span key={text} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className="block" variants={line} custom={i}>
            {text}
            {/* Keeps words separated for screen readers and copy/paste */}
            {i < lines.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
