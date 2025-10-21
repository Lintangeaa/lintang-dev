import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration (Next.js 15+)
  turbopack: {
    // Basic configuration without custom loaders
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Experimental features
  experimental: {
    // Enable modern bundling for React Icons
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
