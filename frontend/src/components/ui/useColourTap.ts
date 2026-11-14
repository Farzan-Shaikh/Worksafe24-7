import { useEffect, useRef, useState, type PointerEvent } from 'react'

/**
 * Monochrome-to-colour interaction for `.ws-photo` images.
 * - Mouse: CSS `:hover` (only on devices that really hover, see index.css).
 * - Touch / pen: a tap toggles colour on; it switches off again on a second tap,
 *   a tap elsewhere, or when the image scrolls out of view.
 * Spread `bind` on the element that carries `ws-photo-hover`.
 */
export const useColourTap = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active || !ref.current) return
    const el = ref.current
    const outside = (e: globalThis.PointerEvent) => {
      if (!el.contains(e.target as Node)) setActive(false)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(false)
    })
    io.observe(el)
    document.addEventListener('pointerdown', outside)
    return () => {
      io.disconnect()
      document.removeEventListener('pointerdown', outside)
    }
  }, [active])

  const bind = {
    ref,
    'data-colour': active ? 'on' : undefined,
    onPointerUp: (e: PointerEvent<T>) => {
      if (e.pointerType !== 'mouse') setActive((v) => !v)
    },
  }
  return { active, bind }
}
