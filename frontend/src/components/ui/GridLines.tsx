type Tone = 'forest' | 'ivory' | 'charcoal'

const toneClass: Record<Tone, string> = {
  forest: 'border-ivory-50/[0.07]',
  ivory: 'border-forest-900/[0.07]',
  charcoal: 'border-ivory-50/[0.06]',
}

/** Visibility per column index: 4 columns mobile, 6 tablet, 12 desktop. */
const visibility = (i: number) => {
  if (i < 4) return 'block'
  if (i < 6) return 'hidden md:block'
  return 'hidden lg:block'
}

/** The closing right-hand rule sits on the last visible column per breakpoint. */
const closing = (i: number) => {
  if (i === 3) return 'border-r md:border-r-0'
  if (i === 5) return 'md:border-r lg:border-r-0'
  if (i === 11) return 'lg:border-r'
  return ''
}

/** Thin architectural column lines aligned with the layout shell. Decorative only. */
const GridLines = ({ tone = 'ivory', className = '' }: { tone?: Tone; className?: string }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
    <div className="ws-shell h-full">
      <div className="grid h-full grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-full border-l ${toneClass[tone]} ${visibility(i)} ${closing(i)}`} />
        ))}
      </div>
    </div>
  </div>
)

export default GridLines
