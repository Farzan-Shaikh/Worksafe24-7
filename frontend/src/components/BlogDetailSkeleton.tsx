import React from 'react';

const BlogDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 overflow-hidden bg-gray-300">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Back Button Skeleton */}
            <div className="mb-6">
              <div className="h-4 bg-gray-400 rounded w-24 mb-4"></div>
              
              {/* Meta Info Skeleton */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="h-6 bg-gray-400 rounded-full w-20"></div>
                <div className="h-4 bg-gray-400 rounded w-24"></div>
                <div className="h-4 bg-gray-400 rounded w-28"></div>
                <div className="h-4 bg-gray-400 rounded w-20"></div>
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 mb-6">
              <div className="h-10 bg-gray-400 rounded w-full"></div>
              <div className="h-10 bg-gray-400 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Share Skeleton */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-300 rounded-full w-24"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`h-4 bg-gray-200 rounded ${
                  index % 4 === 3 ? 'w-2/3' : 'w-full'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Skeleton */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <div className="p-6 bg-white rounded-xl">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="flex-1 ml-4">
              <div className="p-6 bg-white rounded-xl">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2 ml-auto"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailSkeleton;
