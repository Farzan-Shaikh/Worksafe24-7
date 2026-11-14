import type { ComponentType } from 'react'
import { useReducedMotion } from 'framer-motion'
import ScrollStory from './ScrollStory'
import GridLines from '../ui/GridLines'
import PhoneFrame from '../ui/PhoneFrame'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'
import {
  CommandStationScreen,
  GetHelpScreen,
  ProfileMenuScreen,
  SosActivatedScreen,
  SosActiveScreen,
  WelcomeScreen,
} from '../app/AppScreens'
import { APP_MOMENTS, STEPS } from '../../data/home'

/** Rebuilt app screens (forest/ivory), keyed from the content data */
const SCREENS: Record<string, ComponentType> = {
  welcome: WelcomeScreen,
  profile: ProfileMenuScreen,
  sosActivated: SosActivatedScreen,
  sosActive: SosActiveScreen,
  commandStation: CommandStationScreen,
  getHelp: GetHelpScreen,
}

/** Staircase offsets for the three steps on desktop */
const OFFSETS = ['lg:mt-0', 'lg:mt-28', 'lg:mt-56']

/** Reduced motion: the three moments as a static, readable sequence (no pinning) */
const StaticMoments = () => (
  <div className="relative border-t border-forest-700/20">
    <div className="ws-shell">
      <ul className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-3 sm:gap-6">
        {APP_MOMENTS.map((m) => {
          const Screen = SCREENS[m.screen]
          return (
            <li key={m.title} className="flex flex-col items-center gap-6 text-center">
              <div className="w-[min(56vw,220px)]">
                <PhoneFrame>
                  <Screen />
                </PhoneFrame>
              </div>
              <h3 className="ws-display text-[1.2rem] leading-snug text-forest-700">{m.title}</h3>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

const HowItWorks = () => {
  const reduce = useReducedMotion()
  return (
  <section aria-labelledby="how-title" className="relative bg-ivory-200 text-forest-700">
    <GridLines tone="ivory" />
    <div className="ws-shell relative pt-20 sm:pt-28 lg:pt-36">
      <SectionIntro titleLines={['How It Works']} id="how-title" />

      {/* Steps */}
      <ol className="grid grid-cols-1 gap-y-16 py-16 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-0 lg:py-24">
        {STEPS.map((s, i) => {
          const Screen = SCREENS[s.screen]
          return (
            <Reveal
              as="li"
              key={s.number}
              delay={i * 0.12}
              className={`flex flex-col sm:px-3 lg:px-6 ${i > 0 ? 'lg:border-l lg:border-forest-700/20' : ''} ${OFFSETS[i]}`}
            >
              <p className="ws-eyebrow mb-2 text-forest-500">Step {Number(s.number)}</p>
              <h3 className="ws-display mb-7 text-[1.3rem] leading-tight text-forest-700 sm:min-h-[3.4rem]">{s.title}</h3>
              {/* Centring wrapper: the phone is centred in its column at every width */}
              <div className="flex w-full justify-center">
                <PhoneFrame className="w-[min(64vw,240px)] sm:w-full sm:max-w-[220px] lg:max-w-[240px]">
                  <Screen />
                </PhoneFrame>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </div>

    {/* App moments: vertical scroll drives the three phones (static when motion is reduced) */}
    {reduce ? (
      <StaticMoments />
    ) : (
      <div className="relative border-t border-forest-700/20">
        <ScrollStory items={APP_MOMENTS.map((m) => ({ title: m.title, Screen: SCREENS[m.screen] }))} />
      </div>
    )}
  </section>
  )
}

export default HowItWorks
