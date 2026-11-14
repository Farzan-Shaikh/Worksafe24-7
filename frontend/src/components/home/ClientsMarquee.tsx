import Reveal, { MaskedLines } from '../ui/Reveal'
import { CLIENTS, CLIENTS_COPY } from '../../data/home'

type Client = (typeof CLIENTS)[number]

const Row = ({ items, reverse = false }: { items: Client[]; reverse?: boolean }) => (
  <div className="group/row overflow-hidden border-b border-forest-700/15">
    <ul
      className={`ws-track flex bg-ivory-200 ${reverse ? 'animate-ws-marquee-reverse' : 'animate-ws-marquee'} group-hover/row:[animation-play-state:paused] motion-reduce:animate-none`}
    >
      {[...items, ...items].map((c, i) => (
        <li
          key={`${c.title}-${i}`}
          aria-hidden={i >= items.length ? 'true' : undefined}
          className="group flex h-24 w-40 shrink-0 items-center justify-center border-r border-forest-700/15 px-6 sm:h-32 sm:w-56 sm:px-9"
        >
          <img
            src={c.image}
            alt={i >= items.length ? '' : c.title}
            className="max-h-full max-w-full object-contain opacity-70 mix-blend-multiply grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  </div>
)

const ClientsMarquee = () => {
  const half = Math.ceil(CLIENTS.length / 2)
  return (
    <section aria-labelledby="clients-title" className="relative bg-ivory-200 text-forest-700">
      <div className="ws-shell grid grid-cols-1 gap-6 pb-12 pt-20 sm:pt-28 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-7">
          <h2 id="clients-title" className="ws-display text-display-md">
            <MaskedLines lines={[CLIENTS_COPY.title]} />
          </h2>
        </div>
        <Reveal delay={0.15} className="text-lead lg:col-span-5 lg:pb-2">
          {CLIENTS_COPY.subtitle}
        </Reveal>
      </div>
      <div className="border-t border-forest-700/15 pb-20 sm:pb-28">
        <Row items={CLIENTS.slice(0, half)} />
        <Row items={CLIENTS.slice(half)} reverse />
      </div>
    </section>
  )
}

export default ClientsMarquee
