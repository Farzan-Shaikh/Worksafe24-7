import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Target, Shield, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

   const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8 }
  };


  return (
    <div className="min-h-screen bg-white"> 
      <Header />
       <section className="relative bg-white">
        {/* Top Red Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-10 sm:py-14">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              Protecting People. Preserving Business.
            </motion.h2>
            
          </div>
          <div className="w-full mx-auto">
            <LazyImage
              src="images/AB.webp"
              alt="Business Protection"
              className="w-full h-auto  shadow-lg object-contain"
            />
          </div>
        </div>

        {/* Main Content - Team Photo + Ecosystem Diagram */}
        

      
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-600 text-white py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
           

            {/* Left - Text Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
                About US 
              </h1>
              <div className="w-32 h-1 bg-red-500 mb-8 mx-auto lg:mx-0"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-10">
                We are a SafeTech startup with our founders and mentors having over 100 years of combined domain expertise and have developed a holistic platform: WorkSafe 24/7 – Always on.  
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-10 mt-10">
              We provide a comprehensive, holistic platform for  {" "}<span className="font-bold">
                  Employee Travel Safety Services 
                   </span>{" "} that integrates Physical Safety, Roadside Safety, Medical Support and Travel Risk Management. supported by a 24/7 Travel Safety Station that offers real-time responses to protect employees during travel. 
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>

                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">

                  <span>CONTACT US</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>


             {/* Right - Background Image */}
            <motion.div
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}>

              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent z-10"></div>
              <LazyImage
                src="images/AboutUS2ndslides.webp"
                alt="Safety Technology"
                className="w-full h-full object-cover" />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              What do we{" "}
             <span className="text-red-600">do?</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <LazyImage
                src="images/WhatWeDo-min.webp"
                alt="Technology Solutions"
                className="w-full h-96 object-fit rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              We are a startup committed to making travel safety an essential part of corporate employees' daily lives. Our subscription-based services use innovative technology, supported by a 24/7 Travel Safety Station, to deliver travel safety services with real-time response. 
              </p>

              <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    24/7 Safety Station
                  </h4>
                  <p className="text-gray-600">
                    Cutting-edge technology providing real-time travel safety alerts
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Founded by Renowned{" "}
              <span className="text-red-600">Technocrats</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Founded by esteemed technocrats, the leadership team has more
                than a century of combined experience in Safety and Electronic
                Security, with several members being pioneers in the industry's
                development.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    100+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    2022
                  </div>
                  <div className="text-gray-600">Incorporated</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <LazyImage
                src="images/FoundedbyRenowned.webp"
                alt="Leadership Team"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

         {/* Visionary Leaders Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Visionary Leaders Behind Our Mission
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed px-4">
              Behind WorkSafe 24/7 – Always On is a team motivated by a single goal: making employee travel safety simple, personal, and accessible for everyone.
              </p>
          </motion.div>

          {/* Team Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}>

            {/* Team Member 1 - Heena Khan */}
            <motion.div
              className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              variants={scaleIn}>

              <div className="flex flex-col">
                {/* Profile Image - Rounded Rectangle */}
                <div className="relative w-full  overflow-hidden">
                  <img
                    src="images/HeenaKhan.webp"
                    alt="Heena Khan"
                    className="w-full h-full object-cover" />
                </div>

                {/* Content Below Image */}
                <div className="p-6 sm:p-8">
                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Heena Khan
                  </h3>
                  
                  {/* Designation */}
                  <p className="text-base sm:text-lg text-red-600 font-medium mb-4">
                    Co-Founder & Director
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    At Worksafe24/7, Heena Khan leads operations, digital processes, and compliance. With her engineering expertise, she ensures efficiency, transparency, and a seamless safety service experience for corporates and other firms.
                 </p>

                  {/* Quote Section */}
                  <div className="border-l-4 border-red-600 pl-4 py-2">
                    <p className="text-sm sm:text-base text-gray-700 italic">
                      "Clear communication and accountability are at the core of every successful project."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 -   Kirti Kumar Jain. */}
            <motion.div
              className="bg-white  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              variants={scaleIn}>

              <div className="flex flex-col">
                {/* Profile Image - Rounded Rectangle */}
                <div className="relative w-full overflow-hidden">
                  <img
                    src="images/PramoudRao3.jpg"
                    alt="Kirti Kumar Jain."
                    className="w-full h-full object-cover" />
                </div>

                {/* Content Below Image */}
                <div className="p-6 sm:p-8">
                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                     Kirti Kumar Jain
                  </h3>
                  
                  {/* Designation */}
                  <p className="text-base sm:text-lg text-red-600 font-medium mb-4">
                    Director
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Marketing graduate from Queen Mary University of London with business administration expertise and family business experience in marketing and sales, seeking an entry-level role to drive growth and build my career.
                  </p>

                  {/* Quote Section */}
                  <div className="border-l-4 border-red-600 pl-4 py-2">
                    <p className="text-sm sm:text-base text-gray-700 italic">
                      "Innovation and strategic vision drive meaningful impact in the safety industry."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Vision & Mission Section - FIXED */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 lg:items-stretch"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Vision */}
            <motion.div
              className="flex flex-col text-center lg:text-left"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Eye className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Vision
                </h3>
                
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl flex-grow flex items-center justify-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                 Our goal is to be the customer's top choice for employee travel safety. 
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="flex flex-col text-center lg:text-left"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Mission
                  
                </h3>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl flex-grow flex items-center justify-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                 To offer an affordable technology platform for employees' travel safety, designed to ensure complete peace of mind during travel.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-6">
              Are you ready to innovate in employee travel safety?
            </h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Join the many satisfied companies that trust us for their travel safety requirements. Reach out today to learn more about our travel safety services. 

            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/platform-services"
                className="inline-flex items-center justify-center space-x-3 bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span>Our Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
