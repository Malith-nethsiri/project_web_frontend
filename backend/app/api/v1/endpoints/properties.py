from typing import Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.property import Property
from app.models.report import Report

router = APIRouter()

@router.post("/")
async def create_property(
    property_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Verify report belongs to user
    report = db.query(Report).filter(
        Report.id == property_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_property = Property(**property_data)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

@router.get("/")
async def get_property(
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
    
    property = db.query(Property).filter(Property.report_id == report_id).first()
    return property

@router.put("/{property_id}")
async def update_property(
    property_id: UUID,
    property_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    property = db.query(Property).join(Report).filter(
        Property.id == property_id,
        Report.user_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    for field, value in property_data.items():
        if hasattr(property, field):
            setattr(property, field, value)
    
    db.commit()
    db.refresh(property)
    return property