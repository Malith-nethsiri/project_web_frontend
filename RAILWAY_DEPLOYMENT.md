# 🚂 Railway Deployment Guide - ValuerPro Frontend

This guide will help you deploy the ValuerPro frontend to Railway, connecting it with your existing backend and database services.

## 📋 Prerequisites

- ✅ Railway account (sign up at [railway.app](https://railway.app))
- ✅ GitHub repository with your frontend code
- ✅ Backend and database already deployed on Railway
- ✅ Railway CLI installed (optional but recommended)

## 🚀 Step-by-Step Deployment

### 1. Install Railway CLI (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

### 2. Connect Your Repository

**Option A: Deploy from GitHub (Recommended)**

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `project_web_frontend` repository
5. Railway will automatically detect it's a Next.js app

**Option B: Deploy with CLI**

```bash
# In your project directory
railway link

# Deploy
railway up
```

### 3. Configure Environment Variables

In your Railway project dashboard, go to your frontend service and add these environment variables:

#### Required Variables:
```bash
# Backend API URL (replace with your Railway backend URL)
NEXT_PUBLIC_API_URL=https://your-backend-service.railway.app

# Production environment
NODE_ENV=production

# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

#### Optional Variables:
```bash
# Google Maps API Key (if you have one)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Custom domain (if you set one up)
NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
```

### 4. Generate Domain

1. In your Railway service dashboard
2. Go to "Settings" tab
3. Scroll to "Networking" section
4. Click "Generate Domain"
5. Your app will be available at: `https://your-service-name.railway.app`

### 5. Connect to Your Backend

Update your backend CORS settings to allow your new frontend domain:

```python
# In your FastAPI backend (main.py or wherever CORS is configured)
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "https://your-frontend-service.railway.app",  # Add this line
    "https://your-custom-domain.com",  # If you have a custom domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔧 Railway Configuration Files

The following files have been added to optimize Railway deployment:

### `railway.json`
```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `next.config.js` (Updated)
- Added `output: 'standalone'` for Docker optimization
- Added security headers
- Configured for Railway deployment

### `Dockerfile` (Optional)
- Multi-stage build for optimal performance
- Production-ready configuration
- Minimal image size

## 🔗 Connecting Services

### Link Frontend to Backend

1. **Get your backend URL:**
   - Go to your backend service in Railway
   - Copy the public URL from the service page

2. **Update frontend environment:**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-service.railway.app
   ```

### Link to Database

Your frontend doesn't directly connect to the database, but your backend should already be connected. Ensure your backend has these environment variables:

```bash
# Database connection (should already be set)
DATABASE_URL=postgresql://username:password@host:port/database
```

## 🚀 Deployment Commands

### Automatic Deployment
Railway automatically deploys when you push to your main branch.

### Manual Deployment
```bash
# Using CLI
railway up

# Or redeploy from dashboard
# Go to Deployments tab → Click "Deploy Latest"
```

## 🔍 Monitoring & Debugging

### View Logs
```bash
# Using CLI
railway logs

# Or in dashboard
# Go to Deployments tab → Click on a deployment → View logs
```

### Common Issues & Solutions

1. **Build Failures:**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version compatibility

2. **API Connection Issues:**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check backend CORS settings
   - Ensure backend is running

3. **Environment Variables:**
   - All public variables must start with `NEXT_PUBLIC_`
   - Redeploy after changing environment variables

## 🌐 Custom Domain (Optional)

1. Go to your service settings
2. Navigate to "Networking"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` environment variable

## ✅ Post-Deployment Checklist

- [ ] Frontend deploys successfully
- [ ] Can access the application via Railway URL
- [ ] Frontend can communicate with backend API
- [ ] Authentication works (login/register)
- [ ] All features function correctly
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly

## 🔄 Continuous Deployment

Railway automatically deploys when you push to your main branch. To ensure smooth deployments:

1. **Test locally first:**
   ```bash
   npm run build
   npm start
   ```

2. **Use staging environment** (optional):
   - Create a separate Railway project for staging
   - Deploy from a `develop` branch

3. **Monitor deployments:**
   - Check deployment logs for any issues
   - Test the application after each deployment

## 🆘 Need Help?

- [Railway Documentation](https://docs.railway.com/)
- [Railway Discord](https://discord.gg/railway)
- [Next.js Railway Examples](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

## 🎉 Success!

Once deployed, your ValuerPro application will be running on:
- **Frontend**: `https://your-frontend-service.railway.app`
- **Backend**: `https://your-backend-service.railway.app`
- **Database**: Connected via Railway's internal networking

Your complete SaaS application is now live on Railway! 🚀