import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Phone, Star } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import MaskedImage from '../components/ui/MaskedImage'
import Reveal, { MaskedLines } from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import StepEdge from '../components/ui/StepEdge'
import SafetyNetworkFigure from '../components/illustrations/SafetyNetworkFigure'
import PhoneFrame from '../components/ui/PhoneFrame'
import { ServicesGridScreen } from '../components/app/AppScreens'
import PlanComparison from '../components/platform/PlanComparison'
import {
  ADVANTAGES,
  BENEFITS,
  COMMUNITY,
  OFFER,
  PLANS_COPY,
  PLATFORM_CTA,
  PLATFORM_HERO,
  WHAT_IS,
} from '../data/platform'
import { PLAY_STORE_URL } from '../data/site'


const PlatformServices = () => (
  <PageShell header="overlay">
    <SEOHead
      title="Platform Services"
      description={`${OFFER.before}${OFFER.strong}${OFFER.after}`}
      url="https://worksafe247.com/platform-services"
    />

    {/* 1. Hero with the network drawing (shown whole) */}
    <PageHero
      tone="forest"
      size="lg"
      titleLines={PLATFORM_HERO.titleLines}
      crumbs={[{ name: 'Home', to: '/' }, { name: 'Platform' }]}
      art={
        <div className="pt-8 opacity-85">
          <SafetyNetworkFigure maxWidth="max-w-[min(760px,78svh)]" />
        </div>
      }
    />

    {/* 2. What is WorkSafe 24/7 ? */}
    <section aria-labelledby="whatis-title" className="relative bg-ivory-200">
      <GridLines tone="ivory" />
      <div className="ws-shell relative grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-36">
        <div className="flex flex-col lg:col-span-6">
          <h2 id="whatis-title" className="ws-display text-display-lg">
            <MaskedLines lines={WHAT_IS.titleLines} />
          </h2>
          <ol className="mt-12 border-t border-forest-700/25 lg:mt-auto">
            {WHAT_IS.points.map((p, i) => (
              <Reveal
                as="li"
                key={p}
                delay={i * 0.1}
                className="border-b border-forest-700/25 py-6"
              >
                <span className="ws-display text-[1.25rem] leading-snug sm:text-[1.5rem]">{p}</span>
              </Reveal>
            ))}
          </ol>
        </div>
        <MaskedImage
          src={WHAT_IS.image.src}
          alt={WHAT_IS.image.alt}
          className="aspect-[623/560] lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>

    {/* 3. What do we offer? A statement on charcoal */}
    <section aria-labelledby="offer-title" className="ws-grain relative bg-charcoal-900 text-ivory-50">
      <StepEdge fill="bg-ivory-200" height={110} />
      <GridLines tone="charcoal" />
      <div className="ws-shell relative grid grid-cols-1 gap-8 pb-20 pt-6 sm:pb-28 lg:grid-cols-12 lg:gap-6 lg:pb-36">
        <div className="lg:col-span-3">
          {/* Original section heading, now set as a real heading */}
          <h2 id="offer-title" className="ws-display text-display-sm text-sage-200">
            {OFFER.title}
          </h2>
        </div>
        <Reveal className="lg:col-span-9">
          <p className="ws-display max-w-[52rem] text-[clamp(1.3rem,2.2vw,2.1rem)] font-normal leading-[1.3] tracking-[-0.015em] text-ivory-50">
            {OFFER.before}
            <strong className="font-medium text-sage-200">{OFFER.strong}</strong>
            {OFFER.after}
          </p>
        </Reveal>
      </div>
    </section>

    {/* 4. Benefits: two-column numbered index */}
    <section aria-labelledby="benefits-title" className="relative bg-ivory-100">
      <GridLines tone="ivory" />
      <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
        <SectionIntro
          titleLines={[BENEFITS.title]}
          id="benefits-title"
        />
        <ol className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
          {BENEFITS.items.map((b, i) => (
            <Reveal
              as="li"
              key={b.title}
              delay={(i % 2) * 0.08}
              className="group grid grid-cols-[1fr_auto] items-start gap-x-4 border-b border-forest-700/20 py-7 sm:py-8"
            >
              <div>
                <h3 className="ws-display text-[1.25rem] leading-tight transition-colors duration-500 group-hover:text-forest-500 sm:text-[1.4rem]">
                  {b.title}
                </h3>
                <p className="mt-3 max-w-[30rem] leading-relaxed text-forest-700/85">{b.desc}</p>
              </div>
              <b.icon
                aria-hidden="true"
                strokeWidth={1.1}
                className="mt-1 h-7 w-7 text-forest-600 transition-transform duration-700 ease-editorial group-hover:-rotate-6 group-hover:scale-110"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* 5. Advantages: a five-column forest band */}
    <section aria-labelledby="adv-title" className="ws-grain relative bg-forest-700 text-ivory-50">
      <GridLines tone="forest" />
      <div className="ws-shell relative py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 gap-6 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <h2 id="adv-title" className="ws-display text-display-lg">
              <MaskedLines lines={ADVANTAGES.titleLines} />
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-1 border-t border-ivory-50/20 sm:grid-cols-2 lg:grid-cols-5">
          {ADVANTAGES.items.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.07}
              className={`flex flex-col gap-6 border-b border-ivory-50/20 py-8 sm:px-5 lg:min-h-[19rem] lg:border-b-0 lg:py-10 ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i > 0 ? 'lg:border-l' : 'lg:pl-0'} border-ivory-50/20 ${i % 2 === 0 ? 'sm:pl-0' : ''}`}
            >
              <a.icon aria-hidden="true" strokeWidth={1.1} className="h-7 w-7 text-sage-200" />
              <h3 className="ws-display text-[1.2rem] leading-tight lg:mt-auto">{a.title}</h3>
              <p className="text-ivory-100/80">{a.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* 6. Subscription plans */}
    <section aria-labelledby="plans-title" className="relative bg-ivory-50">
      <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 gap-6 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-7">
            <h2 id="plans-title" className="ws-display text-display-lg">
              <MaskedLines lines={[PLANS_COPY.title]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="text-[1.02rem] leading-relaxed text-forest-700/90 lg:col-span-5">
            {PLANS_COPY.noteBefore}
            <span className="font-medium underline decoration-1 underline-offset-4">{PLANS_COPY.noteEmphasis}</span>
            {PLANS_COPY.noteAfter}
          </Reveal>
        </div>

        <Reveal>
          <PlanComparison />
        </Reveal>

        <div className="mt-12 flex justify-end">
          <Link to={PLANS_COPY.cta.to} className="ws-btn-dark">
            {PLANS_COPY.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    {/* 7. Community + app */}
    <section aria-labelledby="community-title" className="relative overflow-hidden bg-ivory-200">
      <GridLines tone="ivory" />
      <div className="ws-shell relative grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-32">
        <Reveal className="order-2 flex justify-center lg:order-1 lg:col-span-4">
          {/* Rebuilt app service grid (replaces the old red/pastel Phone.png) */}
          <div role="img" aria-label={COMMUNITY.imageAlt} className="w-[min(64vw,280px)] -rotate-[4deg]">
            <PhoneFrame>
              <ServicesGridScreen />
            </PhoneFrame>
          </div>
        </Reveal>
        <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-7 lg:col-start-6">
          <h2 id="community-title" className="ws-display text-display-md">
            {COMMUNITY.before}
            <span className="whitespace-nowrap text-forest-500">{COMMUNITY.highlight}</span>
            {COMMUNITY.after}
          </h2>
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-6">
            <span className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-forest-600 text-forest-600" strokeWidth={1} />
              ))}
            </span>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-85">
              <img src="/images/PlayStore.webp" alt="Get it on Google Play" className="h-14 w-auto" loading="lazy" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>

    {/* 8. Closing CTA */}
    <section aria-labelledby="platform-cta-title" className="ws-grain relative bg-forest-700 text-ivory-50">
      <GridLines tone="forest" />
      <div className="ws-shell relative grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end lg:gap-6 lg:py-36">
        <h2 id="platform-cta-title" className="ws-display text-display-md lg:col-span-8">
          {PLATFORM_CTA.title}
        </h2>
        <Reveal delay={0.15} className="flex flex-col gap-8 lg:col-span-4">
          <p className="leading-relaxed text-ivory-100/85">{PLATFORM_CTA.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link to={PLATFORM_CTA.primary.to} className="ws-btn-ivory">
              {PLATFORM_CTA.primary.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={PLATFORM_CTA.phone.href} className="ws-btn-line-light">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PLATFORM_CTA.phone.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
)

export default PlatformServices
