from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.valuation import Valuation
from app.models.report import Report

router = APIRouter()

@router.post("/")
async def create_valuation(
    valuation_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Verify report belongs to user
    report = db.query(Report).filter(
        Report.id == valuation_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_valuation = Valuation(**valuation_data)
    db.add(db_valuation)
    db.commit()
    db.refresh(db_valuation)
    return db_valuation

@router.get("/")
async def get_valuation(
    report_id: UUID = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Verify report belongs to user
    report = db.query(Report).filter(
        Report.id == report_id,
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    valuation = db.query(Valuation).filter(Valuation.report_id == report_id).first()
    return valuation

@router.put("/{valuation_id}")
async def update_valuation(
    valuation_id: UUID,
    valuation_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    valuation = db.query(Valuation).join(Report).filter(
        Valuation.id == valuation_id,
        Report.user_id == current_user.id
    ).first()
    
    if not valuation:
        raise HTTPException(status_code=404, detail="Valuation not found")
    
    for field, value in valuation_data.items():
        if hasattr(valuation, field):
            setattr(valuation, field, value)
    
    db.commit()
    db.refresh(valuation)
    return valuation