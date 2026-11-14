import type { ReactNode } from 'react'
import {
  Ambulance,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cog,
  House,
  Info,
  LogOut,
  MapPin,
  Menu,
  PersonStanding,
  Search,
  Settings,
  ShieldUser,
  Star,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { LogoArt } from '../ui/Logo'
import { SERVICE_TILES, TILE_TONE, type Tile } from './tiles'

/**
 * WorkSafe 24/7 app screens rebuilt in the forest / ivory / sage palette.
 * Each screen reproduces the text and features of the original screenshot
 * (see the comment above each one); nothing new is added.
 * Sizes use container query units (cqw), so a screen keeps its proportions
 * inside any PhoneFrame width. Purely illustrative: aria-hidden.
 */

const Screen = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div aria-hidden="true" className={`absolute inset-0 flex flex-col overflow-hidden font-body ${className}`} style={{ containerType: 'inline-size' }}>
    {children}
  </div>
)

/** Status-bar spacer under the camera island, then the app bar */
const AppBar = ({ title, tone = 'forest' }: { title: string; tone?: 'forest' | 'ivory' }) => (
  <div className={`shrink-0 px-[5cqw] pb-[3.5cqw] pt-[11cqw] ${tone === 'forest' ? 'bg-forest-700 text-ivory-50' : 'bg-ivory-50 text-forest-800'}`}>
    <div className="flex items-center justify-between">
      <ChevronLeft className="h-[6cqw] w-[6cqw]" strokeWidth={1.6} />
      <span className="text-[5.2cqw] font-medium tracking-tight">{title}</span>
      <Menu className="h-[6cqw] w-[6cqw]" strokeWidth={1.6} />
    </div>
  </div>
)

/** Stylised street map (no real geography): forest night map with sage roads */
const MapBackdrop = ({ tone = 'dark' }: { tone?: 'dark' | 'light' }) => {
  const dark = tone === 'dark'
  return (
    <svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="300" height="420" fill={dark ? '#0E2C24' : '#E7E4DD'} />
      <g stroke={dark ? '#1F5E4B' : '#C6D2C9'} strokeWidth="1" fill="none" opacity="0.9">
        {[18, 52, 86, 120, 154, 188, 222, 256, 290].map((x) => (
          <path key={`v${x}`} d={`M${x} 0 L${x + 14} 420`} />
        ))}
        {[24, 70, 116, 162, 208, 254, 300, 346, 392].map((y) => (
          <path key={`h${y}`} d={`M0 ${y} L300 ${y - 18}`} />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={`b${i}`} x={(i * 47) % 280} y={(i * 83) % 400} width="22" height="14" fill={dark ? '#133B30' : '#DAD6CC'} stroke="none" />
        ))}
      </g>
      <g stroke={dark ? '#6E8778' : '#8CA294'} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M-10 330 C 80 300, 110 220, 150 200 S 230 120, 320 40" />
        <path d="M60 -10 C 90 90, 140 150, 150 200 S 180 330, 210 430" />
      </g>
    </svg>
  )
}

const Avatar = ({ size = 'md', label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) => {
  const s = size === 'lg' ? 'h-[26cqw] w-[26cqw]' : size === 'md' ? 'h-[13cqw] w-[13cqw]' : 'h-[10cqw] w-[10cqw]'
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-[0.8cqw] border-ivory-50 bg-sage-200 text-forest-700 shadow-sm ${s}`}>
      {label ? (
        <span className={`${size === 'lg' ? 'text-[8cqw]' : 'text-[4.2cqw]'} font-semibold`}>{label}</span>
      ) : (
        <UserRound className="h-[60%] w-[60%]" strokeWidth={1.5} />
      )}
    </span>
  )
}

const Badge = ({ Icon, className = '' }: { Icon: LucideIcon; className?: string }) => (
  <span className={`absolute grid h-[13cqw] w-[13cqw] place-items-center rounded-full border-[0.8cqw] border-ivory-50 bg-ivory-50 text-forest-700 shadow-md ${className}`}>
    <Icon className="h-[55%] w-[55%]" strokeWidth={1.5} />
  </span>
)

const SosRings = ({ children }: { children: ReactNode }) => (
  <div className="relative grid h-[52cqw] w-[52cqw] place-items-center">
    <span className="absolute inset-0 rounded-full border-[0.8cqw] border-sage-300/50" />
    <span className="absolute inset-[12%] rounded-full border-[0.8cqw] border-sage-200/80" />
    <span className="absolute inset-[24%] animate-ws-pulse rounded-full border border-sage-200 motion-reduce:hidden" />
    {children}
  </div>
)

/* ------------------------------------------------------------------ */
/* Original: optimized/mobile1.jpg ("SOS Active", Trigger an SOS)       */
/* ------------------------------------------------------------------ */
export const SosActiveScreen = () => (
  <Screen className="bg-forest-950">
    <AppBar title="SOS Active" />
    <div className="relative flex-1">
      <MapBackdrop />
      <div className="absolute inset-x-0 top-[22%] flex justify-center">
        <SosRings>
          <span className="grid h-[22cqw] w-[22cqw] place-items-center rounded-full bg-ivory-50 text-[6cqw] font-semibold tracking-wide text-forest-700">SOS</span>
        </SosRings>
      </div>
      {/* Trusted contacts and responders around the alert */}
      <span className="absolute left-[10%] top-[6%]"><Avatar label="A" /></span>
      <span className="absolute right-[12%] top-[12%]"><Avatar label="R" /></span>
      <span className="absolute left-[4%] top-[34%]"><Avatar label="P" /></span>
      <span className="absolute bottom-[34%] left-[12%]"><Avatar label="S" /></span>
      <Badge Icon={ShieldUser} className="right-[3%] top-[30%]" />
      <Badge Icon={Ambulance} className="right-[4%] top-[45%]" />
      <Badge Icon={PersonStanding} className="bottom-[33%] right-[14%]" />
      <div className="absolute inset-x-[7%] bottom-[7%] flex flex-col gap-[4cqw]">
        <p className="rounded-[3cqw] bg-forest-900/85 px-[4cqw] py-[3cqw] text-center text-[3.9cqw] leading-snug text-ivory-50">
          Live location, movement &amp; alerts shared in real time.
        </p>
        <span className="rounded-[3cqw] bg-ivory-50 py-[3.6cqw] text-center text-[4.8cqw] font-semibold text-forest-800">Trigger an SOS</span>
      </div>
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: optimized/mobile2.jpg ("Command Station" alert list)       */
/* ------------------------------------------------------------------ */
const CONTACTS = [
  { initial: 'A', name: 'Anjali (Sister)', status: 'Alert Received, 15s ago', pin: true },
  { initial: 'R', name: 'Rajesh (Friend)', status: 'En Route, ETA 5 min', tag: 'Alert Received' },
  { initial: 'P', name: 'Priya (Mother)', status: 'Alert Received', tag: 'Calling User' },
]

export const CommandStationScreen = () => (
  <Screen className="bg-ivory-100">
    <AppBar title="Command Station" />
    <div className="relative h-[48%] shrink-0">
      <MapBackdrop />
      <div className="absolute inset-0 grid place-items-center">
        <SosRings>
          <Avatar size="lg" />
        </SosRings>
      </div>
      <span className="absolute right-[16%] top-[30%] rounded-[2cqw] bg-ivory-50 px-[2.4cqw] py-[1cqw] text-[4.2cqw] font-semibold text-forest-800">SOS!</span>
      <span className="absolute left-[14%] top-[8%]"><Avatar size="sm" label="A" /></span>
      <span className="absolute bottom-[10%] left-[6%]"><Avatar size="sm" label="P" /></span>
      <Badge Icon={ShieldUser} className="right-[4%] top-[6%]" />
      <Badge Icon={Ambulance} className="bottom-[8%] right-[5%]" />
    </div>
    <div className="-mt-[5cqw] flex flex-1 flex-col gap-[2.6cqw] rounded-t-[5cqw] bg-ivory-100 px-[4cqw] pt-[5cqw]">
      {CONTACTS.map((c) => (
        <div key={c.name} className="flex items-center gap-[3cqw] rounded-[3cqw] bg-ivory-50 px-[3cqw] py-[2.6cqw] shadow-[0_1px_0_rgba(25,77,62,0.08)]">
          <Avatar size="sm" label={c.initial} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[4cqw] font-semibold text-forest-900">{c.name}</p>
            <p className="truncate text-[3.2cqw] text-forest-700/75">{c.status}</p>
          </div>
          {c.pin ? (
            <MapPin className="h-[5cqw] w-[5cqw] text-forest-600" strokeWidth={1.6} />
          ) : (
            <span className="flex items-center gap-[1cqw] text-[3cqw] text-forest-600">
              <Check className="h-[4cqw] w-[4cqw] rounded-full bg-forest-600 p-[0.6cqw] text-ivory-50" strokeWidth={3} />
              {c.tag}
              <ChevronRight className="h-[3.6cqw] w-[3.6cqw]" />
            </span>
          )}
        </div>
      ))}
      <div className="mt-auto grid grid-cols-3 gap-[2cqw] pb-[7cqw]">
        {['Call User', 'Share Info', 'Mark Safe'].map((b) => (
          <span key={b} className="rounded-[2.4cqw] bg-ivory-50 py-[3cqw] text-center text-[3.5cqw] font-semibold text-forest-700">{b}</span>
        ))}
      </div>
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: optimized/3.5.jpg ("Get Help", responders confirmed)       */
/* ------------------------------------------------------------------ */
export const GetHelpScreen = () => (
  <Screen className="bg-ivory-100">
    <AppBar title="Get Help" />
    <div className="relative flex-1 px-[5cqw] pt-[5cqw]">
      <div className="flex items-center gap-[2.5cqw] rounded-[3cqw] bg-ivory-300/70 px-[3.5cqw] py-[2.8cqw] text-[3.8cqw] text-forest-800">
        <Search className="h-[4.6cqw] w-[4.6cqw] text-forest-600" strokeWidth={1.8} />
        Briefed User
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 top-[24%] mx-auto h-[86cqw] w-[86cqw]" fill="none" stroke="#56866F" strokeWidth="0.6" strokeDasharray="1.5 2.5">
        <path d="M50 50 L84 22 M50 50 L18 64 M50 50 L82 68" />
      </svg>
      <div className="absolute inset-x-0 top-[26%] mx-auto h-[86cqw] w-[86cqw]">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative block">
            <Avatar size="lg" />
            <Check className="absolute -bottom-[1cqw] -right-[1cqw] h-[9cqw] w-[9cqw] rounded-full border-[0.8cqw] border-ivory-50 bg-forest-600 p-[1.6cqw] text-ivory-50" strokeWidth={3} />
          </span>
        </span>
        {[
          { Icon: ShieldUser, pos: 'right-[2%] top-[8%]' },
          { Icon: Ambulance, pos: 'left-[2%] top-[54%]' },
          { Icon: PersonStanding, pos: 'right-[4%] top-[58%]' },
        ].map(({ Icon, pos }) => (
          <span key={pos} className={`absolute ${pos} grid h-[17cqw] w-[17cqw] place-items-center rounded-full bg-ivory-50 text-forest-700 shadow-md`}>
            <Icon className="h-[50%] w-[50%]" strokeWidth={1.4} />
            <Check className="absolute -bottom-[0.5cqw] -right-[0.5cqw] h-[6cqw] w-[6cqw] rounded-full border-[0.6cqw] border-ivory-50 bg-forest-600 p-[1cqw] text-ivory-50" strokeWidth={3} />
          </span>
        ))}
      </div>
      <div className="absolute inset-x-[4%] bottom-[7%] grid grid-cols-3 gap-[2cqw]">
        {['Call Users', 'Share Info', 'Safety Tips'].map((b) => (
          <span key={b} className="rounded-[2.4cqw] bg-ivory-50 py-[3cqw] text-center text-[3.4cqw] font-semibold text-forest-700">{b}</span>
        ))}
      </div>
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: step1_welcome.webp                                         */
/* ------------------------------------------------------------------ */
export const WelcomeScreen = () => (
  <Screen className="bg-ivory-50">
    <div className="flex flex-1 flex-col justify-center px-[8cqw]">
      <LogoArt className="mx-auto w-[74cqw]" />
    </div>
    <div className="flex flex-col gap-[4cqw] px-[7cqw] pb-[30cqw]">
      <span className="rounded-[3cqw] bg-forest-600 py-[4cqw] text-center text-[4.6cqw] font-semibold text-ivory-50">Get Started</span>
      <span className="rounded-[3cqw] border border-forest-600/60 py-[4cqw] text-center text-[3.9cqw] text-forest-700">
        Already have an account? <b className="font-semibold">Sign in</b>
      </span>
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: step2_profile.webp (side menu)                             */
/* ------------------------------------------------------------------ */
const MENU = [
  { label: 'Home', Icon: House, active: true },
  { label: 'Profile', Icon: ClipboardList },
  { label: 'My Service History', Icon: Cog },
  { label: 'Change MPIN', Icon: Settings },
  { label: 'About Us', Icon: Info },
]

export const ProfileMenuScreen = () => (
  <Screen className="bg-ivory-100">
    <div className="flex items-center gap-[4cqw] bg-sage-200 px-[5cqw] pb-[6cqw] pt-[13cqw]">
      <Avatar size="md" />
      <p className="text-[5.4cqw] font-semibold leading-tight text-forest-900">
        Playstore
        <br />
        Account
      </p>
    </div>
    <div className="flex flex-col gap-[2.4cqw] py-[4cqw]">
      {MENU.map(({ label, Icon, active }) => (
        <span
          key={label}
          className={`mr-[4cqw] flex items-center gap-[4cqw] rounded-r-[3cqw] px-[5cqw] py-[4cqw] text-[4.2cqw] font-medium ${
            active ? 'bg-forest-600 text-ivory-50' : 'bg-ivory-50 text-forest-900'
          }`}
        >
          <Icon className={`h-[5.4cqw] w-[5.4cqw] ${active ? '' : 'text-forest-500'}`} strokeWidth={1.6} />
          {label}
        </span>
      ))}
    </div>
    <div className="mt-auto flex flex-col gap-[2.4cqw] border-t border-forest-700/15 pb-[8cqw] pt-[4cqw]">
      {[
        { label: 'Rate And Review', Icon: Star },
        { label: 'Logout', Icon: LogOut },
      ].map(({ label, Icon }) => (
        <span key={label} className="mr-[4cqw] flex items-center gap-[4cqw] rounded-r-[3cqw] bg-ivory-50 px-[5cqw] py-[4cqw] text-[4.4cqw] font-semibold text-forest-900">
          <Icon className="h-[5.4cqw] w-[5.4cqw] text-forest-600" strokeWidth={1.8} />
          {label}
        </span>
      ))}
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: step3_sos.webp                                             */
/* ------------------------------------------------------------------ */
export const SosActivatedScreen = () => (
  <Screen className="bg-forest-700 text-ivory-50">
    <div className="flex flex-1 flex-col items-center justify-center gap-[5cqw] px-[8cqw] text-center">
      <span className="relative grid h-[30cqw] w-[30cqw] place-items-center rounded-full border-[1.6cqw] border-ivory-50 text-[8cqw] font-semibold tracking-wide">
        <span className="absolute -inset-[4cqw] animate-ws-pulse rounded-full border border-sage-200 motion-reduce:hidden" />
        SOS
      </span>
      <div>
        <p className="text-[6.6cqw] font-semibold tracking-wide">SOS ACTIVATED</p>
        <p className="mt-[1.5cqw] text-[4.2cqw] text-ivory-100/85">Emergency services notified</p>
      </div>
      <div className="w-full rounded-[3cqw] bg-ivory-50/12 px-[4cqw] py-[4cqw]">
        <p className="text-[4.6cqw] font-semibold">Timer: 13 seconds</p>
        <p className="mt-[1cqw] text-[3.8cqw] text-ivory-100/85">Enter MPIN to cancel</p>
      </div>
      <span className="rounded-[2.4cqw] bg-ivory-50 px-[8cqw] py-[3.4cqw] text-[4.4cqw] font-semibold text-forest-700">Cancel with MPIN</span>
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Original: Phone.png (service grid, "worksafe24/7")                   */
/* ------------------------------------------------------------------ */
export const ServicesGridScreen = () => (
  <Screen className="bg-ivory-50">
    <p className="shrink-0 pb-[3cqw] pt-[12cqw] text-center text-[4.6cqw] font-semibold text-forest-900">worksafe24/7</p>
    <div className="grid flex-1 grid-cols-2 content-start gap-[3cqw] px-[5cqw]">
      {SERVICE_TILES.map(({ label, sub, Icon, tone }) => (
        <span key={label} className={`flex aspect-square flex-col items-center justify-center gap-[2cqw] rounded-[3cqw] px-[2cqw] text-center ${TILE_TONE[tone]}`}>
          <Icon className="h-[11cqw] w-[11cqw]" strokeWidth={1.3} />
          <span className="text-[3.9cqw] font-semibold uppercase leading-none tracking-wide">{label}</span>
          {sub && <span className="text-[2.7cqw] uppercase leading-none tracking-wider opacity-80">{sub}</span>}
        </span>
      ))}
    </div>
  </Screen>
)

/* ------------------------------------------------------------------ */
/* Originals: S.webp, AmbulanceM.webp, RA.webp, Sqr.webp (app tiles)    */
/* ------------------------------------------------------------------ */
export const ServiceTile = ({ label, Icon, tone }: Tile) => (
  <span className={`flex aspect-square flex-col items-center justify-center gap-[2cqw] rounded-[3cqw] px-[1.5cqw] text-center ${TILE_TONE[tone]}`}>
    <Icon className="h-[10cqw] w-[10cqw]" strokeWidth={1.3} />
    <span className="text-[3.3cqw] font-semibold uppercase leading-tight tracking-wide">{label}</span>
  </span>
)
