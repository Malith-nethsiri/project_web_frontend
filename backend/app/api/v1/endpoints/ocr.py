from fastapi import APIRouter, Depends, HTTPException, File, UploadFile

from app.api.auth.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

@router.post("/extract_text")
async def extract_text(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement OCR text extraction
    # For now, return a placeholder response
    return {
        "extracted_text": "OCR text extraction not yet implemented",
        "confidence_score": 0.0
    }

@router.post("/extract_doc_text")
async def extract_document_text(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement document OCR
    return {
        "extracted_text": "Document OCR not yet implemented",
        "confidence_score": 0.0
    }

@router.post("/extract_sinhala_text")
async def extract_sinhala_text(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement Sinhala OCR
    return {
        "extracted_text": "Sinhala OCR not yet implemented",
        "confidence_score": 0.0
    }