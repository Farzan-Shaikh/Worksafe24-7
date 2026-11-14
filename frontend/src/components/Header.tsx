import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import Logo from './ui/Logo'
import SocialIcons from './ui/SocialIcons'
import { CONTACT, CONTACT_NAV, NAV_ITEMS } from '../data/site'

type HeaderProps = {
  /**
   * `overlay`: transparent over a forest hero, turns ivory once scrolled (Home).
   * `solid`: ivory bar in normal flow (all other pages).
   */
  variant?: 'overlay' | 'solid'
}

const EASE = [0.22, 1, 0.36, 1] as const

const Header = ({ variant = 'solid' }: HeaderProps) => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation
  useEffect(() => setOpen(false), [location.pathname])

  // Lock page scroll and support Escape while the menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Light-on-dark treatment: over the Home hero, or while the forest menu is open
  const onDark = open || (variant === 'overlay' && !scrolled)
  const position = variant === 'overlay' ? 'fixed inset-x-0 top-0' : 'sticky top-0'
  const surface = onDark
    ? 'bg-transparent border-transparent'
    : 'bg-ivory-100/90 backdrop-blur-md border-forest-900/10'
  const text = onDark ? 'text-ivory-50' : 'text-charcoal-900'
  const layer = open ? 'z-[70]' : 'z-50'

  return (
    <>
      <header
        className={`ws-theme ${position} ${layer} border-b transition-[background-color,border-color,color] duration-500 ease-editorial ${surface} ${text}`}
      >
        <div className="ws-shell flex h-[var(--ws-header-h)] items-center justify-between gap-6">
          <Logo variant={onDark ? 'mono-light' : 'color'} className="h-9 sm:h-10 lg:h-11" />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group relative px-3 py-2 text-[0.95rem] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-editorial ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phoneHref}
              className="ws-link ws-figure hidden text-[0.85rem] opacity-85 hover:opacity-100 xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <Link
              to={CONTACT_NAV.path}
              className={`hidden sm:inline-flex ${onDark ? 'ws-btn-dark' : 'ws-btn-forest'} !py-2.5`}
            >
              {CONTACT_NAV.name}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="ws-mobile-menu"
              className="-mr-3 inline-flex h-11 items-center gap-3 rounded-full px-3 text-sm lg:hidden"
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ease-editorial ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ease-editorial ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ws-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="ws-theme ws-grain fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest-700 text-ivory-50 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="h-[var(--ws-header-h)] shrink-0" />
            <nav aria-label="Mobile navigation" className="ws-shell flex-1 pt-6">
              <ul className="border-t border-ivory-50/15">
                {[...NAV_ITEMS, CONTACT_NAV].map((item, i) => (
                  <motion.li
                    key={item.path}
                    className="border-b border-ivory-50/15"
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: EASE }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline justify-between gap-4 py-4 ${isActive ? 'text-ivory-50' : 'text-ivory-50/80'}`
                      }
                    >
                      <span className="ws-display text-[1.7rem] leading-tight sm:text-[2.1rem]">{item.name}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="ws-shell flex flex-col gap-6 pb-10 pt-10 text-sm">
              <div className="flex flex-col gap-2">
                <span className="ws-eyebrow text-sage-300">Toll-free</span>
                <a href={CONTACT.phoneHref} className="text-lg">
                  {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 text-ivory-100/80">
                  {CONTACT.email}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <SocialIcons itemClassName="border-ivory-50/25 text-ivory-50 hover:bg-ivory-50 hover:text-forest-700" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
