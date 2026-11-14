import { useId } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoPaths'

type Variant = 'color' | 'mono-light'

/**
 * WorkSafe 24/7 logo as inline vector artwork (traced from the original file,
 * same shield, wordmark and proportions), recoloured for the forest/ivory identity.
 * `color`: forest shield + charcoal wordmark, for ivory surfaces.
 * `mono-light`: ivory shield + wordmark with sage accents, for forest/charcoal surfaces.
 * Fills transition, so the header can switch states smoothly on scroll.
 */
const PALETTE: Record<Variant, { a: string; b: string; word: string; accent: string; rule: string }> = {
  color: { a: '#194D3E', b: '#2D735C', word: '#211F1B', accent: '#1F5E4B', rule: '#1F5E4B' },
  'mono-light': { a: '#F6F4EF', b: '#E7E4DD', word: '#F6F4EF', accent: '#C6D2C9', rule: '#A9BBAF' },
}

const fade = { transition: 'fill 0.5s cubic-bezier(0.22, 1, 0.36, 1), stop-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }

export const LogoArt = ({ variant = 'color', className = '' }: { variant?: Variant; className?: string }) => {
  const id = useId().replace(/:/g, '')
  const c = PALETTE[variant]
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="WorkSafe 24/7 Always On" focusable="false">
      <defs>
        <linearGradient id={`ws-shield-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ ...fade, stopColor: c.a }} />
          <stop offset="1" style={{ ...fade, stopColor: c.b }} />
        </linearGradient>
      </defs>
      <path fillRule="evenodd" d={LOGO_PATHS.shield} fill={`url(#ws-shield-${id})`} />
      <path fillRule="evenodd" d={LOGO_PATHS.word} style={{ ...fade, fill: c.word }} />
      <path fillRule="evenodd" d={LOGO_PATHS.num} style={{ ...fade, fill: c.accent }} />
      <path fillRule="evenodd" d={LOGO_PATHS.tag} style={{ ...fade, fill: c.accent }} />
      <path fillRule="evenodd" d={LOGO_PATHS.swoosh} style={{ ...fade, fill: c.rule }} />
    </svg>
  )
}

const Logo = ({
  variant = 'color',
  className = 'h-10 sm:h-11',
  onClick,
}: {
  variant?: Variant
  className?: string
  onClick?: () => void
}) => (
  <Link to="/" onClick={onClick} aria-label="WorkSafe 24/7 home" className="inline-flex shrink-0 items-center">
    <LogoArt variant={variant} className={`block w-auto ${className}`} />
  </Link>
)

export default Logo
