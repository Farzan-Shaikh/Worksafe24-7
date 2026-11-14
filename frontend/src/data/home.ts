/**
 * Home page content. Every string here comes from the existing Home page
 * (including the copy baked into the old hero banner image).
 * Nothing has been invented.
 */

export const HERO = {
  titleLines: ['Because One', 'Unsafe Moment Is', 'One Too Many.'],
  subtitle:
    'Protect your employees, at work, on the road, and beyond, with WorkSafe 24/7’s Always-On Employee Safety Ecosystem.',
  tags: ['Emergency SOS', 'Ambulance', 'TravelSafe', 'PoSH', 'Fire & Safety', 'Smart Digital ID'],
  primaryCta: { label: 'Protect Your Workforce Now', to: '/contact' },
  secondaryCta: { label: 'Request a Safety Demo', to: '/contact' },
}

export const INTRO = {
  badge: 'Introducing WorkSafe 24/7',
  titleLines: ['What is WorkSafe 24/7?'],
  description:
    'WorkSafe 24/7- India’s only holistic platform for Employee Safety & Wellbeing. The platform integrates employee Physical Safety, Mental Wellbeing, Risk Management, and HRMS into a unified employee ecosystem',
  pillars: [
    { title: 'Employee Safety', text: '24/7 Safety Desk (SOS, Travel Safe, Emergency Assistance)' },
    { title: 'Employee Wellbeing', text: 'Mental Health and Lifestyle Support.' },
    { title: 'Risk Management', text: 'Safe Travel, Safe Commute, Safe Work' },
    { title: 'HRMS', text: 'Smart ID, Attendance, Engagement & Safety Analytics.' },
  ],
  cta: { label: 'Join the safety revolution', to: '/contact' },
}

/** App slider (previously inside the phone mockup) */
/**
 * App slider. Titles and feature lists are the text of the original banner images
 * (SOSMobileBaner, WhatsNearbyMobile, AmbulanceSerivceMobile, SafeQRMobile).
 * The red/blue overlay panels are rebuilt as live UI; the photographs behind them are
 * cropped monochrome copies in /images/rebrand/ (originals untouched).
 * Spelling in two items is corrected: "neardy" -> "nearby", "Conventince" -> "Convenience".
 */
export const APP_SLIDES = [
  {
    key: 'sos',
    title: 'SOS',
    photo: '/images/rebrand/slide-sos.jpg',
    features: ['Emergency alert activation', 'Real-time location sharing', 'Instant call to authorities', 'Alert trusted contacts', 'Live video streaming'],
  },
  {
    key: 'nearby',
    title: 'What’s Nearby',
    photo: '/images/rebrand/slide-nearby.jpg',
    features: ['Nearest hospitals', 'Police stations nearby', 'Gas stations locations', 'Restaurants and cafes', 'Convenience stores'],
  },
  {
    key: 'ambulance',
    title: 'Ambulance Service',
    photo: '/images/rebrand/slide-ambulance.jpg',
    features: ['Quick ambulance dispatch', 'Real-time ETA tracking', 'Hospital coordination', 'Medical support on call', 'Medical history access'],
  },
  {
    key: 'qr',
    title: 'Safe Return QR',
    photo: '/images/rebrand/slide-qr.jpg',
    features: ['Scan QR Code', 'Connect with Owner', 'Return Item Easily', 'Reward for Honesty'],
  },
] as const

export type AppSlideKey = (typeof APP_SLIDES)[number]['key']

/** Screens are rebuilt as components in components/app/AppScreens.tsx (keyed below) */
export const STEPS = [
  { number: '01', title: 'Download WorkSafe 24/7 app', screen: 'welcome' },
  { number: '02', title: 'Create account', screen: 'profile' },
  { number: '03', title: 'Activate plan', screen: 'sosActivated' },
] as const

export const APP_MOMENTS = [
  { title: 'Activate SOS in One Tap', screen: 'sosActive' },
  { title: 'Live Location Alerts', screen: 'commandStation' },
  { title: 'Fast Help from Your Safety Network', screen: 'getHelp' },
] as const

export const SERVICES = {
  title: 'Explore Our Services',
  kicker: 'Hit the button',
  items: [
    'SOS',
    'Ambulance',
    'Roadside Assistance',
    'Travel Safe',
    'Safe Return QR',
    'What’s Nearby',
    'POSH',
    'Locate Me',
    'Customer Support',
    'News Board',
    'Health & Wellness',
  ],
}

export type FeatureKey = 'station' | 'sos' | 'ambulance' | 'posh' | 'roadside' | 'qr'

export const FEATURES: { key: FeatureKey; title: string; description: string }[] = [
  { key: 'station', title: '24/7 Safety Station', description: 'Round-the-clock access to all safety services in one place.' },
  { key: 'sos', title: 'Emergency SOS', description: 'Instant emergency alerts with live location for quick help.' },
  { key: 'ambulance', title: 'Ambulance Service', description: 'On-call ambulance support for fast medical response.' },
  { key: 'posh', title: 'PoSH Services', description: 'Complete PoSH compliance and support for a safe workplace.' },
  { key: 'roadside', title: 'Roadside Assistance', description: 'Help for breakdowns, flat tyres, and travel emergencies.' },
  { key: 'qr', title: 'SafeReturn QR', description: 'Smart QR for quick identification and safe return assistance.' },
]

export const FEATURES_TITLE = 'Four Dimensions of 24/7 Employee Safety and Wellbeing'

export const CLIENTS = [
  { title: 'Godrej', image: '/images/optimized/logos/Godrej_Logo.png' },
  { title: 'HUL', image: '/images/HUL.png' },
  { title: 'Bonaza', image: '/images/bonanza.jpg' },
  { title: 'Grihum Housing Finance', image: '/images/Grihum Housing Finance.jfif' },
  { title: 'ba', image: '/images/BA.png' },
  { title: 'Sony', image: '/images/Sony.png' },
  { title: 'UDS', image: '/images/uds.jfif' },
  { title: 'Jaipuria School', image: '/images/JaipuriaSchool.webp' },
  { title: 'SNDT', image: '/images/optimized/logos/SNDT.jpg' },
  { title: 'Rising', image: '/images/Rising-removebg-preview.jpeg' },
  { title: 'Marsh', image: '/images/Marsh.jpeg' },
  { title: 'XavierSchool', image: '/images/optimized/logos/SNDTL.png' },
  { title: 'Ohr', image: '/images/Ohr-removebg-preview.webp' },
  { title: 'MetricInfo', image: '/images/MetricInfo-removebg-preview.jpg' },
  { title: 'HG', image: '/images/optimized/logos/HG-removebg-preview.png' },
  { title: 'A1', image: '/images/A1-removebg-preview.png' },
  { title: 'Prarambh', image: '/images/Prarambh-removebg-preview.png' },
  { title: 'LT', image: '/images/LT.jpeg' },
  { title: 'great-eastern', image: '/images/great-eastern.jpg' },
  { title: 'IndiGrid', image: '/images/IndiGrid-removebg-preview.jpeg' },
  { title: 'EE', image: '/images/EE.jpeg' },
  { title: 'Niscam', image: '/images/optimized/logos/Niscam.jpg' },
  { title: 'RB', image: '/images/RB.jpeg' },
  { title: 'Rotray', image: '/images/Rotray.jpeg' },
]

export const CLIENTS_COPY = {
  title: 'Our Clients',
  subtitle: 'Trusted by leading organizations across industries',
}

export const DOWNLOAD = {
  titleLines: ['Download the app and create your first Worksafety today.'],
}

export const NEWS = {
  title: 'News & Articles',
  subtitle: 'Stay updated with the latest in safety technology and services',
  cta: 'View All Articles',
}

export const CTA = {
  titleLines: ['Don’t wait for something to happen'],
  text: 'Take action and join the thousands of families and workplaces already using WorkSafe 24/7 to protect their people.',
  contact: { label: 'Contact Us', to: '/contact' },
  image: '/images/CTASection.webp',
}

export const JOIN = {
  title: 'Join the Safety Network',
  lead: 'This isn’t just safety.',
  phrases: ['It’s presence', 'It’s peace', 'It’s people'],
  cta: 'Download App',
  // People from the original JionSafety.webp; the red service shields and red wall are cropped/neutralised
  image: '/images/rebrand/join-team.jpg',
}
