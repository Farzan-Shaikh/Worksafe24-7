import type { ReactNode } from 'react'
import { useColourTap } from './useColourTap'

/**
 * Wrapper for a monochrome `.ws-photo` image that turns colour on hover (desktop)
 * and on tap (touch). Put the <img className="ws-photo ..."> inside as a child.
 */
const ColourPhoto = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const { bind } = useColourTap<HTMLDivElement>()
  return (
    <div {...bind} className={`ws-photo-hover ${className}`}>
      {children}
    </div>
  )
}

export default ColourPhoto
