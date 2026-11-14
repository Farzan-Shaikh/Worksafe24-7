import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * Staircase reveal (after the Crosswalk reference): a full-bleed monochrome photograph
 * covered by blocks in the colour of the section above, one per grid column.
 * As the photo scrolls into view the blocks retract upward one after another and settle
 * into a stepped edge that descends from left to right.
 *
 * - Blocks are absolutely positioned and animate `scaleY` only: no layout shift.
 * - Columns follow the site grid: 4 on mobile, 6 on tablet, 12 on desktop.
 * - Reduced motion: the finished staircase is shown immediately.
 */

const useColumns = () => {
  const get = () => (typeof window === 'undefined' ? 12 : window.matchMedia('(min-width: 1024px)').matches ? 12 : window.matchMedia('(min-width: 768px)').matches ? 6 : 4)
  const [cols, setCols] = useState(get)
  useEffect(() => {
    const mqs = [window.matchMedia('(min-width: 1024px)'), window.matchMedia('(min-width: 768px)')]
    const on = () => setCols(get())
    mqs.forEach((m) => m.addEventListener('change', on))
    return () => mqs.forEach((m) => m.removeEventListener('change', on))
  }, [])
  return cols
}

/** Final depth of step i (fraction of the photo height): shallow on the left, deeper to the right */
const depth = (i: number, n: number, min: number, max: number) => min + (max - min) * (n === 1 ? 0 : i / (n - 1))

const Step = ({
  progress,
  i,
  n,
  final,
  fill,
  reduce,
}: {
  progress: MotionValue<number>
  i: number
  n: number
  final: number
  fill: string
  reduce: boolean
}) => {
  // Each column starts a little after the previous one: a restrained left-to-right stagger
  const start = (i / n) * 0.45
  const scaleY = useTransform(progress, [start, start + 0.55], [1, final], { clamp: true })
  const edge = i === 0 ? { left: '-50vw' } : i === n - 1 ? { right: '-50vw' } : {}
  return (
    <div className="relative h-full">
      <motion.div
        className={`absolute inset-y-0 left-0 right-0 origin-top border-l border-forest-900/[0.07] ${fill}`}
        style={{ ...edge, scaleY: reduce ? final : scaleY, willChange: 'transform' }}
      />
    </div>
  )
}

type Props = {
  src: string
  alt: string
  /** Background class of the section above (the steps are cut from it) */
  fill?: string
  /** Shallowest and deepest step, as fractions of the photo height */
  minDepth?: number
  maxDepth?: number
  className?: string
  imgClassName?: string
}

const StaircaseReveal = ({
  src,
  alt,
  fill = 'bg-ivory-200',
  minDepth = 0.06,
  maxDepth = 0.34,
  className = 'aspect-[4/5] md:aspect-[3/2] lg:aspect-[16/9]',
  imgClassName = 'object-[50%_0%]',
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
  const cols = useColumns()
  // 0 when the photo's top enters the bottom of the viewport, 1 when it reaches the upper third
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })

  return (
    <div ref={ref} className={`relative w-full overflow-hidden bg-charcoal-900 ${className}`}>
      <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`} loading="lazy" decoding="async" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="ws-shell h-full">
          <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {Array.from({ length: cols }).map((_, i) => (
              <Step
                key={`${cols}-${i}`}
                progress={scrollYProgress}
                i={i}
                n={cols}
                final={depth(i, cols, minDepth, maxDepth)}
                fill={fill}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaircaseReveal
