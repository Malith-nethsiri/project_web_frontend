from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum
import uuid

class PhotoType(str, Enum):
    EXTERIOR = "exterior"
    INTERIOR = "interior"
    DOCUMENT = "document"
    OTHER = "other"

class PhotoBase(BaseModel):
    report_id: uuid.UUID
    file_url: str
    filename: str
    caption: Optional[str] = None
    description: Optional[str] = None
    type: PhotoType
    sequence_order: int = 0

class PhotoCreate(PhotoBase):
    pass

class Photo(PhotoBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True