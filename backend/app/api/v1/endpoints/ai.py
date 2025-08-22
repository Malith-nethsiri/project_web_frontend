from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.auth.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/parse_survey_plan")
async def parse_survey_plan(
    text_input: TextInput,
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement AI survey plan parsing
    return {
        "parsed_data": {"message": "Survey plan parsing not yet implemented"},
        "confidence_score": 0.0,
        "suggestions": []
    }

@router.post("/parse_deed_doc")
async def parse_deed_document(
    text_input: TextInput,
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement AI deed parsing
    return {
        "parsed_data": {"message": "Deed parsing not yet implemented"},
        "confidence_score": 0.0,
        "suggestions": []
    }

@router.post("/parse_applicant")
async def parse_applicant(
    text_input: TextInput,
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement AI applicant parsing
    return {
        "parsed_data": {"message": "Applicant parsing not yet implemented"},
        "confidence_score": 0.0,
        "suggestions": []
    }

@router.post("/translate_si_to_en")
async def translate_sinhala_to_english(
    text_input: TextInput,
    current_user: User = Depends(get_current_active_user)
) -> dict:
    # TODO: Implement Sinhala to English translation
    return {
        "translated_text": "Translation not yet implemented"
    }