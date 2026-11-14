import {
  Building2,
  ClipboardList,
  Clock,
  Coffee,
  Fuel,
  Gift,
  HeartPulse,
  Hospital,
  MapPin,
  PackageCheck,
  Phone,
  QrCode,
  ShieldUser,
  ShoppingCart,
  Siren,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'
import type { AppSlideKey } from '../../data/home'
import { APP_SLIDES } from '../../data/home'

/** Icons follow the original banners (same symbol per line, redrawn as line icons) */
const ICONS: Record<AppSlideKey, LucideIcon[]> = {
  sos: [Siren, MapPin, Phone, Users, Video],
  nearby: [Hospital, ShieldUser, Fuel, Coffee, ShoppingCart],
  ambulance: [Siren, Clock, Building2, HeartPulse, ClipboardList],
  qr: [QrCode, Users, PackageCheck, Gift],
}

type Slide = (typeof APP_SLIDES)[number]

/**
 * Rebuilt feature banner: monochrome photograph + forest information panel.
 * Replaces the old flattened banners with red headings and blue icons.
 */
const FeatureSlide = ({ slide }: { slide: Slide }) => {
  const icons = ICONS[slide.key]
  return (
    <div className="absolute inset-0 grid grid-rows-[40%_1fr] bg-forest-800 sm:grid-cols-[42%_1fr] sm:grid-rows-1">
      <img src={slide.photo} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="ws-grain relative flex flex-col justify-center gap-4 bg-forest-700 px-[7%] py-[6%] text-ivory-50 sm:gap-[6%] sm:px-[8%] sm:py-[8%]">
        <h3 className="ws-display text-[clamp(1.25rem,2.6vw,2.1rem)] leading-[1.05] text-ivory-50">{slide.title}</h3>
        <ul className="flex flex-col gap-[0.6em] text-[clamp(0.82rem,1.25vw,1.02rem)] leading-snug text-ivory-100/90">
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
