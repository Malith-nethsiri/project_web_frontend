from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum
import uuid

class ReportPurpose(str, Enum):
    MORTGAGE = "mortgage"
    SALE = "sale"
    INSURANCE = "insurance"
    TAXATION = "taxation"
    LEGAL = "legal"
    OTHER = "other"

class ReportStatus(str, Enum):
    DRAFT = "draft"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    EXPORTED = "exported"

class ReportBase(BaseModel):
    title: str
    reference_number: Optional[str] = None
    purpose: ReportPurpose
    bank_name: Optional[str] = None
    bank_branch: Optional[str] = None
    inspection_date: Optional[datetime] = None
    valuation_date: Optional[datetime] = None
    report_date: Optional[datetime] = None

class ReportCreate(ReportBase):
    pass

class ReportUpdate(BaseModel):
    title: Optional[str] = None
    reference_number: Optional[str] = None
    purpose: Optional[ReportPurpose] = None
    status: Optional[ReportStatus] = None
    bank_name: Optional[str] = None
    bank_branch: Optional[str] = None
    inspection_date: Optional[datetime] = None
    valuation_date: Optional[datetime] = None
    report_date: Optional[datetime] = None

class Report(ReportBase):
    id: uuid.UUID
    status: ReportStatus
    user_id: uuid.UUID
    generated_files: List[str] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True