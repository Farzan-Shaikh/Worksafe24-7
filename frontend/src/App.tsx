
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <SkipLink />
      <ScrollToTop />
      <WhatsAppButton />
      <div className="min-h-screen bg-white">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AboutUs />} />
            {/* <Route path="/about-us" element={<AboutUs />} /> */}
            {/* <Route path="/" element={<Home />} /> */}
           
            <Route path="/platform-services" element={<PlatformServices />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/return-refund" element={<ReturnRefund />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
