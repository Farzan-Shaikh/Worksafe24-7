import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { FeatureKey } from '../../data/home'

/**
 * Line-drawn technical glyphs for the six features. Stroke uses currentColor.
 *
 * Scroll behaviour (per glyph, measured on the glyph itself):
 * - `draw` 0..1: connecting lines and outlines draw in as the glyph rises to mid-screen,
 *   and un-draw when scrolling back up.
 * - `turn` 0..1 across the glyph's whole pass through the viewport: drives the radar sweep,
 *   triangle ring and gauge needle, so they move with the scroll and stop when it stops.
 * Ambient CSS loops (pulses, blinks, scan line) are paused/resumed by FeaturesGrid
 * through `data-scrolling` (see `.ws-scroll-anim` in index.css); they pause in place, never reset.
 * Reduced motion: drawn and still.
 */

type Drive = { draw: MotionValue<number>; turn: MotionValue<number> }

const origin = (x: number, y: number): CSSProperties => ({ transformOrigin: `${x}px ${y}px` })

const Frame = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 240 180" className="h-full w-full" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

/** 24/7 Safety Station: radar; the sweep turns with scroll */
const Station = ({ draw, turn }: Drive) => {
  const rotate = useTransform(turn, [0, 1], [0, 540])
  return (
    <Frame>
      <motion.circle cx={120} cy={90} r={70} strokeWidth={0.8} opacity={0.4} style={{ pathLength: draw }} />
      <motion.circle cx={120} cy={90} r={52} strokeWidth={1} style={{ pathLength: draw }} />
      <circle cx={120} cy={90} r={32} strokeWidth={0.8} opacity={0.6} />
      <circle cx={120} cy={90} r={6} strokeWidth={1.2} />
      <motion.line x1={40} y1={90} x2={200} y2={90} strokeWidth={0.6} strokeDasharray="2 4" opacity={0.6} style={{ pathLength: draw }} />
      <motion.line x1={120} y1={10} x2={120} y2={170} strokeWidth={0.6} strokeDasharray="2 4" opacity={0.6} style={{ pathLength: draw }} />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        const r1 = i % 6 === 0 ? 62 : 66
        return <line key={i} x1={120 + Math.cos(a) * r1} y1={90 + Math.sin(a) * r1} x2={120 + Math.cos(a) * 70} y2={90 + Math.sin(a) * 70} strokeWidth={0.8} />
      })}
      <motion.g style={{ ...origin(120, 90), rotate }}>
        <line x1={120} y1={90} x2={120} y2={38} strokeWidth={1.6} />
        <path d="M120 90 L120 38 A52 52 0 0 1 156.8 53.2 Z" fill="currentColor" stroke="none" opacity={0.12} />
      </motion.g>
      <circle cx={150} cy={68} r={3} fill="currentColor" stroke="none" className="animate-ws-blink" />
      <circle cx={92} cy={118} r={2.5} fill="currentColor" stroke="none" className="animate-ws-blink" style={{ animationDelay: '1.2s' }} />
    </Frame>
  )
}

/** One responder line, drawing in slightly after the previous one */
const Spoke = ({ x, y, i, draw }: { x: number; y: number; i: number; draw: MotionValue<number> }) => {
  const pathLength = useTransform(draw, [i * 0.12, 0.55 + i * 0.12], [0, 1])
  // Start on the hub's outer ring (r 34) and stop at the responder (r 14), so lines never cross the label
  const len = Math.hypot(x - 120, y - 90)
  const ux = (x - 120) / len
  const uy = (y - 90) / len
  return <motion.line x1={120 + ux * 34} y1={90 + uy * 34} x2={x - ux * 14} y2={y - uy * 14} strokeWidth={0.9} style={{ pathLength }} />
}

/** Emergency SOS: alert pulse; the lines to the responders draw in */
const Sos = ({ draw }: Drive) => {
  const sats = [
    [48, 46],
    [192, 46],
    [48, 134],
    [192, 134],
  ]
  return (
    <Frame>
      {sats.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <Spoke x={x} y={y} i={i} draw={draw} />
          <circle cx={x} cy={y} r={14} strokeWidth={1} />
          <circle cx={x} cy={y} r={4} strokeWidth={1} />
        </g>
      ))}
      {[0, 1.2].map((d) => (
        <circle key={d} cx={120} cy={90} r={22} strokeWidth={1} className="animate-ws-pulse" style={{ ...origin(120, 90), animationDelay: `${d}s` }} />
      ))}
      <motion.circle cx={120} cy={90} r={34} strokeWidth={0.8} opacity={0.5} style={{ pathLength: draw }} />
      <circle cx={120} cy={90} r={22} strokeWidth={1.4} />
      <text x={120} y={95} textAnchor="middle" fill="currentColor" stroke="none" style={{ font: '600 13px Manrope, system-ui, sans-serif', letterSpacing: '0.06em' }}>
        SOS
      </text>
    </Frame>
  )
}

/** Ambulance: the dispatch route draws towards the hospital */
const AmbulanceRoute = ({ draw }: Drive) => (
  <Frame>
    <path d="M30 140 H80 V70 H150 V40 H210" strokeWidth={0.8} opacity={0.3} />
    <motion.path d="M30 140 H80 V70 H150 V40 H192" strokeWidth={1.6} style={{ pathLength: draw }} />
    <path d="M30 140 H80 V70 H150 V40 H210" strokeWidth={1.6} strokeDasharray="14 186" className="animate-ws-dash" style={{ animationDuration: '3.5s' }} opacity={0.6} />
    {[
      [30, 140],
      [80, 140],
      [80, 70],
      [150, 70],
      [150, 40],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width={6} height={6} strokeWidth={0.9} />
    ))}
    <circle cx={210} cy={40} r={18} strokeWidth={1.2} />
    <circle cx={210} cy={40} r={26} strokeWidth={0.6} opacity={0.5} />
    <path d="M210 32 V48 M202 40 H218" strokeWidth={2} />
    <circle cx={30} cy={140} r={10} strokeWidth={1} />
    <circle cx={30} cy={140} r={3} fill="currentColor" stroke="none" />
    <line x1={20} y1={165} x2={220} y2={165} strokeWidth={0.6} strokeDasharray="1 5" opacity={0.6} />
  </Frame>
)

/** PoSH: the triangle draws in; the protective ring turns with scroll */
const Posh = ({ draw, turn }: Drive) => {
  const rotate = useTransform(turn, [0, 1], [0, 180])
  const pts = [
    [120, 30],
    [62, 130],
    [178, 130],
  ]
  return (
    <Frame>
      <motion.path d={`M${pts.map((p) => p.join(' ')).join(' L')} Z`} strokeWidth={0.8} opacity={0.5} style={{ pathLength: draw }} />
      <circle cx={120} cy={97} r={66} strokeWidth={0.6} strokeDasharray="2 5" opacity={0.6} />
      {pts.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={18} strokeWidth={1.1} />
          <circle cx={x} cy={y - 4} r={5} strokeWidth={1} />
          <path d={`M${x - 8} ${y + 9} Q${x} ${y - 1} ${x + 8} ${y + 9}`} strokeWidth={1} />
        </g>
      ))}
      <motion.g style={{ ...origin(120, 97), rotate }}>
        <circle cx={120} cy={97} r={30} strokeWidth={1.2} strokeDasharray="12 7" />
      </motion.g>
      <path d="M120 82 L132 87 V97 C132 105 126 110 120 113 C114 110 108 105 108 97 V87 Z" strokeWidth={1.2} />
    </Frame>
  )
}

/** Roadside Assistance: gauge; the needle follows scroll progress */
const Roadside = ({ draw, turn }: Drive) => {
  const rotate = useTransform(turn, [0, 0.5, 1], [-58, 38, 18])
  return (
    <Frame>
      <motion.circle cx={110} cy={95} r={58} strokeWidth={1.2} style={{ pathLength: draw }} />
      <circle cx={110} cy={95} r={50} strokeWidth={0.6} opacity={0.6} />
      {Array.from({ length: 13 }).map((_, i) => {
        const a = Math.PI * (0.8 + (i / 12) * 1.4)
        return (
          <line
            key={i}
            x1={110 + Math.cos(a) * 42}
            y1={95 + Math.sin(a) * 42}
            x2={110 + Math.cos(a) * (i % 3 === 0 ? 34 : 38)}
            y2={95 + Math.sin(a) * (i % 3 === 0 ? 34 : 38)}
            strokeWidth={0.9}
          />
        )
      })}
      <motion.g style={{ ...origin(110, 95), rotate }}>
        <line x1={110} y1={95} x2={110} y2={56} strokeWidth={1.6} />
      </motion.g>
      <circle cx={110} cy={95} r={4} strokeWidth={1.2} />
      <circle cx={34} cy={60} r={14} strokeWidth={1} />
      <line x1={34} y1={60} x2={42} y2={53} strokeWidth={1} />
      <circle cx={34} cy={130} r={14} strokeWidth={1} />
      <line x1={34} y1={130} x2={28} y2={121} strokeWidth={1} />
      <circle cx={196} cy={70} r={10} strokeWidth={1} />
      <circle cx={196} cy={70} r={4} strokeWidth={1} />
      <circle cx={196} cy={110} r={10} strokeWidth={1} />
      <circle cx={196} cy={110} r={4} strokeWidth={1} />
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={82 + i * 8} cy={170} r={2.6} strokeWidth={0.9} fill={i === 2 || i === 5 ? 'currentColor' : 'none'} />
        ))}
      </g>
    </Frame>
  )
}

/** SafeReturn QR: scanning matrix; the frame draws in */
const Qr = ({ draw }: Drive) => {
  const filled = new Set([1, 4, 6, 9, 12, 15, 17, 20, 22, 27, 30, 33, 35])
  const blink = new Set([4, 20, 33])
  return (
    <Frame>
      {[
        [56, 36],
        [160, 36],
        [56, 120],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={24} height={24} strokeWidth={1.2} />
          <rect x={x + 7} y={y + 7} width={10} height={10} fill="currentColor" stroke="none" />
        </g>
      ))}
      {Array.from({ length: 36 }).map((_, i) => {
        const x = 92 + (i % 6) * 11
        const y = 40 + Math.floor(i / 6) * 15
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={8}
            height={8}
            strokeWidth={0.8}
            fill={filled.has(i) ? 'currentColor' : 'none'}
            className={blink.has(i) ? 'animate-ws-blink' : undefined}
            style={blink.has(i) ? { animationDelay: `${(i % 3) * 0.7}s` } : undefined}
          />
        )
      })}
      <line x1={40} y1={90} x2={200} y2={90} strokeWidth={1.2} className="ws-scan" />
      <motion.rect x={40} y={24} width={160} height={132} strokeWidth={0.6} opacity={0.6} style={{ pathLength: draw }} />
    </Frame>
  )
}

const MAP: Record<FeatureKey, (p: Drive) => JSX.Element> = {
  station: Station,
  sos: Sos,
  ambulance: AmbulanceRoute,
  posh: Posh,
  roadside: Roadside,
  qr: Qr,
}

const FeatureGlyph = ({ name }: { name: FeatureKey }) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: drawRaw } = useScroll({ target: ref, offset: ['start 0.95', 'center 0.5'] })
  const { scrollYProgress: turnRaw } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drawSpring = useSpring(drawRaw, { stiffness: 120, damping: 26 })
  const turnSpring = useSpring(turnRaw, { stiffness: 90, damping: 24 })
  // Reduced motion: fully drawn, still
  const draw = useTransform(drawSpring, (v) => (reduce ? 1 : v))
  const turn = useTransform(turnSpring, (v) => (reduce ? 0.5 : v))
  const Glyph = MAP[name]
  return (
    <div ref={ref} className="h-full w-full">
      <Glyph draw={draw} turn={turn} />
    </div>
  )
}

export default FeatureGlyph
