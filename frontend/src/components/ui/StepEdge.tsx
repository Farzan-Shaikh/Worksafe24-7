import { motion, useReducedMotion } from 'framer-motion'

/**
 * Stepped section transition (a staircase cut aligned to the grid).
 * Columns in the colour of the section above descend from left to right.
 * Each column starts as a full band and settles into its step when scrolled into view.
 * `fill` is the background class of the section above.
 */
const StepEdge = ({ fill = 'bg-ivory-200', height = 140, cols = 12 }: { fill?: string; height?: number; cols?: number }) => {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 flex w-full" style={{ height }}>
      {Array.from({ length: cols }).map((_, i) => {
        const step = (cols - i) / cols
        return (
          <motion.div
            key={i}
            className={`h-full flex-1 origin-top ${fill}`}
            initial={reduce ? { scaleY: step } : { scaleY: 1 }}
            whileInView={{ scaleY: step }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.1, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginRight: -1 }}
          />
        )
      })}
    </div>
  )
}

export default StepEdge
