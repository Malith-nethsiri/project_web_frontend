from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.legal_aspect import LegalAspect
from app.models.report import Report

router = APIRouter()

@router.post("/")
async def create_legal_aspect(
    legal_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report).filter(
        Report.id == legal_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_legal = LegalAspect(**legal_data)
    db.add(db_legal)
    db.commit()
    db.refresh(db_legal)
    return db_legal

@router.get("/")
async def get_legal_aspects(
    report_id: UUID = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> List[Any]:
    report = db.query(Report).filter(
        Report.id == report_id,
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    legal_aspects = db.query(LegalAspect).filter(LegalAspect.report_id == report_id).all()
    return legal_aspects

@router.put("/{legal_id}")
async def update_legal_aspect(
    legal_id: UUID,
    legal_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    legal_aspect = db.query(LegalAspect).join(Report).filter(
        LegalAspect.id == legal_id,
        Report.user_id == current_user.id
    ).first()
    
    if not legal_aspect:
        raise HTTPException(status_code=404, detail="Legal aspect not found")
    
    for field, value in legal_data.items():
        if hasattr(legal_aspect, field):
            setattr(legal_aspect, field, value)
    
    db.commit()
    db.refresh(legal_aspect)
    return legal_aspect

@router.delete("/{legal_id}")
async def delete_legal_aspect(
    legal_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    legal_aspect = db.query(LegalAspect).join(Report).filter(
        LegalAspect.id == legal_id,
        Report.user_id == current_user.id
    ).first()
    
    if not legal_aspect:
        raise HTTPException(status_code=404, detail="Legal aspect not found")
    
    db.delete(legal_aspect)
    db.commit()
    return {"message": "Legal aspect deleted successfully"}