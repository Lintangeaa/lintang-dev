// Environment configuration
export const config = {
  // API URLs for different environments
  apiUrls: {
    development: 'http://localhost:8000',
    production: 'https://43.173.29.80:8101', // Update this to your actual HTTPS API URL
    staging: 'https://43.173.29.80:8101', // Update this if you have a staging environment
    // Temporary fallback for HTTP (not recommended for production)
    productionHttp: 'http://43.173.29.80:8101',
  },
  
  // Get the current environment
  getEnvironment: () => {
    if (typeof window !== 'undefined') {
      // Client-side: check if we're on localhost
      return window.location.hostname === 'localhost' ? 'development' : 'production';
    }
    // Server-side: use NODE_ENV
    return process.env.NODE_ENV === 'development' ? 'development' : 'production';
  },
  
  // Get the appropriate API URL
  getApiUrl: () => {
    // If NEXT_PUBLIC_API_URL is set, use it (for manual override)
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
    }
    
    const env = config.getEnvironment();
    const apiUrl = config.apiUrls[env as keyof typeof config.apiUrls] || config.apiUrls.development;
    
    return apiUrl;
  }
};

export default config;
