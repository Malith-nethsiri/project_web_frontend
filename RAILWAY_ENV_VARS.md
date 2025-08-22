# Railway Environment Variables Configuration

## Backend Service (`fastapi-backend`)

The following environment variables need to be set in Railway's dashboard for the backend service:

### Required Variables

1. **DATABASE_URL**
   - Description: PostgreSQL database connection string
   - Example: `postgresql://user:password@host:port/database`
   - Required: Yes

2. **SECRET_KEY**
   - Description: JWT secret key for authentication
   - Example: `your-super-secret-jwt-key-change-this-in-production`
   - Required: Yes

3. **CORS_ORIGINS**
   - Description: JSON array of allowed frontend origins
   - Example: `["https://your-frontend-domain.up.railway.app"]`
   - Required: Yes

4. **ENVIRONMENT**
   - Description: Application environment
   - Value: `production`
   - Required: Yes

5. **ALLOWED_HOSTS**
   - Description: JSON array of allowed host domains
   - Example: `["your-backend-domain.up.railway.app"]`
   - Required: Yes (for production)

### Optional Variables

6. **GOOGLE_MAPS_API_KEY**
   - Description: Google Maps API key for geocoding
   - Required: Only if using maps features

7. **OPENAI_API_KEY**
   - Description: OpenAI API key for AI processing
   - Required: Only if using AI features

8. **AWS Configuration** (if using AWS S3)
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION (default: us-east-1)
   - AWS_S3_BUCKET

9. **Google Cloud Configuration** (if using Google Cloud)
   - GOOGLE_APPLICATION_CREDENTIALS
   - GOOGLE_CLOUD_PROJECT

## Frontend Service

The frontend should have:

1. **NEXT_PUBLIC_API_URL**
   - Description: Backend API URL
   - Example: `https://your-backend-domain.up.railway.app`
   - Note: This is already configured in the code to use Railway backend URL

## Post-Deployment Steps

1. Deploy the backend service with the updated configuration
2. Set all required environment variables in Railway dashboard
3. Ensure the database is created and accessible
4. Update CORS_ORIGINS to include the frontend domain
5. Update ALLOWED_HOSTS to include the backend domain
6. Test API endpoints for proper functionality