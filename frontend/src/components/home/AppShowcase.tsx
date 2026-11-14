import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import PhoneFrame from '../ui/PhoneFrame'
import StepEdge from '../ui/StepEdge'
import FeatureSlide from '../app/FeatureSlide'
import { ServiceTile } from '../app/AppScreens'
import { HOME_TILES } from '../app/tiles'
import { APP_SLIDES } from '../../data/home'

const INTERVAL = 5000
const EASE = [0.22, 1, 0.36, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

const AppShowcase = () => {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = APP_SLIDES.length

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    if (paused || reduce) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, paused, reduce, go])

  const slide = APP_SLIDES[index]

  return (
    <section aria-label="Inside the app" className="ws-grain relative bg-charcoal-900 text-ivory-50">
      <StepEdge fill="bg-ivory-200" />
      <GridLines tone="charcoal" />

      <div
        className="ws-shell relative grid grid-cols-1 gap-12 pb-20 pt-8 sm:pb-28 lg:grid-cols-12 lg:gap-6 lg:pb-36"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Feature list */}
        <div className="flex flex-col lg:col-span-4 lg:pt-6">
          <ol className="border-t border-ivory-50/15" aria-label="App features">
            {APP_SLIDES.map((s, i) => {
              const active = i === index
              return (
                <li key={s.key} className="relative border-b border-ivory-50/15">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? 'true' : undefined}
                    className={`flex w-full py-5 text-left transition-colors duration-500 ${
                      active ? 'text-ivory-50' : 'text-ivory-50/50 hover:text-ivory-50/85'
                    }`}
                  >
                    <span className="ws-display text-[1.3rem] leading-tight sm:text-[1.5rem]">{s.title}</span>
                  </button>
                  {/* Autoplay progress */}
                  {active && (
                    <motion.span
                      key={`p-${index}-${paused}`}
                      aria-hidden="true"
                      className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-sage-200"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease: 'linear' }}
                    />
                  )}
                </li>
              )
            })}
          </ol>

          <div className="mt-8 flex items-center justify-between lg:mt-auto lg:pt-10">
            <p className="ws-figure text-sm text-ivory-100/85" aria-live="polite">
              {pad(index + 1)} <span className="text-ivory-100/60">/ {pad(count)}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous feature"
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory-50/25 transition-colors hover:bg-ivory-50 hover:text-charcoal-900"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next feature"
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory-50/25 transition-colors hover:bg-ivory-50 hover:text-charcoal-900"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="relative order-first lg:order-none lg:col-span-8 lg:col-start-5 lg:pl-6">
          <div className="relative ml-auto aspect-[4/5] w-full overflow-hidden bg-forest-800 sm:aspect-[5/4] sm:w-[88%] lg:w-[82%]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={slide.key}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 0% 100%)' }}
                animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0.4 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <FeatureSlide slide={slide} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone composition: the app home screen (rebuilt) */}
          <div className="relative mx-auto mt-10 w-[54%] max-w-[240px] sm:mx-0 sm:-mt-[34%] sm:w-[34%] sm:max-w-[270px] lg:-mt-[40%] lg:w-[34%]">
            <PhoneFrame>
              <div aria-hidden="true" className="absolute inset-0 flex flex-col bg-ivory-50 pt-[12%]" style={{ containerType: 'inline-size' }}>
                <div className="relative mx-[4cqw] overflow-hidden rounded-[3cqw] bg-forest-700 px-[5cqw] py-[5cqw] text-ivory-50">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={slide.key}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-[6cqw] font-semibold leading-tight">{slide.title}</p>
                      <p className="mt-[1.5cqw] text-[3.4cqw] text-ivory-100/80">{slide.features[0]}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-[4cqw] flex gap-[1.2cqw]">
                    {APP_SLIDES.map((s, i) => (
                      <span
                        key={s.key}
                        className={`h-[1.2cqw] rounded-full transition-all duration-500 ${i === index ? 'w-[5cqw] bg-ivory-50' : 'w-[1.2cqw] bg-ivory-50/40'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[2.4cqw] p-[4cqw]">
                  {HOME_TILES.map((t) => (
                    <ServiceTile key={t.label} {...t} />
                  ))}
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppShowcase
