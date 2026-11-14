import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import PageShell from './PageShell'
import PageHero from './PageHero'
import SEOHead from '../SEOHead'
import GridLines from '../ui/GridLines'
import { LEGAL_LINKS } from '../../data/site'

type Props = {
  title: string
  titleLines: string[]
  path: string
  children: ReactNode
}

type Heading = { id: string; text: string }

/** Heading ids are prefixed so they never start with a digit (e.g. "1. DEFINITIONS"), keeping them valid CSS selectors */
const slug = (s: string, i: number) =>
  `sec-${i + 1}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48)}`

/**
 * Documents index: only the legal links the site already exposes (footer),
 * plus the page being read. Shipping/Return stay unlinked, as before.
 */
const documentsFor = (title: string, path: string) =>
  LEGAL_LINKS.some((l) => l.path === path) ? LEGAL_LINKS : [...LEGAL_LINKS, { name: title, path }]

/**
 * Reading layout for legal documents: sticky contents generated from the
 * document's own section headings, a measured reading column and the
 * original legal text rendered unchanged inside `.ws-prose.ws-legal`.
 */
const LegalLayout = ({ title, titleLines, path, children }: Props) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string | null>(null)
  // Contents start expanded on desktop (where the toggle is hidden) and collapsed on small screens
  const [tocOpen, setTocOpen] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)

  // Build the contents list from the rendered h3 headings
  useEffect(() => {
    const nodes = Array.from(bodyRef.current?.querySelectorAll('h3') ?? [])
    const list = nodes.map((n, i) => {
      if (!n.id) n.id = slug(n.textContent ?? '', i)
      return { id: n.id, text: (n.textContent ?? '').replace(/\s*:\s*$/, '').trim() }
    })
    setHeadings(list)

    // Active section = the last heading that has scrolled past a line just below the header.
    // (An IntersectionObserver band misses long sections whose heading is already off-screen.)
    let frame = 0
    const update = () => {
      frame = 0
      const line = 140
      let current: string | null = null
      for (const n of nodes) {
        if (n.getBoundingClientRect().top <= line) current = n.id
        else break
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <PageShell className="bg-ivory-100">
      <SEOHead title={title} url={`https://worksafe247.com${path}`} />
      <PageHero
        titleLines={titleLines}
        size="lg"
        crumbs={[{ name: 'Home', to: '/' }, { name: title }]}
      />

      <section aria-label={title} className="relative bg-ivory-100">
        <GridLines tone="ivory" />
        <div className="ws-shell relative grid grid-cols-1 gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
          <aside className="lg:col-span-3">
            <div className="flex flex-col gap-10 lg:sticky lg:top-[calc(var(--ws-header-h)+2rem)] lg:max-h-[calc(100vh-var(--ws-header-h)-4rem)] lg:overflow-y-auto lg:pr-4 ws-no-scrollbar">
              {headings.length > 1 && (
                <nav aria-label="On this page">
                  <p className="ws-eyebrow mb-4 text-forest-500">On this page</p>
                  {/* Collapsible on small screens, always open on desktop */}
                  <details className="group border-y border-forest-700/20 lg:border-0" open={tocOpen} onToggle={(e) => setTocOpen((e.target as HTMLDetailsElement).open)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm text-forest-700 lg:hidden">
                      {headings.length} sections
                      <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <ol className="space-y-1 pb-3 lg:pb-0">
                      {headings.map((h, i) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            aria-current={active === h.id ? 'location' : undefined}
                            className={`flex gap-3 border-l py-1.5 pl-3 text-[0.88rem] leading-snug transition-colors ${
                              active === h.id
                                ? 'border-forest-700 text-forest-800'
                                : 'border-forest-700/15 text-forest-700/80 hover:text-forest-800'
                            }`}
                          >
                            <span className="ws-figure text-[0.72rem] font-medium leading-5 text-forest-500">{String(i + 1).padStart(2, '0')}</span>
                            <span className="line-clamp-2">{h.text}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </details>
                </nav>
              )}
              <nav aria-label="Legal documents">
                <p className="ws-eyebrow mb-4 text-forest-500">Documents</p>
                <ul className="space-y-2 text-sm">
                  {documentsFor(title, path).map((d) => (
                    <li key={d.path}>
                      {d.path === path ? (
                        <span aria-current="page" className="text-forest-800 underline decoration-1 underline-offset-4">
                          {d.name}
                        </span>
                      ) : (
                        <Link to={d.path} className="ws-link text-forest-700/85 hover:text-forest-800">
                          {d.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <div ref={bodyRef} className="ws-prose ws-legal max-w-[46rem]">
              {children}
            </div>
            <a href="#main-content" className="ws-btn-line-dark mt-16 inline-flex">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Back to top
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default LegalLayout
