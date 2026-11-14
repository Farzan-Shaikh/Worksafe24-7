import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOProps> = ({
  title = 'WorkSafe24/7 - Advanced Safety Solutions for Workforce',
  description = 'Tech-Enabled Life Safety Services. Trusted Partner for employee safety. WorkSafe24/7 - Always On for workforce protection with 24/7 Safety Desk, Emergency SOS, Ambulance Service, and comprehensive employee wellbeing solutions.',
  keywords = 'employee safety, workforce protection, emergency SOS, ambulance service, roadside assistance, POSH compliance, mental health support, travel safety, employee wellbeing, safety management, WorkSafe24/7',
  image = 'https://worksafe247.com/brand/worksafe-logo.png',
  url = 'https://worksafe247.com',
  type = 'website',
  author = 'WorkSafe24/7',
  publishedTime,
  modifiedTime,
  structuredData,
}) => {
  const siteTitle = 'WorkSafe24/7';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  // Default structured data for Organization
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WorkSafe24/7',
    description: 'Advanced Safety Solutions for Workforce - Tech-Enabled Life Safety Services',
    url: 'https://worksafe247.com',
    logo: 'https://worksafe247.com/brand/worksafe-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1800-210-4567',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/worksafe247/',
      'https://www.instagram.com/worksafe24_7',
      'https://x.com/WorkSafe24_7',
      'https://www.facebook.com/WorkSafe247',
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@WorkSafe24_7" />
      <meta name="twitter:site" content="@WorkSafe24_7" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
