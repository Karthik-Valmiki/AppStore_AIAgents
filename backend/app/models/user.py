from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class UserRole(str, enum.Enum):
    DEVELOPER = "developer"
    CONSUMER = "consumer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="consumer")
    bio = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    agents = relationship("Agent", back_populates="developer")
    interactions = relationship("Interaction", back_populates="user")
    ratings = relationship("Rating", back_populates="user")
