import { useEffect, useRef } from 'react'
import GridLines from '../ui/GridLines'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'
import FeatureGlyph from '../illustrations/FeatureGlyphs'
import { FEATURES } from '../../data/home'

/**
 * Marks the section as "scrolling" while the visitor is scrolling through it, and for a
 * short grace period afterwards so the loops don't stutter between wheel ticks.
 * Written straight to a data attribute (no React re-renders on scroll).
 */
const useScrollActivity = <T extends HTMLElement>(grace = 700) => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let visible = false
    let timer = 0
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (!visible) el.removeAttribute('data-scrolling')
    })
    io.observe(el)
    const onScroll = () => {
      if (!visible) return
      el.setAttribute('data-scrolling', 'on')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => el.removeAttribute('data-scrolling'), grace)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [grace])
  return ref
}

const FeaturesGrid = () => {
  const ref = useScrollActivity<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="features-title" className="ws-scroll-anim relative bg-ivory-100 text-forest-700">
      <GridLines tone="ivory" />
      <div className="ws-shell relative pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-36">
        <SectionIntro id="features-title" titleLines={['Four Dimensions of 24/7 Employee Safety and Wellbeing']} />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-forest-700/20 bg-forest-700/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.key} delay={(i % 3) * 0.08} className="bg-ivory-100">
              <article className="group flex h-full flex-col p-6 transition-colors duration-500 ease-editorial hover:bg-forest-700 sm:p-8">
                <h3 className="ws-display text-[1.25rem] leading-tight text-forest-700 transition-colors duration-500 group-hover:text-ivory-50">
                  {f.title}
                </h3>
                <div className="mx-auto my-8 aspect-[4/3] w-full max-w-[300px] text-forest-600 transition-colors duration-500 group-hover:text-ivory-50 sm:my-10">
                  <FeatureGlyph name={f.key} />
                </div>
                <p className="mt-auto max-w-[24rem] leading-relaxed text-forest-700/90 transition-colors duration-500 group-hover:text-ivory-100/85">
                  {f.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FeaturesGrid
