import SafetyNetwork from './SafetyNetwork'

/** Width / height of each arrangement (matches the viewBoxes in SafetyNetwork) */
const SAFETY_NETWORK_RATIO = { wide: '1200 / 520', compact: '660 / 580' }

/**
 * Responsive wrapper: each arrangement sits in a box with its own aspect ratio,
 * so the drawing is always shown whole (no `slice` cropping, no fixed heights).
 * Compact hexagon below 768px, landscape spread from tablet up.
 */
const SafetyNetworkFigure = ({ className = '', maxWidth = 'max-w-[1060px]' }: { className?: string; maxWidth?: string }) => (
  <div aria-hidden="true" className={`mx-auto w-full ${maxWidth} ${className}`}>
    <div className="relative mx-auto w-full max-w-[460px] md:hidden" style={{ aspectRatio: SAFETY_NETWORK_RATIO.compact }}>
      <SafetyNetwork layout="compact" className="absolute inset-0 h-full w-full" />
    </div>
    <div className="relative hidden w-full md:block" style={{ aspectRatio: SAFETY_NETWORK_RATIO.wide }}>
      <SafetyNetwork layout="wide" className="absolute inset-0 h-full w-full" />
    </div>
  </div>
)

export default SafetyNetworkFigure
