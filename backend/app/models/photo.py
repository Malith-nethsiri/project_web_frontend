from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class PhotoType(str, enum.Enum):
    EXTERIOR = "exterior"
    INTERIOR = "interior"
    DOCUMENT = "document"
    OTHER = "other"

class Photo(Base):
    __tablename__ = "photos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    file_url = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    caption = Column(String, nullable=True)
    description = Column(String, nullable=True)
    type = Column(SQLEnum(PhotoType), nullable=False)
    sequence_order = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="photos")