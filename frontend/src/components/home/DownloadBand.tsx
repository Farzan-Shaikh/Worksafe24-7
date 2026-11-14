import { ArrowUpRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import { MaskedLines } from '../ui/Reveal'
import Reveal from '../ui/Reveal'
import { DOWNLOAD } from '../../data/home'
import { PLAY_STORE_URL } from '../../data/site'

/** Concentric "signal" rings cropped by the section edge (decorative). */
const Rings = () => (
  <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true" focusable="false">
    <g fill="none" stroke="#E7E4DD" strokeLinecap="round">
      {[290, 240, 190, 140, 90].map((r, i) => (
        <circle key={r} cx={300} cy={300} r={r} strokeWidth={0.7} opacity={0.12 + i * 0.07} />
      ))}
      <g className="animate-ws-spin-slow" style={{ transformOrigin: '300px 300px' }}>
        <circle cx={300} cy={300} r={240} strokeWidth={1.4} strokeDasharray="60 1448" opacity={0.8} />
      </g>
      <g className="animate-ws-spin-slower" style={{ transformOrigin: '300px 300px', animationDirection: 'reverse' }}>
        <circle cx={300} cy={300} r={140} strokeWidth={1.4} strokeDasharray="30 850" opacity={0.8} />
      </g>
      <circle cx={300} cy={300} r={40} strokeWidth={1} />
      <circle cx={300} cy={300} r={6} fill="#E7E4DD" stroke="none" />
    </g>
  </svg>
)

const DownloadBand = () => (
  <section aria-labelledby="download-title" className="ws-grain relative overflow-hidden bg-forest-700 text-ivory-50">
    <GridLines tone="forest" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-[30%] top-1/2 aspect-square w-[90%] -translate-y-1/2 sm:-right-[12%] sm:w-[60%] lg:-right-[6%] lg:w-[46%]"
    >
      <Rings />
    </div>

    <div className="ws-shell relative grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end lg:py-36">
      <div className="lg:col-span-8">
        <h2 id="download-title" className="ws-display text-display-md">
          <MaskedLines lines={DOWNLOAD.titleLines} />
        </h2>
      </div>
      <Reveal delay={0.2} className="lg:col-span-4 lg:flex lg:justify-end">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 rounded-full border border-ivory-50/30 bg-forest-800/60 py-2 pl-2 pr-5 backdrop-blur-sm transition-colors duration-300 hover:border-ivory-50 hover:bg-forest-800"
        >
          <img src="/images/PlayStore.webp" alt="Get it on Google Play" className="h-12 w-auto sm:h-14" loading="lazy" />
          <ArrowUpRight
            className="h-5 w-5 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </div>
  </section>
)

export default DownloadBand
