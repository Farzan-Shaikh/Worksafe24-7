import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import { MaskedLines } from '../ui/Reveal'
import SafetyNetworkFigure from '../illustrations/SafetyNetworkFigure'
import { HERO } from '../../data/home'

const EASE = [0.22, 1, 0.36, 1] as const

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Gentle parallax: the drawing drifts slower than the page and fades out
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2])

  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="ws-grain relative overflow-hidden bg-forest-700 text-ivory-50"
    >
      <GridLines tone="forest" />

      <div className="ws-shell relative pt-[var(--ws-header-h)]">
        {/* Technical safety-network drawing: shown whole (aspect-ratio box, no cropping),
            width capped by viewport height so the headline stays in view */}
        <motion.div style={{ y, opacity }} className="relative pt-6 sm:pt-8 lg:pt-10">
          <SafetyNetworkFigure maxWidth="max-w-[min(1060px,110svh)]" />
        </motion.div>

        {/* Headline row */}
        <div className="relative grid grid-cols-1 gap-8 pb-10 pt-6 lg:pb-14 xl:grid-cols-12 xl:items-end xl:gap-6">
          <h1 id="hero-title" className="ws-display text-display-xl text-ivory-50 xl:col-span-9">
            <MaskedLines lines={HERO.titleLines} animateOnMount delay={0.15} />
          </h1>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between xl:col-span-3 xl:flex-col xl:items-start xl:pb-2">
            <motion.p {...fade(0.6)} className="max-w-[32rem] text-[1.05rem] leading-relaxed text-ivory-100/85">
              {HERO.subtitle}
            </motion.p>
            <motion.div {...fade(0.75)} className="flex flex-wrap gap-3">
              <Link to={HERO.primaryCta.to} className="ws-btn-ivory">
                {HERO.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={HERO.secondaryCta.to} className="ws-btn-line-light">
                {HERO.secondaryCta.label}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Service index strip */}
        <motion.ul
          {...fade(0.9)}
          aria-label="Included services"
          className="relative grid grid-cols-2 border-t border-ivory-50/20 sm:grid-cols-3 lg:grid-cols-6"
        >
          {HERO.tags.map((tag, i) => (
            <li
              key={tag}
              className={`flex items-center border-b border-ivory-50/10 py-4 pr-3 sm:border-b-0 lg:border-l lg:border-ivory-50/20 lg:pl-4 ${i === 0 ? 'lg:border-l-0 lg:pl-0' : ''}`}
            >
              <span className="text-[0.95rem] text-ivory-50">{tag}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default HeroSection
