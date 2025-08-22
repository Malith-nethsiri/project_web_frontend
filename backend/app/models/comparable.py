from sqlalchemy import Column, String, DateTime, ForeignKey, Float, Integer, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class LocationSimilarity(str, enum.Enum):
    SIMILAR = "similar"
    SLIGHTLY_DIFFERENT = "slightly_different"
    DIFFERENT = "different"

class Comparable(Base):
    __tablename__ = "comparables"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    # Basic info
    address = Column(String, nullable=False)
    lot_number = Column(String, nullable=True)
    plan_number = Column(String, nullable=True)
    distance_from_subject = Column(Float, nullable=True)
    location_similarity = Column(SQLEnum(LocationSimilarity), nullable=True)
    
    # Sale details
    sale_date = Column(DateTime, nullable=False)
    sale_price = Column(Float, nullable=False)
    transaction_type = Column(String, nullable=True)
    
    # Property details
    land_extent_perches = Column(Float, nullable=True)
    land_extent_sqft = Column(Float, nullable=True)
    building_area = Column(Float, nullable=True)
    property_type = Column(String, nullable=True)
    
    # Adjustments
    location_adjustment = Column(Float, nullable=True)
    size_adjustment = Column(Float, nullable=True)
    condition_adjustment = Column(Float, nullable=True)
    time_adjustment = Column(Float, nullable=True)
    other_adjustments = Column(Float, nullable=True)
    adjusted_price = Column(Float, nullable=True)
    
    # Rates
    price_per_perch = Column(Float, nullable=True)
    price_per_sqft = Column(Float, nullable=True)
    
    # Verification
    source = Column(String, nullable=True)
    verification_status = Column(String, nullable=True)
    reliability_rating = Column(Integer, nullable=True)
    
    # Additional info
    market_conditions = Column(String, nullable=True)
    special_circumstances = Column(String, nullable=True)
    remarks = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="comparables")