# Deployment Guide

## Environment Configuration

### For Production Deployment

You need to set up your production API to use HTTPS. Here are the steps:

#### 1. Set up HTTPS for your API server

Your API server at `43.173.29.80:8101` needs to be configured with HTTPS. You can:

- Use a reverse proxy like Nginx with SSL certificates
- Use a service like Cloudflare to add HTTPS
- Set up SSL certificates directly on your server

#### 2. Update Environment Variables

For your production deployment, set the following environment variable:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

Or if you want to keep using the IP address with HTTPS:

```bash
NEXT_PUBLIC_API_URL=https://43.173.29.80:8101
```

#### 3. Update the Configuration

If your API URL changes, update the `src/lib/config/environment.ts` file:

```typescript
apiUrls: {
  development: 'http://localhost:8000',
  production: 'https://your-new-api-domain.com', // Update this
  staging: 'https://your-staging-api-domain.com', // Update this if needed
},
```

### For Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add a new variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-api-domain.com`
   - Environment: Production

### For Other Hosting Platforms

Set the environment variable `NEXT_PUBLIC_API_URL` to your HTTPS API URL in your hosting platform's environment configuration.

## Quick Fix for Current Issue

If you need a quick fix and can't set up HTTPS immediately, you can temporarily modify the configuration to use HTTP (not recommended for production):

1. Update `src/lib/config/environment.ts`:
```typescript
production: 'http://43.173.29.80:8101', // Temporary fix - not secure
```

2. Redeploy your application

**Note**: This is not recommended for production as it creates security issues.

## Recommended Solution

The best solution is to set up HTTPS for your API server. This can be done by:

1. Using a reverse proxy (Nginx, Apache)
2. Using a service like Cloudflare
3. Setting up SSL certificates directly on your server
4. Using a container orchestration platform that handles SSL termination

## Testing

After making changes, test your API calls:

1. Check browser developer tools for any mixed content errors
2. Verify API calls are made to HTTPS URLs
3. Test all functionality that depends on API calls
