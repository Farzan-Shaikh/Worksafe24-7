import type { ReactNode } from 'react'
import { MaskedLines } from './Reveal'
import Reveal from './Reveal'

type Tone = 'light' | 'dark'

type SectionIntroProps = {
  /** Heading split into lines for the masked reveal */
  titleLines: string[]
  /** Optional element rendered below the title lines (e.g. a sub-heading) */
  titleAfter?: ReactNode
  /** Supporting copy, set in a ruled column to the right of the title */
  children?: ReactNode
  tone?: Tone
  id?: string
  className?: string
  /** Ratio of title column on desktop */
  split?: '7/5' | '6/6' | '8/4'
}

const splits = {
  '7/5': ['lg:col-span-7', 'lg:col-span-5'],
  '6/6': ['lg:col-span-6', 'lg:col-span-6'],
  '8/4': ['lg:col-span-8', 'lg:col-span-4'],
}

/**
 * Editorial split header: the section title on the left and, when there is
 * supporting copy, a ruled column on the right that aligns it to the title's baseline.
 */
const SectionIntro = ({ titleLines, titleAfter, children, tone = 'light', id, className = '', split = '7/5' }: SectionIntroProps) => {
  const dark = tone === 'dark'
  const rule = dark ? 'border-ivory-50/20' : 'border-forest-700/25'
  const [left, right] = splits[split]

  return (
    <div className={`grid grid-cols-1 border-y lg:grid-cols-12 ${rule} ${className}`}>
      <div className={`${children ? left : 'lg:col-span-12'} py-10 sm:py-12 lg:py-14 lg:pr-10`}>
        <h2 id={id} className={`ws-display text-display-lg ${dark ? 'text-ivory-50' : 'text-forest-700'}`}>
          <MaskedLines lines={titleLines} />
        </h2>
        {titleAfter}
      </div>
      {children && (
        <div className={`${right} flex flex-col border-t pb-10 pt-6 sm:pb-12 lg:justify-end lg:border-l lg:border-t-0 lg:py-14 lg:pl-6 ${rule}`}>
          <Reveal delay={0.15} className={`text-lead max-w-[34rem] ${dark ? 'text-ivory-100/85' : 'text-forest-700'}`}>
            {children}
          </Reveal>
        </div>
      )}
    </div>
  )
}

export default SectionIntro
