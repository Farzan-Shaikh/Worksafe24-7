import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import PhoneFrame from '../ui/PhoneFrame'
import StepEdge from '../ui/StepEdge'
import { useMediaQuery } from '../ui/useMediaQuery'
import FeatureSlide from '../app/FeatureSlide'
import { ServiceTile } from '../app/AppScreens'
import { HOME_TILES } from '../app/tiles'
import { FEATURE_ICONS } from '../app/featureIcons'
import { APP_SLIDES } from '../../data/home'

const INTERVAL = 5000
const EASE = [0.22, 1, 0.36, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')
type Slide = (typeof APP_SLIDES)[number]

/** The rebuilt app home screen; the banner shows the active feature */
const AppHomePhone = ({ slide, index }: { slide: Slide; index: number }) => (
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
)

/* ------------------------------------------------------------------ */
/* Phones and tablets: centred phone + structured feature list          */
/* ------------------------------------------------------------------ */
const CompactShowcase = ({ index, onActive }: { index: number; onActive: (i: number) => void }) => {
  const refs = useRef<(HTMLLIElement | null)[]>([])

  // The phone screen follows the feature group nearest the middle of the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [onActive])

  return (
    <div className="ws-shell relative grid grid-cols-1 pb-20 pt-6 sm:pb-24 md:grid-cols-12 md:gap-8 lg:hidden">
      <div className="md:col-span-5">
        <div className="flex justify-center md:sticky md:top-[calc(var(--ws-header-h)+2rem)]">
          <div className="w-[min(60vw,250px)] md:w-full md:max-w-[250px]">
            <AppHomePhone slide={APP_SLIDES[index]} index={index} />
          </div>
        </div>
      </div>

      <ol className="mt-14 border-t border-ivory-50/15 md:col-span-7 md:mt-0" aria-label="App features">
        {APP_SLIDES.map((s, i) => {
          const icons = FEATURE_ICONS[s.key]
          const active = i === index
          return (
            <li
              key={s.key}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className="border-b border-ivory-50/15 py-8 sm:py-10"
            >
              <h3
                className={`ws-display text-[1.35rem] leading-tight transition-colors duration-500 sm:text-[1.5rem] ${
                  active ? 'text-ivory-50' : 'text-ivory-50/70'
                }`}
              >
                {s.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5 text-[0.98rem] leading-snug text-ivory-100/85">
                {s.features.map((f, k) => {
                  const Icon = icons[k]
                  return (
                    <li key={f} className="flex items-center gap-3">
                      <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem] shrink-0 text-sage-200" strokeWidth={1.5} />
                      <span>{f}</span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: feature index + photo stage + overlapping phone             */
/* ------------------------------------------------------------------ */
const DesktopShowcase = ({ index, go, paused, setPaused }: { index: number; go: (i: number) => void; paused: boolean; setPaused: (v: boolean) => void }) => {
  const reduce = useReducedMotion()
  const slide = APP_SLIDES[index]
  const count = APP_SLIDES.length

  return (
    <div
      className="ws-shell relative hidden grid-cols-12 gap-6 pb-36 pt-8 lg:grid"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="col-span-4 flex flex-col pt-6">
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
                  <span className="ws-display text-[1.5rem] leading-tight">{s.title}</span>
                </button>
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

        <div className="mt-auto flex items-center justify-between pt-10">
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

      <div className="relative col-span-8 col-start-5 pl-6">
        <div className="relative ml-auto aspect-[5/4] w-[82%] overflow-hidden bg-forest-800">
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
        <div className="relative -mt-[40%] w-[34%] max-w-[270px]">
          <AppHomePhone slide={slide} index={index} />
        </div>
      </div>
    </div>
  )
}

const AppShowcase = () => {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = APP_SLIDES.length

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  // Timed rotation only on the desktop composition; phones follow scroll position instead
  useEffect(() => {
    if (!isDesktop || paused || reduce) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, paused, reduce, go, isDesktop])

  return (
    <section aria-label="Inside the app" className="ws-grain relative bg-charcoal-900 text-ivory-50">
      <StepEdge fill="bg-ivory-200" />
      <GridLines tone="charcoal" />
      {isDesktop ? (
        <DesktopShowcase index={index} go={go} paused={paused} setPaused={setPaused} />
      ) : (
        <CompactShowcase index={index} onActive={setIndex} />
      )}
    </section>
  )
}

export default AppShowcase
