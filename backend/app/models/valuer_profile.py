from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base

class ValuerProfile(Base):
    __tablename__ = "valuer_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    title = Column(String, nullable=True)
    full_name = Column(String, nullable=False)
    qualifications = Column(JSON, default=list)
    memberships = Column(JSON, default=list)
    address = Column(String, nullable=True)
    telephone_numbers = Column(JSON, default=list)
    email = Column(String, nullable=False)
    registration_number = Column(String, nullable=True)
    license_number = Column(String, nullable=True)
    areas_of_expertise = Column(JSON, default=list)
    avatar_url = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="valuer_profile")