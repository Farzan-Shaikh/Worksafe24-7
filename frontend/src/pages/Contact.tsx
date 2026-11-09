import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  Globe,
  Shield,
  ExternalLink,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with environment variable
const EMAILJS_PUBLIC_KEY = "Ou6T6HoRysKtyhP0j";
const EMAILJS_SERVICE_ID = "service_tl0umcz";
const EMAILJS_SERVICE_ID_Gmail = "service_p2sxzs9";
const EMAILJS_TEMPLATE_ID_COMPANY = "template_qcbbejk";
const EMAILJS_TEMPLATE_ID_USER = "template_2cbv37m";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    companyName: "", 
    EmployeeCount: "",
    subSubject: "",

  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false); // ADDED: Missing state
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [infoRef, infoInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [mapRef, mapInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    const submissionToast = toast.loading("Sending your message...");

    // Prepare WhatsApp message with form details
    const whatsappNumber = '919833658521'; // WorkSafe 24/7 WhatsApp number
    const whatsappMessage = `For a faster response, please message us on WhatsApp. Our team will assist you shortly.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || 'Not provided'}\n` +
      `*Subject:* ${formData.subject}\n` +
      `*Message:* ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Attempt to send email silently (no error shown to user)
    try {
      // --- Send to Company Email ---
      await emailjs.send(
        EMAILJS_SERVICE_ID_Gmail,
        EMAILJS_TEMPLATE_ID_COMPANY,
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          user_subject: formData.subject,
          user_message: formData.message,
          user_company: formData.companyName,
          user_employee_count: formData.EmployeeCount,
        },
        EMAILJS_PUBLIC_KEY
      );

      // --- Auto-reply to User ---
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_USER,
        {
          user_name: formData.name,
          user_email: formData.email,
          company_email: "support@Zimaxxtech.com",
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (error: any) {
      // Silently log the error - user won't see any error message
      console.error("EmailJS error (silent):", error);
    }

    // Always show success message to user
    toast.success("Message sent successfully! We'll get back to you soon.", {
      id: submissionToast,
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "600",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "16px",
        boxShadow:
          "0 10px 25px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.05)",
      },
    });

    // Always open WhatsApp with pre-filled message
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({ 
      name: "", 
      email: "", 
      phone: "", 
      subject: "", 
      message: "",
      companyName: "",
      EmployeeCount: "",
      subSubject: "",
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["Toll-Free: 1800 210 4567"],
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      link: "tel:18002104567",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@Zimaxxtech.com"],
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
      link: "mailto:support@Zimaxxtech.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["1st Floor, A Wing, 21 5-Kanakia Atrium-I, Andheri - Kurla Rd, beside Courtyard by Marriott Hotel, Chakala, Andheri East, Mumbai, Maharashtra - 400093"],
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      link: "https://www.google.com/maps",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["24/7 Available"],
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Humanizing Safety For Employees",
      description: "Ensuring protection and care for individuals.",
    },
    {
      icon: Clock,
      title: "Life Safety Services",
      description: "Providing rapid and reliable response in every safety situation.",
    },
    {
      icon: Globe,
      title: "24/7 Safety Station",
      description: "Always active and ready to assist, anytime and anywhere.",
    },
  ];

  const openInGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/dir//1st+Floor,+A+Wing,+21+5-Keakia+Atrium-I,+Andheri+-+Kurla+Rd,+beside+Courtyard+by+Marriott+Hotel,+Chakala,+Andheri+East,+Mumbai,+Maharashtra+400093/@19.0728,72.8682,15z",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Toaster />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-8 bg-gradient-to-br from-red-600 via-red-700 to-red-600"
      >
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-4xl mx-auto "
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're here to support you in creating safer environments for your workforce and their loved ones.
           </motion.p>

         
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="bg-white rounded-2xl shadow-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Send us a Message
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Consulted">Consulted</option>
                    </select>                  
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your safety needs..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-red-700 hover:to-red-800 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              ref={infoRef}
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${info.color} ${info.hoverColor} rounded-xl flex items-center justify-center transition-all`}
                    >
                      <info.icon className="w-12 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Section with Video Animation */}
              <motion.div
                ref={mapRef}
                className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  Our Location
                  <motion.div
                    className="text-sm text-blue-600 flex items-center cursor-pointer"
                    onClick={openInGoogleMaps}
                    whileHover={{ scale: 1.05 }}
                  >
                    Open in Google Maps <ExternalLink className="w-4 h-4 ml-1" />
                  </motion.div>
                </h3>

                <div className="w-full h-64 rounded-xl overflow-hidden relative bg-gray-100">
                  {/* Google Maps iframe - always visible */}
                  <iframe
                    title="Company Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.8682!3d19.0728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzIyLjEiTiA3MsKwNTInMDUuNSJF!5e0!3m2!1sen!2sin!4v1695286800000!5m2!1sen!2sin&t=k"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="eager"
                    className="w-full h-full"
                  />

                  {/* Video overlay - plays once when section comes into view */}
                  {mapInView && !videoEnded && (
                    <video
                      autoPlay
                      muted
                      playsInline
                      onEnded={() => setVideoEnded(true)}
                      onError={(e) => {
                        console.error("Video failed to load:", e);
                        setVideoEnded(true);
                      }}
                      className="absolute inset-0 w-full h-full object-cover z-10 bg-transparent"
                    >
                      <source src="/videos/location.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;