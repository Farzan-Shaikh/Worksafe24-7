import type { ComponentType } from 'react'
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

const HowItWorks = () => (
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

    {/* App moments: swipe on mobile, three ruled columns from tablet up */}
    <div className="relative border-t border-forest-700/20">
      <div className="ws-shell">
        <ul className="ws-no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-12 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-0 sm:overflow-visible sm:px-0 sm:py-0">
          {APP_MOMENTS.map((m, i) => {
            const Screen = SCREENS[m.screen]
            return (
              <li
                key={m.title}
                className={`w-[78%] shrink-0 snap-start sm:w-auto sm:py-14 ${
                  i > 0 ? 'sm:border-l sm:border-forest-700/20 sm:pl-6' : ''
                } ${i < APP_MOMENTS.length - 1 ? 'sm:pr-6' : ''}`}
              >
                <Reveal delay={i * 0.1}>
                  {/* Whole phone, centred on an ivory plate */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-ivory-50">
                    <div className="absolute left-1/2 top-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2">
                      <PhoneFrame>
                        <Screen />
                      </PhoneFrame>
                    </div>
                  </div>
                  <h3 className="ws-display mt-6 text-[1.2rem] leading-snug text-forest-700">{m.title}</h3>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </section>
)

export default HowItWorks
