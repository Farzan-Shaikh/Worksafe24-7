import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";
import BlogDetailSkeleton from "../components/BlogDetailSkeleton";
import { useGetPostsQuery, useGetPostByIdQuery } from "../store/api/postsApi";

const BlogDetail = () => {
  const { id } = useParams();
  
  // Fetch all posts for navigation (uses cache if available)
  const { data: allPosts = [] } = useGetPostsQuery();
  
  // Fetch specific post by ID (uses cache from allPosts if available)
  const { 
    data: currentPost, 
    isLoading: loading, 
    error 
  } = useGetPostByIdQuery(parseInt(id || "0"), {
    skip: !id, // Skip query if no ID
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <BlogDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {error ? "Error Loading Article" : "Blog Post Not Found"}
            </h1>
            <p className="text-gray-600 mb-4">{error && 'status' in error ? `Error: ${error.status}` : 'An error occurred'}</p>
            <Link
              to="/blog"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentIndex = allPosts.findIndex((post) => post.id === currentPost.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const socialShareButtons = [
    {
      icon: Facebook,
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      url: "https://www.facebook.com/WorkSafe247",
    },
    {
      icon: Twitter,
      name: "Twitter",
      color: "bg-blue-400 hover:bg-blue-500",
      url: "https://x.com/WorkSafe24_7",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
      url: "https://www.linkedin.com/company/worksafe247/",
    },
    {
      icon: MessageCircle,
      name: "Instagram",
      color: "bg-pink-500 hover:bg-pink-600",
      url: "https://www.instagram.com/worksafe24_7?igsh=eWFvZ3RwZXB4aG9x",
    },
    {
      icon: Mail,
      name: "Email",
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(
        currentPost.title
      )}&body=${encodeURIComponent(
        "Check out this article: " + window.location.href
      )}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full font-medium">
                  {currentPost.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{currentPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentPost.title}
            </motion.h1>

            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* {currentPost.excerpt} */}
            </motion.p>
          </div>
        </div>

        {/* Decorative curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M1200 120L0 16.48V0h1200v120z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Social Share Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-600 font-medium">
              Share this article:
            </span>
            {socialShareButtons.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-300 ${social.color}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="wordpress-content"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                color: '#374151'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Navigation Between Posts */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {prevPost ? (
              <motion.div
                className="flex-1 mr-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to={`/blog/${prevPost.id}`}
                  className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center text-red-600 mb-2">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">PREVIOUS</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                    {prevPost.title}
                  </h3>
                </Link>
              </motion.div>
            ) : (
              <div className="flex-1 mr-4" />
            )}

            {nextPost ? (
              <motion.div
                className="flex-1 ml-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to={`/blog/${nextPost.id}`}
                  className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-right"
                >
                  <div className="flex items-center justify-end text-red-600 mb-2">
                    <span className="text-sm font-medium">NEXT</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                    {nextPost.title}
                  </h3>
                </Link>
              </motion.div>
            ) : (
              <div className="flex-1 ml-4" />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;