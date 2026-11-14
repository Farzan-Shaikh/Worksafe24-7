import type { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

type PageShellProps = {
  children: ReactNode
  /** `overlay` when the page opens on a forest/charcoal hero, `solid` for ivory heroes */
  header?: 'overlay' | 'solid'
  /** Background behind the page (shows between sections) */
  className?: string
}

/** Common frame for every redesigned page: theme scope, header, main landmark, footer. */
const PageShell = ({ children, header = 'solid', className = 'bg-ivory-200' }: PageShellProps) => (
  <div className={`ws-theme min-h-screen text-forest-700 ${className}`}>
    <Header variant={header} />
    {/* tabIndex -1 lets the skip link move keyboard focus here */}
    <main id="main-content" aria-label="Main content" tabIndex={-1} className="focus:outline-none">

      {children}
    </main>
    <Footer />
  </div>
)

export default PageShell
