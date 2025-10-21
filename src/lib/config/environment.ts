// Environment configuration
export const config = {
  // Get API URL from environment variable
  getApiUrl: () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return apiUrl.replace(/\/$/, ""); // Remove trailing slash
  }
};

export default config;
