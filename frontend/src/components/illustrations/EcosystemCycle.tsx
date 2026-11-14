/**
 * Vector rebuild of the cycle diagram in the original AB.webp:
 * four labels (Safety, Risk Management, HRMS, Wellbeing) around a circular
 * arrow cycle with the quote in the middle. The arc that was red is now the
 * highlighted forest arc, which travels slowly around the cycle.
 */
type Props = { nodes: readonly string[]; quote: string; className?: string }

const R = 150
const C = 260
// Four arcs with small gaps, clockwise from the top
const arc = (a0: number, a1: number) => {
  const p = (a: number) => [C + R * Math.cos((a * Math.PI) / 180), C + R * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
}
const ARCS = [
  [-80, -12],
  [10, 78],
  [100, 168],
  [190, 258],
]
const head = (a: number) => {
  // arrow head at the end of an arc, pointing clockwise
  const t = (a * Math.PI) / 180
  const x = C + R * Math.cos(t), y = C + R * Math.sin(t)
  const dx = -Math.sin(t), dy = Math.cos(t)
  const nx = Math.cos(t), ny = Math.sin(t)
  const s = 13
  return `M${(x - dx * s + nx * s * 0.7).toFixed(1)} ${(y - dy * s + ny * s * 0.7).toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)} L${(x - dx * s - nx * s * 0.7).toFixed(1)} ${(y - dy * s - ny * s * 0.7).toFixed(1)}`
}

/** Label positions: Safety top-left, Risk Management top-right, HRMS bottom-right, Wellbeing bottom-left */
const POS = [
  { x: 64, y: 70 },
  { x: 456, y: 70 },
  { x: 456, y: 450 },
  { x: 64, y: 450 },
]

const EcosystemCycle = ({ nodes, quote, className = '' }: Props) => {
  const words = quote.split(' ')
  const lines = [words.slice(0, 2).join(' '), words.slice(2, 4).join(' '), words.slice(4).join(' ')]
  return (
    <svg viewBox="0 0 520 520" className={className} role="img" aria-label={`${nodes.join(', ')}. ${quote}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={C} cy={C} r={R + 34} stroke="#C6D2C9" strokeWidth={0.8} strokeDasharray="2 6" />
        {ARCS.map(([a0, a1]) => (
          <g key={a0} stroke="#194D3E" strokeWidth={6}>
            <path d={arc(a0, a1)} />
            <path d={head(a1)} strokeWidth={5} />
          </g>
        ))}
        {/* The arc that was red in the original is the highlighted sage arc */}
        <path d={arc(-80, -12)} stroke="#6E8778" strokeWidth={6} />
        <path d={head(-12)} stroke="#6E8778" strokeWidth={5} />
      </g>
      <text textAnchor="middle" fill="#194D3E" style={{ font: '500 21px Manrope, sans-serif' }}>
        {lines.map((l, i) => (
          <tspan key={l} x={C} y={C - 26 + i * 28}>
            {i === 0 ? `“${l}` : i === lines.length - 1 ? `${l}”` : l}
          </tspan>
        ))}
      </text>
      {nodes.map((n, i) => {
        const p = POS[i]
        const two = n.includes(' ')
        const w = two ? 132 : 112
        const h = two ? 62 : 46
        return (
          <g key={n}>
            <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={14} fill="#1F5E4B" />
            <text textAnchor="middle" fill="#F6F4EF" style={{ font: '600 16px Manrope, system-ui, sans-serif' }}>
              {two ? (
                n.split(' ').map((part, k) => (
                  <tspan key={part} x={p.x} y={p.y - 4 + k * 19}>
                    {part}
                  </tspan>
                ))
              ) : (
                <tspan x={p.x} y={p.y + 6}>
                  {n}
                </tspan>
              )}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default EcosystemCycle
