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

/** Icons follow the original banners (same symbol per line, redrawn as line icons) */
export const FEATURE_ICONS: Record<AppSlideKey, LucideIcon[]> = {
  sos: [Siren, MapPin, Phone, Users, Video],
  nearby: [Hospital, ShieldUser, Fuel, Coffee, ShoppingCart],
  ambulance: [Siren, Clock, Building2, HeartPulse, ClipboardList],
  qr: [QrCode, Users, PackageCheck, Gift],
}

/** Focal point for each slide photo, so the subject stays in frame on desktop */
export const PHOTO_POSITION: Record<AppSlideKey, string> = {
  sos: 'object-[50%_30%]',
  nearby: 'object-[45%_20%]',
  ambulance: 'object-[60%_50%]',
  qr: 'object-[50%_40%]',
}
