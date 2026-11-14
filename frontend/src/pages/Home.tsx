import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import HeroSection from '../components/home/HeroSection'
import IntroSection from '../components/home/IntroSection'
import AppShowcase from '../components/home/AppShowcase'
import HowItWorks from '../components/home/HowItWorks'
import ServicesIndex from '../components/home/ServicesIndex'
import FeaturesGrid from '../components/home/FeaturesGrid'
import ClientsMarquee from '../components/home/ClientsMarquee'
import DownloadBand from '../components/home/DownloadBand'
import LatestNews from '../components/home/LatestNews'
import ClosingCta from '../components/home/ClosingCta'
import JoinNetwork from '../components/home/JoinNetwork'

const Home = () => (
  <div className="ws-theme min-h-screen bg-ivory-200">
    <SEOHead
      title="WorkSafe24/7 - Employee Safety & Wellbeing Platform"
      description="India's only holistic platform for Employee Safety & Wellbeing. 24/7 Safety Desk with SOS, Ambulance, Roadside Assistance, POSH Services, Mental Health Support, and comprehensive employee protection solutions."
      keywords="employee safety platform, workforce protection, 24/7 safety desk, emergency SOS India, ambulance service, roadside assistance, POSH compliance, mental health support, employee wellbeing, safety management system, WorkSafe24/7"
      url="https://worksafe247.com/"
      image="https://worksafe247.com/brand/worksafe-logo.png"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://worksafe247.com/#webpage',
        url: 'https://worksafe247.com/',
        name: 'WorkSafe24/7 - Employee Safety & Wellbeing Platform',
        description: "India's only holistic platform for Employee Safety & Wellbeing",
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://worksafe247.com/#website',
          url: 'https://worksafe247.com/',
          name: 'WorkSafe24/7',
        },
        about: {
          '@type': 'Service',
          name: 'Employee Safety & Wellbeing Services',
          provider: {
            '@type': 'Organization',
            name: 'WorkSafe24/7',
          },
        },
      }}
    />
    <Header variant="overlay" />

    {/* tabIndex -1 lets the skip link move keyboard focus here */}
    <main id="main-content" aria-label="Main content" tabIndex={-1} className="focus:outline-none">
      <HeroSection />
      <IntroSection />
      <AppShowcase />
      <HowItWorks />
      <ServicesIndex />
      <FeaturesGrid />
      <ClientsMarquee />
      <DownloadBand />
      <LatestNews />
      <ClosingCta />
      <JoinNetwork />
    </main>

    <Footer />
  </div>
)

export default Home
