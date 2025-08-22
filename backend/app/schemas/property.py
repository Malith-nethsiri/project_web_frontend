from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import uuid

class PropertyBase(BaseModel):
    report_id: uuid.UUID
    lot_number: Optional[str] = None
    plan_number: Optional[str] = None
    plan_date: Optional[datetime] = None
    surveyor_name: Optional[str] = None
    deed_numbers: List[str] = []
    address: Optional[str] = None
    village: Optional[str] = None
    gn_division: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    road_access: bool = False
    directions_text: Optional[str] = None
    access_description: Optional[str] = None
    property_type: Optional[str] = None
    total_extent: Optional[str] = None
    total_extent_sqft: Optional[float] = None
    land_shape: Optional[str] = None
    elevation: Optional[str] = None
    soil_type: Optional[str] = None
    water_table: Optional[str] = None
    flood_risk: bool = False
    building_area: Optional[float] = None
    building_structure: Optional[str] = None
    year_built: Optional[int] = None
    building_condition: Optional[str] = None
    depreciation_rate: Optional[float] = None
    electricity: bool = False
    water_supply: bool = False
    sewerage: bool = False
    telephone: bool = False
    internet: bool = False
    market_activity: Optional[str] = None
    development_potential: Optional[str] = None
    restrictions: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    lot_number: Optional[str] = None
    plan_number: Optional[str] = None
    plan_date: Optional[datetime] = None
    surveyor_name: Optional[str] = None
    deed_numbers: Optional[List[str]] = None
    address: Optional[str] = None
    village: Optional[str] = None
    gn_division: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    road_access: Optional[bool] = None
    directions_text: Optional[str] = None
    access_description: Optional[str] = None
    property_type: Optional[str] = None
    total_extent: Optional[str] = None
    total_extent_sqft: Optional[float] = None
    land_shape: Optional[str] = None
    elevation: Optional[str] = None
    soil_type: Optional[str] = None
    water_table: Optional[str] = None
    flood_risk: Optional[bool] = None
    building_area: Optional[float] = None
    building_structure: Optional[str] = None
    year_built: Optional[int] = None
    building_condition: Optional[str] = None
    depreciation_rate: Optional[float] = None
    electricity: Optional[bool] = None
    water_supply: Optional[bool] = None
    sewerage: Optional[bool] = None
    telephone: Optional[bool] = None
    internet: Optional[bool] = None
    market_activity: Optional[str] = None
    development_potential: Optional[str] = None
    restrictions: Optional[str] = None

class Property(PropertyBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True