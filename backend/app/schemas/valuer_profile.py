from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
import uuid

class ValuerProfileBase(BaseModel):
    title: Optional[str] = None
    full_name: str
    qualifications: List[str] = []
    memberships: List[str] = []
    address: Optional[str] = None
    telephone_numbers: List[str] = []
    email: EmailStr
    registration_number: Optional[str] = None
    license_number: Optional[str] = None
    areas_of_expertise: List[str] = []
    avatar_url: Optional[str] = None

class ValuerProfileCreate(ValuerProfileBase):
    pass

class ValuerProfileUpdate(BaseModel):
    title: Optional[str] = None
    full_name: Optional[str] = None
    qualifications: Optional[List[str]] = None
    memberships: Optional[List[str]] = None
    address: Optional[str] = None
    telephone_numbers: Optional[List[str]] = None
    email: Optional[EmailStr] = None
    registration_number: Optional[str] = None
    license_number: Optional[str] = None
    areas_of_expertise: Optional[List[str]] = None
    avatar_url: Optional[str] = None

class ValuerProfile(ValuerProfileBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True