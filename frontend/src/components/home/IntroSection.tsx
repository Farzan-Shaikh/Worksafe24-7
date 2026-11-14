import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import SectionIntro from '../ui/SectionIntro'
import Reveal from '../ui/Reveal'
import { INTRO } from '../../data/home'

const IntroSection = () => (
  <section aria-labelledby="intro-title" className="relative bg-ivory-200 text-forest-700">
    <GridLines tone="ivory" />
    <div className="ws-shell relative pt-20 sm:pt-28 lg:pt-36">
      <SectionIntro titleLines={INTRO.titleLines} id="intro-title" className="border-t-0">
        {INTRO.description}
      </SectionIntro>

      {/* Four pillars */}
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {INTRO.pillars.map((p, i) => (
          <Reveal
            as="li"
            key={p.title}
            delay={i * 0.08}
            className={`flex flex-col border-b border-forest-700/25 pb-10 sm:pb-14 ${
              i % 2 === 1 ? 'sm:border-l' : ''
            } ${i > 0 ? 'lg:border-l' : ''} border-forest-700/25`}
          >
            <div className="flex items-stretch pr-14">
              <h3 className="ws-grain flex min-h-[3.25rem] flex-1 items-center bg-forest-600 px-4 font-display text-[1.25rem] font-medium text-ivory-50">
                {p.title}
              </h3>
            </div>
            <p className="mt-10 max-w-[22rem] px-4 text-[1.05rem] leading-relaxed text-forest-700 sm:mt-16 lg:mt-24">
              {p.text}
            </p>
          </Reveal>
        ))}
      </ol>

      <div className="flex justify-end py-10 sm:py-14">
        <Link to={INTRO.cta.to} className="ws-btn-dark">
          {INTRO.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
)

export default IntroSection
