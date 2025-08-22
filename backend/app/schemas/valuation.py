from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum
import uuid

class ValuationMethod(str, Enum):
    MARKET = "market"
    COST = "cost"
    INCOME = "income"
    COMPARATIVE = "comparative"

class ValuationBase(BaseModel):
    report_id: uuid.UUID
    primary_method: ValuationMethod
    secondary_methods: List[str] = []
    methodology_explanation: Optional[str] = None
    land_rate_per_perch: Optional[float] = None
    land_extent_perches: Optional[float] = None
    building_rate_per_sqft: Optional[float] = None
    building_area: Optional[float] = None
    building_value_before_depreciation: Optional[float] = None
    building_value_after_depreciation: Optional[float] = None
    depreciation_percentage: Optional[float] = None
    other_improvements_value: Optional[float] = None
    other_improvements_description: Optional[str] = None
    total_market_value: float
    forced_sale_value: Optional[float] = None
    insurance_value: Optional[float] = None
    rental_value_monthly: Optional[float] = None
    value_per_perch: Optional[float] = None
    value_per_sqft: Optional[float] = None
    market_trend_analysis: Optional[str] = None
    assumptions: List[str] = []
    limitations: List[str] = []
    risk_factors: List[str] = []
    valuation_fee: Optional[float] = None
    travel_cost: Optional[float] = None
    other_charges: Optional[float] = None
    total_fee: Optional[float] = None

class ValuationCreate(ValuationBase):
    pass

class ValuationUpdate(BaseModel):
    primary_method: Optional[ValuationMethod] = None
    secondary_methods: Optional[List[str]] = None
    methodology_explanation: Optional[str] = None
    land_rate_per_perch: Optional[float] = None
    land_extent_perches: Optional[float] = None
    building_rate_per_sqft: Optional[float] = None
    building_area: Optional[float] = None
    building_value_before_depreciation: Optional[float] = None
    building_value_after_depreciation: Optional[float] = None
    depreciation_percentage: Optional[float] = None
    other_improvements_value: Optional[float] = None
    other_improvements_description: Optional[str] = None
    total_market_value: Optional[float] = None
    forced_sale_value: Optional[float] = None
    insurance_value: Optional[float] = None
    rental_value_monthly: Optional[float] = None
    value_per_perch: Optional[float] = None
    value_per_sqft: Optional[float] = None
    market_trend_analysis: Optional[str] = None
    assumptions: Optional[List[str]] = None
    limitations: Optional[List[str]] = None
    risk_factors: Optional[List[str]] = None
    valuation_fee: Optional[float] = None
    travel_cost: Optional[float] = None
    other_charges: Optional[float] = None
    total_fee: Optional[float] = None

class Valuation(ValuationBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True