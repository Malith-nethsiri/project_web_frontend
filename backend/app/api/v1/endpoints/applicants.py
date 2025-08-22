from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.applicant import Applicant
from app.models.report import Report

router = APIRouter()

@router.get("/")
async def get_applicants(
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
    
    applicants = db.query(Applicant).filter(Applicant.report_id == report_id).all()
    return applicants