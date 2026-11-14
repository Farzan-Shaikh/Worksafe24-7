import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Logo from './ui/Logo'
import GridLines from './ui/GridLines'
import SocialIcons from './ui/SocialIcons'
import { CONTACT, CONTACT_NAV, FOOTER_LINKS, LEGAL_LINKS, PLAY_STORE_URL } from '../data/site'

const ColumnLabel = ({ children }: { children: string }) => (
  <p className="ws-eyebrow mb-5 text-sage-300">{children}</p>
)

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="ws-theme ws-grain relative overflow-hidden bg-forest-700 text-ivory-50">
      <GridLines tone="forest" />

      <div className="ws-shell relative">
        {/* Statement row */}
        <div className="grid grid-cols-1 border-b border-ivory-50/20 lg:grid-cols-12">
          <div className="py-14 sm:py-20 lg:col-span-7 lg:pr-10">
            <Logo variant="mono-light" className="h-10 sm:h-12" />
            <p className="ws-display mt-10 max-w-[18ch] text-display-sm text-ivory-50">
              Our goal is to ensure a safe travel experience for employees every day.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-ivory-50/20 py-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:py-20 lg:pl-8">
            <div className="flex flex-wrap gap-3">
              <Link to={CONTACT_NAV.path} className="ws-btn-dark">
                {CONTACT_NAV.name}
              </Link>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="ws-btn-line-light">
                Get the app
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="ws-eyebrow text-sage-300">Toll-Free</span>
              <a href={CONTACT.phoneHref} className="ws-display text-3xl sm:text-4xl">
                {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="ws-link mt-2 w-fit break-all text-ivory-100/85">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-12">
          <nav aria-label="Footer navigation" className="md:col-span-3">
            <ColumnLabel>Navigate</ColumnLabel>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="ws-link text-ivory-100/85 hover:text-ivory-50">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <ColumnLabel>Legal</ColumnLabel>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="ws-link text-ivory-100/85 hover:text-ivory-50">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <address className="col-span-2 not-italic md:col-span-4">
            <ColumnLabel>Address</ColumnLabel>
            <p className="mb-3 text-ivory-50">{CONTACT.company}</p>
            <p className="leading-relaxed text-ivory-100/75">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
          <div className="col-span-2 md:col-span-2">
            <ColumnLabel>Follow</ColumnLabel>
            <SocialIcons
              className="flex-wrap"
              itemClassName="border-ivory-50/25 text-ivory-50 hover:bg-ivory-50 hover:text-forest-700"
            />
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div aria-hidden="true" className="ws-shell relative select-none">
        <p className="ws-display -mb-[0.2em] whitespace-nowrap text-[13vw] leading-[0.8] tracking-[-0.05em] text-ivory-50/[0.08] min-[1441px]:text-[188px]">
          WorkSafe 24/7
        </p>
      </div>

      <div className="relative border-t border-ivory-50/15 bg-forest-700">
        <div className="ws-shell flex flex-col gap-2 pb-24 pt-6 text-xs text-ivory-100/80 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright &copy; {year} Zimaxx Tech. All rights reserved.</p>
          <p className="ws-eyebrow">Always On</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
