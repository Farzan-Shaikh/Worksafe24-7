import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Users, Phone, CheckCircle, ArrowRight, TriangleAlert, Star, Lightbulb, MapPin, MessageCircleDashed as MessageCircle, Smartphone, Handshake, UserCheck, Wallet, ShieldCheck, TrendingUp, Activity, Zap, HeartPulse, Headphones, Smile, } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";

const PlatformServices = () => {
  const [activeTab, setActiveTab] = useState("workforce");
  const [plansRef, plansInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [safetyCommunityRef, safetyCommunityInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // 👇 new ref for app section animation
  const [appSectionRef, appSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "299",
      features: [
        "SOS Emergency Help",
        "24 /7 Safety Desk",
        "RSA",
        "Travel safe",
        "Safety Return QR( 2 QR)",
        "PoSH Service",
        "Health & wellness",
        "News Board",
      ],
    },
    {
      name: "Advanced",
      price: "499",
      features: [
        "SOS Emergency Help",
        "24 /7 Safety Desk",
        "RSA",
        "Travel safe",
        "Safety Return QR(4 QR)",
        "PoSH Service",
        "Health & wellness",
        "News Board",
        "Ambulance",
      ],
    },
    {
      name: "Premium",
      price: "999",
      features: [
        "SOS Emergency Help",
        "24 /7 Safety Desk",
        "RSA",
        "Travel safe",
        "Safety Return QR(6 QR)",
        "PoSH Service",
        "Health & wellness",
        "News Board",
        "Ambulance",
        "Posh Online",
        "Fire safety Online",
      ],
    },
    {
      name: "Premium Plus",
      price: "1999",
      features: [
        "SOS Emergency Help",
        "24 /7 Safety Desk",
        "RSA",
        "Travel safe",
        "Safety Return QR(6 QR)",
        "PoSH Service",
        "Health & wellness",
        "News Board",
        "Ambulance",
        "Posh On-Site",
        "Fire safety On-Site",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
       {/* Banner Section */}
       <section className="w-full bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
              {/* Top Red Banner */}
              <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 py-10 sm:py-14 text-center shadow-lg">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight">
                    Why Choose WorkSafe24/7-Always ON ?
                  </h1>
                 
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left Side Text */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10 lg:order-1 order-2"
                  >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      What is <span className="text-red-600">WorkSafe 24/7 ?</span>
                    </h3>
                    <ul className="space-y-8">
                      {[
                        "Employee Travel Risk Management.",
                        "24/7 Travel Safety Station.",
                        "Duty of Care compliance."
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-all duration-300"
                        >
                          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-red-600" />
                          </div>
                          <span className="text-lg sm:text-xl font-semibold text-gray-800">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Right Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative lg:order-2 order-1"
                  >
                    <div className="absolute inset-0 bg-red-600 rounded-2xl transform opacity-10 blur-xl"></div>
                    <LazyImage
                      src="images/PS.webp"
                      alt="WorkSafe Context - What You Carry Inside"
                      className="relative w-full h-auto rounded-2xl shadow-xl object-cover transform hover:scale-[1.02] transition-transform duration-500"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

      {/* Hero Section */} 
      <section className="relative py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-600 ">
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             What do we offer?
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We provide a comprehensive {" "}<span className="font-bold">
                  Employee Travel Risk Management Platform 
                   </span>{" "} for Employee Travel Safety & Wellbeing, integrating Physical Safety, Mental Wellbeing, and Travel Risk Management into a unified employee duty-of-care safety ecosystem. 
          </motion.p>
        </div>
      </section>

      {/* Services Benefits Section */}
      <section ref={safetyCommunityRef} className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 border-t border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={safetyCommunityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Travel Risk Management Benefits <span className="text-red-600"></span>
            </h2>
            <div className="w-52 h-1 bg-red-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Smartphone, title: "Unified Ecosystem", desc: "A single app for employee travel risk management." },
              { icon: Handshake, title: "Employee Trust", desc: "Strengthen employee morale and trust" },
              { icon: UserCheck, title: "Retention Boost", desc: "Reduced attrition and absenteeism" },
              { icon: Wallet, title: "Cost Savings", desc: "Lower insurance premium" },
              { icon: ShieldCheck, title: "Supports Compliances", desc: "Ensure compliance with risk, legal, and Duty of Care Travel Safety." },
              { icon: TrendingUp, title: "High ROI", desc: "Tangible return on investment" },
              { icon: Activity, title: "Smart Analytics", desc: "Real-time usage dashboard for measuring ROI" },
              { icon: CheckCircle, title: "24/7 Safety Desk", desc: "Employees receive 24/7 support in the event of travel emergencies." },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-50 group flex flex-col min-h-[200px]"
                initial={{ opacity: 0, y: 30 }}
                animate={safetyCommunityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-sm group-hover:bg-red-600 transition-colors duration-300">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 text-center">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow text-center">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages of our services Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 border-t border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advantages of our <span className="text-red-600">Services</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Zap, title: "Productivity Surge", desc: "Safe employees are 20% more productive. " },
              { icon: HeartPulse, title: "Healthcare Savings", desc: "Lower health insurance claims." },
              { icon: Headphones, title: "24/7 Support", desc: "24/7 Travel Safety Support." },
              { icon: ShieldCheck, title: "Travel Safety Desk", desc: "Employee 24/7 Travel Safety Desk." },
              { icon: Smile, title: "Morale & Retention", desc: "Boosts employee morale and reduces attrition." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:bg-red-600 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <div className="mb-16 "></div>

      {/* Subscription Plans */}
      <div
        ref={plansRef}
        className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "
      >
        <div className="text-center mb-12">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 inline-block border-b-4 border-red-600 pb-2">
              Subscription Plan:
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="rounded-3xl p-6 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={plansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6 text-center border-b border-orange-200 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 underline decoration-red-500/50 decoration-2 underline-offset-4">
                  {plan.name} @ {plan.price}/-
                </h3>
              </div>
              <ul className="space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                     <CheckCircle className="w-4 h-4 text-gray-900 mt-1 flex-shrink-0" />
                    <span className="text-gray-900 text-sm font-medium text-left">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            To access Advanced services, a subscription is required. If not
            subscribed, these services will be{" "}
            <span className="underline font-semibold">
              viewable but not usable
            </span>
            .
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/contact">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact us <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>

  
      {/* App Download Section */}
      <section
        ref={appSectionRef}
        className=" bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 relative overflow-hidden"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-0   ">
          <div className="  grid grid-cols-1 lg:grid-cols-[1fr_2.8fr]   items-center  ">

             {/* Left Side Image */}
            <motion.div
              className="relative    flex justify-start lg:justify-start "
              initial={{ opacity: 0, x: 50 }}
              animate={appSectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <LazyImage
                src="/images/Phone.png"
                alt="Mobile App Interface"
                className="w-80 lg:w-96 h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Right side Content */}
            <motion.div
              className="text-left space-y-6 "
              initial={{ opacity: 0, x: -50 }}
              animate={appSectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={appSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Securring a community of {" "}
                <motion.span
                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  
                >
                  5 lakh
                </motion.span>{" "}
               and growing.
              </motion.h2>

              {/* 5 Stars */}
               <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={appSectionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: -180, scale: 0 }}
                    animate={appSectionInView ? { 
                      opacity: 1, 
                      rotate: 0, 
                      scale: 1 
                    } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Star 
                      className="w-10 h-10 text-yellow-500 fill-yellow-500" 
                    />
                  </motion.div>
                ))}
              </motion.div>


              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.worksafe4567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LazyImage
                    src="images/PlayStore.webp"
                    alt="Get it on Google Play"
                    className="h-16 w-40 drop-shadow-lg hover:scale-105 transition-all duration-300"
                  />
                </a>

                {/* <a
                  href="https://apps.apple.com/app/worksafe4567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LazyImage
                    src="images/appstore.webp"
                    alt="Download on the App Store"
                    className="h-12 w-auto mt-2 drop-shadow-lg hover:scale-105 transition-all duration-300"
                  />
                </a> */}
                
              </div>
            </motion.div>
                
           
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Are you ready to make your employees travel safely?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
                Join countless organizations and families who rely on WorkSafe 24/7 for their daily travel safety.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-red-900/70 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="tel:18002104567"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call 1800 210 4567
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlatformServices;
