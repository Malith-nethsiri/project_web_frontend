from typing import Any, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.api.auth.deps import get_current_active_user
from app.core.database import get_db
from app.models.user import User
from app.models.report import Report
from app.schemas.report import Report as ReportSchema, ReportCreate, ReportUpdate

router = APIRouter()

@router.get("/", response_model=dict)
async def get_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
) -> Any:
    offset = (page - 1) * limit
    
    # Get total count
    total = db.query(func.count(Report.id)).filter(Report.user_id == current_user.id).scalar()
    
    # Get reports with pagination
    reports = db.query(Report)\
        .filter(Report.user_id == current_user.id)\
        .offset(offset)\
        .limit(limit)\
        .all()
    
    return {
        "items": reports,
        "total": total,
        "page": page,
        "per_page": limit,
        "pages": (total + limit - 1) // limit
    }

@router.post("/", response_model=ReportSchema)
async def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    db_report = Report(
        **report.dict(),
        user_id=current_user.id
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@router.get("/{report_id}", response_model=ReportSchema)
async def get_report(
    report_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report)\
        .filter(Report.id == report_id, Report.user_id == current_user.id)\
        .first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return report

@router.put("/{report_id}", response_model=ReportSchema)
async def update_report(
    report_id: UUID,
    report_update: ReportUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report)\
        .filter(Report.id == report_id, Report.user_id == current_user.id)\
        .first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    update_data = report_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(report, field, value)
    
    db.commit()
    db.refresh(report)
    return report

@router.delete("/{report_id}")
async def delete_report(
    report_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report)\
        .filter(Report.id == report_id, Report.user_id == current_user.id)\
        .first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db.delete(report)
    db.commit()
    return {"message": "Report deleted successfully"}

@router.post("/{report_id}/generate-pdf")
async def generate_report_pdf(
    report_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report)\
        .filter(Report.id == report_id, Report.user_id == current_user.id)\
        .first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # TODO: Implement PDF generation logic
    # For now, return a placeholder response
    return Response(
        content=b"PDF generation not yet implemented",
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=report_{report_id}.pdf"}
    )

@router.post("/{report_id}/generate-docx")
async def generate_report_docx(
    report_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    report = db.query(Report)\
        .filter(Report.id == report_id, Report.user_id == current_user.id)\
        .first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # TODO: Implement DOCX generation logic
    # For now, return a placeholder response
    return Response(
        content=b"DOCX generation not yet implemented",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=report_{report_id}.docx"}
    )