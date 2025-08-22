from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class ReportPurpose(str, enum.Enum):
    MORTGAGE = "mortgage"
    SALE = "sale"  
    INSURANCE = "insurance"
    TAXATION = "taxation"
    LEGAL = "legal"
    OTHER = "other"

class ReportStatus(str, enum.Enum):
    DRAFT = "draft"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed" 
    EXPORTED = "exported"

class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    reference_number = Column(String, unique=True, nullable=True)
    purpose = Column(SQLEnum(ReportPurpose), nullable=False)
    status = Column(SQLEnum(ReportStatus), default=ReportStatus.DRAFT)
    bank_name = Column(String, nullable=True)
    bank_branch = Column(String, nullable=True)
    inspection_date = Column(DateTime, nullable=True)
    valuation_date = Column(DateTime, nullable=True)
    report_date = Column(DateTime, nullable=True)
    generated_files = Column(JSON, default=list)
    
    # Foreign keys
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="reports")
    properties = relationship("Property", back_populates="report", cascade="all, delete-orphan")
    valuations = relationship("Valuation", back_populates="report", cascade="all, delete-orphan")
    comparables = relationship("Comparable", back_populates="report", cascade="all, delete-orphan")
    photos = relationship("Photo", back_populates="report", cascade="all, delete-orphan")
    legal_aspects = relationship("LegalAspect", back_populates="report", cascade="all, delete-orphan")
    applicants = relationship("Applicant", back_populates="report", cascade="all, delete-orphan")