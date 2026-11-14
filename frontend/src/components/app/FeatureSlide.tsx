import { APP_SLIDES } from '../../data/home'
import { FEATURE_ICONS, PHOTO_POSITION } from './featureIcons'

type Slide = (typeof APP_SLIDES)[number]

/**
 * Desktop feature banner: monochrome photograph + forest information panel.
 * (Phones use the structured list in AppShowcase instead of this plate.)
 */
const FeatureSlide = ({ slide }: { slide: Slide }) => {
  const icons = FEATURE_ICONS[slide.key]
  return (
    <div className="absolute inset-0 grid grid-cols-[42%_1fr] bg-forest-800">
      <img
        src={slide.photo}
        alt=""
        className={`h-full w-full object-cover ${PHOTO_POSITION[slide.key]}`}
        loading="lazy"
        decoding="async"
      />
      <div className="ws-grain relative flex flex-col justify-center gap-[6%] bg-forest-700 px-[8%] py-[8%] text-ivory-50">
        <h3 className="ws-display text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.1] text-ivory-50">{slide.title}</h3>
        <ul className="flex flex-col gap-[0.6em] text-[clamp(0.85rem,1.1vw,1rem)] leading-snug text-ivory-100/90">
          {slide.features.map((f, i) => {
            const Icon = icons[i]
            return (
              <li key={f} className="flex items-center gap-3 border-t border-ivory-50/15 pt-[0.6em]">
                <Icon aria-hidden="true" className="h-[1.15em] w-[1.15em] shrink-0 text-sage-200" strokeWidth={1.5} />
                <span>{f}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FeatureSlide
