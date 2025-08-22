from sqlalchemy import Column, String, DateTime, ForeignKey, Float, JSON, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class ValuationMethod(str, enum.Enum):
    MARKET = "market"
    COST = "cost"
    INCOME = "income"
    COMPARATIVE = "comparative"

class Valuation(Base):
    __tablename__ = "valuations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    # Methodology
    primary_method = Column(SQLEnum(ValuationMethod), nullable=False)
    secondary_methods = Column(JSON, default=list)
    methodology_explanation = Column(String, nullable=True)
    
    # Land valuation
    land_rate_per_perch = Column(Float, nullable=True)
    land_extent_perches = Column(Float, nullable=True)
    
    # Building valuation
    building_rate_per_sqft = Column(Float, nullable=True)
    building_area = Column(Float, nullable=True)
    building_value_before_depreciation = Column(Float, nullable=True)
    building_value_after_depreciation = Column(Float, nullable=True)
    depreciation_percentage = Column(Float, nullable=True)
    
    # Other improvements
    other_improvements_value = Column(Float, nullable=True)
    other_improvements_description = Column(String, nullable=True)
    
    # Final values
    total_market_value = Column(Float, nullable=False)
    forced_sale_value = Column(Float, nullable=True)
    insurance_value = Column(Float, nullable=True)
    rental_value_monthly = Column(Float, nullable=True)
    value_per_perch = Column(Float, nullable=True)
    value_per_sqft = Column(Float, nullable=True)
    
    # Analysis
    market_trend_analysis = Column(String, nullable=True)
    assumptions = Column(JSON, default=list)
    limitations = Column(JSON, default=list)
    risk_factors = Column(JSON, default=list)
    
    # Fees
    valuation_fee = Column(Float, nullable=True)
    travel_cost = Column(Float, nullable=True)
    other_charges = Column(Float, nullable=True)
    total_fee = Column(Float, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="valuations")