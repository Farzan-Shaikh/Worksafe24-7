import { Ambulance, Bell, Car, Headphones, LocateFixed, Newspaper, QrCode, ShieldCheck, type LucideIcon } from 'lucide-react'

export type TileTone = 'forest' | 'sage' | 'ivory' | 'charcoal'
export type Tile = { label: string; sub?: string; Icon: LucideIcon; tone: TileTone }

/** Original: S.webp, AmbulanceM.webp, RA.webp, Sqr.webp (home-screen tiles) */
export const HOME_TILES: Tile[] = [
  { label: 'SOS', Icon: Bell, tone: 'forest' },
  { label: 'Ambulance', Icon: Ambulance, tone: 'sage' },
  { label: 'Road Assistance', Icon: Car, tone: 'ivory' },
  { label: 'Safe Return QR', Icon: QrCode, tone: 'charcoal' },
]

/** Original: Phone.png (service grid, labels as printed on the tiles) */
export const SERVICE_TILES: Tile[] = [
  { label: 'SOS', Icon: Bell, tone: 'forest' },
  { label: 'Ambulance', sub: 'Service', Icon: Ambulance, tone: 'sage' },
  { label: 'Roadside', sub: 'Assistance', Icon: Car, tone: 'ivory' },
  { label: 'Travel Safe', sub: 'My Virtual Guard', Icon: ShieldCheck, tone: 'charcoal' },
  { label: 'Safety QR', Icon: QrCode, tone: 'sage' },
  { label: 'News', sub: 'Board', Icon: Newspaper, tone: 'forest' },
  { label: 'Find My Spot', sub: 'Locate Me', Icon: LocateFixed, tone: 'ivory' },
  { label: 'Customer', sub: 'Support', Icon: Headphones, tone: 'sage' },
]

export const TILE_TONE: Record<TileTone, string> = {
  forest: 'bg-forest-600 text-ivory-50',
  sage: 'bg-sage-200 text-forest-800',
  ivory: 'bg-ivory-200 text-forest-800',
  charcoal: 'bg-charcoal-800 text-ivory-50',
}
