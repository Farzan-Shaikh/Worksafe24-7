import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import GridLines from '../ui/GridLines'
import Reveal, { MaskedLines } from '../ui/Reveal'

type Crumb = { name: string; to?: string }

type PageHeroProps = {
  titleLines: string[]
  children?: ReactNode
  /** Rendered under the aside copy (e.g. buttons, search) */
  actions?: ReactNode
  crumbs?: Crumb[]
  tone?: 'ivory' | 'forest'
  /** Title size: `xl` for landing-style heroes, `lg` for content pages */
  size?: 'xl' | 'lg' | 'md'
  /** Optional illustration placed above the title row */
  art?: ReactNode
  id?: string
}

const sizes = { xl: 'text-display-xl', lg: 'text-display-lg', md: 'text-display-md' }

/**
 * Editorial page opener: breadcrumb + label, large masked title,
 * a ruled aside with supporting copy. Mirrors the Home split-header language.
 */
const PageHero = ({
  titleLines,
  children,
  actions,
  crumbs,
  tone = 'ivory',
  size = 'lg',
  art,
  id = 'page-title',
}: PageHeroProps) => {
  const dark = tone === 'forest'
  const rule = dark ? 'border-ivory-50/20' : 'border-forest-700/20'
  const muted = dark ? 'text-sage-300' : 'text-forest-500'

  return (
    <section
      aria-labelledby={id}
      className={`relative overflow-hidden ${dark ? 'ws-grain bg-forest-700 text-ivory-50' : 'bg-ivory-200 text-forest-700'}`}
    >
      <GridLines tone={dark ? 'forest' : 'ivory'} />
      <div className={`ws-shell relative ${dark ? 'pt-[calc(var(--ws-header-h)+2.5rem)]' : 'pt-12 sm:pt-16'}`}>
        <div className={`flex flex-wrap items-center gap-4 border-b pb-5 ${rule}`}>
          {crumbs && (
            <nav aria-label="Breadcrumb">
              <ol className={`ws-eyebrow flex flex-wrap items-center gap-2 ${muted}`}>
                {crumbs.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {c.to ? (
                      <Link to={c.to} className={`ws-link ${dark ? 'hover:text-ivory-50' : 'hover:text-forest-700'}`}>
                        {c.name}
                      </Link>
                    ) : (
                      <span aria-current="page">{c.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        {art}

        <div className="grid grid-cols-1 gap-8 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-24 lg:pt-20">
          <h1 id={id} className={`ws-display ${sizes[size]} lg:col-span-8 ${dark ? 'text-ivory-50' : 'text-forest-700'}`}>
            <MaskedLines lines={titleLines} animateOnMount delay={0.1} />
          </h1>
          {(children || actions) && (
            <Reveal delay={0.35} className="flex flex-col gap-7 lg:col-span-4 lg:pb-2">
              {children && (
                <div className={`text-[1.08rem] leading-relaxed ${dark ? 'text-ivory-100/85' : 'text-forest-700/90'}`}>
                  {children}
                </div>
              )}
              {actions}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

export default PageHero
