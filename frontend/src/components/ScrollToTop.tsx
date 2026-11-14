
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when route changes (instant for users who prefer reduced motion)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduce ? 'auto' : 'smooth'
    })
  }, [pathname])

  return null
}

export default ScrollToTop
