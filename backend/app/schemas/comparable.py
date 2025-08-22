from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum
import uuid

class LocationSimilarity(str, Enum):
    SIMILAR = "similar"
    SLIGHTLY_DIFFERENT = "slightly_different" 
    DIFFERENT = "different"

class ComparableBase(BaseModel):
    report_id: uuid.UUID
    address: str
    lot_number: Optional[str] = None
    plan_number: Optional[str] = None
    distance_from_subject: Optional[float] = None
    location_similarity: Optional[LocationSimilarity] = None
    sale_date: datetime
    sale_price: float
    transaction_type: Optional[str] = None
    land_extent_perches: Optional[float] = None
    land_extent_sqft: Optional[float] = None
    building_area: Optional[float] = None
    property_type: Optional[str] = None
    location_adjustment: Optional[float] = None
    size_adjustment: Optional[float] = None
    condition_adjustment: Optional[float] = None
    time_adjustment: Optional[float] = None
    other_adjustments: Optional[float] = None
    adjusted_price: Optional[float] = None
    price_per_perch: Optional[float] = None
    price_per_sqft: Optional[float] = None
    source: Optional[str] = None
    verification_status: Optional[str] = None
    reliability_rating: Optional[int] = None
    market_conditions: Optional[str] = None
    special_circumstances: Optional[str] = None
    remarks: Optional[str] = None

class ComparableCreate(ComparableBase):
    pass

class ComparableUpdate(BaseModel):
    address: Optional[str] = None
    lot_number: Optional[str] = None
    plan_number: Optional[str] = None
    distance_from_subject: Optional[float] = None
    location_similarity: Optional[LocationSimilarity] = None
    sale_date: Optional[datetime] = None
    sale_price: Optional[float] = None
    transaction_type: Optional[str] = None
    land_extent_perches: Optional[float] = None
    land_extent_sqft: Optional[float] = None
    building_area: Optional[float] = None
    property_type: Optional[str] = None
    location_adjustment: Optional[float] = None
    size_adjustment: Optional[float] = None
    condition_adjustment: Optional[float] = None
    time_adjustment: Optional[float] = None
    other_adjustments: Optional[float] = None
    adjusted_price: Optional[float] = None
    price_per_perch: Optional[float] = None
    price_per_sqft: Optional[float] = None
    source: Optional[str] = None
    verification_status: Optional[str] = None
    reliability_rating: Optional[int] = None
    market_conditions: Optional[str] = None
    special_circumstances: Optional[str] = None
    remarks: Optional[str] = None

class Comparable(ComparableBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True