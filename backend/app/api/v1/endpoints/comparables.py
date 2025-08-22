from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.comparable import Comparable
from app.models.report import Report

router = APIRouter()

@router.post("/")
async def create_comparable(
    comparable_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report).filter(
        Report.id == comparable_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_comparable = Comparable(**comparable_data)
    db.add(db_comparable)
    db.commit()
    db.refresh(db_comparable)
    return db_comparable

@router.get("/")
async def get_comparables(
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
    
    comparables = db.query(Comparable).filter(Comparable.report_id == report_id).all()
    return comparables

@router.put("/{comparable_id}")
async def update_comparable(
    comparable_id: UUID,
    comparable_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    comparable = db.query(Comparable).join(Report).filter(
        Comparable.id == comparable_id,
        Report.user_id == current_user.id
    ).first()
    
    if not comparable:
        raise HTTPException(status_code=404, detail="Comparable not found")
    
    for field, value in comparable_data.items():
        if hasattr(comparable, field):
            setattr(comparable, field, value)
    
    db.commit()
    db.refresh(comparable)
    return comparable

@router.delete("/{comparable_id}")
async def delete_comparable(
    comparable_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    comparable = db.query(Comparable).join(Report).filter(
        Comparable.id == comparable_id,
        Report.user_id == current_user.id
    ).first()
    
    if not comparable:
        raise HTTPException(status_code=404, detail="Comparable not found")
    
    db.delete(comparable)
    db.commit()
    return {"message": "Comparable deleted successfully"}