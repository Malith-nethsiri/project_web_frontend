# Railway Deployment Fix Instructions

## 🚨 Critical Issues Found & Solutions

### 1. Frontend Configuration ✅ FIXED
The frontend `next.config.js` has been updated to support Railway deployment.

### 2. Backend CORS Configuration 🔧 NEEDS FIX

**Current Issue:**
```python
ALLOWED_HOSTS: List[str] = Field(
    default=["http://localhost:3000", "http://127.0.0.1:3000"],
    env="ALLOWED_HOSTS"
)
```

**Required Railway Environment Variables for Backend:**

```bash
# In Railway Backend Service Settings > Variables:
ALLOWED_HOSTS=["https://www.valuerpro.online","https://valuerpro.online","http://localhost:3000","http://127.0.0.1:3000"]
```

### 3. Frontend Environment Variables 🔧 NEEDS SETUP

**Required Railway Environment Variables for Frontend:**

```bash
# In Railway Frontend Service Settings > Variables:
NEXT_PUBLIC_API_URL=https://project-web-backend-production.up.railway.app

# Remove any hardcoded PORT variable - Railway handles this automatically
```

### 4. 🚨 CRITICAL: Remove Hardcoded Secrets from Backend

**Found hardcoded secrets in `app/core/config.py`:**
- Google Maps API Key: `AIzaSyDaqckMV5RaDkLs_ZCEkW9czR0fIo7Qfy0`
- OpenAI API Key: `sk-proj-lQhp3O5zX2xaxOoEmGtQMyuOg2wfLbOpQv_W5SvLliYhU--...`
- AWS Access Key: `AKIA6K25UL6M2YECKOYE`
- AWS Secret Key: `Kd5rPliPQfxQEQfXEv5OmKHUJZcjT4F3fQJKzeFV`

**IMMEDIATE ACTION REQUIRED:**

1. **Backend Code Changes** - Update `app/core/config.py`:
   ```python
   # Replace hardcoded values with:
   GOOGLE_MAPS_API_KEY: str = Field(env="GOOGLE_MAPS_API_KEY")
   OPENAI_API_KEY: str = Field(env="OPENAI_API_KEY") 
   AWS_ACCESS_KEY_ID: str = Field(env="AWS_ACCESS_KEY_ID")
   AWS_SECRET_ACCESS_KEY: str = Field(env="AWS_SECRET_ACCESS_KEY")
   SECRET_KEY: str = Field(env="SECRET_KEY")
   ```

2. **Railway Backend Environment Variables:**
   ```bash
   GOOGLE_MAPS_API_KEY=AIzaSyDaqckMV5RaDkLs_ZCEkW9czR0fIo7Qfy0
   OPENAI_API_KEY=sk-proj-lQhp3O5zX2xaxOoEmGtQMyuOg2wfLbOpQv_W5SvLliYhU--...
   AWS_ACCESS_KEY_ID=AKIA6K25UL6M2YECKOYE
   AWS_SECRET_ACCESS_KEY=Kd5rPliPQfxQEQfXEv5OmKHUJZcjT4F3fQJKzeFV
   SECRET_KEY=your-production-secret-key-generate-a-new-one
   ```

3. **Regenerate Keys** (Recommended):
   - Generate new AWS keys from AWS Console
   - Generate new Google Maps API key
   - Generate new OpenAI API key
   - Generate strong SECRET_KEY for production

### 5. DNS Configuration 📡

**Current Status:** `https://www.valuerpro.online` shows ERR_FAILED

**Required DNS Settings:**
```
Type: CNAME
Host: www
Value: project-web-frontend-production.up.railway.app

Type: CNAME (or ALIAS/ANAME)
Host: @
Value: project-web-frontend-production.up.railway.app
```

**Steps:**
1. Go to your domain registrar's DNS management
2. Add/update the CNAME records above
3. Wait 5-60 minutes for DNS propagation
4. Enable SSL in Railway (should auto-generate Let's Encrypt certificate)

## 🚀 Deployment Steps

### Step 1: Fix Backend Security
1. Update `app/core/config.py` to remove hardcoded secrets
2. Set environment variables in Railway Backend service
3. Deploy backend

### Step 2: Configure Frontend
1. Set `NEXT_PUBLIC_API_URL` in Railway Frontend service
2. Remove any `PORT` environment variable
3. Deploy frontend

### Step 3: Update DNS
1. Point domain to Railway-provided URLs
2. Wait for DNS propagation
3. Verify SSL certificate is active

### Step 4: Test
1. Visit `https://www.valuerpro.online`
2. Test authentication flow
3. Check browser console for CORS errors
4. Verify API calls work

## 🔍 Verification Commands

```bash
# Test DNS resolution
nslookup www.valuerpro.online

# Test connectivity
curl -I https://www.valuerpro.online

# Test backend API
curl -I https://project-web-backend-production.up.railway.app/health
```

## 📋 Quick Checklist

- [ ] Remove hardcoded secrets from backend code
- [ ] Set all environment variables in Railway Backend
- [ ] Set NEXT_PUBLIC_API_URL in Railway Frontend  
- [ ] Remove PORT variable from Railway Frontend
- [ ] Update DNS CNAME records
- [ ] Verify SSL certificate is active
- [ ] Test complete authentication flow
- [ ] Check for CORS errors in browser console

## 🆘 If Still Not Working

1. Check Railway service logs for specific errors
2. Verify all environment variables are set correctly
3. Test backend endpoints directly: `https://project-web-backend-production.up.railway.app/docs`
4. Use browser devtools to inspect network requests and CORS headers