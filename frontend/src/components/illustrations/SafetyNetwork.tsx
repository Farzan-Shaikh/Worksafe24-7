import { motion, useReducedMotion } from 'framer-motion'
import { TriangleAlert, Ambulance, Navigation, Users, Flame, IdCard, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

/**
 * Hero illustration: a drafted "safety network".
 * A central SOS hub sends signals along thin lines to six service nodes
 * (the six services listed in the hero). Construction lines, crosshair
 * markers and slider bars echo a technical drawing.
 *
 * Two arrangements of the same composition:
 * - `wide`: landscape spread for tablet and desktop (viewBox 1200 x 520)
 * - `compact`: the six nodes on a hexagon around the hub for phones (viewBox 660 x 580)
 * Both are rendered with `meet`, so nothing is ever cropped: the parent
 * only has to keep the matching aspect ratio (see SAFETY_NETWORK_RATIO).
 * Decorative: the same information is available as text in the hero.
 */

type Layout = 'wide' | 'compact'
type Node = { x: number; y: number; Icon: LucideIcon }

const ICONS = [TriangleAlert, Ambulance, Navigation, Users, Flame, IdCard]

const hexNodes = (cx: number, cy: number, r: number): Node[] =>
  ICONS.map((Icon, i) => {
    const a = (-90 + i * 60) * (Math.PI / 180)
    return { x: Math.round(cx + Math.cos(a) * r), y: Math.round(cy + Math.sin(a) * r), Icon }
  })

const LAYOUTS: Record<
  Layout,
  {
    viewBox: string
    hub: { x: number; y: number }
    nodes: Node[]
    guides: number[]
    guideTop: number
    guideBottom: number
    sliders: boolean
  }
> = {
  wide: {
    viewBox: '0 0 1200 520',
    hub: { x: 600, y: 255 },
    nodes: [
      { x: 235, y: 255, Icon: ICONS[0] },
      { x: 395, y: 120, Icon: ICONS[1] },
      { x: 410, y: 395, Icon: ICONS[2] },
      { x: 805, y: 120, Icon: ICONS[3] },
      { x: 790, y: 395, Icon: ICONS[4] },
      { x: 965, y: 255, Icon: ICONS[5] },
    ],
    guides: [120, 235, 395, 600, 805, 965, 1080],
    guideTop: 26,
    guideBottom: 494,
    sliders: true,
  },
  compact: {
    viewBox: '-30 -10 660 580',
    hub: { x: 300, y: 280 },
    nodes: hexNodes(300, 280, 192),
    guides: [10, 135, 300, 465, 590],
    guideTop: 6,
    guideBottom: 554,
    sliders: false,
  },
}

const IVORY = '#E7E4DD'
const PAPER = '#F6F4EF'
const SAGE = '#C6D2C9'
const FOREST = '#1F5E4B'
const FONT = '600 15px Manrope, system-ui, sans-serif'

const centerOrigin: CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' }

const Crosshair = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x - 9} y={y - 9} width={18} height={18} fill="none" strokeWidth={0.75} />
    <circle cx={x} cy={y} r={5} fill="none" strokeWidth={0.75} />
    <line x1={x} y1={y - 5} x2={x} y2={y + 5} strokeWidth={0.75} />
  </g>
)

const SafetyNetwork = ({ className = '', layout = 'wide' }: { className?: string; layout?: Layout }) => {
  const reduce = useReducedMotion()
  const L = LAYOUTS[layout]
  const HUB = L.hub
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <svg viewBox={L.viewBox} preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true" focusable="false">
      <g stroke={IVORY} fill="none" strokeLinecap="round">
        {/* Construction guides */}
        <g opacity={0.28}>
          {L.guides.map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1={L.guideTop}
              x2={x}
              y2={L.guideBottom}
              strokeWidth={0.6}
              strokeDasharray="2 5"
              {...draw(0.1 + i * 0.05)}
            />
          ))}
          {L.guides.map((x) => (
            <g key={`m-${x}`}>
              <Crosshair x={x} y={L.guideTop} />
              <Crosshair x={x} y={L.guideBottom} />
            </g>
          ))}
        </g>

        {/* Slider bars (drafting detail, wide layout only) */}
        {L.sliders && (
          <g opacity={0.45} strokeWidth={0.8}>
            <rect x={860} y={181} width={250} height={9} rx={4.5} />
            <circle cx={1110} cy={185.5} r={11} />
            <circle cx={1110} cy={185.5} r={4} />
            <rect x={90} y={327} width={190} height={9} rx={4.5} />
            <rect x={96} y={321} width={34} height={21} />
            <line x1={113} y1={342} x2={113} y2={420} />
            <rect x={104} y={420} width={18} height={40} />
          </g>
        )}

        {/* Faint outer orbit circles around each node */}
        <g opacity={0.18} strokeWidth={0.7}>
          {L.nodes.map((n) => (
            <circle key={`o-${n.x}-${n.y}`} cx={n.x} cy={n.y} r={74} />
          ))}
        </g>

        {/* Mesh between neighbouring nodes */}
        <g opacity={0.35} strokeWidth={0.7} strokeDasharray="1 6">
          {L.nodes.map((n, i) => {
            const next = L.nodes[(i + 1) % L.nodes.length]
            return <line key={`mesh-${n.x}-${n.y}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} />
          })}
        </g>

        {/* Spokes: hub -> nodes */}
        <g opacity={0.7} strokeWidth={0.9}>
          {L.nodes.map((n, i) => (
            <motion.line key={`s-${n.x}-${n.y}`} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} {...draw(0.5 + i * 0.08)} />
          ))}
        </g>

        {/* Travelling signals (ivory pulses along each spoke) */}
        <g stroke={PAPER} strokeWidth={2.2}>
          {L.nodes.map((n, i) => (
            <line
              key={`sig-${n.x}-${n.y}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              strokeDasharray="6 194"
              className="animate-ws-dash"
              style={{ animationDelay: `${i * -0.9}s`, animationDuration: `${5 + (i % 3)}s` }}
            />
          ))}
        </g>

        {/* Hub */}
        <motion.g {...appear(0.3)} style={centerOrigin}>
          <g className="animate-ws-spin-slower" style={centerOrigin}>
            <circle cx={HUB.x} cy={HUB.y} r={118} strokeWidth={0.7} strokeDasharray="2 8" opacity={0.6} />
          </g>
          <circle cx={HUB.x} cy={HUB.y} r={92} strokeWidth={0.8} opacity={0.5} />
          <circle cx={HUB.x} cy={HUB.y} r={62} strokeWidth={1} />
          <circle cx={HUB.x} cy={HUB.y} r={54} strokeWidth={0.6} opacity={0.6} />
          <g className="animate-ws-spin-slow" style={centerOrigin}>
            <circle cx={HUB.x} cy={HUB.y} r={76} strokeWidth={1.2} strokeDasharray="40 200" opacity={0.9} />
          </g>
          {/* Pulse rings */}
          {[0, 1.1, 2.2].map((d) => (
            <circle
              key={d}
              cx={HUB.x}
              cy={HUB.y}
              r={30}
              stroke={SAGE}
              strokeWidth={1}
              className="animate-ws-pulse"
              style={{ ...centerOrigin, animationDelay: `${d}s` }}
            />
          ))}
          <circle cx={HUB.x} cy={HUB.y} r={30} fill={PAPER} stroke="none" />
          <text x={HUB.x} y={HUB.y + 5} textAnchor="middle" fill={FOREST} stroke="none" style={{ font: FONT, letterSpacing: '0.08em' }}>
            SOS
          </text>
        </motion.g>

        {/* Nodes */}
        {L.nodes.map((n, i) => (
          <motion.g key={`n-${n.x}-${n.y}`} {...appear(0.9 + i * 0.1)} style={centerOrigin}>
            <circle cx={n.x} cy={n.y} r={44} strokeWidth={0.7} opacity={0.5} />
            <circle cx={n.x} cy={n.y} r={33} strokeWidth={1} fill={FOREST} />
            <circle cx={n.x} cy={n.y} r={27} strokeWidth={0.6} opacity={0.55} />
            <n.Icon x={n.x - 11} y={n.y - 11} width={22} height={22} strokeWidth={1.25} color={IVORY} />
            {/* Rotating tick to suggest an active, monitored node */}
            <g className="animate-ws-spin-slow" style={{ ...centerOrigin, animationDelay: `${i * -6}s` }}>
              <circle cx={n.x} cy={n.y} r={44} strokeWidth={1.4} strokeDasharray="10 266" />
            </g>
          </motion.g>
        ))}
      </g>
    </svg>
  )
}

export default SafetyNetwork
