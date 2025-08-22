from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
import uuid

class ApplicantBase(BaseModel):
    report_id: uuid.UUID
    name: str
    address: Optional[str] = None
    contact_numbers: List[str] = []
    email: Optional[EmailStr] = None
    nic_number: Optional[str] = None
    business_name: Optional[str] = None
    business_registration: Optional[str] = None

class ApplicantCreate(ApplicantBase):
    pass

class Applicant(ApplicantBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True