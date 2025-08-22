from typing import Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.valuer_profile import ValuerProfile

router = APIRouter()

@router.get("/")
async def get_valuer_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    profile = db.query(ValuerProfile).filter(
        ValuerProfile.user_id == current_user.id
    ).first()
    return profile

@router.post("/")
async def create_valuer_profile(
    profile_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Check if profile already exists
    existing_profile = db.query(ValuerProfile).filter(
        ValuerProfile.user_id == current_user.id
    ).first()
    
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    profile_data["user_id"] = current_user.id
    db_profile = ValuerProfile(**profile_data)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.put("/")
async def update_valuer_profile(
    profile_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    profile = db.query(ValuerProfile).filter(
        ValuerProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for field, value in profile_data.items():
        if hasattr(profile, field):
            setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.post("/create-applicant")
async def create_applicant_from_profile(
    applicant_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    from app.models.applicant import Applicant
    from app.models.report import Report
    
    # Verify report belongs to user
    report = db.query(Report).filter(
        Report.id == applicant_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_applicant = Applicant(**applicant_data)
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant