from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum
import uuid

class DocumentType(str, Enum):
    DEED = "deed"
    SURVEY_PLAN = "survey_plan"
    APPROVAL = "approval"
    PERMIT = "permit"
    OTHER = "other"

class LegalAspectBase(BaseModel):
    report_id: uuid.UUID
    document_type: DocumentType
    document_number: Optional[str] = None
    document_date: Optional[datetime] = None
    issuing_authority: Optional[str] = None
    current_owner: Optional[str] = None
    previous_owners: List[str] = []
    ownership_type: Optional[str] = None
    ownership_percentage: Optional[float] = None
    title_clear: bool = True
    encumbrances: List[str] = []
    mortgages: List[str] = []
    liens: List[str] = []
    easements: List[str] = []
    approvals_permits: List[str] = []
    zoning_classification: Optional[str] = None
    development_restrictions: List[str] = []
    registration_details: Optional[str] = None
    legal_issues: List[str] = []
    court_cases: List[str] = []
    disputes: List[str] = []
    remarks: Optional[str] = None

class LegalAspectCreate(LegalAspectBase):
    pass

class LegalAspectUpdate(BaseModel):
    document_type: Optional[DocumentType] = None
    document_number: Optional[str] = None
    document_date: Optional[datetime] = None
    issuing_authority: Optional[str] = None
    current_owner: Optional[str] = None
    previous_owners: Optional[List[str]] = None
    ownership_type: Optional[str] = None
    ownership_percentage: Optional[float] = None
    title_clear: Optional[bool] = None
    encumbrances: Optional[List[str]] = None
    mortgages: Optional[List[str]] = None
    liens: Optional[List[str]] = None
    easements: Optional[List[str]] = None
    approvals_permits: Optional[List[str]] = None
    zoning_classification: Optional[str] = None
    development_restrictions: Optional[List[str]] = None
    registration_details: Optional[str] = None
    legal_issues: Optional[List[str]] = None
    court_cases: Optional[List[str]] = None
    disputes: Optional[List[str]] = None
    remarks: Optional[str] = None

class LegalAspect(LegalAspectBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True