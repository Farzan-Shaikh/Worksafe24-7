import { useRef, useState, type ComponentType } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import PhoneFrame from '../ui/PhoneFrame'
import { useMediaQuery } from '../ui/useMediaQuery'

type Item = { title: string; Screen: ComponentType }

/**
 * Scroll-driven storytelling for the three app moments.
 * The block is taller than the viewport; its inner panel is `position: sticky`, so it stays
 * pinned while ordinary vertical scrolling moves the phones horizontally, one stage at a time.
 * Scrolling back up reverses it. Once the block's height is used up, the page scrolls on as normal
 * (nothing captures the wheel or touch). Each stage has a short hold so a phone settles before
 * the next one moves in.
 */

/** Progress (0..1) -> stage position (0..n-1) with a hold at every stage */
const useStage = (progress: MotionValue<number>, n: number) => {
  const input: number[] = []
  const output: number[] = []
  const hold = 0.5 // share of each stage spent still
  for (let i = 0; i < n; i++) {
    const a = i / n
    const b = (i + 1) / n
    const pad = ((b - a) * hold) / 2
    input.push(a + pad, b - pad)
    output.push(i, i)
  }
  input[0] = 0
  input[input.length - 1] = 1
  const raw = useTransform(progress, input, output)
  return useSpring(raw, { stiffness: 170, damping: 32, mass: 0.6 })
}

const Phone = ({ i, stage, Screen, spread }: { i: number; stage: MotionValue<number>; Screen: ComponentType; spread: number }) => {
  const d = useTransform(stage, (s) => i - s)
  const x = useTransform(d, (v) => `${v * spread}%`)
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 1.4) * 0.14)
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 0.65))
  const zIndex = useTransform(d, (v) => 10 - Math.round(Math.abs(v) * 3))
  return (
    <motion.div className="absolute inset-0" style={{ x, scale, opacity, zIndex }}>
      <PhoneFrame>
        <Screen />
      </PhoneFrame>
    </motion.div>
  )
}

const Caption = ({ i, stage, title }: { i: number; stage: MotionValue<number>; title: string }) => {
  const d = useTransform(stage, (s) => i - s)
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 1.8))
  const y = useTransform(d, (v) => `${v * 40}%`)
  return (
    <motion.h3 style={{ opacity, y }} className="ws-display absolute inset-x-0 top-0 text-display-sm text-forest-700">
      {title}
    </motion.h3>
  )
}

const ScrollStory = ({ items }: { items: Item[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const n = items.length
  // Shorter pin on phones so it never drags: about 0.9 screens per phone vs 1.1 on desktop
  const perStage = isDesktop ? 110 : 90
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const stage = useStage(scrollYProgress, n)
  const [active, setActive] = useState(0)
  useMotionValueEvent(stage, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v)))))
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative" style={{ height: `${100 + perStage * (n - 1)}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--ws-header-h)]">
        <div className="ws-shell grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-6">
          {/* Phones: horizontal track driven by vertical scroll */}
          <div className="relative order-1 mx-auto aspect-[9/19.5] w-[min(52vw,26svh)] lg:order-2 lg:col-span-6 lg:col-start-7 lg:w-[min(17rem,32svh)]">
            {items.map((it, i) => (
              <Phone key={it.title} i={i} stage={stage} Screen={it.Screen} spread={isDesktop ? 78 : 92} />
            ))}
          </div>

          {/* Captions, kept in sync with the phone in front */}
          <div className="order-2 flex flex-col items-center gap-5 text-center lg:order-1 lg:col-span-5 lg:items-start lg:text-left">
            <ol aria-label="How the app helps" className="relative h-[4.6rem] w-full max-w-[26rem] sm:h-[5rem]">
              {items.map((it, i) => (
                <li key={it.title} aria-current={i === active ? 'step' : undefined}>
                  <Caption i={i} stage={stage} title={it.title} />
                </li>
              ))}
            </ol>
            {/* Progress: one segment per phone */}
            <div aria-hidden="true" className="relative h-px w-40 bg-forest-700/20">
              <motion.span className="absolute inset-y-0 left-0 bg-forest-600" style={{ width: bar }} />
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
                    i <= active ? 'border-forest-600 bg-forest-600' : 'border-forest-700/30 bg-ivory-200'
                  }`}
                  style={{ left: `${(i / (n - 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollStory
