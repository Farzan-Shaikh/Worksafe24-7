import { ArrowUpRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import StaircaseReveal from '../ui/StaircaseReveal'
import Reveal, { MaskedLines } from '../ui/Reveal'
import { JOIN } from '../../data/home'
import { PLAY_STORE_URL } from '../../data/site'

const JoinNetwork = () => (
  <section aria-labelledby="join-title" className="relative bg-ivory-200 text-forest-700">
    <GridLines tone="ivory" />
    <div className="ws-shell relative pb-14 pt-20 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <h2 id="join-title" className="ws-display text-display-lg">
            <MaskedLines lines={['Join the Safety Network']} />
          </h2>
          <Reveal delay={0.2} className="mt-8 flex flex-col items-start gap-8">
            <p className="text-lead">{JOIN.lead}</p>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="ws-btn-forest">
              {JOIN.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Three phrases as a typographic stack */}
        <ol className="border-t border-forest-700/25 lg:col-span-6 lg:self-end">
          {JOIN.phrases.map((p, i) => (
            <Reveal as="li" key={p} delay={0.1 + i * 0.1} className="border-b border-forest-700/25 py-5 sm:py-6">
              <span className="ws-display text-display-md">{p}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>

    {/* Staircase transition straight into the forest footer (the decorative photo was removed) */}
    <StaircaseReveal
      fill="bg-ivory-200"
      base="ws-grain bg-forest-700"
      minDepth={0.08}
      maxDepth={0.92}
      className="h-[clamp(120px,22vw,260px)]"
    />
  </section>
)

export default JoinNetwork
