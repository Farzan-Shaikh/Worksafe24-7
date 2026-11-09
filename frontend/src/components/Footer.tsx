
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram} from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'WorkSafe 24/7', path: 'https://worksafe247.com' },
    { name: 'Senior Citizen Safety', path: '' },
    { name: 'Captain India', path: 'https://captain-india.com' }
  ]

  const otherLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' },
    // { name: 'Shipping And Delivery', path: '/shipping-delivery' },
    // { name: 'Return & Refund Policy', path: '/return-refund' }
  ]

 const socialIcons = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/worksafe247/",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "https://x.com/WorkSafe24_7",
      color: "hover:text-blue-400",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/WorkSafe247",
      color: "hover:text-blue-700",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/worksafe24_7?igsh=eWFvZ3RwZXB4aG9x",
      color: "hover:text-pink-600",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
          {/* Company Info */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <motion.div
              className="flex flex-col items-center sm:items-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* WorkSafe Logo */}
              <Link to="/">
                <motion.img
                  src="/images/worksafelogo.png"
                  alt="WorkSafe 24/7 Logo"
              className="h-16 sm:h-20 w-auto mb-4"
                  style={{
                    filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 5)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) brightness(1.2)",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ 
                    scale: 1.1,
                     filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 5)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.6)) brightness(1.2)",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                />
              </Link>
            </motion.div>
            
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our goal is to ensure a safe travel experience for employees every day.
                </motion.p>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-2 sm:p-3 bg-gray-800 rounded-full ${social.color} transition-all duration-300 touch-manipulation`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="text-center sm:text-left">
            <motion.h4
              className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-red-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              QUICK <span className="border-b-2 border-red-500">LINKS</span>
            </motion.h4>

            <ul className="space-y-2 sm:space-y-3 ">
              {quickLinks.map((link, index) => (

                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  
                >
                  {link.path ? (
                    link.path.startsWith("http") ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {link.name}
                      </Link>
                    )
                  ) : (
                    <>
                      <span className="text-gray-500 text-sm sm:text-base">{link.name}</span>
                      <span className="bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-semibold px-2 py-[2px] rounded-full ml-2">
                        Coming Soon
                      </span>
                    </>
                  )}
                </motion.li>
                
              ))}
            </ul>
          </div> */}



          {/* Other Links */}
          <div className="text-center sm:text-left">
            <motion.h4
              className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-red-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              OTHER <span className="border-b-2 border-red-500">LINKS</span>
            </motion.h4>
            <ul className="space-y-2 sm:space-y-3">
              {otherLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 block py-1 text-sm sm:text-base touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <motion.h4
              className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-red-400 flex items-center justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MapPin className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Address
            </motion.h4>
            
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-gray-300 text-sm sm:text-base">
                <p>Zimaxx Tech Solutions Private Limited</p><br />
                <p>1st Floor, A Wing,21 5-Kanakia Atriurm-l,
                    Andheri - Kurla Rd, beside Courtyard by
                    Marriott Hotel, Chakala, Andheri East</p>
                <p>Mumbai ,Maharashtra - 400093</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href="tel:18002104567" className="text-sm sm:text-base underline hover:text-red-400 transition-colors duration-300">
                  Toll-Free: 1800 210 4567
                </a>
              </div>


              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href="mailto:support@Zimaxxtech.com" className="text-sm sm:text-base break-all sm:break-normal underline hover:text-red-400 transition-colors duration-300">
                  support@Zimaxxtech.com
                </a>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm">
          Copyright &copy; 2025 Zimaxx Tech. All rights reserved. | Powered by{" "}
            <a
              href="https://www.linkedin.com/in/shubham-yadav-13739631a" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Shubham Yadav
            </a>{" "}
            &{" "}
            <a
              href="https://www.linkedin.com/in/vishalmejari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Vishal Mejari
            </a>
        </p>

        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
