import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import MaskedImage from '../ui/MaskedImage'
import SectionIntro from '../ui/SectionIntro'
import { CTA } from '../../data/home'
import { PLAY_STORE_URL } from '../../data/site'

const ClosingCta = () => (
  <section aria-labelledby="cta-title" className="ws-grain relative bg-charcoal-900 text-ivory-50">
    <GridLines tone="charcoal" />
    <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
      <SectionIntro titleLines={CTA.titleLines} tone="dark" id="cta-title">
        <p>{CTA.text}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link to={CTA.contact.to} className="ws-btn-ivory">
            {CTA.contact.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-85"
          >
            <img src="/images/PlayStore.webp" alt="Get it on Google Play" className="h-12 w-auto" loading="lazy" />
          </a>
        </div>
      </SectionIntro>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <MaskedImage
          src={CTA.image}
          alt="Safe and Happy User"
          className="mt-10 aspect-[4/3] sm:aspect-[21/9] lg:col-span-10 lg:col-start-3 lg:mt-16"
        />
      </div>
    </div>
  </section>
)

export default ClosingCta
