import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  CheckCircle,
  Handshake,
  HeartPulse,
  Headphones,
  ShieldCheck,
  Smartphone,
  Smile,
  TrendingUp,
  UserCheck,
  Wallet,
  Zap,
} from 'lucide-react'

/** Platform Services content, copied verbatim from the previous page. */

export const PLATFORM_HERO = {
  label: 'Platform',
  titleLines: ['Why Choose WorkSafe24/7-Always ON ?'],
}

export const WHAT_IS = {
  titleLines: ['What is WorkSafe 24/7 ?'],
  points: ['Employee Travel Risk Management.', '24/7 Travel Safety Station.', 'Duty of Care compliance.'],
  image: { src: '/images/PS.webp', alt: 'WorkSafe Context - What You Carry Inside' },
}

export const OFFER = {
  title: 'What do we offer?',
  before: 'We provide a comprehensive ',
  strong: 'Employee Travel Risk Management Platform',
  after:
    ' for Employee Travel Safety & Wellbeing, integrating Physical Safety, Mental Wellbeing, and Travel Risk Management into a unified employee duty-of-care safety ecosystem.',
}

type Item = { icon: LucideIcon; title: string; desc: string }

export const BENEFITS: { title: string; items: Item[] } = {
  title: 'Travel Risk Management Benefits',
  items: [
    { icon: Smartphone, title: 'Unified Ecosystem', desc: 'A single app for employee travel risk management.' },
    { icon: Handshake, title: 'Employee Trust', desc: 'Strengthen employee morale and trust' },
    { icon: UserCheck, title: 'Retention Boost', desc: 'Reduced attrition and absenteeism' },
    { icon: Wallet, title: 'Cost Savings', desc: 'Lower insurance premium' },
    { icon: ShieldCheck, title: 'Supports Compliances', desc: 'Ensure compliance with risk, legal, and Duty of Care Travel Safety.' },
    { icon: TrendingUp, title: 'High ROI', desc: 'Tangible return on investment' },
    { icon: Activity, title: 'Smart Analytics', desc: 'Real-time usage dashboard for measuring ROI' },
    { icon: CheckCircle, title: '24/7 Safety Desk', desc: 'Employees receive 24/7 support in the event of travel emergencies.' },
  ],
}

export const ADVANTAGES: { titleLines: string[]; items: Item[] } = {
  titleLines: ['Advantages of our Services'],
  items: [
    { icon: Zap, title: 'Productivity Surge', desc: 'Safe employees are 20% more productive.' },
    { icon: HeartPulse, title: 'Healthcare Savings', desc: 'Lower health insurance claims.' },
    { icon: Headphones, title: '24/7 Support', desc: '24/7 Travel Safety Support.' },
    { icon: ShieldCheck, title: 'Travel Safety Desk', desc: 'Employee 24/7 Travel Safety Desk.' },
    { icon: Smile, title: 'Morale & Retention', desc: 'Boosts employee morale and reduces attrition.' },
  ],
}

export const PLANS = [
  {
    name: 'Basic',
    price: '299',
    features: [
      'SOS Emergency Help',
      '24 /7 Safety Desk',
      'RSA',
      'Travel safe',
      'Safety Return QR( 2 QR)',
      'PoSH Service',
      'Health & wellness',
      'News Board',
    ],
  },
  {
    name: 'Advanced',
    price: '499',
    features: [
      'SOS Emergency Help',
      '24 /7 Safety Desk',
      'RSA',
      'Travel safe',
      'Safety Return QR(4 QR)',
      'PoSH Service',
      'Health & wellness',
      'News Board',
      'Ambulance',
    ],
  },
  {
    name: 'Premium',
    price: '999',
    features: [
      'SOS Emergency Help',
      '24 /7 Safety Desk',
      'RSA',
      'Travel safe',
      'Safety Return QR(6 QR)',
      'PoSH Service',
      'Health & wellness',
      'News Board',
      'Ambulance',
      'Posh Online',
      'Fire safety Online',
    ],
  },
  {
    name: 'Premium Plus',
    price: '1999',
    features: [
      'SOS Emergency Help',
      '24 /7 Safety Desk',
      'RSA',
      'Travel safe',
      'Safety Return QR(6 QR)',
      'PoSH Service',
      'Health & wellness',
      'News Board',
      'Ambulance',
      'Posh On-Site',
      'Fire safety On-Site',
    ],
  },
]

export const PLANS_COPY = {
  title: 'Subscription Plan:',
  noteBefore: 'To access Advanced services, a subscription is required. If not subscribed, these services will be ',
  noteEmphasis: 'viewable but not usable',
  noteAfter: '.',
  cta: { label: 'Contact us', to: '/contact' },
}

/**
 * Comparison rows derived from the plan feature strings above.
 * "Safety Return QR( 2 QR)" becomes row "Safety Return QR" with value "2 QR",
 * so the table always reflects the exact plan data.
 */
export type PlanRow = { feature: string; values: (string | true | null)[] }

export const PLAN_ROWS: PlanRow[] = (() => {
  const parse = (f: string) => {
    const m = f.match(/^(.*?)\s*\(\s*(.+?)\s*\)$/)
    return m ? { base: m[1].trim(), value: m[2] } : { base: f, value: null }
  }
  const order: string[] = []
  PLANS.forEach((p) => p.features.forEach((f) => {
    const { base } = parse(f)
    if (!order.includes(base)) order.push(base)
  }))
  return order.map((base) => ({
    feature: base,
    values: PLANS.map((p) => {
      const hit = p.features.map(parse).find((x) => x.base === base)
      if (!hit) return null
      return hit.value ?? true
    }),
  }))
})()

export const COMMUNITY = {
  before: 'Securing a community of ',
  highlight: '5 lakh',
  after: ' and growing.',
  // Phone.png (old red/pastel service grid) is rebuilt as <ServicesGridScreen /> in a PhoneFrame
  imageAlt: 'Mobile App Interface',
}

export const PLATFORM_CTA = {
  title: 'Are you ready to make your employees travel safely?',
  text: 'Join countless organizations and families who rely on WorkSafe 24/7 for their daily travel safety.',
  primary: { label: 'Get Started Today', to: '/contact' },
  phone: { label: 'Call 1800 210 4567', href: 'tel:18002104567' },
}
