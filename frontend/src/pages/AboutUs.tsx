import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import MaskedImage from '../components/ui/MaskedImage'
import Reveal, { MaskedLines } from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import StepEdge from '../components/ui/StepEdge'
import FeatureGlyph from '../components/illustrations/FeatureGlyphs'
import EcosystemCycle from '../components/illustrations/EcosystemCycle'
import {
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_PLATFORM,
  FOUNDERS,
  LEADERS,
  VISION_MISSION,
  WHAT_WE_DO,
} from '../data/about'

/** Line glyphs for Vision (an eye of orbits) and Mission (a sighted target) */
const VisionGlyph = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M10 100 Q100 20 190 100 Q100 180 10 100 Z" strokeWidth={1} />
    <circle cx={100} cy={100} r={36} strokeWidth={1} />
    <circle cx={100} cy={100} r={14} strokeWidth={1.2} />
    <g className="animate-ws-spin-slow" style={{ transformOrigin: '100px 100px' }}>
      <circle cx={100} cy={100} r={52} strokeWidth={0.8} strokeDasharray="3 7" opacity={0.7} />
    </g>
    <line x1={100} y1={0} x2={100} y2={200} strokeWidth={0.5} strokeDasharray="2 5" opacity={0.5} />
  </svg>
)

const MissionGlyph = () => (
  <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" stroke="currentColor" aria-hidden="true">
    {[88, 64, 40].map((r) => (
      <circle key={r} cx={100} cy={100} r={r} strokeWidth={r === 64 ? 1.2 : 0.8} opacity={r === 88 ? 0.6 : 1} />
    ))}
    <circle cx={100} cy={100} r={6} fill="currentColor" stroke="none" />
    <path d="M100 4 V40 M100 160 V196 M4 100 H40 M160 100 H196" strokeWidth={1} />
    <g className="animate-ws-spin-slower" style={{ transformOrigin: '100px 100px' }}>
      <circle cx={100} cy={100} r={76} strokeWidth={1.6} strokeDasharray="22 456" />
    </g>
  </svg>
)

const AboutUs = () => (
  <PageShell header="overlay">
    <SEOHead
      title="About Us"
      description={ABOUT_HERO.intro}
      url="https://worksafe247.com/about-us"
    />

    {/* 1. Opening statement */}
    <PageHero
      tone="forest"
      size="xl"
      titleLines={ABOUT_HERO.titleLines}
      crumbs={[{ name: 'Home', to: '/' }, { name: 'About Us' }]}
      actions={
        <Link to={ABOUT_HERO.cta.to} className="ws-btn-ivory w-fit">
          {ABOUT_HERO.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      }
    >
      <p>{ABOUT_HERO.intro}</p>
    </PageHero>

    {/* 2. Ecosystem figure, set on paper */}
    <section aria-label="WorkSafe 24/7 ecosystem" className="relative bg-ivory-50">
      <StepEdge fill="bg-forest-700" height={96} />
      <div className="ws-shell relative pb-16 pt-4 sm:pb-24">
        {/* Rebuilt from AB.webp: the team photo (monochrome) beside a vector version of its cycle diagram */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-6">
          <Reveal>
            <img
              src={ABOUT_HERO.ecosystemImage.src}
              alt={ABOUT_HERO.ecosystemImage.alt}
              width={879}
              height={812}
              className="mx-auto w-full max-w-[560px] mix-blend-multiply"
              loading="eager"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <EcosystemCycle nodes={ABOUT_HERO.ecosystem.nodes} quote={ABOUT_HERO.ecosystem.quote} className="mx-auto w-full max-w-[460px]" />
          </Reveal>
        </div>
      </div>
    </section>

    {/* 3. Platform statement beside a portrait-format photograph */}
    <section aria-label="Our platform" className="relative bg-ivory-200">
      <GridLines tone="ivory" />
      <div className="ws-shell relative grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-36">
        <MaskedImage
          src={ABOUT_PLATFORM.image.src}
          alt={ABOUT_PLATFORM.image.alt}
          className="aspect-[4/5] lg:col-span-5"
          imgClassName="object-[50%_62%]"
        />
        <div className="flex flex-col justify-center gap-10 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="ws-display text-display-sm text-forest-700">
              {ABOUT_PLATFORM.before}
              <strong className="font-medium text-forest-500">
                {ABOUT_PLATFORM.strong}
              </strong>
              {ABOUT_PLATFORM.after}
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* 4. What we do + the Safety Station */}
    <section aria-labelledby="what-title" className="relative bg-ivory-100">
      <GridLines tone="ivory" />
      <div className="ws-shell relative pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-36">
        <SectionIntro titleLines={WHAT_WE_DO.titleLines} id="what-title">
          {WHAT_WE_DO.text}
        </SectionIntro>

        {/* Photo + Safety Station panel.
            Phone/tablet: the panel sits directly under the photo, same width, no overlap.
            Desktop: the panel sits against the photo's right edge, stepped down below it,
            so it never covers the people or the role labels. */}
        <div className="relative mt-12 grid grid-cols-1 lg:mt-20 lg:grid-cols-12 lg:pb-16">
          <MaskedImage
            src={WHAT_WE_DO.image.src}
            alt={WHAT_WE_DO.image.alt}
            from="left"
            className="aspect-[1055/893] w-full lg:col-span-8 lg:col-start-1 lg:row-start-1"
          />
          <Reveal
            delay={0.2}
            className="ws-grain relative bg-forest-700 text-ivory-50 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:-mb-16 lg:self-end"
          >
            <div className="grid grid-cols-1 items-center gap-6 px-6 py-8 sm:px-8 sm:py-10 md:grid-cols-[1fr_minmax(0,15rem)] md:gap-8 lg:grid-cols-1 lg:gap-6 lg:p-10">
              <div className="flex flex-col gap-3 md:order-1 lg:order-none">
                <h3 className="ws-display text-[1.35rem] leading-tight sm:text-[1.5rem]">{WHAT_WE_DO.station.title}</h3>
                <p className="max-w-[26rem] leading-relaxed text-ivory-100/85">{WHAT_WE_DO.station.text}</p>
              </div>
              <div className="mx-auto aspect-[4/3] w-full max-w-[16rem] text-ivory-50 md:order-2 lg:order-none lg:max-w-[15rem]">
                <FeatureGlyph name="station" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* 5. Founders: figures set large on charcoal */}
    <section aria-labelledby="founders-title" className="ws-grain relative bg-charcoal-900 text-ivory-50">
      <GridLines tone="charcoal" />
      <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
        <SectionIntro titleLines={FOUNDERS.titleLines} tone="dark" id="founders-title">
          {FOUNDERS.text}
        </SectionIntro>

        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-12 lg:gap-6 lg:pt-16">
          <dl className="grid grid-cols-2 border-t border-ivory-50/20 lg:col-span-5 lg:grid-cols-1 lg:border-t-0">
            {FOUNDERS.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.1}
                className={`flex flex-col gap-3 border-b border-ivory-50/20 py-8 ${i === 1 ? 'border-l pl-6 lg:border-l-0 lg:pl-0' : ''}`}
              >
                <dt className="ws-eyebrow order-2 text-sage-300">{s.label}</dt>
                <dd className="ws-display order-1 text-[clamp(2.6rem,5.2vw,4.75rem)] font-normal leading-none tracking-[-0.035em]">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
          <MaskedImage
            src={FOUNDERS.image.src}
            alt={FOUNDERS.image.alt}
            className="aspect-[4/3] lg:col-span-6 lg:col-start-7 lg:aspect-square"
          />
        </div>
      </div>
    </section>

    {/* 6. People: staggered portraits */}
    <section aria-labelledby="leaders-title" className="relative bg-ivory-200">
      <GridLines tone="ivory" />
      <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 gap-8 border-b border-forest-700/20 pb-12 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-16">
          <div className="lg:col-span-7">
            <h2 id="leaders-title" className="ws-display text-display-lg">
              <MaskedLines lines={LEADERS.titleLines} />
            </h2>
          </div>
          <Reveal delay={0.15} className="text-lead lg:col-span-5">
            {LEADERS.text}
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-16 pt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:pt-20">
          {LEADERS.people.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 0.12}
              className={`ws-photo-hover flex flex-col ${
                i === 0 ? 'lg:col-span-5' : 'md:mt-24 lg:col-span-5 lg:col-start-8 lg:mt-40'
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory-300">
                <img
                  src={p.image}
                  alt={p.name}
                  className="ws-photo h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col gap-4 pt-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-forest-700/20 pb-4">
                  <h3 className="ws-display text-[1.5rem] leading-tight">{p.name}</h3>
                  <p className="ws-eyebrow text-forest-500">{p.role}</p>
                </div>
                <p className="leading-relaxed text-forest-700/90">{p.bio}</p>
                <blockquote className="border-l border-forest-600 pl-5">
                  <p className="ws-display text-[1.1rem] leading-snug text-forest-700">“{p.quote}”</p>
                </blockquote>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* 7. Vision & Mission: two halves of one forest plane */}
    <section aria-label="Vision and Mission" className="ws-grain relative bg-forest-700 text-ivory-50">
      <GridLines tone="forest" />
      <div className="ws-shell relative grid grid-cols-1 md:grid-cols-2">
        {VISION_MISSION.map((v, i) => (
          <Reveal
            key={v.title}
            delay={i * 0.12}
            className={`flex flex-col gap-10 py-16 sm:py-24 lg:py-32 ${
              i === 0 ? 'border-b border-ivory-50/20 md:border-b-0 md:pr-10' : 'md:border-l md:border-ivory-50/20 md:pl-10'
            }`}
          >
            <div className="h-20 w-20 text-sage-200 sm:h-24 sm:w-24">{i === 0 ? <VisionGlyph /> : <MissionGlyph />}</div>
            <h2 className="ws-display text-display-lg">{v.title}</h2>
            <p className="max-w-[30rem] text-lead text-ivory-100/90">{v.text}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* 8. Closing invitation */}
    <section aria-labelledby="about-cta-title" className="relative bg-ivory-200">
      <GridLines tone="ivory" />
      <div className="ws-shell relative grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end lg:gap-6 lg:py-36">
        <h2 id="about-cta-title" className="ws-display text-display-md lg:col-span-8">
          {ABOUT_CTA.title}
        </h2>
        <Reveal delay={0.15} className="flex flex-col gap-8 lg:col-span-4">
          <p className="leading-relaxed text-forest-700/90">{ABOUT_CTA.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link to={ABOUT_CTA.primary.to} className="ws-btn-forest">
              {ABOUT_CTA.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to={ABOUT_CTA.secondary.to} className="ws-btn-line-dark">
              {ABOUT_CTA.secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
)

export default AboutUs
