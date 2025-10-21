import { config } from './environment';

// Get the API URL from environment variables or configuration
const getApiUrl = () => {
  // If NEXT_PUBLIC_API_URL is set, use it (for manual override)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  
  // Otherwise, use the environment-based configuration
  return config.getApiUrl();
};

export const BASE_URL = getApiUrl();