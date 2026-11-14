
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import SkipLink from './components/SkipLink'

// Lazy load all page components for code splitting
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import PlatformServices from './pages/PlatformServices';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const ShippingDelivery = lazy(() => import('./pages/ShippingDelivery'))
const ReturnRefund = lazy(() => import('./pages/ReturnRefund'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component
const PageLoader = () => (
  <div className="ws-theme flex min-h-screen items-center justify-center bg-ivory-100" role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-4">
      <span className="block h-10 w-10 animate-spin rounded-full border border-forest-700/20 border-t-forest-700" />
      <p className="ws-eyebrow text-forest-700">Loading</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      {/* Every Framer Motion animation follows the OS "reduce motion" setting */}
      <MotionConfig reducedMotion="user">
      <SkipLink />
      <ScrollToTop />
      <div className="min-h-screen bg-ivory-200">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/platform-services" element={<PlatformServices />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/return-refund" element={<ReturnRefund />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      {/* Rendered after the page so it comes after the main content in the tab order (it stays fixed on screen) */}
      <WhatsAppButton />
      </MotionConfig>
    </Router>
  )
}

export default App
