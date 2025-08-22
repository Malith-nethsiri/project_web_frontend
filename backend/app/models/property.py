from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Float, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    # Survey details
    lot_number = Column(String, nullable=True)
    plan_number = Column(String, nullable=True)
    plan_date = Column(DateTime, nullable=True)
    surveyor_name = Column(String, nullable=True)
    deed_numbers = Column(JSON, default=list)
    
    # Location
    address = Column(String, nullable=True)
    village = Column(String, nullable=True)
    gn_division = Column(String, nullable=True)
    district = Column(String, nullable=True)
    province = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Access
    road_access = Column(Boolean, default=False)
    directions_text = Column(String, nullable=True)
    access_description = Column(String, nullable=True)
    
    # Property details
    property_type = Column(String, nullable=True)
    total_extent = Column(String, nullable=True)
    total_extent_sqft = Column(Float, nullable=True)
    land_shape = Column(String, nullable=True)
    elevation = Column(String, nullable=True)
    soil_type = Column(String, nullable=True)
    water_table = Column(String, nullable=True)
    flood_risk = Column(Boolean, default=False)
    
    # Building details
    building_area = Column(Float, nullable=True)
    building_structure = Column(String, nullable=True)
    year_built = Column(Integer, nullable=True)
    building_condition = Column(String, nullable=True)
    depreciation_rate = Column(Float, nullable=True)
    
    # Utilities
    electricity = Column(Boolean, default=False)
    water_supply = Column(Boolean, default=False)
    sewerage = Column(Boolean, default=False)
    telephone = Column(Boolean, default=False)
    internet = Column(Boolean, default=False)
    
    # Market analysis
    market_activity = Column(String, nullable=True)
    development_potential = Column(String, nullable=True)
    restrictions = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="properties")