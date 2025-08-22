from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.photo import Photo
from app.models.report import Report

router = APIRouter()

@router.post("/")
async def create_photo(
    photo_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report).filter(
        Report.id == photo_data.get("report_id"),
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db_photo = Photo(**photo_data)
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo

@router.get("/")
async def get_photos(
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
    
    photos = db.query(Photo).filter(Photo.report_id == report_id).all()
    return photos

@router.delete("/{photo_id}")
async def delete_photo(
    photo_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    photo = db.query(Photo).join(Report).filter(
        Photo.id == photo_id,
        Report.user_id == current_user.id
    ).first()
    
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    db.delete(photo)
    db.commit()
    return {"message": "Photo deleted successfully"}