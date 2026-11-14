import type { ReactNode } from 'react'

/**
 * Minimal device frame: charcoal bezel, fine inner hairline, no glossy effects.
 * Children fill the screen area (aspect 9:19.5).
 */
const PhoneFrame = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div
    className={`relative rounded-[2.4rem] bg-charcoal-950 p-[0.55rem] shadow-[0_40px_80px_-40px_rgba(14,44,36,0.55)] ring-1 ring-black/10 ${className}`}
  >
    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.95rem] bg-ivory-50">
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[1.15rem] w-[34%] -translate-x-1/2 rounded-full bg-charcoal-950"
      />
    </div>
  </div>
)

export default PhoneFrame
