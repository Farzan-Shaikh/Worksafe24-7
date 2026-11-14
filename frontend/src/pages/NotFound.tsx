import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import { MaskedLines } from '../components/ui/Reveal'
import { CONTACT_NAV, NAV_ITEMS } from '../data/site'

/** A network with one node out of reach: the signal line stops short and the node blinks. */
const LostSignal = () => {
  const reduce = useReducedMotion()
  const nodes = [
    { x: 120, y: 160 },
    { x: 300, y: 70 },
    { x: 300, y: 250 },
    { x: 480, y: 160 },
  ]
  return (
    <svg viewBox="0 0 760 320" className="h-full w-full" fill="none" stroke="#E7E4DD" strokeLinecap="round" aria-hidden="true">
      <g opacity={0.25} strokeWidth={0.6} strokeDasharray="2 6">
        {[60, 120, 300, 480, 640, 700].map((x) => (
          <line key={x} x1={x} y1={10} x2={x} y2={310} />
        ))}
      </g>
      <g strokeWidth={0.9} opacity={0.7}>
        <line x1={120} y1={160} x2={300} y2={70} />
        <line x1={120} y1={160} x2={300} y2={250} />
        <line x1={300} y1={70} x2={480} y2={160} />
        <line x1={300} y1={250} x2={480} y2={160} />
        <line x1={300} y1={70} x2={300} y2={250} strokeDasharray="1 6" />
      </g>
      {/* Broken link to the lost node */}
      <motion.line
        x1={480}
        y1={160}
        x2={600}
        y2={160}
        stroke="#A9BBAF"
        strokeWidth={1.4}
        strokeDasharray="6 8"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {nodes.map((n) => (
        <g key={`${n.x}-${n.y}`}>
          <circle cx={n.x} cy={n.y} r={34} strokeWidth={0.6} opacity={0.4} />
          <circle cx={n.x} cy={n.y} r={22} strokeWidth={1} fill="#1F5E4B" />
          <circle cx={n.x} cy={n.y} r={4} fill="#E7E4DD" stroke="none" />
        </g>
      ))}
      <g className="animate-ws-blink">
        <circle cx={680} cy={160} r={34} strokeWidth={0.8} strokeDasharray="3 6" />
        <circle cx={680} cy={160} r={22} strokeWidth={1} strokeDasharray="3 5" />
        <text x={680} y={165} textAnchor="middle" fill="#E7E4DD" stroke="none" style={{ font: '600 15px Manrope, system-ui, sans-serif' }}>
          ?
        </text>
      </g>
    </svg>
  )
}

const NotFound = () => {
  const { pathname } = useLocation()
  const links = [...NAV_ITEMS, CONTACT_NAV]

  return (
    <PageShell header="overlay" className="bg-forest-700">
      <SEOHead title="Page not found" url={`https://worksafe247.com${pathname}`} />
      <section aria-labelledby="nf-title" className="ws-grain relative min-h-[100svh] overflow-hidden bg-forest-700 text-ivory-50">
        <GridLines tone="forest" />
        <div className="ws-shell relative flex min-h-[100svh] flex-col pb-14 pt-[calc(var(--ws-header-h)+2rem)]">
          <div className="flex items-center justify-between border-b border-ivory-50/20 pb-5">
            <p className="ws-eyebrow text-sage-300">Error 404</p>
            <p className="ws-eyebrow max-w-[60%] truncate text-sage-300" title={pathname}>
              {pathname}
            </p>
          </div>

          <div className="relative -mx-5 my-6 h-[180px] sm:-mx-8 sm:h-[240px] lg:mx-0 lg:h-[300px]">
            <LostSignal />
          </div>

          <div className="mt-auto grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
            <div className="lg:col-span-8">
              <p className="ws-display text-[clamp(4.5rem,13vw,11rem)] font-normal leading-[0.85] tracking-[-0.05em] text-ivory-50/15" aria-hidden="true">
                404
              </p>
              <h1 id="nf-title" className="ws-display mt-3 text-display-lg">
                <MaskedLines lines={['This page is', 'out of range.']} animateOnMount delay={0.2} />
              </h1>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-4">
              <p className="leading-relaxed text-ivory-100/85">
                The address may have changed, or the link may be incomplete. Choose a destination below.
              </p>
              <Link to="/" className="ws-btn-ivory w-fit">
                Back to Home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <nav aria-label="Site pages" className="mt-14 border-t border-ivory-50/20">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {links.map((l, i) => (
                <li key={l.path} className="border-b border-ivory-50/15 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <Link to={l.path} className={`group flex items-baseline py-5 pr-4 lg:px-4 ${i === 0 ? 'lg:pl-0' : ''}`}>
                    <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </PageShell>
  )
}

export default NotFound
