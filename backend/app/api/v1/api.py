from fastapi import APIRouter

from app.api.v1.endpoints import reports, properties, valuations, comparables, photos, legal_aspects, valuer_profile, applicants, upload, ocr, ai, maps

api_router = APIRouter()

api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(properties.router, prefix="/properties", tags=["Properties"])
api_router.include_router(valuations.router, prefix="/valuations", tags=["Valuations"])
api_router.include_router(comparables.router, prefix="/comparables", tags=["Comparables"])
api_router.include_router(photos.router, prefix="/photos", tags=["Photos"])
api_router.include_router(legal_aspects.router, prefix="/legal-aspects", tags=["Legal Aspects"])
api_router.include_router(valuer_profile.router, prefix="/valuer-profile", tags=["Valuer Profile"])
api_router.include_router(applicants.router, prefix="/applicants", tags=["Applicants"])
api_router.include_router(upload.router, prefix="/upload", tags=["File Upload"])
api_router.include_router(ocr.router, prefix="/ocr", tags=["OCR"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Processing"])
api_router.include_router(maps.router, prefix="/maps", tags=["Maps & Geocoding"])