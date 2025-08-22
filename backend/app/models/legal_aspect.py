from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Float, JSON, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class DocumentType(str, enum.Enum):
    DEED = "deed"
    SURVEY_PLAN = "survey_plan"
    APPROVAL = "approval"
    PERMIT = "permit"
    OTHER = "other"

class LegalAspect(Base):
    __tablename__ = "legal_aspects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    # Document details
    document_type = Column(SQLEnum(DocumentType), nullable=False)
    document_number = Column(String, nullable=True)
    document_date = Column(DateTime, nullable=True)
    issuing_authority = Column(String, nullable=True)
    
    # Ownership
    current_owner = Column(String, nullable=True)
    previous_owners = Column(JSON, default=list)
    ownership_type = Column(String, nullable=True)
    ownership_percentage = Column(Float, nullable=True)
    
    # Title status
    title_clear = Column(Boolean, default=True)
    encumbrances = Column(JSON, default=list)
    mortgages = Column(JSON, default=list)
    liens = Column(JSON, default=list)
    easements = Column(JSON, default=list)
    
    # Approvals and permits
    approvals_permits = Column(JSON, default=list)
    zoning_classification = Column(String, nullable=True)
    development_restrictions = Column(JSON, default=list)
    
    # Registration
    registration_details = Column(String, nullable=True)
    
    # Legal issues
    legal_issues = Column(JSON, default=list)
    court_cases = Column(JSON, default=list)
    disputes = Column(JSON, default=list)
    
    # Additional notes
    remarks = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="legal_aspects")