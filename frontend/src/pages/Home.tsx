import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {ArrowRight, Users, Shield, Heart, Church, UserPlus, CheckCircle, Bell, Settings, MapPin, Lock, AlertCircle, MessageCircleDashed as MessageCircle, Lightbulb, TriangleAlert, User, Quote, ChevronLeft, ChevronRight, Phone, Video, Mic, Smartphone, Apple, Wrench, Car, Fuel, Battery, Key, Ambulance, Activity, Stethoscope, Navigation} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import StepCard from '../components/StepCard'
import ServiceButton from '../components/ServiceButton'
import LazyImage from '../components/LazyImage'
import InfiniteClients from '../components/InfiniteClients'
import BlogCardSkeleton from '../components/BlogCardSkeleton'
import SEOHead from '../components/SEOHead'

import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../store/api/postsApi'


// Hero Slider Component for Bubble Phone Mockup
const BubbleHeroSlider = ({ bubbleInView, className = "h-64", isExpanded = false }: { bubbleInView: boolean; className?: string; isExpanded?: boolean }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides = [
    {
      
      bgImage: 'images/SOSMobileBaner.webp',
      title: 'SOS Mobile',
      features: [
       
      ]
    },
    {
      
      bgImage: 'images/WhatsNearbyMobile.webp',
      title: 'Whats Nearby',
      features: [
       
      ]
    },
    {
      
      bgImage: 'images/AmbulanceSerivceMobile.webp',
      title: 'Ambulance Service',
      features: [
       
      ]
    },
    {
      
      bgImage: 'images/SafeQRMobile.webp',
      title: 'Safe QR',
      features: [
      ]
    }
  ]

  useEffect(() => {
    if (bubbleInView && !isExpanded) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [bubbleInView, slides.length, isExpanded])

  const nextSlide = (e: any) => {
    e?.stopPropagation()
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = (e: any) => {
    e?.stopPropagation()
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className={`relative ${className} overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Image */}
          <LazyImage
            src={slides[currentSlideIndex].bgImage}
            alt={slides[currentSlideIndex].title}
            className="w-full h-full object-fill"
          />
          
          
         
          {/* Slide Indicator */}
          <div className="absolute bottom-2 right-2 flex space-x-1">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentSlideIndex ? 'bg-red-500 w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Only when expanded */}
      {isExpanded && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}

// Service Card Component with Hover Effect (Expands within mobile container)
const ServiceCard = ({ bgColor, icon, title, subtitle }) => {
  // const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`${bgColor} rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden`}  
      transition={{ duration: 0.3 }}
    >
      <motion.div
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <motion.h4
        className="text-sm font-bold text-gray-900 mt-2 text-center"
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h4>
      <motion.p
        className="text-xs font-semibold text-gray-700 text-center"
      
        transition={{ duration: 0.3 }}
      >
        {subtitle}
      </motion.p>
      
     
    </motion.div>
  )
}


const Home = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


  const [bubbleRef, bubbleInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [howItWorksRef, howItWorksInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px' // Trigger when section is 50px into viewport
  })
  const [safetyFeaturesRef, safetyFeaturesInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [safetyCommunityRef, safetyCommunityInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [appDownloadRef, appDownloadInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [customerReviewsRef, customerReviewsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [joinNetworkRef, joinNetworkInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [platformsRef, platformsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [newsRef, newsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [isSliderExpanded, setIsSliderExpanded] = useState(false)

  // Use RTK Query to fetch blog posts (automatically cached across all pages)
  const { data: allPosts = [], isLoading: loading, error } = useGetPostsQuery();
  // Only show latest 3 posts on Home page
  const blogPosts = allPosts.slice(0, 3).map(post => ({
    id: post.id,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    date: post.date,
    category: post.category,
    author: post.author,
  }));

  // Clients data for prime partners section
  const clients = [
    { title: "Godrej", image: "/images/Godrej_Logo.png" },
    { title: "HUL", image: "/images/HUL.png" },
    { title: "Bonaza", image: "/images/bonanza.jpg" },
    {
      title: "Grihum Housing Finance",image: "/images/Grihum Housing Finance.jfif",
    },
    { title: "ba", image: "/images/BA.png" },
    { title: "Sony", image: "/images/Sony.png" },
    { title: "UDS", image: "/images/uds.jfif" },
    { title: "Jaipuria School", image: "/images/JaipuriaSchool.webp" },
    { title: "SNDT", image: "/images/SNDT.png" },
    { title: "Rising", image: "/images/Rising-removebg-preview.jpeg" },
    { title: "Marsh", image: "/images/Marsh.jpeg" },
    
    { title: "XavierSchool", image: "/images/SNDTL.png" },
    { title: "Ohr", image: "/images/Ohr-removebg-preview.webp" },
    { title: "MetricInfo", image: "/images/MetricInfo-removebg-preview.jpg" },
    { title: "HG", image: "/images/HG-removebg-preview.png" },
    { title: "A1", image: "/images/A1-removebg-preview.png" },
    { title: "Prarambh", image: "/images/Prarambh-removebg-preview.png" },
    { title: "LT", image: "/images/LT.jpeg" },
    { title: "great-eastern", image: "/images/great-eastern.jpg" },
    { title: "IndiGrid", image: "/images/IndiGrid-removebg-preview.jpeg" },
    { title: "EE", image: "/images/EE.jpeg" },
    { title: "Niscam", image: "/images/Niscam.jpeg" },
    { title: "RB", image: "/images/RB.jpeg" },
    { title: "Rotray", image: "/images/Rotray.jpeg" },
    
  ];



 
   const customerReviews = [
    {
      rating: 5,
      text: "These headphones have completely transformed my mixing process. The clarity and detail are absolutely phenomenal.",
      name: "Sarah Johnson",
      role: "Music Producer",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    },
    {
      rating: 5,
      text: "Professional-grade quality at an incredible price point. The noise cancellation is industry-leading.",
      name: "Michael Chen",
      role: "Audio Engineer",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    },
    {
      rating: 5,
      text: "Perfect for long recording sessions. Comfortable, reliable, and the sound quality is unmatched.",
      name: "Emily Rodriguez",
      role: "Podcast Host",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    },
    {
      rating: 5,
      text: "Outstanding build quality and exceptional sound. These are now my go-to headphones for all projects.",
      name: "David Kim",
      role: "Sound Designer",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    },
    {
      rating: 5,
      text: "The best investment I've made for my studio. Crystal clear audio and amazing comfort.",
      name: "Lisa Anderson",
      role: "Vocal Coach",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    },
    {
      rating: 5,
      text: "Incredible noise isolation and premium sound quality. Perfect for professional use.",
      name: "James Wilson",
      role: "Music Director",
      avatar: "https://cdn-static-lumi.artvibe.ai/a6/a6427f42a31942f692b9753a6e274430.webp"
    }
  ]





  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <SEOHead
        title="WorkSafe24/7 - Employee Safety & Wellbeing Platform"
        description="India's only holistic platform for Employee Safety & Wellbeing. 24/7 Safety Desk with SOS, Ambulance, Roadside Assistance, POSH Services, Mental Health Support, and comprehensive employee protection solutions."
        keywords="employee safety platform, workforce protection, 24/7 safety desk, emergency SOS India, ambulance service, roadside assistance, POSH compliance, mental health support, employee wellbeing, safety management system, WorkSafe24/7"
        url="https://worksafe247.com/"
        image="https://worksafe247.com/images/worksafelogo.png"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://worksafe247.com/#webpage',
          url: 'https://worksafe247.com/',
          name: 'WorkSafe24/7 - Employee Safety & Wellbeing Platform',
          description: 'India\'s only holistic platform for Employee Safety & Wellbeing',
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
      <Header />

      {/* Enhanced Hero Section with Carousel */}
      {/* New Hero Section based on reference */}
      <main id="main-content" aria-label="Main content">
      <section ref={heroRef} className="relative w-full">
        {/* Top Red Banner */}
        {/* <div className="bg-[#B93632] w-full py-16 px-4 flex flex-col items-center justify-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white text-2xl md:text-4xl font-semibold mb-2"
          >
            Struggling to Boost
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-4xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            EMPLOYEE MORALE ?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white text-sm md:text-lg font-medium tracking-wide uppercase max-w-3xl"
          >
            Reduce Attrition & Absentesism with A HOLISTIC SUITE OF SERVICES
          </motion.p>
        </div> */}

          <motion.div className="w-full h-[400px] md:h-[600px] relative overflow-hidden">
            <LazyImage 
              src="images/HomeTopRedBanner2.png" 
              alt="Stressed employees in office"
              className="w-full h-full object-fill "
            />
            
            {/* Clickable Arrow Icon next to "Request a Safety Demo" button */}
            <Link 
              to="/contact"
              className="absolute bottom-[19%] sm:bottom-[19%] md:bottom-[20%] left-[50.5%] sm:left-[50.5%] md:left-[50.5%] lg:left-[50.5%] group cursor-pointer z-10"
              aria-label="Request a Safety Demo - Go to Contact Page"
            >
              
              <motion.div
                className="bg-white hover:bg-red-600 rounded-lg sm:rounded-xl p-2 sm:p-2 md:p-2 lg:p-2 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -2, y: -10 }}
                animate={heroInView ? { 
                  opacity: 1, 
                  x: 0,
                  y: [0, -2, 5] // Floating animation: up and down
                } : { opacity: 0, x: -12, y: 5 }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.5 },
                  x: { duration: 0.6, delay: 0.5 },
                  y: { 
                    duration: 0.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1 // Start floating after initial animation
                  }
                }}
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600 group-hover:text-white transition-colors" strokeWidth={2.5} />
              </motion.div>
            </Link>
          </motion.div>
      </section>

     

      {/* What's a Bubble Section */}
      <section ref={bubbleRef} className="py-12 sm:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 relative">
        <AnimatePresence>
          {isSliderExpanded && (
            <motion.div
              layoutId="hero-slider-expand"
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
              onClick={() => setIsSliderExpanded(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-full max-w-4xl h-[60vh] sm:h-[70vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={() => setIsSliderExpanded(false)}
              >
                 <BubbleHeroSlider bubbleInView={true} className="h-full" isExpanded={true} />

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={bubbleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-block mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={bubbleInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="px-6 py-3 bg-gradient-to-r from-red-400 to-orange-400 text-gray-900 font-semibold rounded-full text-sm sm:text-base shadow-lg">
                  Introducing WorkSafe 24/7
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={bubbleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                What is <span className="text-red-600">WorkSafe 24/7?</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={bubbleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                WorkSafe 24/7- India’s only holistic platform for Employee Safety & Wellbeing. The platform integrates employee Physical Safety, Mental Wellbeing, Risk Management, and HRMS into a unified employee ecosystem

              </motion.p>

              {/* Features List */}
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                {[
                  { icon: Shield, text: 'Employee Safety: 24/7 Safety Desk (SOS, Travel Safe, Emergency Assistance)' },
                  { icon: Church, text: 'Employee Wellbeing: Mental Health and Lifestyle Support.' },

                  { icon: AlertCircle, text: 'Risk Management: Safe Travel, Safe Commute, Safe Work' },
                  { icon: Users, text: 'HRMS: Smart ID, Attendance, Engagement & Safety Analytics.' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={bubbleInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <p className="text-base sm:text-lg text-gray-800 font-medium">{feature.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={bubbleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={bubbleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 text-sm sm:text-base touch-manipulation"
                >
                  Join the safety revolution 
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Phone Mockup */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={bubbleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Phone Container */}
              <div className="relative mx-auto max-w-sm">
               
                {/* Phone Frame */}
                <motion.div
                  className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Phone Notch */}
                  {/* <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-10" /> */}
                  
                  {/* Phone Screen */}
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                    {/* Top Navigation Bar */}
                    <div className="bg-white mt-5 px-4 py-3 flex justify-between items-center border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                          <div className="w-6 h-0.5 bg-gray-900"></div>
                          <div className="w-6 h-0.5 bg-gray-900"></div>
                          <div className="w-6 h-0.5 bg-gray-900"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Playstore Account</p>
                          {/* <p className="text-xs text-gray-500">Good Afternoon</p> */}
                        </div>
                      </div>
                      <Bell className="w-5 h-5 text-red-600" />
                    </div>

                    {/* App Content - Scrollable with Hidden Scrollbar */}
                    <div className="bg-white h-[580px] sm:h-[640px] overflow-y-auto scrollbar-hide" style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}>
                      {/* Hero Banner Slider */}
                      <motion.div
                        layoutId="hero-slider-expand"
                        onMouseEnter={() => setIsSliderExpanded(true)}
                        className="cursor-pointer"
                      >
                        <BubbleHeroSlider bubbleInView={bubbleInView} />
                      </motion.div>

                      {/* 2-Column Service Cards Grid - Image-Based Cards */}
                      <div className="p-4 grid grid-cols-2 gap-3 mt-2">
                        {/* Card 1 - Top Left  (S.webp */}

                         <motion.div
                          className="rounded-2xl overflow-hidden cursor-pointer shadow-lg aspect-square"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src="/images/S.webp"
                            alt="Safety Services"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                     

                        {/* Card 2 - Top Right (AmbulanceM.webp) */}
                        <motion.div
                          className="rounded-2xl overflow-hidden cursor-pointer shadow-lg aspect-square"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src="/images/AmbulanceM.webp"
                            alt="Ambulance Service"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>

                        {/* Card 3 - Bottom Left (RA.webp) */}
                          <motion.div
                          className="rounded-2xl overflow-hidden cursor-pointer shadow-lg aspect-square"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src="/images/RA.webp"
                            alt="Road Assistance"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>

                        {/* Card 4 - Bottom Right (Sqr.webp) */}
                        <motion.div
                          className="rounded-2xl overflow-hidden cursor-pointer shadow-lg aspect-square"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src="/images/Sqr.webp"
                            alt="Safe Return QR"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      </div>

                      {/* Bottom Navigation */}
                     
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="relative z-10 py-12 sm:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 border-t border-b border-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 1, y: 0 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              How It <span className="text-red-600">Works</span>
            </h2>
          </motion.div>

          {/* Three Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Step 01 - Download app */}
            <StepCard
              stepNumber="Step O1"
              title="Download WorkSafe 24/7 app"
              
              imageSrc="/images/step1_welcome.webp"
              delay={0.2}
              inView={howItWorksInView}
            />

            {/* Step 02 - Create account */}
            <StepCard
              stepNumber="Step O2"
              title="Create account"
              
              imageSrc="/images/step2_profile.webp"
              delay={0.4}
              inView={howItWorksInView}
            />

            {/* Step 03 - Activate plan */}
            <StepCard
              stepNumber="Step O3"
              title="Activate plan"
              
              imageSrc="/images/step3_sos.webp"
              delay={0.6}
              inView={howItWorksInView}
            />
            
          </div>

          {/* Mobile Images - Responsive Gallery */}
          <motion.div
            className="mt-16 sm:mt-20 max-w-8xl mx-auto"
            initial={{ opacity: 1, y: 0 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Mobile: Stacked vertically (one at a time in viewport) */}
            {/* Large screens: Three images side by side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-14">
              {/* Mobile Image 1 */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 max-w-sm mx-auto lg:max-w-none mb-6"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={howItWorksInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  
                  <LazyImage
                    src="/images/mobile1.png"
                    alt="WorkSafe 24/7 Mobile App Screen 1"
                    className="w-[320px] h-[500px] object-fill"
                  />

                  
                  
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  Activate SOS in One Tap
                </h3>
              </div>
              
               
              {/* Mobile Image 2 */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 max-w-sm mx-auto lg:max-w-none mb-6"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={howItWorksInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <LazyImage
                    src="/images/mobile2.png"
                    alt="WorkSafe 24/7 Mobile App Screen 2"
                    className="w-[320px] h-[500px] object-fil"
                  />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  Live Location Alerts
                </h3>
              </div>

              {/* Mobile Image 3 */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 max-w-sm mx-auto lg:max-w-none mb-6"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={howItWorksInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <LazyImage
                    src="/images/3.5.png"
                    alt="WorkSafe 24/7 Mobile App Screen 3"
                    className="w-[300px] h-[500px] object-fill"
                  />
                  
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  Fast Help from Your Safety Network
                </h3>
              </div>

            </div>
          </motion.div>
                    
             
    
     
        </div>
      </section>

      {/* Services Work Section */}
      <section ref={servicesRef} className="py-16 sm:py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 tracking-wide">
               Explore Our Services
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-8 tracking-tight">
              Hit the button
            </h3>
          </motion.div>

          {/* Service Buttons - Three Rows Layout */}
          <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto">
            {/* Row 1 - 5 Buttons */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { label: 'SOS', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Ambulance', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Roadside Assistance', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Travel Safe', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Safe Return QR', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
              ].map((service, index) => (
                <ServiceButton
                  key={index}
                  label={service.label}
                  color={service.color}
                  index={index}
                  inView={servicesInView}
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.worksafe4567', '_blank')}
                />
              ))}
            </motion.div>

            {/* Row 2 - 4 Buttons */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { label: 'What\'s Nearby', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'POSH', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Locate Me', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Customer Support', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
              ].map((service, index) => (
                <ServiceButton
                  key={index + 5}
                  label={service.label}
                  color={service.color}
                  index={index + 5}
                  inView={servicesInView}
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.worksafe4567', '_blank')}
                />
              ))}
            </motion.div>

            {/* Row 3 - 2 Buttons */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { label: 'News Board', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
                { label: 'Health & Wellness', color: 'bg-red-900/70 hover:bg-red-900 border-red-800' },
              ].map((service, index) => (
                <ServiceButton
                  key={index + 9}
                  label={service.label}
                  color={service.color}
                  index={index + 9}
                  inView={servicesInView}
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.worksafe4567', '_blank')}
                />
              ))}
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 border-4 border-yellow-400/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </div>
      </section>
      {/* Four Dimensions Features Section */}
      <section ref={safetyFeaturesRef} className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={safetyFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-red-600 mb-4">
              Four Dimensions of 24/7 Employee Safety and Wellbeing
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: 24/7 Safety Station */}
            <FeatureCard
              icon={Shield}
              title="24/7 Safety Station"
              description="Round-the-clock access to all safety services in one place."
              bgColor="bg-purple-100"
              iconColor="text-purple-700"
              hoverBgColor="group-hover:bg-purple-200"
              delay={0.1}
              inView={safetyFeaturesInView}
            />

            {/* Feature 2: Emergency SOS */}
            <FeatureCard
              icon={AlertCircle}
              title="Emergency SOS"
              description="Instant emergency alerts with live location for quick help."
              bgColor="bg-red-100"
              iconColor="text-red-700"
              hoverBgColor="group-hover:bg-red-200"
              delay={0.2}
              inView={safetyFeaturesInView}
            />

            {/* Feature 3: Ambulance Service */}
            <FeatureCard
              icon={Ambulance}
              title="Ambulance Service"
              description="On-call ambulance support for fast medical response."
              bgColor="bg-blue-100"
              iconColor="text-blue-700"
              hoverBgColor="group-hover:bg-blue-200"
              delay={0.3}
              inView={safetyFeaturesInView}
            />

            {/* Feature 4: PoSH Services */}
            <FeatureCard
              icon={Users}
              title="PoSH Services"
              description="Complete PoSH compliance and support for a safe workplace."
              bgColor="bg-purple-100"
              iconColor="text-purple-700"
              hoverBgColor="group-hover:bg-purple-200"
              delay={0.4}
              inView={safetyFeaturesInView}
            />

            {/* Feature 5: Roadside Assistance */}
            <FeatureCard
              icon={Wrench}
              title="Roadside Assistance"
              description="Help for breakdowns, flat tyres, and travel emergencies."
              bgColor="bg-orange-100"
              iconColor="text-orange-700"
              hoverBgColor="group-hover:bg-orange-200"
              delay={0.5}
              inView={safetyFeaturesInView}
            />

            {/* Feature 6: SafeReturn QR */}
            <FeatureCard
              icon={Lock}
              title="SafeReturn QR"
              description="Smart QR for quick identification and safe return assistance."
              bgColor="bg-green-100"
              iconColor="text-green-700"
              hoverBgColor="group-hover:bg-green-200"
              delay={0.6}
              inView={safetyFeaturesInView}
            />
          </div>
        </div>
      </section>
  {/* Prime Partners Section */}
      <InfiniteClients clients={clients} />
            
      {/* App Download CTA Section */}
      <section ref={appDownloadRef} className="py-12 sm:py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={appDownloadInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Download the app and create your first<br />Worksafety today.
            </h2>
            
            <div className="flex justify-center items-center gap-4">
                  {/* Google Play Button */}
                  <a href="https://play.google.com/store/apps/details?id=com.worksafe4567" target="_blank" className="block transition-transform hover:scale-105">
                  
                    <LazyImage 
                      src="images/PlayStore.webp" 
                      alt="Get it on Google Play" 
                      className="h-16"
                    />
                  </a>
                  {/* App Store Button */}
                  {/* <a href="https://apps.apple.com/app/worksafe4567" target="_blank" className="block transition-transform hover:scale-105">
                    <LazyImage 
                      src="images/appstore.webp" 
                      alt="Download on the App Store" 
                      className="h-12"
                    />
                  </a> */}
                </div>
          </motion.div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section ref={newsRef} className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              NEWS &{" "}
              <span className="text-red-600 border-b-4 border-red-600">
                ARTICLES
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Stay updated with the latest in safety technology and services
            </p>
          </motion.div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(3)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          )}
          {error && <p className="text-center text-red-600">{'status' in error ? `Error: ${error.status}` : 'Failed to load posts'}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.slice(0,3).map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={newsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {post.date}
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base line-clamp-3">
                      {post.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      👤 {post.author}
                    </p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors text-sm sm:text-base touch-manipulation"
                    >
                      Read More
                      <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base touch-manipulation"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Don't wait for <br />
                something to happen
              </h2>
              <p className="text-lg sm:text-xl text-red-100 mb-8 leading-relaxed max-w-xl">
                Take action and join the thousands of families and workplaces already using WorkSafe 24/7 to protect their people.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 text-lg"
                >
                  Contact Us
                </Link>
                
                <div className="flex items-center gap-4">
                  {/* Google Play Button */}
                  <a href="#" className="block transition-transform hover:scale-105">
                    <LazyImage 
                      src="images/PlayStore.webp" 
                      alt="Get it on Google Play" 
                      className="h-16"
                    />
                  </a>
                  {/* App Store Button */}
                  {/* <a href="#" className="block transition-transform hover:scale-105">
                    <LazyImage 
                      src="images/appstore.webp" 
                      alt="Download on the App Store" 
                      className="h-12"
                    />
                  </a> */}
                </div>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <LazyImage
                  src="images/CTASection.webp"
                  alt="Safe and Happy User"
                  className="rounded-3xl shadow-2xl  border-4 border-white/20"
                />
                
                
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
            
            {/* Join the Safety Network */}
      <section ref={joinNetworkRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Main Title */}
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={joinNetworkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-900 mb-2 sm:mb-3 md:mb-4 px-2">
              Join the Safety Network
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 font-medium px-2">
              This isn't just safety.
            </p>
          </motion.div>

          {/* Three Pills */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={joinNetworkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["It's presence", "It's peace", "It's people"].map((text, idx) => (
              <motion.div
                key={idx}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-white rounded-full text-gray-900 font-medium text-sm sm:text-base md:text-lg shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={joinNetworkInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>

          {/* Download App Button */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={joinNetworkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-red-900 to-red-800 text-white font-semibold rounded-full text-sm sm:text-base md:text-lg hover:from-red-800 hover:to-red-900 transition-all duration-300 transform hover:scale-105 shadow-xl touch-manipulation"
            >
              Download App
            </Link>
          </motion.div>

          {/* Hero Image with Feature Icons */}
          <div className="relative max-w-5xl mx-auto px-2 sm:px-4">
            {/* Central Family Image */}
            <motion.div
              className="relative z-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={joinNetworkInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <LazyImage
                src="images/JionSafety.webp"
                alt="Join the Safety Network"
                className="w-full aspect-[16/10] sm:aspect-[2/1.2] md:aspect-[2/1.3] object-contain rounded-2xl sm:rounded-3xl shadow-2xl"
              />
            </motion.div>

           
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
