# ValuerPro - Professional Property Valuation Platform

## System Architecture Overview

**ValuerPro** is a comprehensive AI-powered property valuation platform designed for professional valuers and real estate professionals. The system combines modern web technologies with artificial intelligence to streamline the property valuation process.

## 🏗️ Technical Stack

### Backend (FastAPI + Python)
- **Framework**: FastAPI 0.104.1 with Uvicorn server
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based with python-jose
- **AI Integration**: OpenAI GPT-4 for document processing
- **File Processing**: Pillow, pytesseract for OCR
- **Cloud Services**: AWS S3, Google Maps API
- **Language Support**: English/Sinhala translation

### Frontend (Next.js + React)
- **Framework**: Next.js 14 with TypeScript
- **UI Components**: Custom component library with Tailwind CSS
- **State Management**: Zustand stores for auth, reports, UI
- **API Communication**: Axios with interceptors
- **Authentication**: JWT tokens with localStorage
- **PWA Support**: Service worker integration

### Infrastructure
- **Deployment**: Railway platform with Docker
- **Database**: Railway PostgreSQL
- **File Storage**: AWS S3 with secure uploads
- **Environment**: Production-ready configuration

## 📁 Project Structure

```
project_website/
├── 🔧 Configuration Files
│   ├── railway.json                 # Railway deployment config
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS setup
│   ├── package.json                # Frontend dependencies
│   └── .gitignore                  # Git exclusions
│
├── 🐍 Backend (FastAPI)
│   ├── backend/
│   │   ├── Dockerfile              # Railway-compatible container
│   │   ├── requirements.txt        # Python dependencies
│   │   ├── main.py                 # FastAPI application entry
│   │   ├── alembic.ini             # Database migrations config
│   │   │
│   │   └── app/
│   │       ├── core/
│   │       │   ├── config.py       # Environment-based settings
│   │       │   ├── database.py     # SQLAlchemy setup
│   │       │   └── security.py     # JWT authentication
│   │       │
│   │       ├── models/             # Database models
│   │       │   ├── user.py         # User/Valuer model
│   │       │   ├── report.py       # Valuation report model
│   │       │   ├── property.py     # Property details model
│   │       │   ├── applicant.py    # Client information model
│   │       │   ├── comparable.py   # Market comparable model
│   │       │   ├── valuation.py    # Valuation calculations
│   │       │   ├── legal_aspect.py # Legal information model
│   │       │   ├── photo.py        # Property photos model
│   │       │   └── valuer_profile.py # Professional profile
│   │       │
│   │       ├── schemas/            # Pydantic validation schemas
│   │       │   └── [corresponding schemas for each model]
│   │       │
│   │       └── api/
│   │           ├── auth/
│   │           │   └── routes.py   # Authentication endpoints
│   │           └── v1/
│   │               ├── api.py      # Main API router
│   │               └── endpoints/
│   │                   ├── reports.py      # Report CRUD
│   │                   ├── properties.py  # Property management
│   │                   ├── applicants.py  # Client management
│   │                   ├── comparables.py # Market analysis
│   │                   ├── valuations.py  # Valuation logic
│   │                   ├── legal_aspects.py # Legal data
│   │                   ├── photos.py      # Media management
│   │                   ├── upload.py      # File handling
│   │                   ├── ocr.py         # Document processing
│   │                   ├── ai.py          # AI integration
│   │                   ├── maps.py        # Location services
│   │                   └── valuer_profile.py # Profile management
│
├── ⚛️ Frontend (Next.js)
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── globals.css         # Global styles
│   │   │   │
│   │   │   ├── auth/               # Authentication pages
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   └── forgot-password/page.tsx
│   │   │   │
│   │   │   ├── dashboard/          # Main dashboard
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── reports/            # Report management
│   │   │   │   ├── page.tsx        # Report listing
│   │   │   │   ├── create/page.tsx # Report creation wizard
│   │   │   │   └── [id]/page.tsx   # Individual report view
│   │   │   │
│   │   │   ├── profile/            # User profile
│   │   │   ├── settings/           # Application settings
│   │   │   ├── upload/             # Document upload
│   │   │   └── maps/               # Maps integration
│   │   │
│   │   ├── components/             # Reusable components
│   │   │   ├── ui/                 # Base UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── modal.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── [other UI components]
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   └── auth-guard.tsx  # Route protection
│   │   │   │
│   │   │   ├── reports/            # Report-specific components
│   │   │   │   ├── report-actions.tsx
│   │   │   │   ├── report-preview.tsx
│   │   │   │   └── steps/          # Wizard steps
│   │   │   │       ├── applicant-information-step.tsx
│   │   │   │       ├── property-details-step.tsx
│   │   │   │       ├── comparables-step.tsx
│   │   │   │       ├── legal-aspects-step.tsx
│   │   │   │       ├── photos-step.tsx
│   │   │   │       ├── valuation-details-step.tsx
│   │   │   │       └── review-submit-step.tsx
│   │   │   │
│   │   │   ├── upload/             # Document processing
│   │   │   │   ├── ocr-processor.tsx
│   │   │   │   ├── ai-analysis-panel.tsx
│   │   │   │   └── document-classifier.tsx
│   │   │   │
│   │   │   └── maps/               # Location services
│   │   │       ├── distance-calculator.tsx
│   │   │       └── neighborhood-analyzer.tsx
│   │   │
│   │   ├── lib/                    # Utilities and configuration
│   │   │   ├── api.ts              # API client with Railway backend
│   │   │   ├── utils.ts            # Helper functions
│   │   │   └── create-store.ts     # Store factory
│   │   │
│   │   ├── stores/                 # State management
│   │   │   ├── auth.ts             # Authentication state
│   │   │   ├── report-wizard.ts    # Report creation state
│   │   │   └── ui.ts               # UI state
│   │   │
│   │   ├── types/                  # TypeScript definitions
│   │   │   └── index.ts            # Shared type definitions
│   │   │
│   │   └── hooks/                  # Custom React hooks
│   │       └── use-auth.ts         # Authentication hook
│
└── 📚 Documentation
    ├── README.md                   # Project overview
    ├── DEPLOYMENT_STATUS.md        # Current deployment status
    ├── RAILWAY_ENV_VARS.md         # Environment variables guide
    └── SYSTEM_OVERVIEW.md          # This file
```

## 🔄 Application Flow

### 1. User Authentication Journey
```
Landing Page → Registration/Login → JWT Token → Protected Routes
```

### 2. Report Creation Workflow
```
Dashboard → Create Report → Multi-Step Wizard:
├── 1. Report Metadata
├── 2. Applicant Information (AI-assisted)
├── 3. Property Details (OCR + Maps)
├── 4. Document Upload (AI Processing)
├── 5. Comparable Analysis
├── 6. Legal Aspects
├── 7. Photos & Media
├── 8. Valuation Calculation
└── 9. Review & Finalization
```

### 3. AI Processing Pipeline
```
Document Upload → OCR Text Extraction → AI Analysis → Structured Data → Form Population
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/register` - New user registration
- `GET /api/v1/auth/me` - Current user profile
- `POST /api/v1/auth/logout` - Session termination

### Report Management
- `GET /api/v1/reports` - List user reports (paginated)
- `POST /api/v1/reports` - Create new report
- `GET /api/v1/reports/{id}` - Get specific report
- `PUT /api/v1/reports/{id}` - Update report
- `DELETE /api/v1/reports/{id}` - Delete report

### Data Management
- `POST /api/v1/applicants` - Create applicant
- `POST /api/v1/properties` - Create property
- `POST /api/v1/comparables` - Add comparable
- `POST /api/v1/valuations` - Valuation calculation
- `POST /api/v1/legal-aspects` - Legal information
- `POST /api/v1/photos` - Photo upload

### AI & Processing
- `POST /api/v1/ocr/extract_text` - OCR processing
- `POST /api/v1/ai/parse_survey_plan` - Survey plan analysis
- `POST /api/v1/ai/parse_deed_doc` - Deed document analysis
- `POST /api/v1/ai/translate_si_to_en` - Sinhala translation

### File & Maps
- `POST /api/v1/upload/single` - Single file upload
- `POST /api/v1/upload/multiple` - Multiple file upload
- `POST /api/v1/maps/geocode` - Address geocoding
- `POST /api/v1/maps/directions` - Route calculation

## 🎯 Key Features

### AI-Powered Automation
- **Document OCR**: Automatic text extraction from images/PDFs
- **Data Extraction**: AI parsing of survey plans, deeds, documents
- **Language Support**: Sinhala-English translation
- **Form Population**: Automatic filling of property details

### Professional Reporting
- **PDF Export**: Branded, professional valuation reports
- **DOCX Export**: Editable Word documents
- **Custom Templates**: Personalized report layouts
- **Digital Signatures**: Electronic valuer certification

### Advanced Tools
- **Maps Integration**: Google Maps with distance calculation
- **Market Analysis**: Comparable property research
- **Photo Management**: Organized property photography
- **Version Control**: Report revision tracking

## 🔒 Security & Compliance

### Authentication & Authorization
- JWT-based authentication with secure token storage
- Role-based access control (valuers, clients, admins)
- Password encryption with bcrypt
- Session management and timeout

### Data Protection
- HTTPS encryption for all communications
- Secure file upload with validation
- Environment-based configuration
- Database connection security

### Compliance Features
- Audit trails for all report changes
- Digital signature capabilities
- Professional certification tracking
- Export controls and permissions

## 🚀 Deployment Configuration

### Railway Platform Setup
- **Builder**: Dockerfile (Python backend)
- **Port**: 8000 (configurable via PORT env var)
- **Database**: Railway PostgreSQL
- **File Storage**: AWS S3 integration
- **Domain**: Custom domain support

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
SECRET_KEY=your-secret-key

# CORS & Hosts
CORS_ORIGINS=["https://your-frontend-domain"]
ALLOWED_HOSTS=["your-backend-domain"]

# External APIs
OPENAI_API_KEY=sk-...
GOOGLE_MAPS_API_KEY=AIza...

# AWS Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
```

## 📈 Performance & Scalability

### Backend Optimization
- FastAPI async/await for high concurrency
- SQLAlchemy connection pooling
- Efficient file upload handling
- Caching for frequently accessed data

### Frontend Performance
- Next.js 14 with App Router for optimal loading
- Component lazy loading
- Image optimization
- PWA capabilities for offline access

### Monitoring & Logging
- Structured logging with FastAPI
- Error tracking and monitoring
- Performance metrics collection
- Health check endpoints

---

**Version**: 1.0.1  
**Last Updated**: 2025-08-22  
**Status**: Production Ready  
**Platform**: Railway + AWS + Google Cloud