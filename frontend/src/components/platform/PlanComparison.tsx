import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { PLANS, PLAN_ROWS } from '../../data/platform'

/**
 * Subscription plans.
 * 1. Plan cards: all four plans are always visible (stacked on phones, 2 x 2 on tablet,
 *    four across on desktop). On phones every card lists all rows, marking unavailable
 *    ones, so plans can be compared by scrolling. From tablet up the cards list what each
 *    plan includes and the detailed comparison table follows.
 * 2. Comparison table (tablet and up).
 * All names, prices and availability come from PLANS / PLAN_ROWS (the original data).
 */

type Value = string | true | null

const Price = ({ value, className = '' }: { value: string; className?: string }) => (
  <p className={`flex items-baseline gap-1 leading-none ${className}`}>
    <span className="ws-figure text-[2.25rem] font-normal tracking-[-0.03em] lg:text-[2.5rem]">{value}</span>
    <span className="ws-figure text-sm text-forest-600">/-</span>
  </p>
)

const Included = () => (
  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest-600 text-ivory-50">
    <Check className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
  </span>
)

const Unavailable = () => (
  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-forest-700/35 text-forest-700/80">
    <Minus className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
  </span>
)

/* ------------------------------------------------------------------ */
/* Plan cards                                                          */
/* ------------------------------------------------------------------ */
const PlanCard = ({ index }: { index: number }) => {
  const plan = PLANS[index]
  const rows = PLAN_ROWS.map((r) => ({ feature: r.feature, value: r.values[index] as Value }))

  return (
    <article aria-labelledby={`plan-${index}`} className="flex flex-col bg-ivory-50">
      <header className="ws-grain bg-forest-700 px-5 py-4 text-ivory-50 sm:px-6">
        <h3 id={`plan-${index}`} className="text-[1.05rem] font-medium tracking-[-0.005em]">
          {plan.name}
        </h3>
      </header>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6 sm:pb-8">
        <Price value={plan.price} className="text-forest-800" />
        <ul className="mt-5 border-t border-forest-700/15">
          {rows.map(({ feature, value }) => {
            const off = value === null
            return (
              <li
                key={feature}
                // From tablet up the table shows what is missing, so cards list included rows only
                className={`flex items-center gap-3 border-b border-forest-700/10 py-2.5 text-[0.95rem] ${off ? 'md:hidden' : ''}`}
              >
                {off ? <Unavailable /> : <Included />}
                <span className={`flex-1 ${off ? 'text-forest-700/80 line-through decoration-forest-700/35' : 'text-forest-800'}`}>
                  {feature}
                  {off && <span className="sr-only"> (not included)</span>}
                </span>
                {typeof value === 'string' && <span className="ws-figure shrink-0 text-sm font-medium text-forest-700">{value}</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}

const PlanCards = () => (
  <div className="grid grid-cols-1 gap-px border border-forest-700/20 bg-forest-700/20 md:grid-cols-2 lg:grid-cols-4">
    {PLANS.map((p, i) => (
      <PlanCard key={p.name} index={i} />
    ))}
  </div>
)

/* ------------------------------------------------------------------ */
/* Comparison table (tablet and up)                                    */
/* ------------------------------------------------------------------ */
const Cell = ({ value }: { value: Value }) => {
  if (value === true)
    return (
      <span className="inline-flex">
        <Included />
        <span className="sr-only">Included</span>
      </span>
    )
  if (value === null)
    return (
      <span className="inline-flex">
        <Unavailable />
        <span className="sr-only">Not included</span>
      </span>
    )
  return <span className="ws-figure text-sm font-medium text-forest-700">{value}</span>
}

const ComparisonTable = () => {
  const [col, setCol] = useState<number | null>(null)
  const tint = (i: number) => (col === i ? 'bg-forest-700/[0.05]' : '')

  return (
    <div className="mt-16 hidden md:block lg:mt-20" onMouseLeave={() => setCol(null)}>
      <h3 id="plan-compare" className="ws-display text-display-sm text-forest-700">
        Detailed comparison
      </h3>
      <table aria-labelledby="plan-compare" className="mt-6 w-full table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-[30%]" />
          {PLANS.map((p) => (
            <col key={p.name} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-y border-forest-700/25">
            <td className="py-4 pr-4" />
            {PLANS.map((p, i) => (
              <th
                key={p.name}
                scope="col"
                onMouseEnter={() => setCol(i)}
                className={`border-l border-forest-700/15 px-3 py-4 align-bottom font-normal transition-colors duration-300 lg:px-5 ${tint(i)}`}
              >
                <span className="block text-[0.98rem] font-medium leading-tight text-forest-800">{p.name}</span>
                <span className="ws-figure mt-1 block text-sm text-forest-600">{p.price}/-</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLAN_ROWS.map((row) => (
            <tr key={row.feature} className="border-b border-forest-700/15">
              <th scope="row" className="py-3.5 pr-4 text-[0.95rem] font-normal text-forest-800">
                {row.feature}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={PLANS[i].name}
                  onMouseEnter={() => setCol(i)}
                  className={`border-l border-forest-700/15 px-3 py-3.5 transition-colors duration-300 lg:px-5 ${tint(i)}`}
                >
                  <Cell value={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PlanComparison = () => (
  <>
    <PlanCards />
    <ComparisonTable />
  </>
)

export default PlanComparison
