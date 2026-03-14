from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    developer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    version = Column(String, default="1.0.0")
    api_endpoint = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    downloads = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    developer = relationship("User", back_populates="agents")
    interactions = relationship("Interaction", back_populates="agent")
    ratings = relationship("Rating", back_populates="agent")
