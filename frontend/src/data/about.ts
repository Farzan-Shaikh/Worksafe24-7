/** About Us content, copied verbatim from the previous AboutUs page. */

export const ABOUT_HERO = {
  label: 'About Us',
  titleLines: ['Protecting People.', 'Preserving Business.'],
  intro:
    'We are a SafeTech startup with our founders and mentors having over 100 years of combined domain expertise and have developed a holistic platform: WorkSafe 24/7 – Always on.',
  cta: { label: 'Contact Us', to: '/contact' },
  // AB.webp is rebuilt: people photo (monochrome copy) + vector ecosystem diagram with the same labels
  ecosystemImage: { src: '/images/rebrand/ecosystem-team.jpg', alt: 'Business Protection' },
  ecosystem: {
    quote: 'One ecosystem. Every dimension of employee safety',
    nodes: ['Safety', 'Risk Management', 'HRMS', 'Wellbeing'],
  },
}

/** Second hero paragraph; the bold phrase is rendered separately */
export const ABOUT_PLATFORM = {
  before: 'We provide a comprehensive, holistic platform for ',
  strong: 'Employee Travel Safety Services',
  after:
    ' that integrates Physical Safety, Roadside Safety, Medical Support and Travel Risk Management. supported by a 24/7 Travel Safety Station that offers real-time responses to protect employees during travel.',
  // Crop of AboutUS2ndslides.webp without the old red wall sign and red screen icons
  image: { src: '/images/rebrand/about-meeting.jpg', alt: 'Safety Technology' },
}

export const WHAT_WE_DO = {
  titleLines: ['What do we do?'],
  text: "We are a startup committed to making travel safety an essential part of corporate employees' daily lives. Our subscription-based services use innovative technology, supported by a 24/7 Travel Safety Station, to deliver travel safety services with real-time response.",
  image: { src: '/images/rebrand/what-we-do.jpg', alt: 'Technology Solutions' },
  station: {
    title: '24/7 Safety Station',
    text: 'Cutting-edge technology providing real-time travel safety alerts',
  },
}

export const FOUNDERS = {
  titleLines: ['Founded by Renowned Technocrats'],
  text: "Founded by esteemed technocrats, the leadership team has more than a century of combined experience in Safety and Electronic Security, with several members being pioneers in the industry's development.",
  stats: [
    { value: '100+', label: 'Years Experience' },
    { value: '2022', label: 'Incorporated' },
  ],
  // The red/black wordmark on the boardroom screen is replaced with the new logo
  image: { src: '/images/rebrand/founders-boardroom.jpg', alt: 'Leadership Team' },
}

export const LEADERS = {
  titleLines: ['Visionary Leaders Behind Our Mission'],
  text: 'Behind WorkSafe 24/7 – Always On is a team motivated by a single goal: making employee travel safety simple, personal, and accessible for everyone.',
  people: [
    {
      name: 'Heena Khan',
      role: 'Co-Founder & Director',
      image: '/images/HeenaKhan.webp' as string | null,
      bio: 'At Worksafe24/7, Heena Khan leads operations, digital processes, and compliance. With her engineering expertise, she ensures efficiency, transparency, and a seamless safety service experience for corporates and other firms.',
      quote: 'Clear communication and accountability are at the core of every successful project.',
    },
    {
      name: 'Kirti Kumar Jain',
      role: 'Director',
      // Portrait removed pending the new photograph. To add it, place the file in
      // public/images/team/ and set the path here, e.g. '/images/team/kirti-kumar-jain.jpg'.
      // While null, the card shows a neutral branded placeholder (no portrait).
      image: null,
      bio: 'Marketing graduate from Queen Mary University of London with business administration expertise and family business experience in marketing and sales, seeking an entry-level role to drive growth and build my career.',
      quote: 'Innovation and strategic vision drive meaningful impact in the safety industry.',
    },
  ],
}

export const VISION_MISSION = [
  { title: 'Vision', text: "Our goal is to be the customer's top choice for employee travel safety." },
  {
    title: 'Mission',
    text: "To offer an affordable technology platform for employees' travel safety, designed to ensure complete peace of mind during travel.",
  },
]

export const ABOUT_CTA = {
  title: 'Are you ready to innovate in employee travel safety?',
  text: 'Join the many satisfied companies that trust us for their travel safety requirements. Reach out today to learn more about our travel safety services.',
  primary: { label: 'Our Services', to: '/platform-services' },
  secondary: { label: 'Contact Us', to: '/contact' },
}
