import GridLines from '../ui/GridLines'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'
import FeatureGlyph from '../illustrations/FeatureGlyphs'
import { FEATURES } from '../../data/home'

const FeaturesGrid = () => (
  <section aria-labelledby="features-title" className="relative bg-ivory-100 text-forest-700">
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

export default FeaturesGrid
