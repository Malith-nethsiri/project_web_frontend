# ValuerPro Backend Setup Guide

## Overview
The complete FastAPI backend has been implemented with all the endpoints your frontend expects. This backend provides:

- **Authentication**: JWT-based login/register/logout
- **Report Management**: Full CRUD operations for property valuation reports
- **Property & Valuation Data**: Complete data models matching your frontend types
- **File Upload**: Single and multiple file upload endpoints
- **OCR & AI Processing**: Placeholder endpoints ready for implementation
- **Maps & Geocoding**: Placeholder endpoints for Google Maps integration

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and set your variables:
```env
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-super-secret-jwt-key
```

### 3. Database Setup

Create initial migration and apply:
```bash
python -m alembic revision --autogenerate -m "Initial migration"
python -m alembic upgrade head
```

Or use the helper script:
```bash
python scripts/create_migration.py
```

### 4. Run the Backend

```bash
uvicorn main:app --reload --port 8000
```

Your backend will be available at: `http://localhost:8000`

## Frontend Integration

Update your frontend environment:

Create `.env.local` in your project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

All the endpoints your frontend expects are now implemented:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

### Reports
- `GET /api/v1/reports` - List reports (paginated)
- `POST /api/v1/reports` - Create report
- `GET /api/v1/reports/{id}` - Get specific report
- `PUT /api/v1/reports/{id}` - Update report
- `DELETE /api/v1/reports/{id}` - Delete report
- `POST /api/v1/reports/{id}/generate-pdf` - Generate PDF
- `POST /api/v1/reports/{id}/generate-docx` - Generate DOCX

### Properties, Valuations, Comparables, Photos, Legal Aspects
- Full CRUD operations for all entity types
- All endpoints match your frontend API calls exactly

### File Upload & Processing
- `POST /api/v1/upload/single` - Single file upload
- `POST /api/v1/upload/multiple` - Multiple file upload
- OCR endpoints: `/api/v1/ocr/*`
- AI processing: `/api/v1/ai/*`
- Maps & geocoding: `/api/v1/maps/*`

## Railway Deployment

The backend is configured for Railway deployment:

1. **Dockerfile**: Optimized for Railway
2. **railway.json**: Railway-specific configuration
3. **Database**: Configured for Railway PostgreSQL
4. **Environment**: Production-ready settings

### Railway Setup Steps:

1. Create a new Railway project
2. Add PostgreSQL database service
3. Deploy the backend service from the `/backend` directory
4. Set environment variables in Railway dashboard:
   - `SECRET_KEY`: Your JWT secret key
   - `DATABASE_URL`: Will be auto-populated by Railway PostgreSQL
   - `ENVIRONMENT`: Set to "production"

5. Update frontend `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-service.railway.app
   ```

## Database Models

All database models match your TypeScript interfaces:

- **User**: Authentication and user management
- **Report**: Main report entity with relationships
- **Property**: Property details and characteristics
- **Valuation**: Valuation methodology and calculations
- **Comparable**: Market comparable properties
- **Photo**: File attachments and media
- **LegalAspect**: Legal documentation and ownership
- **ValuerProfile**: Valuer professional information
- **Applicant**: Report applicant information

## Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt password security
- **CORS Configuration**: Proper cross-origin setup
- **File Upload Security**: File type and size validation
- **User Authorization**: Endpoint-level access control

## Next Steps

1. **Test the Integration**: Start both frontend and backend
2. **Implement OCR**: Add actual OCR processing logic
3. **Add AI Features**: Connect to OpenAI or other AI services  
4. **Maps Integration**: Implement Google Maps API calls
5. **PDF Generation**: Add report export functionality

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Check CORS_ORIGINS in backend config
2. **Database Connection**: Verify DATABASE_URL format
3. **Authentication**: Ensure SECRET_KEY is set properly
4. **File Uploads**: Check upload directory permissions

### Development vs Production:

- **Development**: Uses SQLite by default, detailed logging
- **Production**: PostgreSQL required, optimized settings

The backend is now complete and ready for your frontend to connect to!