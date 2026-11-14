import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import { MaskedLines } from '../ui/Reveal'
import Reveal from '../ui/Reveal'
import { SERVICES } from '../../data/home'
import { PLAY_STORE_URL } from '../../data/site'

const pad = (n: number) => String(n).padStart(2, '0')

/** Radial dial: one node per service, the hovered/focused one lights up. */
const ServiceDial = ({ active }: { active: number | null }) => {
  const n = SERVICES.items.length
  const R = 120
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#E7E4DD" strokeLinecap="round">
        <circle cx={160} cy={160} r={150} strokeWidth={0.6} opacity={0.25} />
        <circle cx={160} cy={160} r={R} strokeWidth={0.8} opacity={0.5} />
        <circle cx={160} cy={160} r={70} strokeWidth={0.6} opacity={0.35} strokeDasharray="2 5" />
        <g className="animate-ws-spin-slower" style={{ transformOrigin: '160px 160px' }}>
          <circle cx={160} cy={160} r={150} strokeWidth={1.2} strokeDasharray="30 912" />
        </g>
        {SERVICES.items.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const x = 160 + Math.cos(a) * R
          const y = 160 + Math.sin(a) * R
          const on = active === i
          return (
            <g key={s}>
              <line
                x1={160}
                y1={160}
                x2={x}
                y2={y}
                strokeWidth={on ? 1.2 : 0.6}
                opacity={on ? 1 : 0.25}
                stroke={on ? '#F6F4EF' : '#E7E4DD'}
                style={{ transition: 'all 0.4s' }}
              />
              <circle
                cx={x}
                cy={y}
                r={on ? 9 : 5}
                fill={on ? '#F6F4EF' : '#1F5E4B'}
                stroke={on ? '#F6F4EF' : '#E7E4DD'}
                strokeWidth={1}
                style={{ transition: 'all 0.4s' }}
              />
            </g>
          )
        })}
        <circle cx={160} cy={160} r={34} strokeWidth={1} />
        <text
          x={160}
          y={166}
          textAnchor="middle"
          fill="#F6F4EF"
          stroke="none"
          style={{ font: '600 17px Manrope, system-ui, sans-serif', fontVariantNumeric: 'tabular-nums' }}
        >
          {active === null ? pad(n) : pad(active + 1)}
        </text>
      </g>
    </svg>
  )
}

const ServicesIndex = () => {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section aria-labelledby="services-title" className="ws-grain relative bg-forest-700 text-ivory-50">
      <GridLines tone="forest" />
      <div className="ws-shell relative grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-36">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--ws-header-h)+2.5rem)]">
            <h2 id="services-title" className="ws-display text-display-lg">
              <MaskedLines lines={['Explore Our', 'Services']} />
            </h2>
            <Reveal delay={0.2}>
              <p className="ws-display mt-6 text-display-sm text-sage-300">{SERVICES.kicker}</p>
            </Reveal>
            <div className="mt-12 hidden aspect-square w-full max-w-[300px] lg:block">
              <ServiceDial active={active} />
            </div>
          </div>
        </div>

        <ol className="border-t border-ivory-50/20 lg:col-span-7" onMouseLeave={() => setActive(null)}>
          {SERVICES.items.map((label, i) => (
            <li key={label} className="border-b border-ivory-50/20">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}: open WorkSafe 24/7 on Google Play`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative flex items-center gap-5 overflow-hidden px-1 py-[1.1rem] sm:gap-8 sm:py-5"
              >
                {/* Ivory fill rises on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ivory-100 transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="ws-display relative flex-1 text-[1.3rem] leading-tight transition-[color,transform] duration-500 ease-editorial group-hover:translate-x-2 group-hover:text-forest-700 group-focus-visible:text-forest-700 sm:text-[1.75rem] lg:text-[2rem]">
                  {label}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative mr-2 h-5 w-5 shrink-0 text-ivory-50/60 transition-all duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest-700 group-focus-visible:text-forest-700 sm:h-6 sm:w-6"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ServicesIndex
